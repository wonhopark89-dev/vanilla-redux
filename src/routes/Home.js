import React, { useState } from "react";
import { connect } from "react-redux";
import { actionCreators } from "./Store";

function Home({toDos, addToDo, ...rest}) {
  const [text, setText] = useState("");
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
      <ul>{JSON.stringify(toDos)}</ul>
    </>
  );
}


function mapStateToProps(state) {
  return { toDos : state }; // connet 에서는 return 이 꼭 필요하며, 이부분이 연결해주는 부분임
}

function mapDispatchToProps(dispatch) {
  return {
    addToDo : text => dispatch(actionCreators.addToDo(text))
  };
}

export default connect(mapStateToProps, mapDispatchToProps) (Home);

// export default connect(null, mapDispatchToProps) (Home);