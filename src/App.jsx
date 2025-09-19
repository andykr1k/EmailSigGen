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
  const [currentAddresses, setCurrentAddresses] =
    chosenSignatureType === "d7"
      ? [d7Addresses, setD7Addresses]
      : [smugglerAddresses, setSmugglerAddresses];

  const placeholderText =
    chosenSignatureType === "d7"
      ? "Enter D7 address format (e.g., Street, City, ZIP)"
      : chosenSignatureType === "smuggler"
      ? "Enter Smuggler address format (e.g., PO Box / Customs Code)"
      : "Enter address";

  const moveAddressUp = (index, addresses, setAddresses) => {
    if (index === 0) return;
    const newAddresses = [...addresses];
    [newAddresses[index - 1], newAddresses[index]] = [
      newAddresses[index],
      newAddresses[index - 1],
    ];
    setAddresses(newAddresses);
  };

  const moveAddressDown = (index, addresses, setAddresses) => {
    if (index === addresses.length - 1) return;
    const newAddresses = [...addresses];
    [newAddresses[index], newAddresses[index + 1]] = [
      newAddresses[index + 1],
      newAddresses[index],
    ];
    setAddresses(newAddresses);
  };

  const editAddress = (index, newText, addresses, setAddresses) => {
    const newAddresses = [...addresses];
    newAddresses[index].text = newText;
    setAddresses(newAddresses);
  };

  const addAddress = (addresses, setAddresses) => {
    const newAddress = { id: Date.now().toString(), text: "New Address" };
    setAddresses([...addresses, newAddress]);
  };

  const removeAddress = (index, addresses, setAddresses) => {
    if (addresses.length > 1) {
      setAddresses(addresses.filter((_, i) => i !== index));
    }
  };

  const smuggler_signatureHTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="apple-mobile-web-app-capable" content="yes">
<title>SMUGGLER</title>
</head>
<body style="margin: .5; padding: .5;">

