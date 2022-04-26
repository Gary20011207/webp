// S2STravelTime ���o���B�C�������B��ɶ����

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
            
                // console.log(TravelTime_Array);
            }
    });
});

// ODFare ���o���B�_�������������

var Fare_Array = [];
var NUM = 0;

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
                }
        });
});

// Station ���o���B�����򥻸��

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
    for (var i = 0; i <= 20; i++) 
    {
        if (i == 20) 
        {
            $("#RESULT").append('<center>' + Station_Name[i] + '�]' + Station_Address[i]+ '�^'+ '</center>');
        }
        else 
        {
            $("#RESULT").append('<center>' + Station_Name[i] + '�]' + Station_Address[i] + '�^' + '</center>' + '<br></br>'
                +'<center>' + '����:NT$ ' + Fare_Array[i] + '<font color="#FF0000">' + '�@���@' + '</font>'
                + '�ɶ�: ' + TravelTime_Array[i] / 60 + " �� " + TravelTime_Array[i] % 60 + " ��" + '<br></br>' + '</center>');
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

    return { 'Authorization': Authorization, 'X-Date': GMTString /*,'Accept-Encoding': 'gzip'*/}; //�p�G�n�Njs�B��b���A���A�i�B�~�[�J 'Accept-Encoding': 'gzip'�A�n�D���Y�H��ֺ����ǿ��ƶq
}