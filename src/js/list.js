//n_select
class Select1 {
    constructor(boxDom, obj) {
        this.boxDom = $(boxDom)
        let defaultObj = {
            content: ['类型', ['鞋子', '服装', '配件']],
            count: ['216', '280', '7'],
            ddWidth: 110,
            ddHeight: 23,
        }
        for (let key in defaultObj) {
            this[key] = obj[key] == undefined ? defaultObj[key] : obj[key]
        }
        this.oDl = $(document.createElement('dl'))
        this.oDt = $(document.createElement('dt'))


        this.createDom()
        this.addEvent()
    }

    createDom() {

        //多选按钮
        let oDiv = document.createElement('div')
        $(oDiv).css({
            'position': 'absolute',
            'top': '11px',
            'right': '58px',
            'color': '#666',
            'line-height': '16px',
            'padding': ' 0 5px 0 20px',
            'background': '#eee url(./images/list_icon.png) no-repeat 5px -364px',
            'border': '1px solid #ddd',
            'cursor': 'pointer',
        })
        $(oDiv).html('多选')
        this.oDl.append(oDiv)


        this.oDl.css({
            'display': 'block',
            'padding': '12px 110px 4px 75px',
            'border-bottom': '1px dotted #ccc',
            'position': 'relative',
            'white-space': 'nowrap',
            'zoom': '1',
        })
        this.oDl.addClass('clear_fix')
        this.boxDom.append(this.oDl)

        this.oDt.css({
            'display': 'block',
            'width': '65px',
            'position': 'absolute',
            'left': '0',
            'top': '12px',
            'text-align': 'right',
            'color': '#888'
        })
        this.oDt.html(this.content[0] + ':')
        this.oDl.append(this.oDt)

        let ddCount = this.content[1].length
        for (let i = 0; i < ddCount; i++) {
            let oDd = $(document.createElement('dd'))
            let oA = $(document.createElement('a'))
            let oSpan = $(document.createElement('span'))

            $(oDd).css({
                'width': this.ddWidth,
                'height': this.ddHeight,
                'float': 'left',
                'white-space': 'nowrap'
            })
            $(oA).css({
                'color': '#333',
                'font-size': '12px',
                'cursor': 'pointer'
            })
            $(oSpan).css({
                'color': '#999'
            })

            $(oSpan).html('(' + this.count[i] + ')')
            $(oA).html(this.content[1][i])

            $(oA).append($(oSpan))
            $(oDd).append($(oA))
            this.oDl.append($(oDd))
        }
    }

    addEvent() {
        $(this.oDl).find('a').mouseover(function (event) {
            $(event.currentTarget).css({
                'color': 'red',
                'text-decoration': 'underline'
            })
            $(event.currentTarget).children('span').css({
                'color': 'red'
            })
        })
        $(this.oDl).find('a').mouseleave(function (event) {
            $(event.currentTarget).css({
                'color': '#333',
                'text-decoration': 'none'
            })
            $(event.currentTarget).children('span').css({
                'color': '#333'
            })
        })
    }
}
//价格 销量  排序图标
//自定义属性  属性值为down和up
$('.change_sort').attr('sortA', 'down')
$('.change_sort').click(function (event) {
    $('.change_sort').css({
        'background': '#ccc url(./images/list_icon.png)no-repeat 34px -159px',
        'color': '#666'
    })
    if ($('.change_sort').attr('sortA') == 'down') {
        $(event.currentTarget).css({
            'background': '#f60 url(./images/list_icon.png)no-repeat 34px -203px',
            'color': 'white'
        })
        $('.change_sort').eq(0).css({
            'display': 'inline-block',
            'background': '#ccc'
        })
        $('.change_sort').attr('sortA', 'up')
        return
    }
    if ($('.change_sort').attr('sortA') == 'up') {
        $(event.currentTarget).css({
            'background': '#f60 url(./images/list_icon.png)no-repeat 34px -181px',
            'color': 'white'
        })
        $('.change_sort').eq(0).css({
            'display': 'inline-block',
            'background': '#ccc'
        })
        $('.change_sort').attr('sortA', 'down')
    }
})
$('.change_sort').eq(0).click(function (event) {
    $(event.target).css({
        'display': 'none'
    })
})

