"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";

function Footer2() {
  const animation = {
    hide: { opacity: 0, y: 50 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <motion.footer
      initial="hide"
      whileInView="show"
      variants={animation}
      className="bg-white"
    >
      {/* TOP FOOTER */}
      <div className="max-w-7xl mx-auto py-20 px-6 flex flex-col md:flex-row items-start justify-between gap-24">
        {/* LEFT — LOGO */}
        <div className="flex flex-col items-start w-full md:w-1/4">
          <img
            src="/images/dayimMarketing/DayimSlogan.png"
            alt="Dayim Marketing"
            className="h-[140px] mb-4"
          />
        </div>

        {/* CENTER — ADDRESS + MAP */}
        <div className="flex flex-col items-center space-y-4 md:space-y-6 w-full md:w-1/3">
          <h3 className="text-2xl md:text-3xl font-bold text-second text-center">
            Our Address
          </h3>
          <p className="text-gray-700 text-center leading-relaxed text-base md:text-lg">
            Dayim Marketing, 9-A, 1st/F Main Commercial, <br />
            Al Kabir Town Phase 2, Raiwind Road, Lahore, Pakistan
          </p>

          {/* Map */}
          <div className="w-full h-36 md:h-44 rounded-lg overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3401.6571532328453!2d74.32802531510347!3d31.499913981398533!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39190340e1a2b0ab%3A0x64659e74023f7933!2sAl-Kabir%20Town%20Phase%202%2C%20Lahore%2C%20Pakistan!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        {/* RIGHT — WHATSAPP + CONTACT + PRIVACY */}
        <div className="flex flex-col items-end space-y-6 w-full md:w-1/4">
          <h3 className="text-2xl md:text-3xl font-bold text-second text-right">
            Contact
          </h3>

          <p className="text-gray-800 text-lg md:text-xl font-semibold text-right">
            WhatsApp:{" "}
            <a
              href="https://wa.me/923085111176"
              className="text-second underline hover:text-third transition"
            >
              +92-308-5111176
            </a>
          </p>

          <Link
            href="/contact"
            className="bg-second text-white font-semibold py-3 px-8 rounded-xl shadow-lg hover:scale-105 transition text-lg text-center"
          >
            Contact Us
          </Link>

          <Link
            href="/privacy-policy"
            className="text-second underline hover:text-third font-medium transition text-right"
          >
            Privacy & Policy
          </Link>
        </div>
      </div>

      {/* BOTTOM COPYRIGHT */}
      <div className="bg-black py-6">
        <p className="text-center text-white font-semibold tracking-wide text-sm md:text-base">
          © {new Date().getFullYear()} Dayim Marketing. All Rights Reserved.
        </p>
      </div>
    </motion.footer>
  );
}

export default Footer2;
