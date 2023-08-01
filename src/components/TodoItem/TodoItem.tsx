import styled from "styled-components";
import { Todo, TodosDispatchContext } from "../../contexts/TodosContext";
import { useContext } from "react";
import Button from "../Button";

interface TodoItemProps {
  todo: Todo;
}

const StyledTodoText = styled.div<{$done: string}>`
  font-size: 1rem;
  text-decoration: ${({$done}) => $done==='true' && "line-through"};
  color: ${({$done}) => $done==='true' && "#808080"};
`

const StyledTodoItem = styled.li`
  list-style: none;
  display: flex;
  flex-direction: column;
  padding: 10px;
  &:not(:last-child) {
    border-bottom: 1px solid #000;
  }
`

const TodoItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`

function TodoItem({todo}:TodoItemProps) {
  const dispatch = useContext(TodosDispatchContext)
  const handleDeleteTodo = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if(dispatch) dispatch({type:'DELETE_TODO', id:todo.id})
  }

  const handleToggleTodo = (e:React.ChangeEvent<HTMLInputElement>) => {
    if(dispatch) dispatch({type:'TOGGLE_TODO', id:todo.id})
  }
  return(
  <StyledTodoItem>
    <TodoItemHeader>
      <input type="checkbox" checked={todo.isDone} onChange={handleToggleTodo}/>
      <StyledTodoText $done={todo.isDone.toString()}>
      <h4>{todo.title}</h4>
      <div>{todo.content}</div>
      </StyledTodoText>
      <Button type='button' onClick={handleDeleteTodo} size="small">DELETE</Button>
    </TodoItemHeader>
    
  </StyledTodoItem>
  )
}

export default TodoItem;

