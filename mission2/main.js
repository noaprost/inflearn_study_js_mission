// 상태 관리 변수
let player_win_count = 0; // 플레이어 승리 횟수
let computer_win_count = 0; // 컴퓨터 승리 횟수
let play_count = 10; // 게임의 남은 횟수
let cur_player = -1; // 현재 플레이어의 선택
let cur_computer = -1; // 현재 컴퓨터의 선택

const playView = document.querySelector(".play");
const endView = document.querySelector(".end");
const playerScore = document.querySelector(".player_score");
const computerScore = document.querySelector(".computer_score");
const playResult = document.querySelector(".play_result");
const endResult = document.querySelector(".end_result");

// 버튼 이벤트 추가
const buttons = document.querySelectorAll(".btn_container button");
buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    cur_player = Number(btn.id);
    // 컴퓨터 랜덤 변수 생성
    cur_computer = Math.round(Math.random() * 2); // 0~2

    // 게임 진행
    playGame(cur_player, cur_computer);

    // 남은 횟수 계산 및 최종 결과 업데이트
    play_count--;
    const playCount = document.querySelector(".play_count");
    playCount.textContent = play_count;
    if (play_count === 0) {
      playView.classList.add("hidden");
      endView.classList.remove("hidden");

      if (player_win_count > computer_win_count) {
        endResult.innerText = "게임에서 이겼습니다😃";
        endResult.classList.add("win");
      } else if (player_win_count < computer_win_count) {
        endResult.innerText = "게임에서 졌습니다😢";
        endResult.classList.add("lose");
      } else {
        endResult.innerText = "무승부입니다😅";
        endResult.classList.add("same");
      }
    }
  });
});

const replayButton = document.querySelector(".replay");
replayButton.addEventListener("click", () => {
  player_win_count = 0;
  computer_win_count = 0;
  play_count = 10;
  cur_player = -1;
  cur_computer = -1;

  playView.classList.remove("hidden");
  endView.classList.add("hidden");

  playerScore.innerText = 0;
  computerScore.innerText = 0;
  playResult.innerText = "";
  endResult.classList.remove("win");
  endResult.classList.remove("lose");
  endResult.classList.remove("same");
});

function playGame(p, c) {
  const tmpPlayer = player_win_count;
  const tmpComputer = computer_win_count;

  if (c === 0) {
    if (p === 1) {
      player_win_count++;
    } else if (p === 2) {
      computer_win_count++;
    }
  } else if (c === 1) {
    if (p === 0) {
      computer_win_count++;
    } else if (p === 2) {
      player_win_count++;
    }
  } else if (c === 2) {
    if (p === 0) {
      player_win_count++;
    } else if (p === 1) {
      computer_win_count++;
    }
  }

  // 결과 업데이트
  playerScore.textContent = player_win_count;
  computerScore.textContent = computer_win_count;

  if (tmpPlayer === player_win_count && tmpComputer === computer_win_count) {
    playResult.innerText = "무승부";
  } else if (tmpPlayer !== player_win_count) {
    playResult.innerText = "플레이어 승리";
  } else if (tmpComputer !== computer_win_count) {
    playResult.innerText = "컴퓨터 승리";
  }
}
