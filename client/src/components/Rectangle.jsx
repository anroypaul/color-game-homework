const Rectangle = ({ index, red, green, blue, onRectangleClick }) => {
  function handleClick() {
    onRectangleClick(index);
  }

  function indexToLetter(index) {
    const map = ['a', 'b', 'c', 'e', 'f', 'g'];
    return map[index];
  }

  return (
    <div
      onClick={handleClick}
      className={`box ${indexToLetter(index)}`}
      style={{ backgroundColor: `rgba(${red},${green},${blue},1)` }}
    ></div>
  );
};

export default Rectangle;
