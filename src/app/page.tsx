"use client";

import { useState } from "react";

export default function EmailForm() {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target.files;
    if (fileInput && fileInput.length > 0) {
      setFile(fileInput[0]);
    }
  };

  const sendEmail = async () => {
    const formData = new FormData();
    formData.append(
      "subject",
      "Test email from Next.js app on Vercel using Mailtrap"
    );
    formData.append(
      "text",
      "This is a test email sent from a Next.js app deployed on Vercel using Mailtrap."
    );
    formData.append("to", "cc57d3ca6e-292fc7@inbox.mailtrap.io");

    if (file) {
      formData.append("file", file);
    }

    const res = await fetch("/api/send-email", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      alert("Email sent successfully");
    } else {
      alert("Error sending email");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          backgroundColor: "white",
        }}
      >
        <button
          onClick={sendEmail}
          style={{
            padding: "10px 20px",
            backgroundColor: "#0070f3",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Send Example Email
        </button>
        <input
          type="file"
          id="file"
          name="attachment"
          onChange={handleFileChange}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        />
        {file && (
          <div style={{ fontSize: "14px", color: "#666" }}>
            Selected file: {file.name}
          </div>
        )}
      </div>
    </div>
  );
}
