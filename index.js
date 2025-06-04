const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = 3000;

app.use(cors());

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

const tiktokLinks = [
  "https://vt.tiktok.com/ZSk6semaY/",
  "https://vt.tiktok.com/ZSk6pTJaF/",
  "https://vt.tiktok.com/ZSk6pw2M4/",
  "https://vt.tiktok.com/ZSk6sY1Ea/",
  "https://vt.tiktok.com/ZSk6pGKy3/",
  "https://vt.tiktok.com/ZSk6sJt91/",
  "https://vt.tiktok.com/ZSk6pcMB9/",
  "https://vt.tiktok.com/ZSk6pcxxG/"
];

app.get("/spiderandom", async (req, res) => {
  try {
    const url = tiktokLinks[Math.floor(Math.random() * tiktokLinks.length)];
    const api = `https://tikwm.com/api?url=${encodeURIComponent(url)}`;

    const { data } = await axios.get(api, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; ShotiAPI/1.0)"
      },
      timeout: 10000
    });

    if (!data.data || !data.data.wmplay) {
      return res.status(500).json({ error: "Failed to fetch video from Tikwm." });
    }

    const videoUrl = data.data.wmplay;
    const title = data.data.title;
    const author = data.data.author.nickname;

    return res.json({ url: videoUrl, title: title, author: author });
  } catch (err) {
    console.error("❌ Error fetching TikTok video:", err.message);
    return res.status(500).json({ error: "Error fetching TikTok video, please try again later." });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Shoti API is running on port ${PORT}`);
});