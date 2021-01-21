const config = require("./config.json");
const monkeUrl = "https://www.placemonkeys.com/500?random";
const axios = require("axios");
const TelegramBot = require("node-telegram-bot-api"),
    telegram = new TelegramBot(config.BOT_TOKEN, { polling: true });

telegram.on("text", (message) => {
	if (message.text.toLowerCase().includes("monke")) {
		sendMonke(message.chat.id);
	}
});

function sendMonke(chatId) {
	axios.get(monkeUrl, {responseType: "arraybuffer"}).then((res) => {
		let buffer = Buffer.from(res.data, "utf-8");
		telegram.sendPhoto(chatId, buffer);
	}).catch((error) => {
		console.log(error);
		telegram.sendMessage(chatId, "monke");
	})
}