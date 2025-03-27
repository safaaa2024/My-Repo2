function getCookie(cookieName) {
  if (!cookieName) {
      return "";
  }
  var startIndex = document.cookie.indexOf(cookieName + "=");
  if (startIndex === -1) {
      return "";
  }
  var startString = document.cookie.substring(startIndex);
  var keyVal = startString.substring(0, startString.indexOf(";") === -1 ? startString.length : startString.indexOf(";"));
  return keyVal.split("=")[1].trim();
}

function setCookie(cookieName, cookieValue, expiryDate) {
  if (!expiryDate) {
      // session cookie
      document.cookie = `${cookieName.trim()}=${cookieValue};path=/`;
      return;
  }
  // persistent cookie
  document.cookie = `${cookieName.trim()}=${cookieValue};expires=${expiryDate.toUTCString()};path=/`;
}

function deleteCookie(cookieName) {
  var pastDate = new Date();
  pastDate.setMonth(pastDate.getMonth() - 2);
  document.cookie = `${cookieName}=;expires=${pastDate.toUTCString()};path=/`;
}

function deleteAllCookies() {
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
      document.cookie = `${name.trim()}=;expires=${new Date(0).toUTCString()};path=/`;
  }
}

function allCookieList() {
  const result = [];
  for (let str of document.cookie.split(";")) {
      const parts = str.split("=");
      result.push({ name: parts[0].trim(), value: parts[1] ? parts[1].trim() : "" });
  }
  return result;
}

function hasCookie(cookieName) {
  const regex = new RegExp(`(?:^|;\\s*)${cookieName}=`);
  return regex.test(document.cookie);
}

(function () {
  if (!window.localStorage) {
      const localStorage = {
          getItem: (key) => {
              return getCookie(key);
          },
          setItem: (key, value) => {
              const expiryDate = new Date();
              expiryDate.setFullYear(expiryDate.getFullYear() + 99); // Set expiry to 99 years
              setCookie(key, value, expiryDate);
          },
          removeItem: (key) => {
              deleteCookie(key);
          },
          clear: () => {
              deleteAllCookies();
          },
      };

      window.localStorage = localStorage;
  }
})();
