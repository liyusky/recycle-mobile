function show (dom) {
  if ($api.hasCls(dom, 'hide')) {
    $api.removeCls(dom, 'hide');
  }
}

function hide (dom) {
  if (!$api.hasCls(dom, 'hide')) {
    $api.addCls(dom, 'hide');
  }
}

function toggleShow (dom) {
  if ($api.hasCls(dom, 'hide')) {
    $api.removeCls(dom, 'hide');
  }
  else {
    if (!$api.hasCls(dom, 'hide')) {
      $api.addCls(dom, 'hide');
    }
  }
}
