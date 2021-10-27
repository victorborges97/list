import React from 'react';

import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';

import { useTodo } from '../hooks/TodoHooks';

const TodoItem = ({ data, editItem, itemSelected, saveEditItem }) => {
    const { deleteTodo } = useTodo();

    return (
        <li>
            <div className="todo-text">
                {data.todo}
            </div>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexWrap: "wrap",
                    // width: "100%",
                    // maxWidth: "65px",
                    minWidth: "35px"
                }}>
                <IconButton
                    onClick={e => {
                        itemSelected && itemSelected.key === data.key ?
                            saveEditItem(e) :
                            editItem(data)
                    }}
                    style={{ backgroundColor: "#d22b2b", color: "#FFF", width: 30, height: 30, margin: 5 }}
                    aria-label="add"
                    fontSize="small"
                >
                    {
                        itemSelected && itemSelected.key === data.key ? (
                            <SaveIcon
                                fontSize="small"
                                color="#FFF"
                            />
                        ) : (
                            <EditIcon fontSize="small" color="#FFF" />
                        )
                    }
                </IconButton>

                <IconButton
                    onClick={_ => deleteTodo(data.key)}
                    style={{ backgroundColor: "#d22b2b", color: "#FFF", width: 30, height: 30, margin: 5 }}
                    aria-label="add"
                    fontSize="small"
                >
                    <DeleteIcon fontSize="small" color="#FFF" />
                </IconButton>
            </div>
        </li>
    )
}

export default TodoItem;