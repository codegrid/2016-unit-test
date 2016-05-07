// isPast()のテスト
describe('isPast', function() {
  var clock;
  var fakeTime = (new Date('2016/5/1')).getTime();

  // 日付をモック化する
  beforeEach(function() { clock = sinon.useFakeTimers(fakeTime); });
  afterEach(function() { clock.restore() });

  it('引数dateが過去の場合trueを返すこと', function() {
    var date = new Date('2016/4/1');
    expect(isPast(date)).to.be(true);
  });

  it('引数dateが今日より未来の場合falseを返すこと', function() {
    var date = new Date();
    expect(isPast(date)).to.be(false);
    date = new Date('2016/6/1');
    expect(isPast(date)).to.be(false);
  });
});


// getStatus()のテスト
describe('getStatus', function() {
  var clock;
  var fakeTime = (new Date('2016/5/1')).getTime();

  beforeEach(function() { clock = sinon.useFakeTimers(fakeTime); });
  afterEach(function() { clock.restore() });

  it('今日または未来の日付で未完了の場合文字列openを返すこと', function() {
    var due = new Date();
    var closed = false;

    expect(getStatus(due, closed)).to.be('open');
    due = new Date('2016/6/1');
    expect(getStatus(due, closed)).to.be('open');
  });

  it('過去の日付で未完了の場合文字列runoutを返すこと', function() {
    var due = new Date('2016/4/1');
    var closed = false;

    expect(getStatus(due, closed)).to.be('runout');
  });

  it('完了している場合文字列closedを返すこと', function() {
    var due;
    var closed = true;

    expect(getStatus(due, closed)).to.be('closed');
  });
});


// getStatus()のテスト（stubを使用）
describe('getStatus (use stub)', function() {
  beforeEach(function() {
    sinon.stub(window, 'isPast');
    isPast = window.isPast; // テスト対象がグローバル関数なので再代入が必要
  });
  afterEach(function() {
    isPast.restore();
    isPast = window.isPast; // テスト対象がグローバル関数なので再代入が必要
  });

  it('期限切れでなく未完了の場合文字列openを返すこと', function() {
    var due;
    var closed = false;

    isPast.returns(false);
    expect(getStatus(due, closed)).to.be('open');
  });

  it('期限切れで未完了の場合文字列runoutを返すこと', function() {
    var due;
    var closed = false;

    isPast.returns(true);
    expect(getStatus(due, closed)).to.be('runout');
  });

  it('完了している場合文字列closedを返すこと', function() {
    var due;
    var closed = true;

    expect(getStatus(due, closed)).to.be('closed');
  });
});


describe('isPastの引数', function() {
  var clock;
  var fakeTime = (new Date('2016/5/1')).getTime();

  beforeEach(function() { clock = sinon.useFakeTimers(fakeTime); });
  afterEach(function() { clock.restore() });

  it('引数がDate型じゃない場合エラーになること', function() {
    expect(function() { isPast('2016/4/1') }).to.throwException('引数がただしくありません');
    expect(function() { isPast(new Date('hoge')) }).to.throwException('引数がただしくありません');
  });
});
