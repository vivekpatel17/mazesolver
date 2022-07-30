function DFS_Pathfinder(grid, visited, startIdx, endIdx) {
    let neighbours = [];
    let visited_ = visited;

    dfs_algo(grid, visited_, neighbours, startIdx, endIdx, [-1, -1]);
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

function dfs_algo(grid, visited_, neighbours, startIdx, endIdx, prevNode) {
    startIdx.push(...prevNode)
    neighbours.push(startIdx);
    visited_[startIdx[0]][startIdx[1]] = true;

    if (startIdx[0] === endIdx[0] && startIdx[1] === endIdx[1]) {
        return true;
    }

    const row = [1, 0, -1, 0];
    const col = [0, 1, 0, -1];

    for (let i = 0; i < 4; i++) {
        if (
            isSafe(
                startIdx[0] + row[i],
                grid.length,
                startIdx[1] + col[i],
                grid[0].length,
                visited_
            )
        ) {
            let newStartIdx = [startIdx[0] + row[i], startIdx[1] + col[i]];
            prevNode = [startIdx[0], startIdx[1]];
            if (dfs_algo(grid, visited_, neighbours, newStartIdx, endIdx, prevNode)) {
                return true;
            }
        }
    }
    return false;
}

export default DFS_Pathfinder;
