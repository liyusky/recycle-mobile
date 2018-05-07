/**
 * [checkLogin 检查用户是否登陆]
 * @method      checkLogin
 * @param       {json}        params        [{success:callbackFun,fail:callbackFun} 成功/失败状态下执行的函数]
 * @return      {[boolean]}                 [true:已登录  /  false: 未登录]
 * @version     [1.0]
 * @author      [潘剑]
 * @Proofreader [潘剑]
 * @datetime    2017-10-07T14:12:19+080
 */
function checkLogin(params) {
  var flag = true;
  var openLogin = true;
  try {
    if (typeof params.openLogin === 'boolean') openLogin = params.openLogin;
  } catch (e) {}

  User = $api.getStorage('User');
  if (User.Status) {
    try {
      params.success(flag);
    } catch (e) {}
  } else {
    flag = false;
    if (openLogin) {
      toast('请先登录');
      create('login');
    }
    try {
      params.fail(flag);
    } catch (e) {}
  }

  try {
    params.default(flag);
  } catch (e) {}

  return flag;
}
/**
 * [checkNetwork 检查网络连接]
 * @method      checkNetwork
 * @param       {[json]}         callback            [{success:callbackFun,fail:callbackFun} 成功/失败状态下执行的函数]
 * @return      {[boolean]}                          [true:已连接网络 / false:未连接网络]
 * @version     [1.0]
 * @author      [潘剑]
 * @Proofreader [潘剑]
 * @datetime    2017-10-07T14:04:38+080
 */
function checkNet(params) {
  var flag = true;
  var openOffline = true;
  
  try {
    if (typeof params.openOffline === 'boolean') openOffline = params.openOffline;
  } catch (e) {}

  if (api.connectionType !== 'none') {
    try {
      params.success(flag);
    } catch (e) {}
  } else {
    flag = false;
    if (openOffline) create('offline');
    try {
      params.fail(flag);
    } catch (e) {}
  }

  try {
    params.default(flag);
  } catch (e) {}
  return flag;
}
/**
 * [create 以win的方式打开页面]
 * @method      checkNetwork
 * @param       {[json]}         data                [''  /  {goal: '', xxxx: , xxx: ,}]
 * @version     [1.0]
 * @author      [潘剑]
 * @Proofreader [潘剑]
 * @datetime    2017-10-07T14:04:38+080
 */
function create(data) {
  var goal = null;
  var pageParam = null;
  switch (typeof data) {
    case 'object':
      goal = data.goal;
      pageParam = data;
      break;
    case 'string':
      goal = data;
      pageParam = {
        goal: goal
      };
      break;
  }
  var animationDirection = 'from_left';
  var animationType = 'movein';
  var param = ROUTER[goal] ? ROUTER[goal].create : false;
  if (param) {
    if (param.type) animationType = param.type;
    if (param.direction) animationDirection = param.direction;
  }
  api.openWin({
    name: goal,
    url: ROUTER[goal].path,
    vScrollBarEnabled: false,
    hScrollBarEnabled: false,
    animation: {
      type: animationType,
      subType: animationDirection,
      duration: 300
    },
    pageParam: pageParam
  });
}
/**
 * [kill 关闭页面]
 * @method      checkNetwork
 * @param       {[json]}         data                [ / 'goal']
 * @version     [1.0]
 * @author      [潘剑]
 * @Proofreader [潘剑]
 * @datetime    2017-10-07T14:04:38+080
 */
function kill(goal) {
  if (goal instanceof Array) {
    goal.forEach(function (element) {
      closeWin(element);
    });
  } else {
    closeWin(goal);
  }

  function closeWin(goal) {
    goal = goal ? goal : api.pageParam.goal;
    var animationType = 'reveal';
    var animationDirection = 'from_right';
    var param = ROUTER[goal] ? ROUTER[goal].kill : false;
    if (param) {
      if (param.type) animationType = param.type;
      if (param.direction) animationDirection = param.direction;
    }

    api.closeWin({
      name: goal,
      animation: {
        type: animationType,
        subType: animationDirection,
        duration: 300
      }
    });
  }
}
/**
 * [toast 显示toast弹出消息]
 * @method      toast
 * @param       {[string]}                msg           [需要显示的消息]
 * @constructor
 * @version     [1.0]
 * @author      [潘剑]
 * @Proofreader [潘剑]
 * @datetime    2017-10-06T11:47:18+080
 */
function toast(msg) {
  api.toast({
    msg: msg,
    duration: 2000,
    location: 'middle'
  });
}


function clearUser() {
  User = $api.getStorage('User');
  User = {
    Status: false, //登录
    Certification: [false, false, false, false],
    Phone: '',
    Name: null,
    Id: null,
    Card: null
  };
  $api.setStorage('User', User);
}