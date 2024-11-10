import URL from "../model/url.js";
import { BadRequestError } from "../errors/index.js";
import { StatusCodes } from "http-status-codes";
import { nanoid } from "nanoid";

export const createShortUrl = async (req, res) => {
  const { origUrl } = req.body;

  if (!origUrl) {
    throw new BadRequestError("Please provide the url");
  }

  let url = await URL.findOne({ origUrl });
  if (url) {
    const { shortUrl, clicks } = url;
    res.status(StatusCodes.OK).json({ shortUrl, clicks });
    return;
  }
  const urlId = nanoid(10);
  const shortUrl = `${process.env.ORIGIN}/u/${urlId}`;

  url = await URL.create({ origUrl, shortUrl, urlId });

  res
    .status(StatusCodes.CREATED)
    .json({ shortUrl: url.shortUrl, clicks: url.clicks });
};

export const getShortUrl = async (req, res) => {
  const { id } = req.params;

  const url = await URL.findOne({ urlId: id });
  if (!url) {
    throw new BadRequestError("Invalid Url");
  }

  url.clicks += 1;
  await url.save();

  res.status(StatusCodes.OK).redirect(url.origUrl);
};
