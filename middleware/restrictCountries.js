import axios from "axios";

const blockedCountries = ["Syria", "Afghanistan", "Iran"];

const restrictCountriesMiddleware = async (req, res, next) => {
  try {
    const ip = (req.headers["x-forwarded-for"] || req.socket.remoteAddress || "").split(",")[0].trim();
    const cleanIp = ip.replace("::ffff:", "");
    const geoResponse = await axios.get(`http://ip-api.com/json/${cleanIp}`);
    const userCountry = geoResponse.data.country;
    if (blockedCountries.includes(userCountry)) {
      return res.status(403).json({ message: `Signup is not allowed from ${userCountry}.` });
    }
    next();
  } catch (error) {
    console.error("Geo IP check failed:", error.message);
    return res.status(500).json({ message: "Could not verify location." });
  }
};

export default restrictCountriesMiddleware;
