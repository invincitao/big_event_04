$(function () {
    $('#reg_link').on('click', function () {
        $('.reg_box').show();
        $('.login_box').hide();
    });
    $('#login_link').on('click', function () {
        $('.login_box').show();
        $('.reg_box').hide();
    });

    let layer = layui.layer;
    let form = layui.form;
    // 自定义规则
    form.verify({
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            let pwd = $('.reg_box input[name=password]').val();
            if (value != pwd) {
                return '两次密码不一致'
            }
        }
    });
    // 注册功能
    $('#form_reg').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            url: 'http://ajax.frontend.itheima.net/api/reguser',
            type: 'post',
            data: {
                username: $('.reg_box input[name=username]').val().trim(),
                password: $('.reg_box input[name=password]').val().trim(),
            },
            success: (res) => {
                // console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.message, { icon: 5 });
                }
                layer.msg('注册成功,请登录', { icon: 6 });

                $('#login_link').click();
                $('#form_reg')[0].reset();
            }
        })
    });

    // 登录
    $('#form_login').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            url: 'http://ajax.frontend.itheima.net/api/login',
            type: 'post',
            data: $(this).serialize(),
            success: (res) => {
                //   console.log(res);
                layer.msg('登录成功', { icon: 6 });
                localStorage.setItem('mytoken', res.token);
                location.href = '/index.html';
            }
        })
    })
})