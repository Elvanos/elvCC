jqCheck = (app) ->
        
    loadScript = (url, callback) ->
        script = document.createElement('script')
        script.type = 'text/javascript'
        if script.readyState
            
            #IE
            script.onreadystatechange = ->
                if script.readyState == 'loaded' or script.readyState == 'complete'
                    script.onreadystatechange = null
                    callback()
                return
        
        else
            #Others
            script.onload = ->
                callback()
                return
        
        script.src = url
        document.getElementsByTagName('head')[0].appendChild script
        return
    
    loadScript 'https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js', ->
        
        #After jQuery loads, relaunch the app
        app.modules.manager(app,'initiate')
        
        return

export default jqCheck