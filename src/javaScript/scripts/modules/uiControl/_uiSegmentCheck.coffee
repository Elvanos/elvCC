_uiSegmentCheck = (app,module,segment) ->
    
    segmentCheckbox = segment.find('input[type="checkbox"]')
    
    if not segmentCheckbox.is(':checked')
        segment.addClass '-isAllowed'
    
    return
export default _uiSegmentCheck