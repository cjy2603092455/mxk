//cookie的操作  增删改查

//增加cookie
//功能  添加一个cookie
//参数  键
//      值
//      有效期(单位是天)
//返回值    无
function addCookie(key,value,count){
    // console.log(key,value,count)
    //失效时间点
    let d = new Date()
    d.setDate(d.getDate()+count)

    document.cookie = `${key}=${value};expires=${d.toGMTString()}`
}

//查
//功能  获取cookie(根据键获取值)
//参数  键
//返回值    键对应的值
function getCookie(key){
    //获取当前网站所有的cookie----键值对
    let str = document.cookie
    //分割cookie字符串成数组
    let arr = str.split('; ')   //分号  空格
    //c查询以key对应的值
    for(let i=0;i<arr.length;i++){
        if(arr[i].indexOf(key+'=')==0){     //查询到以'key='开头  起始下标为0
            let value = arr[i].substring(key.length+1)
            return value    //返回 键对应的 值

            //结构赋值的方式
            // let [,value] = arr[i].split('=')
            // return value

            //数组形式
            // return arr[i].split('=')[1]
        }
    }
        
}
//删除----覆盖同名键  并设置失效时间为过去时间点
function removeCookie(key){
    // //失效时间点
    // let d = new Date()
    // d.setDate(d.getDate()-1)
    // document.cookie = `${key}=remove;expires=${d.toGMTString()}`

    //直接调用addCookie函数
    addCookie(key,'删除',-1)
}
//修改---覆盖同名键
function updateCookie(key,value,count){
    addCookie(key,value,count)
}