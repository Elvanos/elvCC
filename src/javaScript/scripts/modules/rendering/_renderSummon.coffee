_renderSummon = (app, module) ->
    
    globals = app.modules.globals
    settings = globals.inputFeed.CCsettings
    
    appendContainer = $('.elvCC')
    
    appendString =
        "<div
            class='elvCC__summonButton elvCC-summon'
            title='#{settings.partSummon.strDescription}'>
        </div>"
    
    appendContainer.append(appendString)
    
    module.renderCC(app, module, 'renderBase')
    
    return

export default _renderSummon