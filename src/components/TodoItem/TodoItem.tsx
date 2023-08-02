import styled from "styled-components";
import { Todo, useTodoDispatch } from "../../contexts/TodosContext";
import Button from "../Button";
import usePopup from "../../hooks/usePopup";

interface TodoItemProps {
  todo: Todo;
}

const StyledTodoText = styled.div<{$done: string}>`
  font-size: 1rem;
  text-decoration: ${({$done}) => $done==='true' && "line-through"};
  color: ${({$done}) => $done==='true' && "#808080"};
  width: 100%;
  text-align: center;
`

const StyledTodoItem = styled.li`
  list-style: none;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
  padding: 10px;
  &:not(:last-child) {
    border-bottom: 1px solid #000;
  }
`

const CheckBox = styled.input`
  appearance: none;
  background-color: #fff;
  margin: 0;
  font: inherit;
  color: #000;
  width: 1.2em;
  height: 1.2em;
  border: 0.15em solid #000;
  border-radius: 0.15em;
  transform: translateY(-0.075em);
  display: grid;
  flex-shrink: 0;
  flex-grow: 0;
  place-content: center;
  &::before {
  content: "";
  width: 0.7em;
  height: 0.7em;
  transform: scale(0);
  box-shadow: inset 1em 1em #ea4b39;
}

&:checked::before {
  transform: scale(1);
}
`

const TodoTitle = styled.h4`
font-size: 1.25rem;
`
const TodoContent = styled.p`
  word-break: break-all;
`

function TodoItem({todo}:TodoItemProps) {
  const [openPopup] = usePopup();
  const dispatch = useTodoDispatch()

  const handleDeleteTodo = async (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const confirm = await openPopup({
      type: "confirm",
      title: "Delete Todo",
      contents: "Are you sure you want to delete that Todo?"
    });
    if(confirm) dispatch({type:'DELETE_TODO', id:todo.id})
  }

  const handleToggleTodo = (e:React.ChangeEvent<HTMLInputElement>) => {
    dispatch({type:'TOGGLE_TODO', id:todo.id})
  }
  return(
  <StyledTodoItem>
      <CheckBox type="checkbox" checked={todo.isDone} onChange={handleToggleTodo}/>
      <StyledTodoText $done={todo.isDone.toString()}>
        <TodoTitle>{todo.title}</TodoTitle>
        <TodoContent>{todo.content}</TodoContent>
      </StyledTodoText>
      <Button type='button' onClick={handleDeleteTodo} size="small">DELETE</Button>
  </StyledTodoItem>
  )
}

export default TodoItem;

