import React from 'react';
import { Shield, Lock, FileText, AlertCircle, Mail, HelpCircle, Phone, CheckCircle, BookOpen, LifeBuoy, MessageCircle } from 'lucide-react';

// --- Shared Layout Component ---
const LegalPageContainer: React.FC<{ title: string; subtitle: string; icon?: React.ReactNode; children: React.ReactNode }> = ({ title, subtitle, icon, children }) => (
  <main className="pt-24 pb-16 min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center p-3 bg-blue-100 dark:bg-blue-900/30 rounded-2xl mb-4 text-blue-600 dark:text-blue-400">
          {icon || <Shield className="w-8 h-8" />}
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">{title}</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">{subtitle}</p>
      </div>
      
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="p-8 md:p-12 space-y-8 text-slate-700 dark:text-slate-300 leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  </main>
);

// --- Privacy Policy Component ---
export const PrivacyPolicy: React.FC = () => (
  <LegalPageContainer
    title="Privacy Policy"
    subtitle="How we protect and manage your data"
    icon={<Lock className="w-8 h-8" />}
  >
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <div className="flex items-center gap-3 text-blue-600 dark:text-blue-400 mb-6">
        <Lock className="w-6 h-6" />
        <h2 className="text-2xl font-bold m-0">Data Privacy Commitment</h2>
      </div>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">Last Updated: November 29, 2025</p>
      
      <section className="space-y-4 mb-8">
        <h3 className="text-xl font-semibold text-slate-900 dark:text-white">1. HIPAA Compliance Statement</h3>
        <p>
          ProMedix EMS is designed as an educational platform and does not collect, store, or process any 
          Personal Health Information (PHI) or patient data. This app is intended solely for medical 
          education and training purposes for Emergency Medical Technicians (EMTs) and healthcare 
          professionals.
        </p>
      </section>

      <section className="space-y-4 mb-8">
        <h3 className="text-xl font-semibold text-slate-900 dark:text-white">2. Information We Collect</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Educational Data:</strong> We may collect anonymized learning progress, quiz scores, and study session data to improve educational content.</li>
          <li><strong>Device Information:</strong> Basic device information for app functionality and crash reporting (iOS/Android version, device model).</li>
          <li><strong>No Patient Information:</strong> We explicitly do NOT collect any patient names, medical records, or real patient scenarios.</li>
        </ul>
      </section>

      <section className="space-y-4 mb-8">
        <h3 className="text-xl font-semibold text-slate-900 dark:text-white">3. Data Security</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>All data is encrypted in transit using TLS 1.3</li>
          <li>Local data storage uses AES-256 encryption</li>
          <li>No sensitive medical data is stored on device</li>
          <li>Regular security audits and penetration testing</li>
        </ul>
      </section>

      <section className="space-y-4 mb-8">
        <h3 className="text-xl font-semibold text-slate-900 dark:text-white">4. Educational Use Only</h3>
        <p>
          This application is designed exclusively for educational purposes. The scenarios, cases, and 
          medical information provided are for training use only and should never be used for actual 
          patient care decisions. Always consult current protocols and medical direction for real 
          patient scenarios.
        </p>
      </section>

      <section className="space-y-4 mb-8">
        <h3 className="text-xl font-semibold text-slate-900 dark:text-white">5. Contact Information</h3>
        <p>For privacy questions or data requests:</p>
        <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
          <p><strong>Email:</strong> privacy@promedixems.com</p>
          <p><strong>Privacy Officer:</strong> HIPAA Compliance Team</p>
        </div>
      </section>
    </div>
  </LegalPageContainer>
);

