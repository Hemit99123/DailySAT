import { transporter } from "@/lib/nodemailer";
import { handleGetContactEmailContent } from "@/lib/nodemailer/emailTemplates";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { first_name, last_name, email, phone, inquiry_type, message } = body;

    // Server-side validation
    if (!first_name || !last_name || !email || !inquiry_type || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    try {
      await transporter.sendMail({
        from: "DailySAT <dailysatorg@gmail.com>",
        to: "DailySAT <dailysatorg@gmail.com>",
        subject: "New form submission - DailySAT CONTACT FORM",
        html: handleGetContactEmailContent(
          first_name,
          last_name,
          email,
          phone,
          inquiry_type,
          message
        ),
      });
    } catch (error) {
      throw new Error(`Failed to send email ${error}`);
    }

    return NextResponse.json(
      { message: "Message sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}
