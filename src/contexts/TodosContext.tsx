import { createContext, Dispatch,useContext,useReducer } from "react";


// type
export interface Todo {
  id: number;
  title: string;
  content: string;
  isDone: boolean;
}

type Action =
  | { type: "CREATE_TODO"; payload: Todo }
  | { type: "TOGGLE_TODO"; id: number }
  | { type: "DELETE_TODO"; id: number };

type DispatchType = Dispatch<Action>;

type State = {
  todos: Todo[];
};
// Reducer
export function todoReducer(state: State, action: Action): State {
  switch (action.type) {
    case "CREATE_TODO":
      return {
        todos: [...state.todos, action.payload],
      };
    case "TOGGLE_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.id ? { ...todo, isDone: !todo.isDone } : todo
        ),
      };
    case "DELETE_TODO":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.id),
      };
    default:
      return state;
  }
}

const initialState: State = {
  todos: []
}

// Provider For Todos Context Api

export const TodosStateContext = createContext<State>(initialState);
export const TodosDispatchContext = createContext<DispatchType>(()=>null);

export function TodoProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  return (
    <TodosStateContext.Provider value={state}>
      <TodosDispatchContext.Provider value={dispatch}>
        {children}
      </TodosDispatchContext.Provider>
    </TodosStateContext.Provider>
  );
}

//Custom Hooks For Todos
export function useTodoState() {
  const state = useContext(TodosStateContext);
  if (!state) throw new Error("Cannot find TodosContext");
  return state.todos;
}

export function useTodoDispatch() {
  const dispatch = useContext(TodosDispatchContext);
  if (!dispatch) throw new Error("Cannot find TodosDispatchContext");
  return dispatch;
}