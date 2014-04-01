Bin
===

Hold an amount of a certain type of fiber.

    {defaults} = require "./util"
    Composition = require "composition"

    module.exports = (I={}) ->
      defaults I,
        type: "wool"
        amount: 0

      self = Composition(I)

      self.attrObservable "type", "amount"

      return self
