// import React, { useState } from "react";
// import axios from "axios";

// const AdminDashboard = () => {
//   const [subject, setSubject] = useState("");
//   const [message, setMessage] = useState("");
//   const [response, setResponse] = useState("");

//   const sendNewsletter = async () => {
//     try {
//       const res = await axios.post("http://localhost:5001/email/send-newsletter", {
//         subject,
//         message,
//       });

//       setResponse(res.data.message);
//     } catch (error) {
//       setResponse("  Error sending newsletter.");
//       console.error(error);
//     }
//   };

//   return (
//     <div className="content">
//       <h2>Send Newsletter</h2>
//       <input
//         type="text"
//         placeholder="Subject"
//         value={subject}
//         onChange={(e) => setSubject(e.target.value)}
//       />
//       <textarea
//         placeholder="Write your message..."
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//       />
//       <button onClick={sendNewsletter}>Send Newsletter</button>
//       {response && <p>{response}</p>}
//     </div>
//   );
// };

// export default AdminDashboard;


import React, { useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const sendNewsletter = async () => {
    if (!subject.trim() || !message.trim()) {
      setResponse("  Subject and message cannot be empty.");
      return;
    }

    setLoading(true);
    setResponse("");

    try {
      const res = await axios.post("https://newsletter-contact-form-1.onrender.com/email/send-newsletter", {
        subject,
        message,
      });

      setResponse(` ${res.data.message}`);
      setSubject("");  // Mesaj gönderildikten sonra alanları temizle
      setMessage("");
    } catch (error) {
      setResponse(
        error.response?.data?.message || "  Error sending newsletter."
      );
      console.error("Email sending error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="content">
      <h2>Send Newsletter</h2>
      <input
        type="text"
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        required
      />
      <textarea
        placeholder="Write your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
      />
      <button 
        onClick={sendNewsletter} 
        disabled={loading || !subject.trim() || !message.trim()}
      >
        {loading ? "Sending..." : "Send Newsletter"}
      </button>
      {response && <p>{response}</p>}
    </div>
  );
};

export default AdminDashboard;
