import React, { useEffect, useRef, useState } from 'react'
import "./Form.css"

const Form = () => {
  const [Name, setName] = useState("");
  const [desc, setdesc] = useState("");
  const [Todos, setTodos] = useState([]);
  const [isnew, setisnew] = useState(true);
  const [tmp, setTmp] = useState(0);
  const [reload, setReload] = useState(true);
  const checkbox = useRef([]);
  checkbox.current = [];


  const addTodo = () => {
    let tmp = {
      sno: Todos.length + 1,
      name: Name,
      desc: desc,
      isComplete: false
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
    updaterr(newItem);
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
    setisnew(true);
    setTodos(newItem);
    updaterr();
  }

  const updaterr = () => {
    setName("");
    setdesc("");
    setReload(!reload);
  }
  const exportData = () => {
    localStorage.setItem("TodoData", JSON.stringify(Todos));
  }
  const importData = () => {
    setTodos(JSON.parse(localStorage.getItem("TodoData")));
  }


  const addTORef = (el) => {
    if (el && !checkbox.current.includes(el)) {
      checkbox.current.push(el);
    }
    console.log(checkbox.current);
  }

  const addCheckedvalue = (i) => {
    let NewItem = Todos;
    NewItem[i].isComplete = checkbox.current[i].checked;
    setTodos(NewItem);
    updaterr();
  }

  const file = new File([JSON.stringify(Todos)], 'ToDoData.json', {
    type: 'text/plain',
  })

  console.log(JSON.stringify(Todos));
  const downloadFile = () => {
    const link = document.createElement('a')
    const url = URL.createObjectURL(file)

    link.href = url
    link.download = file.name
    document.body.appendChild(link)
    link.click()

    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  }


  return (
    <div>
      <h1 style={{ color: 'white' }} >ToDo List</h1>
      <div className="todoInput">

        <input type="text" placeholder='Name' onChange={(e) => { setName(e.target.value) }} value={Name} /><br />
        <input type="text" placeholder='Desc' onChange={(e) => { setdesc(e.target.value) }} value={desc} /><br />

        {(isnew) ? <button onClick={addTodo}>Submit</button> : <button onClick={updateTodo}>Update</button>}
        <button onClick={exportData}>Export</button>
        <button onClick={importData}>Import</button>
        <button onClick={downloadFile}>download File</button>
      </div>

      <div className='container'>
        {
          Todos.map((e, i) => {
            return (
              <div key={e.sno}>
                <div style={(e.isComplete) ? { backgroundColor: '#ace3acbd' } : { backgroundColor: '#df7b7bb0' }} className="card">
                  <h3 className="card__title">{e.name}
                  </h3>
                  <p className="card__content">{e.desc}</p>

                  <button className='delete' onClick={() => { deleteTodo(i) }}>DELETE</button>
                  <button onClick={() => { editTodo(i) }}>UPDATE</button>
                  <div className="backno">
                    <h1>{e.sno}</h1>
                  </div>
                  <input className='checkbox' type="checkbox" checked={(e.isComplete) ? true : false} ref={addTORef} name="isComplete" id="" value="test" onChange={(e) => { addCheckedvalue(i) }} />
                  <div className="card__arrow">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="15" width="15">
                      <path fill="#fff" d="M13.4697 17.9697C13.1768 18.2626 13.1768 18.7374 13.4697 19.0303C13.7626 19.3232 14.2374 19.3232 14.5303 19.0303L20.3232 13.2374C21.0066 12.554 21.0066 11.446 20.3232 10.7626L14.5303 4.96967C14.2374 4.67678 13.7626 4.67678 13.4697 4.96967C13.1768 5.26256 13.1768 5.73744 13.4697 6.03033L18.6893 11.25H4C3.58579 11.25 3.25 11.5858 3.25 12C3.25 12.4142 3.58579 12.75 4 12.75H18.6893L13.4697 17.9697Z"></path>
                    </svg>
                  </div>
                </div>
              </div>
            )
          })
        }

      </div>
    </div>
  )
}

export default Form