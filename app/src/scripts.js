document.getElementById("enterBtn").addEventListener("click", () => {
  document.getElementById("landing").classList.remove("active");
  document.getElementById("dashboard").classList.add("active");
});

const grid = document.getElementById("mood-grid");

export const moods = [
  { value: "happy", label: "Feliz" },
  { value: "sad", label: "Triste" },
  { value: "angry", label: "Enojad@" },
  { value: "confident", label: "Confiad@" },
  { value: "relaxed", label: "Relajad@" },
  { value: "euphoric", label: "Eufóric@" },
  { value: "tired", label: "Cansad@" },
  { value: "sensitive", label: "Sensible" },
  { value: "inspired", label: "Inspirad@" },
  { value: "romantic", label: "Romántic@" },
];

function showTrackData(data) {
  const trackLink = document.getElementById("track-link");
  trackLink.href = data.trackData.url;
  trackLink.style.display = "inline-block";

  document.getElementById("track-name").textContent = data.trackData.name;
  document.getElementById("track-image").src = data.image;
  document.getElementById("track-artist").textContent =
    data.trackData.artist.name;
}

moods.forEach((mood) => {
  const btn = document.createElement("button");
  btn.className = "mood-button";
  btn.textContent = mood.label;
  btn.dataset.value = mood.value;

  btn.addEventListener("click", () => {
    document
      .querySelectorAll(".mood-button")
      .forEach((b) => b.classList.remove("selected"));
    btn.classList.add("selected");

    document
      .querySelectorAll(".screen")
      .forEach((el) => el.classList.remove("active"));
    document.getElementById("result").classList.add("active");
    document.getElementById("loading").style.display = "block";
    document.getElementById("track-content").style.display = "none";

    fetch(`http://localhost:3000/severalTracks?mood=${mood.value}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        document.getElementById("loading").style.display = "none";
        document.getElementById("track-content").style.display = "block";
        showTrackData(data);
      })
      .catch((error) => {
        document.getElementById("loading").style.display = "none";
        document.getElementById("track-content").style.display = "block";
        console.error("Error al hacer fetch:", error);
      });
  });

  grid.appendChild(btn);
});

document.getElementById("backBtn").addEventListener("click", () => {
  document
    .querySelectorAll(".screen")
    .forEach((el) => el.classList.remove("active"));
  document.getElementById("dashboard").classList.add("active");
});
