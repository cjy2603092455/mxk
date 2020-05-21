$('.yanse,.chima').children('li').click((event) => {
    $(event.target).parent().children('li').css({
        'border': '1px #ccc solid'
    })
    $(event.target).css({
        'border': '2px solid orange'
    })
})

$('.quantity').next().click((event) => {
    let count = parseInt($('.quantity').val())
    count++
    if (count > 99) {
        count = 99
        return
    }
    console.log(count)
    $('.quantity').val(count)

    $('.shuliang').html($('.quantity').val())
})
$('.quantity').prev().click((event) => {
    let count = parseInt($('.quantity').val())
    count--
    if (count < 1) {
        count = 1
        return
    }
    console.log(count)
    $('.quantity').val(count)

    $('.shuliang').html($('.quantity').val())
})
$('.quantity').blur(() => {
    let count = parseInt($('.quantity').val())
    if (count < 1) {
        count = 1
    }
    if (count > 99) {
        count = 99
    }
    $('.quantity').val(count)
    $('.shuliang').html($('.quantity').val())
})


//根据goodsId获取商品详情
function getDate(goodsId) {
    //console.log(goodsId)
    $.get('./php/getGoodsInfo.php', 'goodsId=' + goodsId, function (data) {
        let img = JSON.parse(data)
        showDate(img)
    })
}
//商品详情的样式
function showDate(data) {
    //console.log(data)
    $('.pic_box').css({
        'background-image': `url(${data.goodsImg})`
    })
    $('#showBox').css({
        'background-image': `url(${data.goodsImg})`
    })
    $('#ulBox').find('img').eq(0).attr('src', data.goodsImg)
    $('#ulBox').find('img').eq(1).attr('src', data.beiyong1)
    $('#ulBox').find('img').eq(2).attr('src', data.beiyong2)
    $('#ulBox').find('img').eq(3).attr('src', data.beiyong3)
    $('#ulBox').find('img').eq(4).attr('src', data.beiyong4)

    $('.details_goodsDesc').html(data.goodsDesc)
    $('.old_price').html('￥' + data.beiyong6 + '.00')
    $('.goods_price').html(' ￥' + data.goodsPrice + '.00')
    $('.jiesheng').html(' 立省￥' + (data.beiyong6 - data.goodsPrice) + '.00')
    $('.goods_color').html(data.beiyong5)
}

//添加至购物车
function addShoppingCart(goodsId) {
    console.log(getCookie('username'))
    $.post('./php/addShoppingCart.php', {
        'vipName': getCookie('username'),
        'goodsId': goodsId,
        'goodsCount': $('.quantity').eq(0).val()
    }, (data) => { //1：表示添加成功  0：表示添加失败
        console.log(data)
        if (data === '0'){
            alert('添加失败')
            return
        }else{
            alert('添加成功')
        }
    })
}


//tab
new Tab('#tab-box', {})
$('.scn_fen').children('input').click(function (event) {
    $('.comment').find('tr').css({
        'display': 'none'
    })
    let a = $(event.target).attr('id') + '_show'
    $('tr[class=' + a + ']').css({
        'display': 'block'
    })
})




$(function () {
    //放大镜
    let oBox = document.getElementsByClassName('pic_box')[0]
    new Mirror(oBox, {
        width: 100,                   //放大镜的宽度
        height: 100,                 //放大镜的高度
        mutiple: 3,                  //倍率
        color: 'pink',                //放大镜的默认颜色
        opacity: 0.4,
        left: 0,                     //放大镜的默认位置
        top: 0,
    })

    //console.log(location.search)
    let goodsId = location.search.split('=')[1]    //获取商品编号

    getDate(goodsId)   //页面加载完毕  根据商品编号加载商品信息

    $('#btnAdd').click(function () {
        addShoppingCart(goodsId)
    })

    console.log($('.quantity').eq(0).val())
})