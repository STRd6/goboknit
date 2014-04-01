Cyborg
======

    {defaults} = require "./util"
    Composition = require "composition"

    module.exports = (I={}) ->
      defaults I,
        name: "Knitborg"

      self = Composition(I)

      self.attrObservable "name"

      return self
