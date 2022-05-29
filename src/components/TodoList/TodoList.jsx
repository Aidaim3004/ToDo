import React, {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrash} from '@fortawesome/free-solid-svg-icons'

const TodoList = () => {
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('todos')) || [])
  const [newTodo, setNewTodo] = useState('')

  const handleChange = (e) => {
    setNewTodo(e.target.value)
  }

  const handlePress = (e) => {
    if (e.code === 'Enter' && newTodo.trim().length) {
      addNewItem()
    }
  }
  const addNewItem = () => {
    const todosWithNew = [...todos, {title: newTodo, isDone: false}]
    setTodos(todosWithNew)
    localStorage.setItem('todos', JSON.stringify(todosWithNew))
    setNewTodo('')
  }

  const handleDone = (e, index) => {
    const updateArray = todos
      .map((item, idx) => index === idx ? {...item, isDone: e.target.checked} : item)
    localStorage.setItem('todos', JSON.stringify(updateArray))
    setTodos(updateArray)
  }

  const deleteItem = (index) => {
    const filteredList = todos.filter((item, idx) => index !== idx)
    localStorage.setItem('todos', JSON.stringify(filteredList))
    setTodos(filteredList)
  }

  return (

    <div className="toDo">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="d-flex justify-content-between align-items-center">
            <h2>TodoList</h2>
            <span>Количество задач: {todos.length} </span>
          </div>
          <input type="text"
                 className="form-control"
                 onChange={handleChange}
                 value={newTodo}
                 onKeyPress={handlePress}
          />
          <button className="btn btn-success w-100 mt-2"
                  onClick={addNewItem}
                  disabled={newTodo.trim().length === 0}
          >Add new item
          </button>
          <ul className="list-group mt-5">
            {
              todos.map((item, idx) => (
                <li key={idx} className="list-group-item d-flex justify-content-between align-content-center">
                  <div>
                    <input type="checkbox" className="form-check-input" id="exampleCheck1"
                           onChange={(e) => handleDone(e, idx)}
                           checked={item.isDone}/>

                    <span className={`ms-2 ${item.isDone ? 'text-decoration-line-through' : ''}`}> {item.title} </span>
                  </div>
                  <button className="btn btn-danger btn-sm" onClick={() => deleteItem(idx)}>
                    <FontAwesomeIcon icon={faTrash}/>
                  </button>
                </li>
              ))
            }
          </ul>
        </div>

      </div>
    </div>
  );
};



  export default TodoList;