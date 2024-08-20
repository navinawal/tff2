"use client";
import React from 'react';
import Image from "next/image";
import Link from "next/link";
import { socialLinks } from "@/config/site";

const AuthContainer = ({ heading, subHeading, footerHeading, footerLinkText, footerLink, children }) => {
  return (
    <div className="min-h-screen w-full bg-black text-white flex items-center justify-center p-4 relative overflow-hidden">
      <div className="w-full max-w-md md:max-w-lg lg:max-w-xl relative z-10">
        <div className="bg-black/70 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-gray-800">
          <div className="p-6 md:p-8">
            {/* Content */}
            <div>
              {/* Header */}
              <div className="flex items-center justify-center mb-6 space-x-4">
                <h1 className="text-sm md:text-lg lg:text-xl font-bold text-gray-300 whitespace-nowrap" style={{ textTransform: 'uppercase', fontFamily: 'Arial Narrow, sans-serif' }}>
                  Welcome to
                </h1>
                <div className="relative w-28 h-10 md:w-36 md:h-14">
                  <Image
                    src="/logo_white.png"
                    alt="Logo"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{
                      objectFit: "contain"
                    }}
                    className="opacity-90"
                  />
                </div>
              </div>
              
              {/* Form Elements */}
              <div className="space-y-4 md:space-y-6">{children}</div>
              
              {/* Footer Section */}
              <div className="text-center mt-8 text-xs md:text-sm text-gray-400">
                {footerHeading}{' '}
                <Link href={footerLink} className="text-white hover:text-gray-300 transition-colors">
                  {footerLinkText}
                </Link>
              </div>

              {/* Social Icons */}
              <div className="mt-6">
                <ul className="flex justify-center gap-4 md:gap-6">
                  {socialLinks.map((socialLink) => (
                    <li key={socialLink.name}>
                      <Link
                        href={socialLink.href}
                        target="_blank"
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        {socialLink.icon}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthContainer;
