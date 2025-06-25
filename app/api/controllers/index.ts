import { Track } from "./types";

const getTrackData = (response: any) => {
  const processTrack = response.tracks.items.map((track: Track) => {
    return {
      name: track.name,
      image: track.images,
      url: track.external_urls.spotify,
      artist: track.album.artists[0],
    };
  });
  return processTrack;
};
export default getTrackData;
