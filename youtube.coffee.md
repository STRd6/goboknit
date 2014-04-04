Play a Youtube video
====================

      tag = document.createElement('script')

      tag.src = "https://www.youtube.com/iframe_api"
      firstScriptTag = document.getElementsByTagName('script')[0]
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

      callbacks = []

      stop = ->
        callbacks.forEach (callback) ->
          callback()

        callbacks = []
        $("#player").hide()

      onPlayerStateChange = (event) ->
        if event.data is YT.PlayerState.ENDED
          stop()

      stopVideo = () ->
        player.stopVideo()

      # 4. The API will call this function when the video player is ready.
      onPlayerReady = (event) ->
        ;#event.target.playVideo()

      player = undefined
      global.onYouTubeIframeAPIReady = () ->
        player = new YT.Player 'player',
          height: '390'
          width: '640'
          playerVars:
            controls: 0
            showinfo: 0
            rel: 0
          events:
            'onReady': onPlayerReady
            'onStateChange': onPlayerStateChange

      module.exports =
        playVideo: (id, completed) ->
          $("#player").show()

          player.loadVideoById id
          callbacks.push completed

        stop: stop
          