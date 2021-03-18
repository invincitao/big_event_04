$(function () {
    let layer = layui.layer;
    let form = layui.form;
    form.verify({
        nickname: function (value) {
            if (value.trim().length < 2 || value.trim().length > 6) {
                return '用户名名位2-6位';
            }
        }
    });

    // 渲染
    initUserInfo();
    function initUserInfo() {
        $.ajax({
            url: '/my/userinfo',
            type: 'get',
            data: {},
            success: (res) => {
                if (res.status != 0) {
                    return layer.msg(res.message, { icon: 5 });
                }
                form.val('formUserInfo', res.data);
            }
        })
    };
    // 重置表单
    $('#btnReset').on('click', function (e) {
        e.preventDefault();
        initUserInfo();
        // console.log(1);
    });

    // 修改用户信息
    $('form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            url: '/my/userinfo',
            type: 'post',
            data: $(this).serialize(),
            success: (res) => {
                // console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.message, { icon: 5 });
                }
                // 修改成功
                layer.msg('修改成功', { icon: 6 });
                window.parent.getUserInfo();
            }
        })
    })
})