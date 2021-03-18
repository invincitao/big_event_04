$(function () {
    baseURL = 'http://api-breakingnews-web.itheima.net';

    $.ajaxPrefilter(function (options) {

        options.url = baseURL + options.url;


        options.headers = {
            Authorization: localStorage.getItem('mytoken') || ''
        }
        options.complete = function (res) {
            let obj = res.responseJSON;
            if (obj.status == 1 && obj.message == '身份认证失败！') {
                localStorage.removeItem('mytoken');
                location.href = '/login.html';
            }
        }
    })
})