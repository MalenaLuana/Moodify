export enum Genre {
  acoustic = "acoustic",
  alternative = "alternative",
  ambient = "ambient",
  blues = "blues",
  house = "house",
  pop = "pop",
  trap = "trap",
  rock = "rock",
  techno = "techno",
}

export enum Mood {
  Happy = "happy",
  Sad = "sad",
  Angry = "angry",
  Confident = "confident",
  Relaxed = "relaxed",
  Euphoric = "euphoric",
  Tired = "tired",
  Sensitive = "sensitive",
  Inspired = "inspired",
  Romantic = "romantic",
}

export interface Artist {
  external_urls: { spotify: string };
  id: string;
  name: string;
}

interface TrackImage {
  height: number;
  width: number;
  url: string;
}

export interface Track {
  album: { artists: Artist[] };
  external_urls: { spotify: string };
  images: TrackImage[];
  name: string;
}
