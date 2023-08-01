import { useState } from "react";
import { useTodoDispatch } from "../../contexts/TodosContext";
import Button from "../Button";
import InputText from "../InputText";
import styled from "styled-components";

const StyledLabel = styled.label`
  font-size: 1.25rem;
  font-weight: 600;
`

const FormInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`

const FormRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

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
      <FormInner>
        <FormRow>
          <StyledLabel htmlFor="title">TITLE</StyledLabel>
          <InputText 
          name="title" 
          value={title} 
          onChange={e=>setTitle(e.target.value)}
          placeholder="Enter Title"
          />
        </FormRow>
        <FormRow>
          <StyledLabel htmlFor="content">CONTENT</StyledLabel>
          <InputText 
          name="content" 
          value={content} 
          onChange={e=>setContent(e.target.value)} 
          placeholder="Enter Content"
          />
        </FormRow>
        <FormRow>
          <Button>할일 추가</Button>
        </FormRow>
      </FormInner>
    </form>
  </div>
  )
}

export default TodoForm;