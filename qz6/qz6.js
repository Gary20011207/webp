setInterval(function ()
{
    var Time = new Date();

    Hours = Time.getHours();
    Minutes = Time.getMinutes();
    Seconds = Time.getSeconds();

    Hours = checkTime(Hours);
    Minutes = checkTime(Minutes);
    Seconds = checkTime(Seconds);

    document.getElementById('CLOCK').innerHTML = Hours + ':' + Minutes + ':' + Seconds;

}, 100);

function checkTime(Variable)
{
    if(Variable < 10)
    {
        Variable = '0' + Variable;
    }

    return Variable;
}