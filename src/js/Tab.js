
// 类（构造函数）

class Tab {
    constructor(selector, obj) {
        // 1、jQuery对象
        // 1）、盒子
        this.$box = $(selector);
        // 2）、标题
        // 标题ul
        this.$ulTitle = this.$box.children().eq(0);        
        // 标题li
        this.$liTitle = this.$ulTitle.find("li");
        // 3）、内容
        this.$ulContent = this.$box.children().eq(1);
        this.$liContent = this.$ulContent.children("li");


        // 默认值
        let defaultObj = {
            titleWidth: 100,
            titleHeight: 38,
            contentWidth: this.$box.width(),
            contentHeight: this.$box.height() - 38
        }
        // 把传入的值赋给defaultObj
        for (let key in obj) {
            defaultObj[key] = obj[key]
        }
        // 把defaultObj的属性值赋给this
        for (let key in defaultObj) {
            this[key] = defaultObj[key];
        }

        this.render();
        this.addEvent();
    }

    render() {
        //  获取外面写好的dom对象，然后给其赋css样式
        // 1、标题部分的css
        // 1）、ul
        this.$ulTitle.css({
            "width": this.$box.width(),
            "height": this.titleHeight,
            'border-bottom':'1px solid #ccc'
        });

        // 2）、li
        this.$liTitle.css({
            "float": "left",
            "width": this.titleWidth,
            "height": this.titleHeight,
            "text-align": "center",
            'margin-left':'6px',
            'padding-top':'9px',
            'cursor': 'pointer'
        });
        //span
        this.$liTitle.children('span').css({
            'height':'29px',
            "line-height": '29px',
            'border':'1px solid #ccc',
            'background':'rgb(248, 246, 246)'
        })
        // 给标题li的第一个赋值为高亮颜色
        this.$liTitle.eq(0).css({
            'border-left':'1px solid #ccc',
            'border-right':'1px solid #ccc',
            'border-top':'3px solid #ccc',
            'padding':'0'
        })
        this.$liTitle.eq(0).children('span').css({
            'border':'none',
            'width':(this.titleWidth-2)+'px',
            'height':(this.titleHeight-3)+'px',
            "line-height": (this.titleHeight-3)+'px',
            'background':'white',
            'font-weight':'900'
        })

        // 2、内容部分的css
        // 1）、ul
        this.$ulContent.css({
            "width": this.contentWidth,
            "min-height": '100px',
        });

        // 2)、li
        this.$liContent.css({
            "width": this.contentWidth,
            "min-height": '100px',
            'border': '1px solid rgb(204, 204, 204)',
            'border-top':'none',
            "display": "none"
        })
        this.$liContent.eq(0).css({
            "display":"block"
        });
    }

    addEvent() {        
        // 给每个标题li增加click事件
        this.$liTitle.click((event)=>{
            // 1、初始化样式
            this.$liTitle.children('span').css({
                'height':'29px',
                "line-height": '29px',
                'border':'1px solid #ccc',
                'background':'rgb(248, 246, 246)',
                'font-weight':'500'
            });
            this.$liTitle.css({
                'padding-top':'9px',
                'border':'none'
                
            })
            // 让点击的标题li的边框显示
            $(event.currentTarget).css({
                'border-left':'1px solid #ccc',
                'border-right':'1px solid #ccc',
                'border-top':'3px solid #ccc',
                'padding':'0'
            });
            $(event.currentTarget).children('span').css({
                'border':'none',
                'width':(this.titleWidth-2)+'px',
                'height':(this.titleHeight-3)+'px',
                "line-height": (this.titleHeight-3)+'px',
                'background':'white',
                'font-weight':'900'
            })

            // 2、改变内容的显示
            this.$liContent.css({
                "display":"none"
            });
            // 获取点击的标题li的下标
            let index = $(event.currentTarget).index();
            this.$liContent.eq(index).css({
                "display":"block"
            });
        });
    }
}

