function BFS_Pathfinder(grid, visited, startIdx, endIdx) {
    let neighbours = [];
    let visited_ = visited;

    bfs_algo(grid, visited_, neighbours, startIdx, endIdx);
    return neighbours;
}

function isSafe(row, row_len, col, col_len, visited_) {
    if (
        row >= 0 &&
        row < row_len &&
        col >= 0 &&
        col < col_len &&
        !visited_[row][col]
    ) {
        return true;
    }
    return false;
}

function bfs_algo(grid, visited_, neighbours, startIdx, endIdx) {
    let queue = [];
    queue.push(startIdx);
    const row = [1, -1, 0, 0];
    const col = [0, 0, 1, -1];

    while(queue.length > 0){
        let currentNode = queue.shift();
        visited_[currentNode[0]][currentNode[1]] = true;
        neighbours.push(currentNode);

        for(let i = 0; i< 4; i++){
            if(isSafe(currentNode[0]+row[i], grid.length, currentNode[1]+col[i], grid[0].length, visited_)){
                if(currentNode[0]+row[i] === endIdx[0] && currentNode[1]+col[i] === endIdx[1]){
                    neighbours.push(currentNode);
                    neighbours.push(endIdx);
                    return;
                }
                let newNode = grid[currentNode[0]+row[i]][currentNode[1]+col[i]];
                queue.push(newNode);
                visited_[currentNode[0]+row[i]][currentNode[1]+col[i]] = true;
            }
        }

    }
}

export default BFS_Pathfinder;
