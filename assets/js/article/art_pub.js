$(function () {
    let layer = layui.layer;
    let form = layui.form;


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

    initEditor();
    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options);

    $('#btnChooseImage').on('click', function () {
        $('#file').click();
    });

    $('#file').on('change', function (e) {
        e.preventDefault();
        let file = e.target.files[0]
        if (file == undefined) {
            return '选照片！！！'
        };
        let newImgURL = URL.createObjectURL(file)

        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    });

    let state = '已发布';
    $('#btnSave2').on('click', function () {
        state = '草稿';
    });

    $('#form-pub').on('submit', function (e) {
        e.preventDefault();
        let fd = new FormData(this);
        fd.append('state', state);
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {       // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                fd.append('cover_img', blob);

                publishArticle(fd);
            });
    });

    function publishArticle(fd) {
        $.ajax({
            url: '/my/article/add',
            type: 'post',
            processData: false,
            contentType: false,
            data: fd,
            success: (res) => {
                if (res.status != 0) {
                    return layer.msg(res.message, { icon: 5 });
                };
                layer.msg('发布成功!', { icon: 6 });
                setTimeout(function () {
                    window.parent.document.querySelector('#art_list').click();
                }, 1500)
            }
        })
    };


})

