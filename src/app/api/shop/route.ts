import { ShopItem } from "@/types/shop/shopItem";
import { client } from "@/lib/mongo";
import { Db } from "mongodb";
import { User } from "@/types/user"; // assume you saved the User interface here
import { format } from "date-fns";
import { handleGetSession } from "@/lib/auth/authActions";

/**
 * Appends an array of items to a user's "itemsBought" array.
 * @param email - The email of the user.
 * @param items - An array of items to append to the itemsBought array.
 */

export const POST = async (request: Request) => {
  const { items, coins } = await request.json();
  if (!Array.isArray(items)) {
    return Response.json({
      result: "Items must be an array",
    });
  }

  try {
    await client.connect();
    const db: Db = client.db("DailySAT");

    const users = db.collection<User>("users");
    // Proceed with the rest of the logic
    const session = await handleGetSession();
    const userEmail: string | null | undefined = session?.user?.email;
    // If email isn't found, throw an error
    if (!userEmail) {
      throw new Error("Email not found");
    }
    // Get totalCost
    const totalCost = items.reduce((sum, item) => {
      const quantity = item.amnt ?? 1;
      return sum + item.price * quantity;
    }, 0);
    if (coins < totalCost)
      return Response.json({
        result: "Cannot complete purchase",
      });
    const result = await users.updateOne(
      { email: userEmail },
      {
        $push: {
          itemsBought: {
            $each: items,
          },
        },
        $set: {
          currency: coins - totalCost,
        },
      }
    );

    let investors = items.filter((elem: ShopItem) =>
      elem.name.includes("Investor")
    );

    // If there are investor items, log them intok the DB
    if (investors) {
      const result = format(new Date(), "MM/dd/yyyy");

      const formattedDate = result;
      investors = investors.map(
        (elem: ShopItem) =>
          (elem = {
            ...elem,
            date: formattedDate,
            reward: elem.name.includes("IV")
              ? 20
              : elem.name.includes("III")
                ? 15
                : elem.name.includes("II")
                  ? 10
                  : 5,
          })
      );

      await users.updateOne(
        { email: userEmail },
        {
          $push: {
            investors: {
              $each: investors,
            },
          },
        }
      );
    }

    if (result.matchedCount === 0) {
      return Response.json({
        result: "User not found",
      });
    }

    return Response.json({
      result: "Success - items bought",
    });
  } catch (error) {
    return Response.json({
      result: "DB Error",
    });
  } finally {
    await client.close();
  }
};
