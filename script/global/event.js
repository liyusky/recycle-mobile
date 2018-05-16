function sendLoginEvent() {
  api.sendEvent({
    name: 'LOGIN-EVENT'
  });
}

function sendLogoutEvent() {
  api.sendEvent({
    name: 'LOGOUT-EVENT'
  });
}