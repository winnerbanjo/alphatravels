'use client';

import { motion } from 'framer-motion';
import { Shield, Lock, Eye, FileText } from 'lucide-react';
import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-b from-[#1A1830] to-[#2A2540]">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Shield className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-none mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto font-light">
              Last updated: January 24, 2025
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-4xl prose prose-lg max-w-none">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8 text-slate-700"
          >
            <div>
              <h2 className="text-3xl font-bold text-[#1A1830] mb-4">1. Introduction</h2>
              <p className="leading-relaxed">
                Alpha Travels ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy 
                explains how we collect, use, disclose, and safeguard your information when you visit our website, 
                use our services, or interact with us. Please read this privacy policy carefully. If you do not agree 
                with the terms of this privacy policy, please do not access the site or use our services.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-[#1A1830] mb-4">2. Information We Collect</h2>
              <h3 className="text-xl font-semibold text-[#1A1830] mb-3">2.1 Personal Information</h3>
              <p className="leading-relaxed mb-4">
                We may collect personal information that you voluntarily provide to us when you:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li>Register for an account or use our services</li>
                <li>Book flights, hotels, or other travel services</li>
                <li>Subscribe to our newsletter or marketing communications</li>
                <li>Contact us for customer support</li>
                <li>Participate in surveys or promotional activities</li>
              </ul>
              <p className="leading-relaxed mb-4">
                This information may include: name, email address, phone number, passport details, date of birth, 
                payment information, travel preferences, and other information necessary to provide our services.
              </p>

              <h3 className="text-xl font-semibold text-[#1A1830] mb-3">2.2 Automatically Collected Information</h3>
              <p className="leading-relaxed">
                When you visit our website, we automatically collect certain information about your device, including 
                your IP address, browser type, operating system, access times, and the pages you have viewed directly 
                before and after accessing our site. We may also collect information about your interactions with our 
                website, such as clicks, page views, and time spent on pages.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-[#1A1830] mb-4">3. How We Use Your Information</h2>
              <p className="leading-relaxed mb-4">We use the information we collect to:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Process and manage your bookings and travel arrangements</li>
                <li>Communicate with you about your bookings, account, or our services</li>
                <li>Send you marketing communications (with your consent)</li>
                <li>Improve our website, services, and user experience</li>
                <li>Detect, prevent, and address technical issues and fraud</li>
                <li>Comply with legal obligations and enforce our terms</li>
                <li>Respond to your inquiries and provide customer support</li>
              </ul>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-[#1A1830] mb-4">4. Information Sharing and Disclosure</h2>
              <p className="leading-relaxed mb-4">
                We may share your information in the following circumstances:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li><strong>Service Providers:</strong> We share information with third-party service providers who 
                perform services on our behalf, such as payment processing, data analysis, email delivery, hosting 
                services, and customer service.</li>
                <li><strong>Travel Partners:</strong> We share necessary information with airlines, hotels, car rental 
                companies, and other travel service providers to fulfill your bookings.</li>
                <li><strong>Legal Requirements:</strong> We may disclose your information if required by law or in 
                response to valid requests by public authorities.</li>
                <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, 
                your information may be transferred as part of that transaction.</li>
              </ul>
              <p className="leading-relaxed">
                We do not sell your personal information to third parties for their marketing purposes.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-[#1A1830] mb-4">5. Data Security</h2>
              <p className="leading-relaxed">
                We implement appropriate technical and organizational security measures to protect your personal 
                information against unauthorized access, alteration, disclosure, or destruction. However, no method 
                of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee 
                absolute security. We use industry-standard encryption technologies and secure payment processing 
                systems to protect sensitive information.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-[#1A1830] mb-4">6. Your Rights and Choices</h2>
              <p className="leading-relaxed mb-4">Depending on your location, you may have the following rights:</p>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>Access:</strong> Request access to your personal information</li>
                <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                <li><strong>Objection:</strong> Object to processing of your personal information</li>
                <li><strong>Portability:</strong> Request transfer of your information to another service</li>
                <li><strong>Withdrawal:</strong> Withdraw consent for data processing where applicable</li>
              </ul>
              <p className="leading-relaxed mt-4">
                To exercise these rights, please contact us using the information provided in the "Contact Us" section below.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-[#1A1830] mb-4">7. Cookies and Tracking Technologies</h2>
              <p className="leading-relaxed">
                We use cookies and similar tracking technologies to track activity on our website and store certain 
                information. Cookies are files with a small amount of data that may include an anonymous unique identifier. 
                You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, 
                if you do not accept cookies, you may not be able to use some portions of our website.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-[#1A1830] mb-4">8. International Data Transfers</h2>
              <p className="leading-relaxed">
                Your information may be transferred to and processed in countries other than your country of residence. 
                These countries may have data protection laws that differ from those in your country. We take appropriate 
                measures to ensure that your information receives an adequate level of protection in accordance with 
                applicable data protection laws.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-[#1A1830] mb-4">9. Children's Privacy</h2>
              <p className="leading-relaxed">
                Our services are not intended for individuals under the age of 18. We do not knowingly collect personal 
                information from children. If you become aware that a child has provided us with personal information, 
                please contact us, and we will take steps to delete such information.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-[#1A1830] mb-4">10. Changes to This Privacy Policy</h2>
              <p className="leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the 
                new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this 
                Privacy Policy periodically for any changes.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-[#1A1830] mb-4">11. Contact Us</h2>
              <p className="leading-relaxed mb-4">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="bg-slate-50 rounded-xl p-6">
                <p className="font-semibold text-[#1A1830] mb-2">Alpha Travels</p>
                <p className="text-slate-700">Email: privacy@alphatravels.com</p>
                <p className="text-slate-700">Phone: +234 800 000 0000</p>
                <p className="text-slate-700">Address: 123 Victoria Island, Lagos, Nigeria</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-[#1A1830]">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl p-12 shadow-2xl"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1830] mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-lg text-slate-600 mb-8">
              Book a consultation with our travel experts today
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#1A1830] text-white rounded-xl font-semibold hover:bg-[#1A1830]/90 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Book a Consultation
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