<table cellpadding="0" cellspacing="0" style="margin: 0; font-family: Poppins, Century Gothic, Arial, sans-serif;">
    <tr>
        <td>
            <table bgcolor="#FFFFFF" cellpadding="0" cellspacing="0" style="padding: .5px; margin: 1;">
                <tr>
                    <td>
                        <a href="https://smugglersite.com" target="_blank"><img src="https://smugglersite.com/email-signatures/SMUGGLER24.png" alt="SMUGGLER" width="170" height="23" style="border: 0;"></a>
                    </td>
                    
                </tr>
                <tr>
                    <td style="padding: 4px 0px 3px 0px;">
                        <p style="margin: 0.5px; color: #A28D6F; font-size: 10pt; font-weight: 700;"><span style="color: #A28D6F;">${name}</span></p>
                        ${
                          showTitle
                            ? `<p style="margin: 0.5px; color: #A28D6F; font-size: 10pt; font-weight: 700;"><span style="color: #A28D6F;">${title}</span></p>`
                            : ``
                        }
                        
                        ${
                          showPhoneNumber
                            ? `<p style="margin: 0.5px; color: #A28D6F; font-size: 10pt; font-weight: 700;"><span style="color: #A28D6F; font-size: 6pt; font-weight: 700;">MOBILE ${phone}</span></p>`
                            : ``
                        }
                        
                    </td>
                </tr>
                <tr>
                    <td style="line-height:10px; padding-top:4px; padding-bottom:4px;">
                        ${smugglerAddresses
                          .map(
                            (item) => `
  <p style="margin:0.5px; color:#A28D6F; font-size:6pt; font-weight:600; text-transform:uppercase;">
    <span style="color:#C7BBA9;"><span style="color: #A28D6F; text-transform: uppercase;">${item.city} </span>${item.text}</span>
  </p>
`
                          )
                          .join("")}
                    </td>
                </tr>
                <tr>
                    <td style="line-height:10px; padding-top:4px; padding-bottom:4px;">
                        <p style="margin: 0.5px; color: #A28D6F; font-size: 6pt; font-weight: 600; text-transform: uppercase;"><span style="color: #A28D6F; text-transform: uppercase;">British Arrows </span><span style="color: #C7BBA9; font-weight: 600; text-transform: uppercase;">2025 Production Company of the Year</span></a></p>
                        <p style="margin: 0.5px; color: #A28D6F; font-size: 6pt; font-weight: 600; text-transform: uppercase;"><span style="color: #A28D6F; text-transform: uppercase;">Ad Age </span><span style="color: #C7BBA9; font-weight: 600; text-transform: uppercase;">2025, 2024, 2020, 2017, 2010, 2007, 2004 Prod Co  of the Year</span></a></p>
                        <p style="margin: 0.5px; color: #A28D6F; font-size: 6pt; font-weight: 600; text-transform: uppercase;"><span style="color: #A28D6F; text-transform: uppercase;">CANNES LIONS </span><span style="color: #C7BBA9; font-weight: 600; text-transform: uppercase;">2024, 2022, 2015, 2011, 2007 PALME D'OR & GRAND PRIX</span></a></p>
                        <p style="margin: 0.5px; color: #A28D6F; font-size: 6pt; font-weight: 600; text-transform: uppercase;"><span style="color: #A28D6F; text-transform: uppercase;">Ciclope </span><span style="color: #C7BBA9; font-weight: 600; text-transform: uppercase;">2024, 2023, 2017 Prod Co of the Year & Grand Prix</span></a></p>
                        <p style="margin: 0.5px; color: #A28D6F; font-size: 6pt; font-weight: 600; text-transform: uppercase;"><span style="color: #A28D6F; text-transform: uppercase;">Emmy Award </span><span style="color: #C7BBA9; font-weight: 600; text-transform: uppercase;">2022, 2020, 2017 Outstanding Commercial</span></a></p>
                    </td>
                </tr>
                <tr>
                    <td>
                        <a style="color: #fff; text-decoration: none;" href="https://smugglersite.com" target="_blank"><span style="color: #A28D6F; font-size: 6pt; font-weight: 700; text-transform: uppercase;">SMUGGLERSITE.COM</span></a>
                        <span style="color: #A28D6F; font-size: 6pt; font-weight: 700; text-transform: uppercase;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <a style="color: #fff; text-decoration: none;" href="https://www.instagram.com/smugglersite/" target="_blank"><span style="color: #A28D6F; font-size: 6pt; font-weight: 700; text-transform: uppercase;">INSTAGRAM</span></a>
                        <span style="color: #A28D6F; font-size: 6pt; font-weight: 700; text-transform: uppercase;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <a style="color: #fff; text-decoration: none;" href="https://twitter.com/smugglersite" target="_blank"><span style="color: #A28D6F; font-size: 6pt; font-weight: 700; text-transform: uppercase;">X (TWITTER)</span></a>
                        <span style="color: #A28D6F; font-size: 6pt; font-weight: 700; text-transform: uppercase;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <a style="color: #fff; text-decoration: none;" href="https://www.linkedin.com/company/smuggler/" target="_blank"><span style="color: #A28D6F; font-size: 6pt; font-weight: 700; text-transform: uppercase;">LINKEDIN</span></a>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>
</body>
</html>`;

  const rosario_signatureHTML = `<!DOCTYPE html>
<html lang="en-US">
<head>
  <meta charset="UTF-8">
  <title>525 Rosario</title>
