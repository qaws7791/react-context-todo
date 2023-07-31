
import { useMemo, useState,useContext } from 'react';
import { Todo, TodoProvider, TodosDispatchContext, useTodoDispatch, useTodoState } from './contexts/TodosContext';
import styled from 'styled-components';


function App() {
  return (
    <TodoProvider>
      <div className="App">
        <TodoForm/>
        <TodoList/>
      </div>
    </TodoProvider>
  );
}
export default App;



function TodoForm() {
  const dispatch = useTodoDispatch()
  const [title,setTitle] = useState<string>('')
  const [content,setContent] = useState<string>('')
  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!title || !content) return
      const newTodo = {
        id: new Date().getTime(),
        title,
        content,
        isDone: false
      }
      dispatch({
        type: 'CREATE_TODO',
        payload: newTodo
      });
    setTitle('')
    setContent('')
  }

  return(
  <div>
    <form onSubmit={handleSubmit}>
      <div>
      <label htmlFor="title">Title</label>
      <input type="text" name="title" id="title" value={title} onChange={e=>setTitle(e.target.value)}/>
      </div>
      <div>
      <label htmlFor="content">Content</label>
      <input type="text" name="content" id="content" value={content} onChange={e=>setContent(e.target.value)} />
      <button type='submit'>할일 추가</button>
      </div>
    </form>
  </div>
  )
}

function TodoList() {
  const todos = useTodoState()
  const [workingTodos, doneTodos] = useMemo(()=>{
    const emptyTodos:[Todo[],Todo[]] = [[],[]]
    return todos?.reduce(
      (acc, item) => {
        if (item.isDone) acc[1].push(item);
        else acc[0].push(item);
        return acc;
      },emptyTodos) || emptyTodos
  },[todos])
console.log(workingTodos, doneTodos)
  return(
    <div>
      <h2>Working Todos</h2>
      {workingTodos.map(todo => <TodoItem key={todo.id} todo={todo}/>)}
      <h2>Done Todos</h2>
      {doneTodos.map(todo => <TodoItem key={todo.id} todo={todo}/>)}
    </div>
    
  )
}

interface TodoItemProps {
  todo: Todo;
}

function TodoItem({todo}:TodoItemProps) {
  const dispatch = useContext(TodosDispatchContext)
  const handleDeleteTodo = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if(dispatch) dispatch({type:'DELETE_TODO', id:todo.id})
  }

  const handleToggleTodo = (e:React.ChangeEvent<HTMLInputElement>) => {
    if(dispatch) dispatch({type:'TOGGLE_TODO', id:todo.id})
  }
  return(
  <li>
    <input type="checkbox" checked={todo.isDone} onChange={handleToggleTodo}/>
    <div>
      <StyledTitle isDone={todo.isDone}>{todo.title}</StyledTitle>
      <div>{todo.content}</div>
    </div>
    <button type='button' onClick={handleDeleteTodo}>Delete</button>
  </li>
  )
}

const StyledTitle = styled.h3<{isDone: boolean}>`
  font-size: 2rem;
  text-decoration: ${({isDone}) => isDone && "line-through"};
  color: ${({isDone}) => isDone && "#808080"};
`