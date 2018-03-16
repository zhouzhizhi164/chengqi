class Circle extends React.Component{
  render(){
    return(
    <button className="circle" id={this.props.id}>
      {this.props.value}
    </button>
    );
  }
}

class Board extends React.Component{
  renderCircle(i){
    var idname="circle"+i;
    return <Circle id={idname} value={i}/>;
  }
  render(){
    return(
      <div className="board" id={this.props.id}>
        <div className="row1">
          {this.renderCircle(0)}
          {this.renderCircle(1)}
          {this.renderCircle(2)}
        </div>
        <div className="row2">
          {this.renderCircle(3)}
          {this.renderCircle(4)}
        </div>
        <div className="row3">
          {this.renderCircle(5)}
          {this.renderCircle(6)}
          {this.renderCircle(7)}
        </div>
      </div>
    );
  }
}

class Boards extends React.Component{
  renderBoard(i){
    var idname="board"+i;
    return <Board id={idname}/>;
  }
  render(){
    return (
      <div id="boards">
        {this.renderBoard(0)}
        {/* {this.renderBoard(1)}
        {this.renderBoard(2)} */}
      </div>
    );
  }
}

class Game extends React.Component{
  render(){
    return(
      <Boards />
    );
  }
}
/*================================*/
ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
