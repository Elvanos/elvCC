stringUpdate = (app,module,command) ->
    
    if command is 'segmentsShow'
        confirmButton = $('.elvCC-confirm')
        settingsButton = $('.elvCC-segmentSettings')
    
        confirmButton.text 'Save settings'
        settingsButton.text 'hide cookie settings'
    
    if command is 'segmentsHide'
        confirmButton = $('.elvCC-confirm')
        settingsButton = $('.elvCC-segmentSettings')
    
        settingsButton.text 'show cookie settings'
        
    return
export default stringUpdate