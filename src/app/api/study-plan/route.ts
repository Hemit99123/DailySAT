import { handleGetSession } from "@/lib/auth/authActions";
import { handleGetUser } from "@/lib/auth/getUser";
import { client } from "@/lib/mongo";
import { Db } from "mongodb";

export const POST = async (request: Request) => {
  const { plan } = await request.json();

  try {
    const session = await handleGetSession();
    const email = session?.user?.email;

    if (!email) {
      return Response.json({ message: "Unauthorized" });
    }

    await client.connect();
    const db: Db = client.db("DailySAT");
    const usersCollection = db.collection("users");

    const result = await usersCollection.updateOne(
      { email },
      { $set: { plan } }
    );

    if (result.modifiedCount === 0) {
      return Response.json({ message: "User not found or no changes made" });
    }

    return Response.json({ message: "Study plan updated successfully" });
  } catch (error) {
    return Response.json({ message: "Internal Server Error" });
  } finally {
    await client.close();
  }
};

export const GET = async () => {
  try {
    const session = await handleGetSession();
    const email = session?.user?.email;

    if (!email) {
      return Response.json({ message: "Unauthorized" });
    }

    await client.connect();
    const user = await handleGetUser(session);

    return Response.json({ message: "Found study plan", plan: user?.plan });
  } catch (error) {
    return Response.json({ message: "Internal Server Error", error });
  } finally {
    await client.close();
  }
};
