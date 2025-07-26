import Groq from "groq-sdk";

interface GrokResponse {
  subject: string;
  html: string;
}

const groq = new Groq({
  apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY!,
});

export async function getWeeklyReminderFromGrok(): Promise<GrokResponse> {
  const prompt = `
You are writing a weekly SAT prep reminder email. The email should be motivational, brief, and sound encouraging.

Return only valid JSON with exactly these two fields:
1. A short, catchy subject line (5-8 words).
2. A concise HTML body (2-4 sentences) encouraging the student to stay on track with SAT prep this week. It must follow the HTML template below.

The JSON format must look like this, and must not include any extra explanation:
{
  "subject": "Important Reminder: {SUBJECT GOES HERE}",
  "html": "<div style="font-family: Arial, sans-serif; text-align: center; color: #434343;"><h1 style="color: #3182ce; font-size: 28px; margin: 0 0 10px;">DailySAT</h1><p style="font-size: 20px; color: #2d3748; margin: 0 0 20px;">{Catchy 5-8 word header with 1 emoji}</p><p style="font-size: 16px; line-height: 1.5; margin: 0 0 30px;">{2-4 sentence body text for the reminder}</p><a href="https://dailysat.org" style="display: inline-block; padding: 12px 20px; background-color: #3182ce; color: #ffffff; text-decoration: none; border-radius: 4px; font-size: 16px;">Start Practicing</a></div>"
}
`;
  const chatCompletion = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    model: "llama-3.3-70b-versatile",
  });

  const content = chatCompletion.choices[0]?.message?.content;

  if (!content) {
    throw new Error("Groq response was empty");
  }

  try {
    const parsed: GrokResponse = JSON.parse(content);
    console.log("DEBUG");
    console.log(parsed)
    return parsed;
  } catch (err) {
    console.error("Failed to parse Groq JSON:", content);
    throw new Error("Groq returned invalid JSON.");
  }
}
