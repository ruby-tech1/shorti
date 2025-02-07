import { StatusCodes } from "http-status-codes";
const errorHandlerMiddleware = (err, req, res, next) => {
  if (process.env.NODE_ENV !== "production") {
    console.log(err);
  }

  let customError = {
    // set default
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong, Try again later",
  };

  // if (err instanceof CustomAPIError) {
  //   return res.status(err.statusCode).json({ msg: err.message })
  // }

  if (err.name === "ValidationError") {
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(",");
    customError.statusCode = 400;
  }

  if (err.code && err.code === 11000) {
    customError.msg = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} field, please choose another value`;
    customError.statusCode = 400;
  }

  if (err.name === "CastError") {
    customError.msg = `No item found with id: ${err.value}`;
    customError.statusCode = StatusCodes.NOT_FOUND;
  }

  if (err.type === "StripeAuthenticationError") {
    customError.msg = "Invalid API Key provided";
    customError.statusCode = 400;
  }

  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err });
  return res.status(customError.statusCode).json({ msg: customError.msg });
};

export const botErrorHandlerMiddleware = (bot) => {
  // Listen for polling errors
  bot.on("polling_error", (error) => {
    console.log("Polling Error:", error);
  });

  // Optional: Listen for other types of errors
  bot.on("webhook_error", (error) => {
    console.error("Webhook Error:", error);
  });

  bot.on("error", (error) => {
    console.error("General Error:", error);
  });
};

export default errorHandlerMiddleware;
