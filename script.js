let minutes = 10,
  seconds = 0;
const minEl = document.getElementById("min");
const secEl = document.getElementById("sec");
const timer = setInterval(() => {
  if (seconds === 0) {
    if (minutes === 0) {
      clearInterval(timer);
      return;
    }
    minutes--;
    seconds = 59;
  } else {
    seconds--;
  }
  minEl.textContent = String(minutes).padStart(2, "0");
  secEl.textContent = String(seconds).padStart(2, "0");
}, 1000);

const modal = document.getElementById("modal");
const speakerModal = document.getElementById("speakerModal");
const submitBtn = document.querySelector(".submit-btn");

document.getElementById("openModal").onclick = () =>
  (modal.style.display = "flex");
document.getElementById("openSpeaker").onclick = () =>
  (speakerModal.style.display = "flex");

[modal, speakerModal].forEach((m) =>
  m.addEventListener("click", (e) => {
    if (e.target === m) m.style.display = "none";
  })
);

// === GOOGLE SHEETS FORM SUBMIT ===
const scriptURL =
  "https://script.google.com/macros/s/AKfycbw9mX6uc0nJ6qEScMAMG3lBK5ZOrZyUcD5nNQiNgma1HCuaUsBfCFksYBjJj3FkmLzklQ/exec";

submitBtn.addEventListener("click", function () {
  const name = document.querySelector(".styled-input input").value.trim();
  const phone = document.getElementById("phone").value.trim();

  document.querySelectorAll("input").forEach((input) => input.blur());

  const params = new URLSearchParams();
  params.append("name", name);
  params.append("phone", "+998" + phone);

  const blob = new Blob([params.toString()], {
    type: "application/x-www-form-urlencoded",
  });

  navigator.sendBeacon(scriptURL, blob);

  modal.style.display = "none";

  window.location.href = "./thankyou.html";
});
