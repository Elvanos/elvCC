renderCC = (app, module, command) ->
    
    if command is 'renderWrapper'
        module._renderWrapper(app,module)
    
    if command is 'renderSummon'
        module._renderSummon(app,module)
    
    if command is 'renderBase'
        module._renderBase(app,module)
    
    if command is 'renderSegments'
        module._renderSegments(app,module)
    
    return
export default renderCC