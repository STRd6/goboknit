Game Model
==========

    {defaults} = require "./util"
    Composition = require "composition"

    Bin = require "./bin"
    Cyborg = require "./cyborg"

    A = (name) ->
      (x) ->
        x[name]()

    module.exports = (I={}) ->
      defaults I,
        cyborgs: [
          {}
        ]
        money: 10000
        purchasableFibers: [
          {type: "wool", price: 355, amount: 1}
          {type: "silk", price: 1090, amount: 1}
          {type: "bamboo", price: 550 , amount: 1}
        ]
        bins: [
        ]
        inventory: []
        demand: []

      self = Composition(I)

      self.attrObservable "money", "purchasableFibers"
      self.attrModels "cyborgs", Cyborg
      self.attrModels "bins", Bin
      self.attrModels "inventory", Bin

      addStock = (item, pile) ->
        found = false
        pile.each (bin) ->
          if bin.type() is item.type
            bin.amount(bin.amount() + item.amount)
            found = true

        unless found
          pile.push Bin
            type: item.type
            amount: item.amount

      self.extend
        purchase: (item) ->
          if self.money() > item.price
            self.money(self.money() - item.price)

            self.purchasableFibers.remove(item)
            self.addResource item

        addResource: (item) ->
          addStock(item, self.bins)

        output: (item) ->
          console.log item
          addStock(item, self.inventory)

        yarnTypes: ->
          self.bins().filter( (bin) ->
            bin.amount() >= 1
          ).map A("type")

        sell: (item) ->

      self.yarnTypes = Observable self.yarnTypes

      self.yarnTypes.observe (types) ->
        console.log types

      return self
