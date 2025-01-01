import {
  createShortUrlService,
  getShortUrlService,
} from "../service/UrlService.js";
import { StatusCodes } from "http-status-codes";

export const createShortUrl = async (req, res) => {
  const returnUrl = await createShortUrlService({ ...req.body });

  res.status(StatusCodes.CREATED).json(returnUrl);
};

export const getShortUrl = async (req, res) => {
  const returnUrl = await getShortUrlService({ ...req.params });

  res.status(StatusCodes.OK).redirect(returnUrl);
};
