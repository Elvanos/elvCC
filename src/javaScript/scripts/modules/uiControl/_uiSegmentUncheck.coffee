_uiSegmentUncheck = (app,module,segment) ->
    
    segmentCheckbox = segment.find('input[type="checkbox"]')
    if segmentCheckbox.is(':checked')
        segment.removeClass '-isAllowed'

    return
export default _uiSegmentUncheck