import axios from "axios";

export const ping = async () => {
  try {
    const origin = process.env.ORIGIN;
    const response = await axios.get(origin);
    console.log(
      `Reloaded at ${new Date().toISOString()}: Status Code ${response.status}`
    );
  } catch (error) {
    console.error(
      `Error reloading at ${new Date().toISOString()}:`,
      error.message
    );
  }
};