</head>
<body style="text-size-adjust: none !important; -ms-text-size-adjust: none !important; -webkit-text-size-adjust: none !important; margin: 0; padding: 8px;">

  <!-- Logo -->
  <div style="">
    <a href="https://www.division7.xyz" target="_blank" style="text-decoration: none;">
      <img src="https://images.squarespace-cdn.com/content/v1/66e7ad88c261d32ef5a7004f/31cca9ad-7049-4733-ae6f-8884e82f2ed4/525+Rosario+Logo+pdf+white+v3.png?format=2500w" 
           alt="525ROSARIO" 
           border="0" 
           width="160" 
           height="120" 
     style="width: 240px; height: 91px; display: block; filter: invert(1); clip-path: inset(20px 10px 20px 10px); margin: -10px">
    </a>
  </div>

  <div class="name">
    <p style="font-family: Arial, Helvetica, sans-serif; font-size: 20px; margin: 0;">
      <span style="font-weight: bold;">${name}</span>
    </p>
  </div>

  ${
    showTitle
      ? `
  <div class="title" style="margin-bottom: 4px;">
    <p style="font-family: Arial, Helvetica, sans-serif; font-size: 18px; margin: 0;">
      ${title}
    </p>
  </div>`
      : ""
  }

   ${
     showPhoneNumber
       ? `
  <div class="phone" style="margin-bottom: 8px;">
    <p style="font-family: Helvetica, Arial, sans-serif; font-size: 14px; margin: 0;">
      MOBILE ${phone}
    </p>
  </div>`
       : ""
   }

  <!-- Links -->
  <div style="display: flex; gap: 10px;">
    <div class="website">
      <a href="https://525rosario.com" style="text-decoration: none; color:rgb(255,255,255);">
        <span style="color: rgb(0, 0, 0); font-family: Arial, Helvetica, sans-serif; font-size: 10px; margin: 0;">
          525ROSARIO&#8203;.COM
        </span>
      </a>
    </div>

    <div class="website">
      <a href="https://division7.xyz" style="text-decoration: none; color:rgb(255,255,255);">
        <span style="color: rgb(0, 0, 0); font-family: Arial, Helvetica, sans-serif; font-size: 10px; margin: 0;">
          INSTAGRAM
        </span>
      </a>
    </div>
  </div>

