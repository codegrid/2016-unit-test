function isPast(date) {
  var now = Date.now();
  return date.getTime() < now;
}

function getStatus(due, closed) {
  if(closed) {
    return 'closed';
  }
  return isPast(due) ? 'runout' : 'open';
}
