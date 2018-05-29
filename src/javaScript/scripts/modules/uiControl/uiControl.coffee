uiControl = (app,module,command, segment) ->
    
    if command is 'hookTriggers'
        module._uiHookTriggers(app,module)
        
    if command is 'showBar'
        module._uiBarShow(app,module)
        
    if command is 'hideBar'
        module._uiBarHide(app,module)
    
    if command is 'showSegments'
        module._uiSegmentsShow(app,module)
    
    if command is 'hideSegments'
        module._uiSegmentsHide(app,module)
    
    if command is 'segmentCheck'
        module._uiSegmentCheck(app,module,segment)
    
    if command is 'segmentUncheck'
        module._uiSegmentUncheck(app,module,segment)
        
    return
        
export default uiControl