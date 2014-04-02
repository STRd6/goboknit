Game Model
==========

    {defaults} = require "./util"
    Composition = require "composition"

    Bin = require "./bin"
    Cyborg = require "./cyborg"

    A = (name) ->
      (x) ->
        x[name]

    module.exports = (I={}) ->
      defaults I,
        cyborgs: [
          {}
        ]
        money: 10000
        purchasableFibers: [
          {type: "wool", price: 355, weight: 1}
          {type: "silk", price: 1090, weight: 1}
          {type: "bamboo", price: 550 , weight: 1}
        ]
        bins: [
        ]
        demand: []

      self = Composition(I)

      self.attrObservable "money", "purchasableFibers"
      self.attrModels "cyborgs", Cyborg
      self.attrModels "bins", Bin

      self.extend
        purchase: (item) ->
          if self.money() > item.price
            self.money(self.money() - item.price)

            self.purchasableFibers.remove(item)
            self.addInventory item

        addInventory: (item) ->
          found = false
          self.bins.each (bin) ->
            if bin.type() is item.type
              bin.amount(bin.amount() + item.weight)
            found = true

          unless found
            self.bins.push Bin
              type: item.type
              amount: item.weight

        produce: (input, cyborg) ->
          cyborg.pr

        sell: (item) ->

      self.yarnTypes = Observable ->
        res = self.bins().filter( (bin) ->
          bin.amount >= 1
        ).map A("type")

        console.log res

        return res

      return self
