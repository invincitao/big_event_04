$(function () {
    let layer = layui.layer;
    let form = layui.form;

    // 获取文章列表
    initCate();
    function initCate() {
        $.ajax({
            url: '/my/article/cates',
            type: 'get',
            success: (res) => {
                // console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.message, { icon: 5 });
                };
                let htmlStr = template('tpl-cate', { data: res.data })
                $('tbody').html(htmlStr);
            }
        })
    };

    // 增加文章
    let indexAdd = null;
    $('#btnAdd').on('click', function () {
        indexAdd = layer.open({
            type: 1,
            title: '添加文章分类',
            area: ['500px', '250px'],
            content: $('#tpl-add').html()
        });
    });
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault();
        $.ajax({
            url: '/my/article/addcates',
            type: 'post',
            data: $(this).serialize(),
            success: (res) => {
                // console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.message, { icon: 5 });
                };
                initCate();
                layer.msg('添加成功', { icon: 6 });
                $('#form-add')[0].reset();
                layer.close(indexAdd);
            }
        })
    })
    // 编辑
    let indexEdit = null;
    $('tbody').on('click', '.btn-edit', function () {
        indexEdit = layer.open({
            type: 1,
            title: '添加文章分类',
            area: ['500px', '250px'],
            content: $('#tpl-edit').html()
        });
        let id = $(this).attr('data-id');
        // alert(id);
        $.ajax({
            url: '/my/article/cates/' + id,
            type: 'get',
            success: (res) => {
                // console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.message, { icon: 5 });
                };
                form.val('form-edit', res.data);
            }
        })
    });

    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault();
        $.ajax({
            url: '/my/article/updatecate',
            type: 'post',
            data: $(this).serialize(),
            success: (res) => {
                if (res.status != 0) {
                    return layer.msg(res.message, { icon: 5 });
                };
                initCate();
                layer.msg('修改成功', { icon: 6 });
                layer.close(indexEdit);
            }
        })
    });
    // 删除
    $('tbody').on('click', '.btn-delete', function () {
        let id = $(this).attr('data-id')
        layer.confirm('删除了哦，请军慎重考虑?', { icon: 3, title: '提示' }, function (index) {
            console.log(id);
            $.ajax({
                url: '/my/article/deletecate/' + id,
                type: 'get',
                success: (res) => {
                    if (res.status != 0) {
                        return layer.msg(res.message, { icon: 5 });
                    };
                    initCate();
                    layer.msg('删除成功', { icon: 6 });
                    layer.close(index);
                }
            })
        });
    })
})

