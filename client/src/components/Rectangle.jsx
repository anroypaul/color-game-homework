import { PropTypes } from 'prop-types';

const Rectangle = ({ index, red, green, blue, onRectangleClick }) => {
  function handleClick(event) {
    onRectangleClick(event, index)
    // onRectangleClick(index);
  }

  function indexToLetter(index) {
    const map = ['a', 'b', 'c', 'e', 'f', 'g'];
    return map[index];
  }

  return (
    <div
      onClick={handleClick}
      className={`box ${indexToLetter(index)}`}
      name={indexToLetter(index)}
      style={{ backgroundColor: `rgba(${red},${green},${blue},1)` }}
    ></div>
  );
};

export default Rectangle;

Rectangle.propTypes = {
  index: PropTypes.number.isRequired,
  red: PropTypes.number.isRequired,
  green: PropTypes.number.isRequired,
  blue: PropTypes.number.isRequired,
  onRectangleClick: PropTypes.func.isRequired,
};
