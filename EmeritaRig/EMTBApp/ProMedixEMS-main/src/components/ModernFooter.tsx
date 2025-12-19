// Ultra-Modern Footer with Glass Morphism Design
// Features: WebConnect360 branding, responsive design, glass effects

import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  Mail, 
  Phone, 
  MapPin, 
  ExternalLink,
  Facebook,
  Twitter,
  Linkedin,
  Instagram
} from 'lucide-react';
import ProMedixLogo from './ProMedixLogo';

interface ModernFooterProps {
  className?: string;
}

const ModernFooter: React.FC<ModernFooterProps> = ({ className = '' }) => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    platform: [
      { title: 'Dashboard', href: '/dashboard' },
      { title: 'Curriculum', href: '/curriculum' },
      { title: 'Study Notes', href: '/study-notes' },
      { title: 'Clinical Calculators', href: '/calculators' },
      { title: 'Practice Center', href: '/practice' },
      { title: 'Scenarios', href: '/scenarios' }
    ],
    resources: [
      { title: 'Flashcards Library', href: '/flashcards' },
      { title: 'EMT-B Navigation', href: '/chapters' },
      { title: 'Balanced Quiz System', href: '/practice' },
      { title: 'Medical Disclaimer', href: '/disclaimer' },
      { title: 'Modern Landing', href: '/' }
    ],
    legal: [
      { title: 'Privacy Policy', href: '/privacy' },
      { title: 'Terms of Service', href: '/terms' },
      { title: 'Medical Disclaimer', href: '/disclaimer' },
      { title: 'Accessibility', href: '/accessibility' }
    ]
  };

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Instagram, href: '#', label: 'Instagram' }
  ];

  return (
    <footer className={`relative mt-20 ${className}`}>
      {/* Very Light Background */}
      <div className="absolute inset-0 bg-white dark:from-gray-800 dark:via-gray-700 dark:to-transparent"></div>
      
      {/* Main Footer Content */}
      <div className="relative">
        <div className="rounded-t-3xl border-x-0 border-b-0 bg-white dark:bg-gray-900/60">
          <div className="max-w-7xl mx-auto px-6 py-12">
            
            {/* Top Section */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
              
              {/* ProMedix Branding */}
              <div className="lg:col-span-1">
                <div className="mb-6">
                  <ProMedixLogo 
                    variant="full" 
                    size="lg" 
                  />
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  Revolutionary EMT training platform combining comprehensive curriculum, 
                  interactive scenarios, and cutting-edge tools for certification success.
                </p>
                
                {/* Social Links */}
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      aria-label={social.label}
                      className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 dark:bg-gray-800/50 dark:hover:bg-gray-700/50 flex items-center justify-center transition-all duration-300 hover:scale-110"
                    >
                      <social.icon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Platform Links */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
                  Platform
                </h3>
                <ul className="space-y-3">
                  {footerLinks.platform.map((link, index) => (
                    <li key={index}>
                      <Link
                        to={link.href}
                        className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 flex items-center group"
                      >
                        <span>{link.title}</span>
                        <ExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Resources */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
                  Resources
                </h3>
                <ul className="space-y-3">
                  {footerLinks.resources.map((link, index) => (
                    <li key={index}>
                      <Link
                        to={link.href}
                        className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 flex items-center group"
                      >
                        <span>{link.title}</span>
                        <ExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact Info */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
                  Get in Touch
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <a 
                      href="mailto:tech@webconnect360.com"
                      className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                    >
                      tech@webconnect360.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200/20 mb-8"></div>

            {/* Bottom Section */}
            <div className="flex flex-col lg:flex-row items-center justify-between space-y-6 lg:space-y-0">
              
              {/* Legal Links */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start space-x-6">
                {footerLinks.legal.map((link, index) => (
                  <Link
                    key={index}
                    to={link.href}
                    className="text-sm text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                  >
                    {link.title}
                  </Link>
                ))}
              </div>

              {/* WebConnect360 Branding */}
              <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-6">
                
                {/* Copyright */}
                <div className="text-sm text-gray-500 dark:text-gray-400 text-center lg:text-left">
                  © {currentYear} ProMedix EMS. All rights reserved.
                </div>

                {/* WebConnect360 Attribution */}
                <div className="flex items-center space-x-4 bg-white/5 dark:bg-gray-800/30 px-6 py-4 rounded-2xl backdrop-blur-sm border border-white/10">
                  <span className="text-base text-gray-600 dark:text-gray-400">
                    Designed by
                  </span>
                  <a
                    href="https://webconnect360.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 hover:scale-105 transition-transform duration-200 group"
                  >
                    <img 
                      src="/assets/webconnect360logo.png" 
                      alt="WebConnect360" 
                      className="h-20 w-auto object-contain"
                    />
                    <ExternalLink className="w-5 h-5 text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-all duration-200" />
                  </a>
                  <span className="text-base text-gray-500 dark:text-gray-400">•</span>
                  <span className="text-base text-gray-600 dark:text-gray-400">
                    Contact
                  </span>
                  <a
                    href="mailto:tech@webconnect360.com"
                    className="text-base font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200"
                  >
                    tech@webconnect360.com
                  </a>
                </div>
              </div>
            </div>

            {/* Made with Love */}
            <div className="mt-8 pt-8 border-t border-gray-200/20 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center space-x-2">
                <span>Made with</span>
                <Heart className="w-4 h-4 text-red-500 animate-pulse" />
                <span>for EMT professionals and students worldwide</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ModernFooter;