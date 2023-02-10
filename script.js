"use strict";

(() => {
  const team1 = document.querySelector("#berry .img");
  const team2 = document.querySelector("#choco .img");
  let team1score = 0;
  let team2score = 0;
  let savedscore = [0, 0];
  let waiting = false;

  const setAttr = (team, score) => {
    team.querySelector("img").setAttribute("src", `img/frames/${score}.PNG`);
  };

  const team1plus = () => {
    if (waiting) return;
    if (team1score < 10) {
      waiting = true;
      animate("P1", ++team1score);
      setTimeout(() => {
        setAttr(team1, team1score);
        animate("P1", team1score, false);
        savedscore[0] = team1score;
        waiting = false;
      }, 600);
    }
  };

  const team2plus = () => {
    if (waiting) return;
    if (team2score < 10) {
      waiting = true;
      animate("P2", ++team2score);
      setTimeout(() => {
        setAttr(team2, team2score);
        animate("P2", team2score, false);
        savedscore[1] = team2score;
        waiting = false;
      }, 600);
    }
  };

  const animate = (team, score, show = true) => {
    try {
      if (show) document.querySelector(`#${team}${score}`).className = "show";
      else {
        document.querySelector(`#${team}${score}`).className = "";
        if (score === 9)
          document.querySelector(`#${team}${score}`).setAttribute("style", "width:100% !important");
      }
    } catch (e) {}
  };

  team1.addEventListener("click", team1plus, false);
  team2.addEventListener("click", team2plus, false);

  document.addEventListener(
    "keydown",
    ({ code }) => {
      switch (code) {
        case "ArrowLeft":
          if (team1score === 0) return;
          setAttr(team1, --team1score);
          break;
        case "ArrowRight":
          if (team2score === 0) return;
          setAttr(team2, --team2score);
          break;
        case "ArrowUp":
          [team1score, team2score] = savedscore;
          setAttr(team1, team1score);
          setAttr(team2, team2score);
          break;
        case "ArrowDown":
          team1score = team2score = 0;
          setAttr(team1, 0);
          setAttr(team2, 0);
          document.querySelectorAll(`.parts img`).forEach((x) => (x.className = ""));
          break;
      }
    },
    false
  );
  // team1plus(null, true);
  // team2plus(null, true);
})();
