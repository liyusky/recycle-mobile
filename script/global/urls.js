var productionAppApi = {
  'ApplyStatus': 'http://192.168.0.110:8008/JDBService.svc/GetZXJD', // home 申请状态
  'PhonePrice': 'http://192.168.0.110:8008/JDBService.svc/GetZXJD', // offer 申请状态
  'SubmitApply': 'http://192.168.0.110:8008/JDBService.svc/ShanDianDai', // offer 提交定胆
  'UserRegister': 'http://192.168.0.110:8008/JDBService.svc/UserRegister', // register 用户注册
  'UserLogin': 'http://192.168.0.110:8008/JDBService.svc/UserLogin', // login 用户登陆
  'FindPassword':'http://192.168.0.110:8008/JDBService.svc/FindPass', // 找回密码
  'SendSMS':'http://192.168.0.110:8008/JDBService.svc/SendTemplateSMS_XJFD', // 发送短信
  'Certification': 'http://192.168.0.110:8008/JDBService.svc/GetHYXX', // 获取认证状态
  'ShenFenXinXi': 'http://192.168.0.110:8008/JDBService.svc/ShenFenXinXi', // 身份信息
  'GetZhimaAuthInfoUrl': 'http://192.168.0.110:8008/JDBService.svc/ZMFSQ', // 身份信息
  'PhoneOperatorAuthUrl': 'http://192.168.0.110:8008/JDBService.svc/PhoneOperatorAuthUrl', // 身份信息
  'LianXiRenXinXi':'http://192.168.0.110:8008/JDBService.svc/AddTXL', // 身份信息
  'GetZXJD':'http://192.168.0.110:8008/JDBService.svc/GetZXJD', //  订单进度
  'YinHangKa_STEP1':'http://192.168.0.110:8008/JDBService.svc/YinHangKa_STEP1',
  'AddYHK':'http://192.168.0.110:8008/JDBService.svc/AddYHK',   // 添加银行卡
  'GetHYYHK':'http://192.168.0.110:8008/JDBService.svc/GetHYYHK',    // 获取银行卡列表
  'EditReceivingAddress':'http://192.168.0.110:8008/JDBService.svc/EditReceivingAddress', //添加或修改收货地址
  'GetRA':'http://192.168.0.110:8008/JDBService.svc/GetRA',   // 获取收货地址信息
  'GetHYJKJL':'http://192.168.0.110:8008/JDBService.svc/GetHYJKJL', // 回收记录
  'CheckAccount':'http://192.168.0.110:8008/JDBService.svc/IsExists', // 检查用户是否注册
  'FKYJ':'http://192.168.0.110:8008/JDBService.svc/FKYJ', // 用户反馈
  'IsExistsJT':'http://192.168.0.110:8008/JDBService.svc/IsExistsJT', // 是否存在借条
  'ImageKey':'http://192.168.0.110:8008/JDBService.svc/GenerateKey',  // 获取key
  'ImageCode': 'http://192.168.0.110:8008/JDBService.svc/GrapheCodeImg',
  'PaymentAmount':'http://192.168.0.200:4201/PaymentAmount.json'
};

var developmentAppApi = {
  'Certification': 'http://192.168.0.109:8080/Certification.json',
  'CheckAccount': 'http://192.168.0.109:8080/CheckAccount.json',
  'FindPassword': 'http://192.168.0.109:8080/FindPassword.json',
  'ModifyPassword': 'http://192.168.0.109:8080/ModifyPassword.json',
  'SendSMS': 'http://192.168.0.109:8080/SendSMS.json',
  'UserLogin': 'http://192.168.0.109:8080/UserLogin.json',
  'UserRegister': 'http://192.168.0.109:8080/UserRegister.json',
  'ShenFenXinXin': 'http://192.168.0.109:8080/ShenFenXinXin.json',
  'LianXiRenXinXi': 'http://192.168.0.109:8080/LianXiRenXinXi.json',
};
