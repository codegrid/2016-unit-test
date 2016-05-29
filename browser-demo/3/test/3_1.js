// Todo.Model.Listのテスト
describe('Todo.Model.List', function() {
  var todo;
  beforeEach(function() {
    todo = new Todo.Model.List();
  });

  describe('.isPast', function() {
    var clock;
    var fakeTime = (new Date('2016/5/1')).getTime();

    // 日付をモック化する
    beforeEach(function() { clock = sinon.useFakeTimers(fakeTime); });
    afterEach(function() { clock.restore() });

    it('引数が過去の日付の場合はtrueを返す', function() {
      var date = new Date('2016/4/1');
      expect(todo.isPast(date)).to.be(true);
    });

    it('引数が今日、もしくは未来の場合はfalseを返す', function() {
      var date = new Date();
      expect(todo.isPast(date)).to.be(false);
      date = new Date('2016/6/1');
      expect(todo.isPast(date)).to.be(false);
    });

    it('引数がDate型じゃない場合エラーになること', function() {
      expect(function() { todo.isPast('2016/4/1') }).to.throwException('引数がただしくありません');
    });

    it('引数がInvalid Dateの場合エラーになること', function() {
      expect(function() { todo.isPast(new Date('hoge')) }).to.throwException('引数がただしくありません');
    });
  });

  describe('.getStatus', function() {
    var due;
    var dummyTodo;

    beforeEach(function() {
      sinon.stub(todo, 'isPast');
      dummyTodo = {};
    });
    afterEach(function() {
      todo.isPast.restore()
    });

    context('完了している場合', function() {
      beforeEach(function() {
        dummyTodo.closed = true;
      });

      it('文字列closedを返すこと', function() {
        expect(todo.getStatus(dummyTodo)).to.be('closed');
      });
    });

    context('完了していない場合', function() {
      beforeEach(function() {
        dummyTodo.closed = false;
        dummyTodo.due = '2016/5/1';
      });

      it('期限を過ぎていなかったら文字列openを返す', function() {
        todo.isPast.returns(false);
        expect(todo.getStatus(dummyTodo)).to.be('open');
      });

      it('期限を過ぎていたら文字列runoutを返す', function() {
        todo.isPast.returns(true);
        expect(todo.getStatus(dummyTodo)).to.be('runout');
      });
    });
  });
});


