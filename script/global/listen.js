function loginEventListener() {
  api.addEventListener({
      name: 'LOGIN-EVENT'
    },
    function (ret, err) {
      init();
    }
  );
}

function logoutEventListener(callback) {
  api.addEventListener({
      name: 'LOGOUT-EVENT'
    },
    function () {
      init();
      clearUser();
      if (callback) callback();
    }
  );
}

function offlineEventListener() {
  api.addEventListener({
      name: 'OFFLINE-EVENT'
    },
    function () {
      create('offline');
    }
  );
}