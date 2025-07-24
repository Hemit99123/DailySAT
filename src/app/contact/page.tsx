"use client";

import React, { useState, useRef } from "react";
import Footer from "@/components/common/Footer";
import ErrorBoundary from "@/components/common/ErrorBoundary";
import { copyEmailToClipboard } from "@/lib/contact/mail";

interface FormData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  inquiry_type: string;
  message: string;
}

interface ValidationErrors {
  [key: string]: string;
}

const Contact = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    {}
  );
  const [emailCopyStatus, setEmailCopyStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Client-side validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    if (!phone) return true; // Phone is optional
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ""));
  };

  const validateRequired = (value: string, fieldName: string): boolean => {
    return value.trim().length > 0;
  };

  const validateMessage = (message: string): boolean => {
    return message.trim().length >= 10; // Minimum 10 characters
  };

  const validateForm = (formData: FormData): ValidationErrors => {
    const errors: ValidationErrors = {};

    // Validate required fields
    if (!validateRequired(formData.first_name, "first_name")) {
      errors.first_name = "First name is required";
    }

    if (!validateRequired(formData.last_name, "last_name")) {
      errors.last_name = "Last name is required";
    }

    if (!validateRequired(formData.email, "email")) {
      errors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!validateRequired(formData.inquiry_type, "inquiry_type")) {
      errors.inquiry_type = "Please select an inquiry type";
    }

    if (!validateRequired(formData.message, "message")) {
      errors.message = "Message is required";
    } else if (!validateMessage(formData.message)) {
      errors.message = "Message must be at least 10 characters long";
    }

    // Validate optional phone field
    if (formData.phone && !validatePhone(formData.phone)) {
      errors.phone = "Please enter a valid phone number";
    }

    return errors;
  };

  const handleInputChange = (fieldName: string, value: string) => {
    // Clear validation error when user starts typing
    if (validationErrors[fieldName]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);
    setValidationErrors({});

    // Get form data
    const formData = new FormData(e.currentTarget);
    const data: FormData = {
      first_name: formData.get("first_name") as string,
      last_name: formData.get("last_name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      inquiry_type: formData.get("inquiry_type") as string,
      message: formData.get("message") as string,
    };

    // Client-side validation
    const errors = validateForm(data);
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage({
          type: "success",
          text: "Thank you! Your message has been sent successfully. We'll get back to you soon.",
        });
        // Reset form
        if (formRef.current) {
          formRef.current.reset();
        }
      } else {
        setMessage({
          type: "error",
          text:
            result.error ||
            "Sorry, there was an error sending your message. Please try again.",
        });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "Sorry, there was an error sending your message. Please try again or contact us directly using the email options below.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getInputClassName = (fieldName: string) => {
    const baseClasses =
      "w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-100 disabled:cursor-not-allowed";
    const errorClasses = validationErrors[fieldName]
      ? "border-red-500 focus:ring-red-400"
      : "border-gray-300";
    return `${baseClasses} ${errorClasses}`;
  };

  const handleEmailCopy = async () => {
    const result = await copyEmailToClipboard("dailysatorg@gmail.com");
    setEmailCopyStatus(result);
    setTimeout(() => setEmailCopyStatus(null), 3000);
  };

  return (
    <div>
      {/* Contact Form & Info */}
      <div className="max-w-6xl mx-auto px-4 py-16 flex flex-col md:flex-row gap-12">
        {/* Form */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-2">Contact Form</h2>
          <p className="text-gray-500 mb-6">
            Fill out the form below and our team will get back to you as soon as
            possible.
          </p>

          {/* Success/Error Messages */}
          {message && (
            <div
              className={`mb-6 p-4 rounded-lg ${
                message.type === "success"
                  ? "bg-green-50 border border-green-200 text-green-800"
                  : "bg-red-50 border border-red-200 text-red-800"
              }`}
            >
              <div className="flex items-center">
                {message.type === "success" ? (
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
                {message.text}
              </div>
            </div>
          )}

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block font-medium mb-1">First Name *</label>
                <input
                  type="text"
                  name="first_name"
                  required
                  disabled={isLoading}
                  onChange={(e) =>
                    handleInputChange("first_name", e.target.value)
                  }
                  className={getInputClassName("first_name")}
                />
                {validationErrors.first_name && (
                  <p className="text-red-500 text-sm mt-1">
                    {validationErrors.first_name}
                  </p>
                )}
              </div>
              <div className="flex-1">
                <label className="block font-medium mb-1">Last Name *</label>
                <input
                  type="text"
                  name="last_name"
                  required
                  disabled={isLoading}
                  onChange={(e) =>
                    handleInputChange("last_name", e.target.value)
                  }
                  className={getInputClassName("last_name")}
                />
                {validationErrors.last_name && (
                  <p className="text-red-500 text-sm mt-1">
                    {validationErrors.last_name}
                  </p>
                )}
              </div>
            </div>
            <div>
              <label className="block font-medium mb-1">Email *</label>
              <input
                type="email"
                name="email"
                required
                disabled={isLoading}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className={getInputClassName("email")}
              />
              {validationErrors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {validationErrors.email}
                </p>
              )}
            </div>
            <div>
              <label className="block font-medium mb-1">Phone Number</label>
              <input
                type="tel"
                name="phone"
                disabled={isLoading}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className={getInputClassName("phone")}
                placeholder="(123) 456-7890"
              />
              {validationErrors.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {validationErrors.phone}
                </p>
              )}
            </div>
            <div>
              <label className="block font-medium mb-1">Inquiry Type *</label>
              <select
                name="inquiry_type"
                required
                disabled={isLoading}
                onChange={(e) =>
                  handleInputChange("inquiry_type", e.target.value)
                }
                className={getInputClassName("inquiry_type")}
              >
                <option value="">Select an option</option>
                <option value="general">General Inquiry</option>
                <option value="partnership">Partnership</option>
                <option value="support">Support</option>
                <option value="other">Other</option>
              </select>
              {validationErrors.inquiry_type && (
                <p className="text-red-500 text-sm mt-1">
                  {validationErrors.inquiry_type}
                </p>
              )}
            </div>
            <div>
              <label className="block font-medium mb-1">Message *</label>
              <textarea
                name="message"
                required
                disabled={isLoading}
                onChange={(e) => handleInputChange("message", e.target.value)}
                className={getInputClassName("message")}
                placeholder="Please provide details about your inquiry (minimum 10 characters)..."
              />
              {validationErrors.message && (
                <p className="text-red-500 text-sm mt-1">
                  {validationErrors.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`px-6 py-2 rounded font-semibold transition flex items-center justify-center ${
                isLoading
                  ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Sending...
                </>
              ) : (
                "Send Message"
              )}
            </button>
          </form>
        </div>
        {/* Contact Info */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-2">Get in Touch</h2>
          <p className="text-gray-500 mb-6">
            We'd love to hear from you! Whether you're interested in partnering
            with us, or have any questions, feel free to reach out.
          </p>
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-blue-600">
                {/* Email Icon */}
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="M3 7l9 6 9-6" />
                </svg>
              </span>
              <div className="flex-1">
                <div className="font-semibold">Email</div>
                <div className="text-gray-600">dailysatorg@gmail.com</div>
                {emailCopyStatus && (
                  <div
                    className={`text-sm mt-1 ${emailCopyStatus.success ? "text-green-600" : "text-red-600"}`}
                  >
                    {emailCopyStatus.message}
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleEmailCopy}
                  className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
                  title="Copy email to clipboard"
                >
                  Copy
                </button>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-blue-600">
                {/* Instagram Icon */}
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.5" y2="6.5" />
                </svg>
              </span>
              <div>
                <div className="font-semibold">Instagram</div>
                <div className="text-gray-600">
                  Follow us on our Journey
                  <br />
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
      </div>
      <Footer />
    </div>
  );
};

const ContactPage = () => {
  return (
    <ErrorBoundary>
      <Contact />
    </ErrorBoundary>
  );
};

export default ContactPage;
