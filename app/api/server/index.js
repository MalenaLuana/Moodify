"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const http_1 = __importDefault(require("http"));
const https_1 = __importDefault(require("https"));
const types_1 = require("./types");
const types_2 = require("../controllers/types");
const controllers_1 = __importDefault(require("../controllers"));
dotenv_1.default.config();
const { PORT, ACCESS_TOKEN } = process.env;
const server = http_1.default.createServer((req, res) => {
    var _a;
    const reqUrl = (_a = req.url) !== null && _a !== void 0 ? _a : "/";
    const parsedUrl = new URL(reqUrl, `http://${req.headers.host}`);
    const route = parsedUrl.pathname;
    const GET = req.method === types_1.EReqMethod.GET;
    if (route === "/" && GET) {
        res.writeHead(200, { "content-type": "text/html" });
        res.end("Moodify api");
    }
    else if (route === "/severalTracks" && GET) {
        const options = {
            hostname: "api.spotify.com",
            path: `/v1/search?q=${types_2.Mood.Angry}&type=track&limit=50`,
            method: "GET",
            headers: {
                Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
        };
        const spotifyReq = https_1.default.request(options, (spotifyRes) => {
            let data = "";
            spotifyRes.on("data", (chunk) => (data += chunk));
            spotifyRes.on("end", () => {
                res.writeHead(200, { "Content-Type": "application/json" });
                console.log(data);
                if (data) {
                    const parseData = JSON.parse(data);
                    const processData = (0, controllers_1.default)(parseData);
                    res.end(JSON.stringify(processData));
                }
                else {
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
    else if (route === "/genres" && GET) {
        const options = {
            hostname: "api.spotify.com",
            path: `/v1/recommendations/available-genre-seeds`,
            method: "GET",
            headers: {
                Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
        };
        const spotifyReq = https_1.default.request(options, (spotifyRes) => {
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
    console.log(`🦋 servidor corriendo en el puerto:${PORT} - http://localhost:${PORT}`);
});
