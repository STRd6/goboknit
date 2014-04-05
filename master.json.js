window["STRd6/goboknit:master"]({
  "source": {
    "LICENSE": {
      "path": "LICENSE",
      "mode": "100644",
      "content": "The MIT License (MIT)\n\nCopyright (c) 2014 Daniel X Moore\n\nPermission is hereby granted, free of charge, to any person obtaining a copy\nof this software and associated documentation files (the \"Software\"), to deal\nin the Software without restriction, including without limitation the rights\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the Software is\nfurnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\nSOFTWARE.",
      "type": "blob"
    },
    "README.md": {
      "path": "README.md",
      "mode": "100644",
      "content": "goboknit\n========\n\nA tycoon game where you knit goblins with cyborgs.\n",
      "type": "blob"
    },
    "main.coffee.md": {
      "path": "main.coffee.md",
      "mode": "100644",
      "content": "Goboknit\n========\n\nA tycoon game where you knit goblins with cyborgs.\n\nNeed to be able to buy materials and sell bespoke knitted goblins.\n\nNeedles, fibers, cyborg parts, patterns.\n\nFibers\n------\n\nWool, acrylic, bamboo, silk, gold, cotton, hemp, linen\n\nStitch Patterns\n---------------\n\nStockinette, reverse stockinette, garter stitch, seed stitch, ribbing\n\nTechniques\n----------\n\nIncreasing, decreasing, short rows, seaming, working in the round\n\n    require \"./setup\"\n\n    # TODO: Add intro\n    {Music} = require \"resource\"\n    Music.play \"main\"\n\n    gameTemplate = require \"./templates/game\"\n\n    global.game = require(\"./model\")()\n\n    document.body.appendChild gameTemplate(game)\n",
      "type": "blob"
    },
    "util.coffee.md": {
      "path": "util.coffee.md",
      "mode": "100644",
      "content": "Util\n====\n\n    module.exports =\n      applyStylesheet: (style, id=\"primary\") ->\n        styleNode = document.createElement(\"style\")\n        styleNode.innerHTML = style\n        styleNode.id = id\n\n        if previousStyleNode = document.head.querySelector(\"style##{id}\")\n          previousStyleNode.parentNode.removeChild(prevousStyleNode)\n\n        document.head.appendChild(styleNode)\n\n      extend: (target, sources...) ->\n        for source in sources\n          for name of source\n            target[name] = source[name]\n\n        return target\n\n      defaults: (target, objects...) ->\n        for object in objects\n          for name of object\n            unless target.hasOwnProperty(name)\n              target[name] = object[name]\n\n        return target\n",
      "type": "blob"
    },
    "style.styl": {
      "path": "style.styl",
      "mode": "100644",
      "content": "*\n  box-sizing: border-box\n\nhtml\n  height: 100%\n\nbody\n  margin: 0\n  background-image: url(https://s3.amazonaws.com/addressable/gobo/gobo2.jpg)\n  height: 100%\n\nh2\n  margin-bottom: 0\n\n.fiber, .demand, .item\n  background-color: white\n  border: 1px solid black\n  display: inline-block\n  width: 80px\n  height: 100px\n  padding: 4px\n  position: relative\n\n  .purchase\n    position: absolute\n    bottom: 4px\n    right: 4px\n\n.demand, .fiber\n  width: 120px\n\n.item\n  height: 60px\n\n.cyborg\n  background-color: white\n  display: inline-block\n  padding: 4px\n  width: 200px\n  height: 100px\n  border: 1px solid black\n\n  progress\n    width: 100%\n\n.game\n  background-color: rgba(255, 255, 255, 0.5)\n  padding: 2em\n  height: 100%\n\n#player\n  width: 100%\n  height: 100%\n  position: absolute\n  top: 0\n  bottom: 0\n  right: 0\n  left: 0\n  display: none\n\n#overlay\n  width: 100%\n  height: 100%\n  position: absolute\n  top: 0\n  bottom: 0\n  right: 0\n  left: 0\n  color: red\n  font-size: 24px\n  text-align: center\n  display: none\n\n  button\n    position: absolute\n    bottom: 8px\n    right: 8px\n    color: black\n    font-size: 24px\n",
      "type": "blob"
    },
    "templates/game.haml": {
      "path": "templates/game.haml",
      "mode": "100644",
      "content": "- game = this\n\n.game\n  .stats\n    .money\n      .title\n        Money\n      ¢\n      = @money\n  .fibers\n    %h2 Supply\n    - each @purchasableFibers, (fiber) ->\n      .fiber\n        .price\n          ¢\n          = fiber.price\n        .price\n          = \"(¢#{Math.floor fiber.price / fiber.amount} ea)\"\n        .type= fiber.type\n        .amount= \"#{fiber.amount} kg\"\n        %button.purchase Purcase!\n          - on \"click\", ->\n            - game.purchase(fiber)\n\n  .bins\n    %h2 Materials\n    - each @bins, (item) ->\n      .item\n        .type= item.type\n        .amount= item.amount\n\n  .cyborgs\n    %h2 Cyborgs\n    - each @cyborgs, (cyborg) ->\n      .cyborg\n        %progress(value=cyborg.durability max=cyborg.durabilityMax)\n        .name= cyborg.name\n\n        %select\n          - each [1, 5, 10, 25], (quantity) ->\n            %option(value=quantity)= quantity\n          - on \"change\", cyborg.selectedQuantity\n\n        %select\n          - each game.bins, (bin) ->\n            %option(value=bin.type)= bin.type()\n          - on \"change\", cyborg.selectedBin\n\n        .actions\n          %button Repair (¢250)\n            - on \"click\", ->\n              - alert \"repair\"\n  \n          %button Knit!\n            - on \"click\", ->\n              - cyborg.produce cyborg.selectedBin(), game.output\n\n  .inventory\n    %h2 Inventory\n    - each @inventory, (item) ->\n      .item\n        .type= item.type\n        .amount= item.amount\n\n  .demands\n    %h2 Demand\n    - each @demands, (item) ->\n      .demand\n        .type\n          = item.type\n          = \" Knitted Goblin\"\n        .price\n          ¢\n          = item.price\n        %button.sell Sell\n          - on \"click\", ->\n            - game.sell item\n\n#player\n\n#overlay\n  %h2\n  %button.dismiss Ok, I got it!\n",
      "type": "blob"
    },
    "pixie.cson": {
      "path": "pixie.cson",
      "mode": "100644",
      "content": "dependencies:\n  composition: \"distri/compositions:v0.1.0\"\n  cornerstone: \"distri/cornerstone:v0.2.0\"\n  observable: \"distri/observable:v0.1.0\"\n  resource: \"distri/resource:v0.2.0\"\nremoteDependencies: [\n  \"https://code.jquery.com/jquery-1.11.0.min.js\"\n]\nwidth: 1024\nheight: 768\n",
      "type": "blob"
    },
    "setup.coffee.md": {
      "path": "setup.coffee.md",
      "mode": "100644",
      "content": "Setup\n=====\n\n    require \"cornerstone\"\n\n    global.Observable = require \"observable\"\n\n    {applyStylesheet} = require \"./util\"\n\n    applyStylesheet(require \"./style\")\n\n    Resource = require \"resource\"\n    Resource.add\n      #images: require \"./images\"\n      music: require \"./music\"\n      #sounds: require \"./sounds\"\n",
      "type": "blob"
    },
    "model.coffee.md": {
      "path": "model.coffee.md",
      "mode": "100644",
      "content": "Game Model\n==========\n\n    {defaults, extend} = require \"./util\"\n    Composition = require \"composition\"\n\n    MarketEvents = require \"./market_events\"\n\n    Bin = require \"./bin\"\n    Cyborg = require \"./cyborg\"\n    fibers = require \"./fibers\"\n\n    A = (name) ->\n      (x) ->\n        x[name]()\n\n    do initFibers = ->\n      Object.keys(fibers).forEach (type) ->\n        fiber = fibers[type]\n        console.log fiber\n        fiber.supplyPrice = fiber.basePrice\n        fiber.demandPrice = Math.floor fiber.basePrice * 1.1\n\n    getFiber = ->\n      fiber = Object.keys(fibers).map((type) ->\n        extend\n          type: type\n        , fibers[type]\n      ).rand()\n\n      amount = rand(fiber.frequency) + 1\n      fiber.price = Math.floor amount * (fiber.supplyPrice + (rand() * 0.3 - 0.15) * fiber.supplyPrice)\n      fiber.amount = amount\n\n      return fiber\n\n    createDemands = ->\n      fiber = Object.keys(fibers).map((type) ->\n        extend\n          type: type\n        , fibers[type]\n      ).each (demand) ->\n        demand.price = demand.demandPrice\n\n    module.exports = (I={}) ->\n      defaults I,\n        cyborgs: [\n          {}\n        ]\n        demands: createDemands()\n        money: 10000\n        purchasableFibers: [0...4].map getFiber\n        bins: Object.keys(fibers).map (name) -> Bin type: name, amount: 0\n        inventory: Object.keys(fibers).map (name) -> Bin type: name, amount: 0\n        demand: []\n\n      self = Composition(I)\n\n      self.attrObservable \"money\", \"purchasableFibers\", \"demands\"\n      self.attrModels \"cyborgs\", Cyborg\n      self.attrModels \"bins\", Bin\n      self.attrModels \"inventory\", Bin\n\n      addStock = (item, pile) ->\n        found = false\n        pile.each (bin) ->\n          if bin.type() is item.type\n            bin.amount(bin.amount() + item.amount)\n            found = true\n\n        unless found\n          pile.push Bin\n            type: item.type\n            amount: item.amount\n\n      increment = (observable, amount) ->\n        observable observable() + amount\n\n      eventOccurs = ->\n        MarketEvents.occur()\n        self.demands createDemands()\n        self.purchasableFibers [0...4].map getFiber\n\n      self.extend          \n        purchase: (item) ->\n          if self.money() > item.price\n            self.money(self.money() - item.price)\n\n            self.purchasableFibers.remove(item)\n            self.addResource item\n\n            # Increase supply price of purchased fiber\n            fibers[item.type].supplyPrice = Math.floor 1.02 * fibers[item.type].supplyPrice\n\n            self.purchasableFibers.push getFiber()\n\n            if rand() < 0.1\n              eventOccurs()\n\n        addResource: (item) ->\n          addStock(item, self.bins)\n\n        output: (item) ->\n          console.log item\n          addStock(item, self.inventory)\n\n        yarnTypes: ->\n          self.bins().filter( (bin) ->\n            bin.amount() >= 1\n          ).map A(\"type\")\n\n        sell: (item) ->\n          bin = self.inventory().filter (bin) ->\n            bin.type() is item.type\n          .first()\n\n          n = 1\n\n          if bin and bin.amount() >= n\n            bin.amount(bin.amount() - n)\n            increment self.money, item.price * n\n\n            # Decrease Demand Price\n            fibers[item.type].demandPrice = Math.floor 0.98 * fibers[item.type].demandPrice\n\n            if rand() < 0.05\n              eventOccurs()\n\n          else\n            alert \"Insufficient Items of type #{item.type}\"\n\n      self.yarnTypes = Observable self.yarnTypes\n\n      self.yarnTypes.observe (types) ->\n        console.log types\n\n      return self\n",
      "type": "blob"
    },
    "bin.coffee.md": {
      "path": "bin.coffee.md",
      "mode": "100644",
      "content": "Bin\n===\n\nHold an amount of a certain type of fiber.\n\n    {defaults} = require \"./util\"\n    Composition = require \"composition\"\n\n    module.exports = (I={}) ->\n      defaults I,\n        type: \"wool\"\n        amount: 0\n\n      self = Composition(I)\n\n      self.attrObservable \"type\", \"amount\"\n\n      return self\n",
      "type": "blob"
    },
    "cyborg.coffee.md": {
      "path": "cyborg.coffee.md",
      "mode": "100644",
      "content": "Cyborg\n======\n\n    {defaults} = require \"./util\"\n    Composition = require \"composition\"\n\n    Bin = require \"./bin\"\n\n    module.exports = (I={}) ->\n      defaults I,\n        name: \"Knitborg\"\n        durability: 25\n        durabilityMax: 25\n        selectedQuantity: 1\n\n      self = Composition(I)\n\n      self.attrObservable \"name\", \"durability\", \"durabilityMax\", \"selectedBin\", \"selectedQuantity\"\n\n      self.extend\n        repair: ->\n          self.durability self.durabilityMax()\n\n        produce: (bin, output) ->\n          unless bin\n            alert \"No yarn selected!\"\n            return\n\n          durability = self.durability()\n          n = self.selectedQuantity()\n\n          if durability < n\n            alert \"Cyborg is broken down :*\"\n            return\n\n          if bin and bin.amount() >= n\n            self.durability self.durability() - n\n            bin.amount(bin.amount() - n)\n            output\n              type: bin.type()\n              amount: n\n          else\n            alert \"Insufficient Material\"\n\n      return self\n",
      "type": "blob"
    },
    "fibers.cson": {
      "path": "fibers.cson",
      "mode": "100644",
      "content": "acrylic:\n  basePrice: 110\n  frequency: 10\ncotton:\n  basePrice: 150\n  frequency: 10\nwool:\n  basePrice: 355\n  frequency: 10\nbamboo:\n  basePrice: 550\n  frequency: 3\nsilk:\n  basePrice: 1090\n  frequency: 3\n",
      "type": "blob"
    },
    "CREDITS.txt": {
      "path": "CREDITS.txt",
      "mode": "100644",
      "content": "\"Black Vortex\" Kevin MacLeod (incompetech.com)\n\"The Complex\" Kevin MacLeod (incompetech.com)\nLicensed under Creative Commons: By Attribution 3.0\nhttp://creativecommons.org/licenses/by/3.0/\n",
      "type": "blob"
    },
    "music.json": {
      "path": "music.json",
      "mode": "100644",
      "content": "{\n  \"intro\": \"http://a0.pixiecdn.com/gobo/Black Vortex-32.mp3\",\n  \"main\": \"http://a0.pixiecdn.com/gobo/The Complex-32.mp3\"\n}\n",
      "type": "blob"
    },
    "videos": {
      "path": "videos",
      "mode": "100644",
      "content": "\n\nCotton Prices Rising\nhttps://www.youtube.com/watch?v=ThGhCx2u0Wk\n\nCotton Price Falls\nhttps://www.youtube.com/watch?v=QtTQ6K4vwjU\n\nBamboo Price Falling, Cotton Rising\nhttps://www.youtube.com/watch?v=p1g8kBlpCCk\n\nAcrylic Price Rising and Volatile\nhttps://www.youtube.com/watch?v=qk4mfUot8i4\n\nWool Price Rising\nhttps://www.youtube.com/watch?v=Mm0gWRvprlM\n\nSilk Price Falls\nhttps://www.youtube.com/watch?v=DWIT_iO6TfU\n\nGoblins Defeated\nhttps://www.youtube.com/watch?v=lxV7KuVR2g0",
      "type": "blob"
    },
    "youtube.coffee.md": {
      "path": "youtube.coffee.md",
      "mode": "100644",
      "content": "Play a Youtube video\n====================\n\n      tag = document.createElement('script')\n\n      tag.src = \"https://www.youtube.com/iframe_api\"\n      firstScriptTag = document.getElementsByTagName('script')[0]\n      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)\n\n      callbacks = []\n\n      stop = ->\n        callbacks.forEach (callback) ->\n          callback()\n\n        callbacks = []\n        $(\"#player\").hide()\n        player.stopVideo()\n\n      onPlayerStateChange = (event) ->\n        if event.data is YT.PlayerState.ENDED\n          stop()\n\n      stopVideo = () ->\n        player.stopVideo()\n\n      # 4. The API will call this function when the video player is ready.\n      onPlayerReady = (event) ->\n        ;#event.target.playVideo()\n\n      player = undefined\n      global.onYouTubeIframeAPIReady = () ->\n        player = new YT.Player 'player',\n          height: '390'\n          width: '640'\n          playerVars:\n            controls: 0\n            showinfo: 0\n            rel: 0\n          events:\n            'onReady': onPlayerReady\n            'onStateChange': onPlayerStateChange\n\n      module.exports =\n        playVideo: (id, completed) ->\n          $(\"#player\").show()\n\n          player.loadVideoById id\n          callbacks.push completed\n\n        stop: stop\n          ",
      "type": "blob"
    },
    "market_events.coffee.md": {
      "path": "market_events.coffee.md",
      "mode": "100644",
      "content": "Market Events\n=============\n\n    fibers = require \"./fibers\"\n\n    events =\n      \"Cotton Yarn Prices Rising\":\n        video: \"ThGhCx2u0Wk\"\n        supply:\n          cotton: 2\n\n      \"Cotton Yarn Prices Falling\":\n        video: \"QtTQ6K4vwjU\"\n        supply:\n          cotton: 0.5\n\n      \"Bamboo Yarn Prices Falling, Cotton Yarn Prices Rising\":\n        video: \"p1g8kBlpCCk\"\n        supply:\n          cotton: 1.5\n          bamboo: 0.5\n\n      \"Acrylic Price Rising and Volatile\":\n        video: \"qk4mfUot8i4\"\n        supply:\n          acrylic: 2\n\n      \"Wool Yarn Price Rising\":\n        video: \"Mm0gWRvprlM\"\n        supply:\n          wool: 2\n\n      \"Silk Yarn Price Falls\":\n        video: \"DWIT_iO6TfU\"\n        supply:\n          silk: 0.75\n\n      \"Goblins Defeated\":\n        video: \"lxV7KuVR2g0\"\n        demand: 1.5\n\n    keys = Object.keys(events)\n\n    keys.forEach (name) ->\n      event = events[name]\n      event.text = name\n\n    tubes = require \"./youtube\"\n    \n    $(\"body\").on \"click\", \".dismiss\", ->\n      tubes.stop()\n\n    module.exports =\n      occur: ->\n        {supply, demand, text, video} = events[keys.rand()]\n\n        $(\"#overlay h2\").text(text)\n        $(\"#overlay\")\n          .show()\n\n        $(\"audio\").animate\n          volume: 0\n\n        if demand\n          Object.keys(fibers).forEach (type) ->\n            fibers[type].demandPrice = Math.floor(fibers[type].demandPrice * demand)\n\n        if supply\n          Object.keys(supply).forEach (type) ->\n            change = supply[type]\n            fibers[type].supplyPrice = Math.floor fibers[type].supplyPrice * change\n\n        tubes.playVideo video, ->\n          $(\"#overlay\").hide()\n\n          $(\"audio\").animate\n            volume: 1\n",
      "type": "blob"
    }
  },
  "distribution": {
    "main": {
      "path": "main",
      "content": "(function() {\n  var Music, gameTemplate;\n\n  require(\"./setup\");\n\n  Music = require(\"resource\").Music;\n\n  Music.play(\"main\");\n\n  gameTemplate = require(\"./templates/game\");\n\n  global.game = require(\"./model\")();\n\n  document.body.appendChild(gameTemplate(game));\n\n}).call(this);\n",
      "type": "blob"
    },
    "util": {
      "path": "util",
      "content": "(function() {\n  var __slice = [].slice;\n\n  module.exports = {\n    applyStylesheet: function(style, id) {\n      var previousStyleNode, styleNode;\n      if (id == null) {\n        id = \"primary\";\n      }\n      styleNode = document.createElement(\"style\");\n      styleNode.innerHTML = style;\n      styleNode.id = id;\n      if (previousStyleNode = document.head.querySelector(\"style#\" + id)) {\n        previousStyleNode.parentNode.removeChild(prevousStyleNode);\n      }\n      return document.head.appendChild(styleNode);\n    },\n    extend: function() {\n      var name, source, sources, target, _i, _len;\n      target = arguments[0], sources = 2 <= arguments.length ? __slice.call(arguments, 1) : [];\n      for (_i = 0, _len = sources.length; _i < _len; _i++) {\n        source = sources[_i];\n        for (name in source) {\n          target[name] = source[name];\n        }\n      }\n      return target;\n    },\n    defaults: function() {\n      var name, object, objects, target, _i, _len;\n      target = arguments[0], objects = 2 <= arguments.length ? __slice.call(arguments, 1) : [];\n      for (_i = 0, _len = objects.length; _i < _len; _i++) {\n        object = objects[_i];\n        for (name in object) {\n          if (!target.hasOwnProperty(name)) {\n            target[name] = object[name];\n          }\n        }\n      }\n      return target;\n    }\n  };\n\n}).call(this);\n",
      "type": "blob"
    },
    "style": {
      "path": "style",
      "content": "module.exports = \"* {\\n  -ms-box-sizing: border-box;\\n  -moz-box-sizing: border-box;\\n  -webkit-box-sizing: border-box;\\n  box-sizing: border-box;\\n}\\n\\nhtml {\\n  height: 100%;\\n}\\n\\nbody {\\n  margin: 0;\\n  background-image: url(https://s3.amazonaws.com/addressable/gobo/gobo2.jpg);\\n  height: 100%;\\n}\\n\\nh2 {\\n  margin-bottom: 0;\\n}\\n\\n.fiber,\\n.demand,\\n.item {\\n  background-color: white;\\n  border: 1px solid black;\\n  display: inline-block;\\n  width: 80px;\\n  height: 100px;\\n  padding: 4px;\\n  position: relative;\\n}\\n\\n.fiber .purchase,\\n.demand .purchase,\\n.item .purchase {\\n  position: absolute;\\n  bottom: 4px;\\n  right: 4px;\\n}\\n\\n.demand,\\n.fiber {\\n  width: 120px;\\n}\\n\\n.item {\\n  height: 60px;\\n}\\n\\n.cyborg {\\n  background-color: white;\\n  display: inline-block;\\n  padding: 4px;\\n  width: 200px;\\n  height: 100px;\\n  border: 1px solid black;\\n}\\n\\n.cyborg progress {\\n  width: 100%;\\n}\\n\\n.game {\\n  background-color: rgba(255, 255, 255, 0.5);\\n  padding: 2em;\\n  height: 100%;\\n}\\n\\n#player {\\n  width: 100%;\\n  height: 100%;\\n  position: absolute;\\n  top: 0;\\n  bottom: 0;\\n  right: 0;\\n  left: 0;\\n  display: none;\\n}\\n\\n#overlay {\\n  width: 100%;\\n  height: 100%;\\n  position: absolute;\\n  top: 0;\\n  bottom: 0;\\n  right: 0;\\n  left: 0;\\n  color: red;\\n  font-size: 24px;\\n  text-align: center;\\n  display: none;\\n}\\n\\n#overlay button {\\n  position: absolute;\\n  bottom: 8px;\\n  right: 8px;\\n  color: black;\\n  font-size: 24px;\\n}\\n\\n@media all and (-webkit-min-device-pixel-ratio: 1.5) {\\n  body {\\n    background-image: url(\\\"https:/s3.amazonaws.com/addressable/gobo/gobo2@2x.jpg\\\");\\n    background-size: contain;\\n  }\\n}\";",
      "type": "blob"
    },
    "templates/game": {
      "path": "templates/game",
      "content": "Runtime = require(\"/_lib/hamljr_runtime\");\n\nmodule.exports = (function(data) {\n  return (function() {\n    var game, __runtime;\n    __runtime = Runtime(this);\n    __runtime.push(document.createDocumentFragment());\n    game = this;\n    __runtime.push(document.createElement(\"div\"));\n    __runtime.classes(\"game\");\n    __runtime.push(document.createElement(\"div\"));\n    __runtime.classes(\"stats\");\n    __runtime.push(document.createElement(\"div\"));\n    __runtime.classes(\"money\");\n    __runtime.push(document.createElement(\"div\"));\n    __runtime.classes(\"title\");\n    __runtime.text(\"Money\\n\");\n    __runtime.pop();\n    __runtime.text(\"¢\\n\");\n    __runtime.text(this.money);\n    __runtime.pop();\n    __runtime.pop();\n    __runtime.push(document.createElement(\"div\"));\n    __runtime.classes(\"fibers\");\n    __runtime.push(document.createElement(\"h2\"));\n    __runtime.text(\"Supply\\n\");\n    __runtime.pop();\n    __runtime.each(this.purchasableFibers, function(fiber) {\n      __runtime.push(document.createElement(\"div\"));\n      __runtime.classes(\"fiber\");\n      __runtime.push(document.createElement(\"div\"));\n      __runtime.classes(\"price\");\n      __runtime.text(\"¢\\n\");\n      __runtime.text(fiber.price);\n      __runtime.pop();\n      __runtime.push(document.createElement(\"div\"));\n      __runtime.classes(\"price\");\n      __runtime.text(\"(¢\" + (Math.floor(fiber.price / fiber.amount)) + \" ea)\");\n      __runtime.pop();\n      __runtime.push(document.createElement(\"div\"));\n      __runtime.classes(\"type\");\n      __runtime.text(fiber.type);\n      __runtime.pop();\n      __runtime.push(document.createElement(\"div\"));\n      __runtime.classes(\"amount\");\n      __runtime.text(\"\" + fiber.amount + \" kg\");\n      __runtime.pop();\n      __runtime.push(document.createElement(\"button\"));\n      __runtime.classes(\"purchase\");\n      __runtime.text(\"Purcase!\\n\");\n      __runtime.on(\"click\", function() {\n        return game.purchase(fiber);\n      });\n      __runtime.pop();\n      return __runtime.pop();\n    });\n    __runtime.pop();\n    __runtime.push(document.createElement(\"div\"));\n    __runtime.classes(\"bins\");\n    __runtime.push(document.createElement(\"h2\"));\n    __runtime.text(\"Materials\\n\");\n    __runtime.pop();\n    __runtime.each(this.bins, function(item) {\n      __runtime.push(document.createElement(\"div\"));\n      __runtime.classes(\"item\");\n      __runtime.push(document.createElement(\"div\"));\n      __runtime.classes(\"type\");\n      __runtime.text(item.type);\n      __runtime.pop();\n      __runtime.push(document.createElement(\"div\"));\n      __runtime.classes(\"amount\");\n      __runtime.text(item.amount);\n      __runtime.pop();\n      return __runtime.pop();\n    });\n    __runtime.pop();\n    __runtime.push(document.createElement(\"div\"));\n    __runtime.classes(\"cyborgs\");\n    __runtime.push(document.createElement(\"h2\"));\n    __runtime.text(\"Cyborgs\\n\");\n    __runtime.pop();\n    __runtime.each(this.cyborgs, function(cyborg) {\n      __runtime.push(document.createElement(\"div\"));\n      __runtime.classes(\"cyborg\");\n      __runtime.push(document.createElement(\"progress\"));\n      __runtime.attribute(\"value\", cyborg.durability);\n      __runtime.attribute(\"max\", cyborg.durabilityMax);\n      __runtime.pop();\n      __runtime.push(document.createElement(\"div\"));\n      __runtime.classes(\"name\");\n      __runtime.text(cyborg.name);\n      __runtime.pop();\n      __runtime.push(document.createElement(\"select\"));\n      __runtime.each([1, 5, 10, 25], function(quantity) {\n        __runtime.push(document.createElement(\"option\"));\n        __runtime.attribute(\"value\", quantity);\n        __runtime.text(quantity);\n        return __runtime.pop();\n      });\n      __runtime.on(\"change\", cyborg.selectedQuantity);\n      __runtime.pop();\n      __runtime.push(document.createElement(\"select\"));\n      __runtime.each(game.bins, function(bin) {\n        __runtime.push(document.createElement(\"option\"));\n        __runtime.attribute(\"value\", bin.type);\n        __runtime.text(bin.type());\n        return __runtime.pop();\n      });\n      __runtime.on(\"change\", cyborg.selectedBin);\n      __runtime.pop();\n      __runtime.push(document.createElement(\"div\"));\n      __runtime.classes(\"actions\");\n      __runtime.push(document.createElement(\"button\"));\n      __runtime.text(\"Repair (¢250)\\n\");\n      __runtime.on(\"click\", function() {\n        return alert(\"repair\");\n      });\n      __runtime.pop();\n      __runtime.push(document.createElement(\"button\"));\n      __runtime.text(\"Knit!\\n\");\n      __runtime.on(\"click\", function() {\n        return cyborg.produce(cyborg.selectedBin(), game.output);\n      });\n      __runtime.pop();\n      __runtime.pop();\n      return __runtime.pop();\n    });\n    __runtime.pop();\n    __runtime.push(document.createElement(\"div\"));\n    __runtime.classes(\"inventory\");\n    __runtime.push(document.createElement(\"h2\"));\n    __runtime.text(\"Inventory\\n\");\n    __runtime.pop();\n    __runtime.each(this.inventory, function(item) {\n      __runtime.push(document.createElement(\"div\"));\n      __runtime.classes(\"item\");\n      __runtime.push(document.createElement(\"div\"));\n      __runtime.classes(\"type\");\n      __runtime.text(item.type);\n      __runtime.pop();\n      __runtime.push(document.createElement(\"div\"));\n      __runtime.classes(\"amount\");\n      __runtime.text(item.amount);\n      __runtime.pop();\n      return __runtime.pop();\n    });\n    __runtime.pop();\n    __runtime.push(document.createElement(\"div\"));\n    __runtime.classes(\"demands\");\n    __runtime.push(document.createElement(\"h2\"));\n    __runtime.text(\"Demand\\n\");\n    __runtime.pop();\n    __runtime.each(this.demands, function(item) {\n      __runtime.push(document.createElement(\"div\"));\n      __runtime.classes(\"demand\");\n      __runtime.push(document.createElement(\"div\"));\n      __runtime.classes(\"type\");\n      __runtime.text(item.type);\n      __runtime.text(\" Knitted Goblin\");\n      __runtime.pop();\n      __runtime.push(document.createElement(\"div\"));\n      __runtime.classes(\"price\");\n      __runtime.text(\"¢\\n\");\n      __runtime.text(item.price);\n      __runtime.pop();\n      __runtime.push(document.createElement(\"button\"));\n      __runtime.classes(\"sell\");\n      __runtime.text(\"Sell\\n\");\n      __runtime.on(\"click\", function() {\n        return game.sell(item);\n      });\n      __runtime.pop();\n      return __runtime.pop();\n    });\n    __runtime.pop();\n    __runtime.pop();\n    __runtime.push(document.createElement(\"div\"));\n    __runtime.id(\"player\");\n    __runtime.pop();\n    __runtime.push(document.createElement(\"div\"));\n    __runtime.id(\"overlay\");\n    __runtime.push(document.createElement(\"h2\"));\n    __runtime.pop();\n    __runtime.push(document.createElement(\"button\"));\n    __runtime.classes(\"dismiss\");\n    __runtime.text(\"Ok, I got it!\\n\");\n    __runtime.pop();\n    __runtime.pop();\n    return __runtime.pop();\n  }).call(data);\n});\n",
      "type": "blob"
    },
    "pixie": {
      "path": "pixie",
      "content": "module.exports = {\"dependencies\":{\"composition\":\"distri/compositions:v0.1.0\",\"cornerstone\":\"distri/cornerstone:v0.2.0\",\"observable\":\"distri/observable:v0.1.0\",\"resource\":\"distri/resource:v0.2.0\"},\"remoteDependencies\":[\"https://code.jquery.com/jquery-1.11.0.min.js\"],\"width\":1024,\"height\":768};",
      "type": "blob"
    },
    "setup": {
      "path": "setup",
      "content": "(function() {\n  var Resource, applyStylesheet;\n\n  require(\"cornerstone\");\n\n  global.Observable = require(\"observable\");\n\n  applyStylesheet = require(\"./util\").applyStylesheet;\n\n  applyStylesheet(require(\"./style\"));\n\n  Resource = require(\"resource\");\n\n  Resource.add({\n    music: require(\"./music\")\n  });\n\n}).call(this);\n",
      "type": "blob"
    },
    "model": {
      "path": "model",
      "content": "(function() {\n  var A, Bin, Composition, Cyborg, MarketEvents, createDemands, defaults, extend, fibers, getFiber, initFibers, _ref;\n\n  _ref = require(\"./util\"), defaults = _ref.defaults, extend = _ref.extend;\n\n  Composition = require(\"composition\");\n\n  MarketEvents = require(\"./market_events\");\n\n  Bin = require(\"./bin\");\n\n  Cyborg = require(\"./cyborg\");\n\n  fibers = require(\"./fibers\");\n\n  A = function(name) {\n    return function(x) {\n      return x[name]();\n    };\n  };\n\n  (initFibers = function() {\n    return Object.keys(fibers).forEach(function(type) {\n      var fiber;\n      fiber = fibers[type];\n      console.log(fiber);\n      fiber.supplyPrice = fiber.basePrice;\n      return fiber.demandPrice = Math.floor(fiber.basePrice * 1.1);\n    });\n  })();\n\n  getFiber = function() {\n    var amount, fiber;\n    fiber = Object.keys(fibers).map(function(type) {\n      return extend({\n        type: type\n      }, fibers[type]);\n    }).rand();\n    amount = rand(fiber.frequency) + 1;\n    fiber.price = Math.floor(amount * (fiber.supplyPrice + (rand() * 0.3 - 0.15) * fiber.supplyPrice));\n    fiber.amount = amount;\n    return fiber;\n  };\n\n  createDemands = function() {\n    var fiber;\n    return fiber = Object.keys(fibers).map(function(type) {\n      return extend({\n        type: type\n      }, fibers[type]);\n    }).each(function(demand) {\n      return demand.price = demand.demandPrice;\n    });\n  };\n\n  module.exports = function(I) {\n    var addStock, eventOccurs, increment, self;\n    if (I == null) {\n      I = {};\n    }\n    defaults(I, {\n      cyborgs: [{}],\n      demands: createDemands(),\n      money: 10000,\n      purchasableFibers: [0, 1, 2, 3].map(getFiber),\n      bins: Object.keys(fibers).map(function(name) {\n        return Bin({\n          type: name,\n          amount: 0\n        });\n      }),\n      inventory: Object.keys(fibers).map(function(name) {\n        return Bin({\n          type: name,\n          amount: 0\n        });\n      }),\n      demand: []\n    });\n    self = Composition(I);\n    self.attrObservable(\"money\", \"purchasableFibers\", \"demands\");\n    self.attrModels(\"cyborgs\", Cyborg);\n    self.attrModels(\"bins\", Bin);\n    self.attrModels(\"inventory\", Bin);\n    addStock = function(item, pile) {\n      var found;\n      found = false;\n      pile.each(function(bin) {\n        if (bin.type() === item.type) {\n          bin.amount(bin.amount() + item.amount);\n          return found = true;\n        }\n      });\n      if (!found) {\n        return pile.push(Bin({\n          type: item.type,\n          amount: item.amount\n        }));\n      }\n    };\n    increment = function(observable, amount) {\n      return observable(observable() + amount);\n    };\n    eventOccurs = function() {\n      MarketEvents.occur();\n      self.demands(createDemands());\n      return self.purchasableFibers([0, 1, 2, 3].map(getFiber));\n    };\n    self.extend({\n      purchase: function(item) {\n        if (self.money() > item.price) {\n          self.money(self.money() - item.price);\n          self.purchasableFibers.remove(item);\n          self.addResource(item);\n          fibers[item.type].supplyPrice = Math.floor(1.02 * fibers[item.type].supplyPrice);\n          self.purchasableFibers.push(getFiber());\n          if (rand() < 0.1) {\n            return eventOccurs();\n          }\n        }\n      },\n      addResource: function(item) {\n        return addStock(item, self.bins);\n      },\n      output: function(item) {\n        console.log(item);\n        return addStock(item, self.inventory);\n      },\n      yarnTypes: function() {\n        return self.bins().filter(function(bin) {\n          return bin.amount() >= 1;\n        }).map(A(\"type\"));\n      },\n      sell: function(item) {\n        var bin, n;\n        bin = self.inventory().filter(function(bin) {\n          return bin.type() === item.type;\n        }).first();\n        n = 1;\n        if (bin && bin.amount() >= n) {\n          bin.amount(bin.amount() - n);\n          increment(self.money, item.price * n);\n          fibers[item.type].demandPrice = Math.floor(0.98 * fibers[item.type].demandPrice);\n          if (rand() < 0.05) {\n            return eventOccurs();\n          }\n        } else {\n          return alert(\"Insufficient Items of type \" + item.type);\n        }\n      }\n    });\n    self.yarnTypes = Observable(self.yarnTypes);\n    self.yarnTypes.observe(function(types) {\n      return console.log(types);\n    });\n    return self;\n  };\n\n}).call(this);\n",
      "type": "blob"
    },
    "bin": {
      "path": "bin",
      "content": "(function() {\n  var Composition, defaults;\n\n  defaults = require(\"./util\").defaults;\n\n  Composition = require(\"composition\");\n\n  module.exports = function(I) {\n    var self;\n    if (I == null) {\n      I = {};\n    }\n    defaults(I, {\n      type: \"wool\",\n      amount: 0\n    });\n    self = Composition(I);\n    self.attrObservable(\"type\", \"amount\");\n    return self;\n  };\n\n}).call(this);\n",
      "type": "blob"
    },
    "cyborg": {
      "path": "cyborg",
      "content": "(function() {\n  var Bin, Composition, defaults;\n\n  defaults = require(\"./util\").defaults;\n\n  Composition = require(\"composition\");\n\n  Bin = require(\"./bin\");\n\n  module.exports = function(I) {\n    var self;\n    if (I == null) {\n      I = {};\n    }\n    defaults(I, {\n      name: \"Knitborg\",\n      durability: 25,\n      durabilityMax: 25,\n      selectedQuantity: 1\n    });\n    self = Composition(I);\n    self.attrObservable(\"name\", \"durability\", \"durabilityMax\", \"selectedBin\", \"selectedQuantity\");\n    self.extend({\n      repair: function() {\n        return self.durability(self.durabilityMax());\n      },\n      produce: function(bin, output) {\n        var durability, n;\n        if (!bin) {\n          alert(\"No yarn selected!\");\n          return;\n        }\n        durability = self.durability();\n        n = self.selectedQuantity();\n        if (durability < n) {\n          alert(\"Cyborg is broken down :*\");\n          return;\n        }\n        if (bin && bin.amount() >= n) {\n          self.durability(self.durability() - n);\n          bin.amount(bin.amount() - n);\n          return output({\n            type: bin.type(),\n            amount: n\n          });\n        } else {\n          return alert(\"Insufficient Material\");\n        }\n      }\n    });\n    return self;\n  };\n\n}).call(this);\n",
      "type": "blob"
    },
    "fibers": {
      "path": "fibers",
      "content": "module.exports = {\"acrylic\":{\"basePrice\":110,\"frequency\":10},\"cotton\":{\"basePrice\":150,\"frequency\":10},\"wool\":{\"basePrice\":355,\"frequency\":10},\"bamboo\":{\"basePrice\":550,\"frequency\":3},\"silk\":{\"basePrice\":1090,\"frequency\":3}};",
      "type": "blob"
    },
    "music": {
      "path": "music",
      "content": "module.exports = {\"intro\":\"http://a0.pixiecdn.com/gobo/Black Vortex-32.mp3\",\"main\":\"http://a0.pixiecdn.com/gobo/The Complex-32.mp3\"};",
      "type": "blob"
    },
    "youtube": {
      "path": "youtube",
      "content": "(function() {\n  var callbacks, firstScriptTag, onPlayerReady, onPlayerStateChange, player, stop, stopVideo, tag;\n\n  tag = document.createElement('script');\n\n  tag.src = \"https://www.youtube.com/iframe_api\";\n\n  firstScriptTag = document.getElementsByTagName('script')[0];\n\n  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);\n\n  callbacks = [];\n\n  stop = function() {\n    callbacks.forEach(function(callback) {\n      return callback();\n    });\n    callbacks = [];\n    $(\"#player\").hide();\n    return player.stopVideo();\n  };\n\n  onPlayerStateChange = function(event) {\n    if (event.data === YT.PlayerState.ENDED) {\n      return stop();\n    }\n  };\n\n  stopVideo = function() {\n    return player.stopVideo();\n  };\n\n  onPlayerReady = function(event) {};\n\n  player = void 0;\n\n  global.onYouTubeIframeAPIReady = function() {\n    return player = new YT.Player('player', {\n      height: '390',\n      width: '640',\n      playerVars: {\n        controls: 0,\n        showinfo: 0,\n        rel: 0\n      },\n      events: {\n        'onReady': onPlayerReady,\n        'onStateChange': onPlayerStateChange\n      }\n    });\n  };\n\n  module.exports = {\n    playVideo: function(id, completed) {\n      $(\"#player\").show();\n      player.loadVideoById(id);\n      return callbacks.push(completed);\n    },\n    stop: stop\n  };\n\n}).call(this);\n",
      "type": "blob"
    },
    "market_events": {
      "path": "market_events",
      "content": "(function() {\n  var events, fibers, keys, tubes;\n\n  fibers = require(\"./fibers\");\n\n  events = {\n    \"Cotton Yarn Prices Rising\": {\n      video: \"ThGhCx2u0Wk\",\n      supply: {\n        cotton: 2\n      }\n    },\n    \"Cotton Yarn Prices Falling\": {\n      video: \"QtTQ6K4vwjU\",\n      supply: {\n        cotton: 0.5\n      }\n    },\n    \"Bamboo Yarn Prices Falling, Cotton Yarn Prices Rising\": {\n      video: \"p1g8kBlpCCk\",\n      supply: {\n        cotton: 1.5,\n        bamboo: 0.5\n      }\n    },\n    \"Acrylic Price Rising and Volatile\": {\n      video: \"qk4mfUot8i4\",\n      supply: {\n        acrylic: 2\n      }\n    },\n    \"Wool Yarn Price Rising\": {\n      video: \"Mm0gWRvprlM\",\n      supply: {\n        wool: 2\n      }\n    },\n    \"Silk Yarn Price Falls\": {\n      video: \"DWIT_iO6TfU\",\n      supply: {\n        silk: 0.75\n      }\n    },\n    \"Goblins Defeated\": {\n      video: \"lxV7KuVR2g0\",\n      demand: 1.5\n    }\n  };\n\n  keys = Object.keys(events);\n\n  keys.forEach(function(name) {\n    var event;\n    event = events[name];\n    return event.text = name;\n  });\n\n  tubes = require(\"./youtube\");\n\n  $(\"body\").on(\"click\", \".dismiss\", function() {\n    return tubes.stop();\n  });\n\n  module.exports = {\n    occur: function() {\n      var demand, supply, text, video, _ref;\n      _ref = events[keys.rand()], supply = _ref.supply, demand = _ref.demand, text = _ref.text, video = _ref.video;\n      $(\"#overlay h2\").text(text);\n      $(\"#overlay\").show();\n      $(\"audio\").animate({\n        volume: 0\n      });\n      if (demand) {\n        Object.keys(fibers).forEach(function(type) {\n          return fibers[type].demandPrice = Math.floor(fibers[type].demandPrice * demand);\n        });\n      }\n      if (supply) {\n        Object.keys(supply).forEach(function(type) {\n          var change;\n          change = supply[type];\n          return fibers[type].supplyPrice = Math.floor(fibers[type].supplyPrice * change);\n        });\n      }\n      return tubes.playVideo(video, function() {\n        $(\"#overlay\").hide();\n        return $(\"audio\").animate({\n          volume: 1\n        });\n      });\n    }\n  };\n\n}).call(this);\n",
      "type": "blob"
    },
    "_lib/hamljr_runtime": {
      "path": "_lib/hamljr_runtime",
      "content": "(function() {\n  var Runtime, dataName, document,\n    __slice = [].slice;\n\n  dataName = \"__hamlJR_data\";\n\n  if (typeof window !== \"undefined\" && window !== null) {\n    document = window.document;\n  } else {\n    document = global.document;\n  }\n\n  Runtime = function(context) {\n    var append, bindObservable, classes, id, lastParent, observeAttribute, observeText, pop, push, render, stack, top;\n    stack = [];\n    lastParent = function() {\n      var element, i;\n      i = stack.length - 1;\n      while ((element = stack[i]) && element.nodeType === 11) {\n        i -= 1;\n      }\n      return element;\n    };\n    top = function() {\n      return stack[stack.length - 1];\n    };\n    append = function(child) {\n      var _ref;\n      if ((_ref = top()) != null) {\n        _ref.appendChild(child);\n      }\n      return child;\n    };\n    push = function(child) {\n      return stack.push(child);\n    };\n    pop = function() {\n      return append(stack.pop());\n    };\n    render = function(child) {\n      push(child);\n      return pop();\n    };\n    bindObservable = function(element, value, update) {\n      var observable, unobserve;\n      if (typeof Observable === \"undefined\" || Observable === null) {\n        update(value);\n        return;\n      }\n      observable = Observable(value);\n      observable.observe(update);\n      update(observable());\n      unobserve = function() {\n        return observable.stopObserving(update);\n      };\n      element.addEventListener(\"DOMNodeRemoved\", unobserve, true);\n      return element;\n    };\n    id = function() {\n      var element, sources, update, value;\n      sources = 1 <= arguments.length ? __slice.call(arguments, 0) : [];\n      element = top();\n      update = function(newValue) {\n        if (typeof newValue === \"function\") {\n          newValue = newValue();\n        }\n        return element.id = newValue;\n      };\n      value = function() {\n        var possibleValues;\n        possibleValues = sources.map(function(source) {\n          if (typeof source === \"function\") {\n            return source();\n          } else {\n            return source;\n          }\n        }).filter(function(idValue) {\n          return idValue != null;\n        });\n        return possibleValues[possibleValues.length - 1];\n      };\n      return bindObservable(element, value, update);\n    };\n    classes = function() {\n      var element, sources, update, value;\n      sources = 1 <= arguments.length ? __slice.call(arguments, 0) : [];\n      element = top();\n      update = function(newValue) {\n        if (typeof newValue === \"function\") {\n          newValue = newValue();\n        }\n        return element.className = newValue;\n      };\n      value = function() {\n        var possibleValues;\n        possibleValues = sources.map(function(source) {\n          if (typeof source === \"function\") {\n            return source();\n          } else {\n            return source;\n          }\n        }).filter(function(sourceValue) {\n          return sourceValue != null;\n        });\n        return possibleValues.join(\" \");\n      };\n      return bindObservable(element, value, update);\n    };\n    observeAttribute = function(name, value) {\n      var element, update;\n      element = top();\n      update = function(newValue) {\n        return element.setAttribute(name, newValue);\n      };\n      return bindObservable(element, value, update);\n    };\n    observeText = function(value) {\n      var element, update;\n      switch (value != null ? value.nodeType : void 0) {\n        case 1:\n        case 3:\n        case 11:\n          render(value);\n          return;\n      }\n      element = document.createTextNode('');\n      update = function(newValue) {\n        return element.nodeValue = newValue;\n      };\n      bindObservable(element, value, update);\n      return render(element);\n    };\n    return {\n      push: push,\n      pop: pop,\n      id: id,\n      classes: classes,\n      attribute: observeAttribute,\n      text: observeText,\n      filter: function(name, content) {},\n      each: function(items, fn) {\n        var elements, parent, replace;\n        items = Observable(items);\n        elements = [];\n        parent = lastParent();\n        items.observe(function(newItems) {\n          return replace(elements, newItems);\n        });\n        replace = function(oldElements, items) {\n          var firstElement;\n          if (oldElements) {\n            firstElement = oldElements[0];\n            parent = (firstElement != null ? firstElement.parentElement : void 0) || parent;\n            elements = items.map(function(item, index, array) {\n              var element;\n              element = fn.call(item, item, index, array);\n              element[dataName] = item;\n              parent.insertBefore(element, firstElement);\n              return element;\n            });\n            return oldElements.each(function(element) {\n              return element.remove();\n            });\n          } else {\n            return elements = items.map(function(item, index, array) {\n              var element;\n              element = fn.call(item, item, index, array);\n              element[dataName] = item;\n              return element;\n            });\n          }\n        };\n        return replace(null, items);\n      },\n      \"with\": function(item, fn) {\n        var element, replace, value;\n        element = null;\n        item = Observable(item);\n        item.observe(function(newValue) {\n          return replace(element, newValue);\n        });\n        value = item();\n        replace = function(oldElement, value) {\n          var parent;\n          element = fn.call(value);\n          element[dataName] = item;\n          if (oldElement) {\n            parent = oldElement.parentElement;\n            parent.insertBefore(element, oldElement);\n            return oldElement.remove();\n          } else {\n\n          }\n        };\n        return replace(element, value);\n      },\n      on: function(eventName, fn) {\n        var element;\n        element = lastParent();\n        if (eventName === \"change\") {\n          switch (element.nodeName) {\n            case \"SELECT\":\n              element[\"on\" + eventName] = function() {\n                var selectedOption;\n                selectedOption = this.options[this.selectedIndex];\n                return fn(selectedOption[dataName]);\n              };\n              if (fn.observe) {\n                return fn.observe(function(newValue) {\n                  return Array.prototype.forEach.call(element.options, function(option, index) {\n                    if (option[dataName] === newValue) {\n                      return element.selectedIndex = index;\n                    }\n                  });\n                });\n              }\n              break;\n            default:\n              element[\"on\" + eventName] = function() {\n                return fn(element.value);\n              };\n              if (fn.observe) {\n                return fn.observe(function(newValue) {\n                  return element.value = newValue;\n                });\n              }\n          }\n        } else {\n          return element[\"on\" + eventName] = function(event) {\n            return fn.call(context, event);\n          };\n        }\n      }\n    };\n  };\n\n  module.exports = Runtime;\n\n}).call(this);\n\n//# sourceURL=runtime.coffee",
      "type": "blob"
    }
  },
  "progenitor": {
    "url": "http://strd6.github.io/editor/"
  },
  "entryPoint": "main",
  "remoteDependencies": [
    "https://code.jquery.com/jquery-1.11.0.min.js"
  ],
  "repository": {
    "id": 18340637,
    "name": "goboknit",
    "full_name": "STRd6/goboknit",
    "owner": {
      "login": "STRd6",
      "id": 18894,
      "avatar_url": "https://avatars.githubusercontent.com/u/18894?",
      "gravatar_id": "33117162fff8a9cf50544a604f60c045",
      "url": "https://api.github.com/users/STRd6",
      "html_url": "https://github.com/STRd6",
      "followers_url": "https://api.github.com/users/STRd6/followers",
      "following_url": "https://api.github.com/users/STRd6/following{/other_user}",
      "gists_url": "https://api.github.com/users/STRd6/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/STRd6/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/STRd6/subscriptions",
      "organizations_url": "https://api.github.com/users/STRd6/orgs",
      "repos_url": "https://api.github.com/users/STRd6/repos",
      "events_url": "https://api.github.com/users/STRd6/events{/privacy}",
      "received_events_url": "https://api.github.com/users/STRd6/received_events",
      "type": "User",
      "site_admin": false
    },
    "private": false,
    "html_url": "https://github.com/STRd6/goboknit",
    "description": "A tycoon game where you knit goblins with cyborgs.",
    "fork": false,
    "url": "https://api.github.com/repos/STRd6/goboknit",
    "forks_url": "https://api.github.com/repos/STRd6/goboknit/forks",
    "keys_url": "https://api.github.com/repos/STRd6/goboknit/keys{/key_id}",
    "collaborators_url": "https://api.github.com/repos/STRd6/goboknit/collaborators{/collaborator}",
    "teams_url": "https://api.github.com/repos/STRd6/goboknit/teams",
    "hooks_url": "https://api.github.com/repos/STRd6/goboknit/hooks",
    "issue_events_url": "https://api.github.com/repos/STRd6/goboknit/issues/events{/number}",
    "events_url": "https://api.github.com/repos/STRd6/goboknit/events",
    "assignees_url": "https://api.github.com/repos/STRd6/goboknit/assignees{/user}",
    "branches_url": "https://api.github.com/repos/STRd6/goboknit/branches{/branch}",
    "tags_url": "https://api.github.com/repos/STRd6/goboknit/tags",
    "blobs_url": "https://api.github.com/repos/STRd6/goboknit/git/blobs{/sha}",
    "git_tags_url": "https://api.github.com/repos/STRd6/goboknit/git/tags{/sha}",
    "git_refs_url": "https://api.github.com/repos/STRd6/goboknit/git/refs{/sha}",
    "trees_url": "https://api.github.com/repos/STRd6/goboknit/git/trees{/sha}",
    "statuses_url": "https://api.github.com/repos/STRd6/goboknit/statuses/{sha}",
    "languages_url": "https://api.github.com/repos/STRd6/goboknit/languages",
    "stargazers_url": "https://api.github.com/repos/STRd6/goboknit/stargazers",
    "contributors_url": "https://api.github.com/repos/STRd6/goboknit/contributors",
    "subscribers_url": "https://api.github.com/repos/STRd6/goboknit/subscribers",
    "subscription_url": "https://api.github.com/repos/STRd6/goboknit/subscription",
    "commits_url": "https://api.github.com/repos/STRd6/goboknit/commits{/sha}",
    "git_commits_url": "https://api.github.com/repos/STRd6/goboknit/git/commits{/sha}",
    "comments_url": "https://api.github.com/repos/STRd6/goboknit/comments{/number}",
    "issue_comment_url": "https://api.github.com/repos/STRd6/goboknit/issues/comments/{number}",
    "contents_url": "https://api.github.com/repos/STRd6/goboknit/contents/{+path}",
    "compare_url": "https://api.github.com/repos/STRd6/goboknit/compare/{base}...{head}",
    "merges_url": "https://api.github.com/repos/STRd6/goboknit/merges",
    "archive_url": "https://api.github.com/repos/STRd6/goboknit/{archive_format}{/ref}",
    "downloads_url": "https://api.github.com/repos/STRd6/goboknit/downloads",
    "issues_url": "https://api.github.com/repos/STRd6/goboknit/issues{/number}",
    "pulls_url": "https://api.github.com/repos/STRd6/goboknit/pulls{/number}",
    "milestones_url": "https://api.github.com/repos/STRd6/goboknit/milestones{/number}",
    "notifications_url": "https://api.github.com/repos/STRd6/goboknit/notifications{?since,all,participating}",
    "labels_url": "https://api.github.com/repos/STRd6/goboknit/labels{/name}",
    "releases_url": "https://api.github.com/repos/STRd6/goboknit/releases{/id}",
    "created_at": "2014-04-01T18:51:14Z",
    "updated_at": "2014-04-01T18:51:14Z",
    "pushed_at": "2014-04-01T18:51:14Z",
    "git_url": "git://github.com/STRd6/goboknit.git",
    "ssh_url": "git@github.com:STRd6/goboknit.git",
    "clone_url": "https://github.com/STRd6/goboknit.git",
    "svn_url": "https://github.com/STRd6/goboknit",
    "homepage": null,
    "size": 0,
    "stargazers_count": 0,
    "watchers_count": 0,
    "language": null,
    "has_issues": true,
    "has_downloads": true,
    "has_wiki": true,
    "forks_count": 0,
    "mirror_url": null,
    "open_issues_count": 0,
    "forks": 0,
    "open_issues": 0,
    "watchers": 0,
    "default_branch": "master",
    "master_branch": "master",
    "permissions": {
      "admin": true,
      "push": true,
      "pull": true
    },
    "network_count": 0,
    "subscribers_count": 1,
    "branch": "master",
    "publishBranch": "gh-pages"
  },
  "dependencies": {
    "composition": {
      "source": {
        "LICENSE": {
          "path": "LICENSE",
          "mode": "100644",
          "content": "The MIT License (MIT)\n\nCopyright (c) 2014 Daniel X Moore\n\nPermission is hereby granted, free of charge, to any person obtaining a copy of\nthis software and associated documentation files (the \"Software\"), to deal in\nthe Software without restriction, including without limitation the rights to\nuse, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of\nthe Software, and to permit persons to whom the Software is furnished to do so,\nsubject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS\nFOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR\nCOPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER\nIN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN\nCONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\n",
          "type": "blob"
        },
        "pixie.cson": {
          "path": "pixie.cson",
          "mode": "100644",
          "content": "entryPoint: \"README\"\nversion: \"0.1.0\"\ndependencies:\n  core: \"distri/core:v0.6.0\"\n  observable: \"distri/observable:v0.1.0\"\n",
          "type": "blob"
        },
        "test/compositions.coffee": {
          "path": "test/compositions.coffee",
          "mode": "100644",
          "content": "\nModel = require \"../README\"\n\ndescribe 'Model', ->\n  # Association Testing model\n  Person = (I) ->\n    person = Model(I)\n\n    person.attrAccessor(\n      'firstName'\n      'lastName'\n      'suffix'\n    )\n\n    person.fullName = ->\n      \"#{@firstName()} #{@lastName()} #{@suffix()}\"\n\n    return person\n\n  describe \"#attrObservable\", ->\n    it 'should allow for observing of attributes', ->\n      model = Model\n        name: \"Duder\"\n\n      model.attrObservable \"name\"\n\n      model.name(\"Dudeman\")\n\n      assert.equal model.name(), \"Dudeman\"\n\n    it 'should bind properties to observable attributes', ->\n      model = Model\n        name: \"Duder\"\n\n      model.attrObservable \"name\"\n\n      model.name(\"Dudeman\")\n\n      assert.equal model.name(), \"Dudeman\"\n      assert.equal model.name(), model.I.name\n\n  describe \"#attrModel\", ->\n    it \"should be a model instance\", ->\n      model = Model\n        person:\n          firstName: \"Duder\"\n          lastName: \"Mannington\"\n          suffix: \"Jr.\"\n\n      model.attrModel(\"person\", Person)\n\n      assert.equal model.person().fullName(), \"Duder Mannington Jr.\"\n\n    it \"should allow setting the associated model\", ->\n      model = Model\n        person:\n          firstName: \"Duder\"\n          lastName: \"Mannington\"\n          suffix: \"Jr.\"\n\n      model.attrModel(\"person\", Person)\n\n      otherPerson = Person\n        firstName: \"Mr.\"\n        lastName: \"Man\"\n\n      model.person(otherPerson)\n\n      assert.equal model.person().firstName(), \"Mr.\"\n\n    it \"shouldn't update the instance properties after it's been replaced\", ->\n      model = Model\n        person:\n          firstName: \"Duder\"\n          lastName: \"Mannington\"\n          suffix: \"Jr.\"\n\n      model.attrModel(\"person\", Person)\n\n      duder = model.person()\n\n      otherPerson = Person\n        firstName: \"Mr.\"\n        lastName: \"Man\"\n\n      model.person(otherPerson)\n\n      duder.firstName(\"Joe\")\n\n      assert.equal duder.I.firstName, \"Joe\"\n      assert.equal model.I.person.firstName, \"Mr.\"\n\n  describe \"#attrModels\", ->\n    it \"should have an array of model instances\", ->\n      model = Model\n        people: [{\n          firstName: \"Duder\"\n          lastName: \"Mannington\"\n          suffix: \"Jr.\"\n        }, {\n          firstName: \"Mr.\"\n          lastName: \"Mannington\"\n          suffix: \"Sr.\"\n        }]\n\n      model.attrModels(\"people\", Person)\n\n      assert.equal model.people()[0].fullName(), \"Duder Mannington Jr.\"\n\n    it \"should track pushes\", ->\n      model = Model\n        people: [{\n          firstName: \"Duder\"\n          lastName: \"Mannington\"\n          suffix: \"Jr.\"\n        }, {\n          firstName: \"Mr.\"\n          lastName: \"Mannington\"\n          suffix: \"Sr.\"\n        }]\n\n      model.attrModels(\"people\", Person)\n\n      model.people.push Person\n        firstName: \"JoJo\"\n        lastName: \"Loco\"\n\n      assert.equal model.people().length, 3\n      assert.equal model.I.people.length, 3\n\n    it \"should track pops\", ->\n      model = Model\n        people: [{\n          firstName: \"Duder\"\n          lastName: \"Mannington\"\n          suffix: \"Jr.\"\n        }, {\n          firstName: \"Mr.\"\n          lastName: \"Mannington\"\n          suffix: \"Sr.\"\n        }]\n\n      model.attrModels(\"people\", Person)\n\n      model.people.pop()\n\n      assert.equal model.people().length, 1\n      assert.equal model.I.people.length, 1\n\n  describe \"#toJSON\", ->\n    it \"should return an object appropriate for JSON serialization\", ->\n      model = Model\n        test: true\n\n      assert model.toJSON().test\n\n  describe \"#observeAll\", ->\n    it \"should observe all attributes of a simple model\"\n    ->  # TODO\n      model = Model\n        test: true\n        yolo: \"4life\"\n\n      model.observeAll()\n\n      assert model.test()\n      assert.equal model.yolo(), \"4life\"\n\n    it \"should camel case underscored names\"",
          "type": "blob"
        },
        "README.coffee.md": {
          "path": "README.coffee.md",
          "mode": "100644",
          "content": "Compositions\n============\n\nThe `compositions` module provides helper methods to compose nested data models.\n\nCompositions uses [Observable](/observable/docs) to keep the internal data in sync.\n\n    Core = require \"core\"\n    Observable = require \"observable\"\n\n    module.exports = (I={}, self=Core(I)) ->\n\n      self.extend\n\nObserve any number of attributes as simple observables. For each attribute name passed in we expose a public getter/setter method and listen to changes when the value is set.\n\n        attrObservable: (names...) ->\n          names.forEach (name) ->\n            self[name] = Observable(I[name])\n\n            self[name].observe (newValue) ->\n              I[name] = newValue\n\n          return self\n\nObserve an attribute as a model. Treats the attribute given as an Observable\nmodel instance exposting a getter/setter method of the same name. The Model\nconstructor must be passed in explicitly.\n\n        attrModel: (name, Model) ->\n          model = Model(I[name])\n\n          self[name] = Observable(model)\n\n          self[name].observe (newValue) ->\n            I[name] = newValue.I\n\n          return self\n\nObserve an attribute as a list of sub-models. This is the same as `attrModel`\nexcept the attribute is expected to be an array of models rather than a single one.\n\n        attrModels: (name, Model) ->\n          models = (I[name] or []).map (x) ->\n            Model(x)\n\n          self[name] = Observable(models)\n\n          self[name].observe (newValue) ->\n            I[name] = newValue.map (instance) ->\n              instance.I\n\n          return self\n\nThe JSON representation is kept up to date via the observable properites and resides in `I`.\n\n        toJSON: ->\n          I\n\nReturn our public object.\n\n      return self\n",
          "type": "blob"
        }
      },
      "distribution": {
        "pixie": {
          "path": "pixie",
          "content": "module.exports = {\"entryPoint\":\"README\",\"version\":\"0.1.0\",\"dependencies\":{\"core\":\"distri/core:v0.6.0\",\"observable\":\"distri/observable:v0.1.0\"}};",
          "type": "blob"
        },
        "test/compositions": {
          "path": "test/compositions",
          "content": "(function() {\n  var Model;\n\n  Model = require(\"../README\");\n\n  describe('Model', function() {\n    var Person;\n    Person = function(I) {\n      var person;\n      person = Model(I);\n      person.attrAccessor('firstName', 'lastName', 'suffix');\n      person.fullName = function() {\n        return \"\" + (this.firstName()) + \" \" + (this.lastName()) + \" \" + (this.suffix());\n      };\n      return person;\n    };\n    describe(\"#attrObservable\", function() {\n      it('should allow for observing of attributes', function() {\n        var model;\n        model = Model({\n          name: \"Duder\"\n        });\n        model.attrObservable(\"name\");\n        model.name(\"Dudeman\");\n        return assert.equal(model.name(), \"Dudeman\");\n      });\n      return it('should bind properties to observable attributes', function() {\n        var model;\n        model = Model({\n          name: \"Duder\"\n        });\n        model.attrObservable(\"name\");\n        model.name(\"Dudeman\");\n        assert.equal(model.name(), \"Dudeman\");\n        return assert.equal(model.name(), model.I.name);\n      });\n    });\n    describe(\"#attrModel\", function() {\n      it(\"should be a model instance\", function() {\n        var model;\n        model = Model({\n          person: {\n            firstName: \"Duder\",\n            lastName: \"Mannington\",\n            suffix: \"Jr.\"\n          }\n        });\n        model.attrModel(\"person\", Person);\n        return assert.equal(model.person().fullName(), \"Duder Mannington Jr.\");\n      });\n      it(\"should allow setting the associated model\", function() {\n        var model, otherPerson;\n        model = Model({\n          person: {\n            firstName: \"Duder\",\n            lastName: \"Mannington\",\n            suffix: \"Jr.\"\n          }\n        });\n        model.attrModel(\"person\", Person);\n        otherPerson = Person({\n          firstName: \"Mr.\",\n          lastName: \"Man\"\n        });\n        model.person(otherPerson);\n        return assert.equal(model.person().firstName(), \"Mr.\");\n      });\n      return it(\"shouldn't update the instance properties after it's been replaced\", function() {\n        var duder, model, otherPerson;\n        model = Model({\n          person: {\n            firstName: \"Duder\",\n            lastName: \"Mannington\",\n            suffix: \"Jr.\"\n          }\n        });\n        model.attrModel(\"person\", Person);\n        duder = model.person();\n        otherPerson = Person({\n          firstName: \"Mr.\",\n          lastName: \"Man\"\n        });\n        model.person(otherPerson);\n        duder.firstName(\"Joe\");\n        assert.equal(duder.I.firstName, \"Joe\");\n        return assert.equal(model.I.person.firstName, \"Mr.\");\n      });\n    });\n    describe(\"#attrModels\", function() {\n      it(\"should have an array of model instances\", function() {\n        var model;\n        model = Model({\n          people: [\n            {\n              firstName: \"Duder\",\n              lastName: \"Mannington\",\n              suffix: \"Jr.\"\n            }, {\n              firstName: \"Mr.\",\n              lastName: \"Mannington\",\n              suffix: \"Sr.\"\n            }\n          ]\n        });\n        model.attrModels(\"people\", Person);\n        return assert.equal(model.people()[0].fullName(), \"Duder Mannington Jr.\");\n      });\n      it(\"should track pushes\", function() {\n        var model;\n        model = Model({\n          people: [\n            {\n              firstName: \"Duder\",\n              lastName: \"Mannington\",\n              suffix: \"Jr.\"\n            }, {\n              firstName: \"Mr.\",\n              lastName: \"Mannington\",\n              suffix: \"Sr.\"\n            }\n          ]\n        });\n        model.attrModels(\"people\", Person);\n        model.people.push(Person({\n          firstName: \"JoJo\",\n          lastName: \"Loco\"\n        }));\n        assert.equal(model.people().length, 3);\n        return assert.equal(model.I.people.length, 3);\n      });\n      return it(\"should track pops\", function() {\n        var model;\n        model = Model({\n          people: [\n            {\n              firstName: \"Duder\",\n              lastName: \"Mannington\",\n              suffix: \"Jr.\"\n            }, {\n              firstName: \"Mr.\",\n              lastName: \"Mannington\",\n              suffix: \"Sr.\"\n            }\n          ]\n        });\n        model.attrModels(\"people\", Person);\n        model.people.pop();\n        assert.equal(model.people().length, 1);\n        return assert.equal(model.I.people.length, 1);\n      });\n    });\n    describe(\"#toJSON\", function() {\n      return it(\"should return an object appropriate for JSON serialization\", function() {\n        var model;\n        model = Model({\n          test: true\n        });\n        return assert(model.toJSON().test);\n      });\n    });\n    return describe(\"#observeAll\", function() {\n      it(\"should observe all attributes of a simple model\");\n      (function() {\n        var model;\n        model = Model({\n          test: true,\n          yolo: \"4life\"\n        });\n        model.observeAll();\n        assert(model.test());\n        return assert.equal(model.yolo(), \"4life\");\n      });\n      return it(\"should camel case underscored names\");\n    });\n  });\n\n}).call(this);\n\n//# sourceURL=test/compositions.coffee",
          "type": "blob"
        },
        "README": {
          "path": "README",
          "content": "(function() {\n  var Core, Observable,\n    __slice = [].slice;\n\n  Core = require(\"core\");\n\n  Observable = require(\"observable\");\n\n  module.exports = function(I, self) {\n    if (I == null) {\n      I = {};\n    }\n    if (self == null) {\n      self = Core(I);\n    }\n    self.extend({\n      attrObservable: function() {\n        var names;\n        names = 1 <= arguments.length ? __slice.call(arguments, 0) : [];\n        names.forEach(function(name) {\n          self[name] = Observable(I[name]);\n          return self[name].observe(function(newValue) {\n            return I[name] = newValue;\n          });\n        });\n        return self;\n      },\n      attrModel: function(name, Model) {\n        var model;\n        model = Model(I[name]);\n        self[name] = Observable(model);\n        self[name].observe(function(newValue) {\n          return I[name] = newValue.I;\n        });\n        return self;\n      },\n      attrModels: function(name, Model) {\n        var models;\n        models = (I[name] || []).map(function(x) {\n          return Model(x);\n        });\n        self[name] = Observable(models);\n        self[name].observe(function(newValue) {\n          return I[name] = newValue.map(function(instance) {\n            return instance.I;\n          });\n        });\n        return self;\n      },\n      toJSON: function() {\n        return I;\n      }\n    });\n    return self;\n  };\n\n}).call(this);\n\n//# sourceURL=README.coffee",
          "type": "blob"
        }
      },
      "progenitor": {
        "url": "http://strd6.github.io/editor/"
      },
      "version": "0.1.0",
      "entryPoint": "README",
      "repository": {
        "id": 17256636,
        "name": "compositions",
        "full_name": "distri/compositions",
        "owner": {
          "login": "distri",
          "id": 6005125,
          "avatar_url": "https://avatars.githubusercontent.com/u/6005125",
          "gravatar_id": null,
          "url": "https://api.github.com/users/distri",
          "html_url": "https://github.com/distri",
          "followers_url": "https://api.github.com/users/distri/followers",
          "following_url": "https://api.github.com/users/distri/following{/other_user}",
          "gists_url": "https://api.github.com/users/distri/gists{/gist_id}",
          "starred_url": "https://api.github.com/users/distri/starred{/owner}{/repo}",
          "subscriptions_url": "https://api.github.com/users/distri/subscriptions",
          "organizations_url": "https://api.github.com/users/distri/orgs",
          "repos_url": "https://api.github.com/users/distri/repos",
          "events_url": "https://api.github.com/users/distri/events{/privacy}",
          "received_events_url": "https://api.github.com/users/distri/received_events",
          "type": "Organization",
          "site_admin": false
        },
        "private": false,
        "html_url": "https://github.com/distri/compositions",
        "description": "",
        "fork": false,
        "url": "https://api.github.com/repos/distri/compositions",
        "forks_url": "https://api.github.com/repos/distri/compositions/forks",
        "keys_url": "https://api.github.com/repos/distri/compositions/keys{/key_id}",
        "collaborators_url": "https://api.github.com/repos/distri/compositions/collaborators{/collaborator}",
        "teams_url": "https://api.github.com/repos/distri/compositions/teams",
        "hooks_url": "https://api.github.com/repos/distri/compositions/hooks",
        "issue_events_url": "https://api.github.com/repos/distri/compositions/issues/events{/number}",
        "events_url": "https://api.github.com/repos/distri/compositions/events",
        "assignees_url": "https://api.github.com/repos/distri/compositions/assignees{/user}",
        "branches_url": "https://api.github.com/repos/distri/compositions/branches{/branch}",
        "tags_url": "https://api.github.com/repos/distri/compositions/tags",
        "blobs_url": "https://api.github.com/repos/distri/compositions/git/blobs{/sha}",
        "git_tags_url": "https://api.github.com/repos/distri/compositions/git/tags{/sha}",
        "git_refs_url": "https://api.github.com/repos/distri/compositions/git/refs{/sha}",
        "trees_url": "https://api.github.com/repos/distri/compositions/git/trees{/sha}",
        "statuses_url": "https://api.github.com/repos/distri/compositions/statuses/{sha}",
        "languages_url": "https://api.github.com/repos/distri/compositions/languages",
        "stargazers_url": "https://api.github.com/repos/distri/compositions/stargazers",
        "contributors_url": "https://api.github.com/repos/distri/compositions/contributors",
        "subscribers_url": "https://api.github.com/repos/distri/compositions/subscribers",
        "subscription_url": "https://api.github.com/repos/distri/compositions/subscription",
        "commits_url": "https://api.github.com/repos/distri/compositions/commits{/sha}",
        "git_commits_url": "https://api.github.com/repos/distri/compositions/git/commits{/sha}",
        "comments_url": "https://api.github.com/repos/distri/compositions/comments{/number}",
        "issue_comment_url": "https://api.github.com/repos/distri/compositions/issues/comments/{number}",
        "contents_url": "https://api.github.com/repos/distri/compositions/contents/{+path}",
        "compare_url": "https://api.github.com/repos/distri/compositions/compare/{base}...{head}",
        "merges_url": "https://api.github.com/repos/distri/compositions/merges",
        "archive_url": "https://api.github.com/repos/distri/compositions/{archive_format}{/ref}",
        "downloads_url": "https://api.github.com/repos/distri/compositions/downloads",
        "issues_url": "https://api.github.com/repos/distri/compositions/issues{/number}",
        "pulls_url": "https://api.github.com/repos/distri/compositions/pulls{/number}",
        "milestones_url": "https://api.github.com/repos/distri/compositions/milestones{/number}",
        "notifications_url": "https://api.github.com/repos/distri/compositions/notifications{?since,all,participating}",
        "labels_url": "https://api.github.com/repos/distri/compositions/labels{/name}",
        "releases_url": "https://api.github.com/repos/distri/compositions/releases{/id}",
        "created_at": "2014-02-27T17:00:47Z",
        "updated_at": "2014-02-27T17:01:08Z",
        "pushed_at": "2014-02-27T17:00:47Z",
        "git_url": "git://github.com/distri/compositions.git",
        "ssh_url": "git@github.com:distri/compositions.git",
        "clone_url": "https://github.com/distri/compositions.git",
        "svn_url": "https://github.com/distri/compositions",
        "homepage": null,
        "size": 0,
        "stargazers_count": 0,
        "watchers_count": 0,
        "language": null,
        "has_issues": true,
        "has_downloads": true,
        "has_wiki": true,
        "forks_count": 0,
        "mirror_url": null,
        "open_issues_count": 0,
        "forks": 0,
        "open_issues": 0,
        "watchers": 0,
        "default_branch": "master",
        "master_branch": "master",
        "permissions": {
          "admin": true,
          "push": true,
          "pull": true
        },
        "organization": {
          "login": "distri",
          "id": 6005125,
          "avatar_url": "https://avatars.githubusercontent.com/u/6005125",
          "gravatar_id": null,
          "url": "https://api.github.com/users/distri",
          "html_url": "https://github.com/distri",
          "followers_url": "https://api.github.com/users/distri/followers",
          "following_url": "https://api.github.com/users/distri/following{/other_user}",
          "gists_url": "https://api.github.com/users/distri/gists{/gist_id}",
          "starred_url": "https://api.github.com/users/distri/starred{/owner}{/repo}",
          "subscriptions_url": "https://api.github.com/users/distri/subscriptions",
          "organizations_url": "https://api.github.com/users/distri/orgs",
          "repos_url": "https://api.github.com/users/distri/repos",
          "events_url": "https://api.github.com/users/distri/events{/privacy}",
          "received_events_url": "https://api.github.com/users/distri/received_events",
          "type": "Organization",
          "site_admin": false
        },
        "network_count": 0,
        "subscribers_count": 1,
        "branch": "v0.1.0",
        "defaultBranch": "master"
      },
      "dependencies": {
        "core": {
          "source": {
            "LICENSE": {
              "path": "LICENSE",
              "mode": "100644",
              "content": "The MIT License (MIT)\n\nCopyright (c) 2013 Daniel X Moore\n\nPermission is hereby granted, free of charge, to any person obtaining a copy of\nthis software and associated documentation files (the \"Software\"), to deal in\nthe Software without restriction, including without limitation the rights to\nuse, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of\nthe Software, and to permit persons to whom the Software is furnished to do so,\nsubject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS\nFOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR\nCOPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER\nIN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN\nCONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\n",
              "type": "blob"
            },
            "README.md": {
              "path": "README.md",
              "mode": "100644",
              "content": "core\n====\n\nAn object extension system.\n",
              "type": "blob"
            },
            "core.coffee.md": {
              "path": "core.coffee.md",
              "mode": "100644",
              "content": "Core\n====\n\nThe Core module is used to add extended functionality to objects without\nextending `Object.prototype` directly.\n\n    Core = (I={}, self={}) ->\n      extend self,\n\nExternal access to instance variables. Use of this property should be avoided\nin general, but can come in handy from time to time.\n\n>     #! example\n>     I =\n>       r: 255\n>       g: 0\n>       b: 100\n>\n>     myObject = Core(I)\n>\n>     [myObject.I.r, myObject.I.g, myObject.I.b]\n\n        I: I\n\nGenerates a public jQuery style getter / setter method for each `String` argument.\n\n>     #! example\n>     myObject = Core\n>       r: 255\n>       g: 0\n>       b: 100\n>\n>     myObject.attrAccessor \"r\", \"g\", \"b\"\n>\n>     myObject.r(254)\n\n        attrAccessor: (attrNames...) ->\n          attrNames.forEach (attrName) ->\n            self[attrName] = (newValue) ->\n              if arguments.length > 0\n                I[attrName] = newValue\n\n                return self\n              else\n                I[attrName]\n\n          return self\n\nGenerates a public jQuery style getter method for each String argument.\n\n>     #! example\n>     myObject = Core\n>       r: 255\n>       g: 0\n>       b: 100\n>\n>     myObject.attrReader \"r\", \"g\", \"b\"\n>\n>     [myObject.r(), myObject.g(), myObject.b()]\n\n        attrReader: (attrNames...) ->\n          attrNames.forEach (attrName) ->\n            self[attrName] = ->\n              I[attrName]\n\n          return self\n\nExtends this object with methods from the passed in object. A shortcut for Object.extend(self, methods)\n\n>     I =\n>       x: 30\n>       y: 40\n>       maxSpeed: 5\n>\n>     # we are using extend to give player\n>     # additional methods that Core doesn't have\n>     player = Core(I).extend\n>       increaseSpeed: ->\n>         I.maxSpeed += 1\n>\n>     player.increaseSpeed()\n\n        extend: (objects...) ->\n          extend self, objects...\n\nIncludes a module in this object. A module is a constructor that takes two parameters, `I` and `self`\n\n>     myObject = Core()\n>     myObject.include(Bindable)\n\n>     # now you can bind handlers to functions\n>     myObject.bind \"someEvent\", ->\n>       alert(\"wow. that was easy.\")\n\n        include: (modules...) ->\n          for Module in modules\n            Module(I, self)\n\n          return self\n\n      return self\n\nHelpers\n-------\n\nExtend an object with the properties of other objects.\n\n    extend = (target, sources...) ->\n      for source in sources\n        for name of source\n          target[name] = source[name]\n\n      return target\n\nExport\n\n    module.exports = Core\n",
              "type": "blob"
            },
            "pixie.cson": {
              "path": "pixie.cson",
              "mode": "100644",
              "content": "entryPoint: \"core\"\nversion: \"0.6.0\"\n",
              "type": "blob"
            },
            "test/core.coffee": {
              "path": "test/core.coffee",
              "mode": "100644",
              "content": "Core = require \"../core\"\n\nok = assert\nequals = assert.equal\ntest = it\n\ndescribe \"Core\", ->\n\n  test \"#extend\", ->\n    o = Core()\n  \n    o.extend\n      test: \"jawsome\"\n  \n    equals o.test, \"jawsome\"\n  \n  test \"#attrAccessor\", ->\n    o = Core\n      test: \"my_val\"\n  \n    o.attrAccessor(\"test\")\n  \n    equals o.test(), \"my_val\"\n    equals o.test(\"new_val\"), o\n    equals o.test(), \"new_val\"\n  \n  test \"#attrReader\", ->\n    o = Core\n      test: \"my_val\"\n  \n    o.attrReader(\"test\")\n  \n    equals o.test(), \"my_val\"\n    equals o.test(\"new_val\"), \"my_val\"\n    equals o.test(), \"my_val\"\n  \n  test \"#include\", ->\n    o = Core\n      test: \"my_val\"\n  \n    M = (I, self) ->\n      self.attrReader \"test\"\n  \n      self.extend\n        test2: \"cool\"\n  \n    ret = o.include M\n  \n    equals ret, o, \"Should return self\"\n  \n    equals o.test(), \"my_val\"\n    equals o.test2, \"cool\"\n  \n  test \"#include multiple\", ->\n    o = Core\n      test: \"my_val\"\n  \n    M = (I, self) ->\n      self.attrReader \"test\"\n  \n      self.extend\n        test2: \"cool\"\n  \n    M2 = (I, self) ->\n      self.extend\n        test2: \"coolio\"\n  \n    o.include M, M2\n  \n    equals o.test2, \"coolio\"\n",
              "type": "blob"
            }
          },
          "distribution": {
            "core": {
              "path": "core",
              "content": "(function() {\n  var Core, extend,\n    __slice = [].slice;\n\n  Core = function(I, self) {\n    if (I == null) {\n      I = {};\n    }\n    if (self == null) {\n      self = {};\n    }\n    extend(self, {\n      I: I,\n      attrAccessor: function() {\n        var attrNames;\n        attrNames = 1 <= arguments.length ? __slice.call(arguments, 0) : [];\n        attrNames.forEach(function(attrName) {\n          return self[attrName] = function(newValue) {\n            if (arguments.length > 0) {\n              I[attrName] = newValue;\n              return self;\n            } else {\n              return I[attrName];\n            }\n          };\n        });\n        return self;\n      },\n      attrReader: function() {\n        var attrNames;\n        attrNames = 1 <= arguments.length ? __slice.call(arguments, 0) : [];\n        attrNames.forEach(function(attrName) {\n          return self[attrName] = function() {\n            return I[attrName];\n          };\n        });\n        return self;\n      },\n      extend: function() {\n        var objects;\n        objects = 1 <= arguments.length ? __slice.call(arguments, 0) : [];\n        return extend.apply(null, [self].concat(__slice.call(objects)));\n      },\n      include: function() {\n        var Module, modules, _i, _len;\n        modules = 1 <= arguments.length ? __slice.call(arguments, 0) : [];\n        for (_i = 0, _len = modules.length; _i < _len; _i++) {\n          Module = modules[_i];\n          Module(I, self);\n        }\n        return self;\n      }\n    });\n    return self;\n  };\n\n  extend = function() {\n    var name, source, sources, target, _i, _len;\n    target = arguments[0], sources = 2 <= arguments.length ? __slice.call(arguments, 1) : [];\n    for (_i = 0, _len = sources.length; _i < _len; _i++) {\n      source = sources[_i];\n      for (name in source) {\n        target[name] = source[name];\n      }\n    }\n    return target;\n  };\n\n  module.exports = Core;\n\n}).call(this);\n\n//# sourceURL=core.coffee",
              "type": "blob"
            },
            "pixie": {
              "path": "pixie",
              "content": "module.exports = {\"entryPoint\":\"core\",\"version\":\"0.6.0\"};",
              "type": "blob"
            },
            "test/core": {
              "path": "test/core",
              "content": "(function() {\n  var Core, equals, ok, test;\n\n  Core = require(\"../core\");\n\n  ok = assert;\n\n  equals = assert.equal;\n\n  test = it;\n\n  describe(\"Core\", function() {\n    test(\"#extend\", function() {\n      var o;\n      o = Core();\n      o.extend({\n        test: \"jawsome\"\n      });\n      return equals(o.test, \"jawsome\");\n    });\n    test(\"#attrAccessor\", function() {\n      var o;\n      o = Core({\n        test: \"my_val\"\n      });\n      o.attrAccessor(\"test\");\n      equals(o.test(), \"my_val\");\n      equals(o.test(\"new_val\"), o);\n      return equals(o.test(), \"new_val\");\n    });\n    test(\"#attrReader\", function() {\n      var o;\n      o = Core({\n        test: \"my_val\"\n      });\n      o.attrReader(\"test\");\n      equals(o.test(), \"my_val\");\n      equals(o.test(\"new_val\"), \"my_val\");\n      return equals(o.test(), \"my_val\");\n    });\n    test(\"#include\", function() {\n      var M, o, ret;\n      o = Core({\n        test: \"my_val\"\n      });\n      M = function(I, self) {\n        self.attrReader(\"test\");\n        return self.extend({\n          test2: \"cool\"\n        });\n      };\n      ret = o.include(M);\n      equals(ret, o, \"Should return self\");\n      equals(o.test(), \"my_val\");\n      return equals(o.test2, \"cool\");\n    });\n    return test(\"#include multiple\", function() {\n      var M, M2, o;\n      o = Core({\n        test: \"my_val\"\n      });\n      M = function(I, self) {\n        self.attrReader(\"test\");\n        return self.extend({\n          test2: \"cool\"\n        });\n      };\n      M2 = function(I, self) {\n        return self.extend({\n          test2: \"coolio\"\n        });\n      };\n      o.include(M, M2);\n      return equals(o.test2, \"coolio\");\n    });\n  });\n\n}).call(this);\n\n//# sourceURL=test/core.coffee",
              "type": "blob"
            }
          },
          "progenitor": {
            "url": "http://strd6.github.io/editor/"
          },
          "version": "0.6.0",
          "entryPoint": "core",
          "repository": {
            "id": 13567517,
            "name": "core",
            "full_name": "distri/core",
            "owner": {
              "login": "distri",
              "id": 6005125,
              "avatar_url": "https://identicons.github.com/f90c81ffc1498e260c820082f2e7ca5f.png",
              "gravatar_id": null,
              "url": "https://api.github.com/users/distri",
              "html_url": "https://github.com/distri",
              "followers_url": "https://api.github.com/users/distri/followers",
              "following_url": "https://api.github.com/users/distri/following{/other_user}",
              "gists_url": "https://api.github.com/users/distri/gists{/gist_id}",
              "starred_url": "https://api.github.com/users/distri/starred{/owner}{/repo}",
              "subscriptions_url": "https://api.github.com/users/distri/subscriptions",
              "organizations_url": "https://api.github.com/users/distri/orgs",
              "repos_url": "https://api.github.com/users/distri/repos",
              "events_url": "https://api.github.com/users/distri/events{/privacy}",
              "received_events_url": "https://api.github.com/users/distri/received_events",
              "type": "Organization",
              "site_admin": false
            },
            "private": false,
            "html_url": "https://github.com/distri/core",
            "description": "An object extension system.",
            "fork": false,
            "url": "https://api.github.com/repos/distri/core",
            "forks_url": "https://api.github.com/repos/distri/core/forks",
            "keys_url": "https://api.github.com/repos/distri/core/keys{/key_id}",
            "collaborators_url": "https://api.github.com/repos/distri/core/collaborators{/collaborator}",
            "teams_url": "https://api.github.com/repos/distri/core/teams",
            "hooks_url": "https://api.github.com/repos/distri/core/hooks",
            "issue_events_url": "https://api.github.com/repos/distri/core/issues/events{/number}",
            "events_url": "https://api.github.com/repos/distri/core/events",
            "assignees_url": "https://api.github.com/repos/distri/core/assignees{/user}",
            "branches_url": "https://api.github.com/repos/distri/core/branches{/branch}",
            "tags_url": "https://api.github.com/repos/distri/core/tags",
            "blobs_url": "https://api.github.com/repos/distri/core/git/blobs{/sha}",
            "git_tags_url": "https://api.github.com/repos/distri/core/git/tags{/sha}",
            "git_refs_url": "https://api.github.com/repos/distri/core/git/refs{/sha}",
            "trees_url": "https://api.github.com/repos/distri/core/git/trees{/sha}",
            "statuses_url": "https://api.github.com/repos/distri/core/statuses/{sha}",
            "languages_url": "https://api.github.com/repos/distri/core/languages",
            "stargazers_url": "https://api.github.com/repos/distri/core/stargazers",
            "contributors_url": "https://api.github.com/repos/distri/core/contributors",
            "subscribers_url": "https://api.github.com/repos/distri/core/subscribers",
            "subscription_url": "https://api.github.com/repos/distri/core/subscription",
            "commits_url": "https://api.github.com/repos/distri/core/commits{/sha}",
            "git_commits_url": "https://api.github.com/repos/distri/core/git/commits{/sha}",
            "comments_url": "https://api.github.com/repos/distri/core/comments{/number}",
            "issue_comment_url": "https://api.github.com/repos/distri/core/issues/comments/{number}",
            "contents_url": "https://api.github.com/repos/distri/core/contents/{+path}",
            "compare_url": "https://api.github.com/repos/distri/core/compare/{base}...{head}",
            "merges_url": "https://api.github.com/repos/distri/core/merges",
            "archive_url": "https://api.github.com/repos/distri/core/{archive_format}{/ref}",
            "downloads_url": "https://api.github.com/repos/distri/core/downloads",
            "issues_url": "https://api.github.com/repos/distri/core/issues{/number}",
            "pulls_url": "https://api.github.com/repos/distri/core/pulls{/number}",
            "milestones_url": "https://api.github.com/repos/distri/core/milestones{/number}",
            "notifications_url": "https://api.github.com/repos/distri/core/notifications{?since,all,participating}",
            "labels_url": "https://api.github.com/repos/distri/core/labels{/name}",
            "releases_url": "https://api.github.com/repos/distri/core/releases{/id}",
            "created_at": "2013-10-14T17:04:33Z",
            "updated_at": "2013-12-24T00:49:21Z",
            "pushed_at": "2013-10-14T23:49:11Z",
            "git_url": "git://github.com/distri/core.git",
            "ssh_url": "git@github.com:distri/core.git",
            "clone_url": "https://github.com/distri/core.git",
            "svn_url": "https://github.com/distri/core",
            "homepage": null,
            "size": 592,
            "stargazers_count": 0,
            "watchers_count": 0,
            "language": "CoffeeScript",
            "has_issues": true,
            "has_downloads": true,
            "has_wiki": true,
            "forks_count": 0,
            "mirror_url": null,
            "open_issues_count": 0,
            "forks": 0,
            "open_issues": 0,
            "watchers": 0,
            "default_branch": "master",
            "master_branch": "master",
            "permissions": {
              "admin": true,
              "push": true,
              "pull": true
            },
            "organization": {
              "login": "distri",
              "id": 6005125,
              "avatar_url": "https://identicons.github.com/f90c81ffc1498e260c820082f2e7ca5f.png",
              "gravatar_id": null,
              "url": "https://api.github.com/users/distri",
              "html_url": "https://github.com/distri",
              "followers_url": "https://api.github.com/users/distri/followers",
              "following_url": "https://api.github.com/users/distri/following{/other_user}",
              "gists_url": "https://api.github.com/users/distri/gists{/gist_id}",
              "starred_url": "https://api.github.com/users/distri/starred{/owner}{/repo}",
              "subscriptions_url": "https://api.github.com/users/distri/subscriptions",
              "organizations_url": "https://api.github.com/users/distri/orgs",
              "repos_url": "https://api.github.com/users/distri/repos",
              "events_url": "https://api.github.com/users/distri/events{/privacy}",
              "received_events_url": "https://api.github.com/users/distri/received_events",
              "type": "Organization",
              "site_admin": false
            },
            "network_count": 0,
            "subscribers_count": 1,
            "branch": "v0.6.0",
            "defaultBranch": "master"
          },
          "dependencies": {}
        },
        "observable": {
          "source": {
            "LICENSE": {
              "path": "LICENSE",
              "mode": "100644",
              "content": "The MIT License (MIT)\n\nCopyright (c) 2014 distri\n\nPermission is hereby granted, free of charge, to any person obtaining a copy of\nthis software and associated documentation files (the \"Software\"), to deal in\nthe Software without restriction, including without limitation the rights to\nuse, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of\nthe Software, and to permit persons to whom the Software is furnished to do so,\nsubject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS\nFOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR\nCOPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER\nIN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN\nCONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\n",
              "type": "blob"
            },
            "README.md": {
              "path": "README.md",
              "mode": "100644",
              "content": "observable\n==========\n",
              "type": "blob"
            },
            "main.coffee.md": {
              "path": "main.coffee.md",
              "mode": "100644",
              "content": "Observable\n==========\n\n`Observable` allows for observing arrays, functions, and objects.\n\nFunction dependencies are automagically observed.\n\nStandard array methods are proxied through to the underlying array.\n\n    Observable = (value) ->\n\nReturn the object if it is already an observable object.\n\n      return value if typeof value?.observe is \"function\"\n\nMaintain a set of listeners to observe changes and provide a helper to notify each observer.\n\n      listeners = []\n\n      notify = (newValue) ->\n        listeners.forEach (listener) ->\n          listener(newValue)\n\nOur observable function is stored as a reference to `self`.\n\nIf `value` is a function compute dependencies and listen to observables that it depends on.\n\n      if typeof value is 'function'\n        fn = value\n        self = ->\n          # Automagic dependency observation\n          if base\n            self.observe base\n\n          return value\n\n        self.observe = (listener) ->\n          listeners.push listener\n\n        changed = ->\n          value = fn()\n          notify(value)\n\n        value = computeDependencies(fn, changed)\n\n      else\n\nWhen called with zero arguments it is treated as a getter. When called with one argument it is treated as a setter.\n\nChanges to the value will trigger notifications.\n\nThe value is always returned.\n\n        self = (newValue) ->\n          if arguments.length > 0\n            if value != newValue\n              value = newValue\n\n              notify(newValue)\n          else\n            # Automagic dependency observation\n            if base\n              self.observe base\n\n          return value\n\nAdd a listener for when this object changes.\n\n        self.observe = (listener) ->\n          listeners.push listener\n\nThis `each` iterator is similar to [the Maybe monad](http://en.wikipedia.org/wiki/Monad_&#40;functional_programming&#41;#The_Maybe_monad) in that our observable may contain a single value or nothing at all.\n\n      self.each = (args...) ->\n        if value?\n          [value].forEach(args...)\n\nIf the value is an array then proxy array methods and add notifications to mutation events.\n\n      if Array.isArray(value)\n        [\n          \"concat\"\n          \"every\"\n          \"filter\"\n          \"forEach\"\n          \"indexOf\"\n          \"join\"\n          \"lastIndexOf\"\n          \"map\"\n          \"reduce\"\n          \"reduceRight\"\n          \"slice\"\n          \"some\"\n        ].forEach (method) ->\n          self[method] = (args...) ->\n            value[method](args...)\n\n        [\n          \"pop\"\n          \"push\"\n          \"reverse\"\n          \"shift\"\n          \"splice\"\n          \"sort\"\n          \"unshift\"\n        ].forEach (method) ->\n          self[method] = (args...) ->\n            notifyReturning value[method](args...)\n\n        notifyReturning = (returnValue) ->\n          notify(value)\n\n          return returnValue\n\nAdd some extra helpful methods to array observables.\n\n        extend self,\n          each: (args...) ->\n            self.forEach(args...)\n\n            return self\n\nRemove an element from the array and notify observers of changes.\n\n          remove: (object) ->\n            index = value.indexOf(object)\n\n            if index >= 0\n              notifyReturning value.splice(index, 1)[0]\n\n          get: (index) ->\n            value[index]\n\n          first: ->\n            value[0]\n\n          last: ->\n            value[value.length-1]\n\n      self.stopObserving = (fn) ->\n        remove listeners, fn\n\n      return self\n\nExport `Observable`\n\n    module.exports = Observable\n\nAppendix\n--------\n\nThe extend method adds one objects properties to another.\n\n    extend = (target, sources...) ->\n      for source in sources\n        for name of source\n          target[name] = source[name]\n\n      return target\n\n    base = undefined\n\nAutomagically compute dependencies.\n\n    computeDependencies = (fn, root) ->\n      base = root\n      value = fn()\n      base = undefined\n\n      return value\n\nRemove a value from an array.\n\n    remove = (array, value) ->\n      index = array.indexOf(value)\n\n      if index >= 0\n        array.splice(index, 1)[0]\n",
              "type": "blob"
            },
            "test/observable.coffee": {
              "path": "test/observable.coffee",
              "mode": "100644",
              "content": "Observable = require \"../main\"\n\ndescribe 'Observable', ->\n  it 'should create an observable for an object', ->\n    n = 5\n\n    observable = Observable(n)\n\n    assert.equal(observable(), n)\n\n  it 'should fire events when setting', ->\n    string = \"yolo\"\n\n    observable = Observable(string)\n    observable.observe (newValue) ->\n      assert.equal newValue, \"4life\"\n\n    observable(\"4life\")\n\n  it 'should be idempotent', ->\n    o = Observable(5)\n\n    assert.equal o, Observable(o)\n\n  describe \"#each\", ->\n    it \"should be invoked once if there is an observable\", ->\n      o = Observable(5)\n      called = 0\n\n      o.each (value) ->\n        called += 1\n        assert.equal value, 5\n\n      assert.equal called, 1\n\n    it \"should not be invoked if observable is null\", ->\n      o = Observable(null)\n      called = 0\n\n      o.each (value) ->\n        called += 1\n\n      assert.equal called, 0\n\n  it \"should allow for stopping observation\", ->\n    observable = Observable(\"string\")\n\n    called = 0\n    fn = (newValue) ->\n      called += 1\n      assert.equal newValue, \"4life\"\n\n    observable.observe fn\n\n    observable(\"4life\")\n\n    observable.stopObserving fn\n\n    observable(\"wat\")\n\n    assert.equal called, 1\n\ndescribe \"Observable Array\", ->\n  it \"should proxy array methods\", ->\n    o = Observable [5]\n\n    o.map (n) ->\n      assert.equal n, 5\n\n  it \"should notify on mutation methods\", (done) ->\n    o = Observable []\n\n    o.observe (newValue) ->\n      assert.equal newValue[0], 1\n\n    o.push 1\n\n    done()\n\n  it \"should have an each method\", ->\n    o = Observable []\n\n    assert o.each\n\n  it \"#get\", ->\n    o = Observable [0, 1, 2, 3]\n\n    assert.equal o.get(2), 2\n\n  it \"#first\", ->\n    o = Observable [0, 1, 2, 3]\n\n    assert.equal o.first(), 0\n\n  it \"#last\", ->\n    o = Observable [0, 1, 2, 3]\n\n    assert.equal o.last(), 3\n\n  it \"#remove\", (done) ->\n    o = Observable [0, 1, 2, 3]\n\n    o.observe (newValue) ->\n      assert.equal newValue.length, 3\n      setTimeout ->\n        done()\n      , 0\n\n    assert.equal o.remove(2), 2\n\n  # TODO: This looks like it might be impossible\n  it \"should proxy the length property\"\n\ndescribe \"Observable functions\", ->\n  it \"should compute dependencies\", (done) ->\n    firstName = Observable \"Duder\"\n    lastName = Observable \"Man\"\n\n    o = Observable ->\n      \"#{firstName()} #{lastName()}\"\n\n    o.observe (newValue) ->\n      assert.equal newValue, \"Duder Bro\"\n\n      done()\n\n    lastName \"Bro\"\n\n  it \"should allow double nesting\", (done) ->\n    bottom = Observable \"rad\"\n    middle = Observable ->\n      bottom()\n    top = Observable ->\n      middle()\n\n    top.observe (newValue) ->\n      assert.equal newValue, \"wat\"\n      assert.equal top(), newValue\n      assert.equal middle(), newValue\n\n      done()\n\n    bottom(\"wat\")\n\n  it \"should have an each method\", ->\n    o = Observable ->\n\n    assert o.each\n\n  it \"should not invoke when returning undefined\", ->\n    o = Observable ->\n\n    o.each ->\n      assert false\n\n  it \"should invoke when returning any defined value\", (done) ->\n    o = Observable -> 5\n\n    o.each (n) ->\n      assert.equal n, 5\n      done()\n",
              "type": "blob"
            },
            "pixie.cson": {
              "path": "pixie.cson",
              "mode": "100644",
              "content": "version: \"0.1.0\"\n",
              "type": "blob"
            }
          },
          "distribution": {
            "main": {
              "path": "main",
              "content": "(function() {\n  var Observable, base, computeDependencies, extend, remove,\n    __slice = [].slice;\n\n  Observable = function(value) {\n    var changed, fn, listeners, notify, notifyReturning, self;\n    if (typeof (value != null ? value.observe : void 0) === \"function\") {\n      return value;\n    }\n    listeners = [];\n    notify = function(newValue) {\n      return listeners.forEach(function(listener) {\n        return listener(newValue);\n      });\n    };\n    if (typeof value === 'function') {\n      fn = value;\n      self = function() {\n        if (base) {\n          self.observe(base);\n        }\n        return value;\n      };\n      self.observe = function(listener) {\n        return listeners.push(listener);\n      };\n      changed = function() {\n        value = fn();\n        return notify(value);\n      };\n      value = computeDependencies(fn, changed);\n    } else {\n      self = function(newValue) {\n        if (arguments.length > 0) {\n          if (value !== newValue) {\n            value = newValue;\n            notify(newValue);\n          }\n        } else {\n          if (base) {\n            self.observe(base);\n          }\n        }\n        return value;\n      };\n      self.observe = function(listener) {\n        return listeners.push(listener);\n      };\n    }\n    self.each = function() {\n      var args, _ref;\n      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];\n      if (value != null) {\n        return (_ref = [value]).forEach.apply(_ref, args);\n      }\n    };\n    if (Array.isArray(value)) {\n      [\"concat\", \"every\", \"filter\", \"forEach\", \"indexOf\", \"join\", \"lastIndexOf\", \"map\", \"reduce\", \"reduceRight\", \"slice\", \"some\"].forEach(function(method) {\n        return self[method] = function() {\n          var args;\n          args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];\n          return value[method].apply(value, args);\n        };\n      });\n      [\"pop\", \"push\", \"reverse\", \"shift\", \"splice\", \"sort\", \"unshift\"].forEach(function(method) {\n        return self[method] = function() {\n          var args;\n          args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];\n          return notifyReturning(value[method].apply(value, args));\n        };\n      });\n      notifyReturning = function(returnValue) {\n        notify(value);\n        return returnValue;\n      };\n      extend(self, {\n        each: function() {\n          var args;\n          args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];\n          self.forEach.apply(self, args);\n          return self;\n        },\n        remove: function(object) {\n          var index;\n          index = value.indexOf(object);\n          if (index >= 0) {\n            return notifyReturning(value.splice(index, 1)[0]);\n          }\n        },\n        get: function(index) {\n          return value[index];\n        },\n        first: function() {\n          return value[0];\n        },\n        last: function() {\n          return value[value.length - 1];\n        }\n      });\n    }\n    self.stopObserving = function(fn) {\n      return remove(listeners, fn);\n    };\n    return self;\n  };\n\n  module.exports = Observable;\n\n  extend = function() {\n    var name, source, sources, target, _i, _len;\n    target = arguments[0], sources = 2 <= arguments.length ? __slice.call(arguments, 1) : [];\n    for (_i = 0, _len = sources.length; _i < _len; _i++) {\n      source = sources[_i];\n      for (name in source) {\n        target[name] = source[name];\n      }\n    }\n    return target;\n  };\n\n  base = void 0;\n\n  computeDependencies = function(fn, root) {\n    var value;\n    base = root;\n    value = fn();\n    base = void 0;\n    return value;\n  };\n\n  remove = function(array, value) {\n    var index;\n    index = array.indexOf(value);\n    if (index >= 0) {\n      return array.splice(index, 1)[0];\n    }\n  };\n\n}).call(this);\n\n//# sourceURL=main.coffee",
              "type": "blob"
            },
            "test/observable": {
              "path": "test/observable",
              "content": "(function() {\n  var Observable;\n\n  Observable = require(\"../main\");\n\n  describe('Observable', function() {\n    it('should create an observable for an object', function() {\n      var n, observable;\n      n = 5;\n      observable = Observable(n);\n      return assert.equal(observable(), n);\n    });\n    it('should fire events when setting', function() {\n      var observable, string;\n      string = \"yolo\";\n      observable = Observable(string);\n      observable.observe(function(newValue) {\n        return assert.equal(newValue, \"4life\");\n      });\n      return observable(\"4life\");\n    });\n    it('should be idempotent', function() {\n      var o;\n      o = Observable(5);\n      return assert.equal(o, Observable(o));\n    });\n    describe(\"#each\", function() {\n      it(\"should be invoked once if there is an observable\", function() {\n        var called, o;\n        o = Observable(5);\n        called = 0;\n        o.each(function(value) {\n          called += 1;\n          return assert.equal(value, 5);\n        });\n        return assert.equal(called, 1);\n      });\n      return it(\"should not be invoked if observable is null\", function() {\n        var called, o;\n        o = Observable(null);\n        called = 0;\n        o.each(function(value) {\n          return called += 1;\n        });\n        return assert.equal(called, 0);\n      });\n    });\n    return it(\"should allow for stopping observation\", function() {\n      var called, fn, observable;\n      observable = Observable(\"string\");\n      called = 0;\n      fn = function(newValue) {\n        called += 1;\n        return assert.equal(newValue, \"4life\");\n      };\n      observable.observe(fn);\n      observable(\"4life\");\n      observable.stopObserving(fn);\n      observable(\"wat\");\n      return assert.equal(called, 1);\n    });\n  });\n\n  describe(\"Observable Array\", function() {\n    it(\"should proxy array methods\", function() {\n      var o;\n      o = Observable([5]);\n      return o.map(function(n) {\n        return assert.equal(n, 5);\n      });\n    });\n    it(\"should notify on mutation methods\", function(done) {\n      var o;\n      o = Observable([]);\n      o.observe(function(newValue) {\n        return assert.equal(newValue[0], 1);\n      });\n      o.push(1);\n      return done();\n    });\n    it(\"should have an each method\", function() {\n      var o;\n      o = Observable([]);\n      return assert(o.each);\n    });\n    it(\"#get\", function() {\n      var o;\n      o = Observable([0, 1, 2, 3]);\n      return assert.equal(o.get(2), 2);\n    });\n    it(\"#first\", function() {\n      var o;\n      o = Observable([0, 1, 2, 3]);\n      return assert.equal(o.first(), 0);\n    });\n    it(\"#last\", function() {\n      var o;\n      o = Observable([0, 1, 2, 3]);\n      return assert.equal(o.last(), 3);\n    });\n    it(\"#remove\", function(done) {\n      var o;\n      o = Observable([0, 1, 2, 3]);\n      o.observe(function(newValue) {\n        assert.equal(newValue.length, 3);\n        return setTimeout(function() {\n          return done();\n        }, 0);\n      });\n      return assert.equal(o.remove(2), 2);\n    });\n    return it(\"should proxy the length property\");\n  });\n\n  describe(\"Observable functions\", function() {\n    it(\"should compute dependencies\", function(done) {\n      var firstName, lastName, o;\n      firstName = Observable(\"Duder\");\n      lastName = Observable(\"Man\");\n      o = Observable(function() {\n        return \"\" + (firstName()) + \" \" + (lastName());\n      });\n      o.observe(function(newValue) {\n        assert.equal(newValue, \"Duder Bro\");\n        return done();\n      });\n      return lastName(\"Bro\");\n    });\n    it(\"should allow double nesting\", function(done) {\n      var bottom, middle, top;\n      bottom = Observable(\"rad\");\n      middle = Observable(function() {\n        return bottom();\n      });\n      top = Observable(function() {\n        return middle();\n      });\n      top.observe(function(newValue) {\n        assert.equal(newValue, \"wat\");\n        assert.equal(top(), newValue);\n        assert.equal(middle(), newValue);\n        return done();\n      });\n      return bottom(\"wat\");\n    });\n    it(\"should have an each method\", function() {\n      var o;\n      o = Observable(function() {});\n      return assert(o.each);\n    });\n    it(\"should not invoke when returning undefined\", function() {\n      var o;\n      o = Observable(function() {});\n      return o.each(function() {\n        return assert(false);\n      });\n    });\n    return it(\"should invoke when returning any defined value\", function(done) {\n      var o;\n      o = Observable(function() {\n        return 5;\n      });\n      return o.each(function(n) {\n        assert.equal(n, 5);\n        return done();\n      });\n    });\n  });\n\n}).call(this);\n\n//# sourceURL=test/observable.coffee",
              "type": "blob"
            },
            "pixie": {
              "path": "pixie",
              "content": "module.exports = {\"version\":\"0.1.0\"};",
              "type": "blob"
            }
          },
          "progenitor": {
            "url": "http://strd6.github.io/editor/"
          },
          "version": "0.1.0",
          "entryPoint": "main",
          "repository": {
            "id": 17119562,
            "name": "observable",
            "full_name": "distri/observable",
            "owner": {
              "login": "distri",
              "id": 6005125,
              "avatar_url": "https://identicons.github.com/f90c81ffc1498e260c820082f2e7ca5f.png",
              "gravatar_id": null,
              "url": "https://api.github.com/users/distri",
              "html_url": "https://github.com/distri",
              "followers_url": "https://api.github.com/users/distri/followers",
              "following_url": "https://api.github.com/users/distri/following{/other_user}",
              "gists_url": "https://api.github.com/users/distri/gists{/gist_id}",
              "starred_url": "https://api.github.com/users/distri/starred{/owner}{/repo}",
              "subscriptions_url": "https://api.github.com/users/distri/subscriptions",
              "organizations_url": "https://api.github.com/users/distri/orgs",
              "repos_url": "https://api.github.com/users/distri/repos",
              "events_url": "https://api.github.com/users/distri/events{/privacy}",
              "received_events_url": "https://api.github.com/users/distri/received_events",
              "type": "Organization",
              "site_admin": false
            },
            "private": false,
            "html_url": "https://github.com/distri/observable",
            "description": "",
            "fork": false,
            "url": "https://api.github.com/repos/distri/observable",
            "forks_url": "https://api.github.com/repos/distri/observable/forks",
            "keys_url": "https://api.github.com/repos/distri/observable/keys{/key_id}",
            "collaborators_url": "https://api.github.com/repos/distri/observable/collaborators{/collaborator}",
            "teams_url": "https://api.github.com/repos/distri/observable/teams",
            "hooks_url": "https://api.github.com/repos/distri/observable/hooks",
            "issue_events_url": "https://api.github.com/repos/distri/observable/issues/events{/number}",
            "events_url": "https://api.github.com/repos/distri/observable/events",
            "assignees_url": "https://api.github.com/repos/distri/observable/assignees{/user}",
            "branches_url": "https://api.github.com/repos/distri/observable/branches{/branch}",
            "tags_url": "https://api.github.com/repos/distri/observable/tags",
            "blobs_url": "https://api.github.com/repos/distri/observable/git/blobs{/sha}",
            "git_tags_url": "https://api.github.com/repos/distri/observable/git/tags{/sha}",
            "git_refs_url": "https://api.github.com/repos/distri/observable/git/refs{/sha}",
            "trees_url": "https://api.github.com/repos/distri/observable/git/trees{/sha}",
            "statuses_url": "https://api.github.com/repos/distri/observable/statuses/{sha}",
            "languages_url": "https://api.github.com/repos/distri/observable/languages",
            "stargazers_url": "https://api.github.com/repos/distri/observable/stargazers",
            "contributors_url": "https://api.github.com/repos/distri/observable/contributors",
            "subscribers_url": "https://api.github.com/repos/distri/observable/subscribers",
            "subscription_url": "https://api.github.com/repos/distri/observable/subscription",
            "commits_url": "https://api.github.com/repos/distri/observable/commits{/sha}",
            "git_commits_url": "https://api.github.com/repos/distri/observable/git/commits{/sha}",
            "comments_url": "https://api.github.com/repos/distri/observable/comments{/number}",
            "issue_comment_url": "https://api.github.com/repos/distri/observable/issues/comments/{number}",
            "contents_url": "https://api.github.com/repos/distri/observable/contents/{+path}",
            "compare_url": "https://api.github.com/repos/distri/observable/compare/{base}...{head}",
            "merges_url": "https://api.github.com/repos/distri/observable/merges",
            "archive_url": "https://api.github.com/repos/distri/observable/{archive_format}{/ref}",
            "downloads_url": "https://api.github.com/repos/distri/observable/downloads",
            "issues_url": "https://api.github.com/repos/distri/observable/issues{/number}",
            "pulls_url": "https://api.github.com/repos/distri/observable/pulls{/number}",
            "milestones_url": "https://api.github.com/repos/distri/observable/milestones{/number}",
            "notifications_url": "https://api.github.com/repos/distri/observable/notifications{?since,all,participating}",
            "labels_url": "https://api.github.com/repos/distri/observable/labels{/name}",
            "releases_url": "https://api.github.com/repos/distri/observable/releases{/id}",
            "created_at": "2014-02-23T23:17:52Z",
            "updated_at": "2014-02-23T23:17:52Z",
            "pushed_at": "2014-02-23T23:17:52Z",
            "git_url": "git://github.com/distri/observable.git",
            "ssh_url": "git@github.com:distri/observable.git",
            "clone_url": "https://github.com/distri/observable.git",
            "svn_url": "https://github.com/distri/observable",
            "homepage": null,
            "size": 0,
            "stargazers_count": 0,
            "watchers_count": 0,
            "language": null,
            "has_issues": true,
            "has_downloads": true,
            "has_wiki": true,
            "forks_count": 0,
            "mirror_url": null,
            "open_issues_count": 0,
            "forks": 0,
            "open_issues": 0,
            "watchers": 0,
            "default_branch": "master",
            "master_branch": "master",
            "permissions": {
              "admin": true,
              "push": true,
              "pull": true
            },
            "organization": {
              "login": "distri",
              "id": 6005125,
              "avatar_url": "https://identicons.github.com/f90c81ffc1498e260c820082f2e7ca5f.png",
              "gravatar_id": null,
              "url": "https://api.github.com/users/distri",
              "html_url": "https://github.com/distri",
              "followers_url": "https://api.github.com/users/distri/followers",
              "following_url": "https://api.github.com/users/distri/following{/other_user}",
              "gists_url": "https://api.github.com/users/distri/gists{/gist_id}",
              "starred_url": "https://api.github.com/users/distri/starred{/owner}{/repo}",
              "subscriptions_url": "https://api.github.com/users/distri/subscriptions",
              "organizations_url": "https://api.github.com/users/distri/orgs",
              "repos_url": "https://api.github.com/users/distri/repos",
              "events_url": "https://api.github.com/users/distri/events{/privacy}",
              "received_events_url": "https://api.github.com/users/distri/received_events",
              "type": "Organization",
              "site_admin": false
            },
            "network_count": 0,
            "subscribers_count": 2,
            "branch": "v0.1.0",
            "defaultBranch": "master"
          },
          "dependencies": {}
        }
      }
    },
    "cornerstone": {
      "source": {
        "LICENSE": {
          "path": "LICENSE",
          "mode": "100644",
          "content": "The MIT License (MIT)\n\nCopyright (c) 2013 Daniel X Moore\n\nPermission is hereby granted, free of charge, to any person obtaining a copy of\nthis software and associated documentation files (the \"Software\"), to deal in\nthe Software without restriction, including without limitation the rights to\nuse, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of\nthe Software, and to permit persons to whom the Software is furnished to do so,\nsubject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS\nFOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR\nCOPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER\nIN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN\nCONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\n",
          "type": "blob"
        },
        "README.md": {
          "path": "README.md",
          "mode": "100644",
          "content": "cornerstone\n===========\n\nCore JavaScript Extensions.\n",
          "type": "blob"
        },
        "cornerstone.coffee.md": {
          "path": "cornerstone.coffee.md",
          "mode": "100644",
          "content": "Cornerstone\n===========\n\nRequire and pollute.\n\n    require \"extensions\"\n\n    global.Core = require(\"core\")\n\n    require(\"math\").pollute()\n",
          "type": "blob"
        },
        "pixie.cson": {
          "path": "pixie.cson",
          "mode": "100644",
          "content": "version: \"0.2.0\"\nentryPoint: \"cornerstone\"\ndependencies:\n  math: \"distri/math:v0.2.0\"\n  extensions: \"distri/extensions:v0.2.0\"\n  core: \"distri/core:v0.6.0\"\n",
          "type": "blob"
        },
        "test/cornerstone.coffee": {
          "path": "test/cornerstone.coffee",
          "mode": "100644",
          "content": "require \"../cornerstone\"\n\ndescribe \"Cornerstone\", ->\n  it \"should provide Core\", ->\n    assert Core\n\n  it \"should provide Matrix\", ->\n    assert Matrix\n\n  it \"should provide Point\", ->\n    assert Point\n\n  it \"should provide Random\", ->\n    assert Random\n\n  it \"should provide rand\", ->\n    assert rand\n\n  it \"should provide Function#debounce\", ->\n    assert (->).debounce\n",
          "type": "blob"
        }
      },
      "distribution": {
        "cornerstone": {
          "path": "cornerstone",
          "content": "(function() {\n  require(\"extensions\");\n\n  global.Core = require(\"core\");\n\n  require(\"math\").pollute();\n\n}).call(this);\n\n//# sourceURL=cornerstone.coffee",
          "type": "blob"
        },
        "pixie": {
          "path": "pixie",
          "content": "module.exports = {\"version\":\"0.2.0\",\"entryPoint\":\"cornerstone\",\"dependencies\":{\"math\":\"distri/math:v0.2.0\",\"extensions\":\"distri/extensions:v0.2.0\",\"core\":\"distri/core:v0.6.0\"}};",
          "type": "blob"
        },
        "test/cornerstone": {
          "path": "test/cornerstone",
          "content": "(function() {\n  require(\"../cornerstone\");\n\n  describe(\"Cornerstone\", function() {\n    it(\"should provide Core\", function() {\n      return assert(Core);\n    });\n    it(\"should provide Matrix\", function() {\n      return assert(Matrix);\n    });\n    it(\"should provide Point\", function() {\n      return assert(Point);\n    });\n    it(\"should provide Random\", function() {\n      return assert(Random);\n    });\n    it(\"should provide rand\", function() {\n      return assert(rand);\n    });\n    return it(\"should provide Function#debounce\", function() {\n      return assert((function() {}).debounce);\n    });\n  });\n\n}).call(this);\n\n//# sourceURL=test/cornerstone.coffee",
          "type": "blob"
        }
      },
      "progenitor": {
        "url": "http://strd6.github.io/editor/"
      },
      "version": "0.2.0",
      "entryPoint": "cornerstone",
      "repository": {
        "id": 13576225,
        "name": "cornerstone",
        "full_name": "distri/cornerstone",
        "owner": {
          "login": "distri",
          "id": 6005125,
          "avatar_url": "https://identicons.github.com/f90c81ffc1498e260c820082f2e7ca5f.png",
          "gravatar_id": null,
          "url": "https://api.github.com/users/distri",
          "html_url": "https://github.com/distri",
          "followers_url": "https://api.github.com/users/distri/followers",
          "following_url": "https://api.github.com/users/distri/following{/other_user}",
          "gists_url": "https://api.github.com/users/distri/gists{/gist_id}",
          "starred_url": "https://api.github.com/users/distri/starred{/owner}{/repo}",
          "subscriptions_url": "https://api.github.com/users/distri/subscriptions",
          "organizations_url": "https://api.github.com/users/distri/orgs",
          "repos_url": "https://api.github.com/users/distri/repos",
          "events_url": "https://api.github.com/users/distri/events{/privacy}",
          "received_events_url": "https://api.github.com/users/distri/received_events",
          "type": "Organization",
          "site_admin": false
        },
        "private": false,
        "html_url": "https://github.com/distri/cornerstone",
        "description": "Core JavaScript Extensions.",
        "fork": false,
        "url": "https://api.github.com/repos/distri/cornerstone",
        "forks_url": "https://api.github.com/repos/distri/cornerstone/forks",
        "keys_url": "https://api.github.com/repos/distri/cornerstone/keys{/key_id}",
        "collaborators_url": "https://api.github.com/repos/distri/cornerstone/collaborators{/collaborator}",
        "teams_url": "https://api.github.com/repos/distri/cornerstone/teams",
        "hooks_url": "https://api.github.com/repos/distri/cornerstone/hooks",
        "issue_events_url": "https://api.github.com/repos/distri/cornerstone/issues/events{/number}",
        "events_url": "https://api.github.com/repos/distri/cornerstone/events",
        "assignees_url": "https://api.github.com/repos/distri/cornerstone/assignees{/user}",
        "branches_url": "https://api.github.com/repos/distri/cornerstone/branches{/branch}",
        "tags_url": "https://api.github.com/repos/distri/cornerstone/tags",
        "blobs_url": "https://api.github.com/repos/distri/cornerstone/git/blobs{/sha}",
        "git_tags_url": "https://api.github.com/repos/distri/cornerstone/git/tags{/sha}",
        "git_refs_url": "https://api.github.com/repos/distri/cornerstone/git/refs{/sha}",
        "trees_url": "https://api.github.com/repos/distri/cornerstone/git/trees{/sha}",
        "statuses_url": "https://api.github.com/repos/distri/cornerstone/statuses/{sha}",
        "languages_url": "https://api.github.com/repos/distri/cornerstone/languages",
        "stargazers_url": "https://api.github.com/repos/distri/cornerstone/stargazers",
        "contributors_url": "https://api.github.com/repos/distri/cornerstone/contributors",
        "subscribers_url": "https://api.github.com/repos/distri/cornerstone/subscribers",
        "subscription_url": "https://api.github.com/repos/distri/cornerstone/subscription",
        "commits_url": "https://api.github.com/repos/distri/cornerstone/commits{/sha}",
        "git_commits_url": "https://api.github.com/repos/distri/cornerstone/git/commits{/sha}",
        "comments_url": "https://api.github.com/repos/distri/cornerstone/comments{/number}",
        "issue_comment_url": "https://api.github.com/repos/distri/cornerstone/issues/comments/{number}",
        "contents_url": "https://api.github.com/repos/distri/cornerstone/contents/{+path}",
        "compare_url": "https://api.github.com/repos/distri/cornerstone/compare/{base}...{head}",
        "merges_url": "https://api.github.com/repos/distri/cornerstone/merges",
        "archive_url": "https://api.github.com/repos/distri/cornerstone/{archive_format}{/ref}",
        "downloads_url": "https://api.github.com/repos/distri/cornerstone/downloads",
        "issues_url": "https://api.github.com/repos/distri/cornerstone/issues{/number}",
        "pulls_url": "https://api.github.com/repos/distri/cornerstone/pulls{/number}",
        "milestones_url": "https://api.github.com/repos/distri/cornerstone/milestones{/number}",
        "notifications_url": "https://api.github.com/repos/distri/cornerstone/notifications{?since,all,participating}",
        "labels_url": "https://api.github.com/repos/distri/cornerstone/labels{/name}",
        "releases_url": "https://api.github.com/repos/distri/cornerstone/releases{/id}",
        "created_at": "2013-10-14T23:43:38Z",
        "updated_at": "2013-12-24T01:09:50Z",
        "pushed_at": "2013-12-24T01:09:50Z",
        "git_url": "git://github.com/distri/cornerstone.git",
        "ssh_url": "git@github.com:distri/cornerstone.git",
        "clone_url": "https://github.com/distri/cornerstone.git",
        "svn_url": "https://github.com/distri/cornerstone",
        "homepage": null,
        "size": 504,
        "stargazers_count": 0,
        "watchers_count": 0,
        "language": "CoffeeScript",
        "has_issues": true,
        "has_downloads": true,
        "has_wiki": true,
        "forks_count": 0,
        "mirror_url": null,
        "open_issues_count": 0,
        "forks": 0,
        "open_issues": 0,
        "watchers": 0,
        "default_branch": "master",
        "master_branch": "master",
        "permissions": {
          "admin": true,
          "push": true,
          "pull": true
        },
        "organization": {
          "login": "distri",
          "id": 6005125,
          "avatar_url": "https://identicons.github.com/f90c81ffc1498e260c820082f2e7ca5f.png",
          "gravatar_id": null,
          "url": "https://api.github.com/users/distri",
          "html_url": "https://github.com/distri",
          "followers_url": "https://api.github.com/users/distri/followers",
          "following_url": "https://api.github.com/users/distri/following{/other_user}",
          "gists_url": "https://api.github.com/users/distri/gists{/gist_id}",
          "starred_url": "https://api.github.com/users/distri/starred{/owner}{/repo}",
          "subscriptions_url": "https://api.github.com/users/distri/subscriptions",
          "organizations_url": "https://api.github.com/users/distri/orgs",
          "repos_url": "https://api.github.com/users/distri/repos",
          "events_url": "https://api.github.com/users/distri/events{/privacy}",
          "received_events_url": "https://api.github.com/users/distri/received_events",
          "type": "Organization",
          "site_admin": false
        },
        "network_count": 0,
        "subscribers_count": 1,
        "branch": "v0.2.0",
        "defaultBranch": "master"
      },
      "dependencies": {
        "math": {
          "source": {
            "LICENSE": {
              "path": "LICENSE",
              "mode": "100644",
              "content": "The MIT License (MIT)\n\nCopyright (c) 2013 Daniel X Moore\n\nPermission is hereby granted, free of charge, to any person obtaining a copy of\nthis software and associated documentation files (the \"Software\"), to deal in\nthe Software without restriction, including without limitation the rights to\nuse, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of\nthe Software, and to permit persons to whom the Software is furnished to do so,\nsubject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS\nFOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR\nCOPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER\nIN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN\nCONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\n",
              "type": "blob"
            },
            "README.md": {
              "path": "README.md",
              "mode": "100644",
              "content": "math\n====\n\nMath is for cool guys.\n",
              "type": "blob"
            },
            "math.coffee.md": {
              "path": "math.coffee.md",
              "mode": "100644",
              "content": "Math\n====\n\nRequire and export many math libraries.\n\n    Point = require \"point\"\n\n    Matrix = require \"matrix\"\n    Matrix.Point = Point\n\n    Random = require \"random\"\n\n    module.exports = self =\n      Point: Point\n      Matrix: Matrix\n      Random: Random\n      rand: Random.rand\n\nPollute all libraries to the global namespace.\n\n      pollute: ->\n        Object.keys(self).forEach (key) ->\n          return if key is \"version\"\n          return if key is \"pollute\"\n\n          global[key] = self[key]\n\n        return self\n",
              "type": "blob"
            },
            "pixie.cson": {
              "path": "pixie.cson",
              "mode": "100644",
              "content": "entryPoint: \"math\"\nversion: \"0.2.0\"\ndependencies:\n  point: \"distri/point:v0.2.0\"\n  matrix: \"distri/matrix:v0.3.1\"\n  random: \"distri/random:v0.2.0\"\n",
              "type": "blob"
            },
            "test/math.coffee": {
              "path": "test/math.coffee",
              "mode": "100644",
              "content": "require(\"../math\").pollute()\n\nconsole.log global\n\ndescribe \"Point\", ->\n  it \"should exist\", ->\n    assert Point\n\n  it \"should construct points\", ->\n    assert Point()\n\ndescribe \"Matrix\", ->\n  it \"should exist and return matrices when invoked\", ->\n    assert Matrix\n\n    assert Matrix()\n\n  it \"should use the same `Point` class\", ->\n    assert Matrix.Point is Point\n\n    assert Matrix().transformPoint(Point()) instanceof Point\n\ndescribe \"Random\", ->\n  it \"should exist\", ->\n    assert Random\n\ndescribe \"rand\", ->\n  it \"should exist\", ->\n    assert rand\n\n    assert rand()?\n",
              "type": "blob"
            }
          },
          "distribution": {
            "math": {
              "path": "math",
              "content": "(function() {\n  var Matrix, Point, Random, self;\n\n  Point = require(\"point\");\n\n  Matrix = require(\"matrix\");\n\n  Matrix.Point = Point;\n\n  Random = require(\"random\");\n\n  module.exports = self = {\n    Point: Point,\n    Matrix: Matrix,\n    Random: Random,\n    rand: Random.rand,\n    pollute: function() {\n      Object.keys(self).forEach(function(key) {\n        if (key === \"version\") {\n          return;\n        }\n        if (key === \"pollute\") {\n          return;\n        }\n        return global[key] = self[key];\n      });\n      return self;\n    }\n  };\n\n}).call(this);\n\n//# sourceURL=math.coffee",
              "type": "blob"
            },
            "pixie": {
              "path": "pixie",
              "content": "module.exports = {\"entryPoint\":\"math\",\"version\":\"0.2.0\",\"dependencies\":{\"point\":\"distri/point:v0.2.0\",\"matrix\":\"distri/matrix:v0.3.1\",\"random\":\"distri/random:v0.2.0\"}};",
              "type": "blob"
            },
            "test/math": {
              "path": "test/math",
              "content": "(function() {\n  require(\"../math\").pollute();\n\n  console.log(global);\n\n  describe(\"Point\", function() {\n    it(\"should exist\", function() {\n      return assert(Point);\n    });\n    return it(\"should construct points\", function() {\n      return assert(Point());\n    });\n  });\n\n  describe(\"Matrix\", function() {\n    it(\"should exist and return matrices when invoked\", function() {\n      assert(Matrix);\n      return assert(Matrix());\n    });\n    return it(\"should use the same `Point` class\", function() {\n      assert(Matrix.Point === Point);\n      return assert(Matrix().transformPoint(Point()) instanceof Point);\n    });\n  });\n\n  describe(\"Random\", function() {\n    return it(\"should exist\", function() {\n      return assert(Random);\n    });\n  });\n\n  describe(\"rand\", function() {\n    return it(\"should exist\", function() {\n      assert(rand);\n      return assert(rand() != null);\n    });\n  });\n\n}).call(this);\n\n//# sourceURL=test/math.coffee",
              "type": "blob"
            }
          },
          "progenitor": {
            "url": "http://strd6.github.io/editor/"
          },
          "version": "0.2.0",
          "entryPoint": "math",
          "repository": {
            "id": 13576636,
            "name": "math",
            "full_name": "distri/math",
            "owner": {
              "login": "distri",
              "id": 6005125,
              "avatar_url": "https://identicons.github.com/f90c81ffc1498e260c820082f2e7ca5f.png",
              "gravatar_id": null,
              "url": "https://api.github.com/users/distri",
              "html_url": "https://github.com/distri",
              "followers_url": "https://api.github.com/users/distri/followers",
              "following_url": "https://api.github.com/users/distri/following{/other_user}",
              "gists_url": "https://api.github.com/users/distri/gists{/gist_id}",
              "starred_url": "https://api.github.com/users/distri/starred{/owner}{/repo}",
              "subscriptions_url": "https://api.github.com/users/distri/subscriptions",
              "organizations_url": "https://api.github.com/users/distri/orgs",
              "repos_url": "https://api.github.com/users/distri/repos",
              "events_url": "https://api.github.com/users/distri/events{/privacy}",
              "received_events_url": "https://api.github.com/users/distri/received_events",
              "type": "Organization",
              "site_admin": false
            },
            "private": false,
            "html_url": "https://github.com/distri/math",
            "description": "Math is for cool guys.",
            "fork": false,
            "url": "https://api.github.com/repos/distri/math",
            "forks_url": "https://api.github.com/repos/distri/math/forks",
            "keys_url": "https://api.github.com/repos/distri/math/keys{/key_id}",
            "collaborators_url": "https://api.github.com/repos/distri/math/collaborators{/collaborator}",
            "teams_url": "https://api.github.com/repos/distri/math/teams",
            "hooks_url": "https://api.github.com/repos/distri/math/hooks",
            "issue_events_url": "https://api.github.com/repos/distri/math/issues/events{/number}",
            "events_url": "https://api.github.com/repos/distri/math/events",
            "assignees_url": "https://api.github.com/repos/distri/math/assignees{/user}",
            "branches_url": "https://api.github.com/repos/distri/math/branches{/branch}",
            "tags_url": "https://api.github.com/repos/distri/math/tags",
            "blobs_url": "https://api.github.com/repos/distri/math/git/blobs{/sha}",
            "git_tags_url": "https://api.github.com/repos/distri/math/git/tags{/sha}",
            "git_refs_url": "https://api.github.com/repos/distri/math/git/refs{/sha}",
            "trees_url": "https://api.github.com/repos/distri/math/git/trees{/sha}",
            "statuses_url": "https://api.github.com/repos/distri/math/statuses/{sha}",
            "languages_url": "https://api.github.com/repos/distri/math/languages",
            "stargazers_url": "https://api.github.com/repos/distri/math/stargazers",
            "contributors_url": "https://api.github.com/repos/distri/math/contributors",
            "subscribers_url": "https://api.github.com/repos/distri/math/subscribers",
            "subscription_url": "https://api.github.com/repos/distri/math/subscription",
            "commits_url": "https://api.github.com/repos/distri/math/commits{/sha}",
            "git_commits_url": "https://api.github.com/repos/distri/math/git/commits{/sha}",
            "comments_url": "https://api.github.com/repos/distri/math/comments{/number}",
            "issue_comment_url": "https://api.github.com/repos/distri/math/issues/comments/{number}",
            "contents_url": "https://api.github.com/repos/distri/math/contents/{+path}",
            "compare_url": "https://api.github.com/repos/distri/math/compare/{base}...{head}",
            "merges_url": "https://api.github.com/repos/distri/math/merges",
            "archive_url": "https://api.github.com/repos/distri/math/{archive_format}{/ref}",
            "downloads_url": "https://api.github.com/repos/distri/math/downloads",
            "issues_url": "https://api.github.com/repos/distri/math/issues{/number}",
            "pulls_url": "https://api.github.com/repos/distri/math/pulls{/number}",
            "milestones_url": "https://api.github.com/repos/distri/math/milestones{/number}",
            "notifications_url": "https://api.github.com/repos/distri/math/notifications{?since,all,participating}",
            "labels_url": "https://api.github.com/repos/distri/math/labels{/name}",
            "releases_url": "https://api.github.com/repos/distri/math/releases{/id}",
            "created_at": "2013-10-15T00:13:24Z",
            "updated_at": "2013-12-23T23:29:58Z",
            "pushed_at": "2013-10-15T18:45:48Z",
            "git_url": "git://github.com/distri/math.git",
            "ssh_url": "git@github.com:distri/math.git",
            "clone_url": "https://github.com/distri/math.git",
            "svn_url": "https://github.com/distri/math",
            "homepage": null,
            "size": 364,
            "stargazers_count": 0,
            "watchers_count": 0,
            "language": "CoffeeScript",
            "has_issues": true,
            "has_downloads": true,
            "has_wiki": true,
            "forks_count": 0,
            "mirror_url": null,
            "open_issues_count": 0,
            "forks": 0,
            "open_issues": 0,
            "watchers": 0,
            "default_branch": "master",
            "master_branch": "master",
            "permissions": {
              "admin": true,
              "push": true,
              "pull": true
            },
            "organization": {
              "login": "distri",
              "id": 6005125,
              "avatar_url": "https://identicons.github.com/f90c81ffc1498e260c820082f2e7ca5f.png",
              "gravatar_id": null,
              "url": "https://api.github.com/users/distri",
              "html_url": "https://github.com/distri",
              "followers_url": "https://api.github.com/users/distri/followers",
              "following_url": "https://api.github.com/users/distri/following{/other_user}",
              "gists_url": "https://api.github.com/users/distri/gists{/gist_id}",
              "starred_url": "https://api.github.com/users/distri/starred{/owner}{/repo}",
              "subscriptions_url": "https://api.github.com/users/distri/subscriptions",
              "organizations_url": "https://api.github.com/users/distri/orgs",
              "repos_url": "https://api.github.com/users/distri/repos",
              "events_url": "https://api.github.com/users/distri/events{/privacy}",
              "received_events_url": "https://api.github.com/users/distri/received_events",
              "type": "Organization",
              "site_admin": false
            },
            "network_count": 0,
            "subscribers_count": 1,
            "branch": "v0.2.0",
            "defaultBranch": "master"
          },
          "dependencies": {
            "point": {
              "source": {
                "LICENSE": {
                  "path": "LICENSE",
                  "mode": "100644",
                  "content": "The MIT License (MIT)\n\nCopyright (c) 2013 Daniel X Moore\n\nPermission is hereby granted, free of charge, to any person obtaining a copy of\nthis software and associated documentation files (the \"Software\"), to deal in\nthe Software without restriction, including without limitation the rights to\nuse, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of\nthe Software, and to permit persons to whom the Software is furnished to do so,\nsubject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS\nFOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR\nCOPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER\nIN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN\nCONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\n",
                  "type": "blob"
                },
                "README.md": {
                  "path": "README.md",
                  "mode": "100644",
                  "content": "point\n=====\n\nJavaScript Point implementation\n",
                  "type": "blob"
                },
                "interactive_runtime.coffee.md": {
                  "path": "interactive_runtime.coffee.md",
                  "mode": "100644",
                  "content": "Interactive Runtime\n-------------------\n\n    window.Point = require(\"./point\")\n\nRegister our example runner.\n\n    Interactive.register \"example\", ({source, runtimeElement}) ->\n      program = CoffeeScript.compile(source, bare: true)\n\n      outputElement = document.createElement \"pre\"\n      runtimeElement.empty().append outputElement\n\n      result = eval(program)\n\n      if typeof result is \"number\"\n        if result != (0 | result)\n          result = result.toFixed(4)\n    \n\n      outputElement.textContent = result\n",
                  "type": "blob"
                },
                "pixie.cson": {
                  "path": "pixie.cson",
                  "mode": "100644",
                  "content": "version: \"0.2.0\"\nentryPoint: \"point\"\n",
                  "type": "blob"
                },
                "point.coffee.md": {
                  "path": "point.coffee.md",
                  "mode": "100644",
                  "content": "\nCreate a new point with given x and y coordinates. If no arguments are given\ndefaults to (0, 0).\n\n>     #! example\n>     Point()\n\n----\n\n>     #! example\n>     Point(-2, 5)\n\n----\n\n    Point = (x, y) ->\n      if isObject(x)\n        {x, y} = x\n\n      __proto__: Point.prototype\n      x: x ? 0\n      y: y ? 0\n\nPoint protoype methods.\n\n    Point:: =\n\nConstrain the magnitude of a vector.\n\n      clamp: (n) ->\n        if @magnitude() > n\n          @norm(n)\n        else\n          @copy()\n\nCreates a copy of this point.\n\n      copy: ->\n        Point(@x, @y)\n\n>     #! example\n>     Point(1, 1).copy()\n\n----\n\nAdds a point to this one and returns the new point. You may\nalso use a two argument call like `point.add(x, y)`\nto add x and y values without a second point object.\n\n      add: (first, second) ->\n        if second?\n          Point(\n            @x + first\n            @y + second\n          )\n        else\n          Point(\n            @x + first.x,\n            @y + first.y\n          )\n\n>     #! example\n>     Point(2, 3).add(Point(3, 4))\n\n----\n\nSubtracts a point to this one and returns the new point.\n\n      subtract: (first, second) ->\n        if second?\n          Point(\n            @x - first,\n            @y - second\n          )\n        else\n          @add(first.scale(-1))\n\n>     #! example\n>     Point(1, 2).subtract(Point(2, 0))\n\n----\n\nScale this Point (Vector) by a constant amount.\n\n      scale: (scalar) ->\n        Point(\n          @x * scalar,\n          @y * scalar\n        )\n\n>     #! example\n>     point = Point(5, 6).scale(2)\n\n----\n\nThe `norm` of a vector is the unit vector pointing in the same direction. This method\ntreats the point as though it is a vector from the origin to (x, y).\n\n      norm: (length=1.0) ->\n        if m = @length()\n          @scale(length/m)\n        else\n          @copy()\n\n>     #! example\n>     point = Point(2, 3).norm()\n\n----\n\nDetermine whether this `Point` is equal to another `Point`. Returns `true` if\nthey are equal and `false` otherwise.\n\n      equal: (other) ->\n        @x == other.x && @y == other.y\n\n>     #! example\n>     point = Point(2, 3)\n>\n>     point.equal(Point(2, 3))\n\n----\n\nComputed the length of this point as though it were a vector from (0,0) to (x,y).\n\n      length: ->\n        Math.sqrt(@dot(this))\n\n>     #! example\n>     Point(5, 7).length()\n\n----\n\nCalculate the magnitude of this Point (Vector).\n\n      magnitude: ->\n        @length()\n\n>     #! example\n>     Point(5, 7).magnitude()\n\n----\n\nReturns the direction in radians of this point from the origin.\n\n      direction: ->\n        Math.atan2(@y, @x)\n\n>     #! example\n>     point = Point(0, 1)\n>\n>     point.direction()\n\n----\n\nCalculate the dot product of this point and another point (Vector).\n\n      dot: (other) ->\n        @x * other.x + @y * other.y\n\n\n`cross` calculates the cross product of this point and another point (Vector).\nUsually cross products are thought of as only applying to three dimensional vectors,\nbut z can be treated as zero. The result of this method is interpreted as the magnitude\nof the vector result of the cross product between [x1, y1, 0] x [x2, y2, 0]\nperpendicular to the xy plane.\n\n      cross: (other) ->\n        @x * other.y - other.x * @y\n\n\n`distance` computes the Euclidean distance between this point and another point.\n\n      distance: (other) ->\n        Point.distance(this, other)\n\n>     #! example\n>     pointA = Point(2, 3)\n>     pointB = Point(9, 2)\n>\n>     pointA.distance(pointB)\n\n----\n\n`toFixed` returns a string representation of this point with fixed decimal places.\n\n      toFixed: (n) ->\n        \"Point(#{@x.toFixed(n)}, #{@y.toFixed(n)})\"\n\n`toString` returns a string representation of this point. The representation is\nsuch that if `eval`d it will return a `Point`\n\n      toString: ->\n        \"Point(#{@x}, #{@y})\"\n\n`distance` Compute the Euclidean distance between two points.\n\n    Point.distance = (p1, p2) ->\n      Math.sqrt(Point.distanceSquared(p1, p2))\n\n>     #! example\n>     pointA = Point(2, 3)\n>     pointB = Point(9, 2)\n>\n>     Point.distance(pointA, pointB)\n\n----\n\n`distanceSquared` The square of the Euclidean distance between two points.\n\n    Point.distanceSquared = (p1, p2) ->\n      Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2)\n\n>     #! example\n>     pointA = Point(2, 3)\n>     pointB = Point(9, 2)\n>\n>     Point.distanceSquared(pointA, pointB)\n\n----\n\n`interpolate` returns a point along the path from p1 to p2\n\n    Point.interpolate = (p1, p2, t) ->\n      p2.subtract(p1).scale(t).add(p1)\n\nConstruct a point on the unit circle for the given angle.\n\n    Point.fromAngle = (angle) ->\n      Point(Math.cos(angle), Math.sin(angle))\n\n>     #! example\n>     Point.fromAngle(Math.PI / 2)\n\n----\n\nIf you have two dudes, one standing at point p1, and the other\nstanding at point p2, then this method will return the direction\nthat the dude standing at p1 will need to face to look at p2.\n\n>     #! example\n>     p1 = Point(0, 0)\n>     p2 = Point(7, 3)\n>\n>     Point.direction(p1, p2)\n\n    Point.direction = (p1, p2) ->\n      Math.atan2(\n        p2.y - p1.y,\n        p2.x - p1.x\n      )\n\nThe centroid of a set of points is their arithmetic mean.\n\n    Point.centroid = (points...) ->\n      points.reduce((sumPoint, point) ->\n        sumPoint.add(point)\n      , Point(0, 0))\n      .scale(1/points.length)\n\nGenerate a random point on the unit circle.\n\n    Point.random = ->\n      Point.fromAngle(Math.random() * 2 * Math.PI)\n\nExport\n\n    module.exports = Point\n\nHelpers\n-------\n\n    isObject = (object) ->\n      Object.prototype.toString.call(object) is \"[object Object]\"\n\nLive Examples\n-------------\n\n>     #! setup\n>     require(\"/interactive_runtime\")\n",
                  "type": "blob"
                },
                "test/test.coffee": {
                  "path": "test/test.coffee",
                  "mode": "100644",
                  "content": "Point = require \"../point\"\n\nok = assert\nequals = assert.equal\n\nTAU = 2 * Math.PI\n\ndescribe \"Point\", ->\n\n  TOLERANCE = 0.00001\n\n  equalEnough = (expected, actual, tolerance, message) ->\n    message ||= \"\" + expected + \" within \" + tolerance + \" of \" + actual\n    ok(expected + tolerance >= actual && expected - tolerance <= actual, message)\n\n  it \"copy constructor\", ->\n    p = Point(3, 7)\n\n    p2 = Point(p)\n\n    equals p2.x, p.x\n    equals p2.y, p.y\n\n  it \"#add\", ->\n    p1 = Point(5, 6)\n    p2 = Point(7, 5)\n\n    result = p1.add(p2)\n\n    equals result.x, p1.x + p2.x\n    equals result.y, p1.y + p2.y\n\n    equals p1.x, 5\n    equals p1.y, 6\n    equals p2.x, 7\n    equals p2.y, 5\n\n  it \"#add with two arguments\", ->\n    point = Point(3, 7)\n    x = 2\n    y = 1\n\n    result = point.add(x, y)\n\n    equals result.x, point.x + x\n    equals result.y, point.y + y\n\n    x = 2\n    y = 0\n\n    result = point.add(x, y)\n\n    equals result.x, point.x + x\n    equals result.y, point.y + y\n\n  it \"#add existing\", ->\n    p = Point(0, 0)\n\n    p.add(Point(3, 5))\n\n    equals p.x, 0\n    equals p.y, 0\n\n  it \"#subtract\", ->\n    p1 = Point(5, 6)\n    p2 = Point(7, 5)\n\n    result = p1.subtract(p2)\n\n    equals result.x, p1.x - p2.x\n    equals result.y, p1.y - p2.y\n\n  it \"#subtract existing\", ->\n    p = Point(8, 6)\n\n    p.subtract(3, 4)\n\n    equals p.x, 8\n    equals p.y, 6\n\n  it \"#norm\", ->\n    p = Point(2, 0)\n\n    normal = p.norm()\n    equals normal.x, 1\n\n    normal = p.norm(5)\n    equals normal.x, 5\n\n    p = Point(0, 0)\n\n    normal = p.norm()\n    equals normal.x, 0, \"x value of norm of point(0,0) is 0\"\n    equals normal.y, 0, \"y value of norm of point(0,0) is 0\"\n\n  it \"#norm existing\", ->\n    p = Point(6, 8)\n\n    p.norm(5)\n\n    equals p.x, 6\n    equals p.y, 8\n\n  it \"#scale\", ->\n    p = Point(5, 6)\n    scalar = 2\n\n    result = p.scale(scalar)\n\n    equals result.x, p.x * scalar\n    equals result.y, p.y * scalar\n\n    equals p.x, 5\n    equals p.y, 6\n\n  it \"#scale existing\", ->\n    p = Point(0, 1)\n    scalar = 3\n\n    p.scale(scalar)\n\n    equals p.x, 0\n    equals p.y, 1\n\n  it \"#equal\", ->\n    ok Point(7, 8).equal(Point(7, 8))\n\n  it \"#magnitude\", ->\n    equals Point(3, 4).magnitude(), 5\n\n  it \"#length\", ->\n    equals Point(0, 0).length(), 0\n    equals Point(-1, 0).length(), 1\n\n  it \"#toString\", ->\n    p = Point(7, 5)\n    ok eval(p.toString()).equal(p)\n\n  it \"#clamp\", ->\n    p = Point(10, 10)\n    p2 = p.clamp(5)\n\n    equals p2.length(), 5\n\n  it \".centroid\", ->\n    centroid = Point.centroid(\n      Point(0, 0),\n      Point(10, 10),\n      Point(10, 0),\n      Point(0, 10)\n    )\n\n    equals centroid.x, 5\n    equals centroid.y, 5\n\n  it \".fromAngle\", ->\n    p = Point.fromAngle(TAU / 4)\n\n    equalEnough p.x, 0, TOLERANCE\n    equals p.y, 1\n\n  it \".random\", ->\n    p = Point.random()\n\n    ok p\n\n  it \".interpolate\", ->\n    p1 = Point(10, 7)\n    p2 = Point(-6, 29)\n\n    ok p1.equal(Point.interpolate(p1, p2, 0))\n    ok p2.equal(Point.interpolate(p1, p2, 1))\n",
                  "type": "blob"
                }
              },
              "distribution": {
                "interactive_runtime": {
                  "path": "interactive_runtime",
                  "content": "(function() {\n  window.Point = require(\"./point\");\n\n  Interactive.register(\"example\", function(_arg) {\n    var outputElement, program, result, runtimeElement, source;\n    source = _arg.source, runtimeElement = _arg.runtimeElement;\n    program = CoffeeScript.compile(source, {\n      bare: true\n    });\n    outputElement = document.createElement(\"pre\");\n    runtimeElement.empty().append(outputElement);\n    result = eval(program);\n    if (typeof result === \"number\") {\n      if (result !== (0 | result)) {\n        result = result.toFixed(4);\n      }\n    }\n    return outputElement.textContent = result;\n  });\n\n}).call(this);\n\n//# sourceURL=interactive_runtime.coffee",
                  "type": "blob"
                },
                "pixie": {
                  "path": "pixie",
                  "content": "module.exports = {\"version\":\"0.2.0\",\"entryPoint\":\"point\"};",
                  "type": "blob"
                },
                "point": {
                  "path": "point",
                  "content": "(function() {\n  var Point, isObject,\n    __slice = [].slice;\n\n  Point = function(x, y) {\n    var _ref;\n    if (isObject(x)) {\n      _ref = x, x = _ref.x, y = _ref.y;\n    }\n    return {\n      __proto__: Point.prototype,\n      x: x != null ? x : 0,\n      y: y != null ? y : 0\n    };\n  };\n\n  Point.prototype = {\n    clamp: function(n) {\n      if (this.magnitude() > n) {\n        return this.norm(n);\n      } else {\n        return this.copy();\n      }\n    },\n    copy: function() {\n      return Point(this.x, this.y);\n    },\n    add: function(first, second) {\n      if (second != null) {\n        return Point(this.x + first, this.y + second);\n      } else {\n        return Point(this.x + first.x, this.y + first.y);\n      }\n    },\n    subtract: function(first, second) {\n      if (second != null) {\n        return Point(this.x - first, this.y - second);\n      } else {\n        return this.add(first.scale(-1));\n      }\n    },\n    scale: function(scalar) {\n      return Point(this.x * scalar, this.y * scalar);\n    },\n    norm: function(length) {\n      var m;\n      if (length == null) {\n        length = 1.0;\n      }\n      if (m = this.length()) {\n        return this.scale(length / m);\n      } else {\n        return this.copy();\n      }\n    },\n    equal: function(other) {\n      return this.x === other.x && this.y === other.y;\n    },\n    length: function() {\n      return Math.sqrt(this.dot(this));\n    },\n    magnitude: function() {\n      return this.length();\n    },\n    direction: function() {\n      return Math.atan2(this.y, this.x);\n    },\n    dot: function(other) {\n      return this.x * other.x + this.y * other.y;\n    },\n    cross: function(other) {\n      return this.x * other.y - other.x * this.y;\n    },\n    distance: function(other) {\n      return Point.distance(this, other);\n    },\n    toFixed: function(n) {\n      return \"Point(\" + (this.x.toFixed(n)) + \", \" + (this.y.toFixed(n)) + \")\";\n    },\n    toString: function() {\n      return \"Point(\" + this.x + \", \" + this.y + \")\";\n    }\n  };\n\n  Point.distance = function(p1, p2) {\n    return Math.sqrt(Point.distanceSquared(p1, p2));\n  };\n\n  Point.distanceSquared = function(p1, p2) {\n    return Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2);\n  };\n\n  Point.interpolate = function(p1, p2, t) {\n    return p2.subtract(p1).scale(t).add(p1);\n  };\n\n  Point.fromAngle = function(angle) {\n    return Point(Math.cos(angle), Math.sin(angle));\n  };\n\n  Point.direction = function(p1, p2) {\n    return Math.atan2(p2.y - p1.y, p2.x - p1.x);\n  };\n\n  Point.centroid = function() {\n    var points;\n    points = 1 <= arguments.length ? __slice.call(arguments, 0) : [];\n    return points.reduce(function(sumPoint, point) {\n      return sumPoint.add(point);\n    }, Point(0, 0)).scale(1 / points.length);\n  };\n\n  Point.random = function() {\n    return Point.fromAngle(Math.random() * 2 * Math.PI);\n  };\n\n  module.exports = Point;\n\n  isObject = function(object) {\n    return Object.prototype.toString.call(object) === \"[object Object]\";\n  };\n\n}).call(this);\n\n//# sourceURL=point.coffee",
                  "type": "blob"
                },
                "test/test": {
                  "path": "test/test",
                  "content": "(function() {\n  var Point, TAU, equals, ok;\n\n  Point = require(\"../point\");\n\n  ok = assert;\n\n  equals = assert.equal;\n\n  TAU = 2 * Math.PI;\n\n  describe(\"Point\", function() {\n    var TOLERANCE, equalEnough;\n    TOLERANCE = 0.00001;\n    equalEnough = function(expected, actual, tolerance, message) {\n      message || (message = \"\" + expected + \" within \" + tolerance + \" of \" + actual);\n      return ok(expected + tolerance >= actual && expected - tolerance <= actual, message);\n    };\n    it(\"copy constructor\", function() {\n      var p, p2;\n      p = Point(3, 7);\n      p2 = Point(p);\n      equals(p2.x, p.x);\n      return equals(p2.y, p.y);\n    });\n    it(\"#add\", function() {\n      var p1, p2, result;\n      p1 = Point(5, 6);\n      p2 = Point(7, 5);\n      result = p1.add(p2);\n      equals(result.x, p1.x + p2.x);\n      equals(result.y, p1.y + p2.y);\n      equals(p1.x, 5);\n      equals(p1.y, 6);\n      equals(p2.x, 7);\n      return equals(p2.y, 5);\n    });\n    it(\"#add with two arguments\", function() {\n      var point, result, x, y;\n      point = Point(3, 7);\n      x = 2;\n      y = 1;\n      result = point.add(x, y);\n      equals(result.x, point.x + x);\n      equals(result.y, point.y + y);\n      x = 2;\n      y = 0;\n      result = point.add(x, y);\n      equals(result.x, point.x + x);\n      return equals(result.y, point.y + y);\n    });\n    it(\"#add existing\", function() {\n      var p;\n      p = Point(0, 0);\n      p.add(Point(3, 5));\n      equals(p.x, 0);\n      return equals(p.y, 0);\n    });\n    it(\"#subtract\", function() {\n      var p1, p2, result;\n      p1 = Point(5, 6);\n      p2 = Point(7, 5);\n      result = p1.subtract(p2);\n      equals(result.x, p1.x - p2.x);\n      return equals(result.y, p1.y - p2.y);\n    });\n    it(\"#subtract existing\", function() {\n      var p;\n      p = Point(8, 6);\n      p.subtract(3, 4);\n      equals(p.x, 8);\n      return equals(p.y, 6);\n    });\n    it(\"#norm\", function() {\n      var normal, p;\n      p = Point(2, 0);\n      normal = p.norm();\n      equals(normal.x, 1);\n      normal = p.norm(5);\n      equals(normal.x, 5);\n      p = Point(0, 0);\n      normal = p.norm();\n      equals(normal.x, 0, \"x value of norm of point(0,0) is 0\");\n      return equals(normal.y, 0, \"y value of norm of point(0,0) is 0\");\n    });\n    it(\"#norm existing\", function() {\n      var p;\n      p = Point(6, 8);\n      p.norm(5);\n      equals(p.x, 6);\n      return equals(p.y, 8);\n    });\n    it(\"#scale\", function() {\n      var p, result, scalar;\n      p = Point(5, 6);\n      scalar = 2;\n      result = p.scale(scalar);\n      equals(result.x, p.x * scalar);\n      equals(result.y, p.y * scalar);\n      equals(p.x, 5);\n      return equals(p.y, 6);\n    });\n    it(\"#scale existing\", function() {\n      var p, scalar;\n      p = Point(0, 1);\n      scalar = 3;\n      p.scale(scalar);\n      equals(p.x, 0);\n      return equals(p.y, 1);\n    });\n    it(\"#equal\", function() {\n      return ok(Point(7, 8).equal(Point(7, 8)));\n    });\n    it(\"#magnitude\", function() {\n      return equals(Point(3, 4).magnitude(), 5);\n    });\n    it(\"#length\", function() {\n      equals(Point(0, 0).length(), 0);\n      return equals(Point(-1, 0).length(), 1);\n    });\n    it(\"#toString\", function() {\n      var p;\n      p = Point(7, 5);\n      return ok(eval(p.toString()).equal(p));\n    });\n    it(\"#clamp\", function() {\n      var p, p2;\n      p = Point(10, 10);\n      p2 = p.clamp(5);\n      return equals(p2.length(), 5);\n    });\n    it(\".centroid\", function() {\n      var centroid;\n      centroid = Point.centroid(Point(0, 0), Point(10, 10), Point(10, 0), Point(0, 10));\n      equals(centroid.x, 5);\n      return equals(centroid.y, 5);\n    });\n    it(\".fromAngle\", function() {\n      var p;\n      p = Point.fromAngle(TAU / 4);\n      equalEnough(p.x, 0, TOLERANCE);\n      return equals(p.y, 1);\n    });\n    it(\".random\", function() {\n      var p;\n      p = Point.random();\n      return ok(p);\n    });\n    return it(\".interpolate\", function() {\n      var p1, p2;\n      p1 = Point(10, 7);\n      p2 = Point(-6, 29);\n      ok(p1.equal(Point.interpolate(p1, p2, 0)));\n      return ok(p2.equal(Point.interpolate(p1, p2, 1)));\n    });\n  });\n\n}).call(this);\n\n//# sourceURL=test/test.coffee",
                  "type": "blob"
                }
              },
              "progenitor": {
                "url": "http://strd6.github.io/editor/"
              },
              "version": "0.2.0",
              "entryPoint": "point",
              "repository": {
                "id": 13484982,
                "name": "point",
                "full_name": "distri/point",
                "owner": {
                  "login": "distri",
                  "id": 6005125,
                  "avatar_url": "https://identicons.github.com/f90c81ffc1498e260c820082f2e7ca5f.png",
                  "gravatar_id": null,
                  "url": "https://api.github.com/users/distri",
                  "html_url": "https://github.com/distri",
                  "followers_url": "https://api.github.com/users/distri/followers",
                  "following_url": "https://api.github.com/users/distri/following{/other_user}",
                  "gists_url": "https://api.github.com/users/distri/gists{/gist_id}",
                  "starred_url": "https://api.github.com/users/distri/starred{/owner}{/repo}",
                  "subscriptions_url": "https://api.github.com/users/distri/subscriptions",
                  "organizations_url": "https://api.github.com/users/distri/orgs",
                  "repos_url": "https://api.github.com/users/distri/repos",
                  "events_url": "https://api.github.com/users/distri/events{/privacy}",
                  "received_events_url": "https://api.github.com/users/distri/received_events",
                  "type": "Organization",
                  "site_admin": false
                },
                "private": false,
                "html_url": "https://github.com/distri/point",
                "description": "JavaScript Point implementation",
                "fork": false,
                "url": "https://api.github.com/repos/distri/point",
                "forks_url": "https://api.github.com/repos/distri/point/forks",
                "keys_url": "https://api.github.com/repos/distri/point/keys{/key_id}",
                "collaborators_url": "https://api.github.com/repos/distri/point/collaborators{/collaborator}",
                "teams_url": "https://api.github.com/repos/distri/point/teams",
                "hooks_url": "https://api.github.com/repos/distri/point/hooks",
                "issue_events_url": "https://api.github.com/repos/distri/point/issues/events{/number}",
                "events_url": "https://api.github.com/repos/distri/point/events",
                "assignees_url": "https://api.github.com/repos/distri/point/assignees{/user}",
                "branches_url": "https://api.github.com/repos/distri/point/branches{/branch}",
                "tags_url": "https://api.github.com/repos/distri/point/tags",
                "blobs_url": "https://api.github.com/repos/distri/point/git/blobs{/sha}",
                "git_tags_url": "https://api.github.com/repos/distri/point/git/tags{/sha}",
                "git_refs_url": "https://api.github.com/repos/distri/point/git/refs{/sha}",
                "trees_url": "https://api.github.com/repos/distri/point/git/trees{/sha}",
                "statuses_url": "https://api.github.com/repos/distri/point/statuses/{sha}",
                "languages_url": "https://api.github.com/repos/distri/point/languages",
                "stargazers_url": "https://api.github.com/repos/distri/point/stargazers",
                "contributors_url": "https://api.github.com/repos/distri/point/contributors",
                "subscribers_url": "https://api.github.com/repos/distri/point/subscribers",
                "subscription_url": "https://api.github.com/repos/distri/point/subscription",
                "commits_url": "https://api.github.com/repos/distri/point/commits{/sha}",
                "git_commits_url": "https://api.github.com/repos/distri/point/git/commits{/sha}",
                "comments_url": "https://api.github.com/repos/distri/point/comments{/number}",
                "issue_comment_url": "https://api.github.com/repos/distri/point/issues/comments/{number}",
                "contents_url": "https://api.github.com/repos/distri/point/contents/{+path}",
                "compare_url": "https://api.github.com/repos/distri/point/compare/{base}...{head}",
                "merges_url": "https://api.github.com/repos/distri/point/merges",
                "archive_url": "https://api.github.com/repos/distri/point/{archive_format}{/ref}",
                "downloads_url": "https://api.github.com/repos/distri/point/downloads",
                "issues_url": "https://api.github.com/repos/distri/point/issues{/number}",
                "pulls_url": "https://api.github.com/repos/distri/point/pulls{/number}",
                "milestones_url": "https://api.github.com/repos/distri/point/milestones{/number}",
                "notifications_url": "https://api.github.com/repos/distri/point/notifications{?since,all,participating}",
                "labels_url": "https://api.github.com/repos/distri/point/labels{/name}",
                "releases_url": "https://api.github.com/repos/distri/point/releases{/id}",
                "created_at": "2013-10-10T22:59:27Z",
                "updated_at": "2013-12-23T23:33:20Z",
                "pushed_at": "2013-10-15T00:22:04Z",
                "git_url": "git://github.com/distri/point.git",
                "ssh_url": "git@github.com:distri/point.git",
                "clone_url": "https://github.com/distri/point.git",
                "svn_url": "https://github.com/distri/point",
                "homepage": null,
                "size": 836,
                "stargazers_count": 0,
                "watchers_count": 0,
                "language": "CoffeeScript",
                "has_issues": true,
                "has_downloads": true,
                "has_wiki": true,
                "forks_count": 0,
                "mirror_url": null,
                "open_issues_count": 0,
                "forks": 0,
                "open_issues": 0,
                "watchers": 0,
                "default_branch": "master",
                "master_branch": "master",
                "permissions": {
                  "admin": true,
                  "push": true,
                  "pull": true
                },
                "organization": {
                  "login": "distri",
                  "id": 6005125,
                  "avatar_url": "https://identicons.github.com/f90c81ffc1498e260c820082f2e7ca5f.png",
                  "gravatar_id": null,
                  "url": "https://api.github.com/users/distri",
                  "html_url": "https://github.com/distri",
                  "followers_url": "https://api.github.com/users/distri/followers",
                  "following_url": "https://api.github.com/users/distri/following{/other_user}",
                  "gists_url": "https://api.github.com/users/distri/gists{/gist_id}",
                  "starred_url": "https://api.github.com/users/distri/starred{/owner}{/repo}",
                  "subscriptions_url": "https://api.github.com/users/distri/subscriptions",
                  "organizations_url": "https://api.github.com/users/distri/orgs",
                  "repos_url": "https://api.github.com/users/distri/repos",
                  "events_url": "https://api.github.com/users/distri/events{/privacy}",
                  "received_events_url": "https://api.github.com/users/distri/received_events",
                  "type": "Organization",
                  "site_admin": false
                },
                "network_count": 0,
                "subscribers_count": 1,
                "branch": "v0.2.0",
                "defaultBranch": "master"
              },
              "dependencies": {}
            },
            "matrix": {
              "source": {
                "LICENSE": {
                  "path": "LICENSE",
                  "mode": "100644",
                  "content": "The MIT License (MIT)\n\nCopyright (c) 2013 Daniel X Moore\n\nPermission is hereby granted, free of charge, to any person obtaining a copy of\nthis software and associated documentation files (the \"Software\"), to deal in\nthe Software without restriction, including without limitation the rights to\nuse, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of\nthe Software, and to permit persons to whom the Software is furnished to do so,\nsubject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS\nFOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR\nCOPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER\nIN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN\nCONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\n",
                  "type": "blob"
                },
                "README.md": {
                  "path": "README.md",
                  "mode": "100644",
                  "content": "matrix\n======\n\nWhere matrices become heroes, together.\n",
                  "type": "blob"
                },
                "matrix.coffee.md": {
                  "path": "matrix.coffee.md",
                  "mode": "100644",
                  "content": "Matrix\n======\n\n```\n   _        _\n  | a  c tx  |\n  | b  d ty  |\n  |_0  0  1 _|\n```\n\nCreates a matrix for 2d affine transformations.\n\n`concat`, `inverse`, `rotate`, `scale` and `translate` return new matrices with\nthe transformations applied. The matrix is not modified in place.\n\nReturns the identity matrix when called with no arguments.\n\n    Matrix = (a, b, c, d, tx, ty) ->\n      if isObject(a)\n        {a, b, c, d, tx, ty} = a\n\n      __proto__: Matrix.prototype\n      a: a ? 1\n      b: b ? 0\n      c: c ? 0\n      d: d ? 1\n      tx: tx ? 0\n      ty: ty ? 0\n\nA `Point` constructor for the methods that return points. This can be overridden\nwith a compatible constructor if you want fancier points.\n\n    Matrix.Point = require \"./point\"\n\n    Matrix.prototype =\n\n`concat` returns the result of this matrix multiplied by another matrix\ncombining the geometric effects of the two. In mathematical terms,\nconcatenating two matrixes is the same as combining them using matrix multiplication.\nIf this matrix is A and the matrix passed in is B, the resulting matrix is A x B\nhttp://mathworld.wolfram.com/MatrixMultiplication.html\n\n      concat: (matrix) ->\n        Matrix(\n          @a * matrix.a + @c * matrix.b,\n          @b * matrix.a + @d * matrix.b,\n          @a * matrix.c + @c * matrix.d,\n          @b * matrix.c + @d * matrix.d,\n          @a * matrix.tx + @c * matrix.ty + @tx,\n          @b * matrix.tx + @d * matrix.ty + @ty\n        )\n\n\nReturn a new matrix that is a `copy` of this matrix.\n\n      copy: ->\n        Matrix(@a, @b, @c, @d, @tx, @ty)\n\nGiven a point in the pretransform coordinate space, returns the coordinates of\nthat point after the transformation occurs. Unlike the standard transformation\napplied using the transformPoint() method, the deltaTransformPoint() method\ndoes not consider the translation parameters tx and ty.\n\nReturns a new `Point` transformed by this matrix ignoring tx and ty.\n\n      deltaTransformPoint: (point) ->\n        Matrix.Point(\n          @a * point.x + @c * point.y,\n          @b * point.x + @d * point.y\n        )\n\nReturns a new matrix that is the inverse of this matrix.\nhttp://mathworld.wolfram.com/MatrixInverse.html\n\n      inverse: ->\n        determinant = @a * @d - @b * @c\n\n        Matrix(\n          @d / determinant,\n          -@b / determinant,\n          -@c / determinant,\n          @a / determinant,\n          (@c * @ty - @d * @tx) / determinant,\n          (@b * @tx - @a * @ty) / determinant\n        )\n\nReturns a new matrix that corresponds this matrix multiplied by a\na rotation matrix.\n\nThe first parameter `theta` is the amount to rotate in radians.\n\nThe second optional parameter, `aboutPoint` is the point about which the\nrotation occurs. Defaults to (0,0).\n\n      rotate: (theta, aboutPoint) ->\n        @concat(Matrix.rotation(theta, aboutPoint))\n\nReturns a new matrix that corresponds this matrix multiplied by a\na scaling matrix.\n\n      scale: (sx, sy, aboutPoint) ->\n        @concat(Matrix.scale(sx, sy, aboutPoint))\n\nReturns a new matrix that corresponds this matrix multiplied by a\na skewing matrix.\n\n      skew: (skewX, skewY) ->\n        @concat(Matrix.skew(skewX, skewY))\n\nReturns a string representation of this matrix.\n\n      toString: ->\n        \"Matrix(#{@a}, #{@b}, #{@c}, #{@d}, #{@tx}, #{@ty})\"\n\nReturns the result of applying the geometric transformation represented by the\nMatrix object to the specified point.\n\n      transformPoint: (point) ->\n        Matrix.Point(\n          @a * point.x + @c * point.y + @tx,\n          @b * point.x + @d * point.y + @ty\n        )\n\nTranslates the matrix along the x and y axes, as specified by the tx and ty parameters.\n\n      translate: (tx, ty) ->\n        @concat(Matrix.translation(tx, ty))\n\nCreates a matrix transformation that corresponds to the given rotation,\naround (0,0) or the specified point.\n\n    Matrix.rotate = Matrix.rotation = (theta, aboutPoint) ->\n      rotationMatrix = Matrix(\n        Math.cos(theta),\n        Math.sin(theta),\n        -Math.sin(theta),\n        Math.cos(theta)\n      )\n\n      if aboutPoint?\n        rotationMatrix =\n          Matrix.translation(aboutPoint.x, aboutPoint.y).concat(\n            rotationMatrix\n          ).concat(\n            Matrix.translation(-aboutPoint.x, -aboutPoint.y)\n          )\n\n      return rotationMatrix\n\nReturns a matrix that corresponds to scaling by factors of sx, sy along\nthe x and y axis respectively.\n\nIf only one parameter is given the matrix is scaled uniformly along both axis.\n\nIf the optional aboutPoint parameter is given the scaling takes place\nabout the given point.\n\n    Matrix.scale = (sx, sy, aboutPoint) ->\n      sy = sy || sx\n\n      scaleMatrix = Matrix(sx, 0, 0, sy)\n\n      if aboutPoint\n        scaleMatrix =\n          Matrix.translation(aboutPoint.x, aboutPoint.y).concat(\n            scaleMatrix\n          ).concat(\n            Matrix.translation(-aboutPoint.x, -aboutPoint.y)\n          )\n\n      return scaleMatrix\n\n\nReturns a matrix that corresponds to a skew of skewX, skewY.\n\n    Matrix.skew = (skewX, skewY) ->\n      Matrix(0, Math.tan(skewY), Math.tan(skewX), 0)\n\nReturns a matrix that corresponds to a translation of tx, ty.\n\n    Matrix.translate = Matrix.translation = (tx, ty) ->\n      Matrix(1, 0, 0, 1, tx, ty)\n\nHelpers\n-------\n\n    isObject = (object) ->\n      Object.prototype.toString.call(object) is \"[object Object]\"\n\n    frozen = (object) ->\n      Object.freeze?(object)\n\n      return object\n\nConstants\n---------\n\nA constant representing the identity matrix.\n\n    Matrix.IDENTITY = frozen Matrix()\n\nA constant representing the horizontal flip transformation matrix.\n\n    Matrix.HORIZONTAL_FLIP = frozen Matrix(-1, 0, 0, 1)\n\nA constant representing the vertical flip transformation matrix.\n\n    Matrix.VERTICAL_FLIP = frozen Matrix(1, 0, 0, -1)\n\nExports\n-------\n\n    module.exports = Matrix\n",
                  "type": "blob"
                },
                "pixie.cson": {
                  "path": "pixie.cson",
                  "mode": "100644",
                  "content": "version: \"0.3.1\"\nentryPoint: \"matrix\"\n",
                  "type": "blob"
                },
                "test/matrix.coffee": {
                  "path": "test/matrix.coffee",
                  "mode": "100644",
                  "content": "Matrix = require \"../matrix\"\nPoint = require \"../point\"\n\nok = assert\nequals = assert.equal\ntest = it\n\ndescribe \"Matrix\", ->\n\n  TOLERANCE = 0.00001\n  \n  equalEnough = (expected, actual, tolerance, message) ->\n    message ||= \"\" + expected + \" within \" + tolerance + \" of \" + actual\n    ok(expected + tolerance >= actual && expected - tolerance <= actual, message)\n  \n  matrixEqual = (m1, m2) ->\n    equalEnough(m1.a, m2.a, TOLERANCE)\n    equalEnough(m1.b, m2.b, TOLERANCE)\n    equalEnough(m1.c, m2.c, TOLERANCE)\n    equalEnough(m1.d, m2.d, TOLERANCE)\n    equalEnough(m1.tx, m2.tx, TOLERANCE)\n    equalEnough(m1.ty, m2.ty, TOLERANCE)\n  \n  test \"copy constructor\", ->\n   matrix = Matrix(1, 0, 0, 1, 10, 12)\n  \n   matrix2 = Matrix(matrix)\n  \n   ok matrix != matrix2\n   matrixEqual(matrix2, matrix)\n  \n  test \"Matrix() (Identity)\", ->\n    matrix = Matrix()\n  \n    equals(matrix.a, 1, \"a\")\n    equals(matrix.b, 0, \"b\")\n    equals(matrix.c, 0, \"c\")\n    equals(matrix.d, 1, \"d\")\n    equals(matrix.tx, 0, \"tx\")\n    equals(matrix.ty, 0, \"ty\")\n  \n    matrixEqual(matrix, Matrix.IDENTITY)\n  \n  test \"Empty\", ->\n    matrix = Matrix(0, 0, 0, 0, 0, 0)\n  \n    equals(matrix.a, 0, \"a\")\n    equals(matrix.b, 0, \"b\")\n    equals(matrix.c, 0, \"c\")\n    equals(matrix.d, 0, \"d\")\n    equals(matrix.tx, 0, \"tx\")\n    equals(matrix.ty, 0, \"ty\")\n  \n  test \"#copy\", ->\n    matrix = Matrix(2, 0, 0, 2)\n  \n    copyMatrix = matrix.copy()\n  \n    matrixEqual copyMatrix, matrix\n  \n    copyMatrix.a = 4\n  \n    equals copyMatrix.a, 4\n    equals matrix.a, 2, \"Old 'a' value is unchanged\"\n  \n  test \".scale\", ->\n    matrix = Matrix.scale(2, 2)\n  \n    equals(matrix.a, 2, \"a\")\n    equals(matrix.b, 0, \"b\")\n    equals(matrix.c, 0, \"c\")\n    equals(matrix.d, 2, \"d\")\n  \n    matrix = Matrix.scale(3)\n  \n    equals(matrix.a, 3, \"a\")\n    equals(matrix.b, 0, \"b\")\n    equals(matrix.c, 0, \"c\")\n    equals(matrix.d, 3, \"d\")\n  \n  test \".scale (about a point)\", ->\n    p = Point(5, 17)\n  \n    transformedPoint = Matrix.scale(3, 7, p).transformPoint(p)\n  \n    equals(transformedPoint.x, p.x, \"Point should remain the same\")\n    equals(transformedPoint.y, p.y, \"Point should remain the same\")\n  \n  test \"#scale (about a point)\", ->\n    p = Point(3, 11)\n  \n    transformedPoint = Matrix.IDENTITY.scale(3, 7, p).transformPoint(p)\n  \n    equals(transformedPoint.x, p.x, \"Point should remain the same\")\n    equals(transformedPoint.y, p.y, \"Point should remain the same\")\n  \n  test \"#skew\", ->\n    matrix = Matrix()\n\n    angle = 0.25 * Math.PI\n  \n    matrix = matrix.skew(angle, 0)\n  \n    equals matrix.c, Math.tan(angle)\n  \n  test \".rotation\", ->\n    matrix = Matrix.rotation(Math.PI / 2)\n  \n    equalEnough(matrix.a, 0, TOLERANCE)\n    equalEnough(matrix.b, 1, TOLERANCE)\n    equalEnough(matrix.c,-1, TOLERANCE)\n    equalEnough(matrix.d, 0, TOLERANCE)\n  \n  test \".rotation (about a point)\", ->\n    p = Point(11, 7)\n  \n    transformedPoint = Matrix.rotation(Math.PI / 2, p).transformPoint(p)\n  \n    equals transformedPoint.x, p.x, \"Point should remain the same\"\n    equals transformedPoint.y, p.y, \"Point should remain the same\"\n  \n  test \"#rotate (about a point)\", ->\n    p = Point(8, 5);\n  \n    transformedPoint = Matrix.IDENTITY.rotate(Math.PI / 2, p).transformPoint(p)\n  \n    equals transformedPoint.x, p.x, \"Point should remain the same\"\n    equals transformedPoint.y, p.y, \"Point should remain the same\"\n  \n  test \"#inverse (Identity)\", ->\n    matrix = Matrix().inverse()\n  \n    equals(matrix.a, 1, \"a\")\n    equals(matrix.b, 0, \"b\")\n    equals(matrix.c, 0, \"c\")\n    equals(matrix.d, 1, \"d\")\n    equals(matrix.tx, 0, \"tx\")\n    equals(matrix.ty, 0, \"ty\")\n  \n  test \"#concat\", ->\n    matrix = Matrix.rotation(Math.PI / 2).concat(Matrix.rotation(-Math.PI / 2))\n  \n    matrixEqual(matrix, Matrix.IDENTITY)\n  \n  test \"#toString\", ->\n    matrix = Matrix(0.5, 2, 0.5, -2, 3, 4.5)\n    matrixEqual eval(matrix.toString()), matrix\n  \n  test \"Maths\", ->\n    a = Matrix(12, 3, 3, 1, 7, 9)\n    b = Matrix(3, 8, 3, 2, 1, 5)\n  \n    c = a.concat(b)\n  \n    equals(c.a, 60)\n    equals(c.b, 17)\n    equals(c.c, 42)\n    equals(c.d, 11)\n    equals(c.tx, 34)\n    equals(c.ty, 17)\n  \n  test \"Order of transformations should match manual concat\", ->\n    tx = 10\n    ty = 5\n    theta = Math.PI/3\n    s = 2\n  \n    m1 = Matrix().translate(tx, ty).scale(s).rotate(theta)\n    m2 = Matrix().concat(Matrix.translation(tx, ty)).concat(Matrix.scale(s)).concat(Matrix.rotation(theta))\n  \n    matrixEqual(m1, m2)\n  \n  test \"IDENTITY is immutable\", ->\n    identity = Matrix.IDENTITY\n  \n    identity.a = 5\n  \n    equals identity.a, 1\n",
                  "type": "blob"
                },
                "point.coffee.md": {
                  "path": "point.coffee.md",
                  "mode": "100644",
                  "content": "Point\n=====\n\nA very simple Point object constructor.\n\n    module.exports = (x, y) ->\n      x: x\n      y: y\n",
                  "type": "blob"
                }
              },
              "distribution": {
                "matrix": {
                  "path": "matrix",
                  "content": "(function() {\n  var Matrix, frozen, isObject;\n\n  Matrix = function(a, b, c, d, tx, ty) {\n    var _ref;\n    if (isObject(a)) {\n      _ref = a, a = _ref.a, b = _ref.b, c = _ref.c, d = _ref.d, tx = _ref.tx, ty = _ref.ty;\n    }\n    return {\n      __proto__: Matrix.prototype,\n      a: a != null ? a : 1,\n      b: b != null ? b : 0,\n      c: c != null ? c : 0,\n      d: d != null ? d : 1,\n      tx: tx != null ? tx : 0,\n      ty: ty != null ? ty : 0\n    };\n  };\n\n  Matrix.Point = require(\"./point\");\n\n  Matrix.prototype = {\n    concat: function(matrix) {\n      return Matrix(this.a * matrix.a + this.c * matrix.b, this.b * matrix.a + this.d * matrix.b, this.a * matrix.c + this.c * matrix.d, this.b * matrix.c + this.d * matrix.d, this.a * matrix.tx + this.c * matrix.ty + this.tx, this.b * matrix.tx + this.d * matrix.ty + this.ty);\n    },\n    copy: function() {\n      return Matrix(this.a, this.b, this.c, this.d, this.tx, this.ty);\n    },\n    deltaTransformPoint: function(point) {\n      return Matrix.Point(this.a * point.x + this.c * point.y, this.b * point.x + this.d * point.y);\n    },\n    inverse: function() {\n      var determinant;\n      determinant = this.a * this.d - this.b * this.c;\n      return Matrix(this.d / determinant, -this.b / determinant, -this.c / determinant, this.a / determinant, (this.c * this.ty - this.d * this.tx) / determinant, (this.b * this.tx - this.a * this.ty) / determinant);\n    },\n    rotate: function(theta, aboutPoint) {\n      return this.concat(Matrix.rotation(theta, aboutPoint));\n    },\n    scale: function(sx, sy, aboutPoint) {\n      return this.concat(Matrix.scale(sx, sy, aboutPoint));\n    },\n    skew: function(skewX, skewY) {\n      return this.concat(Matrix.skew(skewX, skewY));\n    },\n    toString: function() {\n      return \"Matrix(\" + this.a + \", \" + this.b + \", \" + this.c + \", \" + this.d + \", \" + this.tx + \", \" + this.ty + \")\";\n    },\n    transformPoint: function(point) {\n      return Matrix.Point(this.a * point.x + this.c * point.y + this.tx, this.b * point.x + this.d * point.y + this.ty);\n    },\n    translate: function(tx, ty) {\n      return this.concat(Matrix.translation(tx, ty));\n    }\n  };\n\n  Matrix.rotate = Matrix.rotation = function(theta, aboutPoint) {\n    var rotationMatrix;\n    rotationMatrix = Matrix(Math.cos(theta), Math.sin(theta), -Math.sin(theta), Math.cos(theta));\n    if (aboutPoint != null) {\n      rotationMatrix = Matrix.translation(aboutPoint.x, aboutPoint.y).concat(rotationMatrix).concat(Matrix.translation(-aboutPoint.x, -aboutPoint.y));\n    }\n    return rotationMatrix;\n  };\n\n  Matrix.scale = function(sx, sy, aboutPoint) {\n    var scaleMatrix;\n    sy = sy || sx;\n    scaleMatrix = Matrix(sx, 0, 0, sy);\n    if (aboutPoint) {\n      scaleMatrix = Matrix.translation(aboutPoint.x, aboutPoint.y).concat(scaleMatrix).concat(Matrix.translation(-aboutPoint.x, -aboutPoint.y));\n    }\n    return scaleMatrix;\n  };\n\n  Matrix.skew = function(skewX, skewY) {\n    return Matrix(0, Math.tan(skewY), Math.tan(skewX), 0);\n  };\n\n  Matrix.translate = Matrix.translation = function(tx, ty) {\n    return Matrix(1, 0, 0, 1, tx, ty);\n  };\n\n  isObject = function(object) {\n    return Object.prototype.toString.call(object) === \"[object Object]\";\n  };\n\n  frozen = function(object) {\n    if (typeof Object.freeze === \"function\") {\n      Object.freeze(object);\n    }\n    return object;\n  };\n\n  Matrix.IDENTITY = frozen(Matrix());\n\n  Matrix.HORIZONTAL_FLIP = frozen(Matrix(-1, 0, 0, 1));\n\n  Matrix.VERTICAL_FLIP = frozen(Matrix(1, 0, 0, -1));\n\n  module.exports = Matrix;\n\n}).call(this);\n\n//# sourceURL=matrix.coffee",
                  "type": "blob"
                },
                "pixie": {
                  "path": "pixie",
                  "content": "module.exports = {\"version\":\"0.3.1\",\"entryPoint\":\"matrix\"};",
                  "type": "blob"
                },
                "test/matrix": {
                  "path": "test/matrix",
                  "content": "(function() {\n  var Matrix, Point, equals, ok, test;\n\n  Matrix = require(\"../matrix\");\n\n  Point = require(\"../point\");\n\n  ok = assert;\n\n  equals = assert.equal;\n\n  test = it;\n\n  describe(\"Matrix\", function() {\n    var TOLERANCE, equalEnough, matrixEqual;\n    TOLERANCE = 0.00001;\n    equalEnough = function(expected, actual, tolerance, message) {\n      message || (message = \"\" + expected + \" within \" + tolerance + \" of \" + actual);\n      return ok(expected + tolerance >= actual && expected - tolerance <= actual, message);\n    };\n    matrixEqual = function(m1, m2) {\n      equalEnough(m1.a, m2.a, TOLERANCE);\n      equalEnough(m1.b, m2.b, TOLERANCE);\n      equalEnough(m1.c, m2.c, TOLERANCE);\n      equalEnough(m1.d, m2.d, TOLERANCE);\n      equalEnough(m1.tx, m2.tx, TOLERANCE);\n      return equalEnough(m1.ty, m2.ty, TOLERANCE);\n    };\n    test(\"copy constructor\", function() {\n      var matrix, matrix2;\n      matrix = Matrix(1, 0, 0, 1, 10, 12);\n      matrix2 = Matrix(matrix);\n      ok(matrix !== matrix2);\n      return matrixEqual(matrix2, matrix);\n    });\n    test(\"Matrix() (Identity)\", function() {\n      var matrix;\n      matrix = Matrix();\n      equals(matrix.a, 1, \"a\");\n      equals(matrix.b, 0, \"b\");\n      equals(matrix.c, 0, \"c\");\n      equals(matrix.d, 1, \"d\");\n      equals(matrix.tx, 0, \"tx\");\n      equals(matrix.ty, 0, \"ty\");\n      return matrixEqual(matrix, Matrix.IDENTITY);\n    });\n    test(\"Empty\", function() {\n      var matrix;\n      matrix = Matrix(0, 0, 0, 0, 0, 0);\n      equals(matrix.a, 0, \"a\");\n      equals(matrix.b, 0, \"b\");\n      equals(matrix.c, 0, \"c\");\n      equals(matrix.d, 0, \"d\");\n      equals(matrix.tx, 0, \"tx\");\n      return equals(matrix.ty, 0, \"ty\");\n    });\n    test(\"#copy\", function() {\n      var copyMatrix, matrix;\n      matrix = Matrix(2, 0, 0, 2);\n      copyMatrix = matrix.copy();\n      matrixEqual(copyMatrix, matrix);\n      copyMatrix.a = 4;\n      equals(copyMatrix.a, 4);\n      return equals(matrix.a, 2, \"Old 'a' value is unchanged\");\n    });\n    test(\".scale\", function() {\n      var matrix;\n      matrix = Matrix.scale(2, 2);\n      equals(matrix.a, 2, \"a\");\n      equals(matrix.b, 0, \"b\");\n      equals(matrix.c, 0, \"c\");\n      equals(matrix.d, 2, \"d\");\n      matrix = Matrix.scale(3);\n      equals(matrix.a, 3, \"a\");\n      equals(matrix.b, 0, \"b\");\n      equals(matrix.c, 0, \"c\");\n      return equals(matrix.d, 3, \"d\");\n    });\n    test(\".scale (about a point)\", function() {\n      var p, transformedPoint;\n      p = Point(5, 17);\n      transformedPoint = Matrix.scale(3, 7, p).transformPoint(p);\n      equals(transformedPoint.x, p.x, \"Point should remain the same\");\n      return equals(transformedPoint.y, p.y, \"Point should remain the same\");\n    });\n    test(\"#scale (about a point)\", function() {\n      var p, transformedPoint;\n      p = Point(3, 11);\n      transformedPoint = Matrix.IDENTITY.scale(3, 7, p).transformPoint(p);\n      equals(transformedPoint.x, p.x, \"Point should remain the same\");\n      return equals(transformedPoint.y, p.y, \"Point should remain the same\");\n    });\n    test(\"#skew\", function() {\n      var angle, matrix;\n      matrix = Matrix();\n      angle = 0.25 * Math.PI;\n      matrix = matrix.skew(angle, 0);\n      return equals(matrix.c, Math.tan(angle));\n    });\n    test(\".rotation\", function() {\n      var matrix;\n      matrix = Matrix.rotation(Math.PI / 2);\n      equalEnough(matrix.a, 0, TOLERANCE);\n      equalEnough(matrix.b, 1, TOLERANCE);\n      equalEnough(matrix.c, -1, TOLERANCE);\n      return equalEnough(matrix.d, 0, TOLERANCE);\n    });\n    test(\".rotation (about a point)\", function() {\n      var p, transformedPoint;\n      p = Point(11, 7);\n      transformedPoint = Matrix.rotation(Math.PI / 2, p).transformPoint(p);\n      equals(transformedPoint.x, p.x, \"Point should remain the same\");\n      return equals(transformedPoint.y, p.y, \"Point should remain the same\");\n    });\n    test(\"#rotate (about a point)\", function() {\n      var p, transformedPoint;\n      p = Point(8, 5);\n      transformedPoint = Matrix.IDENTITY.rotate(Math.PI / 2, p).transformPoint(p);\n      equals(transformedPoint.x, p.x, \"Point should remain the same\");\n      return equals(transformedPoint.y, p.y, \"Point should remain the same\");\n    });\n    test(\"#inverse (Identity)\", function() {\n      var matrix;\n      matrix = Matrix().inverse();\n      equals(matrix.a, 1, \"a\");\n      equals(matrix.b, 0, \"b\");\n      equals(matrix.c, 0, \"c\");\n      equals(matrix.d, 1, \"d\");\n      equals(matrix.tx, 0, \"tx\");\n      return equals(matrix.ty, 0, \"ty\");\n    });\n    test(\"#concat\", function() {\n      var matrix;\n      matrix = Matrix.rotation(Math.PI / 2).concat(Matrix.rotation(-Math.PI / 2));\n      return matrixEqual(matrix, Matrix.IDENTITY);\n    });\n    test(\"#toString\", function() {\n      var matrix;\n      matrix = Matrix(0.5, 2, 0.5, -2, 3, 4.5);\n      return matrixEqual(eval(matrix.toString()), matrix);\n    });\n    test(\"Maths\", function() {\n      var a, b, c;\n      a = Matrix(12, 3, 3, 1, 7, 9);\n      b = Matrix(3, 8, 3, 2, 1, 5);\n      c = a.concat(b);\n      equals(c.a, 60);\n      equals(c.b, 17);\n      equals(c.c, 42);\n      equals(c.d, 11);\n      equals(c.tx, 34);\n      return equals(c.ty, 17);\n    });\n    test(\"Order of transformations should match manual concat\", function() {\n      var m1, m2, s, theta, tx, ty;\n      tx = 10;\n      ty = 5;\n      theta = Math.PI / 3;\n      s = 2;\n      m1 = Matrix().translate(tx, ty).scale(s).rotate(theta);\n      m2 = Matrix().concat(Matrix.translation(tx, ty)).concat(Matrix.scale(s)).concat(Matrix.rotation(theta));\n      return matrixEqual(m1, m2);\n    });\n    return test(\"IDENTITY is immutable\", function() {\n      var identity;\n      identity = Matrix.IDENTITY;\n      identity.a = 5;\n      return equals(identity.a, 1);\n    });\n  });\n\n}).call(this);\n\n//# sourceURL=test/matrix.coffee",
                  "type": "blob"
                },
                "point": {
                  "path": "point",
                  "content": "(function() {\n  module.exports = function(x, y) {\n    return {\n      x: x,\n      y: y\n    };\n  };\n\n}).call(this);\n\n//# sourceURL=point.coffee",
                  "type": "blob"
                }
              },
              "progenitor": {
                "url": "http://strd6.github.io/editor/"
              },
              "version": "0.3.1",
              "entryPoint": "matrix",
              "repository": {
                "id": 13551996,
                "name": "matrix",
                "full_name": "distri/matrix",
                "owner": {
                  "login": "distri",
                  "id": 6005125,
                  "avatar_url": "https://identicons.github.com/f90c81ffc1498e260c820082f2e7ca5f.png",
                  "gravatar_id": null,
                  "url": "https://api.github.com/users/distri",
                  "html_url": "https://github.com/distri",
                  "followers_url": "https://api.github.com/users/distri/followers",
                  "following_url": "https://api.github.com/users/distri/following{/other_user}",
                  "gists_url": "https://api.github.com/users/distri/gists{/gist_id}",
                  "starred_url": "https://api.github.com/users/distri/starred{/owner}{/repo}",
                  "subscriptions_url": "https://api.github.com/users/distri/subscriptions",
                  "organizations_url": "https://api.github.com/users/distri/orgs",
                  "repos_url": "https://api.github.com/users/distri/repos",
                  "events_url": "https://api.github.com/users/distri/events{/privacy}",
                  "received_events_url": "https://api.github.com/users/distri/received_events",
                  "type": "Organization",
                  "site_admin": false
                },
                "private": false,
                "html_url": "https://github.com/distri/matrix",
                "description": "Where matrices become heroes, together.",
                "fork": false,
                "url": "https://api.github.com/repos/distri/matrix",
                "forks_url": "https://api.github.com/repos/distri/matrix/forks",
                "keys_url": "https://api.github.com/repos/distri/matrix/keys{/key_id}",
                "collaborators_url": "https://api.github.com/repos/distri/matrix/collaborators{/collaborator}",
                "teams_url": "https://api.github.com/repos/distri/matrix/teams",
                "hooks_url": "https://api.github.com/repos/distri/matrix/hooks",
                "issue_events_url": "https://api.github.com/repos/distri/matrix/issues/events{/number}",
                "events_url": "https://api.github.com/repos/distri/matrix/events",
                "assignees_url": "https://api.github.com/repos/distri/matrix/assignees{/user}",
                "branches_url": "https://api.github.com/repos/distri/matrix/branches{/branch}",
                "tags_url": "https://api.github.com/repos/distri/matrix/tags",
                "blobs_url": "https://api.github.com/repos/distri/matrix/git/blobs{/sha}",
                "git_tags_url": "https://api.github.com/repos/distri/matrix/git/tags{/sha}",
                "git_refs_url": "https://api.github.com/repos/distri/matrix/git/refs{/sha}",
                "trees_url": "https://api.github.com/repos/distri/matrix/git/trees{/sha}",
                "statuses_url": "https://api.github.com/repos/distri/matrix/statuses/{sha}",
                "languages_url": "https://api.github.com/repos/distri/matrix/languages",
                "stargazers_url": "https://api.github.com/repos/distri/matrix/stargazers",
                "contributors_url": "https://api.github.com/repos/distri/matrix/contributors",
                "subscribers_url": "https://api.github.com/repos/distri/matrix/subscribers",
                "subscription_url": "https://api.github.com/repos/distri/matrix/subscription",
                "commits_url": "https://api.github.com/repos/distri/matrix/commits{/sha}",
                "git_commits_url": "https://api.github.com/repos/distri/matrix/git/commits{/sha}",
                "comments_url": "https://api.github.com/repos/distri/matrix/comments{/number}",
                "issue_comment_url": "https://api.github.com/repos/distri/matrix/issues/comments/{number}",
                "contents_url": "https://api.github.com/repos/distri/matrix/contents/{+path}",
                "compare_url": "https://api.github.com/repos/distri/matrix/compare/{base}...{head}",
                "merges_url": "https://api.github.com/repos/distri/matrix/merges",
                "archive_url": "https://api.github.com/repos/distri/matrix/{archive_format}{/ref}",
                "downloads_url": "https://api.github.com/repos/distri/matrix/downloads",
                "issues_url": "https://api.github.com/repos/distri/matrix/issues{/number}",
                "pulls_url": "https://api.github.com/repos/distri/matrix/pulls{/number}",
                "milestones_url": "https://api.github.com/repos/distri/matrix/milestones{/number}",
                "notifications_url": "https://api.github.com/repos/distri/matrix/notifications{?since,all,participating}",
                "labels_url": "https://api.github.com/repos/distri/matrix/labels{/name}",
                "releases_url": "https://api.github.com/repos/distri/matrix/releases{/id}",
                "created_at": "2013-10-14T03:46:16Z",
                "updated_at": "2013-12-23T23:45:28Z",
                "pushed_at": "2013-10-15T00:22:51Z",
                "git_url": "git://github.com/distri/matrix.git",
                "ssh_url": "git@github.com:distri/matrix.git",
                "clone_url": "https://github.com/distri/matrix.git",
                "svn_url": "https://github.com/distri/matrix",
                "homepage": null,
                "size": 580,
                "stargazers_count": 0,
                "watchers_count": 0,
                "language": "CoffeeScript",
                "has_issues": true,
                "has_downloads": true,
                "has_wiki": true,
                "forks_count": 0,
                "mirror_url": null,
                "open_issues_count": 0,
                "forks": 0,
                "open_issues": 0,
                "watchers": 0,
                "default_branch": "master",
                "master_branch": "master",
                "permissions": {
                  "admin": true,
                  "push": true,
                  "pull": true
                },
                "organization": {
                  "login": "distri",
                  "id": 6005125,
                  "avatar_url": "https://identicons.github.com/f90c81ffc1498e260c820082f2e7ca5f.png",
                  "gravatar_id": null,
                  "url": "https://api.github.com/users/distri",
                  "html_url": "https://github.com/distri",
                  "followers_url": "https://api.github.com/users/distri/followers",
                  "following_url": "https://api.github.com/users/distri/following{/other_user}",
                  "gists_url": "https://api.github.com/users/distri/gists{/gist_id}",
                  "starred_url": "https://api.github.com/users/distri/starred{/owner}{/repo}",
                  "subscriptions_url": "https://api.github.com/users/distri/subscriptions",
                  "organizations_url": "https://api.github.com/users/distri/orgs",
                  "repos_url": "https://api.github.com/users/distri/repos",
                  "events_url": "https://api.github.com/users/distri/events{/privacy}",
                  "received_events_url": "https://api.github.com/users/distri/received_events",
                  "type": "Organization",
                  "site_admin": false
                },
                "network_count": 0,
                "subscribers_count": 1,
                "branch": "v0.3.1",
                "defaultBranch": "master"
              },
              "dependencies": {}
            },
            "random": {
              "source": {
                "LICENSE": {
                  "path": "LICENSE",
                  "mode": "100644",
                  "content": "The MIT License (MIT)\n\nCopyright (c) 2013 Daniel X Moore\n\nPermission is hereby granted, free of charge, to any person obtaining a copy of\nthis software and associated documentation files (the \"Software\"), to deal in\nthe Software without restriction, including without limitation the rights to\nuse, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of\nthe Software, and to permit persons to whom the Software is furnished to do so,\nsubject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS\nFOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR\nCOPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER\nIN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN\nCONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\n",
                  "type": "blob"
                },
                "README.md": {
                  "path": "README.md",
                  "mode": "100644",
                  "content": "random\n======\n\nRandom generation.\n",
                  "type": "blob"
                },
                "pixie.cson": {
                  "path": "pixie.cson",
                  "mode": "100644",
                  "content": "version: \"0.2.0\"\nentryPoint: \"random\"\n",
                  "type": "blob"
                },
                "random.coffee.md": {
                  "path": "random.coffee.md",
                  "mode": "100644",
                  "content": "Random\n======\n\nSome useful methods for generating random things.\n\nHelpers\n-------\n\n`τ` is the circle constant.\n\n    τ = 2 * Math.PI\n\n`U` returns a continuous uniform distribution between `min` and `max`.\n\n    U = (min, max) ->\n      ->\n        Math.random() * (max - min) + min\n\n`standardUniformDistribution` is the uniform distribution between [0, 1]\n\n    standardUniformDistribution = U(0, 1)\n\n`rand` is a helpful shortcut for generating random numbers from a standard\nuniform distribution or from a discreet set of integers.\n\n    rand = (n) ->\n      if n\n        Math.floor(n * standardUniformDistribution())\n      else\n        standardUniformDistribution()\n\nMethods\n-------\n\n    module.exports = Random =\n\nReturns a random angle, uniformly distributed, between 0 and τ.\n\n      angle: ->\n        rand() * τ\n\nA binomial distribution.\n\n      binomial: (n=1, p=0.5) ->\n        [0...n].map ->\n          if rand() < p\n            1\n          else\n            0\n        .reduce (a, b) ->\n          a + b\n        , 0\n\nReturns a random float between two numbers.\n\n      between: (min, max) ->\n        rand() * (max - min) + min\n\nReturns random integers from [0, n) if n is given.\nOtherwise returns random float between 0 and 1.\n\n      rand: rand\n\nReturns random float from [-n / 2, n / 2] if n is given.\nOtherwise returns random float between -0.5 and 0.5.\n\n      signed: (n=1) ->\n        (n * rand()) - (n / 2)\n",
                  "type": "blob"
                },
                "test/random.coffee": {
                  "path": "test/random.coffee",
                  "mode": "100644",
                  "content": "Random = require \"../random\"\n\nok = assert\nequals = assert.equal\ntest = it\n\ndescribe \"Random\", ->\n  \n  test \"methods\", ->\n    [\n      \"angle\"\n      \"binomial\"\n      \"between\"\n      \"rand\"\n      \"signed\"\n    ].forEach (name) ->\n      ok(Random[name], name)\n\n  it \"should have binomial\", ->\n    result = Random.binomial()\n\n    assert result is 1 or result is 0\n",
                  "type": "blob"
                }
              },
              "distribution": {
                "pixie": {
                  "path": "pixie",
                  "content": "module.exports = {\"version\":\"0.2.0\",\"entryPoint\":\"random\"};",
                  "type": "blob"
                },
                "random": {
                  "path": "random",
                  "content": "(function() {\n  var Random, U, rand, standardUniformDistribution, τ;\n\n  τ = 2 * Math.PI;\n\n  U = function(min, max) {\n    return function() {\n      return Math.random() * (max - min) + min;\n    };\n  };\n\n  standardUniformDistribution = U(0, 1);\n\n  rand = function(n) {\n    if (n) {\n      return Math.floor(n * standardUniformDistribution());\n    } else {\n      return standardUniformDistribution();\n    }\n  };\n\n  module.exports = Random = {\n    angle: function() {\n      return rand() * τ;\n    },\n    binomial: function(n, p) {\n      var _i, _results;\n      if (n == null) {\n        n = 1;\n      }\n      if (p == null) {\n        p = 0.5;\n      }\n      return (function() {\n        _results = [];\n        for (var _i = 0; 0 <= n ? _i < n : _i > n; 0 <= n ? _i++ : _i--){ _results.push(_i); }\n        return _results;\n      }).apply(this).map(function() {\n        if (rand() < p) {\n          return 1;\n        } else {\n          return 0;\n        }\n      }).reduce(function(a, b) {\n        return a + b;\n      }, 0);\n    },\n    between: function(min, max) {\n      return rand() * (max - min) + min;\n    },\n    rand: rand,\n    signed: function(n) {\n      if (n == null) {\n        n = 1;\n      }\n      return (n * rand()) - (n / 2);\n    }\n  };\n\n}).call(this);\n\n//# sourceURL=random.coffee",
                  "type": "blob"
                },
                "test/random": {
                  "path": "test/random",
                  "content": "(function() {\n  var Random, equals, ok, test;\n\n  Random = require(\"../random\");\n\n  ok = assert;\n\n  equals = assert.equal;\n\n  test = it;\n\n  describe(\"Random\", function() {\n    test(\"methods\", function() {\n      return [\"angle\", \"binomial\", \"between\", \"rand\", \"signed\"].forEach(function(name) {\n        return ok(Random[name], name);\n      });\n    });\n    return it(\"should have binomial\", function() {\n      var result;\n      result = Random.binomial();\n      return assert(result === 1 || result === 0);\n    });\n  });\n\n}).call(this);\n\n//# sourceURL=test/random.coffee",
                  "type": "blob"
                }
              },
              "progenitor": {
                "url": "http://strd6.github.io/editor/"
              },
              "version": "0.2.0",
              "entryPoint": "random",
              "repository": {
                "id": 13576812,
                "name": "random",
                "full_name": "distri/random",
                "owner": {
                  "login": "distri",
                  "id": 6005125,
                  "avatar_url": "https://identicons.github.com/f90c81ffc1498e260c820082f2e7ca5f.png",
                  "gravatar_id": null,
                  "url": "https://api.github.com/users/distri",
                  "html_url": "https://github.com/distri",
                  "followers_url": "https://api.github.com/users/distri/followers",
                  "following_url": "https://api.github.com/users/distri/following{/other_user}",
                  "gists_url": "https://api.github.com/users/distri/gists{/gist_id}",
                  "starred_url": "https://api.github.com/users/distri/starred{/owner}{/repo}",
                  "subscriptions_url": "https://api.github.com/users/distri/subscriptions",
                  "organizations_url": "https://api.github.com/users/distri/orgs",
                  "repos_url": "https://api.github.com/users/distri/repos",
                  "events_url": "https://api.github.com/users/distri/events{/privacy}",
                  "received_events_url": "https://api.github.com/users/distri/received_events",
                  "type": "Organization",
                  "site_admin": false
                },
                "private": false,
                "html_url": "https://github.com/distri/random",
                "description": "Random generation.",
                "fork": false,
                "url": "https://api.github.com/repos/distri/random",
                "forks_url": "https://api.github.com/repos/distri/random/forks",
                "keys_url": "https://api.github.com/repos/distri/random/keys{/key_id}",
                "collaborators_url": "https://api.github.com/repos/distri/random/collaborators{/collaborator}",
                "teams_url": "https://api.github.com/repos/distri/random/teams",
                "hooks_url": "https://api.github.com/repos/distri/random/hooks",
                "issue_events_url": "https://api.github.com/repos/distri/random/issues/events{/number}",
                "events_url": "https://api.github.com/repos/distri/random/events",
                "assignees_url": "https://api.github.com/repos/distri/random/assignees{/user}",
                "branches_url": "https://api.github.com/repos/distri/random/branches{/branch}",
                "tags_url": "https://api.github.com/repos/distri/random/tags",
                "blobs_url": "https://api.github.com/repos/distri/random/git/blobs{/sha}",
                "git_tags_url": "https://api.github.com/repos/distri/random/git/tags{/sha}",
                "git_refs_url": "https://api.github.com/repos/distri/random/git/refs{/sha}",
                "trees_url": "https://api.github.com/repos/distri/random/git/trees{/sha}",
                "statuses_url": "https://api.github.com/repos/distri/random/statuses/{sha}",
                "languages_url": "https://api.github.com/repos/distri/random/languages",
                "stargazers_url": "https://api.github.com/repos/distri/random/stargazers",
                "contributors_url": "https://api.github.com/repos/distri/random/contributors",
                "subscribers_url": "https://api.github.com/repos/distri/random/subscribers",
                "subscription_url": "https://api.github.com/repos/distri/random/subscription",
                "commits_url": "https://api.github.com/repos/distri/random/commits{/sha}",
                "git_commits_url": "https://api.github.com/repos/distri/random/git/commits{/sha}",
                "comments_url": "https://api.github.com/repos/distri/random/comments{/number}",
                "issue_comment_url": "https://api.github.com/repos/distri/random/issues/comments/{number}",
                "contents_url": "https://api.github.com/repos/distri/random/contents/{+path}",
                "compare_url": "https://api.github.com/repos/distri/random/compare/{base}...{head}",
                "merges_url": "https://api.github.com/repos/distri/random/merges",
                "archive_url": "https://api.github.com/repos/distri/random/{archive_format}{/ref}",
                "downloads_url": "https://api.github.com/repos/distri/random/downloads",
                "issues_url": "https://api.github.com/repos/distri/random/issues{/number}",
                "pulls_url": "https://api.github.com/repos/distri/random/pulls{/number}",
                "milestones_url": "https://api.github.com/repos/distri/random/milestones{/number}",
                "notifications_url": "https://api.github.com/repos/distri/random/notifications{?since,all,participating}",
                "labels_url": "https://api.github.com/repos/distri/random/labels{/name}",
                "releases_url": "https://api.github.com/repos/distri/random/releases{/id}",
                "created_at": "2013-10-15T00:28:31Z",
                "updated_at": "2013-12-06T23:31:24Z",
                "pushed_at": "2013-10-15T01:01:00Z",
                "git_url": "git://github.com/distri/random.git",
                "ssh_url": "git@github.com:distri/random.git",
                "clone_url": "https://github.com/distri/random.git",
                "svn_url": "https://github.com/distri/random",
                "homepage": null,
                "size": 292,
                "stargazers_count": 0,
                "watchers_count": 0,
                "language": "CoffeeScript",
                "has_issues": true,
                "has_downloads": true,
                "has_wiki": true,
                "forks_count": 0,
                "mirror_url": null,
                "open_issues_count": 0,
                "forks": 0,
                "open_issues": 0,
                "watchers": 0,
                "default_branch": "master",
                "master_branch": "master",
                "permissions": {
                  "admin": true,
                  "push": true,
                  "pull": true
                },
                "organization": {
                  "login": "distri",
                  "id": 6005125,
                  "avatar_url": "https://identicons.github.com/f90c81ffc1498e260c820082f2e7ca5f.png",
                  "gravatar_id": null,
                  "url": "https://api.github.com/users/distri",
                  "html_url": "https://github.com/distri",
                  "followers_url": "https://api.github.com/users/distri/followers",
                  "following_url": "https://api.github.com/users/distri/following{/other_user}",
                  "gists_url": "https://api.github.com/users/distri/gists{/gist_id}",
                  "starred_url": "https://api.github.com/users/distri/starred{/owner}{/repo}",
                  "subscriptions_url": "https://api.github.com/users/distri/subscriptions",
                  "organizations_url": "https://api.github.com/users/distri/orgs",
                  "repos_url": "https://api.github.com/users/distri/repos",
                  "events_url": "https://api.github.com/users/distri/events{/privacy}",
                  "received_events_url": "https://api.github.com/users/distri/received_events",
                  "type": "Organization",
                  "site_admin": false
                },
                "network_count": 0,
                "subscribers_count": 1,
                "branch": "v0.2.0",
                "defaultBranch": "master"
              },
              "dependencies": {}
            }
          }
        },
        "extensions": {
          "source": {
            "LICENSE": {
              "path": "LICENSE",
              "mode": "100644",
              "content": "The MIT License (MIT)\n\nCopyright (c) 2013 Daniel X Moore\n\nPermission is hereby granted, free of charge, to any person obtaining a copy of\nthis software and associated documentation files (the \"Software\"), to deal in\nthe Software without restriction, including without limitation the rights to\nuse, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of\nthe Software, and to permit persons to whom the Software is furnished to do so,\nsubject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS\nFOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR\nCOPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER\nIN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN\nCONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\n",
              "type": "blob"
            },
            "README.md": {
              "path": "README.md",
              "mode": "100644",
              "content": "Extensions\n==========\n\nExtend built-in prototypes with helpful methods.\n",
              "type": "blob"
            },
            "array.coffee.md": {
              "path": "array.coffee.md",
              "mode": "100644",
              "content": "Array\n=====\n\n    {extend} = require \"./util\"\n\n    extend Array.prototype,\n\nCalculate the average value of an array. Returns undefined if some elements\nare not numbers.\n\n      average: ->\n        @sum()/@length\n\n>     #! example\n>     [1, 3, 5, 7].average()\n\n----\n\nReturns a copy of the array without null and undefined values.\n\n      compact: ->\n        @select (element) ->\n          element?\n\n>     #! example\n>     [null, undefined, 3, 3, undefined, 5].compact()\n\n----\n\nCreates and returns a copy of the array. The copy contains\nthe same objects.\n\n      copy: ->\n        @concat()\n\n>     #! example\n>     a = [\"a\", \"b\", \"c\"]\n>     b = a.copy()\n>\n>     # their elements are equal\n>     a[0] == b[0] && a[1] == b[1] && a[2] == b[2]\n>     # => true\n>\n>     # but they aren't the same object in memory\n>     a is b\n>     # => false\n\n----\n\nEmpties the array of its contents. It is modified in place.\n\n      clear: ->\n        @length = 0\n\n        return this\n\n>     #! example\n>     fullArray = [1, 2, 3]\n>     fullArray.clear()\n>     fullArray\n\n----\n\nFlatten out an array of arrays into a single array of elements.\n\n      flatten: ->\n        @inject [], (a, b) ->\n          a.concat b\n\n>     #! example\n>     [[1, 2], [3, 4], 5].flatten()\n>     # => [1, 2, 3, 4, 5]\n>\n>     # won't flatten twice nested arrays. call\n>     # flatten twice if that is what you want\n>     [[1, 2], [3, [4, 5]], 6].flatten()\n>     # => [1, 2, 3, [4, 5], 6]\n\n----\n\nInvoke the named method on each element in the array\nand return a new array containing the results of the invocation.\n\n      invoke: (method, args...) ->\n        @map (element) ->\n          element[method].apply(element, args)\n\n>     #! example\n>     [1.1, 2.2, 3.3, 4.4].invoke(\"floor\")\n\n----\n\n>     #! example\n>     ['hello', 'world', 'cool!'].invoke('substring', 0, 3)\n\n----\n\nRandomly select an element from the array.\n\n      rand: ->\n        @[rand(@length)]\n\n>     #! example\n>     [1, 2, 3].rand()\n\n----\n\nRemove the first occurrence of the given object from the array if it is\npresent. The array is modified in place.\n\n      remove: (object) ->\n        index = @indexOf(object)\n\n        if index >= 0\n          @splice(index, 1)[0]\n        else\n          undefined\n\n>     #! example\n>     a = [1, 1, \"a\", \"b\"]\n>     a.remove(1)\n>     a\n\n----\n\nReturns true if the element is present in the array.\n\n      include: (element) ->\n        @indexOf(element) != -1\n\n>     #! example\n>     [\"a\", \"b\", \"c\"].include(\"c\")\n\n----\n\nCall the given iterator once for each element in the array,\npassing in the element as the first argument, the index of\nthe element as the second argument, and this array as the\nthird argument.\n\n      each: (iterator, context) ->\n        if @forEach\n          @forEach iterator, context\n        else\n          for element, i in this\n            iterator.call context, element, i, this\n\n        return this\n\n>     #! example\n>     word = \"\"\n>     indices = []\n>     [\"r\", \"a\", \"d\"].each (letter, index) ->\n>       word += letter\n>       indices.push(index)\n>\n>     # => [\"r\", \"a\", \"d\"]\n>\n>     word\n>     # => \"rad\"\n>\n>     indices\n\n----\n\nCall the given iterator once for each pair of objects in the array.\n\n      eachPair: (iterator, context) ->\n        length = @length\n        i = 0\n        while i < length\n          a = @[i]\n          j = i + 1\n          i += 1\n\n          while j < length\n            b = @[j]\n            j += 1\n\n            iterator.call context, a, b\n\n>     #! example\n>     results = []\n>     [1, 2, 3, 4].eachPair (a, b) ->\n>       results.push [a, b]\n>\n>     results\n\n----\n\nCall the given iterator once for each element in the array,\npassing in the element as the first argument and the given object\nas the second argument. Additional arguments are passed similar to\n`each`.\n\n      eachWithObject: (object, iterator, context) ->\n        @each (element, i, self) ->\n          iterator.call context, element, object, i, self\n\n        return object\n\nCall the given iterator once for each group of elements in the array,\npassing in the elements in groups of n. Additional arguments are\npassed as in `each`.\n\n      eachSlice: (n, iterator, context) ->\n        len = @length / n\n        i = -1\n\n        while ++i < len\n          iterator.call(context, @slice(i*n, (i+1)*n), i*n, this)\n\n        return this\n\n>     #! example\n>     results = []\n>     [1, 2, 3, 4].eachSlice 2, (slice) ->\n>       results.push(slice)\n>\n>     results\n\n----\n\nPipe the input through each function in the array in turn. For example, if you have a\nlist of objects you can perform a series of selection, sorting, and other processing\nmethods and then receive the processed list. This array must contain functions that\naccept a single input and return the processed input. The output of the first function\nis fed to the input of the second and so on until the final processed output is returned.\n\n      pipeline: (input) ->\n        @inject input, (input, fn) ->\n          fn(input)\n\nReturns a new array with the elements all shuffled up.\n\n      shuffle: ->\n        shuffledArray = []\n\n        @each (element) ->\n          shuffledArray.splice(rand(shuffledArray.length + 1), 0, element)\n\n        return shuffledArray\n\n>     #! example\n>     [0..9].shuffle()\n\n----\n\nReturns the first element of the array, undefined if the array is empty.\n\n      first: ->\n        @[0]\n\n>     #! example\n>     [\"first\", \"second\", \"third\"].first()\n\n----\n\nReturns the last element of the array, undefined if the array is empty.\n\n      last: ->\n        @[@length - 1]\n\n>     #! example\n>     [\"first\", \"second\", \"third\"].last()\n\n----\n\nReturns an object containing the extremes of this array.\n\n      extremes: (fn=identity) ->\n        min = max = undefined\n        minResult = maxResult = undefined\n\n        @each (object) ->\n          result = fn(object)\n\n          if min?\n            if result < minResult\n              min = object\n              minResult = result\n          else\n            min = object\n            minResult = result\n\n          if max?\n            if result > maxResult\n              max = object\n              maxResult = result\n          else\n            max = object\n            maxResult = result\n\n        min: min\n        max: max\n\n>     #! example\n>     [-1, 3, 0].extremes()\n\n----\n\n      maxima: (valueFunction=identity) ->\n        @inject([-Infinity, []], (memo, item) ->\n          value = valueFunction(item)\n          [maxValue, maxItems] = memo\n\n          if value > maxValue\n            [value, [item]]\n          else if value is maxValue\n            [value, maxItems.concat(item)]\n          else\n            memo\n        ).last()\n\n      maximum: (valueFunction) ->\n        @maxima(valueFunction).first()\n\n      minima: (valueFunction=identity) ->\n        inverseFn = (x) ->\n          -valueFunction(x)\n\n        @maxima(inverseFn)\n\n      minimum: (valueFunction) ->\n        @minima(valueFunction).first()\n\nPretend the array is a circle and grab a new array containing length elements.\nIf length is not given return the element at start, again assuming the array\nis a circle.\n\n      wrap: (start, length) ->\n        if length?\n          end = start + length\n          i = start\n          result = []\n\n          while i < end\n            result.push(@[mod(i, @length)])\n            i += 1\n\n          return result\n        else\n          return @[mod(start, @length)]\n\n>     #! example\n>     [1, 2, 3].wrap(-1)\n\n----\n\n>     #! example\n>     [1, 2, 3].wrap(6)\n\n----\n\n>     #! example\n>     [\"l\", \"o\", \"o\", \"p\"].wrap(0, 12)\n\n----\n\nPartitions the elements into two groups: those for which the iterator returns\ntrue, and those for which it returns false.\n\n      partition: (iterator, context) ->\n        trueCollection = []\n        falseCollection = []\n\n        @each (element) ->\n          if iterator.call(context, element)\n            trueCollection.push element\n          else\n            falseCollection.push element\n\n        return [trueCollection, falseCollection]\n\n>     #! example\n>     [0..9].partition (n) ->\n>       n % 2 is 0\n\n----\n\nReturn the group of elements for which the return value of the iterator is true.\n\n      select: (iterator, context) ->\n        return @partition(iterator, context)[0]\n\nReturn the group of elements that are not in the passed in set.\n\n      without: (values) ->\n        @reject (element) ->\n          values.include(element)\n\n>     #! example\n>     [1, 2, 3, 4].without [2, 3]\n\n----\n\nReturn the group of elements for which the return value of the iterator is false.\n\n      reject: (iterator, context) ->\n        @partition(iterator, context)[1]\n\nCombines all elements of the array by applying a binary operation.\nfor each element in the arra the iterator is passed an accumulator\nvalue (memo) and the element.\n\n      inject: (initial, iterator) ->\n        @each (element) ->\n          initial = iterator(initial, element)\n\n        return initial\n\nAdd all the elements in the array.\n\n      sum: ->\n        @inject 0, (sum, n) ->\n          sum + n\n\n>     #! example\n>     [1, 2, 3, 4].sum()\n\n----\n\nMultiply all the elements in the array.\n\n      product: ->\n        @inject 1, (product, n) ->\n          product * n\n\n>     #! example\n>     [1, 2, 3, 4].product()\n\n----\n\nProduce a duplicate-free version of the array.\n\n      unique: ->\n        @inject [], (results, element) ->\n          results.push element if results.indexOf(element) is -1\n\n          results\n\nMerges together the values of each of the arrays with the values at the corresponding position.\n\n      zip: (args...) ->\n        @map (element, index) ->\n          output = args.map (arr) ->\n            arr[index]\n\n          output.unshift(element)\n\n          return output\n\n>     #! example\n>     ['a', 'b', 'c'].zip([1, 2, 3])\n\n----\n\nHelpers\n-------\n\n    identity = (x) ->\n      x\n\n    rand = (n) ->\n      Math.floor n * Math.random()\n\n    mod = (n, base) ->\n      result = n % base\n\n      if result < 0 and base > 0\n        result += base\n\n      return result\n",
              "type": "blob"
            },
            "extensions.coffee.md": {
              "path": "extensions.coffee.md",
              "mode": "100644",
              "content": "Extensions\n==========\n\nExtend built in prototypes with additional behavior.\n\n    require \"./array\"\n    require \"./function\"\n    require \"./number\"\n    require \"./string\"\n",
              "type": "blob"
            },
            "function.coffee.md": {
              "path": "function.coffee.md",
              "mode": "100644",
              "content": "Function\n========\n\n    {extend} = require \"./util\"\n\nAdd our `Function` extensions.\n\n    extend Function.prototype,\n      once: ->\n        func = this\n\n        ran = false\n        memo = undefined\n\n        return ->\n          return memo if ran\n          ran = true\n\n          return memo = func.apply(this, arguments)\n\nCalling a debounced function will postpone its execution until after\nwait milliseconds have elapsed since the last time the function was\ninvoked. Useful for implementing behavior that should only happen after\nthe input has stopped arriving. For example: rendering a preview of a\nMarkdown comment, recalculating a layout after the window has stopped\nbeing resized...\n\n      debounce: (wait) ->\n        timeout = null\n        func = this\n\n        return ->\n          context = this\n          args = arguments\n\n          later = ->\n            timeout = null\n            func.apply(context, args)\n\n          clearTimeout(timeout)\n          timeout = setTimeout(later, wait)\n\n>     lazyLayout = calculateLayout.debounce(300)\n>     $(window).resize(lazyLayout)\n\n----\n\n      delay: (wait, args...) ->\n        func = this\n\n        setTimeout ->\n          func.apply(null, args)\n        , wait\n\n      defer: (args...) ->\n        this.delay.apply this, [1].concat(args)\n\n    extend Function,\n      identity: (x) ->\n        x\n\n      noop: ->\n",
              "type": "blob"
            },
            "number.coffee.md": {
              "path": "number.coffee.md",
              "mode": "100644",
              "content": "Number\n======\n\nReturns the absolute value of this number.\n\n>     #! example\n>     (-4).abs()\n\nReturns the mathematical ceiling of this number. The number truncated to the\nnearest integer of greater than or equal value.\n\n>     #! example\n>     4.2.ceil()\n\n---\n\n>     #! example\n>     (-1.2).ceil()\n\n---\n\nReturns the mathematical floor of this number. The number truncated to the\nnearest integer of less than or equal value.\n\n>     #! example\n>     4.9.floor()\n\n---\n\n>     #! example\n>     (-1.2).floor()\n\n---\n\nReturns this number rounded to the nearest integer.\n\n>     #! example\n>     4.5.round()\n\n---\n\n>     #! example\n>     4.4.round()\n\n---\n\n    [\n      \"abs\"\n      \"ceil\"\n      \"floor\"\n      \"round\"\n    ].forEach (method) ->\n      Number::[method] = ->\n        Math[method](this)\n\n    {extend} = require \"./util\"\n\n    extend Number.prototype,\n\nGet a bunch of points equally spaced around the unit circle.\n\n      circularPoints: ->\n        n = this\n\n        [0..n].map (i) ->\n          Point.fromAngle (i/n).turns\n\n>     #! example\n>     4.circularPoints()\n\n---\n\nReturns a number whose value is limited to the given range.\n\n      clamp: (min, max) ->\n        if min? and max?\n          Math.min(Math.max(this, min), max)\n        else if min?\n          Math.max(this, min)\n        else if max?\n          Math.min(this, max)\n        else\n          this\n\n>     #! example\n>     512.clamp(0, 255)\n\n---\n\nA mod method useful for array wrapping. The range of the function is\nconstrained to remain in bounds of array indices.\n\n      mod: (base) ->\n        result = this % base;\n\n        if result < 0 && base > 0\n          result += base\n\n        return result\n\n>     #! example\n>     (-1).mod(5)\n\n---\n\nGet the sign of this number as an integer (1, -1, or 0).\n\n      sign: ->\n        if this > 0\n          1\n        else if this < 0\n          -1\n        else\n          0\n\n>     #! example\n>     5.sign()\n\n---\n\nReturns true if this number is even (evenly divisible by 2).\n\n      even: ->\n        @mod(2) is 0\n\n>     #! example\n>     2.even()\n\n---\n\nReturns true if this number is odd (has remainder of 1 when divided by 2).\n\n      odd: ->\n        @mod(2) is 1\n\n>     #! example\n>     3.odd()\n\n---\n\nCalls iterator the specified number of times, passing in the number of the\ncurrent iteration as a parameter: 0 on first call, 1 on the second call, etc.\n\n      times: (iterator, context) ->\n        i = -1\n\n        while ++i < this\n          iterator.call context, i\n\n        return i\n\n>     #! example\n>     output = []\n>\n>     5.times (n) ->\n>       output.push(n)\n>\n>     output\n\n---\n\nReturns the the nearest grid resolution less than or equal to the number.\n\n      snap: (resolution) ->\n        (n / resolution).floor() * resolution\n\n>     #! example\n>     7.snap(8)\n\n---\n\n      truncate: ->\n        if this > 0\n          @floor()\n        else if this < 0\n          @ceil()\n        else\n          this\n\nConvert a number to an amount of rotations.\n\n    unless 5.rotations\n      Object.defineProperty Number::, 'rotations',\n        get: ->\n          this * Math.TAU\n\n    unless 1.rotation\n      Object.defineProperty Number::, 'rotation',\n        get: ->\n          this * Math.TAU\n\n>     #! example\n>     0.5.rotations\n\n---\n\nConvert a number to an amount of rotations.\n\n    unless 5.turns\n      Object.defineProperty Number.prototype, 'turns',\n        get: ->\n          this * Math.TAU\n\n    unless 1.turn\n      Object.defineProperty Number.prototype, 'turn',\n        get: ->\n          this * Math.TAU\n\n>     #! example\n>     0.5.turns\n\n---\n\nConvert a number to an amount of degrees.\n\n    unless 2.degrees\n      Object.defineProperty Number::, 'degrees',\n        get: ->\n          this * Math.TAU / 360\n\n    unless 1.degree\n      Object.defineProperty Number::, 'degree',\n        get: ->\n          this * Math.TAU / 360\n\n>     #! example\n>     180.degrees\n\n---\n\nExtra\n-----\n\nThe mathematical circle constant of 1 turn.\n\n    Math.TAU = 2 * Math.PI\n",
              "type": "blob"
            },
            "pixie.cson": {
              "path": "pixie.cson",
              "mode": "100644",
              "content": "version: \"0.2.0\"\nentryPoint: \"extensions\"\n",
              "type": "blob"
            },
            "string.coffee.md": {
              "path": "string.coffee.md",
              "mode": "100644",
              "content": "String\n======\n\nExtend strings with utility methods.\n\n    {extend} = require \"./util\"\n\n    extend String.prototype,\n\nReturns true if this string only contains whitespace characters.\n\n      blank: ->\n        /^\\s*$/.test(this)\n\n>     #! example\n>     \"   \".blank()\n\n---\n\nParse this string as though it is JSON and return the object it represents. If it\nis not valid JSON returns the string itself.\n\n      parse: () ->\n        try\n          JSON.parse(this.toString())\n        catch e\n          this.toString()\n\n>     #! example\n>     # this is valid json, so an object is returned\n>     '{\"a\": 3}'.parse()\n\n---\n\nReturns true if this string starts with the given string.\n\n      startsWith: (str) ->\n        @lastIndexOf(str, 0) is 0\n\nReturns true if this string ends with the given string.\n\n      endsWith: (str) ->\n        @indexOf(str, @length - str.length) != -1\n\nGet the file extension of a string.\n\n      extension: ->\n        if extension = this.match(/\\.([^\\.]*)$/, '')?.last()\n          extension\n        else\n          ''\n\n>     #! example\n>     \"README.md\".extension()\n\n---\n\nAssumes the string is something like a file name and returns the\ncontents of the string without the extension.\n\n      withoutExtension: ->\n        this.replace(/\\.[^\\.]*$/, '')\n\n      toInt: (base=10) ->\n        parseInt(this, base)\n\n>     #! example\n>     \"neat.png\".witouthExtension()\n\n---\n",
              "type": "blob"
            },
            "test/array.coffee": {
              "path": "test/array.coffee",
              "mode": "100644",
              "content": "require \"../array\"\n\nok = assert\nequals = assert.equal\ntest = it\n\ndescribe \"Array\", ->\n\n  test \"#average\", ->\n    equals [1, 3, 5, 7].average(), 4\n  \n  test \"#compact\", ->\n    a = [0, 1, undefined, 2, null, 3, '', 4]\n  \n    compacted = a.compact()\n  \n    equals(compacted[0], 0)\n    equals(compacted[1], 1)\n    equals(compacted[2], 2)\n    equals(compacted[3], 3)\n    equals(compacted[4], '')\n    equals(compacted[5], 4)\n  \n  test \"#copy\", ->\n    a = [1,2,3]\n    b = a.copy()\n  \n    ok a != b, \"Original array is not the same array as the copied one\"\n    ok a.length == b.length, \"Both arrays are the same size\"\n    ok a[0] == b[0] && a[1] == b[1] && a[2] == b[2], \"The elements of the two arrays are equal\"\n  \n  test \"#flatten\", ->\n    array = [[0,1], [2,3], [4,5]]\n  \n    flattenedArray = array.flatten()\n  \n    equals flattenedArray.length, 6, \"Flattened array length should equal number of elements in sub-arrays\"\n    equals flattenedArray.first(), 0, \"First element should be first element in first sub-array\"\n    equals flattenedArray.last(), 5, \"Last element should be last element in last sub-array\"\n  \n  test \"#rand\", ->\n    array = [1,2,3]\n  \n    ok array.indexOf(array.rand()) != -1, \"Array includes randomly selected element\"\n    ok [5].rand() == 5, \"[5].rand() === 5\"\n    ok [].rand() == undefined, \"[].rand() === undefined\"\n  \n  test \"#remove\", ->\n    equals [1,2,3].remove(2), 2, \"[1,2,3].remove(2) === 2\"\n    equals [1,3].remove(2), undefined, \"[1,3].remove(2) === undefined\"\n    equals [1,3].remove(3), 3, \"[1,3].remove(3) === 3\"\n  \n    array = [1,2,3]\n    array.remove(2)\n    ok array.length == 2, \"array = [1,2,3]; array.remove(2); array.length === 2\"\n    array.remove(3)\n    ok array.length == 1, \"array = [1,3]; array.remove(3); array.length === 1\"\n  \n  test \"#map\", ->\n    equals [1].map((x) -> return x + 1 )[0], 2\n  \n  test \"#invoke\", ->\n    results = ['hello', 'world', 'cool!'].invoke('substring', 0, 3)\n  \n    equals results[0], \"hel\"\n    equals results[1], \"wor\"\n    equals results[2], \"coo\"\n  \n  test \"#each\", ->\n    array = [1, 2, 3]\n    count = 0\n  \n    equals array, array.each -> count++\n    equals array.length, count\n  \n  test \"#eachPair\", ->\n    array = [1, 2, 3]\n    sum = 0\n  \n    array.eachPair (a, b) ->\n      sum += a + b\n  \n    equals(sum, 12)\n  \n  test \"#eachWithObject\", ->\n    array = [1, 2, 3]\n  \n    result = array.eachWithObject {}, (element, hash) ->\n      hash[element] = (element + 1).toString()\n  \n    equals result[1], \"2\"\n    equals result[2], \"3\"\n    equals result[3], \"4\"\n  \n  test \"#shuffle\", ->\n    array = [0, 1, 2, 3, 4, 5]\n  \n    shuffledArray = array.shuffle()\n  \n    shuffledArray.each (element) ->\n      ok array.indexOf(element) >= 0, \"Every element in shuffled array is in orig array\"\n  \n    array.each (element) ->\n      ok shuffledArray.indexOf(element) >= 0, \"Every element in orig array is in shuffled array\"\n  \n  test \"#first\", ->\n    equals [2].first(), 2\n    equals [1, 2, 3].first(), 1\n    equals [].first(), undefined\n  \n  test \"#last\", ->\n    equals [2].last(), 2\n    equals [1, 2, 3].last(), 3\n    equals [].first(), undefined\n  \n  test \"#maxima\", ->\n    maxima = [-52, 0, 78].maxima()\n  \n    maxima.each (n) ->\n      equals n, 78\n  \n    maxima = [0, 0, 1, 0, 1, 0, 1, 0].maxima()\n  \n    equals 3, maxima.length\n  \n    maxima.each (n) ->\n      equals n, 1\n  \n  test \"#maximum\", ->\n    equals [-345, 38, 8347].maximum(), 8347\n  \n  test \"#maximum with function\", ->\n    equals [3, 4, 5].maximum((n) ->\n      n % 4\n    ), 3\n  \n  test \"#minima\", ->\n    minima = [-52, 0, 78].minima()\n  \n    minima.each (n) ->\n      equals n, -52\n  \n    minima = [0, 0, 1, 0, 1, 0, 1, 0].minima()\n  \n    equals 5, minima.length\n  \n    minima.each (n) ->\n      equals n, 0\n  \n  test \"#minimum\", ->\n    equals [-345, 38, 8347].minimum(), -345\n  \n  test \"#pipeline\", ->\n    pipe = [\n      (x) -> x * x\n      (x) -> x - 10\n    ]\n  \n    equals pipe.pipeline(5), 15\n  \n  test \"#extremes\", ->\n    array = [-7, 1, 11, 94]\n  \n    extremes = array.extremes()\n  \n    equals extremes.min, -7, \"Min is -7\"\n    equals extremes.max, 94, \"Max is 94\"\n  \n  test \"#extremes with fn\", ->\n    array = [1, 11, 94]\n\n    extremes = array.extremes (value) ->\n      value % 11\n\n    equals extremes.min, 11, extremes.min\n    equals extremes.max, 94, extremes.max\n\n  test \"#sum\", ->\n    equals [].sum(), 0, \"Empty array sums to zero\"\n    equals [2].sum(), 2, \"[2] sums to 2\"\n    equals [1, 2, 3, 4, 5].sum(), 15, \"[1, 2, 3, 4, 5] sums to 15\"\n  \n  test \"#eachSlice\", ->\n    [1, 2, 3, 4, 5, 6].eachSlice 2, (array) ->\n      equals array[0] % 2, 1\n      equals array[1] % 2, 0\n  \n  test \"#without\", ->\n    array = [1, 2, 3, 4]\n  \n    excluded = array.without([2, 4])\n  \n    equals excluded[0], 1\n    equals excluded[1], 3\n  \n  test \"#clear\", ->\n    array = [1, 2, 3, 4]\n  \n    equals array.length, 4\n    equals array[0], 1\n  \n    array.clear()\n  \n    equals array.length, 0\n    equals array[0], undefined\n  \n  test \"#unique\", ->\n    array = [0, 0, 0, 1, 1, 1, 2, 3]\n  \n    equals array.unique().first(), 0\n    equals array.unique().last(), 3\n    equals array.unique().length, 4\n  \n  test \"#wrap\", ->\n    array = [0, 1, 2, 3, 4]\n  \n    equals array.wrap(0), 0\n    equals array.wrap(-1), 4\n    equals array.wrap(2), 2\n  \n  test \"#zip\", ->\n    a = [1, 2, 3]\n    b = [4, 5, 6]\n    c = [7, 8]\n  \n    output = a.zip(b, c)\n  \n    equals output[0][0], 1\n    equals output[0][1], 4\n    equals output[0][2], 7\n  \n    equals output[2][2], undefined\n",
              "type": "blob"
            },
            "test/function.coffee": {
              "path": "test/function.coffee",
              "mode": "100644",
              "content": "require \"../function\"\n\nok = assert\nequals = assert.equal\ntest = it\n\ndescribe \"Function\", ->\n\n  test \"#once\", ->\n    score = 0\n  \n    addScore = ->\n      score += 100\n  \n    onceScore = addScore.once()\n  \n    [0..9].map ->\n      onceScore()\n  \n    equals score, 100\n  \n  test \".identity\", ->\n    I = Function.identity\n  \n    [0, 1, true, false, null, undefined].each (x) ->\n      equals I(x), x\n  \n  test \"#debounce\", (done) ->\n    fn = (-> ok true; done()).debounce(1)\n  \n    # Though called multiple times the function is only triggered once\n    fn()\n    fn()\n    fn()\n  \n  test \"#delay\", (done) ->\n    fn = (x, y) ->\n      equals x, 3\n      equals y, \"testy\"\n      done()\n  \n    fn.delay 25, 3, \"testy\"\n  \n  test \"#defer\", (done) ->\n    fn = (x) ->\n      equals x, 3\n      done()\n  \n    fn.defer 3\n",
              "type": "blob"
            },
            "test/number.coffee": {
              "path": "test/number.coffee",
              "mode": "100644",
              "content": "require \"../number\"\n\nok = assert\nequals = assert.equal\ntest = it\n\nequalEnough = (expected, actual, tolerance, message) ->\n  message ||= \"#{expected} within #{tolerance} of #{actual}\"\n\n  ok(expected + tolerance >= actual && expected - tolerance <= actual, message)\n  \ndescribe \"Number\", ->\n  \n  test \"#abs\", ->\n    equals 5.abs(), 5, \"(5).abs() equals 5\"\n    equals 4.2.abs(), 4.2, \"(4.2).abs() equals 4.2\"\n    equals (-1.2).abs(), 1.2, \"(-1.2).abs() equals 1.2\"\n    equals 0.abs(), 0, \"(0).abs() equals 0\"\n  \n  test \"#ceil\", ->\n    equals 4.9.ceil(), 5, \"(4.9).floor() equals 5\"\n    equals 4.2.ceil(), 5, \"(4.2).ceil() equals 5\"\n    equals (-1.2).ceil(), -1, \"(-1.2).ceil() equals -1\"\n    equals 3.ceil(), 3, \"(3).ceil() equals 3\"\n  \n  test \"#clamp\", ->\n    equals 5.clamp(0, 3), 3\n    equals 5.clamp(-1, 0), 0\n    equals (-5).clamp(0, 1), 0\n    equals 1.clamp(0, null), 1\n    equals (-1).clamp(0, null), 0\n    equals (-10).clamp(-5, 0), -5\n    equals (-10).clamp(null, 0), -10\n    equals 50.clamp(null, 10), 10\n  \n  test \"#floor\", ->\n    equals 4.9.floor(), 4, \"(4.9).floor() equals 4\"\n    equals 4.2.floor(), 4, \"(4.2).floor() equals 4\"\n    equals (-1.2).floor(), -2, \"(-1.2).floor() equals -2\"\n    equals 3.floor(), 3, \"(3).floor() equals 3\"\n  \n  test \"#round\", ->\n    equals 4.5.round(), 5, \"(4.5).round() equals 5\"\n    equals 4.4.round(), 4, \"(4.4).round() equals 4\"\n  \n  test \"#sign\", ->\n    equals 5.sign(), 1, \"Positive number's sign is 1\"\n    equals (-3).sign(), -1, \"Negative number's sign is -1\"\n    equals 0.sign(), 0, \"Zero's sign is 0\"\n  \n  test \"#even\", ->\n    [0, 2, -32].each (n) ->\n      ok n.even(), \"#{n} is even\"\n  \n    [1, -1, 2.2, -3.784].each (n) ->\n      equals n.even(), false, \"#{n} is not even\"\n  \n  test \"#odd\", ->\n    [1, 9, -37].each (n) ->\n      ok n.odd(), \"#{n} is odd\"\n  \n    [0, 32, 2.2, -1.1].each (n) ->\n      equals n.odd(), false, \"#{n} is not odd\"\n  \n  test \"#times\", ->\n    n = 5\n    equals n.times(->), n, \"returns n\"\n  \n  test \"#times called correct amount\", ->\n    n = 5\n    count = 0\n  \n    n.times -> count++\n  \n    equals n, count, \"returns n\"\n  \n  test \"#mod should have a positive result when used with a positive base and a negative number\", ->\n    n = -3\n  \n    equals n.mod(8), 5, \"Should 'wrap' and be positive.\"\n  \n  test \"#degrees\", ->\n    equals 180.degrees, Math.PI\n    equals 1.degree, Math.TAU / 360\n  \n  test \"#rotations\", ->\n    equals 1.rotation, Math.TAU\n    equals 0.5.rotations, Math.TAU / 2\n  \n  test \"#turns\", ->\n    equals 1.turn, Math.TAU\n    equals 0.5.turns, Math.TAU / 2\n",
              "type": "blob"
            },
            "test/string.coffee": {
              "path": "test/string.coffee",
              "mode": "100644",
              "content": "require \"../string\"\n\nok = assert\nequals = assert.equal\ntest = it\n\ndescribe \"String\", ->\n  \n  test \"#blank\", ->\n    equals \"  \".blank(), true, \"A string containing only whitespace should be blank\"\n    equals \"a\".blank(), false, \"A string that contains a letter should not be blank\"\n    equals \"  a \".blank(), false\n    equals \"  \\n\\t \".blank(), true\n  \n  test \"#extension\", ->\n    equals \"README\".extension(), \"\"\n    equals \"README.md\".extension(), \"md\"\n    equals \"jquery.min.js\".extension(), \"js\"\n    equals \"src/bouse.js.coffee\".extension(), \"coffee\"\n  \n  test \"#parse\", ->\n    equals \"true\".parse(), true, \"parsing 'true' should equal boolean true\"\n    equals \"false\".parse(), false, \"parsing 'true' should equal boolean true\"\n    equals \"7.2\".parse(), 7.2, \"numbers should be cool too\"\n  \n    equals '{\"val\": \"a string\"}'.parse().val, \"a string\", \"even parsing objects works\"\n  \n    ok ''.parse() == '', \"Empty string parses to exactly the empty string\"\n  \n  test \"#startsWith\", ->\n    ok \"cool\".startsWith(\"coo\")\n    equals \"cool\".startsWith(\"oo\"), false\n  \n  test \"#toInt\", ->\n    equals \"31.3\".toInt(), 31\n    equals \"31.\".toInt(), 31\n    equals \"-1.02\".toInt(), -1\n  \n    equals \"009\".toInt(), 9\n    equals \"0109\".toInt(), 109\n  \n    equals \"F\".toInt(16), 15\n  \n  test \"#withoutExtension\", ->\n    equals \"neat.png\".withoutExtension(), \"neat\"\n    equals \"not a file\".withoutExtension(), \"not a file\"\n",
              "type": "blob"
            },
            "util.coffee.md": {
              "path": "util.coffee.md",
              "mode": "100644",
              "content": "Util\n====\n\nUtility methods shared in our extensions.\n\n    module.exports =\n\nExtend an object with the properties of other objects.\n\n      extend: (target, sources...) ->\n        for source in sources\n          for name of source\n            target[name] = source[name]\n\n        return target\n",
              "type": "blob"
            }
          },
          "distribution": {
            "array": {
              "path": "array",
              "content": "(function() {\n  var extend, identity, mod, rand,\n    __slice = [].slice;\n\n  extend = require(\"./util\").extend;\n\n  extend(Array.prototype, {\n    average: function() {\n      return this.sum() / this.length;\n    },\n    compact: function() {\n      return this.select(function(element) {\n        return element != null;\n      });\n    },\n    copy: function() {\n      return this.concat();\n    },\n    clear: function() {\n      this.length = 0;\n      return this;\n    },\n    flatten: function() {\n      return this.inject([], function(a, b) {\n        return a.concat(b);\n      });\n    },\n    invoke: function() {\n      var args, method;\n      method = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];\n      return this.map(function(element) {\n        return element[method].apply(element, args);\n      });\n    },\n    rand: function() {\n      return this[rand(this.length)];\n    },\n    remove: function(object) {\n      var index;\n      index = this.indexOf(object);\n      if (index >= 0) {\n        return this.splice(index, 1)[0];\n      } else {\n        return void 0;\n      }\n    },\n    include: function(element) {\n      return this.indexOf(element) !== -1;\n    },\n    each: function(iterator, context) {\n      var element, i, _i, _len;\n      if (this.forEach) {\n        this.forEach(iterator, context);\n      } else {\n        for (i = _i = 0, _len = this.length; _i < _len; i = ++_i) {\n          element = this[i];\n          iterator.call(context, element, i, this);\n        }\n      }\n      return this;\n    },\n    eachPair: function(iterator, context) {\n      var a, b, i, j, length, _results;\n      length = this.length;\n      i = 0;\n      _results = [];\n      while (i < length) {\n        a = this[i];\n        j = i + 1;\n        i += 1;\n        _results.push((function() {\n          var _results1;\n          _results1 = [];\n          while (j < length) {\n            b = this[j];\n            j += 1;\n            _results1.push(iterator.call(context, a, b));\n          }\n          return _results1;\n        }).call(this));\n      }\n      return _results;\n    },\n    eachWithObject: function(object, iterator, context) {\n      this.each(function(element, i, self) {\n        return iterator.call(context, element, object, i, self);\n      });\n      return object;\n    },\n    eachSlice: function(n, iterator, context) {\n      var i, len;\n      len = this.length / n;\n      i = -1;\n      while (++i < len) {\n        iterator.call(context, this.slice(i * n, (i + 1) * n), i * n, this);\n      }\n      return this;\n    },\n    pipeline: function(input) {\n      return this.inject(input, function(input, fn) {\n        return fn(input);\n      });\n    },\n    shuffle: function() {\n      var shuffledArray;\n      shuffledArray = [];\n      this.each(function(element) {\n        return shuffledArray.splice(rand(shuffledArray.length + 1), 0, element);\n      });\n      return shuffledArray;\n    },\n    first: function() {\n      return this[0];\n    },\n    last: function() {\n      return this[this.length - 1];\n    },\n    extremes: function(fn) {\n      var max, maxResult, min, minResult;\n      if (fn == null) {\n        fn = identity;\n      }\n      min = max = void 0;\n      minResult = maxResult = void 0;\n      this.each(function(object) {\n        var result;\n        result = fn(object);\n        if (min != null) {\n          if (result < minResult) {\n            min = object;\n            minResult = result;\n          }\n        } else {\n          min = object;\n          minResult = result;\n        }\n        if (max != null) {\n          if (result > maxResult) {\n            max = object;\n            return maxResult = result;\n          }\n        } else {\n          max = object;\n          return maxResult = result;\n        }\n      });\n      return {\n        min: min,\n        max: max\n      };\n    },\n    maxima: function(valueFunction) {\n      if (valueFunction == null) {\n        valueFunction = identity;\n      }\n      return this.inject([-Infinity, []], function(memo, item) {\n        var maxItems, maxValue, value;\n        value = valueFunction(item);\n        maxValue = memo[0], maxItems = memo[1];\n        if (value > maxValue) {\n          return [value, [item]];\n        } else if (value === maxValue) {\n          return [value, maxItems.concat(item)];\n        } else {\n          return memo;\n        }\n      }).last();\n    },\n    maximum: function(valueFunction) {\n      return this.maxima(valueFunction).first();\n    },\n    minima: function(valueFunction) {\n      var inverseFn;\n      if (valueFunction == null) {\n        valueFunction = identity;\n      }\n      inverseFn = function(x) {\n        return -valueFunction(x);\n      };\n      return this.maxima(inverseFn);\n    },\n    minimum: function(valueFunction) {\n      return this.minima(valueFunction).first();\n    },\n    wrap: function(start, length) {\n      var end, i, result;\n      if (length != null) {\n        end = start + length;\n        i = start;\n        result = [];\n        while (i < end) {\n          result.push(this[mod(i, this.length)]);\n          i += 1;\n        }\n        return result;\n      } else {\n        return this[mod(start, this.length)];\n      }\n    },\n    partition: function(iterator, context) {\n      var falseCollection, trueCollection;\n      trueCollection = [];\n      falseCollection = [];\n      this.each(function(element) {\n        if (iterator.call(context, element)) {\n          return trueCollection.push(element);\n        } else {\n          return falseCollection.push(element);\n        }\n      });\n      return [trueCollection, falseCollection];\n    },\n    select: function(iterator, context) {\n      return this.partition(iterator, context)[0];\n    },\n    without: function(values) {\n      return this.reject(function(element) {\n        return values.include(element);\n      });\n    },\n    reject: function(iterator, context) {\n      return this.partition(iterator, context)[1];\n    },\n    inject: function(initial, iterator) {\n      this.each(function(element) {\n        return initial = iterator(initial, element);\n      });\n      return initial;\n    },\n    sum: function() {\n      return this.inject(0, function(sum, n) {\n        return sum + n;\n      });\n    },\n    product: function() {\n      return this.inject(1, function(product, n) {\n        return product * n;\n      });\n    },\n    unique: function() {\n      return this.inject([], function(results, element) {\n        if (results.indexOf(element) === -1) {\n          results.push(element);\n        }\n        return results;\n      });\n    },\n    zip: function() {\n      var args;\n      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];\n      return this.map(function(element, index) {\n        var output;\n        output = args.map(function(arr) {\n          return arr[index];\n        });\n        output.unshift(element);\n        return output;\n      });\n    }\n  });\n\n  identity = function(x) {\n    return x;\n  };\n\n  rand = function(n) {\n    return Math.floor(n * Math.random());\n  };\n\n  mod = function(n, base) {\n    var result;\n    result = n % base;\n    if (result < 0 && base > 0) {\n      result += base;\n    }\n    return result;\n  };\n\n}).call(this);\n\n//# sourceURL=array.coffee",
              "type": "blob"
            },
            "extensions": {
              "path": "extensions",
              "content": "(function() {\n  require(\"./array\");\n\n  require(\"./function\");\n\n  require(\"./number\");\n\n  require(\"./string\");\n\n}).call(this);\n\n//# sourceURL=extensions.coffee",
              "type": "blob"
            },
            "function": {
              "path": "function",
              "content": "(function() {\n  var extend,\n    __slice = [].slice;\n\n  extend = require(\"./util\").extend;\n\n  extend(Function.prototype, {\n    once: function() {\n      var func, memo, ran;\n      func = this;\n      ran = false;\n      memo = void 0;\n      return function() {\n        if (ran) {\n          return memo;\n        }\n        ran = true;\n        return memo = func.apply(this, arguments);\n      };\n    },\n    debounce: function(wait) {\n      var func, timeout;\n      timeout = null;\n      func = this;\n      return function() {\n        var args, context, later;\n        context = this;\n        args = arguments;\n        later = function() {\n          timeout = null;\n          return func.apply(context, args);\n        };\n        clearTimeout(timeout);\n        return timeout = setTimeout(later, wait);\n      };\n    },\n    delay: function() {\n      var args, func, wait;\n      wait = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];\n      func = this;\n      return setTimeout(function() {\n        return func.apply(null, args);\n      }, wait);\n    },\n    defer: function() {\n      var args;\n      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];\n      return this.delay.apply(this, [1].concat(args));\n    }\n  });\n\n  extend(Function, {\n    identity: function(x) {\n      return x;\n    },\n    noop: function() {}\n  });\n\n}).call(this);\n\n//# sourceURL=function.coffee",
              "type": "blob"
            },
            "number": {
              "path": "number",
              "content": "(function() {\n  var extend;\n\n  [\"abs\", \"ceil\", \"floor\", \"round\"].forEach(function(method) {\n    return Number.prototype[method] = function() {\n      return Math[method](this);\n    };\n  });\n\n  extend = require(\"./util\").extend;\n\n  extend(Number.prototype, {\n    circularPoints: function() {\n      var n, _i, _results;\n      n = this;\n      return (function() {\n        _results = [];\n        for (var _i = 0; 0 <= n ? _i <= n : _i >= n; 0 <= n ? _i++ : _i--){ _results.push(_i); }\n        return _results;\n      }).apply(this).map(function(i) {\n        return Point.fromAngle((i / n).turns);\n      });\n    },\n    clamp: function(min, max) {\n      if ((min != null) && (max != null)) {\n        return Math.min(Math.max(this, min), max);\n      } else if (min != null) {\n        return Math.max(this, min);\n      } else if (max != null) {\n        return Math.min(this, max);\n      } else {\n        return this;\n      }\n    },\n    mod: function(base) {\n      var result;\n      result = this % base;\n      if (result < 0 && base > 0) {\n        result += base;\n      }\n      return result;\n    },\n    sign: function() {\n      if (this > 0) {\n        return 1;\n      } else if (this < 0) {\n        return -1;\n      } else {\n        return 0;\n      }\n    },\n    even: function() {\n      return this.mod(2) === 0;\n    },\n    odd: function() {\n      return this.mod(2) === 1;\n    },\n    times: function(iterator, context) {\n      var i;\n      i = -1;\n      while (++i < this) {\n        iterator.call(context, i);\n      }\n      return i;\n    },\n    snap: function(resolution) {\n      return (n / resolution).floor() * resolution;\n    },\n    truncate: function() {\n      if (this > 0) {\n        return this.floor();\n      } else if (this < 0) {\n        return this.ceil();\n      } else {\n        return this;\n      }\n    }\n  });\n\n  if (!5..rotations) {\n    Object.defineProperty(Number.prototype, 'rotations', {\n      get: function() {\n        return this * Math.TAU;\n      }\n    });\n  }\n\n  if (!1..rotation) {\n    Object.defineProperty(Number.prototype, 'rotation', {\n      get: function() {\n        return this * Math.TAU;\n      }\n    });\n  }\n\n  if (!5..turns) {\n    Object.defineProperty(Number.prototype, 'turns', {\n      get: function() {\n        return this * Math.TAU;\n      }\n    });\n  }\n\n  if (!1..turn) {\n    Object.defineProperty(Number.prototype, 'turn', {\n      get: function() {\n        return this * Math.TAU;\n      }\n    });\n  }\n\n  if (!2..degrees) {\n    Object.defineProperty(Number.prototype, 'degrees', {\n      get: function() {\n        return this * Math.TAU / 360;\n      }\n    });\n  }\n\n  if (!1..degree) {\n    Object.defineProperty(Number.prototype, 'degree', {\n      get: function() {\n        return this * Math.TAU / 360;\n      }\n    });\n  }\n\n  Math.TAU = 2 * Math.PI;\n\n}).call(this);\n\n//# sourceURL=number.coffee",
              "type": "blob"
            },
            "pixie": {
              "path": "pixie",
              "content": "module.exports = {\"version\":\"0.2.0\",\"entryPoint\":\"extensions\"};",
              "type": "blob"
            },
            "string": {
              "path": "string",
              "content": "(function() {\n  var extend;\n\n  extend = require(\"./util\").extend;\n\n  extend(String.prototype, {\n    blank: function() {\n      return /^\\s*$/.test(this);\n    },\n    parse: function() {\n      var e;\n      try {\n        return JSON.parse(this.toString());\n      } catch (_error) {\n        e = _error;\n        return this.toString();\n      }\n    },\n    startsWith: function(str) {\n      return this.lastIndexOf(str, 0) === 0;\n    },\n    endsWith: function(str) {\n      return this.indexOf(str, this.length - str.length) !== -1;\n    },\n    extension: function() {\n      var extension, _ref;\n      if (extension = (_ref = this.match(/\\.([^\\.]*)$/, '')) != null ? _ref.last() : void 0) {\n        return extension;\n      } else {\n        return '';\n      }\n    },\n    withoutExtension: function() {\n      return this.replace(/\\.[^\\.]*$/, '');\n    },\n    toInt: function(base) {\n      if (base == null) {\n        base = 10;\n      }\n      return parseInt(this, base);\n    }\n  });\n\n}).call(this);\n\n//# sourceURL=string.coffee",
              "type": "blob"
            },
            "test/array": {
              "path": "test/array",
              "content": "(function() {\n  var equals, ok, test;\n\n  require(\"../array\");\n\n  ok = assert;\n\n  equals = assert.equal;\n\n  test = it;\n\n  describe(\"Array\", function() {\n    test(\"#average\", function() {\n      return equals([1, 3, 5, 7].average(), 4);\n    });\n    test(\"#compact\", function() {\n      var a, compacted;\n      a = [0, 1, void 0, 2, null, 3, '', 4];\n      compacted = a.compact();\n      equals(compacted[0], 0);\n      equals(compacted[1], 1);\n      equals(compacted[2], 2);\n      equals(compacted[3], 3);\n      equals(compacted[4], '');\n      return equals(compacted[5], 4);\n    });\n    test(\"#copy\", function() {\n      var a, b;\n      a = [1, 2, 3];\n      b = a.copy();\n      ok(a !== b, \"Original array is not the same array as the copied one\");\n      ok(a.length === b.length, \"Both arrays are the same size\");\n      return ok(a[0] === b[0] && a[1] === b[1] && a[2] === b[2], \"The elements of the two arrays are equal\");\n    });\n    test(\"#flatten\", function() {\n      var array, flattenedArray;\n      array = [[0, 1], [2, 3], [4, 5]];\n      flattenedArray = array.flatten();\n      equals(flattenedArray.length, 6, \"Flattened array length should equal number of elements in sub-arrays\");\n      equals(flattenedArray.first(), 0, \"First element should be first element in first sub-array\");\n      return equals(flattenedArray.last(), 5, \"Last element should be last element in last sub-array\");\n    });\n    test(\"#rand\", function() {\n      var array;\n      array = [1, 2, 3];\n      ok(array.indexOf(array.rand()) !== -1, \"Array includes randomly selected element\");\n      ok([5].rand() === 5, \"[5].rand() === 5\");\n      return ok([].rand() === void 0, \"[].rand() === undefined\");\n    });\n    test(\"#remove\", function() {\n      var array;\n      equals([1, 2, 3].remove(2), 2, \"[1,2,3].remove(2) === 2\");\n      equals([1, 3].remove(2), void 0, \"[1,3].remove(2) === undefined\");\n      equals([1, 3].remove(3), 3, \"[1,3].remove(3) === 3\");\n      array = [1, 2, 3];\n      array.remove(2);\n      ok(array.length === 2, \"array = [1,2,3]; array.remove(2); array.length === 2\");\n      array.remove(3);\n      return ok(array.length === 1, \"array = [1,3]; array.remove(3); array.length === 1\");\n    });\n    test(\"#map\", function() {\n      return equals([1].map(function(x) {\n        return x + 1;\n      })[0], 2);\n    });\n    test(\"#invoke\", function() {\n      var results;\n      results = ['hello', 'world', 'cool!'].invoke('substring', 0, 3);\n      equals(results[0], \"hel\");\n      equals(results[1], \"wor\");\n      return equals(results[2], \"coo\");\n    });\n    test(\"#each\", function() {\n      var array, count;\n      array = [1, 2, 3];\n      count = 0;\n      equals(array, array.each(function() {\n        return count++;\n      }));\n      return equals(array.length, count);\n    });\n    test(\"#eachPair\", function() {\n      var array, sum;\n      array = [1, 2, 3];\n      sum = 0;\n      array.eachPair(function(a, b) {\n        return sum += a + b;\n      });\n      return equals(sum, 12);\n    });\n    test(\"#eachWithObject\", function() {\n      var array, result;\n      array = [1, 2, 3];\n      result = array.eachWithObject({}, function(element, hash) {\n        return hash[element] = (element + 1).toString();\n      });\n      equals(result[1], \"2\");\n      equals(result[2], \"3\");\n      return equals(result[3], \"4\");\n    });\n    test(\"#shuffle\", function() {\n      var array, shuffledArray;\n      array = [0, 1, 2, 3, 4, 5];\n      shuffledArray = array.shuffle();\n      shuffledArray.each(function(element) {\n        return ok(array.indexOf(element) >= 0, \"Every element in shuffled array is in orig array\");\n      });\n      return array.each(function(element) {\n        return ok(shuffledArray.indexOf(element) >= 0, \"Every element in orig array is in shuffled array\");\n      });\n    });\n    test(\"#first\", function() {\n      equals([2].first(), 2);\n      equals([1, 2, 3].first(), 1);\n      return equals([].first(), void 0);\n    });\n    test(\"#last\", function() {\n      equals([2].last(), 2);\n      equals([1, 2, 3].last(), 3);\n      return equals([].first(), void 0);\n    });\n    test(\"#maxima\", function() {\n      var maxima;\n      maxima = [-52, 0, 78].maxima();\n      maxima.each(function(n) {\n        return equals(n, 78);\n      });\n      maxima = [0, 0, 1, 0, 1, 0, 1, 0].maxima();\n      equals(3, maxima.length);\n      return maxima.each(function(n) {\n        return equals(n, 1);\n      });\n    });\n    test(\"#maximum\", function() {\n      return equals([-345, 38, 8347].maximum(), 8347);\n    });\n    test(\"#maximum with function\", function() {\n      return equals([3, 4, 5].maximum(function(n) {\n        return n % 4;\n      }), 3);\n    });\n    test(\"#minima\", function() {\n      var minima;\n      minima = [-52, 0, 78].minima();\n      minima.each(function(n) {\n        return equals(n, -52);\n      });\n      minima = [0, 0, 1, 0, 1, 0, 1, 0].minima();\n      equals(5, minima.length);\n      return minima.each(function(n) {\n        return equals(n, 0);\n      });\n    });\n    test(\"#minimum\", function() {\n      return equals([-345, 38, 8347].minimum(), -345);\n    });\n    test(\"#pipeline\", function() {\n      var pipe;\n      pipe = [\n        function(x) {\n          return x * x;\n        }, function(x) {\n          return x - 10;\n        }\n      ];\n      return equals(pipe.pipeline(5), 15);\n    });\n    test(\"#extremes\", function() {\n      var array, extremes;\n      array = [-7, 1, 11, 94];\n      extremes = array.extremes();\n      equals(extremes.min, -7, \"Min is -7\");\n      return equals(extremes.max, 94, \"Max is 94\");\n    });\n    test(\"#extremes with fn\", function() {\n      var array, extremes;\n      array = [1, 11, 94];\n      extremes = array.extremes(function(value) {\n        return value % 11;\n      });\n      equals(extremes.min, 11, extremes.min);\n      return equals(extremes.max, 94, extremes.max);\n    });\n    test(\"#sum\", function() {\n      equals([].sum(), 0, \"Empty array sums to zero\");\n      equals([2].sum(), 2, \"[2] sums to 2\");\n      return equals([1, 2, 3, 4, 5].sum(), 15, \"[1, 2, 3, 4, 5] sums to 15\");\n    });\n    test(\"#eachSlice\", function() {\n      return [1, 2, 3, 4, 5, 6].eachSlice(2, function(array) {\n        equals(array[0] % 2, 1);\n        return equals(array[1] % 2, 0);\n      });\n    });\n    test(\"#without\", function() {\n      var array, excluded;\n      array = [1, 2, 3, 4];\n      excluded = array.without([2, 4]);\n      equals(excluded[0], 1);\n      return equals(excluded[1], 3);\n    });\n    test(\"#clear\", function() {\n      var array;\n      array = [1, 2, 3, 4];\n      equals(array.length, 4);\n      equals(array[0], 1);\n      array.clear();\n      equals(array.length, 0);\n      return equals(array[0], void 0);\n    });\n    test(\"#unique\", function() {\n      var array;\n      array = [0, 0, 0, 1, 1, 1, 2, 3];\n      equals(array.unique().first(), 0);\n      equals(array.unique().last(), 3);\n      return equals(array.unique().length, 4);\n    });\n    test(\"#wrap\", function() {\n      var array;\n      array = [0, 1, 2, 3, 4];\n      equals(array.wrap(0), 0);\n      equals(array.wrap(-1), 4);\n      return equals(array.wrap(2), 2);\n    });\n    return test(\"#zip\", function() {\n      var a, b, c, output;\n      a = [1, 2, 3];\n      b = [4, 5, 6];\n      c = [7, 8];\n      output = a.zip(b, c);\n      equals(output[0][0], 1);\n      equals(output[0][1], 4);\n      equals(output[0][2], 7);\n      return equals(output[2][2], void 0);\n    });\n  });\n\n}).call(this);\n\n//# sourceURL=test/array.coffee",
              "type": "blob"
            },
            "test/function": {
              "path": "test/function",
              "content": "(function() {\n  var equals, ok, test;\n\n  require(\"../function\");\n\n  ok = assert;\n\n  equals = assert.equal;\n\n  test = it;\n\n  describe(\"Function\", function() {\n    test(\"#once\", function() {\n      var addScore, onceScore, score;\n      score = 0;\n      addScore = function() {\n        return score += 100;\n      };\n      onceScore = addScore.once();\n      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(function() {\n        return onceScore();\n      });\n      return equals(score, 100);\n    });\n    test(\".identity\", function() {\n      var I;\n      I = Function.identity;\n      return [0, 1, true, false, null, void 0].each(function(x) {\n        return equals(I(x), x);\n      });\n    });\n    test(\"#debounce\", function(done) {\n      var fn;\n      fn = (function() {\n        ok(true);\n        return done();\n      }).debounce(1);\n      fn();\n      fn();\n      return fn();\n    });\n    test(\"#delay\", function(done) {\n      var fn;\n      fn = function(x, y) {\n        equals(x, 3);\n        equals(y, \"testy\");\n        return done();\n      };\n      return fn.delay(25, 3, \"testy\");\n    });\n    return test(\"#defer\", function(done) {\n      var fn;\n      fn = function(x) {\n        equals(x, 3);\n        return done();\n      };\n      return fn.defer(3);\n    });\n  });\n\n}).call(this);\n\n//# sourceURL=test/function.coffee",
              "type": "blob"
            },
            "test/number": {
              "path": "test/number",
              "content": "(function() {\n  var equalEnough, equals, ok, test;\n\n  require(\"../number\");\n\n  ok = assert;\n\n  equals = assert.equal;\n\n  test = it;\n\n  equalEnough = function(expected, actual, tolerance, message) {\n    message || (message = \"\" + expected + \" within \" + tolerance + \" of \" + actual);\n    return ok(expected + tolerance >= actual && expected - tolerance <= actual, message);\n  };\n\n  describe(\"Number\", function() {\n    test(\"#abs\", function() {\n      equals(5..abs(), 5, \"(5).abs() equals 5\");\n      equals(4.2.abs(), 4.2, \"(4.2).abs() equals 4.2\");\n      equals((-1.2).abs(), 1.2, \"(-1.2).abs() equals 1.2\");\n      return equals(0..abs(), 0, \"(0).abs() equals 0\");\n    });\n    test(\"#ceil\", function() {\n      equals(4.9.ceil(), 5, \"(4.9).floor() equals 5\");\n      equals(4.2.ceil(), 5, \"(4.2).ceil() equals 5\");\n      equals((-1.2).ceil(), -1, \"(-1.2).ceil() equals -1\");\n      return equals(3..ceil(), 3, \"(3).ceil() equals 3\");\n    });\n    test(\"#clamp\", function() {\n      equals(5..clamp(0, 3), 3);\n      equals(5..clamp(-1, 0), 0);\n      equals((-5).clamp(0, 1), 0);\n      equals(1..clamp(0, null), 1);\n      equals((-1).clamp(0, null), 0);\n      equals((-10).clamp(-5, 0), -5);\n      equals((-10).clamp(null, 0), -10);\n      return equals(50..clamp(null, 10), 10);\n    });\n    test(\"#floor\", function() {\n      equals(4.9.floor(), 4, \"(4.9).floor() equals 4\");\n      equals(4.2.floor(), 4, \"(4.2).floor() equals 4\");\n      equals((-1.2).floor(), -2, \"(-1.2).floor() equals -2\");\n      return equals(3..floor(), 3, \"(3).floor() equals 3\");\n    });\n    test(\"#round\", function() {\n      equals(4.5.round(), 5, \"(4.5).round() equals 5\");\n      return equals(4.4.round(), 4, \"(4.4).round() equals 4\");\n    });\n    test(\"#sign\", function() {\n      equals(5..sign(), 1, \"Positive number's sign is 1\");\n      equals((-3).sign(), -1, \"Negative number's sign is -1\");\n      return equals(0..sign(), 0, \"Zero's sign is 0\");\n    });\n    test(\"#even\", function() {\n      [0, 2, -32].each(function(n) {\n        return ok(n.even(), \"\" + n + \" is even\");\n      });\n      return [1, -1, 2.2, -3.784].each(function(n) {\n        return equals(n.even(), false, \"\" + n + \" is not even\");\n      });\n    });\n    test(\"#odd\", function() {\n      [1, 9, -37].each(function(n) {\n        return ok(n.odd(), \"\" + n + \" is odd\");\n      });\n      return [0, 32, 2.2, -1.1].each(function(n) {\n        return equals(n.odd(), false, \"\" + n + \" is not odd\");\n      });\n    });\n    test(\"#times\", function() {\n      var n;\n      n = 5;\n      return equals(n.times(function() {}), n, \"returns n\");\n    });\n    test(\"#times called correct amount\", function() {\n      var count, n;\n      n = 5;\n      count = 0;\n      n.times(function() {\n        return count++;\n      });\n      return equals(n, count, \"returns n\");\n    });\n    test(\"#mod should have a positive result when used with a positive base and a negative number\", function() {\n      var n;\n      n = -3;\n      return equals(n.mod(8), 5, \"Should 'wrap' and be positive.\");\n    });\n    test(\"#degrees\", function() {\n      equals(180..degrees, Math.PI);\n      return equals(1..degree, Math.TAU / 360);\n    });\n    test(\"#rotations\", function() {\n      equals(1..rotation, Math.TAU);\n      return equals(0.5.rotations, Math.TAU / 2);\n    });\n    return test(\"#turns\", function() {\n      equals(1..turn, Math.TAU);\n      return equals(0.5.turns, Math.TAU / 2);\n    });\n  });\n\n}).call(this);\n\n//# sourceURL=test/number.coffee",
              "type": "blob"
            },
            "test/string": {
              "path": "test/string",
              "content": "(function() {\n  var equals, ok, test;\n\n  require(\"../string\");\n\n  ok = assert;\n\n  equals = assert.equal;\n\n  test = it;\n\n  describe(\"String\", function() {\n    test(\"#blank\", function() {\n      equals(\"  \".blank(), true, \"A string containing only whitespace should be blank\");\n      equals(\"a\".blank(), false, \"A string that contains a letter should not be blank\");\n      equals(\"  a \".blank(), false);\n      return equals(\"  \\n\\t \".blank(), true);\n    });\n    test(\"#extension\", function() {\n      equals(\"README\".extension(), \"\");\n      equals(\"README.md\".extension(), \"md\");\n      equals(\"jquery.min.js\".extension(), \"js\");\n      return equals(\"src/bouse.js.coffee\".extension(), \"coffee\");\n    });\n    test(\"#parse\", function() {\n      equals(\"true\".parse(), true, \"parsing 'true' should equal boolean true\");\n      equals(\"false\".parse(), false, \"parsing 'true' should equal boolean true\");\n      equals(\"7.2\".parse(), 7.2, \"numbers should be cool too\");\n      equals('{\"val\": \"a string\"}'.parse().val, \"a string\", \"even parsing objects works\");\n      return ok(''.parse() === '', \"Empty string parses to exactly the empty string\");\n    });\n    test(\"#startsWith\", function() {\n      ok(\"cool\".startsWith(\"coo\"));\n      return equals(\"cool\".startsWith(\"oo\"), false);\n    });\n    test(\"#toInt\", function() {\n      equals(\"31.3\".toInt(), 31);\n      equals(\"31.\".toInt(), 31);\n      equals(\"-1.02\".toInt(), -1);\n      equals(\"009\".toInt(), 9);\n      equals(\"0109\".toInt(), 109);\n      return equals(\"F\".toInt(16), 15);\n    });\n    return test(\"#withoutExtension\", function() {\n      equals(\"neat.png\".withoutExtension(), \"neat\");\n      return equals(\"not a file\".withoutExtension(), \"not a file\");\n    });\n  });\n\n}).call(this);\n\n//# sourceURL=test/string.coffee",
              "type": "blob"
            },
            "util": {
              "path": "util",
              "content": "(function() {\n  var __slice = [].slice;\n\n  module.exports = {\n    extend: function() {\n      var name, source, sources, target, _i, _len;\n      target = arguments[0], sources = 2 <= arguments.length ? __slice.call(arguments, 1) : [];\n      for (_i = 0, _len = sources.length; _i < _len; _i++) {\n        source = sources[_i];\n        for (name in source) {\n          target[name] = source[name];\n        }\n      }\n      return target;\n    }\n  };\n\n}).call(this);\n\n//# sourceURL=util.coffee",
              "type": "blob"
            }
          },
          "progenitor": {
            "url": "http://strd6.github.io/editor/"
          },
          "version": "0.2.0",
          "entryPoint": "extensions",
          "repository": {
            "id": 13577503,
            "name": "extensions",
            "full_name": "distri/extensions",
            "owner": {
              "login": "distri",
              "id": 6005125,
              "avatar_url": "https://identicons.github.com/f90c81ffc1498e260c820082f2e7ca5f.png",
              "gravatar_id": null,
              "url": "https://api.github.com/users/distri",
              "html_url": "https://github.com/distri",
              "followers_url": "https://api.github.com/users/distri/followers",
              "following_url": "https://api.github.com/users/distri/following{/other_user}",
              "gists_url": "https://api.github.com/users/distri/gists{/gist_id}",
              "starred_url": "https://api.github.com/users/distri/starred{/owner}{/repo}",
              "subscriptions_url": "https://api.github.com/users/distri/subscriptions",
              "organizations_url": "https://api.github.com/users/distri/orgs",
              "repos_url": "https://api.github.com/users/distri/repos",
              "events_url": "https://api.github.com/users/distri/events{/privacy}",
              "received_events_url": "https://api.github.com/users/distri/received_events",
              "type": "Organization",
              "site_admin": false
            },
            "private": false,
            "html_url": "https://github.com/distri/extensions",
            "description": "",
            "fork": false,
            "url": "https://api.github.com/repos/distri/extensions",
            "forks_url": "https://api.github.com/repos/distri/extensions/forks",
            "keys_url": "https://api.github.com/repos/distri/extensions/keys{/key_id}",
            "collaborators_url": "https://api.github.com/repos/distri/extensions/collaborators{/collaborator}",
            "teams_url": "https://api.github.com/repos/distri/extensions/teams",
            "hooks_url": "https://api.github.com/repos/distri/extensions/hooks",
            "issue_events_url": "https://api.github.com/repos/distri/extensions/issues/events{/number}",
            "events_url": "https://api.github.com/repos/distri/extensions/events",
            "assignees_url": "https://api.github.com/repos/distri/extensions/assignees{/user}",
            "branches_url": "https://api.github.com/repos/distri/extensions/branches{/branch}",
            "tags_url": "https://api.github.com/repos/distri/extensions/tags",
            "blobs_url": "https://api.github.com/repos/distri/extensions/git/blobs{/sha}",
            "git_tags_url": "https://api.github.com/repos/distri/extensions/git/tags{/sha}",
            "git_refs_url": "https://api.github.com/repos/distri/extensions/git/refs{/sha}",
            "trees_url": "https://api.github.com/repos/distri/extensions/git/trees{/sha}",
            "statuses_url": "https://api.github.com/repos/distri/extensions/statuses/{sha}",
            "languages_url": "https://api.github.com/repos/distri/extensions/languages",
            "stargazers_url": "https://api.github.com/repos/distri/extensions/stargazers",
            "contributors_url": "https://api.github.com/repos/distri/extensions/contributors",
            "subscribers_url": "https://api.github.com/repos/distri/extensions/subscribers",
            "subscription_url": "https://api.github.com/repos/distri/extensions/subscription",
            "commits_url": "https://api.github.com/repos/distri/extensions/commits{/sha}",
            "git_commits_url": "https://api.github.com/repos/distri/extensions/git/commits{/sha}",
            "comments_url": "https://api.github.com/repos/distri/extensions/comments{/number}",
            "issue_comment_url": "https://api.github.com/repos/distri/extensions/issues/comments/{number}",
            "contents_url": "https://api.github.com/repos/distri/extensions/contents/{+path}",
            "compare_url": "https://api.github.com/repos/distri/extensions/compare/{base}...{head}",
            "merges_url": "https://api.github.com/repos/distri/extensions/merges",
            "archive_url": "https://api.github.com/repos/distri/extensions/{archive_format}{/ref}",
            "downloads_url": "https://api.github.com/repos/distri/extensions/downloads",
            "issues_url": "https://api.github.com/repos/distri/extensions/issues{/number}",
            "pulls_url": "https://api.github.com/repos/distri/extensions/pulls{/number}",
            "milestones_url": "https://api.github.com/repos/distri/extensions/milestones{/number}",
            "notifications_url": "https://api.github.com/repos/distri/extensions/notifications{?since,all,participating}",
            "labels_url": "https://api.github.com/repos/distri/extensions/labels{/name}",
            "releases_url": "https://api.github.com/repos/distri/extensions/releases{/id}",
            "created_at": "2013-10-15T01:14:11Z",
            "updated_at": "2013-12-24T01:04:48Z",
            "pushed_at": "2013-12-24T01:04:20Z",
            "git_url": "git://github.com/distri/extensions.git",
            "ssh_url": "git@github.com:distri/extensions.git",
            "clone_url": "https://github.com/distri/extensions.git",
            "svn_url": "https://github.com/distri/extensions",
            "homepage": null,
            "size": 964,
            "stargazers_count": 0,
            "watchers_count": 0,
            "language": "CoffeeScript",
            "has_issues": true,
            "has_downloads": true,
            "has_wiki": true,
            "forks_count": 0,
            "mirror_url": null,
            "open_issues_count": 0,
            "forks": 0,
            "open_issues": 0,
            "watchers": 0,
            "default_branch": "master",
            "master_branch": "master",
            "permissions": {
              "admin": true,
              "push": true,
              "pull": true
            },
            "organization": {
              "login": "distri",
              "id": 6005125,
              "avatar_url": "https://identicons.github.com/f90c81ffc1498e260c820082f2e7ca5f.png",
              "gravatar_id": null,
              "url": "https://api.github.com/users/distri",
              "html_url": "https://github.com/distri",
              "followers_url": "https://api.github.com/users/distri/followers",
              "following_url": "https://api.github.com/users/distri/following{/other_user}",
              "gists_url": "https://api.github.com/users/distri/gists{/gist_id}",
              "starred_url": "https://api.github.com/users/distri/starred{/owner}{/repo}",
              "subscriptions_url": "https://api.github.com/users/distri/subscriptions",
              "organizations_url": "https://api.github.com/users/distri/orgs",
              "repos_url": "https://api.github.com/users/distri/repos",
              "events_url": "https://api.github.com/users/distri/events{/privacy}",
              "received_events_url": "https://api.github.com/users/distri/received_events",
              "type": "Organization",
              "site_admin": false
            },
            "network_count": 0,
            "subscribers_count": 1,
            "branch": "v0.2.0",
            "defaultBranch": "master"
          },
          "dependencies": {}
        },
        "core": {
          "source": {
            "LICENSE": {
              "path": "LICENSE",
              "mode": "100644",
              "content": "The MIT License (MIT)\n\nCopyright (c) 2013 Daniel X Moore\n\nPermission is hereby granted, free of charge, to any person obtaining a copy of\nthis software and associated documentation files (the \"Software\"), to deal in\nthe Software without restriction, including without limitation the rights to\nuse, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of\nthe Software, and to permit persons to whom the Software is furnished to do so,\nsubject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS\nFOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR\nCOPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER\nIN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN\nCONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\n",
              "type": "blob"
            },
            "README.md": {
              "path": "README.md",
              "mode": "100644",
              "content": "core\n====\n\nAn object extension system.\n",
              "type": "blob"
            },
            "core.coffee.md": {
              "path": "core.coffee.md",
              "mode": "100644",
              "content": "Core\n====\n\nThe Core module is used to add extended functionality to objects without\nextending `Object.prototype` directly.\n\n    Core = (I={}, self={}) ->\n      extend self,\n\nExternal access to instance variables. Use of this property should be avoided\nin general, but can come in handy from time to time.\n\n>     #! example\n>     I =\n>       r: 255\n>       g: 0\n>       b: 100\n>\n>     myObject = Core(I)\n>\n>     [myObject.I.r, myObject.I.g, myObject.I.b]\n\n        I: I\n\nGenerates a public jQuery style getter / setter method for each `String` argument.\n\n>     #! example\n>     myObject = Core\n>       r: 255\n>       g: 0\n>       b: 100\n>\n>     myObject.attrAccessor \"r\", \"g\", \"b\"\n>\n>     myObject.r(254)\n\n        attrAccessor: (attrNames...) ->\n          attrNames.forEach (attrName) ->\n            self[attrName] = (newValue) ->\n              if arguments.length > 0\n                I[attrName] = newValue\n\n                return self\n              else\n                I[attrName]\n\n          return self\n\nGenerates a public jQuery style getter method for each String argument.\n\n>     #! example\n>     myObject = Core\n>       r: 255\n>       g: 0\n>       b: 100\n>\n>     myObject.attrReader \"r\", \"g\", \"b\"\n>\n>     [myObject.r(), myObject.g(), myObject.b()]\n\n        attrReader: (attrNames...) ->\n          attrNames.forEach (attrName) ->\n            self[attrName] = ->\n              I[attrName]\n\n          return self\n\nExtends this object with methods from the passed in object. A shortcut for Object.extend(self, methods)\n\n>     I =\n>       x: 30\n>       y: 40\n>       maxSpeed: 5\n>\n>     # we are using extend to give player\n>     # additional methods that Core doesn't have\n>     player = Core(I).extend\n>       increaseSpeed: ->\n>         I.maxSpeed += 1\n>\n>     player.increaseSpeed()\n\n        extend: (objects...) ->\n          extend self, objects...\n\nIncludes a module in this object. A module is a constructor that takes two parameters, `I` and `self`\n\n>     myObject = Core()\n>     myObject.include(Bindable)\n\n>     # now you can bind handlers to functions\n>     myObject.bind \"someEvent\", ->\n>       alert(\"wow. that was easy.\")\n\n        include: (modules...) ->\n          for Module in modules\n            Module(I, self)\n\n          return self\n\n      return self\n\nHelpers\n-------\n\nExtend an object with the properties of other objects.\n\n    extend = (target, sources...) ->\n      for source in sources\n        for name of source\n          target[name] = source[name]\n\n      return target\n\nExport\n\n    module.exports = Core\n",
              "type": "blob"
            },
            "pixie.cson": {
              "path": "pixie.cson",
              "mode": "100644",
              "content": "entryPoint: \"core\"\nversion: \"0.6.0\"\n",
              "type": "blob"
            },
            "test/core.coffee": {
              "path": "test/core.coffee",
              "mode": "100644",
              "content": "Core = require \"../core\"\n\nok = assert\nequals = assert.equal\ntest = it\n\ndescribe \"Core\", ->\n\n  test \"#extend\", ->\n    o = Core()\n  \n    o.extend\n      test: \"jawsome\"\n  \n    equals o.test, \"jawsome\"\n  \n  test \"#attrAccessor\", ->\n    o = Core\n      test: \"my_val\"\n  \n    o.attrAccessor(\"test\")\n  \n    equals o.test(), \"my_val\"\n    equals o.test(\"new_val\"), o\n    equals o.test(), \"new_val\"\n  \n  test \"#attrReader\", ->\n    o = Core\n      test: \"my_val\"\n  \n    o.attrReader(\"test\")\n  \n    equals o.test(), \"my_val\"\n    equals o.test(\"new_val\"), \"my_val\"\n    equals o.test(), \"my_val\"\n  \n  test \"#include\", ->\n    o = Core\n      test: \"my_val\"\n  \n    M = (I, self) ->\n      self.attrReader \"test\"\n  \n      self.extend\n        test2: \"cool\"\n  \n    ret = o.include M\n  \n    equals ret, o, \"Should return self\"\n  \n    equals o.test(), \"my_val\"\n    equals o.test2, \"cool\"\n  \n  test \"#include multiple\", ->\n    o = Core\n      test: \"my_val\"\n  \n    M = (I, self) ->\n      self.attrReader \"test\"\n  \n      self.extend\n        test2: \"cool\"\n  \n    M2 = (I, self) ->\n      self.extend\n        test2: \"coolio\"\n  \n    o.include M, M2\n  \n    equals o.test2, \"coolio\"\n",
              "type": "blob"
            }
          },
          "distribution": {
            "core": {
              "path": "core",
              "content": "(function() {\n  var Core, extend,\n    __slice = [].slice;\n\n  Core = function(I, self) {\n    if (I == null) {\n      I = {};\n    }\n    if (self == null) {\n      self = {};\n    }\n    extend(self, {\n      I: I,\n      attrAccessor: function() {\n        var attrNames;\n        attrNames = 1 <= arguments.length ? __slice.call(arguments, 0) : [];\n        attrNames.forEach(function(attrName) {\n          return self[attrName] = function(newValue) {\n            if (arguments.length > 0) {\n              I[attrName] = newValue;\n              return self;\n            } else {\n              return I[attrName];\n            }\n          };\n        });\n        return self;\n      },\n      attrReader: function() {\n        var attrNames;\n        attrNames = 1 <= arguments.length ? __slice.call(arguments, 0) : [];\n        attrNames.forEach(function(attrName) {\n          return self[attrName] = function() {\n            return I[attrName];\n          };\n        });\n        return self;\n      },\n      extend: function() {\n        var objects;\n        objects = 1 <= arguments.length ? __slice.call(arguments, 0) : [];\n        return extend.apply(null, [self].concat(__slice.call(objects)));\n      },\n      include: function() {\n        var Module, modules, _i, _len;\n        modules = 1 <= arguments.length ? __slice.call(arguments, 0) : [];\n        for (_i = 0, _len = modules.length; _i < _len; _i++) {\n          Module = modules[_i];\n          Module(I, self);\n        }\n        return self;\n      }\n    });\n    return self;\n  };\n\n  extend = function() {\n    var name, source, sources, target, _i, _len;\n    target = arguments[0], sources = 2 <= arguments.length ? __slice.call(arguments, 1) : [];\n    for (_i = 0, _len = sources.length; _i < _len; _i++) {\n      source = sources[_i];\n      for (name in source) {\n        target[name] = source[name];\n      }\n    }\n    return target;\n  };\n\n  module.exports = Core;\n\n}).call(this);\n\n//# sourceURL=core.coffee",
              "type": "blob"
            },
            "pixie": {
              "path": "pixie",
              "content": "module.exports = {\"entryPoint\":\"core\",\"version\":\"0.6.0\"};",
              "type": "blob"
            },
            "test/core": {
              "path": "test/core",
              "content": "(function() {\n  var Core, equals, ok, test;\n\n  Core = require(\"../core\");\n\n  ok = assert;\n\n  equals = assert.equal;\n\n  test = it;\n\n  describe(\"Core\", function() {\n    test(\"#extend\", function() {\n      var o;\n      o = Core();\n      o.extend({\n        test: \"jawsome\"\n      });\n      return equals(o.test, \"jawsome\");\n    });\n    test(\"#attrAccessor\", function() {\n      var o;\n      o = Core({\n        test: \"my_val\"\n      });\n      o.attrAccessor(\"test\");\n      equals(o.test(), \"my_val\");\n      equals(o.test(\"new_val\"), o);\n      return equals(o.test(), \"new_val\");\n    });\n    test(\"#attrReader\", function() {\n      var o;\n      o = Core({\n        test: \"my_val\"\n      });\n      o.attrReader(\"test\");\n      equals(o.test(), \"my_val\");\n      equals(o.test(\"new_val\"), \"my_val\");\n      return equals(o.test(), \"my_val\");\n    });\n    test(\"#include\", function() {\n      var M, o, ret;\n      o = Core({\n        test: \"my_val\"\n      });\n      M = function(I, self) {\n        self.attrReader(\"test\");\n        return self.extend({\n          test2: \"cool\"\n        });\n      };\n      ret = o.include(M);\n      equals(ret, o, \"Should return self\");\n      equals(o.test(), \"my_val\");\n      return equals(o.test2, \"cool\");\n    });\n    return test(\"#include multiple\", function() {\n      var M, M2, o;\n      o = Core({\n        test: \"my_val\"\n      });\n      M = function(I, self) {\n        self.attrReader(\"test\");\n        return self.extend({\n          test2: \"cool\"\n        });\n      };\n      M2 = function(I, self) {\n        return self.extend({\n          test2: \"coolio\"\n        });\n      };\n      o.include(M, M2);\n      return equals(o.test2, \"coolio\");\n    });\n  });\n\n}).call(this);\n\n//# sourceURL=test/core.coffee",
              "type": "blob"
            }
          },
          "progenitor": {
            "url": "http://strd6.github.io/editor/"
          },
          "version": "0.6.0",
          "entryPoint": "core",
          "repository": {
            "id": 13567517,
            "name": "core",
            "full_name": "distri/core",
            "owner": {
              "login": "distri",
              "id": 6005125,
              "avatar_url": "https://identicons.github.com/f90c81ffc1498e260c820082f2e7ca5f.png",
              "gravatar_id": null,
              "url": "https://api.github.com/users/distri",
              "html_url": "https://github.com/distri",
              "followers_url": "https://api.github.com/users/distri/followers",
              "following_url": "https://api.github.com/users/distri/following{/other_user}",
              "gists_url": "https://api.github.com/users/distri/gists{/gist_id}",
              "starred_url": "https://api.github.com/users/distri/starred{/owner}{/repo}",
              "subscriptions_url": "https://api.github.com/users/distri/subscriptions",
              "organizations_url": "https://api.github.com/users/distri/orgs",
              "repos_url": "https://api.github.com/users/distri/repos",
              "events_url": "https://api.github.com/users/distri/events{/privacy}",
              "received_events_url": "https://api.github.com/users/distri/received_events",
              "type": "Organization",
              "site_admin": false
            },
            "private": false,
            "html_url": "https://github.com/distri/core",
            "description": "An object extension system.",
            "fork": false,
            "url": "https://api.github.com/repos/distri/core",
            "forks_url": "https://api.github.com/repos/distri/core/forks",
            "keys_url": "https://api.github.com/repos/distri/core/keys{/key_id}",
            "collaborators_url": "https://api.github.com/repos/distri/core/collaborators{/collaborator}",
            "teams_url": "https://api.github.com/repos/distri/core/teams",
            "hooks_url": "https://api.github.com/repos/distri/core/hooks",
            "issue_events_url": "https://api.github.com/repos/distri/core/issues/events{/number}",
            "events_url": "https://api.github.com/repos/distri/core/events",
            "assignees_url": "https://api.github.com/repos/distri/core/assignees{/user}",
            "branches_url": "https://api.github.com/repos/distri/core/branches{/branch}",
            "tags_url": "https://api.github.com/repos/distri/core/tags",
            "blobs_url": "https://api.github.com/repos/distri/core/git/blobs{/sha}",
            "git_tags_url": "https://api.github.com/repos/distri/core/git/tags{/sha}",
            "git_refs_url": "https://api.github.com/repos/distri/core/git/refs{/sha}",
            "trees_url": "https://api.github.com/repos/distri/core/git/trees{/sha}",
            "statuses_url": "https://api.github.com/repos/distri/core/statuses/{sha}",
            "languages_url": "https://api.github.com/repos/distri/core/languages",
            "stargazers_url": "https://api.github.com/repos/distri/core/stargazers",
            "contributors_url": "https://api.github.com/repos/distri/core/contributors",
            "subscribers_url": "https://api.github.com/repos/distri/core/subscribers",
            "subscription_url": "https://api.github.com/repos/distri/core/subscription",
            "commits_url": "https://api.github.com/repos/distri/core/commits{/sha}",
            "git_commits_url": "https://api.github.com/repos/distri/core/git/commits{/sha}",
            "comments_url": "https://api.github.com/repos/distri/core/comments{/number}",
            "issue_comment_url": "https://api.github.com/repos/distri/core/issues/comments/{number}",
            "contents_url": "https://api.github.com/repos/distri/core/contents/{+path}",
            "compare_url": "https://api.github.com/repos/distri/core/compare/{base}...{head}",
            "merges_url": "https://api.github.com/repos/distri/core/merges",
            "archive_url": "https://api.github.com/repos/distri/core/{archive_format}{/ref}",
            "downloads_url": "https://api.github.com/repos/distri/core/downloads",
            "issues_url": "https://api.github.com/repos/distri/core/issues{/number}",
            "pulls_url": "https://api.github.com/repos/distri/core/pulls{/number}",
            "milestones_url": "https://api.github.com/repos/distri/core/milestones{/number}",
            "notifications_url": "https://api.github.com/repos/distri/core/notifications{?since,all,participating}",
            "labels_url": "https://api.github.com/repos/distri/core/labels{/name}",
            "releases_url": "https://api.github.com/repos/distri/core/releases{/id}",
            "created_at": "2013-10-14T17:04:33Z",
            "updated_at": "2013-12-24T00:49:21Z",
            "pushed_at": "2013-10-14T23:49:11Z",
            "git_url": "git://github.com/distri/core.git",
            "ssh_url": "git@github.com:distri/core.git",
            "clone_url": "https://github.com/distri/core.git",
            "svn_url": "https://github.com/distri/core",
            "homepage": null,
            "size": 592,
            "stargazers_count": 0,
            "watchers_count": 0,
            "language": "CoffeeScript",
            "has_issues": true,
            "has_downloads": true,
            "has_wiki": true,
            "forks_count": 0,
            "mirror_url": null,
            "open_issues_count": 0,
            "forks": 0,
            "open_issues": 0,
            "watchers": 0,
            "default_branch": "master",
            "master_branch": "master",
            "permissions": {
              "admin": true,
              "push": true,
              "pull": true
            },
            "organization": {
              "login": "distri",
              "id": 6005125,
              "avatar_url": "https://identicons.github.com/f90c81ffc1498e260c820082f2e7ca5f.png",
              "gravatar_id": null,
              "url": "https://api.github.com/users/distri",
              "html_url": "https://github.com/distri",
              "followers_url": "https://api.github.com/users/distri/followers",
              "following_url": "https://api.github.com/users/distri/following{/other_user}",
              "gists_url": "https://api.github.com/users/distri/gists{/gist_id}",
              "starred_url": "https://api.github.com/users/distri/starred{/owner}{/repo}",
              "subscriptions_url": "https://api.github.com/users/distri/subscriptions",
              "organizations_url": "https://api.github.com/users/distri/orgs",
              "repos_url": "https://api.github.com/users/distri/repos",
              "events_url": "https://api.github.com/users/distri/events{/privacy}",
              "received_events_url": "https://api.github.com/users/distri/received_events",
              "type": "Organization",
              "site_admin": false
            },
            "network_count": 0,
            "subscribers_count": 1,
            "branch": "v0.6.0",
            "defaultBranch": "master"
          },
          "dependencies": {}
        }
      }
    },
    "observable": {
      "source": {
        "LICENSE": {
          "path": "LICENSE",
          "mode": "100644",
          "content": "The MIT License (MIT)\n\nCopyright (c) 2014 distri\n\nPermission is hereby granted, free of charge, to any person obtaining a copy of\nthis software and associated documentation files (the \"Software\"), to deal in\nthe Software without restriction, including without limitation the rights to\nuse, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of\nthe Software, and to permit persons to whom the Software is furnished to do so,\nsubject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS\nFOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR\nCOPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER\nIN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN\nCONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\n",
          "type": "blob"
        },
        "README.md": {
          "path": "README.md",
          "mode": "100644",
          "content": "observable\n==========\n",
          "type": "blob"
        },
        "main.coffee.md": {
          "path": "main.coffee.md",
          "mode": "100644",
          "content": "Observable\n==========\n\n`Observable` allows for observing arrays, functions, and objects.\n\nFunction dependencies are automagically observed.\n\nStandard array methods are proxied through to the underlying array.\n\n    Observable = (value) ->\n\nReturn the object if it is already an observable object.\n\n      return value if typeof value?.observe is \"function\"\n\nMaintain a set of listeners to observe changes and provide a helper to notify each observer.\n\n      listeners = []\n\n      notify = (newValue) ->\n        listeners.forEach (listener) ->\n          listener(newValue)\n\nOur observable function is stored as a reference to `self`.\n\nIf `value` is a function compute dependencies and listen to observables that it depends on.\n\n      if typeof value is 'function'\n        fn = value\n        self = ->\n          # Automagic dependency observation\n          if base\n            self.observe base\n\n          return value\n\n        self.observe = (listener) ->\n          listeners.push listener\n\n        changed = ->\n          value = fn()\n          notify(value)\n\n        value = computeDependencies(fn, changed)\n\n      else\n\nWhen called with zero arguments it is treated as a getter. When called with one argument it is treated as a setter.\n\nChanges to the value will trigger notifications.\n\nThe value is always returned.\n\n        self = (newValue) ->\n          if arguments.length > 0\n            if value != newValue\n              value = newValue\n\n              notify(newValue)\n          else\n            # Automagic dependency observation\n            if base\n              self.observe base\n\n          return value\n\nAdd a listener for when this object changes.\n\n        self.observe = (listener) ->\n          listeners.push listener\n\nThis `each` iterator is similar to [the Maybe monad](http://en.wikipedia.org/wiki/Monad_&#40;functional_programming&#41;#The_Maybe_monad) in that our observable may contain a single value or nothing at all.\n\n      self.each = (args...) ->\n        if value?\n          [value].forEach(args...)\n\nIf the value is an array then proxy array methods and add notifications to mutation events.\n\n      if Array.isArray(value)\n        [\n          \"concat\"\n          \"every\"\n          \"filter\"\n          \"forEach\"\n          \"indexOf\"\n          \"join\"\n          \"lastIndexOf\"\n          \"map\"\n          \"reduce\"\n          \"reduceRight\"\n          \"slice\"\n          \"some\"\n        ].forEach (method) ->\n          self[method] = (args...) ->\n            value[method](args...)\n\n        [\n          \"pop\"\n          \"push\"\n          \"reverse\"\n          \"shift\"\n          \"splice\"\n          \"sort\"\n          \"unshift\"\n        ].forEach (method) ->\n          self[method] = (args...) ->\n            notifyReturning value[method](args...)\n\n        notifyReturning = (returnValue) ->\n          notify(value)\n\n          return returnValue\n\nAdd some extra helpful methods to array observables.\n\n        extend self,\n          each: (args...) ->\n            self.forEach(args...)\n\n            return self\n\nRemove an element from the array and notify observers of changes.\n\n          remove: (object) ->\n            index = value.indexOf(object)\n\n            if index >= 0\n              notifyReturning value.splice(index, 1)[0]\n\n          get: (index) ->\n            value[index]\n\n          first: ->\n            value[0]\n\n          last: ->\n            value[value.length-1]\n\n      self.stopObserving = (fn) ->\n        remove listeners, fn\n\n      return self\n\nExport `Observable`\n\n    module.exports = Observable\n\nAppendix\n--------\n\nThe extend method adds one objects properties to another.\n\n    extend = (target, sources...) ->\n      for source in sources\n        for name of source\n          target[name] = source[name]\n\n      return target\n\n    base = undefined\n\nAutomagically compute dependencies.\n\n    computeDependencies = (fn, root) ->\n      base = root\n      value = fn()\n      base = undefined\n\n      return value\n\nRemove a value from an array.\n\n    remove = (array, value) ->\n      index = array.indexOf(value)\n\n      if index >= 0\n        array.splice(index, 1)[0]\n",
          "type": "blob"
        },
        "test/observable.coffee": {
          "path": "test/observable.coffee",
          "mode": "100644",
          "content": "Observable = require \"../main\"\n\ndescribe 'Observable', ->\n  it 'should create an observable for an object', ->\n    n = 5\n\n    observable = Observable(n)\n\n    assert.equal(observable(), n)\n\n  it 'should fire events when setting', ->\n    string = \"yolo\"\n\n    observable = Observable(string)\n    observable.observe (newValue) ->\n      assert.equal newValue, \"4life\"\n\n    observable(\"4life\")\n\n  it 'should be idempotent', ->\n    o = Observable(5)\n\n    assert.equal o, Observable(o)\n\n  describe \"#each\", ->\n    it \"should be invoked once if there is an observable\", ->\n      o = Observable(5)\n      called = 0\n\n      o.each (value) ->\n        called += 1\n        assert.equal value, 5\n\n      assert.equal called, 1\n\n    it \"should not be invoked if observable is null\", ->\n      o = Observable(null)\n      called = 0\n\n      o.each (value) ->\n        called += 1\n\n      assert.equal called, 0\n\n  it \"should allow for stopping observation\", ->\n    observable = Observable(\"string\")\n\n    called = 0\n    fn = (newValue) ->\n      called += 1\n      assert.equal newValue, \"4life\"\n\n    observable.observe fn\n\n    observable(\"4life\")\n\n    observable.stopObserving fn\n\n    observable(\"wat\")\n\n    assert.equal called, 1\n\ndescribe \"Observable Array\", ->\n  it \"should proxy array methods\", ->\n    o = Observable [5]\n\n    o.map (n) ->\n      assert.equal n, 5\n\n  it \"should notify on mutation methods\", (done) ->\n    o = Observable []\n\n    o.observe (newValue) ->\n      assert.equal newValue[0], 1\n\n    o.push 1\n\n    done()\n\n  it \"should have an each method\", ->\n    o = Observable []\n\n    assert o.each\n\n  it \"#get\", ->\n    o = Observable [0, 1, 2, 3]\n\n    assert.equal o.get(2), 2\n\n  it \"#first\", ->\n    o = Observable [0, 1, 2, 3]\n\n    assert.equal o.first(), 0\n\n  it \"#last\", ->\n    o = Observable [0, 1, 2, 3]\n\n    assert.equal o.last(), 3\n\n  it \"#remove\", (done) ->\n    o = Observable [0, 1, 2, 3]\n\n    o.observe (newValue) ->\n      assert.equal newValue.length, 3\n      setTimeout ->\n        done()\n      , 0\n\n    assert.equal o.remove(2), 2\n\n  # TODO: This looks like it might be impossible\n  it \"should proxy the length property\"\n\ndescribe \"Observable functions\", ->\n  it \"should compute dependencies\", (done) ->\n    firstName = Observable \"Duder\"\n    lastName = Observable \"Man\"\n\n    o = Observable ->\n      \"#{firstName()} #{lastName()}\"\n\n    o.observe (newValue) ->\n      assert.equal newValue, \"Duder Bro\"\n\n      done()\n\n    lastName \"Bro\"\n\n  it \"should allow double nesting\", (done) ->\n    bottom = Observable \"rad\"\n    middle = Observable ->\n      bottom()\n    top = Observable ->\n      middle()\n\n    top.observe (newValue) ->\n      assert.equal newValue, \"wat\"\n      assert.equal top(), newValue\n      assert.equal middle(), newValue\n\n      done()\n\n    bottom(\"wat\")\n\n  it \"should have an each method\", ->\n    o = Observable ->\n\n    assert o.each\n\n  it \"should not invoke when returning undefined\", ->\n    o = Observable ->\n\n    o.each ->\n      assert false\n\n  it \"should invoke when returning any defined value\", (done) ->\n    o = Observable -> 5\n\n    o.each (n) ->\n      assert.equal n, 5\n      done()\n",
          "type": "blob"
        },
        "pixie.cson": {
          "path": "pixie.cson",
          "mode": "100644",
          "content": "version: \"0.1.0\"\n",
          "type": "blob"
        }
      },
      "distribution": {
        "main": {
          "path": "main",
          "content": "(function() {\n  var Observable, base, computeDependencies, extend, remove,\n    __slice = [].slice;\n\n  Observable = function(value) {\n    var changed, fn, listeners, notify, notifyReturning, self;\n    if (typeof (value != null ? value.observe : void 0) === \"function\") {\n      return value;\n    }\n    listeners = [];\n    notify = function(newValue) {\n      return listeners.forEach(function(listener) {\n        return listener(newValue);\n      });\n    };\n    if (typeof value === 'function') {\n      fn = value;\n      self = function() {\n        if (base) {\n          self.observe(base);\n        }\n        return value;\n      };\n      self.observe = function(listener) {\n        return listeners.push(listener);\n      };\n      changed = function() {\n        value = fn();\n        return notify(value);\n      };\n      value = computeDependencies(fn, changed);\n    } else {\n      self = function(newValue) {\n        if (arguments.length > 0) {\n          if (value !== newValue) {\n            value = newValue;\n            notify(newValue);\n          }\n        } else {\n          if (base) {\n            self.observe(base);\n          }\n        }\n        return value;\n      };\n      self.observe = function(listener) {\n        return listeners.push(listener);\n      };\n    }\n    self.each = function() {\n      var args, _ref;\n      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];\n      if (value != null) {\n        return (_ref = [value]).forEach.apply(_ref, args);\n      }\n    };\n    if (Array.isArray(value)) {\n      [\"concat\", \"every\", \"filter\", \"forEach\", \"indexOf\", \"join\", \"lastIndexOf\", \"map\", \"reduce\", \"reduceRight\", \"slice\", \"some\"].forEach(function(method) {\n        return self[method] = function() {\n          var args;\n          args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];\n          return value[method].apply(value, args);\n        };\n      });\n      [\"pop\", \"push\", \"reverse\", \"shift\", \"splice\", \"sort\", \"unshift\"].forEach(function(method) {\n        return self[method] = function() {\n          var args;\n          args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];\n          return notifyReturning(value[method].apply(value, args));\n        };\n      });\n      notifyReturning = function(returnValue) {\n        notify(value);\n        return returnValue;\n      };\n      extend(self, {\n        each: function() {\n          var args;\n          args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];\n          self.forEach.apply(self, args);\n          return self;\n        },\n        remove: function(object) {\n          var index;\n          index = value.indexOf(object);\n          if (index >= 0) {\n            return notifyReturning(value.splice(index, 1)[0]);\n          }\n        },\n        get: function(index) {\n          return value[index];\n        },\n        first: function() {\n          return value[0];\n        },\n        last: function() {\n          return value[value.length - 1];\n        }\n      });\n    }\n    self.stopObserving = function(fn) {\n      return remove(listeners, fn);\n    };\n    return self;\n  };\n\n  module.exports = Observable;\n\n  extend = function() {\n    var name, source, sources, target, _i, _len;\n    target = arguments[0], sources = 2 <= arguments.length ? __slice.call(arguments, 1) : [];\n    for (_i = 0, _len = sources.length; _i < _len; _i++) {\n      source = sources[_i];\n      for (name in source) {\n        target[name] = source[name];\n      }\n    }\n    return target;\n  };\n\n  base = void 0;\n\n  computeDependencies = function(fn, root) {\n    var value;\n    base = root;\n    value = fn();\n    base = void 0;\n    return value;\n  };\n\n  remove = function(array, value) {\n    var index;\n    index = array.indexOf(value);\n    if (index >= 0) {\n      return array.splice(index, 1)[0];\n    }\n  };\n\n}).call(this);\n\n//# sourceURL=main.coffee",
          "type": "blob"
        },
        "test/observable": {
          "path": "test/observable",
          "content": "(function() {\n  var Observable;\n\n  Observable = require(\"../main\");\n\n  describe('Observable', function() {\n    it('should create an observable for an object', function() {\n      var n, observable;\n      n = 5;\n      observable = Observable(n);\n      return assert.equal(observable(), n);\n    });\n    it('should fire events when setting', function() {\n      var observable, string;\n      string = \"yolo\";\n      observable = Observable(string);\n      observable.observe(function(newValue) {\n        return assert.equal(newValue, \"4life\");\n      });\n      return observable(\"4life\");\n    });\n    it('should be idempotent', function() {\n      var o;\n      o = Observable(5);\n      return assert.equal(o, Observable(o));\n    });\n    describe(\"#each\", function() {\n      it(\"should be invoked once if there is an observable\", function() {\n        var called, o;\n        o = Observable(5);\n        called = 0;\n        o.each(function(value) {\n          called += 1;\n          return assert.equal(value, 5);\n        });\n        return assert.equal(called, 1);\n      });\n      return it(\"should not be invoked if observable is null\", function() {\n        var called, o;\n        o = Observable(null);\n        called = 0;\n        o.each(function(value) {\n          return called += 1;\n        });\n        return assert.equal(called, 0);\n      });\n    });\n    return it(\"should allow for stopping observation\", function() {\n      var called, fn, observable;\n      observable = Observable(\"string\");\n      called = 0;\n      fn = function(newValue) {\n        called += 1;\n        return assert.equal(newValue, \"4life\");\n      };\n      observable.observe(fn);\n      observable(\"4life\");\n      observable.stopObserving(fn);\n      observable(\"wat\");\n      return assert.equal(called, 1);\n    });\n  });\n\n  describe(\"Observable Array\", function() {\n    it(\"should proxy array methods\", function() {\n      var o;\n      o = Observable([5]);\n      return o.map(function(n) {\n        return assert.equal(n, 5);\n      });\n    });\n    it(\"should notify on mutation methods\", function(done) {\n      var o;\n      o = Observable([]);\n      o.observe(function(newValue) {\n        return assert.equal(newValue[0], 1);\n      });\n      o.push(1);\n      return done();\n    });\n    it(\"should have an each method\", function() {\n      var o;\n      o = Observable([]);\n      return assert(o.each);\n    });\n    it(\"#get\", function() {\n      var o;\n      o = Observable([0, 1, 2, 3]);\n      return assert.equal(o.get(2), 2);\n    });\n    it(\"#first\", function() {\n      var o;\n      o = Observable([0, 1, 2, 3]);\n      return assert.equal(o.first(), 0);\n    });\n    it(\"#last\", function() {\n      var o;\n      o = Observable([0, 1, 2, 3]);\n      return assert.equal(o.last(), 3);\n    });\n    it(\"#remove\", function(done) {\n      var o;\n      o = Observable([0, 1, 2, 3]);\n      o.observe(function(newValue) {\n        assert.equal(newValue.length, 3);\n        return setTimeout(function() {\n          return done();\n        }, 0);\n      });\n      return assert.equal(o.remove(2), 2);\n    });\n    return it(\"should proxy the length property\");\n  });\n\n  describe(\"Observable functions\", function() {\n    it(\"should compute dependencies\", function(done) {\n      var firstName, lastName, o;\n      firstName = Observable(\"Duder\");\n      lastName = Observable(\"Man\");\n      o = Observable(function() {\n        return \"\" + (firstName()) + \" \" + (lastName());\n      });\n      o.observe(function(newValue) {\n        assert.equal(newValue, \"Duder Bro\");\n        return done();\n      });\n      return lastName(\"Bro\");\n    });\n    it(\"should allow double nesting\", function(done) {\n      var bottom, middle, top;\n      bottom = Observable(\"rad\");\n      middle = Observable(function() {\n        return bottom();\n      });\n      top = Observable(function() {\n        return middle();\n      });\n      top.observe(function(newValue) {\n        assert.equal(newValue, \"wat\");\n        assert.equal(top(), newValue);\n        assert.equal(middle(), newValue);\n        return done();\n      });\n      return bottom(\"wat\");\n    });\n    it(\"should have an each method\", function() {\n      var o;\n      o = Observable(function() {});\n      return assert(o.each);\n    });\n    it(\"should not invoke when returning undefined\", function() {\n      var o;\n      o = Observable(function() {});\n      return o.each(function() {\n        return assert(false);\n      });\n    });\n    return it(\"should invoke when returning any defined value\", function(done) {\n      var o;\n      o = Observable(function() {\n        return 5;\n      });\n      return o.each(function(n) {\n        assert.equal(n, 5);\n        return done();\n      });\n    });\n  });\n\n}).call(this);\n\n//# sourceURL=test/observable.coffee",
          "type": "blob"
        },
        "pixie": {
          "path": "pixie",
          "content": "module.exports = {\"version\":\"0.1.0\"};",
          "type": "blob"
        }
      },
      "progenitor": {
        "url": "http://strd6.github.io/editor/"
      },
      "version": "0.1.0",
      "entryPoint": "main",
      "repository": {
        "id": 17119562,
        "name": "observable",
        "full_name": "distri/observable",
        "owner": {
          "login": "distri",
          "id": 6005125,
          "avatar_url": "https://identicons.github.com/f90c81ffc1498e260c820082f2e7ca5f.png",
          "gravatar_id": null,
          "url": "https://api.github.com/users/distri",
          "html_url": "https://github.com/distri",
          "followers_url": "https://api.github.com/users/distri/followers",
          "following_url": "https://api.github.com/users/distri/following{/other_user}",
          "gists_url": "https://api.github.com/users/distri/gists{/gist_id}",
          "starred_url": "https://api.github.com/users/distri/starred{/owner}{/repo}",
          "subscriptions_url": "https://api.github.com/users/distri/subscriptions",
          "organizations_url": "https://api.github.com/users/distri/orgs",
          "repos_url": "https://api.github.com/users/distri/repos",
          "events_url": "https://api.github.com/users/distri/events{/privacy}",
          "received_events_url": "https://api.github.com/users/distri/received_events",
          "type": "Organization",
          "site_admin": false
        },
        "private": false,
        "html_url": "https://github.com/distri/observable",
        "description": "",
        "fork": false,
        "url": "https://api.github.com/repos/distri/observable",
        "forks_url": "https://api.github.com/repos/distri/observable/forks",
        "keys_url": "https://api.github.com/repos/distri/observable/keys{/key_id}",
        "collaborators_url": "https://api.github.com/repos/distri/observable/collaborators{/collaborator}",
        "teams_url": "https://api.github.com/repos/distri/observable/teams",
        "hooks_url": "https://api.github.com/repos/distri/observable/hooks",
        "issue_events_url": "https://api.github.com/repos/distri/observable/issues/events{/number}",
        "events_url": "https://api.github.com/repos/distri/observable/events",
        "assignees_url": "https://api.github.com/repos/distri/observable/assignees{/user}",
        "branches_url": "https://api.github.com/repos/distri/observable/branches{/branch}",
        "tags_url": "https://api.github.com/repos/distri/observable/tags",
        "blobs_url": "https://api.github.com/repos/distri/observable/git/blobs{/sha}",
        "git_tags_url": "https://api.github.com/repos/distri/observable/git/tags{/sha}",
        "git_refs_url": "https://api.github.com/repos/distri/observable/git/refs{/sha}",
        "trees_url": "https://api.github.com/repos/distri/observable/git/trees{/sha}",
        "statuses_url": "https://api.github.com/repos/distri/observable/statuses/{sha}",
        "languages_url": "https://api.github.com/repos/distri/observable/languages",
        "stargazers_url": "https://api.github.com/repos/distri/observable/stargazers",
        "contributors_url": "https://api.github.com/repos/distri/observable/contributors",
        "subscribers_url": "https://api.github.com/repos/distri/observable/subscribers",
        "subscription_url": "https://api.github.com/repos/distri/observable/subscription",
        "commits_url": "https://api.github.com/repos/distri/observable/commits{/sha}",
        "git_commits_url": "https://api.github.com/repos/distri/observable/git/commits{/sha}",
        "comments_url": "https://api.github.com/repos/distri/observable/comments{/number}",
        "issue_comment_url": "https://api.github.com/repos/distri/observable/issues/comments/{number}",
        "contents_url": "https://api.github.com/repos/distri/observable/contents/{+path}",
        "compare_url": "https://api.github.com/repos/distri/observable/compare/{base}...{head}",
        "merges_url": "https://api.github.com/repos/distri/observable/merges",
        "archive_url": "https://api.github.com/repos/distri/observable/{archive_format}{/ref}",
        "downloads_url": "https://api.github.com/repos/distri/observable/downloads",
        "issues_url": "https://api.github.com/repos/distri/observable/issues{/number}",
        "pulls_url": "https://api.github.com/repos/distri/observable/pulls{/number}",
        "milestones_url": "https://api.github.com/repos/distri/observable/milestones{/number}",
        "notifications_url": "https://api.github.com/repos/distri/observable/notifications{?since,all,participating}",
        "labels_url": "https://api.github.com/repos/distri/observable/labels{/name}",
        "releases_url": "https://api.github.com/repos/distri/observable/releases{/id}",
        "created_at": "2014-02-23T23:17:52Z",
        "updated_at": "2014-02-23T23:17:52Z",
        "pushed_at": "2014-02-23T23:17:52Z",
        "git_url": "git://github.com/distri/observable.git",
        "ssh_url": "git@github.com:distri/observable.git",
        "clone_url": "https://github.com/distri/observable.git",
        "svn_url": "https://github.com/distri/observable",
        "homepage": null,
        "size": 0,
        "stargazers_count": 0,
        "watchers_count": 0,
        "language": null,
        "has_issues": true,
        "has_downloads": true,
        "has_wiki": true,
        "forks_count": 0,
        "mirror_url": null,
        "open_issues_count": 0,
        "forks": 0,
        "open_issues": 0,
        "watchers": 0,
        "default_branch": "master",
        "master_branch": "master",
        "permissions": {
          "admin": true,
          "push": true,
          "pull": true
        },
        "organization": {
          "login": "distri",
          "id": 6005125,
          "avatar_url": "https://identicons.github.com/f90c81ffc1498e260c820082f2e7ca5f.png",
          "gravatar_id": null,
          "url": "https://api.github.com/users/distri",
          "html_url": "https://github.com/distri",
          "followers_url": "https://api.github.com/users/distri/followers",
          "following_url": "https://api.github.com/users/distri/following{/other_user}",
          "gists_url": "https://api.github.com/users/distri/gists{/gist_id}",
          "starred_url": "https://api.github.com/users/distri/starred{/owner}{/repo}",
          "subscriptions_url": "https://api.github.com/users/distri/subscriptions",
          "organizations_url": "https://api.github.com/users/distri/orgs",
          "repos_url": "https://api.github.com/users/distri/repos",
          "events_url": "https://api.github.com/users/distri/events{/privacy}",
          "received_events_url": "https://api.github.com/users/distri/received_events",
          "type": "Organization",
          "site_admin": false
        },
        "network_count": 0,
        "subscribers_count": 2,
        "branch": "v0.1.0",
        "defaultBranch": "master"
      },
      "dependencies": {}
    },
    "resource": {
      "source": {
        "LICENSE": {
          "path": "LICENSE",
          "mode": "100644",
          "content": "The MIT License (MIT)\n\nCopyright (c) 2014 \n\nPermission is hereby granted, free of charge, to any person obtaining a copy\nof this software and associated documentation files (the \"Software\"), to deal\nin the Software without restriction, including without limitation the rights\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the Software is\nfurnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\nSOFTWARE.",
          "type": "blob"
        },
        "README.md": {
          "path": "README.md",
          "mode": "100644",
          "content": "resource\n========\n\nAudio visual resource handling for the webs\n",
          "type": "blob"
        },
        "main.coffee.md": {
          "path": "main.coffee.md",
          "mode": "100644",
          "content": "Resource\n========\n\nResource provides `Sound`, `Music`, and `Sprite` support.\n\nTODO: Include Preloader\n\nTODO: Spritesheets, Animations\n\nTODO: Uploading to S3\n\nExample\n-------\n\n>     Resource = require(\"resource\")\n>\n>     data = require \"./resources\"\n>     Resource.add(data)\n>\n>     {Music, Sprite, Sound} = Resource\n\n    Preloader = require \"./preloader\"\n\n    resources =\n      images: {}\n      sounds: {}\n      music: {}\n\n    Sprite = require \"sprite\"\n    Sprite.loadByName = (name) ->\n      url = resources.images[name]\n\n      Sprite.fromURL(url)\n\n    {Control, Music, Sound} = require \"audio\"\n\n    Sound.play = (name) ->\n      Sound.playFromURL(resources.sounds[name])\n\n    Music.play = (name) ->\n      Music.playFromURL(resources.music[name])\n\n    self = \n      add: (additionalResources) ->\n        Object.keys(additionalResources).forEach (type) ->\n          extend resources[type], additionalResources[type]\n\n        return self\n\n      preload: ({complete, progress}) ->\n        Preloader.preload\n          resources: resources\n          complete: complete\n          progress: progress\n\n        return self\n\n      Control: Control\n      Music: Music\n      Sprite: Sprite\n      Sound: Sound\n\n    module.exports = self\n\nHelpers\n-------\n\n    extend = (target, sources...) ->\n      for source in sources\n        for name of source\n          target[name] = source[name]\n\n      return target\n",
          "type": "blob"
        },
        "pixie.cson": {
          "path": "pixie.cson",
          "mode": "100644",
          "content": "version: \"0.2.0\"\ndependencies:\n  sprite: \"distri/sprite:v0.3.0\"\n  audio: \"distri/audio:v0.2.0\"\n",
          "type": "blob"
        },
        "test/main.coffee": {
          "path": "test/main.coffee",
          "mode": "100644",
          "content": "Resource = require \"../main\"\n\ndescribe \"Resource\", ->\n  it \"should expose Control\", ->\n    assert Resource.Control\n\n  it \"should expose Music\", ->\n    assert Resource.Music\n\n  it \"should expose Sprite\", ->\n    assert Resource.Sprite\n\n  it \"should expose Sound\", ->\n    assert Resource.Sound\n\n  it \"should allow adding of resources\", ->\n    assert Resource.add\n      images:\n        duder: \"http://example.com/rad.png\"\n\n  it \"should do some preloading\", ->\n    assert Resource.preload\n      progress: (p) ->\n        console.log p\n      complete: ->\n        console.log \"badical\"\n",
          "type": "blob"
        },
        "preloader.coffee.md": {
          "path": "preloader.coffee.md",
          "mode": "100644",
          "content": "Preloader\n=========\n\nPreload resources.\n\nTODO: Better error handling, duh!\n\n    Sprite = require \"sprite\"\n\n    preloadAudio = (url, success, error) ->\n      element = new Audio\n      element.onloadeddata = ->\n        success()\n      element.onerror = (e) ->\n        error(e)\n\n      softloadAudio(element, url)\n\n    softloadAudio = (element, url) ->\n      element.src = url\n      element.load()\n      element.volume = 0\n      element.play()\n\n      return element\n\n    module.exports =\n      preload: ({resources, complete, progress}) ->\n        loading = 0\n        loaded = 0\n\n        failedResource = (url) ->\n          # TODO: Something other than just logging and ignoring\n          console.error \"Failed to load:\", url\n          increment()\n\n        increment = ->\n          loaded += 1\n\n          progress?(loaded/loading)\n\n          if loaded is loading\n            complete()\n\n        loadedResource = (url) ->\n          console.log \"loaded:\", url\n          increment()\n\n        softLoaded = (url) ->\n          console.log \"soft loaded:\", url\n          increment()\n\n        Object.keys(resources).forEach (type) ->\n          Object.keys(resources[type]).forEach (name) ->\n            url = resources[type][name]\n\n            loading += 1\n\n            success = (resourceUrl) ->\n              # TODO: Grosso McNasty\n              resources.images[name] = resourceUrl if type is \"images\"\n              loadedResource(resourceUrl)\n\n            error = ->\n              failedResource(url)\n\n            if url.match /\\.(png|jpg|gif)$/\n              imagePreload(url, success, error)\n            else if url.match /\\.(mp3|wav|ogg)/\n              # TODO: Figure out how to reliable preload audio\n              softloadAudio(new Audio, url)\n              setTimeout ->\n                softLoaded(url)\n              , 0\n            else\n              console.warn \"unknown file type\", url\n              setTimeout loadedResource, 0\n\n    imagePreload = (url, success, error) ->\n      # TODO: There may be a better way to detect if we are running within\n      # a Chrome App\n      if chrome?.app?.window\n        console.log \"loading\", url\n        ajaxSuccess = (resourceUrl) ->\n          console.log resourceUrl\n          Sprite.load resourceUrl, ->\n            success(resourceUrl)\n\n        chromeAppImagePreload(url, ajaxSuccess, error)\n      else\n        regularImagePreload(url, success, error)\n\n    regularImagePreload = (url, success, error) ->\n      # TODO: Error handling for sprites\n      # NOTE: Using Sprite constructor because otherwise we get flickering\n\n      Sprite.load url, ->\n        success(url)\n\nChrome Apps can't display arbitrary image src urls, so we have this\nworkaround.\n\n    chromeAppImagePreload = (url, success, error) ->\n      xhr = new XMLHttpRequest()\n      xhr.open('GET', url)\n      xhr.responseType = 'blob'\n      xhr.onload = (e) ->\n        success window.URL.createObjectURL(@response)\n      xhr.onerror = error\n\n      xhr.send()\n",
          "type": "blob"
        }
      },
      "distribution": {
        "main": {
          "path": "main",
          "content": "(function() {\n  var Control, Music, Preloader, Sound, Sprite, extend, resources, self, _ref,\n    __slice = [].slice;\n\n  Preloader = require(\"./preloader\");\n\n  resources = {\n    images: {},\n    sounds: {},\n    music: {}\n  };\n\n  Sprite = require(\"sprite\");\n\n  Sprite.loadByName = function(name) {\n    var url;\n    url = resources.images[name];\n    return Sprite.fromURL(url);\n  };\n\n  _ref = require(\"audio\"), Control = _ref.Control, Music = _ref.Music, Sound = _ref.Sound;\n\n  Sound.play = function(name) {\n    return Sound.playFromURL(resources.sounds[name]);\n  };\n\n  Music.play = function(name) {\n    return Music.playFromURL(resources.music[name]);\n  };\n\n  self = {\n    add: function(additionalResources) {\n      Object.keys(additionalResources).forEach(function(type) {\n        return extend(resources[type], additionalResources[type]);\n      });\n      return self;\n    },\n    preload: function(_arg) {\n      var complete, progress;\n      complete = _arg.complete, progress = _arg.progress;\n      Preloader.preload({\n        resources: resources,\n        complete: complete,\n        progress: progress\n      });\n      return self;\n    },\n    Control: Control,\n    Music: Music,\n    Sprite: Sprite,\n    Sound: Sound\n  };\n\n  module.exports = self;\n\n  extend = function() {\n    var name, source, sources, target, _i, _len;\n    target = arguments[0], sources = 2 <= arguments.length ? __slice.call(arguments, 1) : [];\n    for (_i = 0, _len = sources.length; _i < _len; _i++) {\n      source = sources[_i];\n      for (name in source) {\n        target[name] = source[name];\n      }\n    }\n    return target;\n  };\n\n}).call(this);\n\n//# sourceURL=main.coffee",
          "type": "blob"
        },
        "pixie": {
          "path": "pixie",
          "content": "module.exports = {\"version\":\"0.2.0\",\"dependencies\":{\"sprite\":\"distri/sprite:v0.3.0\",\"audio\":\"distri/audio:v0.2.0\"}};",
          "type": "blob"
        },
        "test/main": {
          "path": "test/main",
          "content": "(function() {\n  var Resource;\n\n  Resource = require(\"../main\");\n\n  describe(\"Resource\", function() {\n    it(\"should expose Control\", function() {\n      return assert(Resource.Control);\n    });\n    it(\"should expose Music\", function() {\n      return assert(Resource.Music);\n    });\n    it(\"should expose Sprite\", function() {\n      return assert(Resource.Sprite);\n    });\n    it(\"should expose Sound\", function() {\n      return assert(Resource.Sound);\n    });\n    it(\"should allow adding of resources\", function() {\n      return assert(Resource.add({\n        images: {\n          duder: \"http://example.com/rad.png\"\n        }\n      }));\n    });\n    return it(\"should do some preloading\", function() {\n      return assert(Resource.preload({\n        progress: function(p) {\n          return console.log(p);\n        },\n        complete: function() {\n          return console.log(\"badical\");\n        }\n      }));\n    });\n  });\n\n}).call(this);\n\n//# sourceURL=test/main.coffee",
          "type": "blob"
        },
        "preloader": {
          "path": "preloader",
          "content": "(function() {\n  var Sprite, chromeAppImagePreload, imagePreload, preloadAudio, regularImagePreload, softloadAudio;\n\n  Sprite = require(\"sprite\");\n\n  preloadAudio = function(url, success, error) {\n    var element;\n    element = new Audio;\n    element.onloadeddata = function() {\n      return success();\n    };\n    element.onerror = function(e) {\n      return error(e);\n    };\n    return softloadAudio(element, url);\n  };\n\n  softloadAudio = function(element, url) {\n    element.src = url;\n    element.load();\n    element.volume = 0;\n    element.play();\n    return element;\n  };\n\n  module.exports = {\n    preload: function(_arg) {\n      var complete, failedResource, increment, loaded, loadedResource, loading, progress, resources, softLoaded;\n      resources = _arg.resources, complete = _arg.complete, progress = _arg.progress;\n      loading = 0;\n      loaded = 0;\n      failedResource = function(url) {\n        console.error(\"Failed to load:\", url);\n        return increment();\n      };\n      increment = function() {\n        loaded += 1;\n        if (typeof progress === \"function\") {\n          progress(loaded / loading);\n        }\n        if (loaded === loading) {\n          return complete();\n        }\n      };\n      loadedResource = function(url) {\n        console.log(\"loaded:\", url);\n        return increment();\n      };\n      softLoaded = function(url) {\n        console.log(\"soft loaded:\", url);\n        return increment();\n      };\n      return Object.keys(resources).forEach(function(type) {\n        return Object.keys(resources[type]).forEach(function(name) {\n          var error, success, url;\n          url = resources[type][name];\n          loading += 1;\n          success = function(resourceUrl) {\n            if (type === \"images\") {\n              resources.images[name] = resourceUrl;\n            }\n            return loadedResource(resourceUrl);\n          };\n          error = function() {\n            return failedResource(url);\n          };\n          if (url.match(/\\.(png|jpg|gif)$/)) {\n            return imagePreload(url, success, error);\n          } else if (url.match(/\\.(mp3|wav|ogg)/)) {\n            softloadAudio(new Audio, url);\n            return setTimeout(function() {\n              return softLoaded(url);\n            }, 0);\n          } else {\n            console.warn(\"unknown file type\", url);\n            return setTimeout(loadedResource, 0);\n          }\n        });\n      });\n    }\n  };\n\n  imagePreload = function(url, success, error) {\n    var ajaxSuccess, _ref;\n    if (typeof chrome !== \"undefined\" && chrome !== null ? (_ref = chrome.app) != null ? _ref.window : void 0 : void 0) {\n      console.log(\"loading\", url);\n      ajaxSuccess = function(resourceUrl) {\n        console.log(resourceUrl);\n        return Sprite.load(resourceUrl, function() {\n          return success(resourceUrl);\n        });\n      };\n      return chromeAppImagePreload(url, ajaxSuccess, error);\n    } else {\n      return regularImagePreload(url, success, error);\n    }\n  };\n\n  regularImagePreload = function(url, success, error) {\n    return Sprite.load(url, function() {\n      return success(url);\n    });\n  };\n\n  chromeAppImagePreload = function(url, success, error) {\n    var xhr;\n    xhr = new XMLHttpRequest();\n    xhr.open('GET', url);\n    xhr.responseType = 'blob';\n    xhr.onload = function(e) {\n      return success(window.URL.createObjectURL(this.response));\n    };\n    xhr.onerror = error;\n    return xhr.send();\n  };\n\n}).call(this);\n\n//# sourceURL=preloader.coffee",
          "type": "blob"
        }
      },
      "progenitor": {
        "url": "http://strd6.github.io/editor/"
      },
      "version": "0.2.0",
      "entryPoint": "main",
      "repository": {
        "id": 17570235,
        "name": "resource",
        "full_name": "distri/resource",
        "owner": {
          "login": "distri",
          "id": 6005125,
          "avatar_url": "https://gravatar.com/avatar/192f3f168409e79c42107f081139d9f3?d=https%3A%2F%2Fidenticons.github.com%2Ff90c81ffc1498e260c820082f2e7ca5f.png&r=x",
          "gravatar_id": "192f3f168409e79c42107f081139d9f3",
          "url": "https://api.github.com/users/distri",
          "html_url": "https://github.com/distri",
          "followers_url": "https://api.github.com/users/distri/followers",
          "following_url": "https://api.github.com/users/distri/following{/other_user}",
          "gists_url": "https://api.github.com/users/distri/gists{/gist_id}",
          "starred_url": "https://api.github.com/users/distri/starred{/owner}{/repo}",
          "subscriptions_url": "https://api.github.com/users/distri/subscriptions",
          "organizations_url": "https://api.github.com/users/distri/orgs",
          "repos_url": "https://api.github.com/users/distri/repos",
          "events_url": "https://api.github.com/users/distri/events{/privacy}",
          "received_events_url": "https://api.github.com/users/distri/received_events",
          "type": "Organization",
          "site_admin": false
        },
        "private": false,
        "html_url": "https://github.com/distri/resource",
        "description": "Audio visual resource handling for the webs",
        "fork": false,
        "url": "https://api.github.com/repos/distri/resource",
        "forks_url": "https://api.github.com/repos/distri/resource/forks",
        "keys_url": "https://api.github.com/repos/distri/resource/keys{/key_id}",
        "collaborators_url": "https://api.github.com/repos/distri/resource/collaborators{/collaborator}",
        "teams_url": "https://api.github.com/repos/distri/resource/teams",
        "hooks_url": "https://api.github.com/repos/distri/resource/hooks",
        "issue_events_url": "https://api.github.com/repos/distri/resource/issues/events{/number}",
        "events_url": "https://api.github.com/repos/distri/resource/events",
        "assignees_url": "https://api.github.com/repos/distri/resource/assignees{/user}",
        "branches_url": "https://api.github.com/repos/distri/resource/branches{/branch}",
        "tags_url": "https://api.github.com/repos/distri/resource/tags",
        "blobs_url": "https://api.github.com/repos/distri/resource/git/blobs{/sha}",
        "git_tags_url": "https://api.github.com/repos/distri/resource/git/tags{/sha}",
        "git_refs_url": "https://api.github.com/repos/distri/resource/git/refs{/sha}",
        "trees_url": "https://api.github.com/repos/distri/resource/git/trees{/sha}",
        "statuses_url": "https://api.github.com/repos/distri/resource/statuses/{sha}",
        "languages_url": "https://api.github.com/repos/distri/resource/languages",
        "stargazers_url": "https://api.github.com/repos/distri/resource/stargazers",
        "contributors_url": "https://api.github.com/repos/distri/resource/contributors",
        "subscribers_url": "https://api.github.com/repos/distri/resource/subscribers",
        "subscription_url": "https://api.github.com/repos/distri/resource/subscription",
        "commits_url": "https://api.github.com/repos/distri/resource/commits{/sha}",
        "git_commits_url": "https://api.github.com/repos/distri/resource/git/commits{/sha}",
        "comments_url": "https://api.github.com/repos/distri/resource/comments{/number}",
        "issue_comment_url": "https://api.github.com/repos/distri/resource/issues/comments/{number}",
        "contents_url": "https://api.github.com/repos/distri/resource/contents/{+path}",
        "compare_url": "https://api.github.com/repos/distri/resource/compare/{base}...{head}",
        "merges_url": "https://api.github.com/repos/distri/resource/merges",
        "archive_url": "https://api.github.com/repos/distri/resource/{archive_format}{/ref}",
        "downloads_url": "https://api.github.com/repos/distri/resource/downloads",
        "issues_url": "https://api.github.com/repos/distri/resource/issues{/number}",
        "pulls_url": "https://api.github.com/repos/distri/resource/pulls{/number}",
        "milestones_url": "https://api.github.com/repos/distri/resource/milestones{/number}",
        "notifications_url": "https://api.github.com/repos/distri/resource/notifications{?since,all,participating}",
        "labels_url": "https://api.github.com/repos/distri/resource/labels{/name}",
        "releases_url": "https://api.github.com/repos/distri/resource/releases{/id}",
        "created_at": "2014-03-09T18:10:51Z",
        "updated_at": "2014-03-10T17:31:15Z",
        "pushed_at": "2014-03-10T17:31:15Z",
        "git_url": "git://github.com/distri/resource.git",
        "ssh_url": "git@github.com:distri/resource.git",
        "clone_url": "https://github.com/distri/resource.git",
        "svn_url": "https://github.com/distri/resource",
        "homepage": null,
        "size": 0,
        "stargazers_count": 0,
        "watchers_count": 0,
        "language": null,
        "has_issues": true,
        "has_downloads": true,
        "has_wiki": true,
        "forks_count": 0,
        "mirror_url": null,
        "open_issues_count": 0,
        "forks": 0,
        "open_issues": 0,
        "watchers": 0,
        "default_branch": "master",
        "master_branch": "master",
        "permissions": {
          "admin": true,
          "push": true,
          "pull": true
        },
        "organization": {
          "login": "distri",
          "id": 6005125,
          "avatar_url": "https://gravatar.com/avatar/192f3f168409e79c42107f081139d9f3?d=https%3A%2F%2Fidenticons.github.com%2Ff90c81ffc1498e260c820082f2e7ca5f.png&r=x",
          "gravatar_id": "192f3f168409e79c42107f081139d9f3",
          "url": "https://api.github.com/users/distri",
          "html_url": "https://github.com/distri",
          "followers_url": "https://api.github.com/users/distri/followers",
          "following_url": "https://api.github.com/users/distri/following{/other_user}",
          "gists_url": "https://api.github.com/users/distri/gists{/gist_id}",
          "starred_url": "https://api.github.com/users/distri/starred{/owner}{/repo}",
          "subscriptions_url": "https://api.github.com/users/distri/subscriptions",
          "organizations_url": "https://api.github.com/users/distri/orgs",
          "repos_url": "https://api.github.com/users/distri/repos",
          "events_url": "https://api.github.com/users/distri/events{/privacy}",
          "received_events_url": "https://api.github.com/users/distri/received_events",
          "type": "Organization",
          "site_admin": false
        },
        "network_count": 0,
        "subscribers_count": 2,
        "branch": "v0.2.0",
        "publishBranch": "gh-pages"
      },
      "dependencies": {
        "sprite": {
          "source": {
            "LICENSE": {
              "path": "LICENSE",
              "mode": "100644",
              "content": "The MIT License (MIT)\n\nCopyright (c) 2013 distri\n\nPermission is hereby granted, free of charge, to any person obtaining a copy of\nthis software and associated documentation files (the \"Software\"), to deal in\nthe Software without restriction, including without limitation the rights to\nuse, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of\nthe Software, and to permit persons to whom the Software is furnished to do so,\nsubject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS\nFOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR\nCOPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER\nIN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN\nCONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\n",
              "type": "blob"
            },
            "README.md": {
              "path": "README.md",
              "mode": "100644",
              "content": "sprite\n======\n\nSprites that can be drawn on an HTML5 canvas.\n",
              "type": "blob"
            },
            "main.coffee.md": {
              "path": "main.coffee.md",
              "mode": "100644",
              "content": "Sprite\n======\n\nThe Sprite class provides a way to load images for use in games.\n\nA sprite is a still 2d image.\n\nAn animation can be created from a collection of sprites.\n\nBy default, images are loaded asynchronously. A proxy object is\nreturned immediately. Even though it has a draw method it will not\ndraw anything to the screen until the image has been loaded.\n\n    LoaderProxy = ->\n      draw: ->\n      fill: ->\n      width: null\n      height: null\n      image: null\n\nCache loaded images\n\n    spriteCache = {}\n\n    Sprite = (image, sourceX, sourceY, width, height) ->\n      sourceX ||= 0\n      sourceY ||= 0\n      width ||= image.width\n      height ||= image.height\n\nDraw this sprite on the given canvas at the given position.\n\n      draw: (canvas, x, y) ->\n        if x.x?\n          {x, y} = x\n\n        canvas.drawImage(\n          image,\n          sourceX,\n          sourceY,\n          width,\n          height,\n          x,\n          y,\n          width,\n          height\n        )\n\nDraw this sprite on the given canvas tiled to the x, y,\nwidth, and height dimensions specified.\n\nRepeat options can be `repeat-x`, `repeat-y`, `no-repeat`, or `repeat`. Defaults to `repeat`\n\n      fill: (canvas, x, y, width, height, repeat=\"repeat\") ->\n        pattern = canvas.createPattern(image, repeat)\n        canvas.drawRect({x, y, width, height, color: pattern})\n\n      width: width\n      height: height\n      image: image\n\nLoads all sprites from a sprite sheet found in\nyour images directory, specified by the name passed in.\n\nReturns an array of sprite objects which will start out empty, but be filled\nonce the image has loaded.\n\n    Sprite.loadSheet = (name, tileWidth, tileHeight) ->\n      url = ResourceLoader.urlFor(\"images\", name)\n\n      sprites = []\n      image = new Image()\n\n      image.onload = ->\n        imgElement = this\n        (image.height / tileHeight).times (row) ->\n          (image.width / tileWidth).times (col) ->\n            sprites.push(Sprite(imgElement, col * tileWidth, row * tileHeight, tileWidth, tileHeight))\n\n      image.src = url\n\n      return sprites\n\nLoads a sprite from a given url.\nA second optional callback parameter may be passet wich is executeh once the\nimage is loaded. The sprite proxy data is passed to it as the only parameter.\n\n    Sprite.fromURL = Sprite.load = (url, loadedCallback) ->\n      if sprite = spriteCache[url]\n        if loadedCallback?\n          defer loadedCallback, sprite\n\n        return sprite\n\n      spriteCache[url] = proxy = LoaderProxy()\n      img = new Image()\n\n      img.onload = ->\n        extend(proxy, Sprite(this))\n\n        loadedCallback?(proxy)\n\n      img.src = url\n\n      return proxy\n\nA sprite that draws nothing.\n\n    Sprite.EMPTY = Sprite.NONE = LoaderProxy()\n\n    module.exports = Sprite\n\nHelpers\n-------\n\n    extend = (target, sources...) ->\n      for source in sources\n        for name of source\n          target[name] = source[name]\n\n      return target\n\n    defer = (fn, args...) ->\n      setTimeout ->\n        fn(args...)\n      , 1\n",
              "type": "blob"
            },
            "pixie.cson": {
              "path": "pixie.cson",
              "mode": "100644",
              "content": "version: \"0.3.0\"\n",
              "type": "blob"
            },
            "test/sprite.coffee": {
              "path": "test/sprite.coffee",
              "mode": "100644",
              "content": "Sprite = require \"../main\"\n\ndescribe \"Sprite\", ->\n  it \"should construct sprites\", ->\n    img = new Image\n\n    assert Sprite(img)\n\n  it \"should construct from data urls\", (done) ->\n    assert Sprite.load(\n      \"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAQAAADZc7J/AAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAAAEgAAABIAEbJaz4AAAAJdnBBZwAAACAAAAAgAIf6nJ0AAACGSURBVEjH7ZTRDYAgDEQP46wdgSEcgdncpX6IpsGUi4HGH+8POLhHSQGYFNpbXugBRImkU+cwwfcHJOpQ49LnrmGClaYS3gACL91RAMGL9CkEfV2d2OnIQII21aGY3wtScwoAMfN2XMJ6QcwtpTHuADYA+azHTRHzH4jz6rlSTK3Br18AcABNHBto+dslMQAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxMS0wOC0yMFQxNDo1NjoxMi0wNzowMIGIK7sAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTEtMDgtMjBUMTQ6NTY6MTItMDc6MDDw1ZMHAAAAAElFTkSuQmCC\",\n      ->\n        done()\n    )\n",
              "type": "blob"
            }
          },
          "distribution": {
            "main": {
              "path": "main",
              "content": "(function() {\n  var LoaderProxy, Sprite, defer, extend, spriteCache,\n    __slice = [].slice;\n\n  LoaderProxy = function() {\n    return {\n      draw: function() {},\n      fill: function() {},\n      width: null,\n      height: null,\n      image: null\n    };\n  };\n\n  spriteCache = {};\n\n  Sprite = function(image, sourceX, sourceY, width, height) {\n    sourceX || (sourceX = 0);\n    sourceY || (sourceY = 0);\n    width || (width = image.width);\n    height || (height = image.height);\n    return {\n      draw: function(canvas, x, y) {\n        var _ref;\n        if (x.x != null) {\n          _ref = x, x = _ref.x, y = _ref.y;\n        }\n        return canvas.drawImage(image, sourceX, sourceY, width, height, x, y, width, height);\n      },\n      fill: function(canvas, x, y, width, height, repeat) {\n        var pattern;\n        if (repeat == null) {\n          repeat = \"repeat\";\n        }\n        pattern = canvas.createPattern(image, repeat);\n        return canvas.drawRect({\n          x: x,\n          y: y,\n          width: width,\n          height: height,\n          color: pattern\n        });\n      },\n      width: width,\n      height: height,\n      image: image\n    };\n  };\n\n  Sprite.loadSheet = function(name, tileWidth, tileHeight) {\n    var image, sprites, url;\n    url = ResourceLoader.urlFor(\"images\", name);\n    sprites = [];\n    image = new Image();\n    image.onload = function() {\n      var imgElement;\n      imgElement = this;\n      return (image.height / tileHeight).times(function(row) {\n        return (image.width / tileWidth).times(function(col) {\n          return sprites.push(Sprite(imgElement, col * tileWidth, row * tileHeight, tileWidth, tileHeight));\n        });\n      });\n    };\n    image.src = url;\n    return sprites;\n  };\n\n  Sprite.fromURL = Sprite.load = function(url, loadedCallback) {\n    var img, proxy, sprite;\n    if (sprite = spriteCache[url]) {\n      if (loadedCallback != null) {\n        defer(loadedCallback, sprite);\n      }\n      return sprite;\n    }\n    spriteCache[url] = proxy = LoaderProxy();\n    img = new Image();\n    img.onload = function() {\n      extend(proxy, Sprite(this));\n      return typeof loadedCallback === \"function\" ? loadedCallback(proxy) : void 0;\n    };\n    img.src = url;\n    return proxy;\n  };\n\n  Sprite.EMPTY = Sprite.NONE = LoaderProxy();\n\n  module.exports = Sprite;\n\n  extend = function() {\n    var name, source, sources, target, _i, _len;\n    target = arguments[0], sources = 2 <= arguments.length ? __slice.call(arguments, 1) : [];\n    for (_i = 0, _len = sources.length; _i < _len; _i++) {\n      source = sources[_i];\n      for (name in source) {\n        target[name] = source[name];\n      }\n    }\n    return target;\n  };\n\n  defer = function() {\n    var args, fn;\n    fn = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];\n    return setTimeout(function() {\n      return fn.apply(null, args);\n    }, 1);\n  };\n\n}).call(this);\n\n//# sourceURL=main.coffee",
              "type": "blob"
            },
            "pixie": {
              "path": "pixie",
              "content": "module.exports = {\"version\":\"0.3.0\"};",
              "type": "blob"
            },
            "test/sprite": {
              "path": "test/sprite",
              "content": "(function() {\n  var Sprite;\n\n  Sprite = require(\"../main\");\n\n  describe(\"Sprite\", function() {\n    it(\"should construct sprites\", function() {\n      var img;\n      img = new Image;\n      return assert(Sprite(img));\n    });\n    return it(\"should construct from data urls\", function(done) {\n      return assert(Sprite.load(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAQAAADZc7J/AAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAAAEgAAABIAEbJaz4AAAAJdnBBZwAAACAAAAAgAIf6nJ0AAACGSURBVEjH7ZTRDYAgDEQP46wdgSEcgdncpX6IpsGUi4HGH+8POLhHSQGYFNpbXugBRImkU+cwwfcHJOpQ49LnrmGClaYS3gACL91RAMGL9CkEfV2d2OnIQII21aGY3wtScwoAMfN2XMJ6QcwtpTHuADYA+azHTRHzH4jz6rlSTK3Br18AcABNHBto+dslMQAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxMS0wOC0yMFQxNDo1NjoxMi0wNzowMIGIK7sAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTEtMDgtMjBUMTQ6NTY6MTItMDc6MDDw1ZMHAAAAAElFTkSuQmCC\", function() {\n        return done();\n      }));\n    });\n  });\n\n}).call(this);\n\n//# sourceURL=test/sprite.coffee",
              "type": "blob"
            }
          },
          "progenitor": {
            "url": "http://strd6.github.io/editor/"
          },
          "version": "0.3.0",
          "entryPoint": "main",
          "repository": {
            "id": 14668729,
            "name": "sprite",
            "full_name": "distri/sprite",
            "owner": {
              "login": "distri",
              "id": 6005125,
              "avatar_url": "https://identicons.github.com/f90c81ffc1498e260c820082f2e7ca5f.png",
              "gravatar_id": null,
              "url": "https://api.github.com/users/distri",
              "html_url": "https://github.com/distri",
              "followers_url": "https://api.github.com/users/distri/followers",
              "following_url": "https://api.github.com/users/distri/following{/other_user}",
              "gists_url": "https://api.github.com/users/distri/gists{/gist_id}",
              "starred_url": "https://api.github.com/users/distri/starred{/owner}{/repo}",
              "subscriptions_url": "https://api.github.com/users/distri/subscriptions",
              "organizations_url": "https://api.github.com/users/distri/orgs",
              "repos_url": "https://api.github.com/users/distri/repos",
              "events_url": "https://api.github.com/users/distri/events{/privacy}",
              "received_events_url": "https://api.github.com/users/distri/received_events",
              "type": "Organization",
              "site_admin": false
            },
            "private": false,
            "html_url": "https://github.com/distri/sprite",
            "description": "Sprites that can be drawn on an HTML5 canvas.",
            "fork": false,
            "url": "https://api.github.com/repos/distri/sprite",
            "forks_url": "https://api.github.com/repos/distri/sprite/forks",
            "keys_url": "https://api.github.com/repos/distri/sprite/keys{/key_id}",
            "collaborators_url": "https://api.github.com/repos/distri/sprite/collaborators{/collaborator}",
            "teams_url": "https://api.github.com/repos/distri/sprite/teams",
            "hooks_url": "https://api.github.com/repos/distri/sprite/hooks",
            "issue_events_url": "https://api.github.com/repos/distri/sprite/issues/events{/number}",
            "events_url": "https://api.github.com/repos/distri/sprite/events",
            "assignees_url": "https://api.github.com/repos/distri/sprite/assignees{/user}",
            "branches_url": "https://api.github.com/repos/distri/sprite/branches{/branch}",
            "tags_url": "https://api.github.com/repos/distri/sprite/tags",
            "blobs_url": "https://api.github.com/repos/distri/sprite/git/blobs{/sha}",
            "git_tags_url": "https://api.github.com/repos/distri/sprite/git/tags{/sha}",
            "git_refs_url": "https://api.github.com/repos/distri/sprite/git/refs{/sha}",
            "trees_url": "https://api.github.com/repos/distri/sprite/git/trees{/sha}",
            "statuses_url": "https://api.github.com/repos/distri/sprite/statuses/{sha}",
            "languages_url": "https://api.github.com/repos/distri/sprite/languages",
            "stargazers_url": "https://api.github.com/repos/distri/sprite/stargazers",
            "contributors_url": "https://api.github.com/repos/distri/sprite/contributors",
            "subscribers_url": "https://api.github.com/repos/distri/sprite/subscribers",
            "subscription_url": "https://api.github.com/repos/distri/sprite/subscription",
            "commits_url": "https://api.github.com/repos/distri/sprite/commits{/sha}",
            "git_commits_url": "https://api.github.com/repos/distri/sprite/git/commits{/sha}",
            "comments_url": "https://api.github.com/repos/distri/sprite/comments{/number}",
            "issue_comment_url": "https://api.github.com/repos/distri/sprite/issues/comments/{number}",
            "contents_url": "https://api.github.com/repos/distri/sprite/contents/{+path}",
            "compare_url": "https://api.github.com/repos/distri/sprite/compare/{base}...{head}",
            "merges_url": "https://api.github.com/repos/distri/sprite/merges",
            "archive_url": "https://api.github.com/repos/distri/sprite/{archive_format}{/ref}",
            "downloads_url": "https://api.github.com/repos/distri/sprite/downloads",
            "issues_url": "https://api.github.com/repos/distri/sprite/issues{/number}",
            "pulls_url": "https://api.github.com/repos/distri/sprite/pulls{/number}",
            "milestones_url": "https://api.github.com/repos/distri/sprite/milestones{/number}",
            "notifications_url": "https://api.github.com/repos/distri/sprite/notifications{?since,all,participating}",
            "labels_url": "https://api.github.com/repos/distri/sprite/labels{/name}",
            "releases_url": "https://api.github.com/repos/distri/sprite/releases{/id}",
            "created_at": "2013-11-24T20:34:55Z",
            "updated_at": "2013-11-29T20:33:05Z",
            "pushed_at": "2013-11-29T20:33:04Z",
            "git_url": "git://github.com/distri/sprite.git",
            "ssh_url": "git@github.com:distri/sprite.git",
            "clone_url": "https://github.com/distri/sprite.git",
            "svn_url": "https://github.com/distri/sprite",
            "homepage": null,
            "size": 136,
            "stargazers_count": 0,
            "watchers_count": 0,
            "language": "CoffeeScript",
            "has_issues": true,
            "has_downloads": true,
            "has_wiki": true,
            "forks_count": 0,
            "mirror_url": null,
            "open_issues_count": 0,
            "forks": 0,
            "open_issues": 0,
            "watchers": 0,
            "default_branch": "master",
            "master_branch": "master",
            "permissions": {
              "admin": true,
              "push": true,
              "pull": true
            },
            "organization": {
              "login": "distri",
              "id": 6005125,
              "avatar_url": "https://identicons.github.com/f90c81ffc1498e260c820082f2e7ca5f.png",
              "gravatar_id": null,
              "url": "https://api.github.com/users/distri",
              "html_url": "https://github.com/distri",
              "followers_url": "https://api.github.com/users/distri/followers",
              "following_url": "https://api.github.com/users/distri/following{/other_user}",
              "gists_url": "https://api.github.com/users/distri/gists{/gist_id}",
              "starred_url": "https://api.github.com/users/distri/starred{/owner}{/repo}",
              "subscriptions_url": "https://api.github.com/users/distri/subscriptions",
              "organizations_url": "https://api.github.com/users/distri/orgs",
              "repos_url": "https://api.github.com/users/distri/repos",
              "events_url": "https://api.github.com/users/distri/events{/privacy}",
              "received_events_url": "https://api.github.com/users/distri/received_events",
              "type": "Organization",
              "site_admin": false
            },
            "network_count": 0,
            "subscribers_count": 1,
            "branch": "v0.3.0",
            "defaultBranch": "master"
          },
          "dependencies": {}
        },
        "audio": {
          "source": {
            "LICENSE": {
              "path": "LICENSE",
              "mode": "100644",
              "content": "The MIT License (MIT)\n\nCopyright (c) 2014 distri\n\nPermission is hereby granted, free of charge, to any person obtaining a copy of\nthis software and associated documentation files (the \"Software\"), to deal in\nthe Software without restriction, including without limitation the rights to\nuse, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of\nthe Software, and to permit persons to whom the Software is furnished to do so,\nsubject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS\nFOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR\nCOPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER\nIN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN\nCONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\n",
              "type": "blob"
            },
            "README.md": {
              "path": "README.md",
              "mode": "100644",
              "content": "sound\n=====\n\nSounds in da browser.\n",
              "type": "blob"
            },
            "global_volume.coffee.md": {
              "path": "global_volume.coffee.md",
              "mode": "100644",
              "content": "Global Volume\n=============\n\nA volume control shared by both sound and music.\n\n    Observable = require(\"observable\")\n\n    module.exports = Observable(0.5)\n",
              "type": "blob"
            },
            "main.coffee.md": {
              "path": "main.coffee.md",
              "mode": "100644",
              "content": "Audio\n=====\n\n    module.exports =\n      Music: require \"./music\"\n      Sound: require \"./sound\"\n      Control:\n        volume: require \"./global_volume\"\n",
              "type": "blob"
            },
            "music.coffee.md": {
              "path": "music.coffee.md",
              "mode": "100644",
              "content": "Music\n=====\n\nSuper hack way to have background music.\n\n    {extend} = require \"./util\"\n\n    globalVolume = require \"./global_volume\"\n\n    globalVolume.observe ->\n      updateVolume(track)\n\n    track = extend document.createElement(\"audio\"),\n      loop: \"loop\"\n\n    document.body.appendChild(track)\n\n    track.baseVolume = 1\n\n    module.exports =\n      playFromURL: (url, {volume}={}) ->\n        volume ?= 1\n\n        track.src = url\n        track.baseVolume = volume\n\n        updateVolume(track)\n\n        track.play()\n\n    updateVolume = (channel) ->\n      channel.volume = channel.baseVolume * globalVolume()\n",
              "type": "blob"
            },
            "pixie.cson": {
              "path": "pixie.cson",
              "mode": "100644",
              "content": "version: \"0.2.0\"\ndependencies:\n  observable: \"distri/observable:v0.1.0\"\n",
              "type": "blob"
            },
            "sound.coffee.md": {
              "path": "sound.coffee.md",
              "mode": "100644",
              "content": "Sound\n=====\n\nPlay sounds\n\n>     Sound.play \"pew pew\"\n\n>     Sound.playFromURL \"data:audio/wav;base64,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\"\n\nImplementation\n--------------\n\n    {extend} = require \"./util\"\n\n    globalVolume = require \"./global_volume\"\n\n    globalVolume.observe (newVolume) ->\n      channels.forEach updateVolume\n\n    maxChannels = 16\n    channels = [0...maxChannels].map ->\n      extend document.createElement(\"audio\"),\n        autobuffer: true\n        baseVolume: 1 # Our reminder of the initial volume for the sound being played\n        preload: 'auto'\n\n    freeChannel = ->\n      freeChannels = channels.filter (sound) ->\n        sound.currentTime is sound.duration or sound.currentTime is 0\n\n      freeChannels[0]\n\n    module.exports =\n      playFromURL: (url, {volume}={}) ->\n        volume ?= 1\n\n        if channel = freeChannel()\n          try\n            channel.currentTime = 0\n\n          channel.src = url\n          channel.baseVolume = volume\n          updateVolume(channel)\n          channel.play()\n\n          return channel\n\n    updateVolume = (channel) ->\n      channel.volume = channel.baseVolume * globalVolume()\n",
              "type": "blob"
            },
            "test/main.coffee": {
              "path": "test/main.coffee",
              "mode": "100644",
              "content": "Audio = require \"../main\"\n\ndescribe \"Audio\", ->\n  it \"should have Sound\", ->\n    assert Audio.Sound\n\n  it \"should have Music\", ->\n    assert Audio.Music\n\n  it \"should have a volume control\", ->\n    assert Audio.Control.volume\n",
              "type": "blob"
            },
            "test/music.coffee": {
              "path": "test/music.coffee",
              "mode": "100644",
              "content": "Music = require \"/music\"\n\ndescribe \"Music\", ->\n  it \"should be able to play from urls\", ->\n    assert Music.playFromURL\n",
              "type": "blob"
            },
            "test/sound.coffee": {
              "path": "test/sound.coffee",
              "mode": "100644",
              "content": "Sound = require \"/sound\"\n\ndescribe \"Sound\", ->\n  it \"should be able to play from urls\", ->\n    assert Sound.playFromURL\n",
              "type": "blob"
            },
            "util.coffee.md": {
              "path": "util.coffee.md",
              "mode": "100644",
              "content": "Util\n----\n\n    module.exports =\n      extend: (target, sources...) ->\n        for source in sources\n          for name of source\n            target[name] = source[name]\n  \n        return target\n",
              "type": "blob"
            }
          },
          "distribution": {
            "global_volume": {
              "path": "global_volume",
              "content": "(function() {\n  var Observable;\n\n  Observable = require(\"observable\");\n\n  module.exports = Observable(0.5);\n\n}).call(this);\n\n//# sourceURL=global_volume.coffee",
              "type": "blob"
            },
            "main": {
              "path": "main",
              "content": "(function() {\n  module.exports = {\n    Music: require(\"./music\"),\n    Sound: require(\"./sound\"),\n    Control: {\n      volume: require(\"./global_volume\")\n    }\n  };\n\n}).call(this);\n\n//# sourceURL=main.coffee",
              "type": "blob"
            },
            "music": {
              "path": "music",
              "content": "(function() {\n  var extend, globalVolume, track, updateVolume;\n\n  extend = require(\"./util\").extend;\n\n  globalVolume = require(\"./global_volume\");\n\n  globalVolume.observe(function() {\n    return updateVolume(track);\n  });\n\n  track = extend(document.createElement(\"audio\"), {\n    loop: \"loop\"\n  });\n\n  document.body.appendChild(track);\n\n  track.baseVolume = 1;\n\n  module.exports = {\n    playFromURL: function(url, _arg) {\n      var volume;\n      volume = (_arg != null ? _arg : {}).volume;\n      if (volume == null) {\n        volume = 1;\n      }\n      track.src = url;\n      track.baseVolume = volume;\n      updateVolume(track);\n      return track.play();\n    }\n  };\n\n  updateVolume = function(channel) {\n    return channel.volume = channel.baseVolume * globalVolume();\n  };\n\n}).call(this);\n\n//# sourceURL=music.coffee",
              "type": "blob"
            },
            "pixie": {
              "path": "pixie",
              "content": "module.exports = {\"version\":\"0.2.0\",\"dependencies\":{\"observable\":\"distri/observable:v0.1.0\"}};",
              "type": "blob"
            },
            "sound": {
              "path": "sound",
              "content": "(function() {\n  var channels, extend, freeChannel, globalVolume, maxChannels, updateVolume, _i, _results;\n\n  extend = require(\"./util\").extend;\n\n  globalVolume = require(\"./global_volume\");\n\n  globalVolume.observe(function(newVolume) {\n    return channels.forEach(updateVolume);\n  });\n\n  maxChannels = 16;\n\n  channels = (function() {\n    _results = [];\n    for (var _i = 0; 0 <= maxChannels ? _i < maxChannels : _i > maxChannels; 0 <= maxChannels ? _i++ : _i--){ _results.push(_i); }\n    return _results;\n  }).apply(this).map(function() {\n    return extend(document.createElement(\"audio\"), {\n      autobuffer: true,\n      baseVolume: 1,\n      preload: 'auto'\n    });\n  });\n\n  freeChannel = function() {\n    var freeChannels;\n    freeChannels = channels.filter(function(sound) {\n      return sound.currentTime === sound.duration || sound.currentTime === 0;\n    });\n    return freeChannels[0];\n  };\n\n  module.exports = {\n    playFromURL: function(url, _arg) {\n      var channel, volume;\n      volume = (_arg != null ? _arg : {}).volume;\n      if (volume == null) {\n        volume = 1;\n      }\n      if (channel = freeChannel()) {\n        try {\n          channel.currentTime = 0;\n        } catch (_error) {}\n        channel.src = url;\n        channel.baseVolume = volume;\n        updateVolume(channel);\n        channel.play();\n        return channel;\n      }\n    }\n  };\n\n  updateVolume = function(channel) {\n    return channel.volume = channel.baseVolume * globalVolume();\n  };\n\n}).call(this);\n\n//# sourceURL=sound.coffee",
              "type": "blob"
            },
            "test/main": {
              "path": "test/main",
              "content": "(function() {\n  var Audio;\n\n  Audio = require(\"../main\");\n\n  describe(\"Audio\", function() {\n    it(\"should have Sound\", function() {\n      return assert(Audio.Sound);\n    });\n    it(\"should have Music\", function() {\n      return assert(Audio.Music);\n    });\n    return it(\"should have a volume control\", function() {\n      return assert(Audio.Control.volume);\n    });\n  });\n\n}).call(this);\n\n//# sourceURL=test/main.coffee",
              "type": "blob"
            },
            "test/music": {
              "path": "test/music",
              "content": "(function() {\n  var Music;\n\n  Music = require(\"/music\");\n\n  describe(\"Music\", function() {\n    return it(\"should be able to play from urls\", function() {\n      return assert(Music.playFromURL);\n    });\n  });\n\n}).call(this);\n\n//# sourceURL=test/music.coffee",
              "type": "blob"
            },
            "test/sound": {
              "path": "test/sound",
              "content": "(function() {\n  var Sound;\n\n  Sound = require(\"/sound\");\n\n  describe(\"Sound\", function() {\n    return it(\"should be able to play from urls\", function() {\n      return assert(Sound.playFromURL);\n    });\n  });\n\n}).call(this);\n\n//# sourceURL=test/sound.coffee",
              "type": "blob"
            },
            "util": {
              "path": "util",
              "content": "(function() {\n  var __slice = [].slice;\n\n  module.exports = {\n    extend: function() {\n      var name, source, sources, target, _i, _len;\n      target = arguments[0], sources = 2 <= arguments.length ? __slice.call(arguments, 1) : [];\n      for (_i = 0, _len = sources.length; _i < _len; _i++) {\n        source = sources[_i];\n        for (name in source) {\n          target[name] = source[name];\n        }\n      }\n      return target;\n    }\n  };\n\n}).call(this);\n\n//# sourceURL=util.coffee",
              "type": "blob"
            }
          },
          "progenitor": {
            "url": "http://strd6.github.io/editor/"
          },
          "version": "0.2.0",
          "entryPoint": "main",
          "repository": {
            "id": 17075989,
            "name": "audio",
            "full_name": "distri/audio",
            "owner": {
              "login": "distri",
              "id": 6005125,
              "avatar_url": "https://gravatar.com/avatar/192f3f168409e79c42107f081139d9f3?d=https%3A%2F%2Fidenticons.github.com%2Ff90c81ffc1498e260c820082f2e7ca5f.png&r=x",
              "gravatar_id": "192f3f168409e79c42107f081139d9f3",
              "url": "https://api.github.com/users/distri",
              "html_url": "https://github.com/distri",
              "followers_url": "https://api.github.com/users/distri/followers",
              "following_url": "https://api.github.com/users/distri/following{/other_user}",
              "gists_url": "https://api.github.com/users/distri/gists{/gist_id}",
              "starred_url": "https://api.github.com/users/distri/starred{/owner}{/repo}",
              "subscriptions_url": "https://api.github.com/users/distri/subscriptions",
              "organizations_url": "https://api.github.com/users/distri/orgs",
              "repos_url": "https://api.github.com/users/distri/repos",
              "events_url": "https://api.github.com/users/distri/events{/privacy}",
              "received_events_url": "https://api.github.com/users/distri/received_events",
              "type": "Organization",
              "site_admin": false
            },
            "private": false,
            "html_url": "https://github.com/distri/audio",
            "description": "Sounds in da browser.",
            "fork": false,
            "url": "https://api.github.com/repos/distri/audio",
            "forks_url": "https://api.github.com/repos/distri/audio/forks",
            "keys_url": "https://api.github.com/repos/distri/audio/keys{/key_id}",
            "collaborators_url": "https://api.github.com/repos/distri/audio/collaborators{/collaborator}",
            "teams_url": "https://api.github.com/repos/distri/audio/teams",
            "hooks_url": "https://api.github.com/repos/distri/audio/hooks",
            "issue_events_url": "https://api.github.com/repos/distri/audio/issues/events{/number}",
            "events_url": "https://api.github.com/repos/distri/audio/events",
            "assignees_url": "https://api.github.com/repos/distri/audio/assignees{/user}",
            "branches_url": "https://api.github.com/repos/distri/audio/branches{/branch}",
            "tags_url": "https://api.github.com/repos/distri/audio/tags",
            "blobs_url": "https://api.github.com/repos/distri/audio/git/blobs{/sha}",
            "git_tags_url": "https://api.github.com/repos/distri/audio/git/tags{/sha}",
            "git_refs_url": "https://api.github.com/repos/distri/audio/git/refs{/sha}",
            "trees_url": "https://api.github.com/repos/distri/audio/git/trees{/sha}",
            "statuses_url": "https://api.github.com/repos/distri/audio/statuses/{sha}",
            "languages_url": "https://api.github.com/repos/distri/audio/languages",
            "stargazers_url": "https://api.github.com/repos/distri/audio/stargazers",
            "contributors_url": "https://api.github.com/repos/distri/audio/contributors",
            "subscribers_url": "https://api.github.com/repos/distri/audio/subscribers",
            "subscription_url": "https://api.github.com/repos/distri/audio/subscription",
            "commits_url": "https://api.github.com/repos/distri/audio/commits{/sha}",
            "git_commits_url": "https://api.github.com/repos/distri/audio/git/commits{/sha}",
            "comments_url": "https://api.github.com/repos/distri/audio/comments{/number}",
            "issue_comment_url": "https://api.github.com/repos/distri/audio/issues/comments/{number}",
            "contents_url": "https://api.github.com/repos/distri/audio/contents/{+path}",
            "compare_url": "https://api.github.com/repos/distri/audio/compare/{base}...{head}",
            "merges_url": "https://api.github.com/repos/distri/audio/merges",
            "archive_url": "https://api.github.com/repos/distri/audio/{archive_format}{/ref}",
            "downloads_url": "https://api.github.com/repos/distri/audio/downloads",
            "issues_url": "https://api.github.com/repos/distri/audio/issues{/number}",
            "pulls_url": "https://api.github.com/repos/distri/audio/pulls{/number}",
            "milestones_url": "https://api.github.com/repos/distri/audio/milestones{/number}",
            "notifications_url": "https://api.github.com/repos/distri/audio/notifications{?since,all,participating}",
            "labels_url": "https://api.github.com/repos/distri/audio/labels{/name}",
            "releases_url": "https://api.github.com/repos/distri/audio/releases{/id}",
            "created_at": "2014-02-22T02:01:15Z",
            "updated_at": "2014-03-14T22:16:26Z",
            "pushed_at": "2014-03-14T22:16:25Z",
            "git_url": "git://github.com/distri/audio.git",
            "ssh_url": "git@github.com:distri/audio.git",
            "clone_url": "https://github.com/distri/audio.git",
            "svn_url": "https://github.com/distri/audio",
            "homepage": null,
            "size": 248,
            "stargazers_count": 0,
            "watchers_count": 0,
            "language": "CoffeeScript",
            "has_issues": true,
            "has_downloads": true,
            "has_wiki": true,
            "forks_count": 0,
            "mirror_url": null,
            "open_issues_count": 0,
            "forks": 0,
            "open_issues": 0,
            "watchers": 0,
            "default_branch": "master",
            "master_branch": "master",
            "permissions": {
              "admin": true,
              "push": true,
              "pull": true
            },
            "organization": {
              "login": "distri",
              "id": 6005125,
              "avatar_url": "https://gravatar.com/avatar/192f3f168409e79c42107f081139d9f3?d=https%3A%2F%2Fidenticons.github.com%2Ff90c81ffc1498e260c820082f2e7ca5f.png&r=x",
              "gravatar_id": "192f3f168409e79c42107f081139d9f3",
              "url": "https://api.github.com/users/distri",
              "html_url": "https://github.com/distri",
              "followers_url": "https://api.github.com/users/distri/followers",
              "following_url": "https://api.github.com/users/distri/following{/other_user}",
              "gists_url": "https://api.github.com/users/distri/gists{/gist_id}",
              "starred_url": "https://api.github.com/users/distri/starred{/owner}{/repo}",
              "subscriptions_url": "https://api.github.com/users/distri/subscriptions",
              "organizations_url": "https://api.github.com/users/distri/orgs",
              "repos_url": "https://api.github.com/users/distri/repos",
              "events_url": "https://api.github.com/users/distri/events{/privacy}",
              "received_events_url": "https://api.github.com/users/distri/received_events",
              "type": "Organization",
              "site_admin": false
            },
            "network_count": 0,
            "subscribers_count": 2,
            "branch": "v0.2.0",
            "publishBranch": "gh-pages"
          },
          "dependencies": {
            "observable": {
              "source": {
                "LICENSE": {
                  "path": "LICENSE",
                  "mode": "100644",
                  "content": "The MIT License (MIT)\n\nCopyright (c) 2014 distri\n\nPermission is hereby granted, free of charge, to any person obtaining a copy of\nthis software and associated documentation files (the \"Software\"), to deal in\nthe Software without restriction, including without limitation the rights to\nuse, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of\nthe Software, and to permit persons to whom the Software is furnished to do so,\nsubject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS\nFOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR\nCOPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER\nIN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN\nCONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\n",
                  "type": "blob"
                },
                "README.md": {
                  "path": "README.md",
                  "mode": "100644",
                  "content": "observable\n==========\n",
                  "type": "blob"
                },
                "main.coffee.md": {
                  "path": "main.coffee.md",
                  "mode": "100644",
                  "content": "Observable\n==========\n\n`Observable` allows for observing arrays, functions, and objects.\n\nFunction dependencies are automagically observed.\n\nStandard array methods are proxied through to the underlying array.\n\n    Observable = (value) ->\n\nReturn the object if it is already an observable object.\n\n      return value if typeof value?.observe is \"function\"\n\nMaintain a set of listeners to observe changes and provide a helper to notify each observer.\n\n      listeners = []\n\n      notify = (newValue) ->\n        listeners.forEach (listener) ->\n          listener(newValue)\n\nOur observable function is stored as a reference to `self`.\n\nIf `value` is a function compute dependencies and listen to observables that it depends on.\n\n      if typeof value is 'function'\n        fn = value\n        self = ->\n          # Automagic dependency observation\n          if base\n            self.observe base\n\n          return value\n\n        self.observe = (listener) ->\n          listeners.push listener\n\n        changed = ->\n          value = fn()\n          notify(value)\n\n        value = computeDependencies(fn, changed)\n\n      else\n\nWhen called with zero arguments it is treated as a getter. When called with one argument it is treated as a setter.\n\nChanges to the value will trigger notifications.\n\nThe value is always returned.\n\n        self = (newValue) ->\n          if arguments.length > 0\n            if value != newValue\n              value = newValue\n\n              notify(newValue)\n          else\n            # Automagic dependency observation\n            if base\n              self.observe base\n\n          return value\n\nAdd a listener for when this object changes.\n\n        self.observe = (listener) ->\n          listeners.push listener\n\nThis `each` iterator is similar to [the Maybe monad](http://en.wikipedia.org/wiki/Monad_&#40;functional_programming&#41;#The_Maybe_monad) in that our observable may contain a single value or nothing at all.\n\n      self.each = (args...) ->\n        if value?\n          [value].forEach(args...)\n\nIf the value is an array then proxy array methods and add notifications to mutation events.\n\n      if Array.isArray(value)\n        [\n          \"concat\"\n          \"every\"\n          \"filter\"\n          \"forEach\"\n          \"indexOf\"\n          \"join\"\n          \"lastIndexOf\"\n          \"map\"\n          \"reduce\"\n          \"reduceRight\"\n          \"slice\"\n          \"some\"\n        ].forEach (method) ->\n          self[method] = (args...) ->\n            value[method](args...)\n\n        [\n          \"pop\"\n          \"push\"\n          \"reverse\"\n          \"shift\"\n          \"splice\"\n          \"sort\"\n          \"unshift\"\n        ].forEach (method) ->\n          self[method] = (args...) ->\n            notifyReturning value[method](args...)\n\n        notifyReturning = (returnValue) ->\n          notify(value)\n\n          return returnValue\n\nAdd some extra helpful methods to array observables.\n\n        extend self,\n          each: (args...) ->\n            self.forEach(args...)\n\n            return self\n\nRemove an element from the array and notify observers of changes.\n\n          remove: (object) ->\n            index = value.indexOf(object)\n\n            if index >= 0\n              notifyReturning value.splice(index, 1)[0]\n\n          get: (index) ->\n            value[index]\n\n          first: ->\n            value[0]\n\n          last: ->\n            value[value.length-1]\n\n      self.stopObserving = (fn) ->\n        remove listeners, fn\n\n      return self\n\nExport `Observable`\n\n    module.exports = Observable\n\nAppendix\n--------\n\nThe extend method adds one objects properties to another.\n\n    extend = (target, sources...) ->\n      for source in sources\n        for name of source\n          target[name] = source[name]\n\n      return target\n\n    base = undefined\n\nAutomagically compute dependencies.\n\n    computeDependencies = (fn, root) ->\n      base = root\n      value = fn()\n      base = undefined\n\n      return value\n\nRemove a value from an array.\n\n    remove = (array, value) ->\n      index = array.indexOf(value)\n\n      if index >= 0\n        array.splice(index, 1)[0]\n",
                  "type": "blob"
                },
                "test/observable.coffee": {
                  "path": "test/observable.coffee",
                  "mode": "100644",
                  "content": "Observable = require \"../main\"\n\ndescribe 'Observable', ->\n  it 'should create an observable for an object', ->\n    n = 5\n\n    observable = Observable(n)\n\n    assert.equal(observable(), n)\n\n  it 'should fire events when setting', ->\n    string = \"yolo\"\n\n    observable = Observable(string)\n    observable.observe (newValue) ->\n      assert.equal newValue, \"4life\"\n\n    observable(\"4life\")\n\n  it 'should be idempotent', ->\n    o = Observable(5)\n\n    assert.equal o, Observable(o)\n\n  describe \"#each\", ->\n    it \"should be invoked once if there is an observable\", ->\n      o = Observable(5)\n      called = 0\n\n      o.each (value) ->\n        called += 1\n        assert.equal value, 5\n\n      assert.equal called, 1\n\n    it \"should not be invoked if observable is null\", ->\n      o = Observable(null)\n      called = 0\n\n      o.each (value) ->\n        called += 1\n\n      assert.equal called, 0\n\n  it \"should allow for stopping observation\", ->\n    observable = Observable(\"string\")\n\n    called = 0\n    fn = (newValue) ->\n      called += 1\n      assert.equal newValue, \"4life\"\n\n    observable.observe fn\n\n    observable(\"4life\")\n\n    observable.stopObserving fn\n\n    observable(\"wat\")\n\n    assert.equal called, 1\n\ndescribe \"Observable Array\", ->\n  it \"should proxy array methods\", ->\n    o = Observable [5]\n\n    o.map (n) ->\n      assert.equal n, 5\n\n  it \"should notify on mutation methods\", (done) ->\n    o = Observable []\n\n    o.observe (newValue) ->\n      assert.equal newValue[0], 1\n\n    o.push 1\n\n    done()\n\n  it \"should have an each method\", ->\n    o = Observable []\n\n    assert o.each\n\n  it \"#get\", ->\n    o = Observable [0, 1, 2, 3]\n\n    assert.equal o.get(2), 2\n\n  it \"#first\", ->\n    o = Observable [0, 1, 2, 3]\n\n    assert.equal o.first(), 0\n\n  it \"#last\", ->\n    o = Observable [0, 1, 2, 3]\n\n    assert.equal o.last(), 3\n\n  it \"#remove\", (done) ->\n    o = Observable [0, 1, 2, 3]\n\n    o.observe (newValue) ->\n      assert.equal newValue.length, 3\n      setTimeout ->\n        done()\n      , 0\n\n    assert.equal o.remove(2), 2\n\n  # TODO: This looks like it might be impossible\n  it \"should proxy the length property\"\n\ndescribe \"Observable functions\", ->\n  it \"should compute dependencies\", (done) ->\n    firstName = Observable \"Duder\"\n    lastName = Observable \"Man\"\n\n    o = Observable ->\n      \"#{firstName()} #{lastName()}\"\n\n    o.observe (newValue) ->\n      assert.equal newValue, \"Duder Bro\"\n\n      done()\n\n    lastName \"Bro\"\n\n  it \"should allow double nesting\", (done) ->\n    bottom = Observable \"rad\"\n    middle = Observable ->\n      bottom()\n    top = Observable ->\n      middle()\n\n    top.observe (newValue) ->\n      assert.equal newValue, \"wat\"\n      assert.equal top(), newValue\n      assert.equal middle(), newValue\n\n      done()\n\n    bottom(\"wat\")\n\n  it \"should have an each method\", ->\n    o = Observable ->\n\n    assert o.each\n\n  it \"should not invoke when returning undefined\", ->\n    o = Observable ->\n\n    o.each ->\n      assert false\n\n  it \"should invoke when returning any defined value\", (done) ->\n    o = Observable -> 5\n\n    o.each (n) ->\n      assert.equal n, 5\n      done()\n",
                  "type": "blob"
                },
                "pixie.cson": {
                  "path": "pixie.cson",
                  "mode": "100644",
                  "content": "version: \"0.1.0\"\n",
                  "type": "blob"
                }
              },
              "distribution": {
                "main": {
                  "path": "main",
                  "content": "(function() {\n  var Observable, base, computeDependencies, extend, remove,\n    __slice = [].slice;\n\n  Observable = function(value) {\n    var changed, fn, listeners, notify, notifyReturning, self;\n    if (typeof (value != null ? value.observe : void 0) === \"function\") {\n      return value;\n    }\n    listeners = [];\n    notify = function(newValue) {\n      return listeners.forEach(function(listener) {\n        return listener(newValue);\n      });\n    };\n    if (typeof value === 'function') {\n      fn = value;\n      self = function() {\n        if (base) {\n          self.observe(base);\n        }\n        return value;\n      };\n      self.observe = function(listener) {\n        return listeners.push(listener);\n      };\n      changed = function() {\n        value = fn();\n        return notify(value);\n      };\n      value = computeDependencies(fn, changed);\n    } else {\n      self = function(newValue) {\n        if (arguments.length > 0) {\n          if (value !== newValue) {\n            value = newValue;\n            notify(newValue);\n          }\n        } else {\n          if (base) {\n            self.observe(base);\n          }\n        }\n        return value;\n      };\n      self.observe = function(listener) {\n        return listeners.push(listener);\n      };\n    }\n    self.each = function() {\n      var args, _ref;\n      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];\n      if (value != null) {\n        return (_ref = [value]).forEach.apply(_ref, args);\n      }\n    };\n    if (Array.isArray(value)) {\n      [\"concat\", \"every\", \"filter\", \"forEach\", \"indexOf\", \"join\", \"lastIndexOf\", \"map\", \"reduce\", \"reduceRight\", \"slice\", \"some\"].forEach(function(method) {\n        return self[method] = function() {\n          var args;\n          args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];\n          return value[method].apply(value, args);\n        };\n      });\n      [\"pop\", \"push\", \"reverse\", \"shift\", \"splice\", \"sort\", \"unshift\"].forEach(function(method) {\n        return self[method] = function() {\n          var args;\n          args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];\n          return notifyReturning(value[method].apply(value, args));\n        };\n      });\n      notifyReturning = function(returnValue) {\n        notify(value);\n        return returnValue;\n      };\n      extend(self, {\n        each: function() {\n          var args;\n          args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];\n          self.forEach.apply(self, args);\n          return self;\n        },\n        remove: function(object) {\n          var index;\n          index = value.indexOf(object);\n          if (index >= 0) {\n            return notifyReturning(value.splice(index, 1)[0]);\n          }\n        },\n        get: function(index) {\n          return value[index];\n        },\n        first: function() {\n          return value[0];\n        },\n        last: function() {\n          return value[value.length - 1];\n        }\n      });\n    }\n    self.stopObserving = function(fn) {\n      return remove(listeners, fn);\n    };\n    return self;\n  };\n\n  module.exports = Observable;\n\n  extend = function() {\n    var name, source, sources, target, _i, _len;\n    target = arguments[0], sources = 2 <= arguments.length ? __slice.call(arguments, 1) : [];\n    for (_i = 0, _len = sources.length; _i < _len; _i++) {\n      source = sources[_i];\n      for (name in source) {\n        target[name] = source[name];\n      }\n    }\n    return target;\n  };\n\n  base = void 0;\n\n  computeDependencies = function(fn, root) {\n    var value;\n    base = root;\n    value = fn();\n    base = void 0;\n    return value;\n  };\n\n  remove = function(array, value) {\n    var index;\n    index = array.indexOf(value);\n    if (index >= 0) {\n      return array.splice(index, 1)[0];\n    }\n  };\n\n}).call(this);\n\n//# sourceURL=main.coffee",
                  "type": "blob"
                },
                "test/observable": {
                  "path": "test/observable",
                  "content": "(function() {\n  var Observable;\n\n  Observable = require(\"../main\");\n\n  describe('Observable', function() {\n    it('should create an observable for an object', function() {\n      var n, observable;\n      n = 5;\n      observable = Observable(n);\n      return assert.equal(observable(), n);\n    });\n    it('should fire events when setting', function() {\n      var observable, string;\n      string = \"yolo\";\n      observable = Observable(string);\n      observable.observe(function(newValue) {\n        return assert.equal(newValue, \"4life\");\n      });\n      return observable(\"4life\");\n    });\n    it('should be idempotent', function() {\n      var o;\n      o = Observable(5);\n      return assert.equal(o, Observable(o));\n    });\n    describe(\"#each\", function() {\n      it(\"should be invoked once if there is an observable\", function() {\n        var called, o;\n        o = Observable(5);\n        called = 0;\n        o.each(function(value) {\n          called += 1;\n          return assert.equal(value, 5);\n        });\n        return assert.equal(called, 1);\n      });\n      return it(\"should not be invoked if observable is null\", function() {\n        var called, o;\n        o = Observable(null);\n        called = 0;\n        o.each(function(value) {\n          return called += 1;\n        });\n        return assert.equal(called, 0);\n      });\n    });\n    return it(\"should allow for stopping observation\", function() {\n      var called, fn, observable;\n      observable = Observable(\"string\");\n      called = 0;\n      fn = function(newValue) {\n        called += 1;\n        return assert.equal(newValue, \"4life\");\n      };\n      observable.observe(fn);\n      observable(\"4life\");\n      observable.stopObserving(fn);\n      observable(\"wat\");\n      return assert.equal(called, 1);\n    });\n  });\n\n  describe(\"Observable Array\", function() {\n    it(\"should proxy array methods\", function() {\n      var o;\n      o = Observable([5]);\n      return o.map(function(n) {\n        return assert.equal(n, 5);\n      });\n    });\n    it(\"should notify on mutation methods\", function(done) {\n      var o;\n      o = Observable([]);\n      o.observe(function(newValue) {\n        return assert.equal(newValue[0], 1);\n      });\n      o.push(1);\n      return done();\n    });\n    it(\"should have an each method\", function() {\n      var o;\n      o = Observable([]);\n      return assert(o.each);\n    });\n    it(\"#get\", function() {\n      var o;\n      o = Observable([0, 1, 2, 3]);\n      return assert.equal(o.get(2), 2);\n    });\n    it(\"#first\", function() {\n      var o;\n      o = Observable([0, 1, 2, 3]);\n      return assert.equal(o.first(), 0);\n    });\n    it(\"#last\", function() {\n      var o;\n      o = Observable([0, 1, 2, 3]);\n      return assert.equal(o.last(), 3);\n    });\n    it(\"#remove\", function(done) {\n      var o;\n      o = Observable([0, 1, 2, 3]);\n      o.observe(function(newValue) {\n        assert.equal(newValue.length, 3);\n        return setTimeout(function() {\n          return done();\n        }, 0);\n      });\n      return assert.equal(o.remove(2), 2);\n    });\n    return it(\"should proxy the length property\");\n  });\n\n  describe(\"Observable functions\", function() {\n    it(\"should compute dependencies\", function(done) {\n      var firstName, lastName, o;\n      firstName = Observable(\"Duder\");\n      lastName = Observable(\"Man\");\n      o = Observable(function() {\n        return \"\" + (firstName()) + \" \" + (lastName());\n      });\n      o.observe(function(newValue) {\n        assert.equal(newValue, \"Duder Bro\");\n        return done();\n      });\n      return lastName(\"Bro\");\n    });\n    it(\"should allow double nesting\", function(done) {\n      var bottom, middle, top;\n      bottom = Observable(\"rad\");\n      middle = Observable(function() {\n        return bottom();\n      });\n      top = Observable(function() {\n        return middle();\n      });\n      top.observe(function(newValue) {\n        assert.equal(newValue, \"wat\");\n        assert.equal(top(), newValue);\n        assert.equal(middle(), newValue);\n        return done();\n      });\n      return bottom(\"wat\");\n    });\n    it(\"should have an each method\", function() {\n      var o;\n      o = Observable(function() {});\n      return assert(o.each);\n    });\n    it(\"should not invoke when returning undefined\", function() {\n      var o;\n      o = Observable(function() {});\n      return o.each(function() {\n        return assert(false);\n      });\n    });\n    return it(\"should invoke when returning any defined value\", function(done) {\n      var o;\n      o = Observable(function() {\n        return 5;\n      });\n      return o.each(function(n) {\n        assert.equal(n, 5);\n        return done();\n      });\n    });\n  });\n\n}).call(this);\n\n//# sourceURL=test/observable.coffee",
                  "type": "blob"
                },
                "pixie": {
                  "path": "pixie",
                  "content": "module.exports = {\"version\":\"0.1.0\"};",
                  "type": "blob"
                }
              },
              "progenitor": {
                "url": "http://strd6.github.io/editor/"
              },
              "version": "0.1.0",
              "entryPoint": "main",
              "repository": {
                "id": 17119562,
                "name": "observable",
                "full_name": "distri/observable",
                "owner": {
                  "login": "distri",
                  "id": 6005125,
                  "avatar_url": "https://identicons.github.com/f90c81ffc1498e260c820082f2e7ca5f.png",
                  "gravatar_id": null,
                  "url": "https://api.github.com/users/distri",
                  "html_url": "https://github.com/distri",
                  "followers_url": "https://api.github.com/users/distri/followers",
                  "following_url": "https://api.github.com/users/distri/following{/other_user}",
                  "gists_url": "https://api.github.com/users/distri/gists{/gist_id}",
                  "starred_url": "https://api.github.com/users/distri/starred{/owner}{/repo}",
                  "subscriptions_url": "https://api.github.com/users/distri/subscriptions",
                  "organizations_url": "https://api.github.com/users/distri/orgs",
                  "repos_url": "https://api.github.com/users/distri/repos",
                  "events_url": "https://api.github.com/users/distri/events{/privacy}",
                  "received_events_url": "https://api.github.com/users/distri/received_events",
                  "type": "Organization",
                  "site_admin": false
                },
                "private": false,
                "html_url": "https://github.com/distri/observable",
                "description": "",
                "fork": false,
                "url": "https://api.github.com/repos/distri/observable",
                "forks_url": "https://api.github.com/repos/distri/observable/forks",
                "keys_url": "https://api.github.com/repos/distri/observable/keys{/key_id}",
                "collaborators_url": "https://api.github.com/repos/distri/observable/collaborators{/collaborator}",
                "teams_url": "https://api.github.com/repos/distri/observable/teams",
                "hooks_url": "https://api.github.com/repos/distri/observable/hooks",
                "issue_events_url": "https://api.github.com/repos/distri/observable/issues/events{/number}",
                "events_url": "https://api.github.com/repos/distri/observable/events",
                "assignees_url": "https://api.github.com/repos/distri/observable/assignees{/user}",
                "branches_url": "https://api.github.com/repos/distri/observable/branches{/branch}",
                "tags_url": "https://api.github.com/repos/distri/observable/tags",
                "blobs_url": "https://api.github.com/repos/distri/observable/git/blobs{/sha}",
                "git_tags_url": "https://api.github.com/repos/distri/observable/git/tags{/sha}",
                "git_refs_url": "https://api.github.com/repos/distri/observable/git/refs{/sha}",
                "trees_url": "https://api.github.com/repos/distri/observable/git/trees{/sha}",
                "statuses_url": "https://api.github.com/repos/distri/observable/statuses/{sha}",
                "languages_url": "https://api.github.com/repos/distri/observable/languages",
                "stargazers_url": "https://api.github.com/repos/distri/observable/stargazers",
                "contributors_url": "https://api.github.com/repos/distri/observable/contributors",
                "subscribers_url": "https://api.github.com/repos/distri/observable/subscribers",
                "subscription_url": "https://api.github.com/repos/distri/observable/subscription",
                "commits_url": "https://api.github.com/repos/distri/observable/commits{/sha}",
                "git_commits_url": "https://api.github.com/repos/distri/observable/git/commits{/sha}",
                "comments_url": "https://api.github.com/repos/distri/observable/comments{/number}",
                "issue_comment_url": "https://api.github.com/repos/distri/observable/issues/comments/{number}",
                "contents_url": "https://api.github.com/repos/distri/observable/contents/{+path}",
                "compare_url": "https://api.github.com/repos/distri/observable/compare/{base}...{head}",
                "merges_url": "https://api.github.com/repos/distri/observable/merges",
                "archive_url": "https://api.github.com/repos/distri/observable/{archive_format}{/ref}",
                "downloads_url": "https://api.github.com/repos/distri/observable/downloads",
                "issues_url": "https://api.github.com/repos/distri/observable/issues{/number}",
                "pulls_url": "https://api.github.com/repos/distri/observable/pulls{/number}",
                "milestones_url": "https://api.github.com/repos/distri/observable/milestones{/number}",
                "notifications_url": "https://api.github.com/repos/distri/observable/notifications{?since,all,participating}",
                "labels_url": "https://api.github.com/repos/distri/observable/labels{/name}",
                "releases_url": "https://api.github.com/repos/distri/observable/releases{/id}",
                "created_at": "2014-02-23T23:17:52Z",
                "updated_at": "2014-02-23T23:17:52Z",
                "pushed_at": "2014-02-23T23:17:52Z",
                "git_url": "git://github.com/distri/observable.git",
                "ssh_url": "git@github.com:distri/observable.git",
                "clone_url": "https://github.com/distri/observable.git",
                "svn_url": "https://github.com/distri/observable",
                "homepage": null,
                "size": 0,
                "stargazers_count": 0,
                "watchers_count": 0,
                "language": null,
                "has_issues": true,
                "has_downloads": true,
                "has_wiki": true,
                "forks_count": 0,
                "mirror_url": null,
                "open_issues_count": 0,
                "forks": 0,
                "open_issues": 0,
                "watchers": 0,
                "default_branch": "master",
                "master_branch": "master",
                "permissions": {
                  "admin": true,
                  "push": true,
                  "pull": true
                },
                "organization": {
                  "login": "distri",
                  "id": 6005125,
                  "avatar_url": "https://identicons.github.com/f90c81ffc1498e260c820082f2e7ca5f.png",
                  "gravatar_id": null,
                  "url": "https://api.github.com/users/distri",
                  "html_url": "https://github.com/distri",
                  "followers_url": "https://api.github.com/users/distri/followers",
                  "following_url": "https://api.github.com/users/distri/following{/other_user}",
                  "gists_url": "https://api.github.com/users/distri/gists{/gist_id}",
                  "starred_url": "https://api.github.com/users/distri/starred{/owner}{/repo}",
                  "subscriptions_url": "https://api.github.com/users/distri/subscriptions",
                  "organizations_url": "https://api.github.com/users/distri/orgs",
                  "repos_url": "https://api.github.com/users/distri/repos",
                  "events_url": "https://api.github.com/users/distri/events{/privacy}",
                  "received_events_url": "https://api.github.com/users/distri/received_events",
                  "type": "Organization",
                  "site_admin": false
                },
                "network_count": 0,
                "subscribers_count": 2,
                "branch": "v0.1.0",
                "defaultBranch": "master"
              },
              "dependencies": {}
            }
          }
        }
      }
    }
  }
});