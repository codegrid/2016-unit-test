function isPast(date) {
  var now = Date.now();
  return date.getTime() < now;
}

