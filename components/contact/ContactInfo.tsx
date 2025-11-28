"use client";

import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const ContactInfo = () => {
  const contactDetails = [
    {
      icon: FaMapMarkerAlt,
      title: "Address",
      info: ["RCCG Jesus Embassy", "Lagos, Nigeria"],
    },
    {
      icon: FaPhone,
      title: "Phone",
      info: ["+234 XXX XXX XXXX", "+234 XXX XXX XXXX"],
    },
    {
      icon: FaEnvelope,
      title: "Email",
      info: ["contact@pastorsolaolukoya.com", "info@pastorsolaolukoya.com"],
    },
    {
      icon: FaClock,
      title: "Service Times",
      info: ["Sunday Service: 8:00 AM & 10:00 AM", "Midweek Service: Wednesday 6:00 PM"],
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="space-y-8"
    >
      <div>
        <h2 className="text-3xl font-bold mb-6 gradient-text">Contact Information</h2>
        <p className="text-text-muted leading-relaxed mb-8">
          We're here to serve you. Feel free to reach out through any of the
          following channels, and we'll respond as quickly as possible.
        </p>
      </div>

      <div className="space-y-6">
        {contactDetails.map((detail, index) => (
          <motion.div
            key={detail.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card bg-primary-light flex items-start space-x-4"
          >
            <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center flex-shrink-0">
              <detail.icon className="text-primary text-xl" />
            </div>
            <div>
              <h3 className="text-secondary font-bold mb-2">{detail.title}</h3>
              {detail.info.map((line, i) => (
                <p key={i} className="text-text-muted">
                  {line}
                </p>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Social Media */}
      <div className="card bg-gradient-to-br from-primary to-primary-light">
        <h3 className="text-secondary font-bold mb-4 text-center">
          Connect With Us
        </h3>
        <div className="flex justify-center space-x-4">
          <a
            href="#"
            className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center hover:bg-secondary-dark transition-colors"
          >
            <FaFacebook className="text-primary text-xl" />
          </a>
          <a
            href="#"
            className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center hover:bg-secondary-dark transition-colors"
          >
            <FaTwitter className="text-primary text-xl" />
          </a>
          <a
            href="#"
            className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center hover:bg-secondary-dark transition-colors"
          >
            <FaInstagram className="text-primary text-xl" />
          </a>
          <a
            href="#"
            className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center hover:bg-secondary-dark transition-colors"
          >
            <FaYoutube className="text-primary text-xl" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactInfo;
