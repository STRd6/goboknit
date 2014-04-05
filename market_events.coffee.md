Market Events
=============

    fibers = require "./fibers"

    events =
      "Cotton Yarn Prices Rising":
        video: "ThGhCx2u0Wk"
        supply:
          cotton: 2

      "Cotton Yarn Prices Falling":
        video: "QtTQ6K4vwjU"
        supply:
          cotton: 0.5

      "Bamboo Yarn Prices Falling, Cotton Yarn Prices Rising":
        video: "p1g8kBlpCCk"
        supply:
          cotton: 1.5
          bamboo: 0.5

      "Acrylic Price Rising and Volatile":
        video: "qk4mfUot8i4"
        supply:
          acrylic: 2

      "Wool Yarn Price Rising":
        video: "Mm0gWRvprlM"
        supply:
          wool: 2

      "Silk Yarn Price Falls":
        video: "DWIT_iO6TfU"
        supply:
          silk: 0.75

      "Goblins Defeated":
        video: "lxV7KuVR2g0"
        demand: 1.5

    keys = Object.keys(events)

    keys.forEach (name) ->
      event = events[name]
      event.text = name

    tubes = require "./youtube"
    
    $("body").on "click", ".dismiss", ->
      tubes.stop()

    module.exports =
      occur: ->
        {supply, demand, text, video} = events[keys.rand()]

        $("#overlay h2").text(text)
        $("#overlay")
          .show()

        $("audio").animate
          volume: 0

        if demand
          Object.keys(fibers).forEach (type) ->
            fibers[type].demandPrice = Math.floor(fibers[type].demandPrice * demand)

        if supply
          Object.keys(supply).forEach (type) ->
            change = supply[type]
            fibers[type].supplyPrice = Math.floor fibers[type].supplyPrice * change

        tubes.playVideo video, ->
          $("#overlay").hide()

          $("audio").animate
            volume: 1
