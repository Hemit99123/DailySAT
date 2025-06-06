"use server"

import jwt from "jsonwebtoken";
import { handleGetSession } from "../auth/authActions";

const JWT_SECRET = process.env.JWT_SECRET; 

// This JWT will be used by the questions views when they send to server
// It will contain questions information like if the question is correct, to ensure the API request cannot be malformed
// to trick the API into granting them pts even when they got answers incorrect

export const generateJWT = async (payload: object) => {
    try {
        const session = await handleGetSession()

        if (!session || !session.user) {
            throw new Error("Unauthorized: User not authenticated");
        }

        const payloadString = typeof payload === 'object' ? JSON.stringify(payload) : payload;

        const token = jwt.sign(
            JSON.parse(payloadString),
            JWT_SECRET || "",
            { expiresIn: "3s" }
        );

        return token;
    } catch (err) {
        console.error("Error generating token:", err);
        throw new Error("Internal Server Error");
    }
}
