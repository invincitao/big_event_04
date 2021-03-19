$(function () {
    let layer = layui.layer;
    let form = layui.form;
    template.defaults.imports.dateFormat = function (dateStr) {
        let dt = new Date(dateStr);

        let y = dt.getFullYear();
        let m = addZero(dt.getMonth() + 1);
        let d = addZero(dt.getDate());
        let hh = addZero(dt.getHours());
        let mm = addZero(dt.getMinutes());
        let ss = addZero(dt.getSeconds());

        return `${y}-${m}-${d}  ${hh}:${mm}:${ss}`;
    }

    function addZero(num) {
        return num < 10 ? '0' + num : num;
    }

    let q = {
        pagenum: 1,
        pagesize: 3,
        cate_id: "",
        state: ""
    }
    initTable();
    function initTable() {
        $.ajax({
            url: '/my/article/list',
            type: 'get',
            data: q,
            success: (res) => {
                if (res.status != 0) {
                    return layer.msg(res.message, { icon: 5 });
                };
                let htmlStr = template('tpl-list', { data: res.data });
                $('tbody').html(htmlStr);
                renderPage(res.total);
            }
        })
    };
    initCate();
    function initCate() {
        $.ajax({
            url: '/my/article/cates',
            type: 'get',
            success: (res) => {
                if (res.status != 0) {
                    return layer.msg(res.message, { icon: 5 });
                };
                let htmlStr = template('tpl-cate', { data: res.data });
                $('[name=cate_id]').html(htmlStr);
                form.render();
            }
        })
    };

    // 查询
    $('#form-search').on('submit', function (e) {
        e.preventDefault();
        let cate_id = $('[name=cate_id]').val();
        let state = $('[name=state]').val();

        q.cate_id = cate_id;
        q.state = state
        initTable();
    });
    // 分页
    let laypage = layui.laypage;
    function renderPage(total) {
        // alert(total);
        laypage.render({
            elem: 'pageBox', //注意，这里的 test1 是 ID，不用加 # 号
            count: total, //数据总数，从服务端得到
            limit: q.pagesize,
            curr: q.pagenum,
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],
            jump: function (obj, first) {
                //obj包含了当前分页的所有参数，比如：
                q.pagenum = obj.curr;
                q.pagesize = obj.limit;
                //首次不执行
                if (!first) {
                    //do something
                    initTable();
                }
            }
        });
    };

    // 删除
    $('tbody').on('click', '.btn-delete', function () {
        let id = $(this).attr('data-id');

        layer.confirm('删除了哦?', { icon: 3, title: '提示' }, function (index) {
            //do something
            $.ajax({
                url: '/my/article/delete/' + id,
                type: 'get',
                success: (res) => {
                    // console.log(res);
                    if (res.status != 0) {
                        return layer.msg(res.message, { icon: 5 });
                    };
                    layer.msg('删除成功', { icon: 6 });
                    if ($('.btn-delete').length == 1 && q.pagenum > 1) q.pagenum--;
                    initTable();
                }
            })
            layer.close(index);
        });

    })
})

