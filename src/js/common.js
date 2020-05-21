// logo
$('.logo_center').children('input').eq(0).keyup(function () {
    $.ajax({
        "url": "https://suggest.taobao.com/sug",
        "data": {
            "code": "utf-8",
            "_ksTS": "1515120676355_323",
            "area": "c2c",
            "bucketid": 15,
            "q": this.value
        },
        success: function (data) {
            console.log("成功了");
            let htmlStr = "";
            data.result.forEach(item => {
                // item:是result数组的每个元素
                htmlStr += `<li>${item[0]}</li>`;
            });
            $("#search-list").html(htmlStr);
        },
        "dataType": "jsonp",
    })
})
 


//二级导航
$('.all_li').css({
    'display': 'none'
})
$('.nav-wrap>li:eq(0)').mouseenter(function () {
    $('.all_li').css({
        'display': 'block'
    })
})
$('.nav-wrap>li:eq(0)').mouseleave(function () {
    $('.all_li').css({
        'display': 'none'
    })
})

$('.all_li>li>span').css({
    'display': 'none'
})
$('.li_three').css({
    'display': 'none'
})
$('.all_li>li').mouseenter(function (event) {
    $(event.target).children('span').css({
        'display': 'block'
    })
    $(event.target).css({
        'font-size': '14px',

    })
    $(event.target).children('.li_three').css({
        'display': 'block'
    })
})
$('.all_li>li').mouseleave(function () {
    $(event.target).children('span').css({
        'display': 'none'
    })
    $(event.target).css({
        'font-size': '14px',
    })
    $(event.target).children('.li_three').css({
        'display': 'none'
    })
})

// 三级导航

class liThree {
    constructor(boxDom, obj) {
        this.boxDom = boxDom  //盒子
        //this.oDiv = document.createElement('div')
        //this.oH4 = document.createElement('h4')
        //this.oSpan = document.createElement('span')

        let defaultObj = {
            h4Content: ['运动男鞋'],
            spanContent: [['休闲鞋', '训练鞋', '帆布鞋', '板鞋', '网球鞋']]
        }
        for (let key in obj) {
            defaultObj[key] = obj[key]
        }
        for (let key in defaultObj) {
            this[key] = defaultObj[key]
        }
        this.createDom()
    }
    createDom() {
        //创建div
        for (let i = 0; i < this.h4Content.length; i++) {
            let oDiv = document.createElement('div')
            oDiv.style.cssText = `
            width:280px;
            margin-bottom:5px;
        `
            this.boxDom.appendChild(oDiv)
            //$(this.boxDom).append($(oDiv))

            let oH4 = document.createElement('h4')
            oH4.style.cssText = `
                font-weight: 600;
                padding-left:10px;
                font-size:16px;
                color:black;
                line-height:16px;
            `
            oH4.innerText = this.h4Content[i]
            oDiv.appendChild(oH4)

            let oSpanMore = document.createElement('span')
            oSpanMore.style.cssText = `
                float:right;
                font-weight: 400;
                margin-right:5px;
                color:rgb(112, 104, 106);
                font-size:12px;
            `
            oSpanMore.innerText = '更多'

            oH4.appendChild(oSpanMore)

            let oHr = document.createElement('hr')
            oDiv.appendChild(oHr)

            let oP = document.createElement('p')
            oP.style.cssText = `
                line-height:20px;
                margin:12px 0;
            `
            oDiv.appendChild(oP)
            for (let j = 0; j < this.spanContent[i].length; j++) {
                let oSpan = document.createElement('span')

                oSpan.innerText = this.spanContent[i][j]
                oSpan.style.cssText = `
                    font-size:12px;
                    line-height:12px;
                    margin:0 3px;
                    color:rgb(41, 38, 38);
                    cursor: pointer;
                `
                oP.appendChild(oSpan)
            }
        }

    }
}


// footBrand
$('.f_top>a').css({
    'background-image': 'url(./images/trademark.png)',
    'background-position': '20px 466px'
})
$('.f_bot>a').css({
    'background-image': 'url(./images/trademark.png)',
    'background-position': '20px 466px'
})




