_renderWrapper = (app, module) ->
    
    appendContainer = $('body')

    appendString = '<div class="elvCC"></div>'
    
    appendContainer.append(appendString)
    
    module.renderCC(app, module, 'renderSummon')
    
    return
    
export default _renderWrapper