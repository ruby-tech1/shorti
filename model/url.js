import mongoose from "mongoose";

import validator from "validator";
const validatorOptions = {
  protocols: ["http", "https", "ftp"],
  require_tld: true,
  require_protocol: true,
  require_host: true,
  require_valid_protocol: true,
  allow_underscores: false,
  host_whitelist: false,
  host_blacklist: false,
  allow_trailing_dot: false,
  allow_protocol_relative_urls: false,
  disallow_auth: false,
};

const UrlSchema = new mongoose.Schema(
  {
    urlId: {
      type: String,
      required: true,
      unique: true,
    },
    origUrl: {
      type: String,
      required: [true, "please provide the original-url"],
      trim: true,
      //   unique: true,
      validate: {
        validator: (url) => {
          return validator.isURL(url, validatorOptions);
        },
        message: "Please provide valid url",
      },
    },
    shortUrl: {
      type: String,
      required: [true, "please provide the short-url"],
      //   validate: {
      //     validator: (url) => {
      //       return validator.isURL(url, validatorOptions);
      //     },
      //     message: "Please provide valid url",
      //   },
      trim: true,
    },
    clicks: {
      type: Number,
      //   required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

const model = mongoose.model("Url", UrlSchema);
export default model;
