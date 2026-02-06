<p align="center">
  <img src="https://github.com/KernFerm/Go-Fish-Discord-Bot/blob/main/go-fish.png" alt="Go Fish Bot" width="300">
</p>

# 🎮🐟 Go Fish Discord Bot

Welcome to the **Go Fish Discord Bot**!
This bot brings the classic card game **Go Fish** into your Discord server for fun, interactive multiplayer gameplay.

> ⚠️ **Important:**
> This project may be out of date. You may need to update parts of the code to match the latest Discord.js or Node.js versions.

---

## 🚀 Features

* Classic Go Fish gameplay inside Discord
* Slash command support
* Multiplayer support
* Interactive card requests
* Simple setup and customization

---

## 📋 Commands

### 🎲 Gameplay Commands

| Command        | Description                  |
| -------------- | ---------------------------- |
| `/startgofish` | Start a new game             |
| `/join`        | Join an active game          |
| `/play`        | Ask another player for cards |

---

## 🧰 Requirements

Before installing, make sure you have:

* **Node.js v18 or newer**
* A Discord Bot Token
* A Discord Application with Slash Commands enabled

---

## 📥 Install Node.js

Download and install Node.js from:

[https://nodejs.org](https://nodejs.org)

After installing, confirm:

```bash
node -v
npm -v
```

You should see version numbers.

---

## 📦 Installation

### 1. Clone the repository

```bash
git clone https://github.com/KernFerm/Go-Fish-Discord-Bot.git
cd Go-Fish-Discord-Bot
```

---

### 2. Install dependencies

```bash
npm install
```

This installs everything listed in `package.json`.

---

## 🔐 Environment Setup

Create a `.env` file in the root folder:

```env
TOKEN=YOUR_DISCORD_BOT_TOKEN
CLIENT_ID=YOUR_APPLICATION_ID
GUILD_ID=YOUR_SERVER_ID
```

Replace values with your own.

---

## ▶️ Run the Bot

Start the bot with:

```bash
node index.js
```

or (if you use nodemon):

```bash
npm run dev
```

---

## 🔄 Register Slash Commands

If slash commands don’t appear, run:

```bash
node deploy-commands.js
```

(Only needed once or after command updates.)

---

## 🛠 Troubleshooting

### Bot won’t start?

Try:

```bash
npm update
```

or delete and reinstall dependencies:

```bash
rm -rf node_modules package-lock.json
npm install
```

---

### Discord.js errors?

You may need to upgrade:

```bash
npm install discord.js@latest
```

---

## ⚠️ Code Notice

This project may require updates for:

* New Discord API versions
* Latest Discord.js
* Node.js compatibility

Feel free to modernize or refactor as needed.

---

## 💙 Support FNBubbles420 Org (501(c)(3))

Helping disabled gamers, veterans, students, streamers, and developers through accessibility tech and education.

🌐 [https://www.fnbubbles420.org](https://www.fnbubbles420.org)

---

Built with love by Bubbles 💙
