// ToDoリストのサンプル
//
$(function() {
  // ToDoリストを取得
  $.ajax({
    url: './api/list.json',
    method: 'get'
  })
  .done(function(data) {
    // 取得したリストを表示する
    var $todoContainer = $('#todoList');
    var $closedContainer = $('#closedList');

    data.list.forEach(function(todo) {
      var html = '<li class="todo todo-' + getStatus(new Date(todo.due), todo.closed) + '">' + todo.content + '</li>';

      // 完了してたら#closedListに入れる
      if(todo.closed) {
        $closedContainer.append(html);
      }
      // 完了してなかったら#todoListに入れる
      else {
        $todoContainer.append(html);
      }
    });
  });

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
  // @param due   期限
  // @param closed 完了状態
  function getStatus(due, closed) {
    if(closed) {
      return 'closed';
    }
    return isPast(due) ? 'runout' : 'open';
  }
});

