import { useMemo } from "react";
import { Todo, useTodoState } from "../../contexts/TodosContext";
import TodoItem from "../TodoItem/TodoItem";
import styled from "styled-components";

const StyledList = styled.ul`
  background-color: #fff;
  border: 1px solid #000;
  min-height: 60px;
`
const StyledTitle = styled.h2`
  margin: 1rem 0;
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
      <StyledTitle>Working Todos</StyledTitle>
      <StyledList>
      {workingTodos.length > 0 && workingTodos.map(todo => <TodoItem key={todo.id} todo={todo}/>)}
      </StyledList>
      <StyledTitle>Done Todos</StyledTitle>
      <StyledList>
      {doneTodos.length > 0 && doneTodos.map(todo => <TodoItem key={todo.id} todo={todo}/>)}
      </StyledList>
    </div>
    
  )
}

export default TodoList;