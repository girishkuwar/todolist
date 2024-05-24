import React from 'react'
import styles from "./bigtodo.module.css"

const BigTodo = ({ display, todo, changer }) => {
    return (
        <div style={{ display: display }} className={styles.BigTodo}>
            <div className={styles.image}>
                <div className={styles.imgcontainer}>
                    <div style={(todo.isComplete) ? { backgroundColor: '#ace3acbd' } : { backgroundColor: '#df7b7bb0' }} className={styles.todo}>
                        <h2>{todo.sno}</h2>
                        <h4>{todo.name}</h4>
                        <p>{todo.desc}</p>
                        <button onClick={changer}>close</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BigTodo