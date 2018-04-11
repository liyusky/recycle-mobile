function check(params) {
  try {
    params.init();
  } catch (e) { }

  var flag = true;

  for (var key in params) {
    var value = params[type];
    if (value instanceof Array) {
      value.map(function (item) {
        evalFunction(key);
      });
    }
    else {
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
    } catch (e) { }
  }
  else {
    try {
      params.fail(flag);
    } catch (e) { }
  }

  try {
    params.default(flag);
  } catch (e) { }

  return flag;
}