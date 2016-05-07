// 引数が過去の日付か調べる
function isPast(date) {
  var now = Date.now();
  if(!(date instanceof Date) || isNaN(date.getTime())) {
    throw Error('引数がただしくありません');
    return;
  }
  return date.getTime() < now;
}

// 期限と完了状態からステータスを文字列で返す
// @param due    期限
// @param closed 完了状態
function getStatus(due, closed) {
  if(closed) {
    return 'closed';
  }
  return isPast(due) ? 'runout' : 'open';
}

