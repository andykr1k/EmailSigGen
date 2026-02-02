import { useState } from "react";

function App() {
  const [name, setName] = useState("XXXXX XXXXXXX");
  const [title, setTitle] = useState("XXXXXXX");
  const [phone, setPhone] = useState("+X XXX XXX XXXX");
  const [showModal, setShowModal] = useState(false);
  const [showPhoneNumber, setShowPhoneNumber] = useState(true);
  const [showTitle, setShowTitle] = useState(true);
  const [chosenSignatureType, setChosenSignatureType] = useState("d7");
  const [d7Addresses, setD7Addresses] = useState([
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

  const [smugglerAddresses, setSmugglerAddresses] = useState([
    {
      id: "1",
      city: "NYC",
      text: "38 W 21st Street, New York, NY 10010 +1 212 337 3327",
    },
    {
      id: "2",
      city: "LA",
      text: "823 Seward Street, Los Angeles, CA 90038 +1 323 817 3300",
    },
    {
      id: "3",
      city: "LDN",
      text: "2-3 Bourlet Close, London, W1W 7BQ +44 (0) 2076 367 665",
    },
    { id: "4", city: "MIAMI", text: "323 NE 59th Terrace, Miami, FL 33137" },
  ]);

  // Fixed: Use derived values instead of conditional state assignment
  const currentAddresses = chosenSignatureType === "d7" ? d7Addresses : smugglerAddresses;
  const setCurrentAddresses = chosenSignatureType === "d7" ? setD7Addresses : setSmugglerAddresses;

  const placeholderText =
    chosenSignatureType === "d7"
      ? "Enter D7 address format (e.g., Street, City, ZIP)"
      : chosenSignatureType === "smuggler"
      ? "Enter Smuggler address format (e.g., PO Box / Customs Code)"
      : "Enter address";

  const moveAddressUp = (index) => {
    if (index === 0) return;
    const newAddresses = [...currentAddresses];
    [newAddresses[index - 1], newAddresses[index]] = [
      newAddresses[index],
      newAddresses[index - 1],
    ];
    setCurrentAddresses(newAddresses);
  };

  const moveAddressDown = (index) => {
    if (index === currentAddresses.length - 1) return;
    const newAddresses = [...currentAddresses];
    [newAddresses[index], newAddresses[index + 1]] = [
      newAddresses[index + 1],
      newAddresses[index],
    ];
    setCurrentAddresses(newAddresses);
  };

  const addAddress = () => {
    const newAddress = chosenSignatureType === "smuggler" 
      ? { id: Date.now().toString(), city: "CITY", text: "New Address" }
      : { id: Date.now().toString(), text: "New Address" };
    setCurrentAddresses([...currentAddresses, newAddress]);
  };

  const removeAddress = (index) => {
    if (currentAddresses.length > 1) {
      setCurrentAddresses(currentAddresses.filter((_, i) => i !== index));
    }
  };

  // Helper function to escape HTML
  const escapeHtml = (text) => {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  };

  const smuggler_signatureHTML = `
<table role="presentation" cellpadding="0" cellspacing="0" border="0"
  style="margin:0; padding:0; border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt; font-family:Arial, Helvetica, sans-serif;">
  <tr>
    <td style="padding:0;">
      <a href="https://smugglersite.com" target="_blank" style="text-decoration:none; border:0;">
        <img src="https://smugglersite.com/email-signatures/SMUGGLER24.png"
             alt="SMUGGLER"
             width="170" height="23"
             style="border:0; display:block; outline:none; text-decoration:none;">
      </a>
    </td>
  </tr>

  <tr>
    <td style="padding-top:4px; padding-bottom:0;">
      <span style="color:#A28D6F; font-size:13px; font-weight:700; font-family:Arial, Helvetica, sans-serif;">
        ${escapeHtml(name)}
      </span>
    </td>
  </tr>

  ${showTitle ? `
  <tr>
    <td style="padding-top:2px; padding-bottom:0;">
      <span style="color:#A28D6F; font-size:13px; font-weight:700; font-family:Arial, Helvetica, sans-serif;">
        ${escapeHtml(title)}
      </span>
    </td>
  </tr>
  ` : ''}

  ${showPhoneNumber ? `
  <tr>
    <td style="padding-top:2px; padding-bottom:0;">
      <span style="color:#A28D6F; font-size:8px; font-weight:700; font-family:Arial, Helvetica, sans-serif;">
        MOBILE ${escapeHtml(phone)}
      </span>
    </td>
  </tr>
  ` : ''}

  <tr>
    <td style="padding-top:6px; padding-bottom:0;">
      ${smugglerAddresses.map(item => `
        <span style="color:#A28D6F; font-size:8px; font-weight:600; text-transform:uppercase; font-family:Arial, Helvetica, sans-serif; display:block; line-height:11px;">
          <span style="color:#A28D6F;">${escapeHtml(item.city)} </span>
          <span style="color:#C7BBA9;">${escapeHtml(item.text)}</span>
        </span>
      `).join('')}
    </td>
  </tr>

  <tr>
    <td style="padding-top:6px; padding-bottom:0;">
      <span style="color:#A28D6F; font-size:5pt; font-weight:600; text-transform:uppercase; font-family:Arial, Helvetica, sans-serif; display:block; line-height:8px;">
        <span style="color:#A28D6F;">British Arrows </span>
        <span style="color:#C7BBA9;">2025 Production Company of the Year</span>
      </span>
      <span style="color:#A28D6F; font-size:5pt; font-weight:600; text-transform:uppercase; font-family:Arial, Helvetica, sans-serif; display:block; line-height:8px;">
        <span style="color:#A28D6F;">Ad Age </span>
        <span style="color:#C7BBA9;">2025, 2024, 2020, 2017, 2010, 2007, 2004 Prod Co of the Year</span>
      </span>
      <span style="color:#A28D6F; font-size:5pt; font-weight:600; text-transform:uppercase; font-family:Arial, Helvetica, sans-serif; display:block; line-height:8px;">
        <span style="color:#A28D6F;">CANNES LIONS </span>
        <span style="color:#C7BBA9;">2024, 2022, 2015, 2011, 2007 PALME D&apos;OR &amp; GRAND PRIX</span>
      </span>
      <span style="color:#A28D6F; font-size:5pt; font-weight:600; text-transform:uppercase; font-family:Arial, Helvetica, sans-serif; display:block; line-height:8px;">
        <span style="color:#A28D6F;">Ciclope </span>
        <span style="color:#C7BBA9;">2024, 2023, 2017 Prod Co of the Year &amp; Grand Prix</span>
      </span>
      <span style="color:#A28D6F; font-size:5pt; font-weight:600; text-transform:uppercase; font-family:Arial, Helvetica, sans-serif; display:block; line-height:8px;">
        <span style="color:#A28D6F;">Emmy Award </span>
        <span style="color:#C7BBA9;">2022, 2020, 2017 Outstanding Commercial</span>
      </span>
    </td>
  </tr>

  <tr>
    <td style="padding-top:6px; padding-bottom:0;">
      <a href="https://smugglersite.com" target="_blank"
         style="color:#A28D6F; text-decoration:none; font-size:5pt; font-weight:700; text-transform:uppercase; font-family:Arial, Helvetica, sans-serif;">
        SMUGGLERSITE.COM
      </a>
      <span style="color:#A28D6F; font-size:5pt; font-family:Arial, Helvetica, sans-serif;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
      <a href="https://www.instagram.com/smugglersite/" target="_blank"
         style="color:#A28D6F; text-decoration:none; font-size:5pt; font-weight:700; text-transform:uppercase; font-family:Arial, Helvetica, sans-serif;">
        INSTAGRAM
      </a>
      <span style="color:#A28D6F; font-size:5pt; font-family:Arial, Helvetica, sans-serif;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
      <a href="https://twitter.com/smugglersite" target="_blank"
         style="color:#A28D6F; text-decoration:none; font-size:5pt; font-weight:700; text-transform:uppercase; font-family:Arial, Helvetica, sans-serif;">
        X (TWITTER)
      </a>
      <span style="color:#A28D6F; font-size:5pt; font-family:Arial, Helvetica, sans-serif;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
      <a href="https://www.linkedin.com/company/smuggler/" target="_blank"
         style="color:#A28D6F; text-decoration:none; font-size:5pt; font-weight:700; text-transform:uppercase; font-family:Arial, Helvetica, sans-serif;">
        LINKEDIN
      </a>
    </td>
  </tr>
</table>
`.trim();

  const rosario_signatureHTML = `<!DOCTYPE html>
<html lang="en-US">
<head>
  <meta charset="UTF-8">
  <title>525 Rosario</title>
</head>
<body style="margin: 0; padding: 8px;">

<table cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;">
  <tr>
    <td style="padding-bottom: 5px;">
      <a href="https://www.525rosario.com/" target="_blank" style="text-decoration: none;">
        <img src="https://images.squarespace-cdn.com/content/v1/66e7ad88c261d32ef5a7004f/beaf6fdd-bfb8-4b8d-b571-12ee5fb735ea/525-Rosario-Logo-Black.png?format=2500w" 
             alt="525ROSARIO" 
             border="0" 
             width="130"
             height="30"
             style="width: 130px; height: 30px; display: block;">
      </a>
    </td>
  </tr>
  <tr>
    <td style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; line-height: 16px; padding: 0;">
      ${escapeHtml(name)}
    </td>
  </tr>
  ${showTitle ? `<tr>
    <td style="font-family: Arial, Helvetica, sans-serif; font-size: 12px; line-height: 14px; padding: 4px 0;">
      ${escapeHtml(title)}
    </td>
  </tr>` : ''}
  ${showPhoneNumber ? `<tr>
    <td style="font-family: Helvetica, Arial, sans-serif; font-size: 8px; line-height: 10px; padding: 4px 0;">
      MOBILE ${escapeHtml(phone)}
    </td>
  </tr>` : ''}
  <tr>
    <td style="padding-top: 4px;">
      <a href="https://525rosario.com" style="text-decoration: none; color: rgb(0, 0, 0); font-family: Arial, Helvetica, sans-serif; font-size: 8px;">525ROSARIO&#8203;.COM</a>
      <span style="color: rgb(0, 0, 0); font-size: 8px;">&nbsp;&nbsp;</span>
      <a href="https://www.instagram.com/525rosario/" style="text-decoration: none; color: rgb(0, 0, 0); font-family: Arial, Helvetica, sans-serif; font-size: 8px;">INSTAGRAM</a>
    </td>
  </tr>
</table>

</body>
</html>`;

  const d7_signatureHTML = `<!DOCTYPE html>
<html lang="en-US">
<head>
  <meta charset="UTF-8">
  <title>DIVISION7</title>
</head>
<body style="margin: 0; padding: 8px;">

<table cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;">
  <tr>
    <td style="padding-bottom: 8px;">
      <a href="https://www.division7.xyz" target="_blank" style="text-decoration: none;">
        <img src="https://www.division7.xyz/wp-content/uploads/2025/06/d7-logo-email-footer-128w.png" alt="d7" border="0" width="80" height="91" style="width: 80px; height: 91px; display: block;">
      </a>
    </td>
  </tr>
  <tr>
    <td style="font-family: Arial, Helvetica, sans-serif; font-size: 10px; color: rgb(172, 79, 58); line-height: 12px;">
      <strong>${escapeHtml(name)}</strong>
    </td>
  </tr>
  ${showTitle ? `<tr>
    <td style="font-family: Arial, Helvetica, sans-serif; font-size: 10px; color: rgb(172, 79, 58); line-height: 12px; padding: 4px 0;">
      ${escapeHtml(title)}
    </td>
  </tr>` : ''}
  ${showPhoneNumber ? `<tr>
    <td style="font-family: Helvetica, Arial, sans-serif; font-size: 10px; color: rgb(172, 79, 58); line-height: 12px; padding-bottom: 8px;">
      ${escapeHtml(phone)} m
    </td>
  </tr>` : ''}
  <tr>
    <td style="padding-bottom: 4px;">
      <table cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse; width: 315px;">
        <tr>
          <td style="border-top: 1px solid rgb(172, 79, 58); padding: 4px 0;"></td>
        </tr>
        ${d7Addresses.map(item => `<tr>
          <td style="font-family: Arial, Helvetica, sans-serif; font-size: 10px; color: rgb(172, 79, 58); line-height: 12px; padding-bottom: 4px;">
            ${escapeHtml(item.text)}
          </td>
        </tr>`).join('')}
        <tr>
          <td style="border-top: 1px solid rgb(172, 79, 58); padding-top: 4px;"></td>
        </tr>
      </table>
    </td>
  </tr>
  <tr>
    <td style="padding-bottom: 8px;">
      <a href="https://division7.xyz" style="text-decoration: none; color: rgb(172, 79, 58); font-family: Arial, Helvetica, sans-serif; font-size: 10px;">division7&#8203;.xyz</a>
    </td>
  </tr>
  <tr>
    <td style="line-height: 12px;">
      <span style="font-size: 9px; font-family: Helvetica, Arial, sans-serif; color: rgb(172, 79, 58); display: block; margin: 0; padding: 0;">Ad Age Creativity – 2024 Standout Production Company</span>
      <span style="font-size: 9px; font-family: Helvetica, Arial, sans-serif; color: rgb(172, 79, 58); display: block; margin: 0; padding: 0;">Ad Age Creativity – 2023 A-List Production Company</span>
      <span style="font-size: 9px; font-family: Helvetica, Arial, sans-serif; color: rgb(172, 79, 58); display: block; margin: 0; padding: 0;">Ad Age Creativity – 2022 Standout Production Company</span>
      <span style="font-size: 9px; font-family: Helvetica, Arial, sans-serif; color: rgb(172, 79, 58); display: block; margin: 0; padding: 0;">Ad Age Creativity – 2020 Production Company to Watch</span>
    </td>
  </tr>
</table>

</body>
</html>`;

  const handleDownload = () => {
    const blob = new Blob(
      [
        chosenSignatureType === "d7"
          ? d7_signatureHTML
          : chosenSignatureType === "smuggler"
          ? smuggler_signatureHTML
          : rosario_signatureHTML,
      ],
      { type: "text/html" }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "email_signature.html";
    a.click();
    URL.revokeObjectURL(url);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen flex p-4 lg:p-10 gap-4 lg:gap-10 bg-gray-50 relative flex-col lg:flex-row">
      {/* Left side: Inputs */}
      <div className="w-full lg:w-2/3 space-y-4">
        <div className="grid grid-cols-3 w-full text-center bg-blue-600/50 rounded-xl border">
          <button
            onClick={() => setChosenSignatureType("smuggler")}
            className={`p-3 rounded-xl ${
              chosenSignatureType === "smuggler" ? "bg-blue-600" : ""
            }`}
          >
            <p className="text-white">SMUGGLER</p>
          </button>
          <button
            onClick={() => setChosenSignatureType("d7")}
            className={`p-3 rounded-2xl ${
              chosenSignatureType === "d7" ? "bg-blue-600" : ""
            }`}
          >
            <p className="text-white">d7</p>
          </button>
          <button
            onClick={() => setChosenSignatureType("rosario")}
            className={`p-3 rounded-2xl ${
              chosenSignatureType === "rosario" ? "bg-blue-600" : ""
            }`}
          >
            <p className="text-white">Rosario</p>
          </button>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <div className="flex flex-row justify-between">
            <label className="block text-sm font-medium mb-1">Title</label>
            <button onClick={() => setShowTitle(!showTitle)} className="">
              <p className="block text-sm font-medium mb-1 text-blue-600">
                {showTitle ? "Hide" : "Show"}
              </p>
            </button>
          </div>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <div className="flex flex-row justify-between">
            <label className="block text-sm font-medium mb-1">Phone</label>
            <button
              onClick={() => setShowPhoneNumber(!showPhoneNumber)}
              className=""
            >
              <p className="block text-sm font-medium mb-1 text-blue-600">
                {showPhoneNumber ? "Hide" : "Show"}
              </p>
            </button>
          </div>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {chosenSignatureType !== "rosario" && (
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium">Addresses</label>
            </div>
            <div className="flex flex-col gap-2">
              {currentAddresses.map((item, index) => (
                <div
                  key={item.id || index}
                  className="flex items-center bg-gray-100 p-2 rounded"
                >
                  {chosenSignatureType === "smuggler" && (
                    <textarea
                      value={item?.city || ''}
                      placeholder="CITY"
                      onChange={(e) => {
                        const updated = [...currentAddresses];
                        updated[index].city = e.target.value;
                        setCurrentAddresses(updated);
                      }}
                      className="mr-2 resize-none p-1 text-sm border border-gray-300 rounded w-20"
                      rows={1}
                    />
                  )}
                  <textarea
                    value={item.text}
                    placeholder={placeholderText}
                    onChange={(e) => {
                      const updated = [...currentAddresses];
                      updated[index].text = e.target.value;
                      setCurrentAddresses(updated);
                    }}
                    className="flex-1 mr-2 resize-none p-1 text-sm border border-gray-300 rounded"
                    rows={2}
                  />
                  <div className="flex flex-col gap-1">
                    <button
                      onClick={() => moveAddressUp(index)}
                      disabled={index === 0}
                      className="bg-gray-600 text-white border-none px-2 py-1 rounded text-xs disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      ↑
                    </button>
                    <button
                      onClick={() => moveAddressDown(index)}
                      disabled={index === currentAddresses.length - 1}
                      className="bg-gray-600 text-white border-none px-2 py-1 rounded text-xs disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      ↓
                    </button>
                  </div>
                  <button
                    onClick={() => removeAddress(index)}
                    disabled={currentAddresses.length === 1}
                    className="bg-red-600 text-white border-none px-2 py-1 rounded ml-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    ✕
                  </button>
                </div>
              ))}

              <button
                onClick={addAddress}
                className="bg-blue-600 text-white border-none px-3 py-2 rounded self-start hover:bg-blue-700"
              >
                + Add Address
              </button>
            </div>
          </div>
        )}

        <div className="flex gap-2">
          <button
            onClick={handleDownload}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Download HTML
          </button>
        </div>
      </div>

      {/* Right side: Preview */}
      <div className="w-full lg:w-1/3 p-4 space-y-3">
        <div
          className="w-full border p-4 bg-white overflow-auto rounded"
          dangerouslySetInnerHTML={{
            __html:
              chosenSignatureType === "d7"
                ? d7_signatureHTML
                : chosenSignatureType === "smuggler"
                ? smuggler_signatureHTML
                : rosario_signatureHTML,
          }}
        />
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