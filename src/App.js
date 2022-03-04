import './App.css';
import {useState} from 'react'

const App = () => {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(0);

  const handleSubmit = (e) =>{
    e.preventDefault();

    if(editId){
      const editTodo = todos.find((i) => i.id === editId);
      const updatedTodos = todos.map((t) =>t.id === editTodo.id ? (t = {id:t.id, todo}): {id:t.id, todo:t.todo} );
      setTodos(updatedTodos);
      setEditId(0);
      setTodo('');
      return;
    }

    if(todo !== ''){
      setTodos([{id:`${todo}-${Date.now()}` ,todo}, ...todos]);
      setTodo('');
    }
  };

  const handleDelete = (id) => {
    const deleteTodo = todos.filter((to) => to.id !== id);
    setTodos([...deleteTodo]);
  };

  const handleEdit = (id) => {
    const editTodo = todos.find((i) => i.id === id);
    setTodo(editTodo.todo);
    setEditId(id);
  };

  return (
    <div className="App">
      <div className='contanier'>
        <h1>React Todo List App</h1>
        <form className='todo-form' onSubmit={handleSubmit}>
          <input type='text' value={todo} onChange={(e) => setTodo(e.target.value)}/>
          <button type='submit'>{editId ? 'Edit' : 'Go'}</button>
        </form>
        <ul className='all-todos'>
          {
            todos.map((t)=>(
              <li className='single-todo'>
                <span className='todo-text' key={t.id}>{t.todo}</span>
                <button onClick={() => handleEdit(t.id)}>Edit</button>
                <button onClick={() => handleDelete(t.id)}>Delete</button>
            </li>
            ))
          }
          
        </ul>
      </div>
    </div>
  );
}

export default App;
