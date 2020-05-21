//点击商品类型管理显示  显示商品类型管理表单
$('#btn_goodsType').click(function(){
    $('form').css({
        'display':'none'
    })
    $('#addGoodsType').css({
        "display":'block'
    })
    $('#users').css({
        'display':"none"
    })
    $('.title_h3').html("商品类型管理&gt;&gt;")
})

//点击商品管理显示  显示商品管理表单
$('#btn_goods').click(function(){
    $('form').css({
        'display':'none'
    })
    $('#addGoods').css({
        "display":'block'
    })
    $('#users').css({
        'display':"none"
    })
    $('.title_h3').html("商品管理&gt;&gt;")
})
//点击用户管理显示  显示用户管理表单
$('#btn_user').click(function(){
    $('form').css({
        'display':'none'
    })
    $('#users').css({
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
        console.log(item.username)
        htmlStr +=`
            <tr>
                <td>用户${count}:</td>
                <td>${item.username}</td>
            </tr>
        `
    })
    console.log(htmlStr)
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

    // $.get('php/getMaxTypeId.php',function(data){
    //     let maxTypeId = "01";
    //     if(data!=""){
    //         let str = "0"+(parseInt(data)+1);
    //         maxTypeId = str.substr(str.length-2,2);
    //     }
    //     $("#typeId1").val(maxTypeId);
    // });
});