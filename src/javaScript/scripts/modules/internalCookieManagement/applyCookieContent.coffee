applyCookieContent = (app,module) ->
    globals = app.modules.globals
    elvCCCookie = globals.elvCCCookie
    segmentsSettings = globals.inputFeed.CCsettings.partSegments.segments
    segments = elvCCCookie.segments
    
    elvCC = $('.elvCC')
    
    # Show bar if set
    if elvCCCookie.barShown is true
        elvCC.addClass '-opened'
        
    # Run for all segments
    for segment in segments
        segmentElement = $('[data-segmentid="'+segment.segmentID+'"]')
        
        # If segment is allowed
        if segment.segmentAllowance is true
            segmentElement.addClass '-isAllowed'
            segmentElement
                .find 'input'
                .prop 'checked', true
            
            # Match right segment with input settings
            for singleSetting in segmentsSettings
                
                if segment.segmentID is singleSetting.segmentID
                    singleSetting.onAllow(segment.segmentID)

        # If segment is not allowed
        else
            segmentElement.removeClass '-isAllowed'
            segmentElement
                .find 'input'
                .prop 'checked', false
    
            # Match right segment with input settings
            for singleSetting in segmentsSettings
            
                if segment.segmentID is singleSetting.segmentID
                    singleSetting.onReject(segment.segmentID)


export default applyCookieContent