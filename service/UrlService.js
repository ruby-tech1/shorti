import URL from "../model/url.js";
import { BadRequestError } from "../errors/index.js";
import { nanoid } from "nanoid";

export const createShortUrlService = async ({ origUrl }) => {
  if (!origUrl) {
    throw new BadRequestError("Please provide the url");
  }

  let url = await URL.findOne({ origUrl });
  if (url) {
    const { shortUrl, clicks } = url;
    return { shortUrl, clicks };
  }
  const urlId = nanoid(10);
  const shortUrl = `${process.env.ORIGIN}/u/${urlId}`;

  url = await URL.create({ origUrl, shortUrl, urlId });

  return { shortUrl: url.shortUrl, clicks: url.clicks };
};

export const botCreateShortUrlService = ({ bot, options }) => {
  bot.onText(/\/generateshorturl/, async (msg) => {
    const chatId = msg.chat.id;
    const origUrl = msg.text.substring(18);

    const { shortUrl, clicks } = await createShortUrlService({ origUrl });
    const resultText = `Short Url: ${shortUrl}\nClicks: ${clicks}`;

    bot.sendMessage(chatId, resultText, options);
  });
};

export const getShortUrlService = async ({ id }) => {
  const url = await URL.findOne({ urlId: id });
  if (!url) {
    throw new BadRequestError("Invalid Url");
  }

  url.clicks += 1;
  await url.save();

  return { origUrl: url.origUrl };
};
