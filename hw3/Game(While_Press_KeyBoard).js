var Letter = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var TextArray = [];
var Length = 0;
var Default = new Date().getTime();
var Score = 0;

document.onkeydown=function(event)
{
    var New_Default=new Date().getTime();
    var times = Math.round((New_Default-Default)*2.5)/1000;
    Default = New_Default;

    if(times>=1)
    {
        for(var i=1;i<=times;i++)
        {
            var NewText = CreateRandom();
            Length = TextArray.length;
            TextArray.splice(0,0,NewText);
        }
    }

    if(event.key.toUpperCase()==TextArray[Length])
    {
        TextArray.splice(Length,1);
        Score++;
    }

    document.getElementById("Typing").innerHTML = TextArray;
    if(event.keyCode>=65 && event.keyCode<=90)
    {
        document.getElementById("Input").innerHTML += event.key.toUpperCase();
    }
    document.getElementById("Score").innerHTML = "Score: " + Score;
    document.getElementById("Length").innerHTML = "Total_Length: " + Length;
    console.log(TextArray);
}

function CreateRandom()
{
    var index = parseInt(Math.random()*26);
	return Letter.charAt(index);
}