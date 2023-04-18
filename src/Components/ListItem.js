import React from "react";
import ActionButton from "./ActionButton";


export default function ListItem (props) {
    

    return (
        <li>
                    <span>{props.logItem.date}</span>
                    <span>{props.logItem.distance}</span>
                    <div  className="action">
                        <ActionButton action={"edit"} item={props} />
                        <ActionButton action={"del"} item={props} />
                    </div>
                </li>
    )
}