import { createStore } from "redux";

const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";

const addToDo = text => {
  return {
    type: ADD_TODO,
    text
  };
};

const deleteToDo = id => {
  return {
    type: DELETE_TODO,
    id
  };
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      // return state.push(action.text) // never mutate state !!!
      // return [...state, { text: action.text, id: Date.now() }]; // it is correct
      return [{ text: action.text, id: Date.now() }, ...state]; // it is correct ( order )
    case DELETE_TODO:
      return state.filter(toDo => toDo.id !== action.id);
    default:
      return state;
  }
};
const store = createStore(reducer);

store.subscribe(() => console.log(store.getState()));

const paintToDos = () => {
  const toDos = store.getState();
  ul.innerHTML = ""; // because render ?
  toDos.forEach(toDo => {
    const li = document.createElement("li");
    const btn = document.createElement("button");

    btn.innerText = "DEL";
    btn.addEventListener("click", dispatchDeleteToDo);

    li.id = toDo.id;
    li.innerText = toDo.text;

    li.appendChild(btn);
    ul.appendChild(li);
  });
};

store.subscribe(paintToDos);

const dispathAddToDo = text => {
  store.dispatch(addToDo(text));
};

const dispatchDeleteToDo = e => {
  // console.log(e.target.parentNode.id); // 삭제할 부모 노드
  const id = parseInt(e.target.parentNode.id); // 왜냐하면 HTML 로 부터 넘어오는 값은 string 이니까
  store.dispatch(deleteToDo(id));
};
const onSubmit = e => {
  e.preventDefault();
  const toDo = input.value;
  input.value = "";
  dispathAddToDo(toDo);
};

form.addEventListener("submit", onSubmit);
