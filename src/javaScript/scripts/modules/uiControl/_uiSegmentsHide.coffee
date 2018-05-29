_uiSegmentsHide = (app, module) ->
    
    uiBar = $('.elvCC-segmentsWrapper')
    
    uiBar.removeClass '-opened'
    
    module.stringUpdate(app,module,'segmentsHide')
    
    return

export default _uiSegmentsHide