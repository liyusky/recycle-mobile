/**
 * [check 检查]
 * @method      checkBankCard
 * @param       {[json]}    params    {init: fn, type: {bankCard: ['', '', ''], phone: ''} success: fn,}
 * @return      {[boolean]}           [true: 格式正确 / false: 格式错误]
 * @version     [1.0]
 * @author      [潘剑]
 * @Proofreader [潘剑]
 * @datetime    2017-10-21T17:23:25+080
 */
function check(params) {
  try {
    params.init();
  } catch (e) {}

  var flag = true;

  for (var key in params) {
    var value = params[type];
    if (value instanceof Array) {
      value.map(function (item) {
        evalFunction(key);
      });
    } else {
      evalFunction(key);
    }
  }

  function evalFunction(type) {
    type = type.substr(0, 1).toUpperCase() + type.substr(1);
    return eval('flag = check' + type + '(value) && flag');
  }

  if (flag) {
    try {
      params.success(flag);
    } catch (e) {}
  }
  else {
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
 * [checkBankCard 检查银行卡]
 * @method      checkBankCard
 * @param       {[string]}     card   [银行卡]
 * @return      {[boolean]}           [true: 格式正确 / false: 格式错误]
 * @version     [1.0]
 * @author      [潘剑]
 * @Proofreader [潘剑]
 * @datetime    2017-10-21T17:23:25+080
 */
function checkBankCard(card) {
  var result = true;
  if (!card) {
    toast('银行卡不能为空');
    result = false;
  } else {
    var reg = /^\d{16,19}$/;
    if (!reg.test(card)) {
      toast('储蓄卡格式错误');
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
function checkID(id) {
  var result = true;
  if (!id) {
    result = false;
  } else if (!isID(id)) {
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
  function isID(value) {
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

  function isDateTime(format, reObj) {
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
  }
}
/**
 * [checkImageVerificationCode 检查验证码格式]
 * @method      checkImageVerificationCode
 * @param       {[string]}   verificationCode [验证码]
 * @return      {[boolean]}                   [true: 格式正确 / false: 格式错误]
 * @version     [1.0]
 * @author      [潘剑]
 * @Proofreader [潘剑]
 * @datetime    2017-10-12T11:08:03+080
 */
function checkImageVerificationCode(code) {
  var result = true;
  if (!code) {
    toast('请输入图片验证码');
    result = false;
  } else {
    var pat = new RegExp('^[A-Za-z0-9]{4}$', 'i');
    if (!pat.test(code)) {
      toast('图片验证码格式错误');
      result = false;
    }
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
    toast('姓名不能为空');
    result = false;
  } else {
    var reg = /^[\u4e00-\u9fa5]{2,}$/;
    if (!reg.test(name)) {
      toast('姓名格式错误');
      result = false;
    }
  }
  return result;
}
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
function checkPassword(password) {
  var result = true;
  if (!password) {
    toast('请输入密码');
    result = false;
  } else if (password.length < 6) {
    toast('请输入6~16密码');
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
function checkPhone(phone) {
  var tipFlag = arguments[1];
  var result = true;
  if (!phone) {
    if (tipFlag) toast('手机号不能为空');
    result = false;
  } else {
    if (phone.length < 11) {
      if (tipFlag) toast('请不要选择短号');
      result = false;
    } else {
      var pat = new RegExp('^(?:13|14|15|17|18)[0-9]{9}$', 'i');
      if (!pat.test(phone)) {
        if (tipFlag) toast('手机号格式错误');
        result = false;
      }
    }
  }
  return result;
}

/**
 * [checkPhoneVerificationCode 检查验证码格式]
 * @method      checkPhoneVerificationCode
 * @param       {[string]}   code [验证码]
 * @return      {[boolean]}                   [true: 格式正确 / false: 格式错误]
 * @version     [1.0]
 * @author      [潘剑]
 * @Proofreader [潘剑]
 * @datetime    2017-10-12T11:08:03+080
 */
function checkPhoneVerificationCode(code) {
  var result = true;
  if (!code) {
    toast('请输入验证码');
    result = false;
  } else {
    var pat = new RegExp('^[0-9]{6}$', 'i');
    if (!pat.test(code)) {
      toast('验证码格式错误');
      result = false;
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
function checkVerificationCode(verificationCode) {
  var result = true;
  if (!verificationCode) {
    toast('请输入验证码');
    result = false;
  } else {
    var pat = new RegExp('^[0-9]{6}$', 'i');
    if (!pat.test(verificationCode)) {
      toast('验证码格式错误');
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
function checkUrl(url) {
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
    // toast('性别不能为空');
    result = false;
  } else if (sex !== '男' && sex !== '女') {
    // toast('性别不能为非男女');
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
    // toast('姓名不能为空');
    result = false;
  } else {
    var reg = /^[\u4e00-\u9fa5]{2,}$/;
    if (!reg.test(name)) {
      // toast('姓名格式错误');
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
    toast('银行卡不能为空');
    result = false;
  } else {
    var reg = /^\d{16,19}$/;
    if (!reg.test(card)) {
      toast('储蓄卡格式错误');
      result = false;
    }
  }
  return result;
}