import { RawSpotifyResponse, SimplifiedTrack } from "./types";

const getTrackData = (response: RawSpotifyResponse): SimplifiedTrack[] => {
  const processTrack = response.tracks?.items?.map((track) => {
    return {
      name: track.name,
      url: track.external_urls.spotify,
      artist: track.album.artists[0],
    };
  });

  return processTrack;
};

export default getTrackData;
