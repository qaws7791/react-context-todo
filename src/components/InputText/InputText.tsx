import styled from "styled-components";


interface InputTextProps {
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const StyledInput = styled.input`
  outline: none;
  border: 2px solid #000;
  box-shadow: 2px 3px 0px 1px #000;
  width: 200px;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 15px;
`

const InputText = ({
  name,
  value,
  onChange,
  placeholder,
  ...props
}:InputTextProps) => {
  return (
    <StyledInput 
      type='text'
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      {...props}
    ></StyledInput>
  )
}

export default InputText