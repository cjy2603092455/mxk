function Mirror(oBox,obj){
    this.oBox = oBox            //大盒子
    this.imgBox = null          //大盒子下面的图片盒子
    this.mirrorBox = null       //放大镜
    this.showBox = null         //放大镜的展示盒子
    let defaultObj = {
        width:80,                   //放大镜的宽度
        height:120,                 //放大镜的高度
        mutiple:3,                  //倍率
        color:'red',                //放大镜的默认颜色
        opacity:0.3,    
        left:0,                     //放大镜的默认位置
        top:0,
        imgs:[]
    }
    //把传入的数据obj赋值给defaultObj   这是最终对象的属性值
    for(let key in obj){
        defaultObj[key] = obj[key]
    }
    //把defaultObj里的所有属性赋值给this
    for(let key in defaultObj){
        this[key] = defaultObj[key]
    }

    this.createDom()
    this.addEvent()
}
//方法---创建dom
Mirror.prototype.createDom = function(){
    //创建ul盒子   imgBox
    this.imgBox = document.createElement('ul')  //创建ul加入到box中
    this.imgBox.id = 'ulBox'
    this.imgBox.style.cssText = `
        width:${this.oBox.offsetWidth}px;
        height:90px;
        position:absolute;
        top:${this.oBox.offsetHeight+10}px;
        left:0;
    `
    this.oBox.appendChild(this.imgBox)
    //创建li
    for(let i=0;i<5;i++){
        let liDom = document.createElement('li')
        liDom.innerHTML = `
            <img style="width:100%;height:100%;" src=''>
        `
        liDom.style.cssText = `
            float:left;
            margin-left:5px;
            width:47px;
            height:37px;
            border: 1px #e9e9e9 solid;
        `
        this.imgBox.appendChild(liDom)
    }
    //创建放大镜
    this.mirrorBox = document.createElement('div')
    this.mirrorBox.id = 'mirrorBox'
    this.mirrorBox.style.cssText = `
        position: absolute;
        left: ${this.left}px;
        top: ${this.top}px;
        width: ${this.width}px;
        height: ${this.height}px;
        background:${this.color};
        opacity: ${this.opacity};
        display:none;
    `
    this.oBox.appendChild(this.mirrorBox)
    //创建镜子
    this.showBox = document.createElement('div')
    this.showBox.id = 'showBox'
    this.showBox.style.cssText = `
        position: absolute;
        left: ${this.oBox.offsetWidth}px;
        display:none;
        z-index:5;
        top:0;
        width:${this.width*this.mutiple}px;
        height:${this.height*this.mutiple}px;
        background-color:pink;
        background-size:${this.oBox.offsetWidth*this.mutiple}px ${this.oBox.offsetHeight*this.mutiple}px;
        background-position: -${this.left*this.mutiple}px -${this.top*this.mutiple};
    `
    this.oBox.appendChild(this.showBox)
    //console.log(this.oBox.offsetWidth)
}
//绑定事件----onmousemove
Mirror.prototype.addEvent = function(){
    this.oBox.onmousemove = (event)=>{
        let e = event || window.event
        //---------切换背景图片-----------------------------
        let oLis = this.imgBox.children
        //给imgBox增加事件,阻止冒泡
        this.imgBox.onmouseover = (event) =>{
            let e = event || window.event
            e.stopPropagation()
        }
        for(let i=0;i<5;i++){
            oLis[i].onmouseover = ()=>{
                $(this.oBox).css({
                    'background-image':`url(${$(oLis[i]).find('img').attr('src')})`
                })
                $(this.showBox).css({
                    'background-image':`url(${$(oLis[i]).find('img').attr('src')})`
                })
                
                //this.showBox.style.backgroundImage = $(oLis[i]).find('img').attr('src')
            }  
        }
        //------------------------------------------------
        //数据处理
        //计算oMirrorBox的位置
        //鼠标距离页面的坐标的距离-大盒子距离页面的距离-放大镜宽度的一半
        //console.log(e.pageX,e.pageY,this.oBox.parentNode.offsetLeft,this.oBox.parentNode.offsetTop)
        this.left = e.pageX - this.oBox.parentNode.offsetLeft - this.width/2
        this.top = e.pageY - this.oBox.parentNode.offsetTop - this.height/2
        //边界值判断
        if(this.left<0){
            this.left = 0
        }else if(this.left+this.width>this.oBox.offsetWidth){
            this.left = this.oBox.offsetWidth - this.width
        }
        if(this.top<0){
            this.top = 0
        }else if(this.top+this.height>this.oBox.offsetHeight){
            this.top = this.oBox.offsetHeight - this.height
        }
        //外观呈现
        //移动放大镜
        this.mirrorBox.style.left = this.left + 'px'
        this.mirrorBox.style.top = this.top + 'px'
        //移动镜子
        this.showBox.style.backgroundPosition = `-${this.left*this.mutiple}px -${this.top*this.mutiple}px`
        //隐藏镜子
        this.oBox.onmouseover = () =>{
            this.mirrorBox.style.display = 'block'
            this.showBox.style.display = 'block'
        }
        this.oBox.onmouseout = ()=>{
            this.mirrorBox.style.display = 'none'
            this.showBox.style.display = 'none'
        }
    }
}