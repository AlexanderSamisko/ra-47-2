import React from 'react';
import edit from "../img/edit.svg";
import del from "../img/delete.svg";

export default function ActionButton ({ action, item }) {

    const editItem = () => {
        item.setEditing(item.logItem);
    }

    const deleteItem = () => {
        item.setWalkHistory(
            item.walkHistory.filter(
                element => element.id !== item.logItem.id
            )
        )
    }

    return <button className="action-button"
                onClick={()=> action === "edit" ? editItem() : deleteItem()}><img src={action === "edit" ? edit : del} alt="" /></button>
}