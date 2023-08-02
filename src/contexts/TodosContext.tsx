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
  todos: [
    {
        "id": 1690936650044,
        "title": "첫 번째 할일",
        "content": "과제 제출하기",
        "isDone": true
    },
    {
        "id": 1690936657833,
        "title": "두 번째 할일",
        "content": "알고리즘 문제 풀기",
        "isDone": true
    },
    {
        "id": 1690936736256,
        "title": "세 번째 할일",
        "content": "AWS 복습하기",
        "isDone": false
    },
    {
        "id": 1690936742182,
        "title": "네 번째 할일",
        "content": "TIL 작성하기",
        "isDone": false
    },
    {
        "id": 1690936753811,
        "title": "다섯 번째 할일",
        "content": "타입스크립트 복습하기",
        "isDone": false
    }
]
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