const TelegramBot = require("node-telegram-bot-api");
const axios = require("axios");

const bot = new TelegramBot(process.env.TOKEN, { polling: true });

bot.on("message", async (msg) => {
  try {
    const res = await axios.post(
      "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct",
      {
        inputs: "Реши задачу пошагово: " + msg.text
      },
      {
        headers: {
          Authorization: "Bearer " + process.env.HF_TOKEN
        }
      }
    );

    const answer = res.data?.[0]?.generated_text || "Ошибка 😢";

    bot.sendMessage(msg.chat.id, answer);

  } catch (e) {
    bot.sendMessage(msg.chat.id, "AI не отвечает 😢");
  }
});
