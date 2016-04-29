(function ($) {
    var private =function(){
        //设置私有框架
    }
    var PageSwich =(function(){
        function  PageSwith (elemet,options){
            this.settings = $.extend(true, $.fn.PageSwith.defaults, options ||{});
            this.elements=elemet;
            this.init();
        }
        PageSwith.prototype ={
            //初始化插件 ，实现dom结构，布局，分页和绑定事件
            init : function(){
                var me= this;
                setTimeout(function(){
                    console.log(this);
                    me.sections =me.settings.sections;
                    me.sections =me.selectors.sections;
                    me.section =me.selectors.section;

                    me.direction =me.settings.direction =="vertiacal" ?true:false;
                    me.pagesCount = me.pagesCount();
                    me.index = (me.settings.index >=0 && me.settings.index < pagesCount) ?me.settings.index :0 ;

                    if(!me.direction){
                        me. _initLayout();
                    }

                    if(me.settings.pagination){
                        me._initPaging();
                    }

                    me._initEvent();
                    //页面滑动的方向
                },50);
            },
            //页面滑动数量
            pagesCount :function (){
                return this.sections.length;

            },
            // 获取页面滑动的宽度  横屏时的高度
            switchLength :function (){
                return this.direction ? this.elements.height() :this.element.width();
            },
            //针对横屏情况布局 链式调用
            _initLayout :function (){
                var me =this;
                var width =(me.pagesCount *100) +"%",
                   cellWidth =(100/me.pagesCount).toFixed(2) +"%";
                me.sections.width(width);
                me.section.width(cellWidth)
                me.section.css ("float","left");
            },
            //实现分页的dom结构以及css样式
            _initPaging :function(){
                var me=this;
                    pageClass =me.selectors.page.substring(1),
                    activeClass= me.selectors.active.substring(1);
                var pageHtml ="<ul class="+pageClass+">";
                for (var i=0; i<me.pagesCount;i++){
                    pageHtml +="<li></li>";
                }
                me.elements.append(pageHtml);
                var pages=me.elements.find(me.sections.page);
                me.pageItem =pages.find("li");
                me.pageItem.eq(me.index).addClass(ME.activeClass);

                if(me.direction){
                    page.addClass("vertiacl"); //竖屏

                }else {
                    page.addClass("horizontal"); //横屏
                }
            },
            //初始化插件事件
            _initEvent :function(){
                var me =this;
                me.element.on("click",me,selectors.page +"li" ,function(){
                    me.index =$(this).index();
                    me._scrollPage();
                });

                me.element.on("mousewheel DOMMouseScroll" ,function (e){
                    var delta = e.originalEvent.wheelDelta || -e.originalEvent.
                            detail;
                    if(delat >0 && (me.index && !me.settings.loop || me.settings.loop)){
                        me.prev();
                    }else if(delta <0 && (me.index < (me.pagesCount -1 ) && !me.settings.loop || me.settings.loop)){
                        me.next();
                    }
                })
            }
        };
        return PageSwith;
    })
    $.fn.PageSwith = function ( options) {
            return this.each ( function(){
               var me = $(this),
                   instance =me.data("PageSwitch");
                if(!instance){
                    instance =new PageSwitch(me,options);
                    me.data("PageSwitch",instance);
                }
                if ($.type(options) ==="string") return instance [options]();
                $("div").PageSwith("init");
            });
    }
    $.fn.PageSwith.defaults = {
        selectors: {
            sections :".sections",
            section:".section",
            page : ".pages",
            active : "active"
        },
        index :0,
        easing : "ease",
        duration :500,
        loop: false,
        pageination: true, //分页
        keyboard:true,
        direction :"vertical",
        callback :""
    }

    $(function(){
        $("[data-PageSwith]").PageSwith()
    })

})(jQuery);