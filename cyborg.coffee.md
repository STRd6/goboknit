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
        selectedQuantity: 1

      self = Composition(I)

      self.attrObservable "name", "durability", "durabilityMax", "selectedBin", "selectedQuantity"

      self.extend
        repair: ->
          self.durability self.durabilityMax()

        produce: (bin, output) ->
          unless bin
            alert "No yarn selected!"
            return

          durability = self.durability()
          n = self.selectedQuantity()

          if durability < n
            alert "Cyborg is broken down :*"
            return

          if bin and bin.amount() >= n
            self.durability self.durability() - n
            bin.amount(bin.amount() - n)
            output
              type: bin.type()
              amount: n
          else
            alert "Insufficient Material"

      return self
