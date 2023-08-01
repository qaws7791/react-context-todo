
import {TodoProvider} from './contexts/TodosContext';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import styled from 'styled-components';

function App() {
  return (
    <TodoProvider>
      <Container>
        <TodoForm/>
        <TodoList/>
      </Container>
    </TodoProvider>
  );
}
export default App;


const Container = styled.div`
  max-width: 500px;
  border: 1px solid red;
  background-color: #f8f4f0;
`



