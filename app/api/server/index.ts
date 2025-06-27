import dotenv from "dotenv";
import http from "http";
import https from "https";
import { EReqMethod, genresByMood } from "./types";
import getTrackData from "../controllers";
import getSpotifyTrackImage from "../controllers/getSpotifyData";

dotenv.config();
const { PORT, ACCESS_TOKEN } = process.env;

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  const reqUrl = req.url ?? "/";
  const parsedUrl = new URL(reqUrl, `http://${req.headers.host}`);
  const route = parsedUrl.pathname;
  const GET = req.method === EReqMethod.GET;

  if (route === "/" && GET) {
    res.writeHead(200, { "content-type": "text/html" });
    res.end("Moodify api");
  } else if (route === "/severalTracks" && GET) {
    const selectedMood = parsedUrl.searchParams.get("mood");
    const genre = selectedMood ? genresByMood[selectedMood].genre : "";
    const options = {
      hostname: "api.spotify.com",
      path: `/v1/search?q=${selectedMood}+genre:${genre}&type=track&limit=40`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    };

    const spotifyReq = https.request(options, (spotifyRes) => {
      let data = "";
      spotifyRes.on("data", (chunk) => (data += chunk));
      spotifyRes.on("end", async () => {
        res.writeHead(200, { "Content-Type": "application/json" });
        if (data) {
          const parsedData = JSON.parse(data);
          const processData = await getTrackData(parsedData);
          const randomResultIndex = Math.floor(Math.random() * 40) + 1;
          const spotifydata = await getSpotifyTrackImage(
            processData[randomResultIndex].url
          );
          res.end(
            JSON.stringify({
              trackData: processData[randomResultIndex],
              image: spotifydata,
            })
          );
        } else {
          res.end(data);
        }
      });
    });

    spotifyReq.on("error", (err) => {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Error: " + err.message);
    });

    spotifyReq.end();
  }
});

server.listen(PORT, () => {
  console.log(
    `🦋 servidor corriendo en el puerto:${PORT} - http://localhost:${PORT}`
  );
});
