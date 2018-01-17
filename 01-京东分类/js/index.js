ownScroll();
/* 
分析:
1 手动拖动
  a translateY  
  b 用到的事件 touchstart touchmove
    touchstart
      0 验证手指的个数
      1 记录按下的坐标
    touchmove
      0 验证手指的个数
      1 记录移动的坐标
      2 计算距离
      3 距离设置给ul标签 
      4 需要加上以前已经移动了的距离 
        a 如何获取  加一个touchend事件 获取离开的坐标 endY
        b 获取上一次的距离  preDis=endY-startY
        c preDis用在touchmove中 
      5 用哪个触摸点数组(targetTouches和c页面hangedTouches)  都可以!
2 弹簧效果
3 点击菜单置顶效果 
 */
function ownScroll() {
  // 获取坐标的菜单ul
  var l_menu=document.querySelector('.l_menu');
  // 声明按下的坐标
  var startY;
  // 以前移动了的总距离
  // 初始化一定要先写0 
  var preDis=0;
  // 按下
  l_menu.addEventListener("touchstart",function (e) {
    // 0 判断手指的个数
    if(e.targetTouches.length>1){
      return;
    }

    // 1 记录坐标
    startY=e.targetTouches[0].clientY;
    // console.log(startY);
  })
  // 移动
  l_menu.addEventListener("touchmove",function (e) {
    // 0 判断手指的个数
    if(e.targetTouches.length>1){
      return;
    }

    // 1 记录移动的坐标
    var moveY=e.targetTouches[0].clientY;

    // 2 计算距离  需要加上以前移动的距离 
    var tmpDis=moveY-startY+preDis;
    // console.log(tmpDis);

    // 3 设置ul标签的位移
    l_menu.style.transform="translateY("+tmpDis+"px)";
    
  })
  // 离开
  l_menu.addEventListener("touchend",function (e) {
    // 0 判断手指
    if(e.changedTouches.length>1){
      return;
    }

    // 1 获取离开的坐标
    var endY=e.changedTouches[0].clientY;

    // 2 获取移动了的距离 需要加上自己的值 
    preDis+=endY-startY;
    console.log(preDis);
    
  })
}