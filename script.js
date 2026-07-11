"use strict";

const screens = document.querySelectorAll(".screen");
const nextButtons = document.querySelectorAll("[data-next]");

const answerInput = document.getElementById("answer");
const answerButton = document.getElementById("answerButton");
const answerMessage = document.getElementById("answerMessage");
const restartButton = document.getElementById("restartButton");

/*
 * 正解として認める言葉を登録します。
 * 仮に「かぎ」を正解にしています。
 */
const acceptedAnswers = [
  "かぎ",
  "カギ",
  "鍵"
];

function showScreen(screenId) {
  screens.forEach((screen) => {
    screen.classList.remove("active");
  });

  const nextScreen = document.getElementById(screenId);

  if (!nextScreen) {
    console.error(`画面が見つかりません: ${screenId}`);
    return;
  }

  nextScreen.classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function normalizeAnswer(value) {
  return value
    .trim()
    .replace(/\s+/g, "")
    .toLowerCase();
}

function checkAnswer() {
  const userAnswer = normalizeAnswer(answerInput.value);

  if (!userAnswer) {
    answerMessage.textContent = "答えを入力してください。";
    answerMessage.className = "message incorrect";
    answerInput.focus();
    return;
  }

  const normalizedAnswers = acceptedAnswers.map(normalizeAnswer);
  const isCorrect = normalizedAnswers.includes(userAnswer);

  if (isCorrect) {
    answerMessage.textContent = "鍵が開いたようだ。";
    answerMessage.className = "message correct";
    answerButton.disabled = true;

    window.setTimeout(() => {
      showScreen("clear");
    }, 900);

    return;
  }

  answerMessage.textContent =
    "まだ鍵は開かないようだ。もう一度考えてみよう。";
  answerMessage.className = "message incorrect";
}

function restartGame() {
  answerInput.value = "";
  answerMessage.textContent = "";
  answerMessage.className = "message";
  answerButton.disabled = false;
  showScreen("cover");
}

nextButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const nextScreenId = button.dataset.next;
    showScreen(nextScreenId);
  });
});

answerButton.addEventListener("click", checkAnswer);

answerInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    checkAnswer();
  }
});

restartButton.addEventListener("click", restartGame);
