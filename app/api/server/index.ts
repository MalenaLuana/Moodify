import dotenv from "dotenv";
import http from "http";
import https from "https";
import { EReqMethod } from "./types";
import { Mood } from "../controllers/types";
import getTrackData from "../controllers";

dotenv.config();
const { PORT, ACCESS_TOKEN } = process.env;

const server = http.createServer((req, res) => {
  const reqUrl = req.url ?? "/";
  const parsedUrl = new URL(reqUrl, `http://${req.headers.host}`);
  const route = parsedUrl.pathname;
  const GET = req.method === EReqMethod.GET;

  if (route === "/" && GET) {
    res.writeHead(200, { "content-type": "text/html" });
    res.end("Moodify api");
  } else if (route === "/severalTracks" && GET) {
    const options = {
      hostname: "api.spotify.com",
      path: `/v1/search?q=${Mood.Angry}&type=track&limit=50`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    };

    const spotifyReq = https.request(options, (spotifyRes) => {
      let data = "";
      spotifyRes.on("data", (chunk) => (data += chunk));
      spotifyRes.on("end", () => {
        res.writeHead(200, { "Content-Type": "application/json" });
        console.log(data);
        if (data) {
          const parseData = JSON.parse(data);
          const processData = getTrackData(parseData);
          res.end(JSON.stringify(processData));
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
  } else if (route === "/genres" && GET) {
    const options = {
      hostname: "api.spotify.com",
      path: `/v1/recommendations/available-genre-seeds`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    };

    const spotifyReq = https.request(options, (spotifyRes) => {
      let data = "";
      spotifyRes.on("data", (chunk) => (data += chunk));
      spotifyRes.on("end", () => {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(data);
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
