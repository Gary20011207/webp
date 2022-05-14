const styleArgument = { fontSize:'100px',color:'red'};

const changeText=(event)=>{
    console.log(event.target)
    event.target.innerText = event.target.innerText + " Is Clicked "
  }
  const MultiButton=(num)=>{
    var output=[];
    for(let i=1;i<num+1;++i)
        output.push(<button onClick={changeText}>The {i} th Button</button>)
    return output;
  }
  export default MultiButton;