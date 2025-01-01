import telegramBot from "node-telegram-bot-api";
import { botErrorHandlerMiddleware } from "../middleware/error-handler.js";
import { botCreateShortUrlService } from "./UrlService.js";

export const botActions = ({ token }) => {
  const bot = new telegramBot(token, { polling: true });
  const options = {
    parse_mode: "HTML",
    disable_web_page_preview: true,
  };

  botErrorHandlerMiddleware(bot);

  bot.on("message", (msg) => {
    const chatId = msg.chat.id;
    const receivedText = msg.text;

    console.log(
      `ChatId: ${chatId}. Received message from ${msg.from.username}: ${receivedText}`
    );
  });

  bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;

    const welcomeMessage = `
  Welcome, ${msg.from.first_name}!\nI'm shorti your utility bot for generating shorten url\nand QrCode for URLs by <a href="https://github.com/ruby-tech1">@rubytech</a>.\n\nHere are some commands you can use:\n/start - Start shorti\n/about - Get information about shorti\n/help - Get help information\n/echo - Echo your messages`;
    bot.sendMessage(chatId, welcomeMessage, options);
  });

  bot.onText(/\/help/, (msg) => {
    const chatId = msg.chat.id;
    const helpMessage =
      "<b>Help Menu</b>\n\n/start - Start the bot and see the welcome message\n/help - Display this help message\n/echo [text] - Echo the text you provide\n/generateshorturl [URL] - Used for generating shorten url";
    bot.sendMessage(chatId, helpMessage, options);
  });

  bot.onText(/\/echo/, (msg) => {
    const chatId = msg.chat.id;
    const receivedMessage = msg.text.substring(5);

    bot.sendMessage(chatId, `You said: ${receivedMessage}`);
  });

  botCreateShortUrlService({ bot, options });
};
