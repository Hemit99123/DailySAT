import { QUESTION_IS_CORRECT_POINTS } from '@/data/constant';
import { client } from '@/lib/mongo';
import { handleGetSession } from '@/lib/auth/authActions';
import { decryptPayload } from '@/lib/cryptojs';

/**
 * @swagger
 * /api/questions/handle-submit:
 *   post:
 *     summary: Process user answer and update database
 *     description: >
 *       Verifies a JWT token, extracts the user's answer state and attempt count, 
 *       and updates the user's data in the database accordingly.
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


export const POST = async (request: Request) => {
  const { encryptedPayload } = await request.json();

  if (!encryptedPayload) {
    return Response.json({
      error: 'encryptedPayload was not specified',
    }, { status: 400 });
  }

  try {
    const decryptedPayload = await decryptPayload(encryptedPayload);
    const { isCorrect } = decryptedPayload;

    if (!isCorrect) {
      throw new Error("All required fields not found in body")
    }

    const session = await handleGetSession();
    const email = session?.user?.email;

    await client.connect();

    const db = client.db("DailySAT");
    const usersColl = db.collection('users');
    
    await usersColl.updateOne(
      { email },
      {
        $inc: {
          currency: isCorrect ? QUESTION_IS_CORRECT_POINTS : 0,
          correctAnswered: isCorrect ? 1 : 0,
          wrongAnswered: !isCorrect ? 1 : 0,
        },
      }
    );

    client.close();

    // Return a success response
    return Response.json({
      result: 'DONE',
      isCorrect,
    });
  } catch (error) {
    return Response.json({
      code: 500,
      error: error,
    });
  }
}
