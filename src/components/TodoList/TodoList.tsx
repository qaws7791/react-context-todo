import { useMemo } from "react";
import { Todo, useTodoState } from "../../contexts/TodosContext";
import styled from "styled-components";
import TodoItem from "../TodoItem";

const StyledList = styled.ul`
  background-color: #fff;
  border: 1px solid #000;
  min-height: 60px;
  box-shadow: 3px 4px 0px 1px #000;
`
const StyledTitle = styled.h2`
  margin: 1rem 0;
  text-transform: uppercase;
`

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
  
  return(
    <div>
      <StyledTitle>🎯Working</StyledTitle>
      <StyledList>
      {workingTodos.length > 0 && workingTodos.map(todo => <TodoItem key={todo.id} todo={todo}/>)}
      </StyledList>
      <StyledTitle>✅Done</StyledTitle>
      <StyledList>
      {doneTodos.length > 0 && doneTodos.map(todo => <TodoItem key={todo.id} todo={todo}/>)}
      </StyledList>
    </div>
    
  )
}

export default TodoList;