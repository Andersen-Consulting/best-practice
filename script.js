// Hämta query-parametern ?id=X från URL
function getGoalId() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id") || 1;
}

if (window.location.pathname.includes("goal.html")) {
  const goalId = getGoalId();
  fetch(`goals/goal${goalId}.json`)
    .then(res => res.json())
    .then(data => {
      document.getElementById("goal-title").textContent = data.title;

      const strategiesDiv = document.getElementById("strategies");
      const leversContainer = document.getElementById("levers-container");

      data.strategies.forEach((strategy, index) => {
        const div = document.createElement("div");
        div.className = "strategy";
        div.textContent = strategy.label;
        div.title = strategy.description;
        div.addEventListener("click", () => {
          // töm container
          leversContainer.innerHTML = "";

          const grid = document.createElement("div");
          grid.className = "grid";

          strategy.levers.forEach(lever => {
            const cell = document.createElement("div");
            cell.className = "cell";
            cell.textContent = lever.label;
            cell.title = lever.description;
            grid.appendChild(cell);
          });

          leversContainer.appendChild(grid);
        });
        strategiesDiv.appendChild(div);
      });
    });
}
