window.KIRKA_OUR_SHORT_IDS = ["YOUR_USER_ID_NO_TAG"];

(function () {

  const seenMessages = new Set();
  let savedDMs = JSON.parse(localStorage.getItem("dms") || "[]");
  let savedTrades = JSON.parse(localStorage.getItem("acceptedTrades") || "[]");

  // Helper: simplify weapon/skin mentions
  const simplifyBrackets = (message) => {
    return message.replace(/\[([^\]|]+)[^\]]*\]/g, (match, p1) => `[${p1}]`);
  };

  const saveDM = (data) => {
    savedDMs.push({
      user: data.user?.name || "Unknown",
      shortId: data.user?.shortId || "",
      message: simplifyBrackets(data.message),
      timestamp: Date.now()
    });
    localStorage.setItem("dms", JSON.stringify(savedDMs));
  };

  const saveTrade = (data) => {
    savedTrades.push({
      message: simplifyBrackets(data.message),
      timestamp: Date.now()
    });
    localStorage.setItem("acceptedTrades", JSON.stringify(savedTrades));
  };

  const customNotification = (data) => {
    const notifElement = document.createElement("div");
    notifElement.classList.add("vue-notification-wrapper");
    notifElement.style = "transition-timing-function:ease;transition-delay:0s;transition-property:all;";

    notifElement.innerHTML = `
      <div style="
        display:flex;
        align-items:center;
        padding:.9rem 1.1rem;
        margin-bottom:.5rem;
        color:var(--white);
        cursor:pointer;
        box-shadow:0 0 .7rem rgba(0,0,0,.25);
        border-radius:.2rem;
        background:linear-gradient(262.54deg,#202639 9.46%,#223163 100.16%);
        margin-left:1rem;
        border:solid .15rem #ffb914;
        font-family:Exo 2;" class="alert-default">

        ${data.icon ? `<img src="${data.icon}" style="min-width:2rem;height:2rem;margin-right:.9rem;" />` : ""}

        <span style="font-size:1rem;font-weight:600;text-align:left;" class="text">
          ${data.message}
        </span>
      </div>`;

    const group = document.getElementsByClassName("vue-notification-group")[0];
    if (!group) return;
    group.children[0].appendChild(notifElement);

    notifElement.onclick = () => showDMPanel();
    setTimeout(() => { try { notifElement.remove(); } catch {} }, 5000);
  };

  const showDMPanel = () => {
    const existingPanel = document.getElementById("dm-panel");
    if (existingPanel) existingPanel.remove();

    const panel = document.createElement("div");
    panel.id = "dm-panel";
    panel.style = `
      position:fixed;
      top:50%;
      left:50%;
      transform:translate(-50%,-50%);
      width:1200px;
      max-height:140%;
      background:linear-gradient(262.54deg,#202639 9.46%,#223163 100.16%);
      border:solid .15rem #ffb914;
      border-radius:.5rem;
      box-shadow:0 0 1rem rgba(0,0,0,.5);
      padding:2rem 1.5rem 1.5rem 1.5rem;
      z-index:9999;
      font-family:Exo 2;
      display:flex;
      flex-direction:column;
      gap:1rem;
    `;

    // Close button
    const closeBtn = document.createElement("div");
    closeBtn.innerText = "✖";
    closeBtn.style = `
      position:absolute;
      top:.5rem;
      right:.5rem;
      cursor:pointer;
      font-weight:bold;
      color:#ffb914;
      font-size:1.5rem;
    `;
    closeBtn.onclick = () => panel.remove();
    panel.appendChild(closeBtn);

    // Tabs container + delete buttons inline
    const tabsContainer = document.createElement("div");
    tabsContainer.style = `display:flex; gap:1rem; margin-bottom:1rem; align-items:center;`;

    // Tabs
    const dmTabBtn = document.createElement("button");
    dmTabBtn.innerText = "DMs";
    const tradesTabBtn = document.createElement("button");
    tradesTabBtn.innerText = "Accepted Trades";

    [dmTabBtn, tradesTabBtn].forEach(btn => {
      btn.style = `
        padding:.5rem 1rem;
        border:none;
        border-radius:.3rem;
        cursor:pointer;
        font-weight:bold;
        background:rgba(255,255,255,0.1);
        color:#fff;
      `;
    });

    // Delete buttons
    const deleteDMsBtn = document.createElement("div");
    deleteDMsBtn.innerText = "Delete All DMs";
    deleteDMsBtn.style = `
      padding:.5rem 1rem;
      cursor:pointer;
      font-weight:bold;
      border-radius:.3rem;
      background:rgba(255,0,0,0.2);
      color:#ff6b6b;
      border:solid .15rem #ff6b6b;
    `;
    deleteDMsBtn.onclick = () => {
      if (confirm("Are you sure you want to delete all DMs?")) {
        savedDMs = [];
        localStorage.setItem("dms", JSON.stringify(savedDMs));
        showDMPanel();
      }
    };

    const deleteTradesBtn = document.createElement("div");
    deleteTradesBtn.innerText = "Delete All Trades";
    deleteTradesBtn.style = `
      padding:.5rem 1rem;
      cursor:pointer;
      font-weight:bold;
      border-radius:.3rem;
      background:rgba(255,0,0,0.2);
      color:#ff6b6b;
      border:solid .15rem #ff6b6b;
    `;
    deleteTradesBtn.onclick = () => {
      if (confirm("Are you sure you want to delete all Accepted Trades?")) {
        savedTrades = [];
        localStorage.setItem("acceptedTrades", JSON.stringify(savedTrades));
        showDMPanel();
      }
    };

    tabsContainer.appendChild(dmTabBtn);
    tabsContainer.appendChild(tradesTabBtn);
    tabsContainer.appendChild(deleteDMsBtn);
    tabsContainer.appendChild(deleteTradesBtn);
    panel.appendChild(tabsContainer);

    // Content container
    const contentContainer = document.createElement("div");
    
    // === SCROLL ADJUSTMENT: 4 rows max ===
    const rowHeight = 100; // approx height of one DM row in px
    const maxRows = 4;
    contentContainer.style = `
      display:flex;
      flex-direction:column;
      gap:1rem;
      overflow-y:auto;
      max-height:${rowHeight * maxRows}px;
    `;
    // ====================================
    
    panel.appendChild(contentContainer);

    // Render DMs
    const renderDMs = () => {
      contentContainer.innerHTML = "";
      const rows = [];
      for (let i = 0; i < savedDMs.length; i += 5) rows.push(savedDMs.slice(i, i + 5));
      rows.reverse().forEach(row => {
        const rowDiv = document.createElement("div");
        rowDiv.style = `display:flex; flex-direction:row-reverse; gap:1rem; margin-bottom:1rem;`;
        row.forEach(dm => {
          const dmElement = document.createElement("div");
          dmElement.style = `
            padding:.8rem;
            border-radius:.4rem;
            background:rgba(255,255,255,0.05);
            min-width:180px;
            max-width:280px;
            word-break:break-word;
            text-align:left;
          `;
          dmElement.innerHTML = `<strong>${dm.user} (#${dm.shortId}):</strong><br>${dm.message}`;
          rowDiv.appendChild(dmElement);
        });
        contentContainer.appendChild(rowDiv);
      });

      // Auto-scroll to bottom
      contentContainer.scrollTop = contentContainer.scrollHeight;
    };

    // Render Trades
    const renderTrades = () => {
      contentContainer.innerHTML = "";
      savedTrades.slice().reverse().forEach(trade => {
        const tradeDiv = document.createElement("div");
        tradeDiv.style = `
          padding:.8rem;
          border-radius:.4rem;
          background:rgba(255,255,255,0.05);
          word-break:break-word;
          cursor:pointer;
        `;

        const match = trade.message.match(/\/trade accept \d+/);
        const tradeCmd = match ? match[0] : trade.message;

        tradeDiv.innerHTML = trade.message;

        tradeDiv.onmouseover = () => tradeDiv.style.background = "rgba(255,255,255,0.15)";
        tradeDiv.onmouseout = () => tradeDiv.style.background = "rgba(255,255,255,0.05)";
        tradeDiv.onclick = () => {
          navigator.clipboard.writeText(tradeCmd)
            .then(() => console.log(`[KCProxy] Copied: ${tradeCmd}`))
            .catch(() => console.warn("[KCProxy] Failed to copy trade command."));
        };

        contentContainer.appendChild(tradeDiv);
      });

      // Auto-scroll for trades too
      contentContainer.scrollTop = contentContainer.scrollHeight;
    };

    // Default tab
    renderDMs();
    dmTabBtn.onclick = renderDMs;
    tradesTabBtn.onclick = renderTrades;

    document.body.appendChild(panel);
  };

  console.log("[KCProxy] connecting...");

  const ws = new WebSocket("wss://chat.kirka.io/chat");

  ws.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      if (!data.message) return;

      const uniqueKey = `${data.user?.shortId}-${data.message}`;
      if (seenMessages.has(uniqueKey)) return;
      seenMessages.add(uniqueKey);

      // Normal DMs (type !== 13)
      if (data.type !== 13) {
        const mentionRegex = /#([A-Z0-9]{6})/g;
        let match;
        while ((match = mentionRegex.exec(data.message)) !== null) {
          if (window.KIRKA_OUR_SHORT_IDS.includes(match[1])) {
            saveDM(data);
            customNotification({
              icon: "https://cdn3.emoji.gg/emojis/81785-yap.gif",
              message: `${data.user?.name || "Unknown"} ${simplifyBrackets(data.message)}`
            });
            break;
          }
        }
      }

      // /d command
      if (window.KIRKA_OUR_SHORT_IDS.includes(data.user?.shortId) && data.message.trim() === "/d") {
        showDMPanel();
      }

      // Accepted trades (type 13)
      if (data.type === 13 && data.message.includes(window.KIRKA_OUR_SHORT_IDS[0])) {
        saveTrade(data);
      }

    } catch {}
  };

})();
