export enum EReqMethod {
  GET = "GET",
  POST = "POST",
}

export const genresByMood: Record<
  string,
  { genre: string; valence: number; energy: number }
> = {
  happy: { genre: "pop", valence: 0.9, energy: 0.7 },
  sad: { genre: "acoustic", valence: 0.2, energy: 0.3 },
  angry: { genre: "metal", valence: 0.2, energy: 0.9 },
  relaxed: { genre: "chill", valence: 0.7, energy: 0.3 },
  euphoric: { genre: "edm", valence: 0.95, energy: 0.95 },
  romantic: { genre: "rnb", valence: 0.8, energy: 0.4 },
  tired: { genre: "ambient", valence: 0.4, energy: 0.2 },
  confident: { genre: "hip-hop", valence: 0.7, energy: 0.8 },
  inspired: { genre: "indie", valence: 0.6, energy: 0.6 },
  sensitive: { genre: "piano", valence: 0.3, energy: 0.2 },
};
