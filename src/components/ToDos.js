import React from "react";
import { connect } from "react-redux";
import { actionCreators } from "../routes/Store";

function ToDo({ text, onBtnClick}) {
  return (
    <li>
      {text}
      <button onClick={onBtnClick}>DEL</button>
    </li>
  );
}

function mapDispatchToProps(dispatch, ownProps) {
  console.log(ownProps);
  return {
    onBtnClick: () => dispatch(actionCreators.deleteToDo(ownProps.id)),
  };
}

// null mean that status is don`t care
export default connect(null, mapDispatchToProps)(ToDo);
