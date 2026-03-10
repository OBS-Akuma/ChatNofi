// === Kirka Trade Viewer (Draggable + Live Updating) ===
// /t opens trade menu
// Click trade → copies /trade accept NUMBER
// Window can be dragged

(function () {

  let trades = JSON.parse(localStorage.getItem("kirka_type13_trades") || "[]");
  const seenTrades = new Set();

  let tradePanel = null;
  let tradeList = null;

  const saveTrades = () => {
    localStorage.setItem("kirka_type13_trades", JSON.stringify(trades));
  };

  const createTradeElement = (trade) => {

    const tradeDiv = document.createElement("div");

    tradeDiv.style = `
      padding:.7rem .9rem;
      border-radius:.35rem;
      background:rgba(255,255,255,0.06);
      cursor:pointer;
      word-break:break-word;
      transition:.15s;
    `;

    tradeDiv.innerHTML = trade.message;

    tradeDiv.onmouseover = () => {
      tradeDiv.style.background = "rgba(255,255,255,0.15)";
    };

    tradeDiv.onmouseout = () => {
      tradeDiv.style.background = "rgba(255,255,255,0.06)";
    };

    const match = trade.message.match(/\/trade accept \d+/);
    const tradeCmd = match ? match[0] : trade.message;

    tradeDiv.onclick = () => {
      navigator.clipboard.writeText(tradeCmd)
        .then(() => console.log("[TradeViewer] Copied:", tradeCmd))
        .catch(() => console.warn("[TradeViewer] Copy failed"));
    };

    return tradeDiv;
  };

  const makeDraggable = (element, handle) => {

    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    handle.onmousedown = (e) => {

      isDragging = true;

      const rect = element.getBoundingClientRect();

      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;

      document.onmousemove = (e) => {

        if (!isDragging) return;

        element.style.left = (e.clientX - offsetX) + "px";
        element.style.top = (e.clientY - offsetY) + "px";
        element.style.transform = "none";

      };

      document.onmouseup = () => {
        isDragging = false;
        document.onmousemove = null;
      };

    };

  };

  const showTradeMenu = () => {

    const existing = document.getElementById("trade-menu");
    if (existing) {
      existing.remove();
      tradePanel = null;
      tradeList = null;
    }

    tradePanel = document.createElement("div");
    tradePanel.id = "trade-menu";

    tradePanel.style = `
      position:fixed;
      top:50%;
      left:50%;
      transform:translate(-50%,-50%);
      width:700px;
      max-height:600px;
      background:linear-gradient(262.54deg,#202639 9.46%,#223163 100.16%);
      border:solid .15rem #ffb914;
      border-radius:.5rem;
      box-shadow:0 0 1rem rgba(0,0,0,.6);
      padding:1.5rem;
      z-index:9999;
      font-family:Exo 2;
      display:flex;
      flex-direction:column;
      gap:1rem;
    `;

    // Title (drag handle)
    const title = document.createElement("div");
    title.innerText = "Trade Requests (Type 13)";
    title.style = `
      font-size:1.3rem;
      font-weight:bold;
      color:#fff;
      cursor:move;
      user-select:none;
    `;
    tradePanel.appendChild(title);

    const closeBtn = document.createElement("div");
    closeBtn.innerText = "✖";
    closeBtn.style = `
      position:absolute;
      top:.5rem;
      right:.7rem;
      cursor:pointer;
      color:#ffb914;
      font-size:1.4rem;
      font-weight:bold;
    `;
    closeBtn.onclick = () => {
      tradePanel.remove();
      tradePanel = null;
      tradeList = null;
    };
    tradePanel.appendChild(closeBtn);

    tradeList = document.createElement("div");
    tradeList.style = `
      display:flex;
      flex-direction:column;
      gap:.6rem;
      overflow-y:auto;
      max-height:480px;
    `;
    tradePanel.appendChild(tradeList);

    trades.slice().reverse().forEach(trade => {
      tradeList.appendChild(createTradeElement(trade));
    });

    document.body.appendChild(tradePanel);

    // enable dragging
    makeDraggable(tradePanel, title);

  };

  console.log("[TradeViewer] Connecting to chat...");

  const ws = new WebSocket("wss://chat.kirka.io/chat");

  ws.onmessage = (event) => {

    try {

      const data = JSON.parse(event.data);
      if (!data.message) return;

      if (data.message.trim() === "rawr") {
        showTradeMenu();
      }

      const unique = `${data.user?.shortId}-${data.message}`;
      if (seenTrades.has(unique)) return;
      seenTrades.add(unique);

      if (data.type === 13) {

        const trade = {
          message: data.message,
          timestamp: Date.now()
        };

        trades.push(trade);
        saveTrades();

        if (tradeList) {
          const newTrade = createTradeElement(trade);
          tradeList.prepend(newTrade);
        }

      }

    } catch {}

  };

})();
