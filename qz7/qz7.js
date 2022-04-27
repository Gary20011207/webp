var Data_Station_Name = [];
var Data_Station_No = [];
var Data_Rain = [];

$(function ()
{
    $.ajax(
    {
        type: 'GET',
        url: 'https://cors-anywhere.herokuapp.com/https://wic.heo.taipei/OpenData/API/Rain/Get?stationNo=&loginId=open_rain&dataKey=85452C1D',
        dataType: 'json',
        headers: GetAuthorizationHeader(),
        success: 
            function(result)
            {
                for(var i = 0 ;i < 170; i++)
                {
                    Data_Station_Name[i] = result.data[i].stationName;

                    Data_Station_No[i] = result.data[i].stationNo;

                    Data_Rain[i] = result.data[i].rain;

                    $("#contain").append(Data_Station_Name[i] + ' (' + Data_Station_No[i] + ')' + '<br></br>'
                    + '降雨量: ' + '<font color="#FF0000">' + Data_Rain[i] + ' mm' + '</font>' + '<br></br>'
                    );
                };
            }
    });
});

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
};