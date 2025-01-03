import telegramBot from "node-telegram-bot-api";
import { botErrorHandlerMiddleware } from "../middleware/error-handler.js";
import { createShortUrlService } from "./UrlService.js";
import { generateQrcodeService } from "./QrCodeService.js";
import { BadRequestError } from "../errors/index.js";

export const createBot = ({ token }) => {
  const bot = new telegramBot(token, { polling: true });
  const options = {
    parse_mode: "HTML",
    disable_web_page_preview: true,
  };

  botErrorHandlerMiddleware(bot);

  const safebot = {
    async handleCommand(command, handler) {
      bot.onText(command, async (msg) => {
        try {
          await handler(msg);
        } catch (error) {
          const chatId = msg.chat.id;
          if (error instanceof BadRequestError) {
            await bot.sendMessage(chatId, `Error: ${error.message}`);
          } else {
            console.error("Bot Error:", error);
            await bot.sendMessage(
              chatId,
              "Something went wrong, Try again later"
            );
          }
        }
      });
    },
    async handleBotOn(command, handler) {
      bot.on(command, async (msg) => {
        try {
          await handler(msg);
        } catch (error) {
          const chatId = msg.chat.id;
          console.error("Bot Error:", error);
          await bot.sendMessage(
            chatId,
            "Something went wrong, Try again later"
          );
        }
      });
    },
  };

  safebot.handleBotOn("message", (msg) => {
    console.log(
      `ChatId: ${msg.chat.id}. Received message from ${msg.from.username}: ${msg.text}`
    );

    const greetings = ["hi", "hello", "hey", "howdy", "hola"];
    const messageText = msg.text.toString().toLowerCase();

    if (greetings.some((msg) => messageText.startsWith(msg))) {
      bot.sendMessage(msg.chat.id, `Hello ${msg.from.first_name}`);
    }

    const exitCommands = ["exit", "pause", "quit", "goodbye", "bye", "later"];
    if (exitCommands.some((msg) => messageText.includes(msg))) {
      bot.sendMessage(msg.chat.id, "Hope to see you around again , Bye");
    }
  });

  safebot.handleCommand(/\/start/, (msg) => {
    const chatId = msg.chat.id;

    const welcomeMessage = `
  Welcome, ${msg.from.first_name}!\nI'm shorti your utility bot for generating shorten url\nand QrCode for URLs by <a href="https://github.com/ruby-tech1">@rubytech</a>.\n\nHere are some commands you can use:\n/start - Start shorti\n/about - Get information about shorti\n/help - Get help information\n/echo - Echo your messages\n/generateshorturl [URL] - Used for generating shorten url`;
    bot.sendMessage(chatId, welcomeMessage, options);
  });

  safebot.handleCommand(/\/help/, (msg) => {
    const chatId = msg.chat.id;
    const helpMessage =
      "<b>Help Menu</b>\n\n/start - Start the bot and see the welcome message\n/help - Display this help message\n/echo [text] - Echo the text you provide\n/generateshorturl [URL] - Used for generating shorten url\n/generateqrcode [URl] - Used for generating Qr-codes for Urls";
    bot.sendMessage(chatId, helpMessage, options);
  });

  safebot.handleCommand(/\/echo/, (msg) => {
    const chatId = msg.chat.id;
    const receivedMessage = msg.text.substring(5);

    bot.sendMessage(chatId, `You said: ${receivedMessage}`);
  });

  safebot.handleCommand(/\/generateqrcode/, async (msg) => {
    const chatId = msg.chat.id;
    const data = msg.text.substring(16);

    const { qrCode } = await generateQrcodeService({ data, isBot: true });
    bot.sendPhoto(chatId, qrCode);
  });
  safebot.handleCommand(/\/generateshorturl/, async (msg) => {
    const chatId = msg.chat.id;
    const origUrl = msg.text.substring(18);

    const { shortUrl, clicks } = await createShortUrlService({ origUrl });
    const resultText = `Short Url: ${shortUrl}\nClicks: ${clicks}`;

    bot.sendMessage(chatId, resultText, options);
  });
};
