$(function () {
    var form = layui.form

    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        samePwd: function (value) {
            if (value === $('[name=oldPwd]').val()) {
                return '新旧密码不能相同'
            }
        },
        rePwd: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次密码不一致'
            }
        }
    })

    $('.layui-form').on('submit', function (e) {
        e.preventDefault()

        let params = $(this).serialize().split('&')
        // console.log(params);
        params.length = 2
        // console.log(params);
        $.ajax({
            method: 'post',
            url: '/my/updatepwd',
            data: params.join('&'),
            success: function (res) {
                console.log(res);

                if (res.status !== 0) {
                    return layui.layer.msg('更新密码失败')
                }
                layui.layer.msg('更新密码成功')
                $('.layui-form')[0].reset()
            }
        })
    })
})


// $(function () {
//     var form = layui.form

//     form.verify({
//         pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
//         samePwd: function (value) {
//             if (value === $('[name=oldPwd]').val()) {
//                 return '新旧密码不能相同！'
//             }
//         },
//         rePwd: function (value) {
//             if (value !== $('[name=newPwd]').val()) {
//                 return '两次密码不一致！'
//             }
//         }
//     })

//     $('.layui-form').on('submit', function (e) {
//         e.preventDefault()
//         let data = form.val('formUserInfo')
//         delete data.rePwd
//         console.log(data);


//         $.ajax({
//             method: 'POST',
//             url: '/my/updatepwd',
//             data,
//             success: function (res) {
//                 console.log(res);

//                 if (res.status !== 0) {
//                     return layui.layer.msg('更新密码失败！')
//                 }
//                 layui.layer.msg('更新密码成功！')
//                 // 重置表单
//                 $('.layui-form')[0].reset()
//             }
//         })
//     })
// })
