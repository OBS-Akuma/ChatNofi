# Kirka DM & Trades Panel Script

This script enhances your experience on [Kirka.io](https://kirka.io) by providing a **custom DM and Accepted Trades panel** with notifications and easy management tools. It works by connecting to a WebSocket and capturing messages for your Short ID

---

## Features

- **DM Notifications**
  - Detects messages that mention your Short ID(s) (e.g., `#NUGGET`) and shows pop-up notifications.
  - Notifications are clickable to open the DM panel.

- **DM Panel**
  - `/d` command automatically opens the panel.
  - Displays **DMs** (messages where your Short ID is mentioned) and **Accepted Trades** (type 13 messages).
  - Messages displayed in **horizontal rows**, newest to oldest, 5 messages per row.
  - Weapon/skin mentions simplified: `[Void SCAR|SCAR|WEAPON_SKIN|MYTHICAL] → [Void]`.

- **Tabs & Buttons**
  - **DMs** tab
  - **Accepted Trades** tab
  - **Delete All DMs** button
  - **Delete All Trades** button
  - Tabs and buttons aligned neatly in a row.

- **LocalStorage Support**
  - Saves DMs and Accepted Trades to `localStorage` so they persist across page reloads.

- **Fully Themed**
  - Matches Kirka.io’s style with gradient backgrounds, Exo 2 font, and rounded panels.

---

## Installation

1. Open your browser console on [chat.kirka.io](https://chat.kirka.io) or your Kirka client.
2. Paste the entire script.
3. Press Enter.  

> Make sure your Short IDs are set in `window.KIRKA_OUR_SHORT_IDS`:
>
> ```js
> window.KIRKA_OUR_SHORT_IDS = ["NUGGET"];
> ```

4. DMs mentioning your Short ID will now trigger notifications and appear in the panel.

---

## Usage

- **Open Panel**
  - Click a notification or type `/d` in chat.
  
- **Tabs**
  - Switch between **DMs** and **Accepted Trades**.
  
- **Delete Buttons**
  - Clear all saved DMs or Accepted Trades with a single click.
    
- **Notifications**
  - Pop-up notifications for DMs, click to view in panel.

---

## Configuration

- **Short IDs**
  - Add your Short IDs to the `window.KIRKA_OUR_SHORT_IDS` array.

---

## Compatibility

- Works in browsers supporting WebSockets.
- Tested on Chrome / Chromium-based Kirka clients.

---

## License

This script is provided as-is for personal use. Do not redistribute without permission.

---

## Author

Akuma — Custom Kirka.io enhancement scripts (#NUGGET)
i took inspiration from IamCalledGlitchy (#GLITCH)
