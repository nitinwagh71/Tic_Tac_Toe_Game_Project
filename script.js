let accboxes = document.querySelectorAll(".box");            // Accessing all buttons.
let newGameBtn = document.querySelector("#new-btn");         // Accessing new game button.
let resetGameBtn = document.querySelector("#reset-btn");     // Accessing reset game button.
let msgContainer = document.querySelector(".msg-container"); // Accessing message container.
let winner = document.querySelector("#msg");                 // Accessing message for winner.

let count = 0;       // To track draw game
let turnO = true;   // PlayerX, PlayerO

winPatterns = [     // Winning patterns are 8.
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const resetGame = () => {    // Reset game fuction.
  turnO = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
};

accboxes.forEach((val) => {                // Here we are accessing each button for click.
  val.addEventListener("click", () => {    // Applying addEventListener on each button.
    if (turnO === true) {                  // Here if we write if(turnO) it's ok.Beacuse we have given trunO value true already.
      val.innerText = "O";                 // Inserting O value on button which will click.
      turnO = false;                      
    } else {
      val.innerText = "X";              // Inserting X value on button which will click.
      turnO = true;
    }
    val.disabled = true;                  // We are disabling button here,Beacuse it was creating loop whole.
    count++;                              // For draw conditon we are using count.

    let isnotWinner = checkWinner();      // Draw condition

    if (count === 9 && !isnotWinner) {   
      gameDraw();
    }
    checkWinner();                        // Here we have called checkWinner() function.
  });                                     // To check winning condition.
});

const gameDraw = () => {                  // gameDraw function,
  msg.innerText = "Game Draw";
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const disableBoxes = () => {             // disableBoxes function.
  for (let dbox of accboxes) {
    dbox.disabled = true;
  }
};

const enableBoxes = () => {              // enableBoxes function.
  for (let ebox of accboxes) {
    ebox.disabled = false;
    ebox.innerText = "";
  }
};

const showWinner = (win) => {                         // showWinner function.
  msg.innerText = `Congratulation Winner is ${win}`;
  msgContainer.classList.remove("hide");               
  disableBoxes();
};

const checkWinner = () => {                          // For every click button it will check winPatterns.
  for (let pattern of winPatterns) {
    let pos1Val = accboxes[pattern[0]].innerText;     // Checking winning pattern condition.
    let pos2Val = accboxes[pattern[1]].innerText;
    let pos3Val = accboxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {    // Condition for space.
      if (pos1Val === pos2Val && pos2Val === pos3Val) {       // Condition for same position value.
        showWinner(pos1Val);                                  // Called showWinner function with parameter.
        return true;            // It returing true value to checkWinner function if no winner.
      }
    }
  }
};

newGameBtn.addEventListener("click", resetGame);   // New game
resetGameBtn.addEventListener("click", resetGame); // Reset game.
