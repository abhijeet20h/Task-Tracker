import PropTypes from "prop-types";

const Header = ({ title, showAddTask ,onClickShow }) => {
  return (
    <header className="header">
      <h1>{title}</h1>
      <button onClick={onClickShow} className="btn btn-primary">{showAddTask ? "Add" : "Close"}</button>
    </header>
  );
};

Header.defaultProps = {
  title: "Task Tracker",
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
