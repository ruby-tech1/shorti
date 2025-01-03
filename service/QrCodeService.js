import qrcode from "qrcode";
import { BadRequestError } from "../errors/index.js";
import validator from "validator";

const validateHexValue = ({ hex }) => {
  hex = hex.replace("#", "");

  if (![3, 6].includes(hex.length) || !/^[0-9A-Fa-f]+$/.test(hex)) {
    throw new BadRequestError("Invalid hex value for color");
  }
};

export const generateQrcodeService = async ({
  data,
  color,
  background,
  isBot,
}) => {
  if (!data || !validator.isURL(data)) {
    throw new BadRequestError("Invalid data to Qrcode");
  }

  if (color || background) {
    validateHexValue(color);
    validateHexValue(background);
  }

  const options = {
    errorCorrectionLevel: "H", // High error correction (30%)
    type: "png", // Output format
    quality: 0.95, // Image quality
    margin: 1, // Margin around QR code
    color: {
      dark: color || "#000000", // QR code color
      light: background || "#FFFFFF", // Background color
    },
  };

  const qrCodeData = !isBot
    ? await qrcode.toDataURL(data, options)
    : await qrcode.toBuffer(data, options);

  return { qrCode: qrCodeData };
};
