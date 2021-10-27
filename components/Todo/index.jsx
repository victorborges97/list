import React, { useRef, useState } from 'react';

import { IconButton, TextField } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';

import TodoItem from '../TodoItem';
import { useTodo } from '../../hooks/TodoHooks';

const Todo = ({ todoList, idTab }) => {

  const [edit, setEdit] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const { addTodo, updateTodo } = useTodo("teste");

  const inputTodoRef = useRef();

  const onKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      event.stopPropagation();
      onAddTodo(event);
    }
  }

  const onAddTodo = (event) => {
    event.preventDefault();

    if (inputTodoRef.current.value === "" && inputTodoRef.current.value === " " && idTab) {
      return
    }
    const todoText = inputTodoRef.current.value;
    if (edit && editItem != null) {
      if (todoText === editItem.todo) {
        inputTodoRef.current.value = ""
        setEditItem(null);
        setEdit(false);
        return;
      }
      updateTodo(todoText, editItem.key);
    } else {
      addTodo(inputTodoRef.current.value, idTab)
    }
    inputTodoRef.current.value = ""
    setEditItem(null);
    setEdit(false);
  }

  const editItemFC = (item) => {
    setEditItem(item);
    inputTodoRef.current.value = item.todo;
    setEdit(true);
  }

  return (
    <div className="AddTodo">
      <h2>{todoList ? todoList.length : "Sem"} Todo</h2>

      <div className="AddTodo-input">
        <TextField
          inputRef={inputTodoRef}
          onKeyDown={onKeyDown}
          id="outlined-textarea"
          placeholder="Seu todo aqui ...."
          multiline
          variant="outlined"
          style={{
            minWidth: "70%",
            color: "#FFF",
          }}
        />
        <IconButton
          onClick={onAddTodo}
          style={{ backgroundColor: "#0080ff", color: "#FFF" }}
          aria-label="add"
          fontSize="small"
        >
          {
            editItem != null ? (
              <SaveIcon fontSize="small" style={{ color: "#FFF" }} />
            ) : (
              <AddIcon fontSize="small" style={{ color: "#FFF" }} />
            )
          }
        </IconButton>
      </div>

      <ul>
        {
          todoList.map((item) => (
            <TodoItem
              key={item.key}
              data={item}
              itemSelected={editItem}
              editItem={() => {
                editItemFC(item)
              }}
              saveEditItem={editItem != null ? onAddTodo : null}
            />
          ))
        }
      </ul>


    </div >
  )
}

export default Todo;
