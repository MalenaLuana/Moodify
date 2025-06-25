document.getElementById("enterBtn").addEventListener("click", () => {
  document.getElementById("landing").classList.remove("active");
  document.getElementById("dashboard").classList.add("active");
});

const moods = [
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

const grid = document.getElementById("mood-grid");

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
    console.log(mood.value);
  });

  grid.appendChild(btn);
});
