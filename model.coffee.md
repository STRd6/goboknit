Game Model
==========

    {defaults} = require "./util"
    Composition = require "composition"

    module.exports = (I={}) ->
      defaults I,
        money: 10000
        purchasableFibers: [
          {name: "wool", price: 355, weight: 1}
          {name: "silk", price: 1090, weight: 1}
          {name: "bamboo", price: 550 , weight: 1}
        ]
        inventory: []
        demand: []

      self = Composition(I)

      self.attrObservable "inventory", "money", "purchasableFibers"

      self.extend
        purchase: (item) ->
          if self.money() > item.price
            self.money(self.money() - item.price)

            purchasableFibers.remove(item)
            inventory.push item

        sell: (item) ->
          

      return self
