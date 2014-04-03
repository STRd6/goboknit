Game Model
==========

    {defaults, extend} = require "./util"
    Composition = require "composition"

    Bin = require "./bin"
    Cyborg = require "./cyborg"
    fibers = require "./fibers"

    A = (name) ->
      (x) ->
        x[name]()

    getFiber = ->
      fiber = Object.keys(fibers).map((type) ->
        extend
          type: type
        , fibers[type]
      ).rand()

      amount = rand(fiber.frequency) + 1
      fiber.price = Math.floor amount * (fiber.basePrice + (rand() * 0.3 - 0.15) * fiber.basePrice)
      fiber.amount = amount

      return fiber

    createDemands = ->
      fiber = Object.keys(fibers).map((type) ->
        extend
          type: type
        , fibers[type]
      ).each (demand) ->
        demand.price = Math.floor demand.basePrice * 1.1

    module.exports = (I={}) ->
      defaults I,
        cyborgs: [
          {}
        ]
        demands: createDemands()
        money: 10000
        purchasableFibers: [0...4].map getFiber
        bins: [
        ]
        inventory: []
        demand: []

      self = Composition(I)

      self.attrObservable "money", "purchasableFibers", "demands"
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

      increment = (observable, amount) ->
        observable observable() + amount

      self.extend          
        purchase: (item) ->
          if self.money() > item.price
            self.money(self.money() - item.price)

            self.purchasableFibers.remove(item)
            self.addResource item
            
            self.purchasableFibers.push getFiber()

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
          bin = self.inventory().filter (bin) ->
            bin.type() is item.type
          .first()

          n = 1

          if bin and bin.amount() >= n
            bin.amount(bin.amount() - n)
            increment self.money, item.price * n
          else
            alert "Insufficient Items of type #{item.type}"

      self.yarnTypes = Observable self.yarnTypes

      self.yarnTypes.observe (types) ->
        console.log types

      return self
