_uiSegmentsShow = (app, module) ->
    
    uiBar = $('.elvCC-segmentsWrapper')

    uiBar.addClass '-opened'
    
    module.stringUpdate(app,module,'segmentsShow')

    return

export default _uiSegmentsShow