_uiHookTriggers = (app,module) ->
    
    # Set all DOM elements
    triggerSummon = $('.elvCC-summon')
    triggerApply = $('.elvCC-confirm')
    triggerSegmentsTrigger = $('.elvCC-segmentSettings')
    triggerSegmentsWrapper = $('.elvCC-segmentsWrapper')
    
    # Click for the summon button
    triggerSummon.on 'click', () ->
        module.uiControl(app,module,'showBar')
    
    # Click for the apply/save button
    triggerApply.on 'click', () ->
        module.uiControl(app,module,'hideBar')
        app.modules.manager app, 'setCookie'
        app.modules.manager app, 'applyCookieContent'
    
    # Click to open/close the segments wrapper
    triggerSegmentsTrigger.on 'click', (e) ->
        e.preventDefault()
        
        if triggerSegmentsWrapper.hasClass '-opened'
            module.uiControl(app,module,'hideSegments')
        else
            module.uiControl(app,module,'showSegments')
    
    
    # Click to allow/disallow the individual segments
    triggerSegmentsWrapper.on 'click', 'label', () ->
        segment = $(@).closest('.elvCC-segment')
        
        if segment.hasClass '-isAllowed'
            module.uiControl(app,module,'segmentUncheck',segment)
        else
            module.uiControl(app,module,'segmentCheck',segment)
        
    return
export default _uiHookTriggers