var typy = require('./')
var assert = require('assert')

function test(v, type) {
	var text = JSON.stringify(v) + ' is a'
	if(/^[aoie]/.test(type)) {
		text += 'n'
	}
	text += ' ' + type
	console.log(text)
	assert(typy(v, type), text.replace('is', 'isn\'t'))
}

test(1, typy.number)
test(null, typy.null)
test('hi', typy.str)
test(true, typy.bool)
test(false, typy.bool)
test(true, typy.object)
test({}, typy.object)