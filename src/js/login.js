//随机数
function getCode(n) {
    let str = ''
    for (let i = 0; i < n; i++) {
        str += parseInt(Math.random() * 10)
    }
    return str
}
//验证码错误提示
$('.code').find('input').blur(function () {
    if ($('.code').find('span').eq(0).html() != $('.code').find('input').val()) {
        alert('验证码错误')
        return
    }
})

$('.code').find('span').eq(1).click(function () {
    $('.code').find('span').eq(0).html(getCode(4))
})
$(function () {
    //验证码
    $('.code').find('span').eq(0).html(getCode(4))
})

let myTimer = null  //防止启动多个定时器
$('.enterBtn').click(function () {
    if ($('#userId').val() == '') {
        alert('用户名不能为空')
        return
    }
    if ($('#passId').val() == '') {
        alert('密码不能为空')
        return
    }
    $.post(
        './php/loginCheck.php',
        {
            'username': $('#userId').val(),
            'userpass': $('#passId').val()
        },
        function (str) {
            if (str == '1') {
                let count = 5       //到计时  跳转至主页
                $('.login_hint').html(`登入成功！${count}s后跳转至<a href="index.html">首页</a>`)
                if (myTimer == null) {
                    myTimer = setInterval(() => {
                        count--
                        if (count == 1) {
                            clearInterval(myTimer)
                            myTimer = null
                            location.href = 'index.html'
                        }
                        addCookie('username', $('#userId').val(), 7)
                        $('.login_hint').html(`登入成功！${count}s后跳转至<a href="index.html">首页</a>`)
                    }, 1000)
                }
            } else if (str == '0') {
                $('.login_hint').html('登入失败！用户名或密码错误，请重新<a href="login.html">登入</a>')
            } else {
                $(".login_hint").html("登录失败，服务器出错了！")
            }
        }
    )

})