_renderSegments = (app, module) ->
    
    globals = app.modules.globals
    settings = globals.inputFeed.CCsettings
    
    # Append segments wrapper
    appendContainer = $('.elvCC')
    
    appendString =
        '<div
            class="elvCC__segments elvCC-segmentsWrapper">
        </div>'
    
    appendContainer.append(appendString)
    
    # Append individual segments
    appendContainer = $('.elvCC-segmentsWrapper')
    segments = settings.partSegments.segments    
    
    for segment in segments
        
        if segment.allowed is true
            isChecked = 'checked'
            isAllowed = '-isAllowed'
        else
            isChecked = ''
            isAllowed = ''
        
        appendString =
            "<div
                class='elvCC__segments__segment elvCC-segment #{isAllowed}'
                data-segmentid='#{segment.segmentID}'>
                <div
                    class='elvCC__segments__segment__checkbox'>
                    <input
                        type='checkbox'
                        id='elvCC-segment-#{segment.segmentID}'
                        #{isChecked}
                        >
                    <label
                        for='elvCC-segment-#{segment.segmentID}'
                        class='elvCC__fancyCheckbox'>
                    </label>
                </div>
                <div
                    class='elvCC__segments__segment__text'>
                    <label
                        for='elvCC-segment-#{segment.segmentID}'
                        class='elvCC__segments__segment__text__title'>
                        #{segment.strTitle}
                    </label>
                    <div
                        class='elvCC__segments__segment__text__description'>
                        #{segment.strDescription}
                    </div>
                </div>
            </div>"
        
        appendContainer.append(appendString) 
    
    return

export default _renderSegments