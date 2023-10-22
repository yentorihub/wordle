const 정답 = "INDEX";

let attempts = 0;
let index = 0;
let timer;

function appStart() {
  const displayGameover = () => {
    const div = document.createElement("div");
    div.innerText = "게임이 종료되었습니다.";
    div.style =
      "display:flex; justify-content:center; align-items:center;position:absolute; top:50%; left:50%;transform: translate(-50%,-50%); background-color: #ffffff; border-radius : 10px; border : 1px solid var(--basic-color); width:300px; height:100px; font-size : 20px ";
    document.body.appendChild(div);
  };
  const gameover = () => {
    window.removeEventListener("keydown", handleKeydown);
    displayGameover();
    clearInterval(timer);
  };

  const nextLine = () => {
    if (attempts === 6) return gameover();
    attempts += 1;
    index = 0;
  };

  const handleEnterKey = () => {
    let 맞은_갯수 = 0;
    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-block[data-index='${attempts}${i}']`
      );
      const 입력한_글자 = block.innerText;
      const 정답_글자 = 정답[i];
      if (입력한_글자 === 정답_글자) {
        맞은_갯수 += 1;
        block.style.background = "var(--correct-color)";
      } else if (정답.includes(입력한_글자)) {
        block.style.background = "var(--miss-color)";
      } else block.style.background = "var(--stress-color)";
      block.style.color = "#FFFFFF";
    }

    if (맞은_갯수 === 5) gameover();
    else nextLine();
  };

  const handleBackspace = () => {
    if (index > 0) {
      const preBlock = document.querySelector(
        `.board-block[data-index='${attempts}${index - 1}']`
      );
      preBlock.innerText = "";
    }
    if (index !== 0) index -= 1;
  };

  const handleKeydown = (event) => {
    console.log("키가 입력되었습니다", event.key);

    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    );

    // **키 눌림 관련**
    // 함수 뒤 () 여기에 변수 이름을 넣으면 파라미터로 전달됨
    if (event.key === "Backspace") handleBackspace();
    else if (index === 5) {
      if (event.key === "Enter") {
        handleEnterKey();
      } else return;
    } else if (65 <= keyCode && keyCode <= 90) {
      thisBlock.innerText = key;
      //   index = index + 1; 아래와 같은 표시
      // index++;
      index += 1;
    }
  };

  const startTimer = () => {
    const start_time = new Date();

    const setTime = () => {
      const now_time = new Date();
      const passed_time = new Date(now_time - start_time);
      const min = passed_time.getMinutes().toString().padStart(2, "0");
      const sec = passed_time.getSeconds().toString().padStart(2, "0");
      const timerDiv = document.querySelector(".time");
      timerDiv.innerText = `Time: ${min}:${sec}`;
    };

    timer = setInterval(setTime, 1000);
  };

  startTimer();
  window.addEventListener("keydown", handleKeydown);
}

appStart();
