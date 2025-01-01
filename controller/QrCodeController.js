import { generateQrcodeService } from "../service/QrCodeService.js";
import { StatusCodes } from "http-status-codes";

export const generateQrcodeController = async (req, res) => {
  const result = await generateQrcodeService({ ...req.body });
  res.status(StatusCodes.OK).json(result);
};
