describe('getStatus', function() {
  var clock;
  var fakeTime = (new Date('2016/5/1')).getTime();

  beforeEach(function() { clock = sinon.useFakeTimers(fakeTime); });
  afterEach(function() { clock.restore() });

  context('完了している場合', function() {
    var closed = true;

    it('文字列closedを返す', function() {
      var due;

      expect(getStatus(due, closed)).to.be('closed');
    });
  });

  context('完了していない場合', function() {
    var closed = false;

    it('期限を過ぎていなかったら文字列openを返す', function() {
      var due = new Date();

      expect(getStatus(due, closed)).to.be('open');
      due = new Date('2016/6/1');
      expect(getStatus(due, closed)).to.be('open');
    });

    it('期限を過ぎていたら文字列runoutを返す', function() {
      var due = new Date('2016/4/1');

      expect(getStatus(due, closed)).to.be('runout');
    });
  })
});
