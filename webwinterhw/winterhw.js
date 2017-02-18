
//数据的定义
        var data = [
            {img:1},
            {img:2},
            {img:3}
        ];
       
    //通用函数
        var g = function (id) {
            if(id.substr(0,1) == '.'){
                return document.getElementsByClassName(id.substr(1));
            }
            return document.getElementById(id);
        }
    //添加幻灯片的操作
        function addSliders(){
            //获取模板
            var tpl_main = g('template_main').innerHTML
                                .replace(/^\s*/,'')
                                .replace(/\s*$/,'');
            var tpl_ctrl = g('template_ctrl').innerHTML
                                .replace(/^\s*/,'')
                                .replace(/\s*$/,'');
           
            //定义最终输出HTML的变量
            var out_main = [];
            var out_ctrl = [];
           
            //遍历所有数据，构建最终输出的HTML变量
            for( i in data){
                var _html_main = tpl_main
                                    .replace(/{{index}}/g,data[i].img)
                var _html_ctrl = tpl_ctrl
                                    .replace(/{{index}}/g,data[i].img)
                out_main.push(_html_main);
                out_ctrl.push(_html_ctrl);
            }
            
            //把HTML回写到DOM里面
            g('template_main').innerHTML = out_main.join('');
            g('template_ctrl').innerHTML = out_ctrl.join('');
        
         }        
            //幻灯片切换
        function switchSlider(n){
            //获得要展现的幻灯片&控制元素 DOM
            var main = g('main_'+n);
            var ctrl = g('ctrl_'+n);
            var butLeft = g('but')
            //获得所有幻灯片及控制元素
            var clear_main = g('.main-i');
            var clear_ctrl = g('.ctrl-i');
          
            //清除active样式
            for(i=0;i<clear_ctrl.length;i++){
                clear_main[i].className = clear_main[i].className.replace('main-i_active','');
                clear_ctrl[i].className = clear_ctrl[i].className.replace('ctrl-i_active','');
            }
            
            //为幻灯片元素和控制元素添加样式
            main.className += ' main-i_active';
            ctrl.className += ' ctrl-i_active';


        }
        //
        function movePictures(){
            var pictures = g('.picture');
            for(i=0;i<pictures.length;i++){
                pictures[i].style.marginTop = (-1* pictures[i].clientHeight/2 )+ 'px'
            }

        }

        //定义何时处理幻灯片输出
        window.onload = function(){
            addSliders();
            switchSlider(1);
            setTimeout(function(){
                movePictures();
            },100)
            
        }
       var images = document.getElementsByTagName('img');
var btn = document.getElementById('btn');

//获取变量index 用来为后面设置层级用
var index = 1000;
// 获取一个空的数组，用来存放images里面的字符串元素
var imagess = [];
 
// for循环用来给imagess数组赋值，并且改变数组中的元素的层级
for (var i = 0; i < images.length; i++) {
imagess[i] = images[i];
var currentImage = imagess[i];
// 当前图片的层级的设置，一轮for循环都为他们设置了初始的zIndex，图片越靠前，层级设置
// 要求越高，所以用的是－i,这样图片会按顺序从第一张，第二张.....依次向下
currentImage.style.zIndex = -i;
}
 
// 设置计数器count，执行一次点击事件（向左或者向右）count加1
var count = 0;
// 向左的点击事件
btn.onclick = function() {
// 从数组头部弹出一个图片元素
var showFirst = imagess.shift();
// 给弹出的这个图片元素设置层级，即 －1000+count，
// 让层级相较其他元素是最小的，数组头部弹出的图片会显示在最底层
showFirst.style.zIndex = - index + count;
// 层级改变完成后再将他push进数组的尾部
imagess.push(showFirst);
// 点击一次加1，不用考虑具体的值，只需要有点击事件加 1
count++;
}
// 向右点击事件
// btn.onclick = function() {
// // 从imagess的尾部弹出一个元素，并赋值给showFirst
// var showFirst = imagess.pop();
// // 设置showFirst的层级为最大，1000+count ，这样他会显示在第一层
// showFirst.style.zIndex = index + count;
// // 层级改变之后将他在插入数组imagess的头部
// imagess.unshift(showFirst);
// // 点击一次加1
// count++;
// } 