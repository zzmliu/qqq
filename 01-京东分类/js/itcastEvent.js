/* 
目标: $("div").click(function(){
  // 点击事件的逻辑
  });
  :  

  var callback=function(){};
  itcast(dom).tap(callback);


  swipe
  itcast(dom).swipe(function(d){
    // 执行滑动的逻辑 
  });

 */

function itcast(dom) {
  var obj = {
    tap: function (callback) {
      // 绑定自己的tap事件 
      // 按下的时间
      var startTime;
      // 按下的坐标
      var startX, startY;

      // 手指按下
      dom.addEventListener("touchstart", function (e) {
        // 1  判断
        if (e.targetTouches.length > 1) {
          return;
        }

        // 2 记录时间  返回的是1970 1 1 到现在的总毫秒数
        startTime = Date.now();

        // 3 记录坐标
        startX = e.targetTouches[0].clientX;
        startY = e.targetTouches[0].clientY;
      });

      // 手指抬起
      dom.addEventListener("touchend", function (e) {
        //1  判断手指的个数
        if (e.changedTouches.length > 1) {
          return;
        }

        // 2 离开的时间
        var endTime = Date.now();
        // 判断
        if (endTime - startTime > 300) {
          return;
        }

        // 3 获取离开的坐标
        var endX = e.changedTouches[0].clientX;
        var endY = e.changedTouches[0].clientY;

        // 计算距离 注意 需要加上绝对值
        if (Math.abs(endX - startX) > 5) {
          return;
        }

        // 判断垂直方向
        if (Math.abs(endY - startY) > 5) {
          return;
        }

        // 执行自己的逻辑

        //  console.log("自己的tap点击事件 ");

        // 把事件源对象传递出去 
        callback && callback(e);
      });

    },
    swipe: function (callback) {
      // 绑定swipe事件 
    
      // 按下的时间
      var startTime;
      // 按下的坐标
      var startX, startY;
      // 按下
      dom.addEventListener("touchstart", function (e) {
        // 1 判断手指的个数
        if (e.targetTouches.length > 1) {
          return;
        }

        // 2 记录按下的时间
        startTime = Date.now();

        // 3 记录坐标
        startX = e.targetTouches[0].clientX;
        startY = e.targetTouches[0].clientY;
      });
      // 离开
      dom.addEventListener("touchend", function (e) {
        // 1 判断手指个数
        if (e.changedTouches.length > 1) {
          return;
        }

        // 2 计算时间
        var endTime = Date.now();
        if (endTime - startTime > 800) {
          return;
        }

        // 3 计算距离和方向
        var endX = e.changedTouches[0].clientX;
        var endY = e.changedTouches[0].clientY;

        // 方向
        var direction;
        if (Math.abs(endX - startX) > 15) {
          // 计算方向 水平方向
          // >0 right   <0 left
          direction = endX - startX > 0 ? "right" : "left";
        } else if (Math.abs(endY - startY) > 15) {
          // 计算垂直方向  
          // > 0  down  <0   up 
          direction = endY - startY > 0 ? "down" : "up";
        } else {
          return;
        }


        // 执行自己的逻辑
        // console.log(direction);
        callback&&callback(direction);
      });

    }
  };
  return obj;
}