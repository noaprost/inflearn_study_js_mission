const expression = document.querySelector(".expression");
const startBtn = document.querySelector(".start");
const nextBtn = document.querySelector(".next");
const restartBtn = document.querySelector(".restart");
const buttonContainer = document.querySelector(".button_container");
const noAnswer = document.querySelector("#no_answer");
const body = document.querySelector("body");

let btn1;
let btn2;
let ans;

startBtn.addEventListener("click", () => {
  ans = makeQuiz();
  const ran1 = Math.round(Math.random() * (ans - 2)) + 1; // 1 ~ ans-1
  const ran2 = Math.round(Math.random() * (99 - ans)) + ans + 1; // ans+1 ~ 100

  const isRandom = Math.round(Math.random());
  makeButton(isRandom, ran1, ran2, ans);

  startBtn.classList.add("hidden");
  expression.classList.remove("hidden");
});

nextBtn.addEventListener("click", () => {
  btn1.remove();
  btn2.remove();

  body.classList.remove("success");
  body.classList.remove("fail");
  noAnswer.classList.remove("success");
  noAnswer.classList.remove("fail");
  noAnswer.classList.remove("clicked");

  ans = makeQuiz();
  const ran1 = Math.round(Math.random() * (ans - 2)) + 1; // 1 ~ ans-1
  const ran2 = Math.round(Math.random() * (99 - ans)) + ans + 1; // ans+1 ~ 100

  const isRandom = Math.round(Math.random());
  makeButton(isRandom, ran1, ran2, ans);

  nextBtn.classList.add("hidden");
});

restartBtn.addEventListener("click", () => {
  btn1.remove();
  btn2.remove();

  body.classList.remove("success");
  body.classList.remove("fail");
  noAnswer.classList.remove("success");
  noAnswer.classList.remove("fail");
  noAnswer.classList.remove("clicked");

  ans = makeQuiz();
  const ran1 = Math.round(Math.random() * (ans - 2)) + 1; // 1 ~ ans-1
  const ran2 = Math.round(Math.random() * (99 - ans)) + ans + 1; // ans+1 ~ 100

  const isRandom = Math.round(Math.random());
  makeButton(isRandom, ran1, ran2, ans);
  restartBtn.classList.add("hidden");
});

function makeQuiz() {
  const oper1 = Math.round(Math.random() * 49) + 1; // 1~50
  const oper2 = Math.round(Math.random() * 49) + 1; // 1~50
  expression.textContent = `${oper1} + ${oper2} ?`;

  return oper1 + oper2;
}

function makeButton(r, r1, r2, a) {
  if (r) {
    btn1 = document.createElement("button");
    btn2 = document.createElement("button");

    btn1.textContent = r1;
    btn2.textContent = r2;

    btn1.classList.add("answer");
    btn2.classList.add("answer");

    noAnswer.classList.remove("hidden");

    buttonContainer.prepend(btn2);
    buttonContainer.prepend(btn1);
  } else {
    btn1 = document.createElement("button");
    btn2 = document.createElement("button");

    btn1.classList.add("answer");
    btn2.classList.add("answer");

    const ranNum = Math.round(Math.random());

    if (ranNum) {
      btn1.textContent = r1;
      btn2.textContent = a;
    } else {
      btn1.textContent = a;
      btn2.textContent = r2;
    }

    noAnswer.classList.add("hidden");

    buttonContainer.prepend(btn2);
    buttonContainer.prepend(btn1);
  }

  btn1.addEventListener("click", () => {
    nextBtn.classList.remove("hidden");
    btn1.classList.add("clicked");

    if (btn1.textContent === String(ans)) {
      btn1.classList.add("success");
      body.classList.add("success");
      btn2.classList.add("fail");
      noAnswer.classList.add("fail");
    } else {
      btn1.classList.add("fail");
      body.classList.add("fail");
      nextBtn.classList.add("hidden");
      restartBtn.classList.remove("hidden");

      if (btn2.textContent === String(ans)) {
        btn2.classList.add("success");
        noAnswer.classList.add("fail");
      } else {
        btn2.classList.add("fail");
        noAnswer.classList.add("success");
      }
    }
  });

  btn2.addEventListener("click", () => {
    nextBtn.classList.remove("hidden");
    btn2.classList.add("clicked");

    if (btn2.textContent === String(ans)) {
      btn2.classList.add("success");
      body.classList.add("success");
      btn1.classList.add("fail");
      noAnswer.classList.add("fail");
    } else {
      btn2.classList.add("fail");
      body.classList.add("fail");

      nextBtn.classList.add("hidden");
      restartBtn.classList.remove("hidden");

      if (btn1.textContent === String(ans)) {
        btn1.classList.add("success");
        noAnswer.classList.add("fail");
      } else {
        btn1.classList.add("fail");
        noAnswer.classList.add("success");
      }
    }
  });

  noAnswer.addEventListener("click", () => {
    nextBtn.classList.remove("hidden");
    noAnswer.classList.add("clicked");

    noAnswer.classList.add("success");
    body.classList.add("success");

    btn1.classList.add("fail");
    btn2.classList.add("fail");
  });
}
