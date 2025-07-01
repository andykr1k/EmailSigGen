import { useState } from "react";

function App() {
  const [name, setName] = useState("Dan Kelley");
  const [title, setTitle] = useState("Producer");
  const [phone, setPhone] = useState("+1 310 993 8741");
  const [showModal, setShowModal] = useState(false);

  const oldSignatureHTML = `
<!doctype html>
<html lang="en-US">
<head>
  <meta charset="UTF-8">
  <title>DIVISION7</title>
</head>
<body style="text-size-adjust: none !important; -ms-text-size-adjust: none !important; -webkit-text-size-adjust: none !important; margin: 0; padding: 8px;">

  <div style="margin-bottom: 8px;">
    <a href="https://www.division7.xyz" target="_blank">
      <img src="https://www.division7.xyz/wp-content/uploads/2025/06/d7-logo-email-footer-128w.png" alt="d7" border="0" width="64" height="91" style="width: 64px; height: 91px; display: block;">
    </a>
  </div>

  <div class="name" style="">
    <p style="font-family: Arial, Helvetica, sans-serif; font-size: 10px; color: rgb(163, 84, 64); margin: 0; padding: 0; line-height: normal;">
      <span style="font-weight: bold; color: rgb(163, 84, 64); display: inline;">${name}</span>
    </p>
  </div>

  <div class="title" style="margin-bottom: 4px;">
    <p style="font-family: Arial, Helvetica, sans-serif; font-size: 10px; color: rgb(163, 84, 64); margin: 0; padding: 0; line-height: normal;">${title}</p>
  </div>

    <div class="title" style="margin-bottom: 8px;">
    <p style="font-family: Helvetica, Arial, sans-serif; font-size: 10px; color: rgb(163, 84, 64); margin: 0; padding: 0; line-height: normal;">${phone} m</p>
  </div>

  <div class="contact-info" style="margin-bottom: 8px;">
    <span style="display: block; width: 315px; border-top: 1px solid rgb(163, 84, 64); margin-bottom: 4px;"></span>
    <p style="font-family: Arial, Helvetica, sans-serif; font-size: 10px; color: rgb(163, 84, 64); margin: 0; padding: 0; line-height: normal; padding-bottom: 4px; padding-top: 4px;">
      823 Seward Street, Los Angeles, CA 90038 | +1 323 894 6800
    </p>
    <p style="font-family: Arial, Helvetica, sans-serif; font-size: 10px; color: rgb(163, 84, 64); margin: 0; padding: 0; line-height: normal; padding-bottom: 4px;">
      38 W 21st Street, 12th Floor, New York, NY 10010 | +1 212 337 3327
    </p>
    <p style="font-family: Arial, Helvetica, sans-serif; font-size: 10px; color: rgb(163, 84, 64); margin: 0; padding: 0; line-height: normal; padding-bottom: 4px;">
      2-3 Bourlet Close, London W1W 7BQ | +44 (0) 207 636 7665
    </p>
    <span style="display: block; width: 315px; border-top: 1px solid rgb(163, 84, 64); margin-top: 4px;"></span>
  </div>

  <div class="website" style="margin-bottom: 8px;">
    <a style="text-decoration: none;" href="https://www.division7.xyz" target="_blank">
      <p style="font-family: Arial, Helvetica, sans-serif; font-size: 10px; color: rgb(163, 84, 64); margin: 0; padding: 0; line-height: normal;">
        division7.xyz
      </p>
    </a>
  </div>

  <div class="ad-age" style="line-height: 12px;">
    <p style="margin: 0; padding: 0; text-decoration: none; font-size: 9px; font-family: Helvetica, Arial, sans-serif; color: rgb(172, 79, 58);">
      Ad Age Creativity – 2024 Standout Production Company
    </p>
    <p style="margin: 0; padding: 0; text-decoration: none; font-size: 9px; font-family: Helvetica, Arial, sans-serif; color: rgb(172, 79, 58);">
      Ad Age Creativity – 2023 A-List Production Company
    </p>
    <p style="margin: 0; padding: 0; text-decoration: none; font-size: 9px; font-family: Helvetica, Arial, sans-serif; color: rgb(172, 79, 58);">
      Ad Age Creativity – 2022 Standout Production Company
    </p>
    <p style="margin: 0; padding: 0; text-decoration: none; font-size: 9px; font-family: Helvetica, Arial, sans-serif; color: rgb(172, 79, 58);">
      Ad Age Creativity – 2020 Production Company to Watch
    </p>
  </div>

</body>
</html>
`;

  const handleDownload = () => {
    const blob = new Blob([oldSignatureHTML], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "email_signature.html";
    a.click();
    URL.revokeObjectURL(url);
    setShowModal(true); // Show the instructions modal
  };

  return (
    <div className="min-h-screen flex p-10 gap-10 bg-gray-50 relative">
      {/* Left side: Inputs */}
      <div className="w-1/3 space-y-4">
        <h1 className="block text-lg font-bold mb-5">
          Email Signature Generator
        </h1>
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded"
          />
        </div>
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-1">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-1">
            Phone
          </label>
          <input
            id="phone"
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded"
          />
        </div>
        <button
          onClick={handleDownload}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors mt-2"
        >
          Download HTML
        </button>
      </div>

      {/* Right side: Preview */}
      <div className="w-2/3 border border-gray-300 p-4 bg-white overflow-auto">
        <div dangerouslySetInnerHTML={{ __html: oldSignatureHTML }} />
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded p-6 max-w-md w-full">
            <h2 className="text-lg font-bold mb-4">
              How to use your signature
            </h2>
            <p className="mb-2 font-semibold">📧 Gmail:</p>
            <ol className="list-decimal pl-5 mb-4 text-sm">
              <li>
                Open Gmail and go to <strong>Settings</strong> &gt;{" "}
                <strong>See all settings</strong>.
              </li>
              <li>
                Scroll to the <strong>Signature</strong> section.
              </li>
              <li>
                Click <strong>Create New</strong>, open your downloaded HTML
                file in a browser, copy it, and paste it into the signature box.
              </li>
              <li>Save changes.</li>
            </ol>
            <p className="mb-2 font-semibold">📧 Outlook:</p>
            <ol className="list-decimal pl-5 mb-4 text-sm">
              <li>
                Open Outlook and go to <strong>File</strong> &gt;{" "}
                <strong>Options</strong> &gt; <strong>Mail</strong> &gt;{" "}
                <strong>Signatures</strong>.
              </li>
              <li>Create a new signature.</li>
              <li>
                Open your downloaded HTML file in a browser, copy it, and paste
                it into the signature editor.
              </li>
              <li>
                Click <strong>OK</strong> to save.
              </li>
            </ol>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Got it!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;