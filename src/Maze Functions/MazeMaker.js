//  Making Boundary Lines

function boundaryMaker(visited_) {
    const row = visited_.length;
    const col = visited_[0].length;

    for (let i = 0; i < row; i++) {
        visited_[i][0] = visited_[i][col - 1] = true;
    }
    for (let i = 0; i < col; i++) {
        visited_[0][i] = visited_[row - 1][i] = true;
    }
}

//  Simple Maze
export function simpleMaze(visited) {
    const row = visited.length;
    const col = visited[0].length;

    const visited_ = Array(row)
        .fill(0)
        .map(() => new Array(col).fill(false));

    boundaryMaker(visited_);

    for (let i = 0; i < row; i += 3) {
        let colArr = new Set();

        for (let j = 0; j < 2 * col; j++) {
            colArr.add(Math.floor(Math.random() * col));
        }

        for (let j = 0; j < col; j++) {
            if (colArr.has(j)) {
                visited_[i][j] = true;
            }
        }
    }

    return visited_;
}

//  Random Maze
export function randomMaze(visited) {
    const row = visited.length;
    const col = visited[0].length;

    const visited_ = Array(row)
        .fill(0)
        .map(() => new Array(col).fill(false));

    boundaryMaker(visited_)

    for (let i = 0; i < row; i++) {
        let colArr = new Set();

        for (let j = 0; j < col / 3; j++) {
            colArr.add(Math.floor(Math.random() * col));
        }

        for (let j = 0; j < col; j++) {
            if (colArr.has(j)) {
                visited_[i][j] = true;
            }
        }
    }

    return visited_;
}

//  StairCase Maze
export function stairCaseMaze(visited) {
    const row = visited.length;
    const col = visited[0].length;

    const visited_ = Array(row)
        .fill(0)
        .map(() => new Array(col).fill(false));

    boundaryMaker(visited_);
    let k = 2; 
	let l;
	for(let i=2; i<row-2; i++){
		l = k-4 >= 1 ? k-4 : k;
		k = l;
		for(let j=2; j<col-2; j+=4){
			if(l === 1)
				visited_[i][2] = '*';
			else{
                if(l < col-2)
				visited_[i][l] = '*';
                if(l+ 1 < col-2)
				visited_[i][l+1] = '*';
			}
			l += 4;
		}
		k += 1;
	}

    return visited_;
}
