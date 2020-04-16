setFontSize();
window.onresize = function() {
    setFontSize()
}
function setFontSize() {
    var a = document.getElementsByTagName("html")[0];
    var b = window.innerWidth;
    var c = 100 / 434 * b;
    a.style.fontSize = c + "px"
}
// 这后面用rem就是，640px指的是给的图纸width，然后例如图纸上某一个元素是50px，就用50px/c就是要做的网页该元素的width  /*720代表设计师给的设计稿的宽度，你的设计稿是多少，就写多少;100代表换算比例，这里写100是为了方便计算
//这段js代码最好封装在一个单独的js文件里，并且放在所有的css文件引入之前加载。为了以后好算,比如，你测量的一个宽度是100px,就可以写为1rem,以及1px=0.01rem等等* 字体可能会在不同分辨率很大 在css统一设置/