var productionAppApi = {
  'UserRegister': 'http://192.168.0.110:8008/JDBService.svc/UserRegister', // 用户注册
  'UserLogin':'http://192.168.0.110:8008/JDBService.svc/UserLogin', // 用户登陆
  'FindPassword':'http://192.168.0.110:8008/JDBService.svc/FindPass', // 找回密码
  'SendSMS':'http://192.168.0.110:8008/JDBService.svc/SendTemplateSMS_XJFD', // 发送短信
  'ShanDianDai':'http://192.168.0.110:8008/JDBService.svc/ShanDianDai', // 提交定胆
  'GetZXJD':'http://192.168.0.110:8008/JDBService.svc/GetZXJD', //  订单进度
  'ShenFenXinXi':'http://192.168.0.110:8008/JDBService.svc/GetZXJD', // 身份验证
  'YinHangKa_STEP1':'http://192.168.0.110:8008/JDBService.svc/YinHangKa_STEP1',
  'AddYHK':'http://192.168.0.110:8008/JDBService.svc/AddYHK',   // 添加银行卡
  'GetHYYHK':'http://192.168.0.110:8008/JDBService.svc/GetHYYHK',    // 获取银行卡列表
  'EditReceivingAddress':'http://192.168.0.110:8008/JDBService.svc/EditReceivingAddress', //添加或修改收货地址
  'GetRA':'http://192.168.0.110:8008/JDBService.svc/GetRA',   // 获取收货地址信息
  'GetHYJKJL':'http://192.168.0.110:8008/JDBService.svc/GetHYJKJL', // 回收记录
  'CheckAccount':'http://192.168.0.110:8008/JDBService.svc/IsExists', // 检查用户是否注册  
  'FKYJ':'http://192.168.0.110:8008/JDBService.svc/FKYJ', // 用户反馈
  'IsExistsJT':'http://192.168.0.110:8008/JDBService.svc/IsExistsJT', // 是否存在借条
  'GenerateKey':'http://192.168.0.110:8008/JDBService.svc/GenerateKey',  // 获取key
  'GrapheCodeImg':'http://192.168.0.110:8008/JDBService.svc/GrapheCodeImg'
};

var developmentAppApi = {
  'Certification': 'http://192.168.0.109:8008/Certification.json',
  'CheckAccount': 'http://192.168.0.109:8008/CheckAccount.json',
  'FindPassword': 'http://192.168.0.109:8008/FindPassword.json',
  'ModifyPassword': 'http://192.168.0.109:8008/ModifyPassword.json',
  'SendSMS': 'http://192.168.0.109:8008/SendSMS.json',
  'UserLogin': 'http://192.168.0.109:8008/UserLogin.json',
  'UserRegister': 'http://192.168.0.109:8008/UserRegister.json'
};


var testAppApi = {
    'add-address':'http://192.168.0.200:4201/add-address.json',
    'addcard':'http://192.168.0.200:4201/addcard.json',
    'records':'http://192.168.0.200:4201/records.json',
    'getaddress':'http://192.168.0.200:4201/getaddress.json',
    'Verifycard':'http://192.168.0.200:4201/Verifycard.json',
    'getcard':'http://192.168.0.200:4201/getcard.json'
}
