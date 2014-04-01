Game Model
==========

    {defaults} = require "./util"
    Composition = require "composition"

    Bin = require "./bin"

    module.exports = (I={}) ->
      defaults I,
        money: 10000
        purchasableFibers: [
          {type: "wool", price: 355, weight: 1}
          {type: "silk", price: 1090, weight: 1}
          {type: "bamboo", price: 550 , weight: 1}
        ]
        inventory: [
        ]
        demand: []

      self = Composition(I)

      self.attrObservable "inventory", "money", "purchasableFibers"

      self.extend
        purchase: (item) ->
          if self.money() > item.price
            self.money(self.money() - item.price)

            self.purchasableFibers.remove(item)
            self.addInventory item

        addInventory: (item) ->
          found = false
          self.inventory.each (bin) ->
            if bin.type() is item.type
              bin.amount(bin.amount() + item.weight)
            found = true

          unless found
            self.inventory.push Bin
              type: item.type
              amount: item.weight

        sell: (item) ->
          

      return self
