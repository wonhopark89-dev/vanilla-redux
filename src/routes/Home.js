import React, { useState } from "react";
import { connect } from "react-redux";
import { actionCreators } from "./Store";
import ToDo from "../components/ToDos";

function Home({ toDos, addToDo, ...rest }) {
  const [text, setText] = useState("");
  // Home Component 는 react-router 로 부터오는 props 받음 = toDos
  console.log(rest); // react-router로 부터오는 걸 확인 할수 있음
  function onChange(e) {
    setText(e.target.value);
  }

  function onSubmit(e) {
    e.preventDefault();
    addToDo(text);
    setText("");
    // console.log(text);
  }
  return (
    <>
      <h1>to do</h1>
      <form onSubmit={onSubmit}>
        <input type="text" value={text} onChange={onChange} />
        <button>add</button>
      </form>
      {/* <ul>{JSON.stringify(toDos)}</ul> */}
      <ul>
        {toDos.map((toDo) => (
          <ToDo {...toDo} key={toDo.id} />
        ))}
      </ul>
    </>
  );
}

function mapStateToProps(state) {
  return { toDos: state }; // connect 에서는 return 이 꼭 필요하며, 이부분이 연결해주는 부분임
}

function mapDispatchToProps(dispatch) {
  return {
    addToDo: (text) => dispatch(actionCreators.addToDo(text)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

// function getCurrentState(state, ownProps) {
//   // home 컴포넌트에 prop 넘겨줄 수 있음
//   return { wonhopark: "wonhopark" };
// }
// export default connect(getCurrentState)(Home);

// export default connect(null, mapDispatchToProps) (Home);
