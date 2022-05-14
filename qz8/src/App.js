import './App.css';
import MultiButton from './cgu_multiButton';
import HelloCGU from './cgu_hello';
// const styleArgument = {fontSize: '100px',color: 'red'};
// const multiButton=(num)=>{
//   var output=[];
//   for(let i=1;i<num+1;++i)
//       output.push(<div id='btn'><button onClick={changeText}>第{i}個按鍵</button></div>)
//   return output;
// }
// const changeText=(event)=>{
//   console.log(event.target)
//   event.target.innerText = event.target.innerText + "被點了"
// }
// const HelloCGU=()=>{
//   var output=[];
//   output.push(<h1 style = {styleArgument} >hello CGU!</h1>)
//   return output;
// }
function App() {
  return (
    <div className="App">
      <div>
      {HelloCGU()}
      </div>
      <div>
      {MultiButton(10)}
      </div>
    </div>
  );
}
export default App;