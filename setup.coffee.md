Setup
=====

    require "cornerstone"

    global.Observable = require "observable"

    {applyStylesheet} = require "./util"

    applyStylesheet(require "./style")

    Resource = require "resource"
    Resource.add
      #images: require "./images"
      music: require "./music"
      #sounds: require "./sounds"
