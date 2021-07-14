import React, { useState } from "react";

const AddTask = ({ onAdd }) => {
  const [text, setText] = useState("");
  const [day, setDay] = useState("");
  const [reminder, setReminder] = useState(true);

  const onChangeTextHandler = (e) => {
    setText(e.target.value);
  };
  const onChangeDateHandler =(e)=>{
      setDay(e.target.value)
  }
  const onChangeCheckHandler =(e)=>{
    setReminder(e.currentTarget.checked)
}

  const onSubmit = (e) => {
    e.preventDefault();
    onAdd({ text, day, reminder });
  };

  return (
    <form className="add-form" onSubmit={onSubmit}>
      <div className="form-control">
        <label>Task</label>
        <input
          type="text"
          placeholder="Add Task"
          value={text}
          onChange={onChangeTextHandler}
        />
      </div>
      <div className="form-control">
        <label>Day & Time</label>
        <input type="text" placeholder="Add Day & Time" value={day}    onChange={onChangeDateHandler}  />
      </div>
      <div className="form-control form-control-check">
        <label>Set Reminder</label>
        <input type="checkbox" checked={reminder} value={reminder}  onChange={onChangeCheckHandler} />
      </div>

      <input
        type="submit"
        value="Save Task"
        className="btn btn-black  btnCls"
      />
    </form>
  );
};
export default AddTask;
