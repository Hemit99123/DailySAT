import { QUESTION_IS_CORRECT_POINTS } from "@/data/constant";
import { client } from "@/lib/mongo";
import { handleGetSession } from "@/lib/auth/authActions";
import { decryptPayload } from "@/lib/cryptojs";

/**
 * @swagger
 * /api/questions/handle-submit:
 *   post:
 *     summary: Process user answer and update database
 *     description: >
 *       Updates the user's data in the database accordingly.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               jwtToken:
 *                 type: string
 *                 description: JWT token containing answer state and attempt count.
 *                 example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *     responses:
 *       200:
 *         description: Successfully processed the answer and updated the database.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: string
 *                   description: Confirmation message.
 *                   example: DONE
 *                 isCorrect:
 *                   type: boolean
 *                   description: Indicates if the answer was correct.
 *                   example: true
 *       400:
 *         description: Bad request due to missing parameters or invalid email.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   description: HTTP status code.
 *                   example: 400
 *                 error:
 *                   type: string
 *                   description: Error message explaining the issue.
 *                   example: JWT token was not specified
 *       401:
 *         description: Unauthorized request due to invalid or expired JWT token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message indicating JWT verification failure.
 *                   example: JWT issue: invalid token
 *       500:
 *         description: Internal server error due to issues with JWT verification, database connection, or other errors.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   description: HTTP status code.
 *                   example: 500
 *                 error:
 *                   type: string
 *                   description: Generic error message.
 *                   example: Internal server error
 *                 errorMsg:
 *                   type: string
 *                   description: Detailed error message for debugging.
 */

// Helper function to perform binary search for insertion position
const findInsertionPosition = (leaderboard: any[], points: number): number => {
  let left = 0;
  let right = leaderboard.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (leaderboard[mid].score === points) {
      return mid;
    } else if (leaderboard[mid].score > points) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return left;
};

// Helper function to update leaderboard
const updateLeaderboard = async (db: any, league: string, userData: any) => {
  const leaderboardColl = db.collection("leaderboard");

  // Check if user already exists in any league
  const existingUser = await leaderboardColl.findOne({
    username: userData.username,
  });

  if (existingUser) {
    // Update the leaderboard
    if (existingUser.league === league) {
      await leaderboardColl.updateOne(
        { username: userData.username },
        { $set: { score: userData.score } }
      );
    } else {
      await leaderboardColl.deleteOne({ username: userData.username });

      const currentLeaderboard = await leaderboardColl
        .find({ league })
        .sort({ score: -1 })
        .toArray();

      const insertionIndex = findInsertionPosition(
        currentLeaderboard,
        userData.score
      );

      currentLeaderboard.splice(insertionIndex, 0, userData);

      const updatedLeaderboard = currentLeaderboard.slice(0, 20);

      // Update the leaderboard in database
      await leaderboardColl.deleteMany({ league });
      if (updatedLeaderboard.length > 0) {
        await leaderboardColl.insertMany(updatedLeaderboard);
      }
    }
  } else {
    // User doesn't exist in any league - add to the new league
    // Get current leaderboard for the league
    const currentLeaderboard = await leaderboardColl
      .find({ league })
      .sort({ score: -1 })
      .toArray();

    // Find insertion position using binary search
    const insertionIndex = findInsertionPosition(
      currentLeaderboard,
      userData.score
    );

    // Insert the user at the correct position & only keep 20 entries
    currentLeaderboard.splice(insertionIndex, 0, userData);

    const updatedLeaderboard = currentLeaderboard.slice(0, 20);

    // Update the leaderboard in database
    await leaderboardColl.deleteMany({ league });
    if (updatedLeaderboard.length > 0) {
      await leaderboardColl.insertMany(updatedLeaderboard);
    }
  }
};

// Helper function to determine league based on points
const determineLeague = (points: number): string => {
  if (points >= 200) return "Platinum";
  if (points >= 100) return "Gold";
  if (points >= 50) return "Silver";
  if (points >= 20) return "Bronze";
  return "None";
};

export const POST = async (request: Request) => {
  const { encryptedPayload } = await request.json();

  if (!encryptedPayload) {
    return Response.json(
      {
        error: "Request improperly formatted",
      },
      { status: 400 }
    );
  }

  try {
    const decryptedPayload = await decryptPayload(encryptedPayload);
    if (
      typeof decryptedPayload !== "object" ||
      typeof decryptedPayload.isCorrect !== "boolean"
    ) {
      return Response.json(
        { error: "Invalid payload structure" },
        { status: 400 }
      );
    }
    const { isCorrect } = decryptedPayload;

    const session = await handleGetSession();
    const email = session?.user?.email;

    await client.connect();

    const db = client.db("DailySAT");
    const usersColl = db.collection("users");
    await usersColl.updateOne(
      { email },
      {
        $inc: {
          currency: isCorrect ? QUESTION_IS_CORRECT_POINTS : 0,
          correctAnswered: isCorrect ? 1 : 0,
          wrongAnswered: !isCorrect ? 1 : 0,
          points: isCorrect ? 1 : -1,
        },
      }
    );
    // Get updated user data for leaderboard
    const updatedUser = await usersColl.findOne({ email });
    if (updatedUser) {
      const league = determineLeague(updatedUser.points);
      if (league !== "None") {
        const userData = {
          score: updatedUser.points,
          username: updatedUser.name || "Anonymous User",
          league: league,
        };

        // Update leaderboard
        await updateLeaderboard(db, league, userData);
      }
    }

    // Return a success response
    return Response.json({
      result: "DONE",
      isCorrect,
    });
  } catch (error) {
    return Response.json({
      code: 500,
      error: "Internal servor error",
    });
  } finally {
    client.close();
  }
};