// --- Terms of Service Component ---
export const TermsOfService: React.FC = () => (
  <LegalPageContainer
    title="Terms of Service"
    subtitle="Rules and regulations for using ProMedix EMS"
    icon={<FileText className="w-8 h-8" />}
  >
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">Last Updated: November 29, 2025</p>

      <section className="space-y-4 mb-8">
        <h3 className="text-xl font-semibold text-slate-900 dark:text-white">1. Acceptance of Terms</h3>
        <p>
          By downloading, installing, or using ProMedix EMS ("the App"), you agree to be bound by these Terms of Service. 
          If you do not agree to these terms, do not use the App.
        </p>
      </section>

      <section className="space-y-4 mb-8">
        <h3 className="text-xl font-semibold text-slate-900 dark:text-white">2. Educational Purpose Only</h3>
        <p>
          ProMedix EMS is designed exclusively for educational purposes in emergency medical services training. 
          The App is NOT intended for:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Clinical decision-making</li>
          <li>Patient diagnosis or treatment</li>
          <li>Emergency medical guidance</li>
          <li>Replacement of professional medical training</li>
          <li>Substitute for current medical protocols</li>
        </ul>
      </section>

      <section className="space-y-4 mb-8">
        <h3 className="text-xl font-semibold text-slate-900 dark:text-white">3. User Responsibilities</h3>
        <p>You agree to:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Use the App solely for educational purposes</li>
          <li>Maintain the confidentiality of your account credentials</li>
          <li>Not share account access with unauthorized users</li>
          <li>Follow all applicable laws and regulations</li>
        </ul>
      </section>

      <section className="space-y-4 mb-8">
        <h3 className="text-xl font-semibold text-slate-900 dark:text-white">4. Medical Disclaimer & Limitation of Liability</h3>
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 rounded-lg">
          <p className="font-bold text-red-700 dark:text-red-400 mb-2">IMPORTANT MEDICAL DISCLAIMER:</p>
          <p className="text-red-600 dark:text-red-300">
            ProMedix EMS provides educational content only. We expressly disclaim any responsibility for medical decisions made based on App content, patient care outcomes, or professional certification results.
          </p>
          <p className="font-bold text-red-700 dark:text-red-400 mt-4">
            IN MEDICAL EMERGENCIES: Call 911 immediately. Never delay emergency care to consult this App.
          </p>
        </div>
      </section>

      <section className="space-y-4 mb-8">
        <h3 className="text-xl font-semibold text-slate-900 dark:text-white">5. Contact Information</h3>
        <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
          <p><strong>Email:</strong> legal@promedixems.com</p>
          <p><strong>Legal Department:</strong> ProMedix EMS Terms & Conditions</p>
          <p><strong>Response Time:</strong> 48-72 hours</p>
        </div>
      </section>
    </div>
  </LegalPageContainer>
);

// --- Medical Disclaimer Component ---
export const MedicalDisclaimer: React.FC = () => (
  <LegalPageContainer
    title="Medical Disclaimer"
    subtitle="Important information regarding medical education content"
    icon={<AlertCircle className="w-8 h-8" />}
  >
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-6 rounded-xl mb-8">
        <div className="flex items-center gap-3 mb-4">
          <AlertCircle className="w-6 h-6 text-amber-600 dark:text-amber-400" />
          <h3 className="text-xl font-bold text-amber-800 dark:text-amber-300 m-0">FOR EDUCATIONAL PURPOSES ONLY</h3>
        </div>
        <p className="text-amber-900 dark:text-amber-200">
          This application is designed exclusively for emergency medical services (EMS) education and training. 
          The content provided is NOT intended for use in actual patient care situations.
        </p>
      </div>

      <section className="space-y-4 mb-8">
        <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Professional Use Requirements</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>Always follow your local protocols and medical director's orders</li>
          <li>This app does not replace formal EMT-B training or certification</li>
          <li>Scenarios are simulated and may not reflect real patient conditions</li>
          <li>Always verify drug dosages and protocols with current resources</li>
        </ul>
      </section>

      <section className="space-y-4 mb-8">
        <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Scope of Practice</h3>
        <p>
          Content is aligned with EMT-Basic scope of practice but may vary by jurisdiction. 
          Always verify with your local medical director and state protocols before applying 
          any procedures or medications in real situations.
        </p>
      </section>

      <section className="space-y-4 mb-8">
        <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Emergency Situations</h3>
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 rounded-lg text-center">
          <p className="font-bold text-red-700 dark:text-red-400 text-lg">
            IN REAL EMERGENCIES: Call 911 immediately.
          </p>
          <p className="text-red-600 dark:text-red-300 mt-2">
            Never delay emergency care to consult this app.
          </p>
        </div>
      </section>

      <section className="space-y-4 mb-8">
        <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Liability Limitation</h3>
        <p>
          ProMedix EMS, its developers, and content contributors assume no responsibility for 
          decisions made based on this educational content. Users are solely responsible for 
          their professional practice and patient care decisions.
        </p>
      </section>
    </div>
  </LegalPageContainer>
);

