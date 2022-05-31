import React from "react";
import classes from "./Node.module.css";

function Node(props) {
    let nodestyle = null;

    if (props.startIdx[0] === props.row && props.startIdx[1] === props.col) {
        nodestyle = classes.start;
    } else if (props.endIdx[0] === props.row && props.endIdx[1] === props.col) {
        nodestyle = classes.end;
    }

    if (props.visited[props.row][props.col]) {
        nodestyle = classes.wall;
    }

    return (
        <div
            className={[classes.node, nodestyle].join(" ")}
            onClick={props.clickHandler}
            onMouseMove={props.mouseMoveHandler}
            onMouseDown={props.mouseDownHandler}
            onMouseUp={props.mouseUpHandler}
        ></div>
    );
}

export default Node;
