/**
 * [AlertMsg 显示toast弹出消息]
 * @method      AlertMsg
 * @param       {[string]}                msg           [需要显示的消息]
 * @constructor
 * @version     [1.0]
 * @author      [潘剑]
 * @Proofreader [潘剑]
 * @datetime    2017-10-06T11:47:18+080
 */
function alertMsg(msg) {
  api.toast({
    msg: msg,
    duration: 2000,
    location: 'middle'
  });
}

/**
 * [checkLogin 检查用户是否登陆]
 * @method      checkLogin
 * @param       {json}        callback      [{success:callbackFun,fail:callbackFun} 成功/失败状态下执行的函数]
 * @return      {[boolean]}                 [true:已登录  /  false: 未登录]
 * @version     [1.0]
 * @author      [潘剑]
 * @Proofreader [潘剑]
 * @datetime    2017-10-07T14:12:19+080
 */
function checkLogin(content) {
  var flag = true;
  var openLogin = true;
  try {
    if (typeof content.openLogin === 'boolean') openLogin = content.openLogin;
  } catch (e) {}

  User = $api.getStorage('User');
  if (User.Status) {
    try {
      content.success(flag);
    } catch (e) {}
  }
  else {
    flag = false;
    if (openLogin) {
      alertMsg('请先登录');
      openFormwork('empower');
    }
    try {
      content.fail(flag);
    } catch (e) {}
  }

  try {
    content.default(flag);
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
function checkNetwork(content) {
  var flag = true;
  // if ( api.connectionType !== 'none') {
  //   try {
  //     content.success(flag);
  //   } catch (e) {}
  // } else {
  //   flag = false;
  //   openFormwork('offline');
  //   try {
  //     content.fail(flag);
  //   } catch (e) {}
  // }

  try {
    content.default(flag);
  } catch (e) {}

  return flag;
}

function checkCard (content) {
  var flag = true;
  User = $api.getStorage('User');
  if (User.Card.length > 0) {
    try {
      content.success(flag);
    } catch (e) {}
  }
  else {
    flag = false;
    alertMsg('请先绑定银行卡');
    openFormwork('yinhangka');
    try {
      content.fail(flag);
    } catch (e) {}
  }

  try {
    content.default(flag);
  } catch (e) {}

  return flag;
}

/**
 * [openFormwork 打开模板页]
 * @method      openFormwork
 * @param       {[string]}     goal     [目标网页的名称]
 * @version     [1.0]
 * @author      [潘剑]
 * @Proofreader [潘剑]
 * @datetime    2017-10-10T13:35:19+080
 */
function openFormwork(content) {
  var goal = null;
  var pageParam = null;
  switch (typeof content) {
    case 'object':
      goal = content.goal;
      pageParam = content;
      break;
    case 'string':
      goal = content;
      pageParam = {
        goal: goal
      };
      break;
  }
  var animationDirection = 'from_right';
  var animationType = 'movein';
  switch (goal) {
    case 'register':
      animationDirection = 'from_left';
      break;
    case 'offline':
      animationDirection = 'none';
      break;
  }
  api.openWin({
    name: goal,
    url: 'widget://html/common/formwork.html',
    vScrollBarEnabled: false,
    hScrollBarEnabled: false,
    bgColor: '#f5f5f5',
    animation: {
      type: animationType,
      subType: animationDirection,
      duration: 300
    },
    pageParam: pageParam
  });
}

/**
 * [closeFormwork 关闭页面模板]
 * @method      closeFormwork
 * @version     [1.0]
 * @author      [潘剑]
 * @Proofreader [潘剑]
 * @datetime    2017-10-09T11:15:01+080
 */
function closeFormwork () {
  var goal = api.pageParam.goal;
  var animationDirection = 'from_left';
  switch (goal) {
  case 'register':
    animationDirection = 'from_right';
    break;
  }
  api.closeWin({
    name: goal,
    animation: {
      type: 'reveal',
      subType: animationDirection,
      duration: 300
    }
  });
}

/**
 * [showLoading 弹出等待框]
 * @method      showLoading
 * @param       {[string]}    msg      [要显示的信息]
 * @version     [1.0]
 * @author      [潘剑]
 * @Proofreader [潘剑]
 * @datetime    2017-10-11T10:34:06+080
 */
function showLoading(msg) {
  api.showProgress({
    title: msg,
    modal: true
  });
}

/**
 * [hideLoading 关闭等待框]
 * @method      hideLoading
 * @version     [1.0]
 * @author      [潘剑]
 * @Proofreader [潘剑]
 * @datetime    2017-10-11T10:35:54+080
 */
function hideLoading() {
  api.hideProgress();
}

/**
 * [checkForm 表单验证]
 * @method      checkForm
 * @param       {[content]}     content    [{phone: xxx,password:xxxx}]
 * @return      {[boolean]}                [true: 表单正确 / false: 表单错误]
 * @version     [1.0]
 * @author      [潘剑]
 * @Proofreader [潘剑]
 * @datetime    2017-10-11T10:13:47+080
 */
function checkFormat (content) {
  try {
    content.init();
  } catch (e) {}
  var flag = true;
  if (content.data.page) {
    flag = checkPhone(content.data.phone) && checkPassword(content.data.password);
    // switch (content.data.page) {
    //   case 'login':
    //     flag = checkPhone(content.data.phone) && checkPassword(content.data.password);
    //     break;
    //   default:
    //     flag = checkPhone(content.data.phone) && checkPassword(content.data.password) && checkVerificationCode(content.data.validateCode);
    //     break;
    // }
  }
  else {
    for (var item in content.data) {
      switch (item) {
        case 'phone':
          flag = checkPhone(content.data[item]) && flag;
          break;
        case 'password':
          flag = checkPassword(content.data[item]) && flag;
          break;
        case 'validateCode':
          flag = checkVerificationCode(content.data[item]) && flag;
          break;
        case 'url':
          var urlArr = content.data.url;
          for (var i = 0; i < urlArr.length; i++) {
            flag = checkUrl(content.data[item][i]) && flag;
          }
          break;
        case 'sex':
          flag = checkSex(content.data[item]) && flag;
          break;
        case 'name':
          flag = checkName(content.data[item]) && flag;
          break;
        case 'card':
          flag = checkCard(content.data[item]) && flag;
          break;
        case 'id':
          flag = checkID(content.data[item]) && flag;
          break;
      }
    }
  }

  if (flag) {
    try {
      content.success(flag);
    } catch (e) {}
  }
  else {
    try {
      content.fail(flag);
    } catch (e) {}
  }

  try {
    content.default(flag);
  } catch (e) {}

  return flag;

  /**
   * [checkPassword 检查密码]
   * @method      checkPassword
   * @param       {[string]}    password         [密码]
   * @return      {[boolean]}                    [true: 格式正确 / false: 格式错误]
   * @version     [1.0]
   * @author      [潘剑]
   * @Proofreader [潘剑]
   * @datetime    2017-10-10T17:59:42+080
   */
  function checkPassword (password) {
    var result = true;
    if (!password) {
      alertMsg('请输入密码');
      result = false;
    } else if (password.length < 6) {
      alertMsg('请输入6~16密码');
      result = false;
    }
    return result;
  }

  /**
   * [checkPhone 检查手机号格式]
   * @method      checkPhone
   * @param       {[string]}    mobile      [手机号]
   * @return      {[boolean]}               [true: 格式正确 / false: 格式错误]
   * @version     [1.0]
   * @author      [潘剑]
   * @Proofreader [潘剑]
   * @datetime    2017-10-10T16:31:33+080
   */
  function checkPhone (phone) {
    var result = true;
    if (!phone) {
      alertMsg('手机号不能为空');
      result = false;
    } else {
      if (phone.length < 11) {
        alertMsg('请不要选择短号');
        result = false;
      } else {
        var pat = new RegExp('^(?:13|14|15|17|18)[0-9]{9}$', 'i');
        if (!pat.test(phone)) {
          alertMsg('手机号格式错误');
          result = false;
        }
      }
    }
    return result;
  }

  /**
   * [checkVerificationCode 检查验证码格式]
   * @method      checkVerificationCode
   * @param       {[string]}   verificationCode [验证码]
   * @return      {[boolean]}                   [true: 格式正确 / false: 格式错误]
   * @version     [1.0]
   * @author      [潘剑]
   * @Proofreader [潘剑]
   * @datetime    2017-10-12T11:08:03+080
   */
  function checkVerificationCode (verificationCode) {
    var result = true;
    if (!verificationCode) {
      alertMsg('请输入验证码');
      result = false;
    } else {
      var pat = new RegExp('^[0-9]{6}$', 'i');
      if (!pat.test(verificationCode)) {
        alertMsg('验证码格式错误');
        result = false;
      }
    }
    return result;
  }

  /**
   * [checkUrl 检查URL格式]
   * @method      checkUrl
   * @param       {[string]}    url       [网址]
   * @return      {[boolean]}             [true: 格式正确 / false: 格式错误]
   * @version     [1.0]
   * @author      [潘剑]
   * @Proofreader [潘剑]
   * @datetime    2017-10-21T17:15:47+080
   */
  function checkUrl (url) {
    var result = true;
    if (!url) {
      result = false;
    }
    return result;
  }

  /**
   * [checkSex 检查性别]
   * @method      checkSex
   * @param       {[string]}    sex   [男 / 女]
   * @return      {[boolean]}         [true: 格式正确 / false: 格式错误]
   * @version     [1.0]
   * @author      [潘剑]
   * @Proofreader [潘剑]
   * @datetime    2017-10-21T17:17:54+080
   */
  function checkSex(sex) {
    var result = true;
    if (!sex) {
      // alertMsg('性别不能为空');
      result = false;
    }
    else if (sex !== '男' && sex !== '女') {
      // alertMsg('性别不能为非男女');
      result = false;
    }
    return result;
  }

  /**
   * [checkName 检查姓名]
   * @method      checkName
   * @param       {[string]}     name   [姓名]
   * @return      {[boolean]}           [true: 格式正确 / false: 格式错误]
   * @version     [1.0]
   * @author      [潘剑]
   * @Proofreader [潘剑]
   * @datetime    2017-10-21T17:23:25+080
   */
  function checkName(name) {
    var result = true;
    if (!name) {
      // alertMsg('姓名不能为空');
      result = false;
    } else {
      var reg = /^[\u4e00-\u9fa5]{2,}$/;
      if (!reg.test(name)) {
        // alertMsg('姓名格式错误');
        result = false;
      }
    }
    return result;
  }

  /**
   * [checkCard 检查银行卡]
   * @method      checkCard
   * @param       {[string]}     card   [银行卡]
   * @return      {[boolean]}           [true: 格式正确 / false: 格式错误]
   * @version     [1.0]
   * @author      [潘剑]
   * @Proofreader [潘剑]
   * @datetime    2017-10-21T17:23:25+080
   */
  function checkCard(card) {
    var result = true;
    if (!card) {
      alertMsg('银行卡不能为空');
      result = false;
    } else {
      var reg = /^\d{16,19}$/;
      if (!reg.test(card)) {
        alertMsg('储蓄卡格式错误');
        result = false;
      }
    }
    return result;
  }

  /**
   * [checkID 判断身份证格式]
   * @method      checkID
   * @param       {[string]}    id   [身份证]
   * @return      {[boolean]}        [true: 格式正确 / false: 格式错误]
   * @version     [1.0]
   * @author      [潘剑]
   * @Proofreader [潘剑]
   * @datetime    2017-10-21T18:05:13+080
   */
  function checkID (id) {
    var result = true;
    if (!id) {
      // alertMsg("请输入身份证");
      result = false;
    } else if (!isID(id)) {
      // alertMsg("请输入有效身份证");
      result = false;
    }
    return result;

    /**
     * [idCard 判断身份证格式]
     * @method      idCard
     * @param       {[string]}    value   [身份证]
     * @return      {[boolean]}           [true: 格式正确 / false: 格式错误]
     * @version     [1.0]
     * @author      [潘剑]
     * @Proofreader [潘剑]
     * @datetime    2017-10-21T18:05:13+080
     */
    function isID (value) {
      if (value.length == 18 && 18 != value.length) return false;
      var number = value.toLowerCase();
      var d, sum = 0,
        v = '10x98765432',
        w = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2],
        a = '11,12,13,14,15,21,22,23,31,32,33,34,35,36,37,41,42,43,44,45,46,50,51,52,53,54,61,62,63,64,65,71,81,82,91';
      var re = number.match(/^(\d{2})\d{4}(((\d{2})(\d{2})(\d{2})(\d{3}))|((\d{4})(\d{2})(\d{2})(\d{3}[x\d])))$/);
      if (re == null || a.indexOf(re[1]) < 0) return false;
      if (re[2].length == 9) {
        number = number.substr(0, 6) + '19' + number.substr(6);
        d = ['19' + re[4], re[5], re[6]].join('-');
      } else d = [re[9], re[10], re[11]].join('-');
      if (!isDateTime.call(d, 'yyyy-MM-dd')) return false;
      for (var i = 0; i < 17; i++) sum += number.charAt(i) * w[i];
      return (re[2].length == 9 || number.charAt(17) == v.charAt(sum % 11));
    }

    function isDateTime (format, reObj) {
      format = format || 'yyyy-MM-dd';
      var input = this,
        o = {},
        d = new Date();
      var f1 = format.split(/[^a-z]+/gi),
        f2 = input.split(/\D+/g),
        f3 = format.split(/[a-z]+/gi),
        f4 = input.split(/\d+/g);
      var len = f1.length,
        len1 = f3.length;
      if (len != f2.length || len1 != f4.length) return false;
      for (var i = 0; i < len1; i++)
        if (f3[i] != f4[i]) return false;
      for (var i = 0; i < len; i++) o[f1[i]] = f2[i];
      o.yyyy = s(o.yyyy, o.yy, d.getFullYear(), 9999, 4);
      o.MM = s(o.MM, o.M, d.getMonth() + 1, 12);
      o.dd = s(o.dd, o.d, d.getDate(), 31);
      o.hh = s(o.hh, o.h, d.getHours(), 24);
      o.mm = s(o.mm, o.m, d.getMinutes());
      o.ss = s(o.ss, o.s, d.getSeconds());
      o.ms = s(o.ms, o.ms, d.getMilliseconds(), 999, 3);
      if (o.yyyy + o.MM + o.dd + o.hh + o.mm + o.ss + o.ms < 0) return false;
      if (o.yyyy < 100) o.yyyy += (o.yyyy > 30 ? 1900 : 2000);
      d = new Date(o.yyyy, o.MM - 1, o.dd, o.hh, o.mm, o.ss, o.ms);
      var reVal = d.getFullYear() == o.yyyy && d.getMonth() + 1 == o.MM && d.getDate() == o.dd && d.getHours() == o.hh && d.getMinutes() == o.mm && d.getSeconds() == o.ss && d.getMilliseconds() == o.ms;
      return reVal && reObj ? d : reVal;

      function s(s1, s2, s3, s4, s5) {
        s4 = s4 || 60, s5 = s5 || 2;
        var reVal = s3;
        if (s1 != undefined && s1 != '' || !isNaN(s1)) reVal = s1 * 1;
        if (s2 != undefined && s2 != '' && !isNaN(s2)) reVal = s2 * 1;
        return (reVal == s1 && s1.length != s5 || reVal > s4) ? -10000 : reVal;
      }
    };
  }
}

/**
 * [sendRequest 发送ajax请求]
 * @method      sendRequest
 * @param       {[content]}   content    [发送请求需要的地址、数据及完成后的回调函数]
 * @paramDemo   {url(string): 地址名称, values(json): 需要发送的参数, showMessage(boolean/string): 要给用户显示的信息, success(fn): 执行成功后的回调, fail(fn): 执行失败后的回调, error(fn): 发生错误后的回调, default(fn): 默认必须执行的回调}
 * @version     [1.0]
 * @author      [潘剑]
 * @Proofreader [潘剑]
 * @datetime    2017-10-13T15:00:38+080
 */
function sendRequest(content) {
  var url = api.loadSecureValue({ //生产环境
    sync: true,
    key: content.url
  });

  try {
    content.before();
  } catch (e) {}

  // var url = RequestProductURL[content.url]; //生产环境
  // url = RequestURL[content.url];  //后台测试服务器
  // url = RequestTestURL[content.url];   // 前端独立测试

  if (content.showMessage) {
    switch (typeof content.showMessage) {
      case 'string':
        showLoading(content.showMessage);
        break;
      case 'boolean':
        showLoading('获取数据中...');
        break;
    }
  }

  api.ajax({
      url: url,
      method: 'GET',
      data: {
        values: content.values
      }
    },
    function (ret, err) {
      if (ret) {
        if (ret.Message) alertMsg(ret.Message);
        switch (ret.Result) {
          case 0:
            try {
              content.fail(ret.Descriptions);
            } catch (e) {}
            break;
          case 1:
            try {
              content.success(ret.Data);
            } catch (e) {}
            break;
          case 2:
            alertMsg('请您借款前先完成认证');
            api.sendEvent({
              name: 'AdjustIndex',
              extra: {
                goal: 'renzheng'
              }
            });
            break;
          case 3:
            openFormwork('yinhangka');
            break;
          case 4: // 已结款但是未放款
            openFormwork('yinhangka');
            break;
          case 9: // 已更换设备
            api.sendEvent({name: 'Logout'});
            openFormwork('empower');
            alertMsg('您已更换设备，请重新登录');
            break;
          case 201: //该客户存在，已经放款
            try {
              content.hasLoan();
            } catch (e) {}
            break;
        }
      }

      if (err) {
        alert(err.msg + err.statusCode);
        try {
          content.error(err);
        } catch (e) {}
      }

      if (content.showMessage) hideLoading();

      try {
        content.default();
      } catch (e) {}
    }
  );
}

/**
 * [closeBtnClick 不允许按钮点击]
 * @method      closeBtnClick
 * @param       {[string]}   id        [按钮id]
 * @version     [1.0]
 * @author      [潘剑]
 * @Proofreader [潘剑]
 * @datetime    2017-10-13T13:18:58+080
 */
function closeBtnClick(btnId) {
  $api.attr(btnId, 'disabled', 'disabled');
}

/**
 * [openBtnClick 允许按钮点击]
 * @method      openBtnClick
 * @param       {[string]}    id      [按钮id]
 * @version     [1.0]
 * @author      [潘剑]
 * @Proofreader [潘剑]
 * @datetime    2017-10-13T13:19:49+080
 */
function openBtnClick(btnId) {
  $api.removeAttr(btnId, 'disabled');
}

function changeStep () {
  var User = $api.getStorage('User');
  var mark = true;
  var step = 0;
  var count = 0;
  for (var i = 0; i < 4; i++) {
    if (!User.Step[i] && mark) {
      step  = i;
      mark = false;
    }
    if (User.Step[i]) {
      count++;
    }
  }
  var goal = null;
  switch (step) {
    case 1:
      goal = 'lianxiren';
      break;
    case 2:
      goal = 'zhimafen';
      break;
    case 3:
      goal = 'yunyingshang';
      break;
  }
  if (count === 4) {
    api.sendEvent({name: 'CloseCertification'});
  }
  if (step > 0) {
    api.sendEvent({
      name: 'ChangeStep',
      extra: {
        goal: goal,
        step: step
      }
    });
  }
}
