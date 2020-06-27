$(function () {
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    const form = layui.form
    const layer = layui.layer

    form.verify({
        // pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能有空格'],
        // pwd: value => {
        //         const reg = /^[\S]{6,12}$/
        //         if (!reg.test(value)) {
        //             return '密码必须6到12位，且不能有空格'
        //         }
        //     }
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致！'
            }
        }
    })

    // 监听注册表单的提交事件
    $('#form_reg').on('submit', e => {
        e.preventDefault()
        const inputParams = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }
        $.post('/api/reguser', inputParams, res => {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg('注册成功，请登录')
            // 模拟点击行为
            $('#link_login').click()
        })
    })
    // 监听登录表单的提交事件
    $('#form_login').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'post',
            data: $(this).serialize(),
            success: res => {
               
                if (res.status !== 0) {
                    return layer.msg('登录失败')
                }
                layer.msg('登录成功')

                localStorage.setItem('token', res.token)

                location.href = '/index.html'
            }
        })
    })
})


