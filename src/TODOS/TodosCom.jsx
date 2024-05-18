import React, { useEffect, useState } from 'react'

const TodosCom = ({ Todos }) => {
  const [Todo, setTodo] = useState([]);

  useEffect(() => {
    setTodo(Todos);
  }, [Todos])
  return (
    <div>
      {
        Todo.map((e) => {
          return (
            <>
                <h1>{e.sno}</h1>
                <h1>{e.name}</h1>
                <h1>{e.desc}</h1>
            </>
          )
        })
      }
    </div>
  )
}

export default TodosCom