// S2STravelTime 取得捷運列車站間運行時間資料

var TravelTime_Array = [];
var TravelTime_Counter = [0, 20, 39, 57, 74, 90, 105, 119, 132, 144, 155, 165, 174, 182, 189, 195, 200, 204, 207, 209];

$(function ()
{
    $.ajax(
    {
        type: 'GET',
        url: 'https://ptx.transportdata.tw/MOTC/v2/Rail/Metro/S2STravelTime/TYMC?%24format=JSON',
        dataType: 'json',
        headers: GetAuthorizationHeader(),
        success: 
            function(result)
            {
                $.each(result, function (i, index)
                {
                    if (i == 0)
                    {
                        $.each(TravelTime_Counter, function (j, TravelTime_Counter)
                        {
                            TravelTime_Array[j] = index.TravelTimes[TravelTime_Counter].RunTime;
                        });
                    }
                    else
                    {
                        return false;
                    }
                });
            }
    });
});

// ODFare 取得捷運起迄站間票價資料

var Fare_Array = [];
var NUM = 0;

var Order = [];
var Station_Fares = [];

for (var i = 0; i < 22; i++)
{
    for (var j = 1; j < i; j++)
    {
        Order.push((j - 1) * 20 + i - 2);
    }
}

$(function ()
{
    $.ajax(
        {
            type: 'GET',
            url: 'https://ptx.transportdata.tw/MOTC/v2/Rail/Metro/ODFare/TYMC?%24format=JSON',
            dataType: 'json',
            headers: GetAuthorizationHeader(),
            success: 
                function (result)
                {
                    $.each(result, function (i, index)
                    {
                        if (i % 21 == 0)
                        {
                            Fare_Array[NUM] = index.Fares[0].Price;
                            NUM++;
                        }
                        else
                        {
                            return true;
                        }
                    });

                    for (var i = 0; i < 210; i++)
                    {
                        $.each(result, function(j, index)
                        {
                            if (j == Order[i])
                            {
                                Station_Fares[i] = index.Fares[0].Price;
                            }
                        });

                        // console.log(i, Order[i], Station_Fares[i]);
                    }
                }
        });
});

// Station 取得捷運車站基本資料

var Station_Name = [];
var Station_Address = [];

$(function ()
{
    $.ajax(
        {
            type: 'GET',
            url: 'https://ptx.transportdata.tw/MOTC/v2/Rail/Metro/Station/TYMC?%24format=JSON',
            dataType: 'json',
            headers: GetAuthorizationHeader(),
            success: 
                function (result) 
                {
                    $.each(result, function (i, index) 
                    {
                        if (i <= 20) 
                        {
                            Station_Name[i] = index.StationID + " " + index.StationName.Zh_tw;
                            Station_Address[i] = index.StationAddress;
                        }
                        else 
                        {
                            return true;
                        }
                    })
        }});
});

document.addEventListener('keydown',Setting,false);

function Setting()
{
$(function () 
{
    var NUM2 = 0;

    for (var i = 0; i <= 20; i++)
    {
        $("#EXTEND").append(Station_Name[i] + "<br>");

        for (var j = -1; j < i; j++)
        {
            if (i == 20)
            {
                break;
            }
            if (Station_Fares[NUM2] < 100)
            {
                $("#EXTEND").append(Station_Fares[NUM2] + "　　　 ");
            }
            else
            {
                $("#EXTEND").append(Station_Fares[NUM2] + "　　　");
            }

            NUM2++;
        }
    }

    $("#RESULT").append("<br></br>")

    for (var i = 0; i <= 20; i++) 
    {
        if (i == 20) 
        {
            $("#RESULT").append('<center>' + Station_Name[i] + '（' + Station_Address[i]+ '）'+ '</center>');
        }
        else 
        {
            $("#RESULT").append('<center>' + Station_Name[i] + '（' + Station_Address[i] + '）' + '</center>' + '<br></br>'
                +'<center>' + '票價:NT$ ' + Fare_Array[i] + '<font color="#FF0000">' + '　▼　' + '</font>'
                + '時間: ' + TravelTime_Array[i] / 60 + " 分 " + TravelTime_Array[i] % 60 + " 秒" + '<br></br>' + '</center>');
        }
    }
});
document.removeEventListener('keydown',Setting,false);
};

function GetAuthorizationHeader() 
{
    var AppID = 'FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF';
    var AppKey = 'FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF';

    var GMTString = new Date().toGMTString();
    var ShaObj = new jsSHA('SHA-1', 'TEXT');
    ShaObj.setHMACKey(AppKey, 'TEXT');
    ShaObj.update('x-date: ' + GMTString);
    var HMAC = ShaObj.getHMAC('B64');
    var Authorization = 'hmac username=\"' + AppID + '\", algorithm=\"hmac-sha1\", headers=\"x-date\", signature=\"' + HMAC + '\"';

    return { 'Authorization': Authorization, 'X-Date': GMTString /*,'Accept-Encoding': 'gzip'*/}; //如果要將js運行在伺服器，可額外加入 'Accept-Encoding': 'gzip'，要求壓縮以減少網路傳輸資料量
}