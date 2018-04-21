var  testAppApi = {
  'UserRegister': 'http://192.168.0.110:8008/JDBService.svc/UserRegister', // 用户注册
  'UserLogin':'http://192.168.0.110:8008/JDBService.svc/UserLogin', // 用户登陆
  'FindPass':'http://192.168.0.110:8008/JDBService.svc/FindPass', // 找回密码
  'SendSMS':'http://192.168.0.110:8008/JDBService.svc/SendTemplateSMS_XJFD', // 发送短信
  'ShanDianDai':'http://192.168.0.110:8008/JDBService.svc/ShanDianDai', // 提交定胆
  'GetZXJD':'http://192.168.0.110:8008/JDBService.svc/GetZXJD', //  订单进度
  'ShenFenXinXi':'http://192.168.0.110:8008/JDBService.svc/GetZXJD' // 身份验证
};

var developmentAppApi = {
  'SendSMS': 'http://192.168.0.109:8080/SendSMS.json',
  'CheckAccount': 'http://192.168.0.109:8080/CheckAccount.json',
  'UserLogin': 'http://192.168.0.109:8080/UserLogin.json',
  'UserRegister': 'http://192.168.0.109:8080/UserRegister.json',
  'FindPassword': 'http://192.168.0.109:8080/FindPassword.json',  'FindPassword': 'http://192.168.0.109:8080/FindPassword.json',
  'ModifyPassword': 'http://192.168.0.109:8080/ModifyPassword.json',
}
