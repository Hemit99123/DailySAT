// Database and Authentication
import { client } from "@/lib/mongo";
import { Db } from "mongodb";

// Types
import { User } from "@/types/user";

// Date Utilities
import { parse, differenceInDays, format } from "date-fns";
import { handleGetSession } from "@/lib/auth/authActions";

/**
 * POST Handler for Investor Calculations
 * Calculates and updates user's earnings from investments
 */

export const POST = async () => {
  try {
    // Initialize database connection
    await client.connect();
    const db: Db = client.db("DailySAT");
    const users = db.collection<User>("users");

    // Authenticate user
    const session = await handleGetSession();
    const userEmail = session?.user?.email;

    if (!userEmail) {
      return Response.json({ result: "Unauthorized" }, { status: 401 });
    }

    // Fetch user data
    const user = await users.findOne({ email: userEmail });

    // Validate user and investors array
    if (!user || !Array.isArray((user as User).investors)) {
      return Response.json({ totalQuantity: 0 });
    }

    // Initialize date calculations
    const today = new Date();
    const formattedToday = format(today, "MM/dd/yyyy");

    let totalQuantity = 0;

    // Calculate earnings for each investor
    const updatedInvestors = user.investors?.map((investor) => {
      try {
        // Parse investment date and calculate days held
        const parsedDate = parse(investor.date, "MM/dd/yyyy", new Date());
        const daysHeld = differenceInDays(today, parsedDate);

        // Calculate earnings based on investment parameters
        const amnt = investor.amnt ?? 1;
        const reward = investor.reward ?? 0;
        const quantity = daysHeld * amnt * reward;
        totalQuantity += quantity;

        // Update investment date to today
        return {
          ...investor,
          date: formattedToday,
        };
      } catch {
        // Handle date parsing errors
        return {
          ...investor,
          date: formattedToday,
        };
      }
    });

    // Add existing currency to total
    totalQuantity += user?.currency;

    // Update user's investors and currency in database
    await users.updateOne(
      { email: userEmail },
      {
        $set: {
          investors: updatedInvestors,
          currency: totalQuantity,
        },
      }
    );

    return Response.json({ totalQuantity });
  } catch (error) {
    return Response.json({ result: "Server error" }, { status: 500 });
  } finally {
    // Ensure database connection is closed
    await client.close();
  }
};
