// //后端验证用户名是否存在
function hasUser() {
    $.get('./php/checkUser.php',
        {
            'username': $('#reg_username').val()
        },
        function (str) {
            console.log(str)
            if (str == '1') {
                $('#hint1').html('用户名已存在')
                $('#hint1').css({
                    'color': 'red'
                })
                console.log(str)
                isRight[3] = 0
            } else if (str == '0') {
                $('#hint1').html('用户名可以使用')
                isRight[3] = 1
            } else {
                $('#hint1').html('服务器出错')
            }
        }
    )
}

//随机数
function getCode(n){
    let str = ''
    for(let i=0;i<n;i++){
        str+=parseInt(Math.random()*10)
    }
    return str
}



//isRight = [1,1,1,1]的情况下才允许发送注册
var isRight = [0, 0, 0, 0, 0]

$('#reg_username').blur(function () {
    //6-16为数字字母下划线组成，不能以数字开头
    let reg = /^[_a-zA-Z]\w{5,15}$/
    if (reg.test($('#reg_username').val())) {
        $('#username').next().html('√')
        isRight[0] = 1
        hasUser()       //前端验证通过才进行后端验证
    } else {
        $('#hint1').html('×,格式错误')
        isRight[0] = 0 
    }
})



$('#reg_userpass').blur(function () {
    //6-16为数字字母下划线组成，不能以数字开头
    //console.log($('#reg_userpass').val())
    let reg = /^[\da-zA-Z]{6,15}$/
    if (reg.test($('#reg_userpass').val())) {
        $('#hint2').html('√')
        isRight[1] = 1
    } else {
        $('#hint2').html('×,格式错误')
        isRight[1] = 0
    }
})

$('#reg_userpass').blur(function () {
    $('#reg_userpass2').val('')
    isRight[2] = 0
})

//判断两次的密码是否一致  但是前提要输入的密码符合规范
$('#reg_userpass2').blur(function () {
    let reg = /^[\da-zA-Z]{6,15}$/
    if (reg.test($('#reg_userpass2').val())) {
        $('#hint3').html('√')
        isRight[2] = 1
    } else {
        $('#hint3').html('×,格式错误')
        isRight[2] = 0
        return
    }
    if ($('#reg_userpass').val() == $('#reg_userpass2').val()) {
        $('#hint3').html('√')
        isRight[2] = 1
    } else {
        $('#hint3').html('两次密码不一致')
        isRight[2] = 0
    }
})

$('.code').find('input').blur(function(){
    if($('.code').find('span').eq(0).html() != $('.code').find('input').val()){
        alert('验证码错误')
        isRight[3] = 0
        return
    }else{
        isRight[3] = 1
    }
})

//使用ajax注册
$('#regBtn').click(function () {
    //前端验证通过  isright = [1,1,1,0]
    //后端验证通过  isRight = [1,1,1,1]

    if($('#reg_username').val() == ''){
        alert('用户名不能为空')
        return
    }

    if($('#reg_userpass').val() == ''){
        alert('密码不能为空')
        return
    }

    if($('#reg_userpass2').val() == ''){
        alert('重复密码不能为空')
        return
    }
    if($('.code').find('span').eq(0).html() != $('.code').find('input').val()){
        alert('验证码错误')
        return
    }



    let sum = 0
    isRight.forEach(item => { sum += item })
    if (sum == 4) {

        $.post('./php/regSave.php',
            {
                'username': $('#reg_username').val(),
                'userpass': $('#reg_userpass').val()
            },
            function (str) {
                if (str == '1') {
                    $('#hint4').html("注册成功，请<a href='login.html'>登入</a>")
                } else if (str == '0') {
                    $('#hint4').html('注册失败,请重新<ahref="reg.html">注册</a>')
                }
            }
        )
    } else {
        $('#hint4').html('注册失败,请重新<ahref="reg.html">注册</a>')
    }
})


$(function(){
    $('.code').find('span').eq(0).html(getCode(4))
    $('.code').find('span').eq(1).click(function(){
        $('.code').find('span').eq(0).html(getCode(4))
    })
})