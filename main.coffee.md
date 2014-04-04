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

    # TODO: Add intro
    {Music} = require "resource"
    Music.play "main"

    gameTemplate = require "./templates/game"

    global.game = require("./model")()

    document.body.appendChild gameTemplate(game)

    require "./youtube"
