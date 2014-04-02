Cyborg
======

    {defaults} = require "./util"
    Composition = require "composition"

    Bin = require "./bin"

    module.exports = (I={}) ->
      defaults I,
        name: "Knitborg"
        durability: 25
        durabilityMax: 25

      self = Composition(I)

      self.attrObservable "name", "durability", "durabilityMax", "selectedBin"

      self.extend
        produce: (bin, output) ->
          unless bin
            alert "No yarn selected!"
            return

          n = 1

          if bin and bin.amount() >= n
            bin.amount(bin.amount() - n)
            output Bin
              type: bin.type()
              amount: n
          else
            alert "Insufficient Material"

      return self
