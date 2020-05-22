//点击商品类型管理显示  显示商品类型管理表单
$('#btn_goodsType').click(function(){
    $('.show-box').children().css({
        'display':'none'
    })
    $('#addGoodsType').css({
        "display":'block'
    })
    $('title_h3').css({
        'display':"block"
    })
    $('.title_h3').html("商品类型管理&gt;&gt;")
})

//点击商品管理显示  显示商品管理表单
$('#btn_goods').click(function(){
    $('.show-box').children().css({
        'display':'none'
    })
    $('#addGoods').css({
        "display":'block'
    })
    $('title_h3').css({
        'display':"block"
    })
    $('.title_h3').html("商品管理&gt;&gt;")
})
//点击用户管理显示  显示用户管理表单
$('#btn_user').click(function(){
    $('.show-box').children().css({
        'display':'none'
    })
    $('#users').css({
        'display':"block"
    })
    $('title_h3').css({
        'display':"block"
    })
    $('.title_h3').html("用户管理&gt;&gt;")
})

function showData(data){
    data = JSON.parse(data)
    let htmlStr = `
        <tr>
            <td>用户编号</td>
            <td>账号</td>
        </tr>
    `
    let count = 0
    data.forEach(item=>{
        count++
        //console.log(item.username)
        htmlStr +=`
            <tr>
                <td>用户${count}:</td>
                <td>${item.username}</td>
            </tr>
        `
    }) 
    //console.log(htmlStr)
    $('#users').html(htmlStr)
    $('#users').css({
        'border-collapse': 'collapse'
    })
    $('#users').find('td').css({
        'border':'1px solid #ccc',
        "height":"30px",
        'width':'150px',
        "line-height":"30px",
        'text-align':'center'
    })
    
}

function showMsg(Num){
    $.get('./php/getGoodsList.php', function (str) {
        let data = JSON.parse(str)
        addMsg(data)
    })
}
function addMsg(data){
        let htmlStr = ''
        data.forEach(item=>{
            htmlStr += `
            <tr>
                <td>${item.goodsId}</td>
                <td>
                    ${item.goodsName}
                </td>
                <td>
                    ${item.goodsType}
                </td>
                <td>
                    ${item.beiyong6}
                </td>
                <td>
                    ${item.goodsPrice}
                </td>
                <td>
                    ${item.goodsCount}
                </td>
                <td>
                    ${item.goodsDesc}
                </td>
                <td class="img_show">
                    ${item.goodsImg}
                    <img src="./${item.goodsImg}" alt="">
                </td>
                <td>
                    <span class="delone">删除</span>
                </td>
            </tr>
            `
        })
        $('.goods_all').append(htmlStr)

        //给添加的元素设置样式
        $('.img_show').css({
            "position": "relative"
        })
        $('.img_show').find('img').css({
            'display':'none',
            "position": "absolute",
            'width':'150px',
            "height":'150px',
            'z-index':'2',
            'left':'150px',
            'top':'-50px'
        })
        //添加事件
        $('.img_show').mouseenter(function(event){
            $(event.target).find('img').css({
                'display':'block'
            })
        })
        $('.img_show').mouseleave(function(event){
            $(event.target).find('img').css({
                'display':'none'
            })
        })

        //删除事件
        $('.delone').css({
            'cursor':'pointer'
        })

        $('.delone').click(function(event){
            let goodsId = $(event.target).parent().parent().children().eq(0).text()
            console.log(goodsId)
            if(confirm('是否要删除商品')){
                $.get('./php/adminDelGoods.php' ,'goodsId='+goodsId,(str)=>{
                    console.log(str)
                    if(str){
                        $(event.target).parent().parent().remove()
                    }else(
                        alert("删除失败")
                    )
                })
            }
        })
}


$(function(){
	$.get("./php/getGoodsType.php",function(data){
		let objs = JSON.parse(data);
		let htmlStr="";
		objs.forEach(function(item){
			htmlStr+=`<option value="${item.typeId}" >${item.goodsType}</option>`;
        });
        $("#typeId2").html(htmlStr);
    });
    
    $.get('./php/getUser.php',function(data){
        showData(data)
    })

    showMsg()   //显示商品信息


    // $.get('php/getMaxTypeId.php',function(data){
    //     let maxTypeId = "01";
    //     if(data!=""){
    //         let str = "0"+(parseInt(data)+1);
    //         maxTypeId = str.substr(str.length-2,2);
    //     }
    //     $("#typeId1").val(maxTypeId);
    // });
});