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
  a 自定义弹簧的高度 50px
  b touchmove 判断 不让ul继续往下移动
  c touchend 判断 反弹 
    1 用preDis 和0 比较
    2 满足条件 反弹 
      a 需要加上过渡
      b 设置ul标签的translateY(0)
3 点击菜单置顶效果 
  a 先引用插件 绑定tap事件
  b 获取被点击的li标签的索引 
    1 添加了自定义属性
    2 获取被点击的li标签
    3 通过e.target获取被点击的dom元素 
  c 向上移动的值 =索引*li标签的高度 
 */
function ownScroll() {
  // 获取坐标的菜单ul
  var l_menu=document.querySelector('.l_menu');
  // 声明按下的坐标
  var startY;
  // 以前移动了的总距离
  // 初始化一定要先写0 
  var preDis=0;
  // 弹簧
  var springs=50;

  // 最大上拉的高度 注意 上滑动的值 是负数
  var maxUp=-(l_menu.offsetHeight-l_menu.parentNode.offsetHeight);
  // console.log(maxUp);
  // 按下
  l_menu.addEventListener("touchstart",function (e) {
    // console.log(e);
    // 0 判断手指的个数
    if(e.targetTouches.length>1){
      return;
    }

    // 1 记录坐标
    startY=e.targetTouches[0].clientY;
    // console.log(startY);

    // 清除手动拖动的过渡效果
    l_menu.style.transition="none";
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

    // 2.5 判断是否超出了弹簧的距离
    if(tmpDis>springs){
      // 让ul移动的值等于弹簧的值  判断下拉
      tmpDis=springs;
    }else if(tmpDis<maxUp-springs){
      // 判断上拉
      tmpDis=maxUp-springs;
    }

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
    // console.log(preDis);

    // 反弹
    if(preDis>0){
      // 判断下拉的反弹
      preDis=0;
      l_menu.style.transition="transform .5s";
      l_menu.style.transform="translateY(0)";
    }else if(preDis<maxUp){
      // 判断上拉的
      preDis=maxUp;
      l_menu.style.transition="transform .5s";
      l_menu.style.transform="translateY("+preDis+"px)";
    }
    
  })

  // tap单击事件
  itcast(l_menu).tap(function(e){
    // console.log(e);
    // 获取被点击的a标签
    var aDom=e.target;
    // 获取被点击li标签
    var liDom=aDom.parentNode;
    // console.log(liDom);
    // 获取自定义属性-li标签的索引
    var liIndex=liDom.dataset.index;
    // console.log(liIndex);

    // 计算要向上移动的高度  索引*li标签的高度 向上移动 是个负数
    var height=-(liIndex-1)*liDom.offsetHeight;

    // 和最大上拉的值做判断 maxUP
    if(height<maxUp){
      height=maxUp;
    }

    // 告诉preDis 以前一共移动的了距离
    preDis=height;
    // 设置ul标签的位移
    l_menu.style.transition="transform .3s";
    l_menu.style.transform="translateY("+height+"px)";

    // 执行排他的方法
    activeLi(liIndex-1);
  });


  function activeLi(tmpLiIndex) {
    // 获取所有的li标签
    var lis=document.querySelectorAll('.l_menu>li');

    for (var i = 0; i < lis.length; i++) {
      var element = lis[i];
      element.classList.remove("active");
    }

    lis[tmpLiIndex].classList.add("active");
    
  }
}