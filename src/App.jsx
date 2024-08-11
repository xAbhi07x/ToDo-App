import { useState } from 'react'
import { useEffect } from 'react'
import './App.css'

//custom hooks are define like this useCustomeHookName
function useTodos(){
  const [todo, setTodo] = useState([])
  useEffect(() => {
    fetch("http://localhost:3000/todos", {method: "GET"}).then((response)=> {
        response.json().then((data)=> {
          console.log(data);
          setTodo(data);
        })
    })

    setInterval(()=>{
      fetch("http://localhost:3000/todos", {method: "GET"}).then((response)=> {
          response.json().then((data)=> {
            console.log(data);
            setTodo(data);
          })
      })
    }, 1000)
  }, [])

  return todo;
}

function App() {
  //the useState hook tells react that 'todo' is the state and 'setTodo' is it's updater function
  const todos = useTodos(); 

  return (
    <>
    {todos.map((data)=> {
      return <div>
        {data.title}
        {data.description}
        <button>Delete</button>
        <br />
      </div>
    })}
    </>
  )
}


export default App
