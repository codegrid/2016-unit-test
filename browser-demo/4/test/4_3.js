describe('Todo.View.List', function() {
  var todo;
  beforeEach(function() {
    $('body').append('<div id="closedList"></div>');
    $('body').append('<div id="todoList"></div>');
    todo = new Todo.View.List(new Todo.Model.List());
  });

  describe('.render', function() {
    beforeEach(function() {
      sinon.stub(todo.model, 'fetch', function() {
        return {
          done: function(cb) {
            cb();
          }
        };
      });
      sinon.stub(todo, 'renderClosed');
      sinon.stub(todo, 'renderOpening');
      todo.render();
    });
    afterEach(function() {
      todo.model.fetch.restore();
      todo.renderClosed.restore();
      todo.renderOpening.restore();
    });

    it('model.fetchメソッドが呼ばれる', function() {
      expect(todo.model.fetch.calledOnce).to.be.ok();
    });

    it('renderClosedメソッドが呼ばれる', function() {
      expect(todo.renderClosed.calledOnce).to.be.ok();
    });

    it('renderOpeningメソッドが呼ばれる', function() {
      expect(todo.renderOpening.calledOnce).to.be.ok();
    });
  });

  describe('.createHtml', function() {
    var dummyList = [
      { content: 'todo 1' },
      { content: 'todo 2' },
      { content: 'todo 3' }
    ];
    beforeEach(function() {
      sinon.stub(todo.model, 'getStatus', function() {
        return 'STATUS';
      });
    });

    it('リストの内容に従ってHTML文字列を返す', function() {
      expect(todo.createHtml(dummyList)).to.be(
        '<li class="todo todo-STATUS">todo 1</li>' +
        '<li class="todo todo-STATUS">todo 2</li>' +
        '<li class="todo todo-STATUS">todo 3</li>'
      );
    });
  });

  describe('.renderClosed', function() {
    beforeEach(function() {
      sinon.stub(todo, 'createHtml', function() {
        return '<li class="todo">todo closed</li>';
      });
      todo.renderClosed();
    });

    it('完了したToDoリストを#closedListに挿入すること', function() {
      expect(todo.element.closedList.length).to.be(1);
    });
  });

  describe('.renderOpening', function() {
    beforeEach(function() {
      sinon.stub(todo, 'createHtml', function() {
        return '<li class="todo">todo opening</li>';
      });
      todo.renderClosed();
    });

    it('完了したToDoリストを#todoListに挿入すること', function() {
      expect(todo.element.todoList.length).to.be(1);
    });
  });
});

