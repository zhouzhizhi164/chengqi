class Circle extends React.Component{
  render(){
    return(
    <button className={this.props.className} onClick={()=>this.props.onClick()}>
      {this.props.value}
    </button>
    );
  }
}

class Board extends React.Component{
  constructor(props){
    super(props);
    this.state={
      circles:Array(24).fill(null),
      xIsNext:true,
    };
  }
  handleClick(i){
    const circles=this.state.circles.slice();
    // if(calculateWinner(circles)||circles[i]){
    //   return;
    // }
    circles[i]=this.state.xIsNext?'X':'O';
    this.setState({
      circles:circles,
      xIsNext:!this.state.xIsNext,
    });
  }
  renderCircle(i,j){
    var i=i+j*8;
    var className="circle"+" "+"circle"+i;
    return (<Circle
      className={className}
      value={this.state.circles[i]}
      onClick={()=>this.handleClick(i)}
    />);
  }
  render(){
    return(
      <div className={this.props.className}>
        <div className="row">
          {this.renderCircle(0,this.props.j)}
          {this.renderCircle(1,this.props.j)}
          {this.renderCircle(2,this.props.j)}
        </div>
        <div className="row">
          {this.renderCircle(3,this.props.j)}
          {this.renderCircle(4,this.props.j)}
        </div>
        <div className="row">
          {this.renderCircle(5,this.props.j)}
          {this.renderCircle(6,this.props.j)}
          {this.renderCircle(7,this.props.j)}
        </div>
      </div>
    );
  }
}

class Boards extends React.Component{
  renderBoard(j){
    var className="border"+" "+"board"+j;
    return <Board className={className} j={j}/>;
  }
  render(){
    return (
      <div id="boards">
        {this.renderBoard(0)}
        {this.renderBoard(1)}
        {this.renderBoard(2)}
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
