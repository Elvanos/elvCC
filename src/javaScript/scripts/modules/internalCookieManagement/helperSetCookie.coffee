helperSetCookie = (app,module, cname, cvalue) ->
    globals = app.modules.globals
  
    
    d = new Date
    d.setTime d.getTime() + 31536000000
    expires = 'expires=' + d.toUTCString()
    
    cvalue = JSON.stringify(cvalue)
  
    cookieString =
        "
            #{cname} = #{cvalue}; #{expires};path=#{globals.inputFeed.CCsettings.domainLimiter}
        "
    
    document.cookie = cookieString
    
    
    # Reload cookie into globals after setting it
    app.modules.manager app, 'getCookie'
    return
    
    
    return
export default helperSetCookie