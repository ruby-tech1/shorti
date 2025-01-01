import qrcode from "qrcode";
import { BadRequestError } from "../errors/index.js";
import validator from "validator";

export const generateQrcodeService = async ({ data, color, background }) => {
  if (!data || !validator.isURL(data)) {
    throw new BadRequestError("Invalid data to Qrcode");
  }

  const options = {
    errorCorrectionLevel: "H", // High error correction (30%)
    //   type: "png", // Output format
    quality: 0.95, // Image quality
    margin: 1, // Margin around QR code
    color: {
      dark: color || "#000000", // QR code color
      light: background || "#FFFFFF", // Background color
    },
  };

  const qrDataUrl = await qrcode.toDataURL(data, options);
  return { qrCode: qrDataUrl };
};
