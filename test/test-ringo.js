var system = require('system');
var assert = require('assert');

var validator = require('../lib/validator');

function test(options) {
    var args = options.args || [];
    args.unshift(null);
    if (options.valid) {
        options.valid.forEach(function (valid) {
            args[0] = valid;
            assert.isTrue(validator[options.validator].apply(validator, args));
        });
    }
    if (options.invalid) {
        options.invalid.forEach(function (invalid) {
            args[0] = invalid;
            assert.isFalse(validator[options.validator].apply(validator, args));
        });
    }
};

exports.testRingoStyle = function() {
    assert.isTrue(validator.isEmail('rhino@ringojs.org'));
    assert.strictEqual(typeof validator.isEmail, 'function');
    assert.strictEqual(typeof validator.isAlpha, 'function');
    assert.strictEqual(typeof validator.toBoolean, 'function');
    assert.strictEqual(typeof validator.toFloat, 'function');
};

exports.testEmail = function() {
    test({
        validator: 'isEmail'
      , valid: [
            'foo@bar.com'
          , 'x@x.x'
          , 'foo@bar.com.au'
          , 'foo+bar@bar.com'
          , 'hans.müller@test.com'
          , 'hans@müller.com'
          , 'test|123@müller.com'
        ]
      , invalid: [
            'invalidemail@'
          , 'invalid.com'
          , '@invalid.com'
        ]
    });
};

if (require.main == module.id) {
    system.exit(require('test').run(exports));
}