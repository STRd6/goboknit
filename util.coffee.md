Util
====

    module.exports =
      applyStylesheet: (style, id="primary") ->
        styleNode = document.createElement("style")
        styleNode.innerHTML = style
        styleNode.id = id

        if previousStyleNode = document.head.querySelector("style##{id}")
          previousStyleNode.parentNode.removeChild(prevousStyleNode)

        document.head.appendChild(styleNode)

      extend: (target, sources...) ->
        for source in sources
          for name of source
            target[name] = source[name]

        return target

      defaults: (target, objects...) ->
        for object in objects
          for name of object
            unless target.hasOwnProperty(name)
              target[name] = object[name]

        return target
