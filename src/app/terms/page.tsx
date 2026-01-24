'use client';

import { motion } from 'framer-motion';
import { FileText, Scale, AlertCircle, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function TermsPage() {
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
              <FileText className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-none mb-6">
              Terms of Service
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
              <h2 className="text-3xl font-bold text-[#1A1830] mb-4">1. Acceptance of Terms</h2>
              <p className="leading-relaxed">
                By accessing and using the Alpha Travels website and services, you accept and agree to be bound by 
                the terms and provision of this agreement. If you do not agree to abide by the above, please do not 
                use this service. These Terms of Service ("Terms") govern your access to and use of Alpha Travels' 
                website, mobile applications, and related services (collectively, the "Services").
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-[#1A1830] mb-4">2. Use of Services</h2>
              <h3 className="text-xl font-semibold text-[#1A1830] mb-3">2.1 Eligibility</h3>
              <p className="leading-relaxed mb-4">
                You must be at least 18 years old and have the legal capacity to enter into contracts to use our 
                Services. By using our Services, you represent and warrant that you meet these eligibility requirements.
              </p>

              <h3 className="text-xl font-semibold text-[#1A1830] mb-3">2.2 Account Registration</h3>
              <p className="leading-relaxed mb-4">
                To access certain features of our Services, you may be required to create an account. You agree to:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain and update your information to keep it accurate</li>
                <li>Maintain the security of your account credentials</li>
                <li>Accept responsibility for all activities under your account</li>
                <li>Notify us immediately of any unauthorized use</li>
              </ul>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-[#1A1830] mb-4">3. Bookings and Payments</h2>
              <h3 className="text-xl font-semibold text-[#1A1830] mb-3">3.1 Booking Process</h3>
              <p className="leading-relaxed mb-4">
                When you make a booking through our Services, you enter into a contract directly with the travel 
                service provider (airline, hotel, car rental company, etc.). Alpha Travels acts as an intermediary 
                and is not responsible for the services provided by third-party suppliers.
              </p>

              <h3 className="text-xl font-semibold text-[#1A1830] mb-3">3.2 Pricing</h3>
              <p className="leading-relaxed mb-4">
                All prices displayed on our website are subject to change without notice. Prices are confirmed at the 
                time of booking, but may be subject to additional fees, taxes, or surcharges imposed by service 
                providers or government authorities. You are responsible for paying all applicable fees and charges.
              </p>

              <h3 className="text-xl font-semibold text-[#1A1830] mb-3">3.3 Payment</h3>
              <p className="leading-relaxed">
                Payment must be made in full at the time of booking unless otherwise specified. We accept various 
                payment methods including credit cards, debit cards, and bank transfers. All payments are processed 
                securely through our payment partners. You agree to provide valid payment information and authorize 
                us to charge your payment method for all amounts due.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-[#1A1830] mb-4">4. Cancellations and Refunds</h2>
              <h3 className="text-xl font-semibold text-[#1A1830] mb-3">4.1 Cancellation Policy</h3>
              <p className="leading-relaxed mb-4">
                Cancellation policies vary by service provider and booking type. Some bookings may be non-refundable 
                or subject to cancellation fees. You are responsible for reviewing and understanding the cancellation 
                policy before completing your booking. Cancellation requests must be submitted through our platform 
                or customer service.
              </p>

              <h3 className="text-xl font-semibold text-[#1A1830] mb-3">4.2 Refunds</h3>
              <p className="leading-relaxed">
                Refunds, when applicable, will be processed according to the service provider's refund policy and 
                may take 7-14 business days to appear in your account. Processing fees may apply. We are not 
                responsible for delays in refund processing by payment processors or financial institutions.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-[#1A1830] mb-4">5. Travel Documents and Requirements</h2>
              <p className="leading-relaxed mb-4">
                You are solely responsible for ensuring that you have valid travel documents, including passports, 
                visas, health certificates, and any other required documentation for your destination. Alpha Travels 
                is not responsible for denied boarding, deportation, or any other consequences resulting from 
                insufficient or invalid travel documents.
              </p>
              <p className="leading-relaxed">
                It is your responsibility to check entry requirements, travel advisories, and health requirements 
                for your destination. We recommend consulting with relevant embassies or consulates and checking 
                government travel advisories before traveling.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-[#1A1830] mb-4">6. Limitation of Liability</h2>
              <p className="leading-relaxed mb-4">
                To the maximum extent permitted by law, Alpha Travels and its affiliates, officers, directors, 
                employees, and agents shall not be liable for any indirect, incidental, special, consequential, 
                or punitive damages, including but not limited to loss of profits, data, use, goodwill, or other 
                intangible losses, resulting from your use of or inability to use the Services.
              </p>
              <p className="leading-relaxed">
                Our total liability to you for all claims arising from or related to the Services shall not exceed 
                the amount you paid to us in the twelve (12) months preceding the claim, or one hundred dollars 
                ($100), whichever is greater.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-[#1A1830] mb-4">7. Intellectual Property</h2>
              <p className="leading-relaxed">
                All content, features, and functionality of the Services, including but not limited to text, graphics, 
                logos, icons, images, audio clips, digital downloads, and software, are the exclusive property of 
                Alpha Travels or its content suppliers and are protected by international copyright, trademark, and 
                other intellectual property laws. You may not reproduce, distribute, modify, create derivative works, 
                publicly display, or otherwise use any content without our prior written permission.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-[#1A1830] mb-4">8. Prohibited Activities</h2>
              <p className="leading-relaxed mb-4">You agree not to:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Use the Services for any illegal or unauthorized purpose</li>
                <li>Violate any laws in your jurisdiction</li>
                <li>Infringe upon the rights of others</li>
                <li>Transmit any viruses, malware, or harmful code</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Interfere with or disrupt the Services</li>
                <li>Use automated systems to access the Services without permission</li>
                <li>Impersonate any person or entity</li>
              </ul>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-[#1A1830] mb-4">9. Modifications to Services</h2>
              <p className="leading-relaxed">
                We reserve the right to modify, suspend, or discontinue any aspect of the Services at any time, 
                with or without notice. We may also impose limits on certain features or restrict access to parts 
                or all of the Services without notice or liability. We are not obligated to maintain or support any 
                particular feature or functionality.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-[#1A1830] mb-4">10. Changes to Terms</h2>
              <p className="leading-relaxed">
                We reserve the right to modify these Terms at any time. We will notify you of any material changes 
                by posting the new Terms on this page and updating the "Last updated" date. Your continued use of 
                the Services after such modifications constitutes acceptance of the updated Terms. If you do not agree 
                to the modified Terms, you must stop using the Services.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-[#1A1830] mb-4">11. Governing Law and Dispute Resolution</h2>
              <p className="leading-relaxed mb-4">
                These Terms shall be governed by and construed in accordance with the laws of Nigeria, without regard 
                to its conflict of law provisions. Any disputes arising from or relating to these Terms or the Services 
                shall be subject to the exclusive jurisdiction of the courts of Lagos, Nigeria.
              </p>
              <p className="leading-relaxed">
                Before filing a claim, you agree to first contact us to attempt to resolve the dispute informally. 
                If we cannot resolve the dispute within 30 days, either party may initiate formal proceedings.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-[#1A1830] mb-4">12. Severability</h2>
              <p className="leading-relaxed">
                If any provision of these Terms is found to be unenforceable or invalid, that provision shall be 
                limited or eliminated to the minimum extent necessary, and the remaining provisions shall remain in 
                full force and effect.
              </p>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-[#1A1830] mb-4">13. Contact Information</h2>
              <p className="leading-relaxed mb-4">
                If you have any questions about these Terms, please contact us:
              </p>
              <div className="bg-slate-50 rounded-xl p-6">
                <p className="font-semibold text-[#1A1830] mb-2">Alpha Travels</p>
                <p className="text-slate-700">Email: legal@alphatravels.com</p>
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
