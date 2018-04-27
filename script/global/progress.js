function Progress(goal) {
  var thisDom = this;
  this.railWrapDom = null;
  this.railDom = null;

  this.railWrapWidth = null;
  this.railWidth = null;

  this.stepSize = null;
  this.stepCount = 4;
  this.step = 0;
  this.goal = 0;

  this.currentX = null;
  this.goalX = null;

  this.mark = [];

  this.initDom = function () {
    this.railWrapDom = $api.byId('rail-wrap');
    this.railDom = $api.byId('rail');
  };

  this.initParams = function () {
    this.railWrapWidth = $api.offset(this.railWrapDom).w;
    this.railWidth = $api.offset(this.railDom).w;
    this.stepSize = (this.railWrapWidth - this.railWidth * 2) / (this.stepCount - 1);
    this.beginX = this.railWidth;
    this.setGoal(goal);
    this.currentX = this.beginX;
    for (var i = 0; i < this.stepCount; i++) {
      this.mark.push(true);
    }
  };

  this.animate = function () {
    if (thisDom.currentX < thisDom.goalX) {
      $api.css(thisDom.railDom, 'width: ' + (++thisDom.currentX) + 'px;');
      thisDom.step = Math.floor((thisDom.currentX - thisDom.beginX) / thisDom.stepSize);
      if (thisDom.mark[thisDom.step]) {
        thisDom.setFinish();
        thisDom.mark[thisDom.step] = false;
      }
      setTimeout(thisDom.animate, 17); //递归  渲染
    } else {
      $api.css(thisDom.railDom, 'width: ' + thisDom.goalX + 'px;');
      try {
        $api.addCls('step-' + (thisDom.step + 1), "progress-sign-active");
      } catch (e) {}
    }
  };

  this.setFinish = function () {
    var htmlStr = '<svg class="icon progress-sign-finish" aria-hidden="true">' +
      '<use xlink:href="#icon-dui"></use>' +
      '</svg>';
    try {
      $api.after('step-' + this.step, htmlStr);
      $api.addCls('step-' + this.step, "aui-hide");
    } catch (e) {}
    $api.addCls('step-' + (thisDom.step + 1), "progress-sign-active");
  };

  this.main = function () {
    this.initDom();
    this.initParams();
    if (this.goal !== 0) this.animate();
  };

  this.go = function (goal) {
    this.setGoal(goal);
    this.animate();
  };

  this.setGoal = function (goal) {
    this.goal = goal ? goal : this.goal;
    if (0 < this.goal && this.goal <= this.stepCount) {
      this.goalX = this.railWidth + (this.goal - 1) * this.stepSize;
    } else if (this.goal === 0) {
      this.goalX = 0;
    } else if (this.goal > this.stepCount) {
      this.goalX = this.railWrapWidth;
    }
  }

  this.getGoal = function (goal) {
    return this.goal;
  };

  this.main();
}
