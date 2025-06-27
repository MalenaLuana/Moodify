"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getTrackData = (response) => {
    var _a, _b;
    const processTrack = (_b = (_a = response.tracks) === null || _a === void 0 ? void 0 : _a.items) === null || _b === void 0 ? void 0 : _b.map((track) => {
        return {
            name: track.name,
            url: track.external_urls.spotify,
            artist: track.album.artists[0],
        };
    });
    return processTrack;
};
exports.default = getTrackData;
