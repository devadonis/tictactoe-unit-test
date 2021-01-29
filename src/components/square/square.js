import './square.css';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick} data-testid={props.testid}>
      {props.value}
    </button>
  );
}

export default Square;