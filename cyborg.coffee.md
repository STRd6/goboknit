Cyborg
======

    {defaults} = require "./util"
    Composition = require "composition"

    module.exports = (I={}) ->
      defaults I,
        name: "Knitborg"
        durability: 25
        durabilityMax: 25

      self = Composition(I)

      self.attrObservable "name", "durability", "durabilityMax"

      return self
