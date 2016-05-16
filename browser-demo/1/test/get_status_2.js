describe('getStatus (use stub)', function() {
  var due;

  beforeEach(function() {
    sinon.stub(window, 'isPast');
    isPast = window.isPast; // テスト対象がグローバル関数なので再代入が必要*
  });
  afterEach(function() {
    window.isPast.restore()
    isPast = window.isPast;
  });

  context('完了している場合', function() {
    var closed = true;

    it('文字列closedを返すこと', function() {
      expect(getStatus(due, closed)).to.be('closed');
    });
  });

  context('完了していない場合', function() {
    var closed = false;

    it('期限を過ぎていなかったら文字列openを返す', function() {
      window.isPast.returns(false);
      expect(getStatus(due, closed)).to.be('open');
    });

    it('期限を過ぎていたら文字列runoutを返す', function() {
      window.isPast.returns(true);
      expect(getStatus(due, closed)).to.be('runout');
    });
  });
});

