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

  describe('.fetch', function() {
    var server, method, url, response;
    beforeEach(function() {
      method = 'GET';
      url = './api/list.json';
      response = [
        200,
        { 'Content-Type': 'application/json' },
        JSON.stringify({ list: 'res' })
      ];
      server = sinon.fakeServer.create();
    });

    it('レスポンスのlistパラメータを、インスタンスのlistに格納する', function(done) {
      server.respondWith(method, url, response);
      todo.fetch().done(function(res) {
        expect(todo.list).to.eql('res');
        done();
      });
      server.respond();
    });
  });

  describe('.filterByClosed', function() {
    beforeEach(function() {
      todo.list = [
        { id: 1, closed: true },
        { id: 2, closed: false },
        { id: 3, closed: true },
        { id: 4, closed: false }
      ];
    });

    it('引数がtrueの時、todo.closedがtrueの項目のみ返す', function() {
      expect(todo.filterByClosed(true)).to.eql([
        { id: 1, closed: true },
        { id: 3, closed: true }
      ]);
    });

    it('引数がfalseの時、todo.closedがfalseの項目のみ返す', function() {
      expect(todo.filterByClosed(false)).to.eql([
        { id: 2, closed: false },
        { id: 4, closed: false }
      ]);
    });
  });
});


