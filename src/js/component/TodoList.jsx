import React, { useEffect, useState } from "react";

export default function TodoList() {
  const [inputList, setInputList] = React.useState([]);
  const [user, setUser] = React.useState("")

  const BASE_URL = "https://assets.breatheco.de/apis/fake/todos/";

  function handleInputChange(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      let arrayAux = inputList.slice();
      console.log(arrayAux)
      arrayAux.push({
        label: event.target.value,
        done: false
      });
      setInputList(arrayAux);

    }
  }

  function handleDeleteTodo(todoIndex) {
    setInputList((preState) =>
      preState.filter((item, index) => index != todoIndex)
    );
  }

  const getTodoListFromApi = async ()=>{
    let URI = `${BASE_URL}user/${user}`;
    let response = await fetch (URI)
    try{
      if (response.ok){
        let jsonResponse = await response.json()
        console.log(jsonResponse)
        setInputList(jsonResponse)
      }else{
        alert("User does not exist")
        setInputList([])
        return
      }

    }catch { e => console.log(e)}
  }

  useEffect(()=>{
    getTodoListFromApi
  },[user])

  const createUserFromApi = async ()=>{
    let URI = `${BASE_URL}user/${user}`;
    try{
    let response = await fetch (URI,{
      method:"POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify([]),
    })
    if(response.ok){
      let jsonResponse = await response.json()
      console.log(jsonResponse)
      alert(`User -${user}- was created`)
    }else{
      alert("User already exists")
    }

    }catch (e){
      alert("Something went wrong. Check console")
      console.log(e)
    }
  }
  const addTodoFromApi = async (event) =>{
    let URI = `${BASE_URL}user/${user}`;
    let arrAux = inputList.slice()
    arrAux.push({
      label: event.target.value,
      done: false
    })
    setInputList(arrAux)
    let response = await fetch(URI, {
      method:"PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(arrAux),
    })

    let jsonResponse = await response.json()
    console.log(jsonResponse)

  }
  
  return (
    <>
      <div className="todo_container">

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
