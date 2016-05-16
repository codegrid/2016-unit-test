describe('isPast', function() {
  var clock;
  var fakeTime = (new Date('2016/5/1')).getTime();

  // 日付のスタブ*を作成する
  beforeEach(function() { clock = sinon.useFakeTimers(fakeTime); });
  afterEach(function() { clock.restore() });

  it('引数が過去の日付の場合はtrueを返す', function() {
    var date = new Date('2016/4/1');
    expect(isPast(date)).to.be(true);
  });

  it('引数が今日、もしくは未来の場合はfalseを返す', function() {
    var date = new Date();
    expect(isPast(date)).to.be(false);
    date = new Date('2016/6/1');
    expect(isPast(date)).to.be(false);
  });

  it('引数がDate型ではない場合エラーになること', function() {
    expect(function() { isPast('2016/4/1') }).to.throwException('引数が正しくありません');
  });

  it('引数がInvalid Dateの場合エラーになること', function() {
    expect(function() { isPast(new Date('hoge')) }).to.throwException('引数が正しくありません');
  });
});

