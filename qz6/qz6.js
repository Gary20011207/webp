setInterval(function ()
{
    var Time = new Date();

    if (Time.getSeconds() < 10)
    {
        document.getElementById('CLOCK').innerHTML = Time.getHours() + ':' + Time.getMinutes() + ':0' + Time.getSeconds();
    }

    if (Time.getMinutes() < 10)
    {
        document.getElementById('CLOCK').innerHTML = Time.getHours() + ':0' + Time.getMinutes() + ':' + Time.getSeconds();
    }

    if (Time.getHours() < 10)
    {
        document.getElementById('CLOCK').innerHTML = '0' + Time.getHours() + ':' + Time.getMinutes() + ':' + Time.getSeconds();
    }

    if ((Time.getSeconds() >= 10) && (Time.getMinutes() >= 10) && (Time.getHours() >= 10))
    {
        document.getElementById('CLOCK').innerHTML = Time.getHours() + ':' + Time.getMinutes() + ':' + Time.getSeconds();
    }

}, 100);