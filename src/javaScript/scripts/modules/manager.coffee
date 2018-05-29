manager = (app,command, inputFeed) ->
    
    # Set globals, load input into globals and kill app if there is no config
    globals = app.modules.globals
    if !globals.inputFeed and inputFeed
        globals.inputFeed = inputFeed
        
    if !globals.inputFeed
        console.log 'No input data. Application terminated.'
        return false
        
   
    # Loads jQuery if it isnt present on the page
    if not window.jQuery
        
        app.modules.jqCheck.jqCheck(app)
        
        # Resets all other commands so no code is run inefficiently
        return
        

    # Run for first load on each page
    if command is 'initiate'
        
        ### RUN RENDERING MODULE ###
        subModule = app.modules.rendering
        
        # Render CSS
        subModule.renderCSS(app,subModule)
        
        # Render all parts of the HTML
        subModule.renderCC(app,subModule, 'renderWrapper')
    
    
        ### RUN UI CONTROL MODULE ###
        subModule = app.modules.uiControl
    
        # Hook in triggers for UI control
        subModule.uiControl(app,subModule, 'hookTriggers')
    
        
        ### GET COOKIE DATA & APPLY THEM ###
        app.modules.manager app, 'getCookie'
        app.modules.manager app, 'applyCookieContent'
        return
   
    
        
        # TODO - UI controls
        # - Add confirm button to segment settings (save cookie, reload specific segment)
    
    
    # Reloads cookie from user
    if command is 'getCookie'
        subModule = app.modules.internalCookieManagement
        cookieTemp = subModule.helperGetCookie app, subModule, 'elvCC'
        globals.elvCCCookie = cookieTemp
        
        # If no cookie is defined, make a new one from the scratch
        if not globals.elvCCCookie
            app.modules.manager app, 'setCookie'
            
        return
    
    # Sets cookie for the user
    if command is 'setCookie'
        subModule = app.modules.internalCookieManagement
        cookieContent = app.modules.manager app, 'constructCookieContent'
        subModule.helperSetCookie app, subModule, "elvCC", cookieContent
        
    # Rebuilds the cookie from HTML settings (reads page content)
    if command is 'constructCookieContent'
        subModule = app.modules.internalCookieManagement
        cookieContent = subModule.constructCookieContent app, subModule
        return cookieContent
        
    # Sets HTML content in accordance with the cookie content
    if command is 'applyCookieContent'
        subModule = app.modules.internalCookieManagement
        subModule.applyCookieContent app, subModule
        
        
export default manager