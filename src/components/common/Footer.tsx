import Link from "next/link"
import { Github, Linkedin, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-b from-white to-blue-50 border-t px-6 py-12 md:px-16 md:py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
        {/* Company Info */}
        <div className="space-y-4">
          <div className="font-extrabold text-3xl bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            DailySAT
          </div>
          <p className="text-sm text-gray-600 max-w-sm leading-relaxed">
            Empowering students to excel on the SAT with personalized practice, comprehensive materials, and proven strategies.
          </p>
          <div className="flex space-x-4 pt-2">
            <a 
              href="https://github.com/yourusername/dailysat" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-blue-600 transition-colors hover:scale-110 transform duration-200"
            >
              <Github size={22} />
            </a>
            <a 
              href="https://twitter.com/dailysat" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-blue-600 transition-colors hover:scale-110 transform duration-200"
            >
              <Twitter size={22} />
            </a>
            <a 
              href="https://linkedin.com/company/dailysat" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-blue-600 transition-colors hover:scale-110 transform duration-200"
            >
              <Linkedin size={22} />
            </a>
          </div>
        </div>

        {/* Practice Links */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-800">Practice</h3>
          <ul className="space-y-2">
            {[
              { href: "/practice/math", label: "Math Practice" },
              { href: "/practice/english", label: "Reading & Writing" },
              { href: "/dashboard", label: "Dashboard" },
              { href: "/ai", label: "Study AI" },
            ].map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className="text-gray-600 hover:text-blue-600 transition-colors duration-200 hover:translate-x-1 transform inline-block">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Resources Links */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-800">Resources</h3>
          <ul className="space-y-2">
            {[
              { href: "/shop", label: "Shop" },
              { href: "/team", label: "Our Team" },
              { href: "/contact", label: "Contact" },
              { href: "/privacy-policy", label: "Privacy Policy" },
            ].map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className="text-gray-600 hover:text-blue-600 transition-colors duration-200 hover:translate-x-1 transform inline-block">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Legal/Footer Note */}
      <div className="border-t border-gray-200 pt-6 mt-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
        <p>© {new Date().getFullYear()} DailySAT. All rights reserved.</p>
        <div className="mt-2 md:mt-0">
          <Link href="/privacy-policy" className="hover:underline hover:text-blue-600">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  )
}
