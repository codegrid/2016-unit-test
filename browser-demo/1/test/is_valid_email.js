describe('isValidEmail', function() {
  context('メールアドレスとして正しい文字列が入力された場合', function() {
    it('trueを返す', function() {
      expect(isValidEmail('test-1+codegrid@example.com')).to.be(true);
    });
  });

  context('メールアドレスとして正しくない文字列が入力された場合', function() {
    var args = [
      'test@example',
      'test()@example.com'
    ];
    args.forEach(function(arg) {
      it(arg + 'のときfalseを返す', function() {
        expect(isValidEmail(arg)).to.be(false);
      });
    })
  });

  context('文字列以外の値が渡された場合', function() {
    var args = [
      ['0のとき', 0],
      ['配列のとき', []],
      ['オブジェクトのとき', {}],
      ['booleanのとき', true],
      ['undefinedのとき', undefined],
      ['nullのとき', null],
      ['NaNのとき', NaN]
    ];
    args.forEach(function(arg) {
      it(arg[0] + 'falseを返す', function() {
        expect(isValidEmail(arg[1])).to.be(false);
      });
    });
  });
});

