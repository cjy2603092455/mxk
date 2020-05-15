$('.myScn').mouseenter(() => {
    $('.myScnList').css({
        'display': 'block'
    })
})
$('.myScn').mouseleave(() => {
    $('.myScnList').css({
        'display': 'none'
    })
})
$('.help').mouseenter(() => {
    $('.helpZ').css({
        'display': 'block'
    })
})
$('.help').mouseleave(() => {
    $('.helpZ').css({
        'display': 'none'
    })
})

// 购物车数量按钮
function xiaoji($a, count) {
    //单价
    let dj = parseInt($a.parent().prev().find('span').eq(0).html())
    let xj = dj * count     //小计
    $a.parent().next().next().find('span').eq(0).html(xj)
    //总计
    let zongji = 0
    for (let i = 0; i < $('.count2').length; i++) {
        zongji += parseInt($('.xiaoji').eq(i).html())
    }
    $('.zong').eq(0).html('￥' + zongji + '.00')
}


//cookie
function getUserName() {
    let username = getCookie('username')

    if (username) {
        $('#index_username').html(', ' + username)
        $('#index_username').css({
            'color': '#f60'
        })
        $('#btnLogout').css({
            'display': 'inline'
        })
    } else {
        $('#index_username').html('登入名鞋库')
    }
}

//显示购物车
function getShoppingCart(cb) {
    $.get('./php/getShoppingCart.php', {
        'vipName': getCookie('username')
    }, function (datas) {
        let htmlStr = `
            <caption>我的购物车</caption>
            <tr class="first_h">
                <th>商品信息</th>
                <th>赠送积分</th>
                <th>销售价格</th>
                <th>数量</th>
                <th>优惠折扣</th>
                <th>小计</th>
                <th>操作</th>
            </tr>
        `
        datas.forEach(goods => {
            htmlStr += `
                <tr>
                    <td class="sp_message">
                        <img src="${goods.goodsImg}" alt="">
                        <a href="details.html">
                            ${goods.goodsDesc}
                            <br>
                            <span>( ${goods.beiyong5} )</span>
                        </a>
                    </td>
                    <td>
                        <span class="jifen">0</span>
                    </td>
                    <td>
                        ￥<span class="danjia">${goods.goodsPrice}</span>.00
                    </td>
                    <td>
                        
                        <span class="jian">-</span>
                        <input class="count2" type="text" value="${goods.goodsCount}">
                        <span class="jia">+</span>
                        <p style="position:absolute;opacity:0;">${goods.goodsId}</p>
                    </td>
                    <td>-</td>
                    <td>
                        $<span class="xiaoji">${goods.goodsPrice * goods.goodsCount}</span>.00
                    </td>
                    <td class="caozuo">
                        <a href="#" class="shoucang">收藏</a href="#">
                        <br>
                        <a href="#" class="del">删除</a href="#">
                    </td>
                </tr>
            `
        })
        $('.car_tab').html(htmlStr)

        //获取到商品后添加各种事件
        cb()

    }, 'json')
}

//购物车商品数量关联数据库
function updateCount(goodsId, goodsCount, cb) {
    $.get('./php/updateGoodsCount.php', {
        'vipName': getCookie('username'),
        'goodsId': goodsId,
        'goodsCount': goodsCount
    }, function (data) {
        if (data == 0) {
            alert('系统繁忙，修改商品数量失败')
        } else {
            cb && cb()
        }
    })
}

//删除 关联数据库
function delShopping(goodsId, cb) {
    $.get('./php/deleteGoods.php', {
        'vipName': getCookie('username'),
        'goodsId': goodsId
    }, function (data) {
        if (data == 0) {
            alert('系统繁忙，修改商品数量失败')
        } else {
            cb && cb()
        }
    })
}


$(function () {
    //获取购物车
    getShoppingCart(addEvent)

    function addEvent() {
        let jianshu = 0
        let zongji = 0
        for (let i = 0; i < $('.count2').length; i++) {
            jianshu += parseInt($('.count2').eq(i).val())
            zongji += parseInt($('.xiaoji').eq(i).html())
        }
        $('.shuliang').eq(0).html(jianshu)
        $('.zong').eq(0).html('￥' + zongji + '.00')

        //点击减少按钮
        $('.jian').click((event) => {
            let goodsId = $(event.target).parent().find('p').html()
            let count = parseInt($(event.target).next().val())
            count--
            if (count < 1) {
                count = 1
                return
            }

            //修改后端的数量,有异步的操作，把前端修改数量放在回调函数中，后端修改成功在修改前端的数量
            updateCount(goodsId, count, function () {
                //前端修改的数量
                $(event.target).next().val(count)
                xiaoji($(event.target), count)
                let jianshu = $('.shuliang').eq(0).html()
                jianshu--
                $('.shuliang').eq(0).html(jianshu)
            })
        })
        $('.jia').click((event) => {
            let goodsId = $(event.target).parent().find('p').html()
            let count = parseInt($(event.target).prev().val())
            count++
            if (count > 99) {
                count = 99
                return
            }
            updateCount(goodsId, count, function () {
                $(event.target).prev().val(count)
                xiaoji($(event.target), count)
                let jianshu = $('.shuliang').eq(0).html()
                jianshu++
                $('.shuliang').eq(0).html(jianshu)
            })
        })

        //删除
        $('.del').click(function (event) {
            if (confirm('真的要删除吗')) {
                let goodsId = $(event.target).parent().parent().find('p').html()
                console.log(goodsId)
                delShopping(goodsId, function () {
                    location.reload()
                })
            }

        })
        //直接在input的框中输入数量
        $('.count2').on('blur', (event) => {
            let goodsId = $(event.target).parent().find('p').html()
            let count = parseInt($(event.target).val())
            if (count < 1) {
                count = 1
            }
            if (count > 99) {
                count = 99
            }

            updateCount(goodsId, count, () => {
                $(event.target).val(count)
                xiaoji($(event.target), count)

                let jianshu = 0
                for (let i = 0; i < $('.count2').length; i++) {
                    jianshu += parseInt($('.count2').eq(i).val())
                }
                $('.shuliang').eq(0).html(jianshu)
            })
        })
    }


    //获取cookie
    getUserName()
    $("#btnLogout").click(function () {
        // 删除cookie
        removeCookie("username")
        //location.reload()
    })

})