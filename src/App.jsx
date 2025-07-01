import { useState } from "react";

function App() {
  const [name, setName] = useState("Dan Kelley");
  const [title, setTitle] = useState("Producer");
  const [phone, setPhone] = useState("+1 310 993 8741");
  const [showModal, setShowModal] = useState(false);

  const [addresses, setAddresses] = useState([
    {
      id: "1",
      text: "823 Seward Street, Los Angeles, CA 90038 | +1 323 894 6800",
    },
    {
      id: "2",
      text: "38 W 21st Street, 12th Floor, New York, NY 10010 | +1 212 337 3327",
    },
    {
      id: "3",
      text: "2-3 Bourlet Close, London W1W 7BQ | +44 (0) 207 636 7665",
    },
  ]);

  const [draggedIndex, setDraggedIndex] = useState(null);

  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === dropIndex) return;

    const newAddresses = [...addresses];
    const draggedItem = newAddresses[draggedIndex];
    newAddresses.splice(draggedIndex, 1);
    newAddresses.splice(dropIndex, 0, draggedItem);

    setAddresses(newAddresses);
    setDraggedIndex(null);
  };

  const moveAddressUp = (index) => {
    if (index === 0) return;
    const newAddresses = [...addresses];
    [newAddresses[index - 1], newAddresses[index]] = [
      newAddresses[index],
      newAddresses[index - 1],
    ];
    setAddresses(newAddresses);
  };

  const moveAddressDown = (index) => {
    if (index === addresses.length - 1) return;
    const newAddresses = [...addresses];
    [newAddresses[index], newAddresses[index + 1]] = [
      newAddresses[index + 1],
      newAddresses[index],
    ];
    setAddresses(newAddresses);
  };

  const editAddress = (index, newText) => {
    const newAddresses = [...addresses];
    newAddresses[index].text = newText;
    setAddresses(newAddresses);
  };

  const addAddress = () => {
    const newAddress = {
      id: Date.now().toString(),
      text: "New Address | Phone",
    };
    setAddresses([...addresses, newAddress]);
  };

  const removeAddress = (index) => {
    if (addresses.length > 1) {
      const newAddresses = addresses.filter((_, i) => i !== index);
      setAddresses(newAddresses);
    }
  };

  const signatureHTML = `<!doctype html>
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

  <div class="name">
    <p style="font-family: Arial, Helvetica, sans-serif; font-size: 10px; color: rgb(163, 84, 64); margin: 0;">
      <span style="font-weight: bold;">${name}</span>
    </p>
  </div>

  <div class="title" style="margin-bottom: 4px;">
    <p style="font-family: Arial, Helvetica, sans-serif; font-size: 10px; color: rgb(163, 84, 64); margin: 0;">${title}</p>
  </div>

  <div class="phone" style="margin-bottom: 8px;">
    <p style="font-family: Helvetica, Arial, sans-serif; font-size: 10px; color: rgb(163, 84, 64); margin: 0;">${phone} m</p>
  </div>

  <div class="contact-info" style="margin-bottom: 8px;">
    <span style="display: block; width: 315px; border-top: 1px solid rgb(163, 84, 64); margin-bottom: 4px; padding-bottom: 4px;"></span>
    ${addresses
      .map(
        (item) => `
    <p style="font-family: Arial, Helvetica, sans-serif; font-size: 10px; color: rgb(163, 84, 64); margin: 0; padding-bottom: 4px;">${item.text}</p>`
      )
      .join("")}
    <span style="display: block; width: 315px; border-top: 1px solid rgb(163, 84, 64); margin-top: 4px;"></span>
  </div>

  <div class="website" style="margin-bottom: 8px;">
    <a href="https://www.division7.xyz" target="_blank" style="text-decoration: none;">
      <p style="font-family: Arial, Helvetica, sans-serif; font-size: 10px; color: rgb(163, 84, 64); margin: 0;">
        division7.xyz
      </p>
    </a>
  </div>

  <div class="ad-age" style="line-height: 12px;">
    <p style="margin: 0; font-size: 9px; font-family: Helvetica, Arial, sans-serif; color: rgb(172, 79, 58);">
      Ad Age Creativity – 2024 Standout Production Company
    </p>
    <p style="margin: 0; font-size: 9px; font-family: Helvetica, Arial, sans-serif; color: rgb(172, 79, 58);">
      Ad Age Creativity – 2023 A-List Production Company
    </p>
    <p style="margin: 0; font-size: 9px; font-family: Helvetica, Arial, sans-serif; color: rgb(172, 79, 58);">
      Ad Age Creativity – 2022 Standout Production Company
    </p>
    <p style="margin: 0; font-size: 9px; font-family: Helvetica, Arial, sans-serif; color: rgb(172, 79, 58);">
      Ad Age Creativity – 2020 Production Company to Watch
    </p>
  </div>

</body>
</html>`;

  const handleDownload = () => {
    const blob = new Blob([signatureHTML], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "email_signature.html";
    a.click();
    URL.revokeObjectURL(url);
    setShowModal(true);
  };

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(signatureHTML)
      .then(() => {
        alert("HTML copied to clipboard!");
      })
      .catch(() => {
        alert("Could not copy to clipboard. Please use the download option.");
      });
  };

  return (
    <div className="min-h-screen flex p-4 lg:p-10 gap-4 lg:gap-10 bg-gray-50 relative flex-col lg:flex-row">
      {/* Left side: Inputs */}
      <div className="w-full lg:w-1/3 space-y-4">
        <h1 className="text-lg font-bold mb-5">Email Signature Generator</h1>

        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Phone</label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium">Addresses</label>
            <button
              onClick={addAddress}
              className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
            >
              Add Address
            </button>
          </div>

          <div className="space-y-2">
            {addresses.map((item, index) => (
              <div
                key={item.id}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, index)}
                className={`border rounded bg-white shadow-sm cursor-move ${
                  draggedIndex === index ? "opacity-50" : ""
                }`}
              >
                <div className="p-3">
                  <textarea
                    value={item.text}
                    onChange={(e) => editAddress(index, e.target.value)}
                    className="w-full text-sm border-0 resize-none focus:ring-0 p-0"
                    rows="2"
                  />
                  <div className="flex justify-between items-center">
                    <div className="flex gap-1">
                      <button
                        onClick={() => moveAddressUp(index)}
                        disabled={index === 0}
                        className="px-2 py-1 text-xs bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300"
                      >
                        ↑
                      </button>
                      <button
                        onClick={() => moveAddressDown(index)}
                        disabled={index === addresses.length - 1}
                        className="px-2 py-1 text-xs bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300"
                      >
                        ↓
                      </button>
                    </div>
                    {addresses.length > 1 && (
                      <button
                        onClick={() => removeAddress(index)}
                        className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleDownload}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Download HTML
          </button>
          <button
            onClick={copyToClipboard}
            className="flex-1 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            Copy HTML
          </button>
        </div>
      </div>

      {/* Right side: Preview */}
      <div className="w-full lg:w-2/3 border p-4 bg-white overflow-auto rounded">
        <div dangerouslySetInnerHTML={{ __html: signatureHTML }} />
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded p-6 max-w-md w-full overflow-y-auto">
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
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 w-full"
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
