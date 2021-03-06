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
  renderCircle(i,j){
    var i=i+j*8;
    var className="circle"+" "+"circle"+i;
    return (<Circle
      className={className}
      value={this.props.circles[i]}
      onClick={()=>this.props.onClick(i)}
    />
  );
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
    return <Board
      className={className}
      j={j}
      onClick={(i)=>this.props.onClick(i)}
      circles={this.props.circles}
    />;
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
  constructor(props){
    super(props);
    this.state={
      history:[{
        circles:Array(24).fill(null)
      }],
      xIsNext:true,
    };
  }

handleClick(i){
  const history=this.state.history;
  const current = history[history.length-1];
  const circles=current.circles.slice();
  if (calculateWinner(circles)||circles[i]){
    return;
  }
  circles[i]=this.state.xIsNext?'X':'O';
  this.setState(
    {
      history:history.concat([{
        circles:circles
      }]),
      xIsNext:!this.state.xIsNext,
    }
  );

}
  render(){
    const history=this.state.history;
    const current = history[history.length-1];
    const winner = calculateWinner(current.circles);
    let status;
    if(winner){
      status="Winner: "+winner;
    }
    else{
      status="Next player: "+(this.state.xIsNext?'X':'O');
    }
    return(
      <div className="game">
        <div className="game-boards">
          <Boards
            onClick={(i) => this.handleClick(i)}
            circles={current.circles}
          />
        </div>
        <div className="game-info">
          <div className="game-status">{status}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}
/*================================*/
ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
function calculateWinner(circles){
  const lines=[
    [0,1,2],
    [5,6,7],
    [8,9,10],
    [13,14,15],
    [16,17,18],
    [21,22,23],
    [3,11,19],
    [4,12,20],
    [1,9,17],
    [6,14,22],
    [0,3,5],
    [2,4,7],
    [8,11,13],
    [10,12,15],
    [16,19,21],
    [18,20,23],
  ];
  for(let i=0;i<lines.length;i++){
    const[a,b,c]=lines[i];
    if(circles[a]&&circles[a]===circles[b]&&circles[a]===circles[c]){
      return circles[a];
    }
  }
  return null;
}
