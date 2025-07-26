import { sendEmail } from './email';

export async function sendToGroup(emails: string[], subject: string, html: string) {
  await Promise.all(
    emails.map(async (email) => {
      try {
        console.log(`Sending to ${email}`);
        await sendEmail(email, subject, html);
      } catch (err) {
        console.error(`Failed to send to ${email}:`, err);
      }
    })
  );
}