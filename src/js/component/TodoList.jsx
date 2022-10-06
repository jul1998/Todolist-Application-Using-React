import React, { useEffect, useState } from "react";

export default function TodoList() {
  const [inputList, setInputList] = React.useState([]);

  const BASE_URL = "https://assets.breatheco.de/apis/fake/todos/";

  function handleInputChange(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      let arrayAux = inputList.slice();
      arrayAux.push(event.target.value);
      setInputList(arrayAux);
    }
  }

  function handleDeleteTodo(todoIndex) {
    setInputList((preState) =>
      preState.filter((item, index) => index != todoIndex)
    );
  }

  const getTodoListFromApi = async ()=>{
    let URI = `${BASE_URL}user/LATAM2020`;
    let response = await fetch (URI)
    let jsonResponse = await response.json()
    console.log(jsonResponse)
    setInputList(jsonResponse)
  }

  useEffect(()=>{
    console.log("Here")
    getTodoListFromApi
  },[])

  return (
    <>
      <div className="todo_container">
        <h1 className="user_header">User</h1>
        <input placeholder="Create an user" type="text" />

        <div className="Button">
          <button type="button">Create user</button>
          <button onClick={getTodoListFromApi} type="button">Get Todo List</button>
          <button type="button">Add todo</button>
        </div>

        <h1 className="todo_header">Todos</h1>

        <div className="todo_input">
          <input
            onKeyUp={handleInputChange}
            placeholder="Add Todo"
            type="text"
            className="input_value"
          />

          <ul>
            {inputList.map((todo, index) => {
              return (
                <li className="todo-list" key={index}>
                  {todo.label}
                  This is a change
                  <i
                    className="fa-sharp fa-solid fa-x"
                    onClick={(e) => {
                      handleDeleteTodo(index);
                    }}
                  ></i>
                </li>
              );
            })}
          </ul>
          <span className="todos-lenght"> {inputList.length} items left</span>
        </div>
      </div>
    </>
  );
}
