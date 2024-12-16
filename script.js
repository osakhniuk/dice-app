document.addEventListener("DOMContentLoaded", () => {
    const rollBtn = document.getElementById("roll-btn");
    const dice1Div = document.getElementById("dice1");
    const dice2Div = document.getElementById("dice2");
    const dice1Result = document.getElementById("dice1-result");
    const dice2Result = document.getElementById("dice2-result");
    const congratsOverlay = document.getElementById("congrats-overlay");
    const confettiContainer = document.getElementById("confetti-container");
  
    const dicePatterns = {
      1: [4],
      2: [0, 8],
      3: [0, 4, 8],
      4: [0, 2, 6, 8],
      5: [0, 2, 4, 6, 8],
      6: [0, 2, 3, 5, 6, 8],
    };
  
    function renderDice(diceDiv, value) {
      diceDiv.innerHTML = "";
      for (let i = 0; i < 9; i++) {
        const dot = document.createElement("div");
        dot.style.backgroundColor = dicePatterns[value].includes(i)
          ? "#f37053"
          : "transparent";
        diceDiv.appendChild(dot);
      }
    }
  
    function rollDiceAnimation(duration) {
      return new Promise((resolve) => {
        const startTime = Date.now();
  
        function animate() {
          const elapsedTime = Date.now() - startTime;
          const random1 = Math.floor(Math.random() * 6) + 1;
          const random2 = Math.floor(Math.random() * 6) + 1;
  
          renderDice(dice1Div, random1);
          renderDice(dice2Div, random2);
  
          if (elapsedTime < duration) {
            requestAnimationFrame(animate);
          } else {
            resolve([random1, random2]);
          }
        }
  
        animate();
      });
    }
  
    function showCongratulations() {
      congratsOverlay.classList.add("show");
      createConfetti();
      document.body.addEventListener("click", hideCongratulations, { once: true });
    }
  
    function hideCongratulations() {
      congratsOverlay.classList.remove("show");
      confettiContainer.innerHTML = "";
    }
  
    function createConfetti() {
      for (let i = 0; i < 100; i++) {
        const confetti = document.createElement("div");
        confetti.style.position = "absolute";
        confetti.style.width = "10px";
        confetti.style.height = "10px";
        confetti.style.backgroundColor = getRandomColor();
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.top = `${Math.random() * 100}vh`;
        confetti.style.opacity = Math.random();
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        confetti.style.animation = `fall ${Math.random() * 3 + 2}s linear infinite`;
  
        confettiContainer.appendChild(confetti);
      }
    }
  
    function getRandomColor() {
      const colors = ["#FF5733", "#33FF57", "#5733FF", "#FF33A8", "#FFC300"];
      return colors[Math.floor(Math.random() * colors.length)];
    }
  
    rollBtn.addEventListener("click", async () => {
      rollBtn.disabled = true;
      dice1Result.textContent = "";
      dice2Result.textContent = "";
  
      const [finalDice1, finalDice2] = await rollDiceAnimation(100);
  
      renderDice(dice1Div, finalDice1);
      renderDice(dice2Div, finalDice2);
  
      dice1Result.textContent = finalDice1;
      dice2Result.textContent = finalDice2;
  
      if (finalDice1 === 6 && finalDice2 === 6) {
        showCongratulations();
      }
  
      rollBtn.disabled = false;
    });
  });
  