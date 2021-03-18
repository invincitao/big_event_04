$(function () {
    // 渲染
    getUserInfo();

    // 退出
    $('#btnLogout').on('click', function () {
        layer.confirm('退出登录了哦?', { icon: 3, title: '提示' }, function (index) {
            //do something
            localStorage.removeItem('mytoken');
            location.href = '/login.html';
            layer.close(index);
        });
    })
})
let layer = layui.layer;
function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        type: 'get',
        // headers: {
        //     Authorization: localStorage.getItem('mytoken') || ''
        // },
        // complete: function (res) {
        //     let obj = res.responseJSON;
        //     if (obj.status == 1 && obj.message == '身份认证失败！') {
        //         localStorage.removeItem('mytoken');
        //         location.href = '/login.html';
        //     }
        // },
        success: (res) => {
            // console.log(res);
            if (res.status != 0) {
                return layer.msg(res.message, { icon: 5 });
            };
            // 成功渲染页面
            renderAvatar(res.data);
        }
    })
}
function renderAvatar(user) {
    let name = user.nickname || user.username;
    // console.log(name);
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
    // 有头像
    if (user.user_pic !== null) {
        $('.layui-nav-img').show().attr('src', user.user_pic);
        $('.text-avatar').hide();
    } else {
        $('.layui-nav-img').hide();
        let text = name[0].toUpperCase();
        $('.text-avatar').show().html(text);
    }
}