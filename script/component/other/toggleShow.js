function show (id) {
  if ($api.hasCls(id, 'hide')) {
    $api.removeCls(id, 'hide');
  }
}

function hide(id) {
  if (!$api.hasCls(id, 'hide')) {
    $api.addCls(id, 'hide');
  }
}

function toggleShow(id) {
  if ($api.hasCls(id, 'hide')) {
    $api.removeCls(id, 'hide');
  }
  else {
    if (!$api.hasCls(id, 'hide')) {
      $api.addCls(id, 'hide');
    }
  }
}
