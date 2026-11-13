
const HanoiGame = require("./hanoi.js");

const game = new HanoiGame();

console.log("Initial Towers:", game.towers);
console.log("Top Disk:", game.peek("A"));

console.log("Move A to B:", game.move("A", "B"));
console.log("Towers:", game.towers);
console.log("Moves:", game.moves);

console.log("Invalid Move A to B:", game.move("A", "B"));
console.log("Same Tower Move:", game.move("A", "A"));
console.log("Moves After Invalid Attempts:", game.moves);

console.log("Game Complete:", game.isComplete());

game.reset();

console.log("After Reset:", game.towers);
console.log("Moves After Reset:", game.moves);


game.move("A", "C");
game.move("A", "B");
game.move("C", "B");
game.move("A", "C");
game.move("B", "A");
game.move("B", "C");
game.move("A", "C");

console.log("Final Towers:", game.towers);
console.log("Total Moves:", game.moves);
console.log("Game Complete:", game.isComplete());
