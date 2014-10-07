function typy(o) {
	var types = []

	function add() {
		;[].forEach.call(arguments, function(type) {
			if(typeof(type) != 'string') throw new Error('must be a string')
			if(!~types.indexOf(type)) types.push(type)
		})
	}

	if(o === null) add(typy.null)
	if(o === undefined) add(typy.undefined)

	if(o !== null && o !== undefined) {
		var proto = o

		if(typeof(proto) == 'boolean') proto = new Boolean(proto)
		if(typeof(proto) == 'number') proto = new Number(proto)
		if(typeof(proto) == 'string') proto = new String(proto)

		while(typeof(proto) == 'object' && proto !== null) {
			if(typeof(proto.type) == 'string') add(proto.type)

			if(proto.implements !== null && proto.implements !== undefined && typeof(proto.implements.length) == 'number')
				add.apply(null, [].slice.call(proto.implements))

			proto = Object.getPrototypeOf(proto)
		}
	}

	types.is = function() {
		return [].every.call(arguments, function(type) {
			return ~types.indexOf(type)
		})
	}

	types.isDefined = function() {
		return types.indexOf(typy.null) && types.indexOf(typy.undefined)
	}

	types.isnt = function() {
		return [].every.call(arguments, function(type) {
			return types.indexOf(type)
		})
	}

	if(arguments.length > 1)
		return types.is.apply(types, [].slice.call(arguments, 1))
	else
		return types
}

module.exports = typy

{
	// Object
	{
		typy.object = 'object'
		Object.prototype.type = 'es|object'
		Object.prototype.implements = [typy.object]
	}

	// Null
	{
		typy.null = 'nil'
		typy.nil = 'nil'
	}

	// Undefined
	{
		typy.undefined = 'undefined'
		typy.undef = 'undefined'
	}

	// Set
	{
		typy.set = 'set'
		var Set = require('es6-set')
		Set.prototype.type = 'es6|set'
		Set.prototype.implements = [typy.set]
	}

	// Map
	{
		typy.map = 'map'
		var Map = require('es6-map')
		Map.prototype.type = 'es6|map'
		Map.prototype.implements = [typy.map]
	}

	// String
	{
		typy.string = 'string'
		typy.text = 'string'
		typy.str = 'string'
		String.prototype.type = 'es|string'
		String.prototype.implements = [typy.str]
	}

	// Array
	{
		typy.array = 'array'
		typy.arr = 'array'
		typy.ary = 'array'
		Array.prototype.type = 'es|array'
		Array.prototype.implements = [typy.ary]
	}

	// Number
	{
		typy.number = 'number'
		typy.num = 'number'
		Number.prototype.type = 'es|number'
		Number.prototype.implements = [typy.number]
	}

	// Boolean
	{
		typy.boolean = 'boolean'
		typy.bool = 'boolean'
		Boolean.prototype.type = 'es|boolean'
		Boolean.prototype.implements = [typy.boolean]
	}
}