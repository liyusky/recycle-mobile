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
function checkPassword(password, message) {
  var result = true;
  message = message ? message : '请输入密码';
  if (!password) {
    toast(message);
    result = false;
  }
  else if (password.length < 6) {
    toast('请输入6~16密码');
    result = false;
  }
  return result;
}