var Letter = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var Length = 0;
var Score = 0;


document.addEventListener('keydown',setting,false);
function setting()
{
    setInterval("CreateRandom()",400);
    document.removeEventListener('keydown',setting,false);
}

document.addEventListener('keydown',logkey,false);

var Print = '';

function CreateRandom()
{
    var index = parseInt(Math.random()*26);
    var NewText = Letter.charAt(index);
    Print = document.getElementById("Typing");
    Print.innerHTML = NewText + Print.innerHTML;

    document.getElementById("Length").innerHTML = "Total_Length: " + Print.innerHTML.length;
}

function logkey(e)
{
    var LastWord = Print.innerHTML.substr(-1);

    if (LastWord == e.key.toUpperCase())
    {
        Print.innerHTML = Print.innerHTML.substr(0, Print.innerHTML.length - 1);
        Score++;
    }

    if(e.keyCode>=65 && e.keyCode<=90)
    {
        document.getElementById("Input").innerHTML += e.key.toUpperCase();
    }

    document.getElementById("Score").innerHTML = "Score: " + Score;
}