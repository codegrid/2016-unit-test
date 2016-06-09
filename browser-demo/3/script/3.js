window.Todo = (function() {
  var Todo = {
    Model: {},
    View: {}
  };

  // ToDoリストのモデル
  Todo.Model.List = (function() {
    function List() {
      this.url = './api/list.json';
      this.list = [];
    }

    List.prototype.fetch = function() {
      return $.ajax({
        url: this.url,
        method: 'get'
      })
      .done((function(res) {
        this.list = res.list;
      }).bind(this));
    };

    List.prototype.filterByClosed = function(closed) {
      return this.list.filter(function(target) {
        return target.closed === closed;
      });
    };

    List.prototype.isPast = function(date) {
      var now = Date.now();
      if(!(date instanceof Date) || isNaN(date.getTime())) {
        throw Error('引数が正しくありません');
        return;
      }
      return date.getTime() < now;
    };

    List.prototype.getStatus = function(todo) {
      if(todo.closed) {
        return 'closed';
      }
      return this.isPast(new Date(todo.due)) ? 'runout' : 'open';
    };

    return List;
  })();

  // ToDoリストのビュー
  Todo.View.List = (function() {
    function List(model) {
      this.model = model;
      this.element = {
        todoList  : $('#todoList'),
        closedList: $('#closedList')
      };
    }

    List.prototype.createHtml = function(list) {
      function template(className, content) {
        return '<li class="' + className + '">' + content + '</li>';
      };
      var html = [];

      list.forEach((function(todo) {
        var className = 'todo todo-' + this.model.getStatus(todo);
        html.push(template(className, todo.content));
      }).bind(this));

      return html.join('');
    };

    List.prototype.renderClosed = function() {
      if(this.model.length === 0) return;
      var list = this.model.filterByClosed(true);
      var html = this.createHtml(list);
      this.element.closedList.append(html);
    };

    List.prototype.renderOpening = function() {
      if(this.model.length === 0) return;
      var list = this.model.filterByClosed(false);
      var html = this.createHtml(list);
      this.element.todoList.append(html);
    };

    List.prototype.render = function() {
      this.model.fetch().done((function() {
        this.renderClosed();
        this.renderOpening();
      }).bind(this));
    };

    return List;
  })();

  return Todo;
})();

$(function() {
  var view = new Todo.View.List(new Todo.Model.List());
  view.render();
});


