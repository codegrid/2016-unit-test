// 入力値がメールアドレスか簡易に調べる
function isValidEmail(str) {
  var reg = /^([a-z0-9_]|\-|\.|\+)+@(([a-z0-9_]|\-)+\.)+[a-z]{2,6}$/i;
  if(typeof str !== 'string') {
    return false;
  }
  if(!reg.test(str)) {
    return false;
  }
  return true;
}

