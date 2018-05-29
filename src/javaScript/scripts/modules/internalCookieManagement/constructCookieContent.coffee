constructCookieContent = (app,module) ->
    
    globals = app.modules.globals
    
    elvCC = $('.elvCC')
    segments = elvCC.find '.elvCC-segment'
    cookieContent = {}
    cookieContent.segments = []
    
    # Check if cookie already exists, if yes, read from it, otherwise set defaults
    if globals.elvCCCookie
        if elvCC.hasClass '-opened'
            cookieContent.barShown = true
        else
            cookieContent.barShown = false
    else
        cookieContent.barShown = true

    # Set dynamic values for all segments
    for segment in segments
        segment = $(segment)
        segmentID = segment.attr 'data-segmentid'
        segmentAllowance = false
        
        if segment.hasClass '-isAllowed'
            segmentAllowance = true
        
        segmentObject =
            segmentID: segmentID
            segmentAllowance: segmentAllowance
    
        cookieContent.segments.push segmentObject
    
    return cookieContent

export default constructCookieContent