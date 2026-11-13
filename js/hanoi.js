class HanoiGame {
    constructor() {
        this.towers = {
            A: [3, 2, 1],
            B: [],
            C: []
        };
        this.moves = 0;
    }
    push(tower, disk) {
    this.towers[tower].push(disk);   
    }

    pop(tower) {
    return this.towers[tower].pop();
    }

    peek(tower) {
    let stack = this.towers[tower];
    return stack[stack.length - 1];
    }

    move(from, to) {
        if (!this.towers[from] || !this.towers[to]) {
            return false;
        }
        
        if (from === to) {
            return false;
        }
        
        let sourceDisk = this.peek(from);
        let targetDisk = this.peek(to);

        if (sourceDisk === undefined) {
        return false;
        }

        if (targetDisk !== undefined && sourceDisk > targetDisk) {
    return false;
        }

        let disk = this.pop(from);
        this.push(to, disk);

        this.moves++;

        return true;

    }
    isComplete() {
    return this.towers.C.length === 3;
    }

    reset() {
        this.towers = {
            A: [3, 2, 1],
            B: [],
            C: []
        };
        this.moves = 0;
    }
}

if (typeof module !== "undefined") {
    module.exports = HanoiGame;
}
