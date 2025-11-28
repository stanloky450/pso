"use client";

import { FacebookShareButton, TwitterShareButton, WhatsappShareButton, LinkedinShareButton, EmailShareButton } from "react-share";
import { FaFacebook, FaTwitter, FaWhatsapp, FaLinkedin, FaEnvelope, FaShare } from "react-icons/fa";

interface SocialShareProps {
  url: string;
  title: string;
  description?: string;
}

const SocialShare = ({ url, title, description }: SocialShareProps) => {
  const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "");

  const shareButtons = [
    { Component: FacebookShareButton, Icon: FaFacebook, name: "Facebook", color: "#1877F2" },
    { Component: TwitterShareButton, Icon: FaTwitter, name: "Twitter", color: "#1DA1F2" },
    { Component: WhatsappShareButton, Icon: FaWhatsapp, name: "WhatsApp", color: "#25D366" },
    { Component: LinkedinShareButton, Icon: FaLinkedin, name: "LinkedIn", color: "#0A66C2" },
    { Component: EmailShareButton, Icon: FaEnvelope, name: "Email", color: "#EA4335" },
  ];

  return (
    <div className="card">
      <div className="flex items-center mb-4">
        <FaShare className="mr-3 text-2xl" style={{ color: "var(--secondary)" }} />
        <h3 className="text-xl font-bold" style={{ color: "var(--text)" }}>
          Share This Post
        </h3>
      </div>

      <div className="flex flex-wrap gap-3">
        {shareButtons.map(({ Component, Icon, name, color }) => (
          <Component
            key={name}
            url={shareUrl}
            title={title}
            {...(description && { subject: description })}
          >
            <button
              className="flex items-center px-4 py-2 rounded-lg transition-all transform hover:scale-105"
              style={{
                backgroundColor: color,
                color: "#ffffff",
              }}
              title={`Share on ${name}`}
            >
              <Icon className="mr-2" />
              <span className="hidden sm:inline">{name}</span>
            </button>
          </Component>
        ))}
      </div>
    </div>
  );
};

export default SocialShare;
