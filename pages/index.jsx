import React, { useEffect, useRef, useState } from 'react';
import { useTodo } from '../hooks/TodoHooks';
import { useTabs } from '../hooks/TabsHook';
import Todo from '../components/Todo';
import { Box, Button, Divider, Grid, List, ListItem, ListItemText, Modal, TextField, Typography } from '@material-ui/core';

import "../styles/Index.module.css"

const Home = () => {

  const { addtabs, tabsList, updateTab, gettabs } = useTabs();
  const [idTab, setIdTab] = useState(tabsList && tabsList.length > 0 && tabsList[0].key);
  const inputTabRef = useRef();
  const { todoList, todosTabId } = useTodo(idTab);

  const [todos, setTodos] = useState([]);

  const [open, setOpen] = React.useState(false);
  const [editarTab, setEditarTab] = useState(false);
  const [editarSelecionada, setEditarSelecionada] = useState(null);
  const [nameSelecionada, setNameSelecionada] = useState("");
  const [KeySelecionada, setKeySelecionada] = useState("");

  const handleOpenModal = () => setOpen(true);

  const handleCloseModal = () => {
    setEditarSelecionada(null)
    setNameSelecionada("")
    setKeySelecionada("")
    setEditarTab(false);
    setOpen(false)
  };

  useEffect(() => {
    let todosId = [];
    if (idTab !== "") {
      todosId = todosTabId(idTab);
    } else {
      todosId = [];
    }
    setTodos(todosId);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idTab, todoList])

  const onKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      event.stopPropagation();
      addTab(event);
    }
  }

  const addTab = (event) => {
    event.preventDefault();
    if (inputTabRef.current.value === "" && inputTabRef.current.value === " ") {
      return
    }

    const todoText = nameSelecionada;

    if (editarTab && editarSelecionada != null) {
      updateTab(todoText, editarSelecionada.key, KeySelecionada);
    } else {
      addtabs(todoText)
    }

    inputTabRef.current.value = ""
    handleCloseModal();
    setEditarSelecionada(null)
    setNameSelecionada("")
    setKeySelecionada("")
    setEditarTab(false);
  }
  //Next
  const mudarTab = (item) => {
    setIdTab(item.key)
  }

  const editarTabModal = () => {
    setEditarTab(true);
    const tab = gettabs(idTab)
    handleOpenModal();
    setEditarSelecionada(tab[0])
    setNameSelecionada(tab[0].name)
    setKeySelecionada(tab[0].key)
  }

  return (
    <Box sx={{ flexGrow: 1 }} flex="1">
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Box display="flex" bgcolor="#282c34" borderRadius="20px" flexDirection="column">
            <Box padding="5px" display="flex">
              <Button
                style={{ color: "#fff" }}
                onClick={editarTabModal}
              >
                Editar Tab
              </Button>
              <Button
                style={{ color: "#fff" }}
                onClick={handleOpenModal}
              >
                Nova Tab
              </Button>
            </Box>
            <Divider />
            <List>
              {tabsList && tabsList.map((item, index) => (
                <div key={item.key}>
                  <ListItem onClick={() => mudarTab(item)} button >
                    <ListItemText primary={item.name} />
                  </ListItem>
                  <Divider />
                </div>
              ))}
            </List>
          </Box>
        </Grid>
        <Grid item xs={10}>
          {
            todos && <Todo todoList={todos} idTab={idTab} />
          }
        </Grid>
      </Grid>
      <Modal
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {editarTab ? "Editar Tab" : "Nova Tab"}
          </Typography>
          <Box>
            <TextField
              value={nameSelecionada}
              onChange={(e) => setNameSelecionada(e.target.value)}
              inputRef={inputTabRef}
              onKeyDown={onKeyDown}
              id="outlined-textarea input-modal"
              placeholder="Qual nome da nova tab ...."
              variant="outlined"
              style={{
                minWidth: "70%",
                color: "#000 !important",
              }}
            />
            {
              false && (
                <TextField
                  value={KeySelecionada}
                  onChange={(e) => setKeySelecionada(e.target.value)}
                  onKeyDown={onKeyDown}
                  id="outlined-textarea"
                  placeholder="Qual nome da nova tab ...."
                  variant="outlined"
                  style={{
                    minWidth: "70%",
                    color: "#000",
                  }}
                />
              )
            }
          </Box>
          <Button onClick={addTab}>
            Salvar
          </Button>
        </Box>
      </Modal>
    </Box>
  )
}

export default Home;

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  color: "black",
  boxShadow: 24,
  p: 4,
};