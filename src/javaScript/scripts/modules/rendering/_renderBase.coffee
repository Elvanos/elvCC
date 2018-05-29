_renderBase = (app, module) ->
    
    globals = app.modules.globals
    settings = globals.inputFeed.CCsettings
    
    appendContainer = $('.elvCC')
    
    if settings.partSegments.segments
        segmentTrigger =
            "<a
                href='#'
                class='elvCC-segmentSettings'>
                #{settings.partBase.strShowCookieSettings}
        </a>"
    else
        segmentTrigger = ''
        
    appendString =
        "<div
            class='elvCC__base'>
            <div
                class='elvCC__base__description'>
                #{settings.partBase.strDescription}
                <a
                    href='#{settings.partBase.linkMoreInfo}'
                    class='elvCC-moreInfo'
                    target='_blank'>
                    #{settings.partBase.strMoreInfo}
                </a>
                #{segmentTrigger}
               
            </div>
            <div
                class='elvCC__base__confirm elvCC-confirm'>
                #{settings.partBase.strConfirm}
            </div>
        </div>"
    appendContainer.append(appendString)
    
    # Stop render if no segments present
    if settings.partSegments.segments
        module.renderCC(app, module, 'renderSegments')
    
    return


export default _renderBase