let liDiv = document.getElementsByClassName('li_three')
new liThree(liDiv[0],
    {
        h4Content: ['运动男鞋', '运动女鞋', '搜索热词'],
        spanContent: [
            ['休闲鞋', '训练鞋', '帆布鞋', '板鞋', '网球鞋'],
            ['休闲鞋', '训练鞋', '健步鞋', '板鞋', '帆布鞋'],
            ['新品', '小白鞋', '情侣款', '内增高', '复古鞋', '三叶草']
        ]
    })
new liThree(liDiv[1],
    {
        h4Content: ['男子运动服', '女子运动女服', '热门搜索'],
        spanContent: [
            ['长袖T恤', '卫衣', '运动长裤', '外套'],
            ['长袖T恤', '卫衣', '运动长裤', '外套', '夹克'],
            ['鹿晗同款', '2017新品', '情侣款', '内增高', '复古鞋', '三叶草']
        ]
    })
new liThree(liDiv[2],
    {
        h4Content: ['运动男鞋', '运动女鞋', '搜索热词'],
        spanContent: [
            ['休闲鞋', '训练鞋', '帆布鞋', '板鞋', '网球鞋'],
            ['休闲鞋', '训练鞋', '健步鞋', '板鞋', '帆布鞋'],
            ['新品', '小白鞋', '情侣款', '内增高', '复古鞋', '三叶草']
        ]
    })
new liThree(liDiv[3],
    {
        h4Content: ['运动男鞋', '运动女鞋', '搜索热词'],
        spanContent: [
            ['休闲鞋', '训练鞋', '帆布鞋', '板鞋', '网球鞋'],
            ['休闲鞋', '训练鞋', '健步鞋', '板鞋', '帆布鞋'],
            ['新品', '小白鞋', '情侣款', '内增高', '复古鞋', '三叶草']
        ]
    })
new liThree(liDiv[4],
    {
        h4Content: ['运动男鞋', '运动女鞋', '搜索热词'],
        spanContent: [
            ['休闲鞋', '训练鞋', '帆布鞋', '板鞋', '网球鞋'],
            ['休闲鞋', '训练鞋', '健步鞋', '板鞋', '帆布鞋'],
            ['新品', '小白鞋', '情侣款', '内增高', '复古鞋', '三叶草']
        ]
    })
new liThree(liDiv[5],
    {
        h4Content: ['运动男鞋', '运动女鞋', '搜索热词'],
        spanContent: [
            ['休闲鞋', '训练鞋', '帆布鞋', '板鞋', '网球鞋'],
            ['休闲鞋', '训练鞋', '健步鞋', '板鞋', '帆布鞋'],
            ['新品', '小白鞋', '情侣款', '内增高', '复古鞋', '三叶草']
        ]
    })
new liThree(liDiv[6],
    {
        h4Content: ['运动男鞋', '运动女鞋', '搜索热词'],
        spanContent: [
            ['休闲鞋', '训练鞋', '帆布鞋', '板鞋', '网球鞋'],
            ['休闲鞋', '训练鞋', '健步鞋', '板鞋', '帆布鞋'],
            ['新品', '小白鞋', '情侣款', '内增高', '复古鞋', '三叶草']
        ]
    })

//cookie
function getUserName() {
    let username = getCookie('username')

    if (username) {
        $('#index_username').html(', ' + username)
        $('#btnLogout').css({
            'display': 'inline'
        })
        $('#index_login_li').css({
            'display': 'none'
        })
    } else {
        $('#index_username').html('登入名鞋库')
        $('#btnLogout').css({
            'display': 'none'
        })
        $('#index_login_li').css({
            'display': 'block'
        })
    }
}

$(function () {
    getUserName()

    $("#btnLogout").click(function () {
        // 删除cookie
        removeCookie("username")
        //location.reload()

        $('#index_username').html('登入名鞋库')
        $('#btnLogout').css({
            'display': 'none'
        })
        $('#index_login_li').css({
            'display': 'block'
        })
    })
})