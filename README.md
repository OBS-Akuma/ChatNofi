# Kirka DM & Trades Panel Script

This script enhances your experience on [Kirka.io](https://kirka.io) by providing a **custom DM and Accepted Trades panel** with notifications and easy management tools. It works by connecting to a WebSocket and capturing messages for your Short ID.

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

- **Accepted Trades Updates (NEW)**
  - **Click-to-copy** functionality: hover and click a trade to copy only `/trade accept [NUMBERS]` instead of the full message.
  - Hover effect added to indicate interactivity.
  - Preserves full trade message display while allowing easy copying.
  - Logs copied trade commands to console for confirmation.

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
5. **Accepted Trades are now clickable** — clicking copies only the `/trade accept [NUMBERS]` command, (IN ACCEPTED TRADES TAB THIS IS NOT SOMETHING TO USE TO COPY REAL RUNNING TRADE IDS)

---

## Usage

- **Open Panel**
  - Click a notification or type `/d` in chat.
  
- **Tabs**
  - Switch between **DMs** and **Accepted Trades**.
  
- **Delete Buttons**
  - Clear all saved DMs or Accepted Trades with a single click.
    
- **Trade Interaction (NEW)**
  - Hover over a trade message to see a highlight effect.
  - Click to copy the `/trade accept [NUMBERS]` command to your clipboard.
  - Useful for quickly accepting trades without manually selecting IDs.

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
Inspired by IamCalledGlitchy (#GLITCH)

---

### ✅ Summary of Updates
1. **Clickable Accepted Trades** – now copies only `/trade accept [NUMBERS]`.
2. **Hover effect** – visual cue for interactivity.
3. **Preserves full trade display** – no loss of information.
4. **Console log confirmation** – shows which trade command was copied.
