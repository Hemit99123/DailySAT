import dbConnect from "./dbConnect";
import  User from "@/models/User";

export async function getAllUserEmails(): Promise<string[]> {
    await dbConnect();
    const users = await User.find({}, 'email').lean();
    return users.map((user) => user.email as string);
}
