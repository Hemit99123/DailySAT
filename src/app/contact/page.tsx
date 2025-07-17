import React from "react";
import Footer from "@/components/common/Footer";

const faqs = [
  {
    question: "Is Dailysat completely free for everyone to use?",
    answer: "DailySat is completely free for anyone to be able to use, and our code is even open-sourced! We boast many features including a practice section, a shop where you can buy certain items with our pay-to-play model, and also will include all of the official, collegeboard certified, practice tests to truly embody and revolutionize how to study for the digital sat.",
  },
  {
    question: "How are we different from other digital sat resources?",
    answer: "We offer personalized question sets based on your performance data, adjusting the difficulty through our algorithm to make sure that you get the proper SAT suite experience. We are working on building an AI-driven progress insight, and reccomending action items as well for what needs to be done. We are proud of the game-like experience using streaks and milestones, with many users reporting that they are \"addicted\" to the site.",
  },
  {
    question: "Can I trust the accuracy and difficulty level of the questions?",
    answer: "Yes, you can most certainly trust the difficulty and accuracy level of the questions, as they are taken directly from collegeboard's sat question bank and from other sources as well. Every question has been thoroughly checked to see that it matches the standard that we would like to uphold here at DailySat. Each question also contains an elaborative explanation, and you can further reinforce your understanding through these questions.",
  },
  {
    question: "Can I use DailySAT on mobile devices?",
    answer: "Yes, DailySat has been optimized by our development team for mobile browsers and is fully compatible via smartphones and tablets. We are also currently working on our own, specialized mobile app for this purpose that will be released shortly, in which we want everyone to use, free forever. We also offer a learning platform where users can physically learn the content to best prepare for the digital sat, much like Khan Academy's and even exceeding them in certain areas as well.",
  },
];

const Contact = () => (
  <div className="min-h-screen bg-gray-50">
    {/* Hero */}
    <section className="w-full bg-blue-600 py-16 text-center text-white">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Contact Us</h1>
      <p className="text-lg md:text-xl font-medium">
        Have questions about our program? We're here to help!
      </p>
    </section>

    {/* Contact Form & Info */}
    <section className="max-w-6xl mx-auto px-4 py-16 flex flex-col md:flex-row gap-12">
      {/* Form */}
      <div className="flex-1">
        <h2 className="text-2xl font-bold mb-2">Contact Form</h2>
        <p className="text-gray-500 mb-6">
          Fill out the form below and our team will get back to you as soon as possible.
        </p>
        <form action="https://formsubmit.co/dailysatstaff@gmail.com" method="POST" className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block font-medium mb-1">First Name</label>
              <input 
                type="text" 
                name="first_name" 
                required 
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" 
              />
            </div>
            <div className="flex-1">
              <label className="block font-medium mb-1">Last Name</label>
              <input 
                type="text" 
                name="last_name" 
                required 
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" 
              />
            </div>
          </div>
          <div>
            <label className="block font-medium mb-1">Email</label>
            <input 
              type="email" 
              name="email" 
              required 
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" 
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Phone Number</label>
            <input 
              type="tel" 
              name="phone" 
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" 
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Inquiry Type</label>
            <select 
              name="inquiry_type" 
              required 
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select an option</option>
              <option value="general">General Inquiry</option>
              <option value="partnership">Partnership</option>
              <option value="support">Support</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="block font-medium mb-1">Message</label>
            <textarea 
              name="message" 
              required 
              className="w-full border rounded px-3 py-2 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-blue-400" 
            />
          </div>
          
          {/* Hidden fields for formsubmit.co configuration */}
          <input type="hidden" name="_subject" value="New Contact Form Submission - DailySAT" />
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_template" value="table" />
          
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded font-semibold hover:bg-blue-700 transition"
          >
            Send Message
          </button>
        </form>
      </div>
      {/* Contact Info */}
      <div className="flex-1">
        <h2 className="text-2xl font-bold mb-2">Get in Touch</h2>
        <p className="text-gray-500 mb-6">
          We'd love to hear from you! Whether you're interested in partnering with us, or have any questions, feel free to reach out.
        </p>
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="text-blue-600">
              {/* Email Icon */}
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="M3 7l9 6 9-6" />
              </svg>
            </span>
            <div>
              <div className="font-semibold">Email</div>
              <div className="text-gray-600">dailysatstaff@gmail.com</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-blue-600">
              {/* Instagram Icon */}
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.5" y2="6.5" />
              </svg>
            </span>
            <div>
              <div className="font-semibold">Instagram</div>
              <div className="text-gray-600">
                Follow us on our Journey<br />
                <a
                  href="https://www.instagram.com/dailysatorg/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  @dailysatorg
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* FAQ Section */}
    <section className="w-full bg-blue-50 py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-blue-700 text-center">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow p-6 h-fit">
              <div className="font-semibold text-lg text-blue-800 mb-3">{faq.question}</div>
              <div className="text-gray-700 text-sm leading-relaxed">{faq.answer}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
    <Footer />
  </div>
);

export default Contact;