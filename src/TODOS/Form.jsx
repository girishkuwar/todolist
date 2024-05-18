import React, { useEffect, useState } from 'react'

const Form = () => {
  const [Name, setName] = useState("");
  const [desc, setdesc] = useState("");
  const [Todos, setTodos] = useState([]);
  const [isnew, setisnew] = useState(true);
  const [tmp, setTmp] = useState(0);

  const addTodo = () => {
    let tmp = {
      sno: Todos.length + 1,
      name: Name,
      desc: desc
    }
    let newItem = Todos;
    newItem.push(tmp);
    setTodos(newItem);
    setName("");
    setdesc("")
  }


  const deleteTodo = (i) => {
    let newItem = Todos;
    if (i === 0) {
      newItem.splice(i, i + 1);
    }
    newItem.splice(i, i);
    setTodos(newItem);
    console.log(Todos);
    setName("");
    setdesc("");
  }

  const editTodo = (i) => {
    setisnew(false);
    setTmp(i);
    setName(Todos[i].name);
    setdesc(Todos[i].desc);
  }

  const updateTodo = () => {
    let newItem = Todos;
    newItem[tmp] = {
      sno: Todos[tmp].sno,
      name: Name,
      desc: desc
    }
    setTodos(newItem);
    setisnew(true);
    setName("");
    setdesc("");
  }




  useEffect(() => {

  }, [])


  return (
    <div>
      <input type="text" placeholder='Name' onChange={(e) => { setName(e.target.value) }} value={Name} />
      <input type="text" placeholder='Desc' onChange={(e) => { setdesc(e.target.value) }} value={desc} />
      {(isnew) ?  <button onClick={addTodo}>Submit</button> : <button onClick={updateTodo}>Update</button>}

      {/* <TodosCom Todos={Todos} /> */}
      <div>
        {
          Todos.map((e, i) => {
            return (
              <div key={e.sno}>
                <h1>{e.sno}</h1>
                <h1>{e.name}</h1>
                <h1>{e.desc}</h1>
                <button onClick={() => { deleteTodo(i) }}>DELETE</button>
                <button onClick={() => { editTodo(i) }}>EDIT</button>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Form