// --- Support Center Component ---
export const SupportCenter: React.FC = () => (
  <LegalPageContainer
    title="Support Center"
    subtitle="We're here to help you succeed"
    icon={<LifeBuoy className="w-8 h-8" />}
  >
    <div className="grid md:grid-cols-2 gap-6 mb-12">
      <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl border border-blue-100 dark:border-blue-800">
        <div className="flex items-center gap-3 mb-4">
          <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          <h3 className="text-lg font-bold text-blue-900 dark:text-blue-300">Knowledge Base</h3>
        </div>
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          Browse our comprehensive guides, tutorials, and FAQs to get the most out of ProMedix EMS.
        </p>
        <button className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
          Browse Articles →
        </button>
      </div>

      <div className="bg-emerald-50 dark:bg-emerald-900/20 p-6 rounded-2xl border border-emerald-100 dark:border-emerald-800">
        <div className="flex items-center gap-3 mb-4">
          <MessageCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
          <h3 className="text-lg font-bold text-emerald-900 dark:text-emerald-300">Live Chat</h3>
        </div>
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          Chat with our support team for immediate assistance during business hours (9am - 5pm EST).
        </p>
        <button className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline">
          Start Chat →
        </button>
      </div>
    </div>

    <div className="space-y-8">
      <section>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Common Topics</h3>
        <div className="grid gap-4">
          {[
            "Account & Subscription Management",
            "Technical Troubleshooting",
            "Content & Curriculum Questions",
            "App Features & Navigation",
            "Certification & Progress Tracking"
          ].map((topic, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer group">
              <span className="text-slate-700 dark:text-slate-300 font-medium">{topic}</span>
              <HelpCircle className="w-5 h-5 text-slate-400 group-hover:text-blue-500 transition-colors" />
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 dark:bg-slate-900/50 p-8 rounded-2xl text-center">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Still need help?</h3>
        <p className="text-slate-600 dark:text-slate-400 mb-6">Our team is ready to assist you with any questions or concerns.</p>
        <a href="mailto:support@promedixems.com" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors">
          <Mail className="w-5 h-5" />
          Contact Support
        </a>
      </section>
    </div>
  </LegalPageContainer>
);

// --- Contact Us Component ---
export const ContactUs: React.FC = () => (
  <LegalPageContainer
    title="Contact Us"
    subtitle="Get in touch with the ProMedix EMS team"
    icon={<Mail className="w-8 h-8" />}
  >
    <div className="grid lg:grid-cols-2 gap-12">
      <div className="space-y-8">
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Get in Touch</h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Whether you have a question about our curriculum, need technical assistance, or want to explore partnership opportunities, we're here to help.
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl text-blue-600 dark:text-blue-400">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white">Email Us</h4>
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-1">General Inquiries</p>
              <a href="mailto:hello@promedixems.com" className="text-blue-600 dark:text-blue-400 hover:underline">hello@promedixems.com</a>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl text-emerald-600 dark:text-emerald-400">
              <LifeBuoy className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white">Support</h4>
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-1">Technical Assistance</p>
              <a href="mailto:support@promedixems.com" className="text-emerald-600 dark:text-emerald-400 hover:underline">support@promedixems.com</a>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl text-purple-600 dark:text-purple-400">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white">Phone</h4>
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-1">Mon-Fri, 9am-5pm EST</p>
              <a href="tel:+18005550123" className="text-purple-600 dark:text-purple-400 hover:underline">+1 (800) 555-0123</a>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-50 dark:bg-slate-900/50 p-8 rounded-2xl border border-slate-200 dark:border-slate-700">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Send us a Message</h3>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Name</label>
            <input type="text" className="w-full px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="Your name" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label>
            <input type="email" className="w-full px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="your@email.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Subject</label>
            <select className="w-full px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all">
              <option>General Inquiry</option>
              <option>Technical Support</option>
              <option>Billing Question</option>
              <option>Partnership</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Message</label>
            <textarea rows={4} className="w-full px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="How can we help you?"></textarea>
          </div>
          <button type="button" className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-blue-500/30">
            Send Message
          </button>
        </form>
      </div>
    </div>
  </LegalPageContainer>
);
