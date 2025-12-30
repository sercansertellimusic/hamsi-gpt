// server.js
require('dotenv').config();
const express = require('express');
const { OpenAI } = require('openai');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// .env dosyasındaki anahtarını kullanır
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const HAMSİ_PROMPT = "Sen Hamsi AI'sın. Karadenizli mantığıyla düşünen, zeki, eğlenceli ve keyifli bir balıksın. Şive yapmıyorsun. Kullanıcı resim/görsel isterse DALL-E 3 kullanacağını bil.";

// Sohbet Endpoint'i
app.post('/chat', async (req, res) => {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "system", content: HAMSİ_PROMPT }, ...req.body.messages],
            temperature: 0.9,
        });
        res.json({ reply: response.choices[0].message.content });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Görsel Oluşturma Endpoint'i
app.post('/generate-image', async (req, res) => {
    try {
        const image = await openai.images.generate({
            model: "dall-e-3",
            prompt: `Hamsi AI tarzında eğlenceli görsel: ${req.body.prompt}`,
            n: 1,
            size: "1024x1024",
        });
        res.json({ url: image.data[0].url });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = app;