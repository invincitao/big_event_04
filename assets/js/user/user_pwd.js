$(function () {
    let layer = layui.layer;
    let form = layui.form;
    // 自定义规则
    form.verify({
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
        ],
        samePwd: function (value) {
            if (value == $('[name=oldPwd]').val().trim()) {
                return '与原密码相同'
            }
        },
        rePwd: function (value) {
            if (value != $('[name=newPwd]').val().trim()) {
                return '两次输入的新密码不一致'
            }
        }
    });

    // 修改密码
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            url: '/my/updatepwd',
            type: 'post',
            data: $(this).serialize(),
            success: (res) => {
                // console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.message, { icon: 5 });
                }
                layer.msg('修改成功', { icon: 6 });
                $('form')[0].reset();
                localStorage.removeItem('mytoken');
                location.href = '/login.html';
            }
        })
    })

})