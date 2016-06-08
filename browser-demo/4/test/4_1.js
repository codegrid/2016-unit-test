describe('Todo.View.List', function() {
  var todo;
  beforeEach(function() {
    $('body').append('<ul id="closedList"></ul>');
    $('body').append('<ul id="todoList"></ul>');
    todo = new Todo.View.List(new Todo.Model.List());
  });
  afterEach(function(){
    $('#closedList').remove();
    $('#todoList').remove();
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
});

