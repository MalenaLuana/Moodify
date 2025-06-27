"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const http_1 = __importDefault(require("http"));
const https_1 = __importDefault(require("https"));
const types_1 = require("./types");
const controllers_1 = __importDefault(require("../controllers"));
const getSpotifyData_1 = __importDefault(require("../controllers/getSpotifyData"));
dotenv_1.default.config();
const { PORT, ACCESS_TOKEN } = process.env;
const server = http_1.default.createServer((req, res) => {
    var _a;
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    const reqUrl = (_a = req.url) !== null && _a !== void 0 ? _a : "/";
    const parsedUrl = new URL(reqUrl, `http://${req.headers.host}`);
    const route = parsedUrl.pathname;
    const GET = req.method === types_1.EReqMethod.GET;
    if (route === "/" && GET) {
        res.writeHead(200, { "content-type": "text/html" });
        res.end("Moodify api");
    }
    else if (route === "/severalTracks" && GET) {
        const selectedMood = parsedUrl.searchParams.get("mood");
        const genre = selectedMood ? types_1.genresByMood[selectedMood].genre : "";
        const options = {
            hostname: "api.spotify.com",
            path: `/v1/search?q=${selectedMood}&type=track&limit=40`,
            method: "GET",
            headers: {
                Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
        };
        const spotifyReq = https_1.default.request(options, (spotifyRes) => {
            let data = "";
            spotifyRes.on("data", (chunk) => (data += chunk));
            spotifyRes.on("end", () => __awaiter(void 0, void 0, void 0, function* () {
                res.writeHead(200, { "Content-Type": "application/json" });
                if (data) {
                    const parsedData = JSON.parse(data);
                    const processData = yield (0, controllers_1.default)(parsedData);
                    const randomResultIndex = Math.floor(Math.random() * 40) + 1;
                    const spotifydata = yield (0, getSpotifyData_1.default)(processData[randomResultIndex].url);
                    res.end(JSON.stringify({
                        trackData: processData[randomResultIndex],
                        image: spotifydata,
                    }));
                }
                else {
                    res.end(data);
                }
            }));
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
