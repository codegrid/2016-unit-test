function isPast(date) {
  var now = Date.now();
  // Date型ではない場合はエラー
  if(!(date instanceof Date) || isNaN(date.getTime())) {
    throw Error('引数が正しくありません');
    return;
  }
  return date.getTime() < now;
}

