import React, { useEffect, useState } from "react";
import Node from "./Node/Node";

import classes from "./Visualzier.module.css";

function Visualizer() {
    const [grid, setGrid] = useState([]);
    const [visited, setVisited] = useState([]);
    const [walls, setWalls] = useState([]);

    const [wall, setWall] = useState(false);
    const [start, setStart] = useState(false);
    const [end, setEnd] = useState(false);

    const [startIdx, setStartIdx] = useState([]);
    const [endIdx, setEndIdx] = useState([]);

    const [prevWall, setPrevWall] = useState([-1, -1]);
    const [reload, setReload] = useState(false);

    let row, col;

    useEffect(() => {
        let height = window.innerHeight;
        let width = window.innerWidth;

        row = parseInt(width / 27);
        col = parseInt((0.8 * height) / 29);

        let temp = Array(row)
            .fill(0)
            .map((row) => new Array(col).fill(false));
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
    }
    function endHandler() {
        setStart(false);
        setEnd(true);
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
                // if (!temp[row][col]) {
                //     temp[row][col] = true;
                // } else {
                //     temp[row][col] = false;
                // }
                temp[row][col] = true;
                return temp;
            });
        }
        // if (wall) {
        // setPrevWall([row, col]);
        // if(!walls[row][col]){
        //     setWalls((temp) => {
        //         temp[row][col] = true;
        //         return temp;
        //     })
        //     setVisited((temp) => {
        //         temp[row][col] = true;
        //     });
        // } else{
        //     setWalls((temp) => {
        //         temp[row][col] = false;
        //         return temp;
        //     })
        //     setVisited((temp) => {
        //         temp[row][col] = false;
        //     });
        // }
        // }
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
            <div>
                <button onClick={startHandler}>Start</button>
                <button onClick={endHandler}>End</button>
                <button onClick={clearHandler}>Clear Grid</button>
            </div>
            <div className={classes.grid}>{Grid}</div>
        </>
    );
}

export default Visualizer;
