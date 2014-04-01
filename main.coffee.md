Goboknit
========

A tycoon game where you knit goblins with cyborgs.

Need to be able to buy materials and sell bespoke knitted goblins.

Needles, fibers, cyborg parts, patterns.

Fibers
------

Wool, acrylic, bamboo, silk, gold, cotton, hemp, linen

Stitch Patterns
---------------

Stockinette, reverse stockinette, garter stitch, seed stitch, ribbing

Techniques
----------

Increasing, decreasing, short rows, seaming, working in the round

    require "./setup"

    gameTemplate = require "./templates/game"

    model =
      purchasableFibers: [
        {name: "wool", price: 355, weight: 1} 
        {name: "silk", price: 1090, weight: 1} 
        {name: "bamboo", price: 550 , weight: 1}
      ]

    document.body.appendChild gameTemplate(model)