//...............................
//商品列表
//从后端获取所有的商品
function getGoods() {
    $.get('./php/getGoodsList.php', function (data) {
        showDate(data)
    }, 'json')
}

//显示商品
function showDate(data) {
    let htmlStr = ''
    let count = 0       //计数 产生一个dl就+1一次  计算商品的数量
    data.forEach((item) => {
        count++
        htmlStr += `
            <dl class='pro_box'>
                <dt>
                    <a href="details.html?goodsId=${item.goodsId}">
                        <img src="./${item.goodsImg}" alt="">
                    </a>
                    <div class="ps_wrap">
                        <ul>
                            <li>
                                <img src="./${item.goodsImg}" alt="">
                            </li>
                            <li>
                                <img src="./${item.beiyong1}" alt="">
                            </li>
                            <li>
                                <img src="./${item.beiyong2}" alt="">
                            </li>
                            <li>
                                <img src="./${item.beiyong3}" alt="">
                            </li>
                            <li>
                                <img src="./${item.beiyong4}" alt="">
                            </li>
                        </ul>
                    </div>
                </dt>
                <dd>
                    <ul class="data">
                        <li>
                            <span class="price1">￥${item.goodsPrice}.00</span>
                            <span class="priceOld">￥${item.beiyong6}.00</span>
                            &nbsp;
                            <span class="color1">${item.beiyong5}</span>
                        </li>
                        <li>
                            <span class="brank1">${item.goodsName}</span>
                            
                        </li>
                        <li>
                            已经售出
                            <span class="count1">${item.goodsCount}</span>
                            件
                        </li>
                    </ul>
                </dd>
            </dl>
        `
        $('#list_box').html(htmlStr)
        $('#count_all1').html(count)    //商品的总数量
    })
}





//...............................

$(function () {
    let box1 = document.getElementById('n_select')
    //console.log(box1)
    new Select1(box1, {})
    new Select1(box1, {
        content: ['类别', ['跑步鞋', '休闲鞋', '篮球鞋', '板鞋', '户外鞋', '帆布鞋', 'T恤', 'POLO衫', '运动裤']],
        count: ['38', '72', '8', '52', '1', '6', '42', '4', '67']
    })
    new Select1(box1, {
        content: ['性别', ['男', '女', '情侣']],
        count: ['263', '194', '46']
    })
    new Select1(box1, {
        content: ['类别', ['跑步鞋', '休闲鞋', '篮球鞋', '板鞋', '户外鞋', '帆布鞋', 'T恤', 'POLO衫', '运动裤']],
        count: ['38', '72', '8', '52', '1', '6', '42', '4', '67']
    })
    new Select1(box1, {
        content: ['类别', ['跑步鞋', '休闲鞋', '篮球鞋', '板鞋', '户外鞋', '帆布鞋', 'T恤', 'POLO衫', '运动裤']],
        count: ['38', '72', '8', '52', '1', '6', '42', '4', '67']
    })
    new Select1(box1, {
        content: ['类别', ['跑步鞋', '休闲鞋', '篮球鞋', '板鞋', '户外鞋', '帆布鞋', 'T恤', 'POLO衫', '运动裤']],
        count: ['38', '72', '8', '52', '1', '6', '42', '4', '67']
    })
    new Select1(box1, {
        content: ['类别', ['跑步鞋', '休闲鞋', '篮球鞋', '板鞋', '户外鞋', '帆布鞋', 'T恤', 'POLO衫', '运动裤']],
        count: ['38', '72', '8', '52', '1', '6', '42', '4', '67']
    })

    //展开收起  隐藏第三个以后的dl
    function listm() {
        let dlCount = $('#n_select').children('dl').length
        // console.log(dlCount)
        $('#n_select').find('dl').css({
            'display': 'none'
        })
        for (let i = 0; i < 3; i++) {
            $('#n_select').find('dl').eq(i).css({
                'display': 'block'
            })
        }
    }
    listm()
    $('.open').click(function () {
        if ($('.open').children('span').text() == '展开') {
            $('#n_select').find('dl').css({
                'display': 'block'
            })
            $('.open').children('span').text('收起')
            return
        }
        if ($('.open').children('span').text() == '收起') {
            listm()
            $('.open').children('span').text('展开')
            return
        }
    })
    //发送请求---获得所有的商品
    getGoods()
})