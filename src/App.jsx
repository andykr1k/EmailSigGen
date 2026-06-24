import { useState } from "react";
import { ChevronUp, ChevronDown, Trash2, Plus, Download, Eye, EyeOff, CheckCircle2 } from "lucide-react";

function App() {
  const [name, setName] = useState("XXXXX XXXXXXX");
  const [title, setTitle] = useState("XXXXXXX");
  const [phone, setPhone] = useState("+X XXX XXX XXXX");
  const [showModal, setShowModal] = useState(false);
  const [showPhoneNumber, setShowPhoneNumber] = useState(true);
  const [showTitle, setShowTitle] = useState(true);
  const [showName, setShowName] = useState(true);
  const [showAddresses, setShowAddresses] = useState(true);
  const [showAwards, setShowAwards] = useState(true);
  const [showLinks, setShowLinks] = useState(true);
  const [chosenSignatureType, setChosenSignatureType] = useState("d7");

  const [d7Addresses, setD7Addresses] = useState([
    { id: "1", text: "823 Seward Street, Los Angeles, CA 90038 | +1 323 894 6800" },
    { id: "2", text: "38 W 21st Street, 12th Floor, New York, NY 10010 | +1 212 337 3327" },
    { id: "3", text: "2-3 Bourlet Close, London W1W 7BQ | +44 (0) 207 636 7665" },
  ]);

  const [smugglerAddresses, setSmugglerAddresses] = useState([
    { id: "1", city: "NYC", text: "38 W 21st Street, New York, NY 10010 +1 212 337 3327" },
    { id: "2", city: "LA", text: "823 Seward Street, Los Angeles, CA 90038 +1 323 817 3300" },
    { id: "3", city: "LDN", text: "2-3 Bourlet Close, London, W1W 7BQ +44 (0) 2076 367 665" },
    { id: "4", city: "MIAMI", text: "323 NE 59th Terrace, Miami, FL 33137" },
  ]);

  const [d7Awards, setD7Awards] = useState([
    { id: "1", text: "Ad Age Creativity – 2024 Standout Production Company" },
    { id: "2", text: "Ad Age Creativity – 2023 A-List Production Company" },
    { id: "3", text: "Ad Age Creativity – 2022 Standout Production Company" },
    { id: "4", text: "Ad Age Creativity – 2020 Production Company to Watch" },
  ]);

  const [smugglerAwards, setSmugglerAwards] = useState([
    { id: "1", prefix: "CANNES LIONS ", suffix: "2026 GRAND Prix, 2024, 2022, 2015, 2011 & 2007 PALME D'OR" },
    { id: "2", prefix: "British Arrows ", suffix: "2025 Production Company of the Year" },
    { id: "3", prefix: "Ad Age ", suffix: "2025, 2024, 2020, 2017, 2010, 2007, 2004 Production Company of the Year" },
    { id: "4", prefix: "Ciclope ", suffix: "2024, 2023, 2017 Production Company of the Year & Grand Prix" },
    { id: "5", prefix: "Emmy Awards ", suffix: "2022, 2020, 2017 Outstanding Commercial" },
  ]);

  const [smugglerLinks, setSmugglerLinks] = useState([
    { id: "1", label: "SMUGGLERSITE.COM", url: "https://smugglersite.com" },
    { id: "2", label: "INSTAGRAM", url: "https://www.instagram.com/smugglersite/" },
    { id: "3", label: "X (TWITTER)", url: "https://twitter.com/smugglersite" },
    { id: "4", label: "LINKEDIN", url: "https://www.linkedin.com/company/smuggler/" },
  ]);

  const currentAddresses = chosenSignatureType === "d7" ? d7Addresses : smugglerAddresses;
  const setCurrentAddresses = chosenSignatureType === "d7" ? setD7Addresses : setSmugglerAddresses;

  const currentAwards = chosenSignatureType === "d7" ? d7Awards : smugglerAwards;
  const setCurrentAwards = chosenSignatureType === "d7" ? setD7Awards : setSmugglerAwards;

  const moveItemUp = (index, list, setList) => {
    if (index === 0) return;
    const newList = [...list];
    [newList[index - 1], newList[index]] = [newList[index], newList[index - 1]];
    setList(newList);
  };

  const moveItemDown = (index, list, setList) => {
    if (index === list.length - 1) return;
    const newList = [...list];
    [newList[index], newList[index + 1]] = [newList[index + 1], newList[index]];
    setList(newList);
  };

  const removeItem = (index, list, setList) => {
    setList(list.filter((_, i) => i !== index));
  };

  const toggleItemVisibility = (index, list, setList) => {
    const newList = [...list];
    newList[index] = { ...newList[index], hidden: !newList[index].hidden };
    setList(newList);
  };

  const addAddress = () => {
    const newAddress = chosenSignatureType === "smuggler" 
      ? { id: Date.now().toString(), city: "CITY", text: "New Address" }
      : { id: Date.now().toString(), text: "New Address" };
    setCurrentAddresses([...currentAddresses, newAddress]);
  };

  const addAward = () => {
    const newAward = chosenSignatureType === "smuggler"
      ? { id: Date.now().toString(), prefix: "Award Name ", suffix: "Year Details" }
      : { id: Date.now().toString(), text: "New Award Detail" };
    setCurrentAwards([...currentAwards, newAward]);
  };

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
  ${showName ? `
  <tr>
    <td style="padding-top:4px; padding-bottom:0;">
      <span style="color:#A28D6F; font-size:13px; font-weight:700; font-family:Arial, Helvetica, sans-serif;">
        ${escapeHtml(name)}
      </span>
    </td>
  </tr>
  ` : ''}
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
  ${showAddresses ? `
  <tr>
    <td style="padding-top:6px; padding-bottom:0;">
      ${smugglerAddresses.filter(item => !item.hidden).map(item => `
        <span style="color:#A28D6F; font-size:8px; font-weight:600; text-transform:uppercase; font-family:Arial, Helvetica, sans-serif; display:block; line-height:11px;">
          <span style="color:#A28D6F;">${escapeHtml(item.city)} </span>
          <span style="color:#C7BBA9;">${escapeHtml(item.text)}</span>
        </span>
      `).join('')}
    </td>
  </tr>
  ` : ''}
  ${showAwards ? `
  <tr>
    <td style="padding-top:6px; padding-bottom:0;">
      ${smugglerAwards.filter(item => !item.hidden).map(item => `
      <span style="color:#A28D6F; font-size:5pt; font-weight:600; text-transform:uppercase; font-family:Arial, Helvetica, sans-serif; display:block; line-height:8px; padding-bottom:3px;">
        <span style="color:#A28D6F;">${escapeHtml(item.prefix)} </span>
        <span style="color:#C7BBA9;">${escapeHtml(item.suffix)}</span>
      </span>
      `).join('')}
    </td>
  </tr>
  ` : ''}
  ${showLinks ? `
  <tr>
    <td style="padding-top:6px; padding-bottom:0;">
      ${smugglerLinks.filter(item => !item.hidden).map((link, index, arr) => `
        <a href="${escapeHtml(link.url)}" target="_blank"
           style="color:#A28D6F; text-decoration:none; font-size:5pt; font-weight:700; text-transform:uppercase; font-family:Arial, Helvetica, sans-serif;">
          ${escapeHtml(link.label)}
        </a>${index < arr.length - 1 ? `\n        <span style="color:#A28D6F; font-size:5pt; font-family:Arial, Helvetica, sans-serif;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>` : ''}
      `).join('')}
    </td>
  </tr>
  ` : ''}
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
  ${showName ? `
  <tr>
    <td style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; line-height: 16px; padding: 0;">
      ${escapeHtml(name)}
    </td>
  </tr>` : ''}
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
  ${showName ? `
  <tr>
    <td style="font-family: Arial, Helvetica, sans-serif; font-size: 10px; color: rgb(172, 79, 58); line-height: 12px;">
      <strong>${escapeHtml(name)}</strong>
    </td>
  </tr>` : ''}
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
  ${showAddresses ? `
  <tr>
    <td style="padding-bottom: 4px;">
      <table cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse; width: 315px;">
        <tr>
          <td style="border-top: 1px solid rgb(172, 79, 58); padding: 4px 0;"></td>
        </tr>
        ${d7Addresses.filter(item => !item.hidden).map(item => `<tr>
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
  ` : ''}
  <tr>
    <td style="padding-bottom: 8px;">
      <a href="https://division7.xyz" style="text-decoration: none; color: rgb(172, 79, 58); font-family: Arial, Helvetica, sans-serif; font-size: 10px;">division7&#8203;.xyz</a>
    </td>
  </tr>
  ${showAwards ? `
  <tr>
    <td style="line-height: 12px;">
      ${d7Awards.filter(item => !item.hidden).map(item => `
      <span style="font-size: 9px; font-family: Helvetica, Arial, sans-serif; color: rgb(172, 79, 58); display: block; margin: 0; padding: 0 0 3px 0;">${escapeHtml(item.text)}</span>
      `).join('')}
    </td>
  </tr>
  ` : ''}
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
    <div className="h-screen w-screen overflow-hidden bg-slate-50 text-slate-900 font-sans p-4 md:p-6 lg:p-8 flex items-center justify-center">
      <div className="w-full max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-8 h-full">
        
        {/* Left Side: Form Controls */}
        <div className="w-full lg:w-1/2 flex flex-col gap-4 h-full">
          
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-800 tracking-tight">Signature Settings</h2>
          </div>

          <div className="bg-white shadow-xl shadow-slate-200/50 rounded-3xl border border-slate-100 flex flex-col flex-1 overflow-hidden">
            
            {/* Header/Tabs */}
            <div className="bg-slate-100/50 p-6 border-b border-slate-100 shrink-0">
              <div className="flex bg-slate-200 p-1 rounded-2xl w-full">
              {['smuggler', 'd7', 'rosario'].map((type) => (
                <button
                  key={type}
                  onClick={() => setChosenSignatureType(type)}
                  className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    chosenSignatureType === type 
                      ? "bg-white text-indigo-600 shadow-sm" 
                      : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
                  }`}
                >
                  {type.toUpperCase()}
                </button>
              ))}
            </div>
            </div>

            <div className="p-6 space-y-8 overflow-y-auto flex-1">
            
            {/* Basic Info Section */}
            <div className="space-y-4">
              <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Personal Details</h2>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-sm font-semibold text-slate-700">Name</label>
                  <button onClick={() => setShowName(!showName)} className="text-slate-400 hover:text-indigo-600 transition-colors flex items-center gap-1 text-xs font-semibold">
                    {showName ? <EyeOff size={14}/> : <Eye size={14}/>} {showName ? "Hide" : "Show"}
                  </button>
                </div>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-slate-200 px-4 py-2.5 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-sm font-semibold text-slate-700">Title</label>
                  <button onClick={() => setShowTitle(!showTitle)} className="text-slate-400 hover:text-indigo-600 transition-colors flex items-center gap-1 text-xs font-semibold">
                    {showTitle ? <EyeOff size={14}/> : <Eye size={14}/>} {showTitle ? "Hide" : "Show"}
                  </button>
                </div>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full border border-slate-200 px-4 py-2.5 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-sm font-semibold text-slate-700">Phone</label>
                  <button onClick={() => setShowPhoneNumber(!showPhoneNumber)} className="text-slate-400 hover:text-indigo-600 transition-colors flex items-center gap-1 text-xs font-semibold">
                    {showPhoneNumber ? <EyeOff size={14}/> : <Eye size={14}/>} {showPhoneNumber ? "Hide" : "Show"}
                  </button>
                </div>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full border border-slate-200 px-4 py-2.5 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                />
              </div>
            </div>

            {/* Addresses Section */}
            {chosenSignatureType !== "rosario" && (
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Addresses</h2>
                  <div className="flex gap-4">
                    <button
                      onClick={() => setShowAddresses(!showAddresses)}
                      className="text-slate-400 hover:text-indigo-600 transition-colors flex items-center gap-1 text-xs font-semibold"
                    >
                      {showAddresses ? <EyeOff size={14}/> : <Eye size={14}/>} {showAddresses ? "Hide" : "Show"}
                    </button>
                    <button
                      onClick={addAddress}
                      className="flex items-center gap-1 text-indigo-600 hover:text-indigo-700 text-sm font-semibold transition-colors"
                    >
                      <Plus size={16} /> Add
                    </button>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  {currentAddresses.map((item, index) => (
                    <div key={item.id || index} className={`flex gap-2 items-start bg-slate-50 p-3 rounded-2xl border border-slate-100 group transition-all ${item.hidden ? 'opacity-50 grayscale' : ''}`}>
                      <div className="flex flex-col gap-2 flex-1">
                        {chosenSignatureType === "smuggler" && (
                          <input
                            value={item?.city || ''}
                            placeholder="City/Region"
                            onChange={(e) => {
                              const updated = [...currentAddresses];
                              updated[index].city = e.target.value;
                              setCurrentAddresses(updated);
                            }}
                            className="w-1/3 px-3 py-1.5 text-sm font-semibold border border-slate-200 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500/20 outline-none"
                          />
                        )}
                        <textarea
                          value={item.text}
                          placeholder="Address Details"
                          onChange={(e) => {
                            const updated = [...currentAddresses];
                            updated[index].text = e.target.value;
                            setCurrentAddresses(updated);
                          }}
                          className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500/20 outline-none resize-none"
                          rows={2}
                        />
                      </div>
                      
                      <div className="flex flex-col gap-1 items-center justify-center opacity-40 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => toggleItemVisibility(index, currentAddresses, setCurrentAddresses)} className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md">
                          {item.hidden ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                        <button onClick={() => moveItemUp(index, currentAddresses, setCurrentAddresses)} disabled={index === 0} className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md disabled:opacity-30">
                          <ChevronUp size={16} />
                        </button>
                        <button onClick={() => moveItemDown(index, currentAddresses, setCurrentAddresses)} disabled={index === currentAddresses.length - 1} className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md disabled:opacity-30">
                          <ChevronDown size={16} />
                        </button>
                        <button onClick={() => removeItem(index, currentAddresses, setCurrentAddresses)} disabled={currentAddresses.length === 1} className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-md disabled:opacity-30 mt-1">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Awards Section */}
            {chosenSignatureType !== "rosario" && (
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Awards</h2>
                  <div className="flex gap-4">
                    <button
                      onClick={() => setShowAwards(!showAwards)}
                      className="text-slate-400 hover:text-indigo-600 transition-colors flex items-center gap-1 text-xs font-semibold"
                    >
                      {showAwards ? <EyeOff size={14}/> : <Eye size={14}/>} {showAwards ? "Hide" : "Show"}
                    </button>
                    <button
                      onClick={addAward}
                      className="flex items-center gap-1 text-indigo-600 hover:text-indigo-700 text-sm font-semibold transition-colors"
                    >
                      <Plus size={16} /> Add
                    </button>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  {currentAwards.map((item, index) => (
                    <div key={item.id || index} className={`flex gap-2 items-start bg-slate-50 p-3 rounded-2xl border border-slate-100 group transition-all ${item.hidden ? 'opacity-50 grayscale' : ''}`}>
                      <div className="flex flex-col gap-2 flex-1">
                        {chosenSignatureType === "smuggler" ? (
                          <>
                            <input
                              value={item?.prefix || ''}
                              placeholder="Award Name (e.g. British Arrows )"
                              onChange={(e) => {
                                const updated = [...currentAwards];
                                updated[index].prefix = e.target.value;
                                setCurrentAwards(updated);
                              }}
                              className="w-full px-3 py-1.5 text-sm font-semibold border border-slate-200 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500/20 outline-none"
                            />
                            <textarea
                              value={item?.suffix || ''}
                              placeholder="Details (e.g. 2025 Production Company of the Year)"
                              onChange={(e) => {
                                const updated = [...currentAwards];
                                updated[index].suffix = e.target.value;
                                setCurrentAwards(updated);
                              }}
                              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500/20 outline-none resize-none"
                              rows={2}
                            />
                          </>
                        ) : (
                          <textarea
                            value={item.text}
                            placeholder="Award Details"
                            onChange={(e) => {
                              const updated = [...currentAwards];
                              updated[index].text = e.target.value;
                              setCurrentAwards(updated);
                            }}
                            className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500/20 outline-none resize-none"
                            rows={2}
                          />
                        )}
                      </div>
                      
                      <div className="flex flex-col gap-1 items-center justify-center opacity-40 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => toggleItemVisibility(index, currentAwards, setCurrentAwards)} className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md">
                          {item.hidden ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                        <button onClick={() => moveItemUp(index, currentAwards, setCurrentAwards)} disabled={index === 0} className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md disabled:opacity-30">
                          <ChevronUp size={16} />
                        </button>
                        <button onClick={() => moveItemDown(index, currentAwards, setCurrentAwards)} disabled={index === currentAwards.length - 1} className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md disabled:opacity-30">
                          <ChevronDown size={16} />
                        </button>
                        <button onClick={() => removeItem(index, currentAwards, setCurrentAwards)} className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-md mt-1">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Links Section (Smuggler only) */}
            {chosenSignatureType === "smuggler" && (
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Links</h2>
                  <div className="flex gap-4">
                    <button
                      onClick={() => setShowLinks(!showLinks)}
                      className="text-slate-400 hover:text-indigo-600 transition-colors flex items-center gap-1 text-xs font-semibold"
                    >
                      {showLinks ? <EyeOff size={14}/> : <Eye size={14}/>} {showLinks ? "Hide" : "Show"}
                    </button>
                    <button
                      onClick={() => {
                        setSmugglerLinks([...smugglerLinks, { id: Date.now().toString(), label: "NEW LINK", url: "https://" }]);
                      }}
                      className="flex items-center gap-1 text-indigo-600 hover:text-indigo-700 text-sm font-semibold transition-colors"
                    >
                      <Plus size={16} /> Add
                    </button>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  {smugglerLinks.map((item, index) => (
                    <div key={item.id || index} className={`flex gap-2 items-start bg-slate-50 p-3 rounded-2xl border border-slate-100 group transition-all ${item.hidden ? 'opacity-50 grayscale' : ''}`}>
                      <div className="flex flex-col gap-2 flex-1">
                        <input
                          value={item?.label || ''}
                          placeholder="Link Label (e.g. INSTAGRAM)"
                          onChange={(e) => {
                            const updated = [...smugglerLinks];
                            updated[index].label = e.target.value;
                            setSmugglerLinks(updated);
                          }}
                          className="w-full px-3 py-1.5 text-sm font-semibold border border-slate-200 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500/20 outline-none uppercase"
                        />
                        <input
                          value={item?.url || ''}
                          placeholder="URL (e.g. https://...)"
                          onChange={(e) => {
                            const updated = [...smugglerLinks];
                            updated[index].url = e.target.value;
                            setSmugglerLinks(updated);
                          }}
                          className="w-full px-3 py-1.5 text-sm font-semibold text-indigo-600 border border-slate-200 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500/20 outline-none"
                        />
                      </div>
                      
                      <div className="flex flex-col gap-1 items-center justify-center opacity-40 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => toggleItemVisibility(index, smugglerLinks, setSmugglerLinks)} className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md">
                          {item.hidden ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                        <button onClick={() => moveItemUp(index, smugglerLinks, setSmugglerLinks)} disabled={index === 0} className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md disabled:opacity-30">
                          <ChevronUp size={16} />
                        </button>
                        <button onClick={() => moveItemDown(index, smugglerLinks, setSmugglerLinks)} disabled={index === smugglerLinks.length - 1} className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md disabled:opacity-30">
                          <ChevronDown size={16} />
                        </button>
                        <button onClick={() => removeItem(index, smugglerLinks, setSmugglerLinks)} className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-md mt-1">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Footer Actions */}
          <div className="bg-slate-50 p-6 border-t border-slate-100 shrink-0">
            <button
              onClick={handleDownload}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.01] active:scale-[0.99]"
            >
              <Download size={20} /> Download Signature HTML
            </button>
          </div>
        </div>
      </div>

      {/* Right Side: Preview */}
        <div className="w-full lg:w-1/2 flex flex-col gap-4 h-full">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-800 tracking-tight">Live Preview</h2>
            <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full flex items-center gap-1">
              <CheckCircle2 size={14} /> Auto-updating
            </span>
          </div>
          
          <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8 flex flex-1 overflow-auto">
            <div className="w-full min-h-full flex justify-center items-start pt-12 pb-24">
              <div
                className="scale-[1.5] origin-top bg-white"
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
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl shadow-indigo-900/20 transform transition-all">
            <h2 className="text-2xl font-bold mb-6 text-slate-800">Ready to use! 🎉</h2>
            
            <div className="space-y-6">
              <div>
                <p className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs">G</span>
                  Gmail:
                </p>
                <ol className="list-decimal pl-5 text-sm text-slate-600 space-y-1">
                  <li>Go to <strong>Settings</strong> &gt; <strong>See all settings</strong></li>
                  <li>Scroll down to <strong>Signature</strong></li>
                  <li>Click <strong>Create New</strong></li>
                  <li>Open the downloaded file in a browser, copy all, and paste</li>
                </ol>
              </div>
              
              <div>
                <p className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs">O</span>
                  Outlook:
                </p>
                <ol className="list-decimal pl-5 text-sm text-slate-600 space-y-1">
                  <li>Go to <strong>File</strong> &gt; <strong>Options</strong> &gt; <strong>Mail</strong> &gt; <strong>Signatures</strong></li>
                  <li>Create a new signature</li>
                  <li>Open the downloaded file in a browser, copy all, and paste</li>
                </ol>
              </div>
            </div>

            <button
              onClick={() => setShowModal(false)}
              className="mt-8 px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 w-full font-bold shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Awesome, got it!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;