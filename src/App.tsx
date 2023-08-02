
import {TodoProvider} from './contexts/TodosContext';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import styled from 'styled-components';

const Container = styled.div`
  box-sizing: border-box;
  max-width: 500px;
  width: 100%;
  background-color: #b5dcf4;
  border: 2px solid #000;
  padding: 30px;
`

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






