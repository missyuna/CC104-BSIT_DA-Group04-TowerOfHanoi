document.addEventListener("DOMContentLoaded", () => {
    const game = new HanoiGame();

    const towerEls = {
        A: document.getElementById("tower-A"),
        B: document.getElementById("tower-B"),
        C: document.getElementById("tower-C"),
    };

    const stackEls = {
        A: document.getElementById("stack-A"),
        B: document.getElementById("stack-B"),
        C: document.getElementById("stack-C"),
    };

    const moveCounterEl = document.getElementById("move-counter");
    const gameMessageEl = document.getElementById("game-message");
    const resetButtonEl = document.getElementById("reset-button");
    const victoryMessageEl = document.getElementById("victory-message");
    const finalMovesEl = document.getElementById("final-moves");

    let selectedTower = null;

    function setMessage(text, status = "info") {
        if (!gameMessageEl) return;
        gameMessageEl.textContent = text;
        gameMessageEl.dataset.status = status;
    }

    function updateSelectedHighlight() {
        Object.entries(towerEls).forEach(([key, el]) => {
            if (!el) return;
            el.classList.toggle("selected", selectedTower === key);
        });
    }

    function renderStacks() {
        ["A", "B", "C"].forEach((towerKey) => {
            const stackEl = stackEls[towerKey];
            if (!stackEl) return;

            stackEl.innerHTML = "";
            const disks = game.towers[towerKey] || [];

            disks.forEach((diskSize) => {
                const diskEl = document.createElement("div");
                diskEl.className = `disk disk-${diskSize}`;
                diskEl.dataset.size = diskSize;
                diskEl.textContent = diskSize;
                stackEl.appendChild(diskEl);
            });
        });
    }

    function updateCounter() {
        if (moveCounterEl) {
            moveCounterEl.textContent = game.moves;
        }
    }

    function showVictory() {
        if (finalMovesEl) {
            finalMovesEl.textContent = game.moves;
        }
        if (victoryMessageEl) {
            victoryMessageEl.classList.remove("hidden");
        }
    }

    function hideVictory() {
        if (victoryMessageEl) {
            victoryMessageEl.classList.add("hidden");
        }
    }

    function renderAll() {
        renderStacks();
        updateCounter();
        updateSelectedHighlight();
    }

    function handleTowerClick(towerKey) {
        if (game.isComplete()) {
            setMessage("You already won! Click Reset Game to play again.", "win");
            return;
        }

        if (selectedTower === null) {
            if (game.peek(towerKey) === undefined) {
                setMessage(`Tower ${towerKey} is empty. Select a tower with a disk.`, "error");
                return;
            }
            selectedTower = towerKey;
            updateSelectedHighlight();
            setMessage(`Tower ${towerKey} selected. Click a destination tower.`, "info");
            return;
        }

        if (selectedTower === towerKey) {
            selectedTower = null;
            updateSelectedHighlight();
            setMessage("Selection cleared. Click a source tower to begin.", "info");
            return;
        }

        const source = selectedTower;
        const moved = game.move(source, towerKey);

        selectedTower = null;
        updateSelectedHighlight();

        if (!moved) {
            setMessage(
                `Invalid move: cannot place a larger disk onto a smaller disk.`,
                "error"
            );
            return;
        }

        renderStacks();
        updateCounter();

        if (game.isComplete()) {
            showVictory();
            setMessage(
                `Completed in ${game.moves} moves! (Optimal: ${Math.pow(2, 3) - 1})`,
                "win"
            );
        } else {
            setMessage(`Moved disk from Tower ${source} to Tower ${towerKey}.`, "info");
        }
    }

    function resetGame() {
        game.reset();
        selectedTower = null;
        hideVictory();
        renderAll();
        setMessage("Select a source tower to begin.", "info");
    }

    ["A", "B", "C"].forEach((towerKey) => {
        const towerEl = towerEls[towerKey];
        if (towerEl) {
            towerEl.addEventListener("click", () => handleTowerClick(towerKey));
        }
    });

    if (resetButtonEl) {
        resetButtonEl.addEventListener("click", resetGame);
    }

    resetGame();
});
