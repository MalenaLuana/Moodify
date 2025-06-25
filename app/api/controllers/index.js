"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getTrackData = (response) => {
    const processTrack = response.tracks.items.map((track) => {
        return {
            name: track.name,
            image: track.images,
            url: track.external_urls.spotify,
            artist: track.album.artists[0],
        };
    });
    return processTrack;
};
exports.default = getTrackData;