</body>
</html>`;

  const d7_signatureHTML = `<!doctype html>
  <html lang="en-US">
  <head>
    <meta charset="UTF-8">
    <title>DIVISION7</title>
  </head>
  <body style="text-size-adjust: none !important; -ms-text-size-adjust: none !important; -webkit-text-size-adjust: none !important; margin: 0; padding: 8px;">

    <div style="margin-bottom: 4px;">
      <p style="font-family: Arial, Helvetica, sans-serif; font-size: 10px; color: rgb(172, 79, 58); margin: 0;">&nbsp;</p>
    </div>

    <div style="margin-bottom: 8px;">
      <a href="https://www.division7.xyz" target="_blank" style="text-decoration: none; color: rgb(172, 79, 58);">
        <img src="https://www.division7.xyz/wp-content/uploads/2025/06/d7-logo-email-footer-128w.png" alt="d7" border="0" width="80" height="91" style="width: 80px; height: 91px; display: block;">
      </a>
    </div>
  
    <div class="name">
      <p style="font-family: Arial, Helvetica, sans-serif; font-size: 10px; color: rgb(172, 79, 58); margin: 0;">
        <span style="font-weight: bold;">${name}</span>
      </p>
    </div>
  
    ${
      showTitle
        ? `    <div class="title" style="margin-bottom: 4px;">
      <p style="font-family: Arial, Helvetica, sans-serif; font-size: 10px; color: rgb(172, 79, 58); margin: 0;">${title}</p>
    </div>`
        : ``
    }

  
    ${
      showPhoneNumber
        ? `    <div class="phone" style="margin-bottom: 8px;">
      <p style="font-family: Helvetica, Arial, sans-serif; font-size: 10px; color: rgb(172, 79, 58); margin: 0;">${phone} m</p>
    </div>`
        : ``
    }
  
    <div class="contact-info" style="margin-bottom: 8px;">
      <span style="display: block; width: 315px; border-top: 1px solid rgb(172, 79, 58); margin-bottom: 4px; padding-bottom: 4px;"></span>
      ${d7Addresses
        .map(
          (item) => `
      <p style="font-family: Arial, Helvetica, sans-serif; font-size: 10px; color: rgb(172, 79, 58); margin: 0; padding-bottom: 4px;">${item.text}</p>`
        )
        .join("")}
      <span style="display: block; width: 315px; border-top: 1px solid rgb(172, 79, 58); margin-top: 4px;"></span>
    </div>

    <div class="website" style="margin-bottom: 8px; text-decoration: none;">
          <a href="https://division7.xyz" style="color:rgb(255,255,255)">
  <span style="text-decoration: none; color: rgb(172, 79, 58); font-family: Arial, Helvetica, sans-serif; font-size: 10px; margin: 0; display: block;" data-mce-href="#" data-mce-style="text-decoration: none; color: #ac4f3a; font-family: Arial, Helvetica, sans-serif; font-size: 10px; margin: 0; display: block;">
    division7&#8203.xyz
  </span>
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

  const copyToClipboardSourceCode = () => {
    navigator.clipboard
      .writeText(
        chosenSignatureType === "d7"
          ? d7_signatureHTML
          : chosenSignatureType === "smuggler"
          ? smuggler_signatureHTML
          : rosario_signatureHTML
      )
      .then(() => {
        alert("HTML copied to clipboard!");
      })
      .catch(() => {
        alert("Could not copy to clipboard. Please use the download option.");
      });
  };

  const copyToClipboard = () => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML =
      chosenSignatureType === "d7"
        ? d7_signatureHTML
        : chosenSignatureType === "smuggler"
        ? smuggler_signatureHTML
        : rosario_signatureHTML;
    tempDiv.style.position = "fixed";
    tempDiv.style.pointerEvents = "none";
    tempDiv.style.opacity = 0;
    document.body.appendChild(tempDiv);

    const range = document.createRange();
    range.selectNodeContents(tempDiv);

    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);

    try {
      const successful = document.execCommand("copy");
      if (successful) {
        alert("HTML signature copied to clipboard!");
      } else {
        alert("Copy failed. Please try manually.");
      }
    } catch (err) {
      alert("Copy failed. Please try manually.");
    }

    selection.removeAllRanges();
    document.body.removeChild(tempDiv);
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
            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              {currentAddresses.map((item, index) => (
                <div
                  key={item.id || index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    background: "#f5f5f5",
                    padding: "8px",
                    borderRadius: "4px",
                  }}
                >
                  {chosenSignatureType === "smuggler" && (
                    <textarea
                      value={item?.city}
                      placeholder={placeholderText}
                      onChange={(e) => {
                        const updated = [...currentAddresses];
                        updated[index].city = e.target.value;
                        setCurrentAddresses(updated);
                      }}
                      style={{
                        marginRight: "8px",
                        resize: "none",
                        padding: "4px",
                        fontSize: "14px",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                      }}
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
                    style={{
                      flex: 1,
                      marginRight: "8px",
                      resize: "none",
                      padding: "4px",
                      fontSize: "14px",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                    }}
                  />
                  {/* Move Up/Down buttons */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "4px",
                    }}
                  >
                    <button
                      onClick={() =>
                        moveAddressUp(
                          index,
                          currentAddresses,
                          setCurrentAddresses
                        )
                      }
                      disabled={index === 0}
                      style={{
                        background: "#6c757d",
                        color: "white",
                        border: "none",
                        padding: "2px 6px",
                        borderRadius: "4px",
                        cursor: index === 0 ? "not-allowed" : "pointer",
                      }}
                    >
                      ↑
                    </button>
                    <button
                      onClick={() =>
                        moveAddressDown(
                          index,
                          currentAddresses,
                          setCurrentAddresses
                        )
                      }
                      disabled={index === currentAddresses.length - 1}
                      style={{
                        background: "#6c757d",
                        color: "white",
                        border: "none",
                        padding: "2px 6px",
                        borderRadius: "4px",
                        cursor:
                          index === currentAddresses.length - 1
                            ? "not-allowed"
                            : "pointer",
                      }}
                    >
                      ↓
                    </button>
                  </div>
                  {/* Remove button */}
                  <button
                    onClick={() =>
                      removeAddress(
                        index,
                        currentAddresses,
                        setCurrentAddresses
                      )
                    }
                    style={{
                      background: "red",
                      color: "white",
                      border: "none",
                      padding: "4px 8px",
                      borderRadius: "4px",
                      cursor: "pointer",
                      marginLeft: "8px",
                    }}
                  >
                    ✕
                  </button>
                </div>
              ))}

              {/* Add Address button */}
              <button
                onClick={() =>
                  addAddress(currentAddresses, setCurrentAddresses)
                }
                style={{
                  background: "#007bff",
                  color: "white",
                  border: "none",
                  padding: "6px 12px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  alignSelf: "flex-start"
                }}
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
          {/* <button
            onClick={copyToClipboardSourceCode}
            className="flex-1 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Copy Signature
          </button> */}
        </div>
      </div>

      {/* Right side: Preview */}
      <div className="w-full lg:w-2/3 p-4 space-y-3">
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
