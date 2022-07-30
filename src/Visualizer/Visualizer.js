import React, { useEffect, useState } from "react";
import BFS_Pathfinder from "../Algorithms/BFS_algo";
import DFS_Pathfinder from "../Algorithms/DFS_algo";
import {
    randomMaze,
    simpleMaze,
    stairCaseMaze,
} from "../Maze Functions/MazeMaker";
import Node from "./Node/Node";

import classes from "./Visualzier.module.css";
import logo from "../images/logo.png";

function Visualizer() {
    const [grid, setGrid] = useState([]);
    const [visited, setVisited] = useState([]);
    const [walls, setWalls] = useState([]);

    const [startIdx, setStartIdx] = useState([]);
    const [endIdx, setEndIdx] = useState([]);

    const [wall, setWall] = useState(false);
    const [start, setStart] = useState(false);
    const [end, setEnd] = useState(false);

    const [prevWall, setPrevWall] = useState([-1, -1]);
    const [reload, setReload] = useState(false);

    const [algo, setAlgo] = useState("Select");

    let row, col;

    useEffect(() => {
        let height = window.innerHeight;
        let width = window.innerWidth;

        // eslint-disable-next-line react-hooks/exhaustive-deps
        row = parseInt(width / 27);
        // eslint-disable-next-line react-hooks/exhaustive-deps
        col = parseInt((0.8 * height) / 29);

        let temp = Array(row)
            .fill(0)
            .map(() => new Array(col).fill(false));
        setVisited(temp);
        setWalls(temp);

        let arr = Array(row)
            .fill(0)
            .map(() => new Array(col).fill(0));

        for (let i = 0; i < row; i++) {
            for (let j = 0; j < col; j++) arr[i][j] = [i, j];
        }
        setGrid(arr);
    }, [reload]);

    function onWindowResize() {
        setReload((res) => !res);
    }

    window.onresize = onWindowResize;

    function startHandler() {
        setStart(true);
        setEnd(false);
        setWall(false);
    }
    function endHandler() {
        setStart(false);
        setEnd(true);
        setWall(false);
    }
    function clearHandler() {
        window.location.reload();
    }

    function nodeClickHandler(row, col) {
        if (start) {
            setStartIdx([row, col]);
        }
        if (end) {
            setEndIdx([row, col]);
        }
    }

    function mouseDownHandler() {
        setWall(true);
    }

    function mouseUpHandler() {
        setWall(false);
    }

    function mouseMoveHandler(row, col) {
        if (wall && (row !== prevWall[0] || col !== prevWall[1])) {
            setPrevWall([row, col]);
            setVisited((temp) => {
                temp[row][col] = true;
                return temp;
            });
        }
    }

    function pathMaker(nodesForPath) {
        const len = nodesForPath.length;
        let path = [];
        path.push(nodesForPath[len - 1][0], nodesForPath[len - 1][1]);

        let prevNodeRowIdx = nodesForPath[len - 1][2];
        let prevNodecolIdx = nodesForPath[len - 1][3];
        path.push([prevNodeRowIdx, prevNodecolIdx]);

        for (let i = len - 1; i >= 0; i--) {
            if (
                nodesForPath[i][0] === prevNodeRowIdx &&
                nodesForPath[i][1] === prevNodecolIdx
            ) {
                prevNodeRowIdx = nodesForPath[i][2];
                prevNodecolIdx = nodesForPath[i][3];
                path.push([prevNodeRowIdx, prevNodecolIdx]);
            }
        }
        path.reverse();

        let nodesTobeAnimated = document.getElementsByClassName("Grid__nodes");

        for (let i = 0; i < path.length; i++) {
            if (path[i][0] === undefined) continue;
            setTimeout(() => {
                nodesTobeAnimated[path[i][0]].children[
                    path[i][1]
                ].style.backgroundColor = "yellow";
            }, 50 * i);
        }
    }

    function algorithmHandler(event) {
        let algoritmSelected = event.target.value;
        setAlgo(algoritmSelected);
    }

    function visualizeHandler() {
        let neighbourNodes;
        let algoritmSelected = algo;

        if (algoritmSelected === "DFS") {
            neighbourNodes = DFS_Pathfinder(grid, visited, startIdx, endIdx);
        } else if (algoritmSelected === "BFS") {
            neighbourNodes = BFS_Pathfinder(grid, visited, startIdx, endIdx);
        } else if (algoritmSelected === "Select") {
            alert("Select Algoritm");
        }

        let nodesTobeAnimated = document.getElementsByClassName("Grid__nodes");
        for (let i = 0; i < neighbourNodes.length; i++) {
            setTimeout(() => {
                nodesTobeAnimated[neighbourNodes[i - 1][0]].children[
                    neighbourNodes[i - 1][1]
                ].className = classes.animatedNodes;
            }, 20 * i);
        }
        if (
            neighbourNodes[neighbourNodes.length - 1][0] === endIdx[0] &&
            neighbourNodes[neighbourNodes.length - 1][1] === endIdx[1]
        ) {
            setTimeout(() => {
                pathMaker(neighbourNodes);
            }, 21 * neighbourNodes.length);
        } else {
            setTimeout(() => {
                alert("No Path Found");
            }, 26 * neighbourNodes.length);
        }
    }

    function mazeHandler(event) {
        let neighbourNodes;
        let mazeSelected = event.target.value;

        if (mazeSelected === "Random Maze") {
            neighbourNodes = randomMaze(visited);
        } else if (mazeSelected === "Simple Maze") {
            neighbourNodes = simpleMaze(visited);
        } else if (mazeSelected === "StairCase Maze") {
            neighbourNodes = stairCaseMaze(visited);
        }
        setVisited(neighbourNodes);
    }

    const Grid =
        grid.length !== 0
            ? grid.map((arr) => {
                  return (
                      <div className="Grid__nodes">
                          {arr.map((node) => {
                              return (
                                  <Node
                                      key={
                                          node[0].toString() +
                                          ", " +
                                          node[1].toString()
                                      }
                                      row={node[0]}
                                      col={node[1]}
                                      start={start}
                                      end={end}
                                      clickHandler={() =>
                                          nodeClickHandler(node[0], node[1])
                                      }
                                      startIdx={startIdx}
                                      endIdx={endIdx}
                                      visited={visited}
                                      walls={walls}
                                      mouseMoveHandler={() =>
                                          mouseMoveHandler(node[0], node[1])
                                      }
                                      mouseDownHandler={mouseDownHandler}
                                      mouseUpHandler={mouseUpHandler}
                                  />
                              );
                          })}
                      </div>
                  );
              })
            : null;

    return (
        <>
            <div className={classes.navbar}>
                <div className={classes.logo}>
                    <img src={logo} alt="Logo" />
                    <div>
                        <p>Maze</p>
                        <p>Solver</p>
                    </div>
                </div>
                <div className={classes.handlers}>
                    <button onClick={startHandler} className={classes.button}>
                        Start Point
                    </button>
                    <button onClick={endHandler} className={classes.button}>
                        End Point
                    </button>
                    <select
                        onChange={algorithmHandler}
                        className={classes.selectors}
                    >
                        <option value="Select" hidden>
                            Select Algorithm
                        </option>
                        <option
                            value="DFS"
                            className={classes.selectors__option}
                        >
                            DFS
                        </option>
                        <option
                            value="BFS"
                            className={classes.selectors__option}
                        >
                            BFS
                        </option>
                    </select>
                    <button
                        onClick={visualizeHandler}
                        className={classes.button}
                    >
                        Visualize
                    </button>
                    <select
                        onChange={mazeHandler}
                        className={classes.selectors}
                        defaultValue='Select Maze'
                    >
                        <option value="Select" hidden>
                            Select Maze
                        </option>
                        <option
                            value="Random Maze"
                            className={classes.selectors__option}
                        >
                            Random Maze
                        </option>
                        <option
                            value="Simple Maze"
                            className={classes.selectors__option}
                        >
                            Simple Maze
                        </option>
                        <option
                            value="StairCase Maze"
                            className={classes.selectors__option}
                        >
                            StairCase Maze
                        </option>
                    </select>
                    <button onClick={clearHandler} className={classes.button}>
                        Clear Grid
                    </button>
                </div>
            </div>
            <div className={classes.grid}>{Grid}</div>
        </>
    );
}

export default Visualizer;
