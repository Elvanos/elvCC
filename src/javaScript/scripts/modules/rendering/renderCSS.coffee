renderCSS = (app,module) ->
    
    globals = app.modules.globals
    settings = globals.inputFeed.CCsettings

    css = "

        .elvCC {
            position: fixed;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            z-index: 9998;
            bottom: 0;
            left: 0;
            right: 0;
            padding: 15px 25px;
            opacity: 1;
            background-color: #{settings.partWrapper.cssBackgroundColor};
            color: #{settings.partWrapper.cssTextColor};
            -webkit-transition: max-height 0.3s linear, margin-bottom 0.3s linear;
            transition: max-height 0.3s linear, margin-bottom 0.3s linear;
            max-height: 0;
            margin-bottom: -30px;
            overflow-y: hidden;
        }

            @media screen and (max-width: 768px) {
                .elvCC {
                    display: -webkit-box;
                    display: -ms-flexbox;
                    display: flex;
                    -webkit-box-orient: vertical;
                    -webkit-box-direction: normal;
                    -ms-flex-direction: column;
                    flex-direction: column;
                    padding: 10px 10px;
                }
            }

            .elvCC.-opened {
                max-height: 100vh;
                margin-bottom: 0;
            }

            .elvCC * {
                font-family: Helvetica,Calibri,Arial,sans-serif;
                font-size: 14px;
                line-height: 1.5em;
            }

            .elvCC a {
                text-decoration: none;
                color: #{settings.partWrapper.cssLinkColor};
                display: inline-block;
                position: relative;
                margin-left: 12px;
            }

                .elvCC a:before {
                    content: '-';
                    position: absolute;
                    left: -10px;
                    color: #{settings.partWrapper.cssTextColor};
                    text-decoration: none;
                }

                @media screen and (max-width: 768px) {
                    .elvCC a {
                        margin-top: 10px;
                        display: block;
                    }
                }

                .elvCC a:hover {
                    text-decoration: none;
                    color: #{settings.partWrapper.cssLinkHoverColor};
                }

            .elvCC label {
                cursor: pointer;
                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
            }

            .elvCC input[type='checkbox'] {
                display: none;
            }

            .elvCC__fancyCheckbox {
                position: relative;
                display: block;
                height: 12px;
                width: 12px;
                border: 2px solid #{settings.partWrapper.cssCheckboxBorder};
            }

                .elvCC input[type=checkbox]:checked + .elvCC__fancyCheckbox:before {
                    content: '';
                    position: absolute;
                    background-color: #{settings.partWrapper.cssCheckboxColor};
                    width: 2px;
                    height: 8px;
                    left: 6px;
                    top: 2px;
                    -webkit-transform: rotate(45deg);
                    transform: rotate(45deg);
                }

                .elvCC input[type=checkbox]:checked + .elvCC__fancyCheckbox:after {
                    content: '';
                    position: absolute;
                    background-color: #{settings.partWrapper.cssCheckboxColor};
                    width: 3px;
                    height: 2px;
                    left: 2px;
                    top: 6px;
                    -webkit-transform: rotate(45deg);
                    transform: rotate(45deg);
                }

            .elvCC__summonButton {
                position: fixed;
                bottom: 0;
                left: 0;
                width: 0;
                height: 0;
                border-style: solid;
                border-width: 50px 0 0 50px;
                border-color: transparent transparent transparent #{settings.partSummon.cssBackgroundColor};
                cursor: pointer;
                -webkit-transition: left 0.3s linear;
                transition: left 0.3s linear;
            }

                .elvCC__summonButton:after {
                    content: '#{settings.partSummon.strTitle}';
                    position: fixed;
                    left: 10px;
                    bottom: 2px;
                    color: #{settings.partSummon.cssTextColor};
                    font-size: 16px;
                    font-weight: 600;
                    -webkit-transition: left 0.3s linear;
                    transition: left 0.3s linear;
                }

                .elvCC.-opened .elvCC__summonButton {
                    left: -50px;
                }

                .elvCC.-opened .elvCC__summonButton:after {
                    left: -50px;
                }

            .elvCC__base {
                display: -webkit-box;
                display: -ms-flexbox;
                display: flex;
                -webkit-box-pack: justify;
                -ms-flex-pack: justify;
                justify-content: space-between;
                -webkit-box-align: center;
                -ms-flex-align: center;
                align-items: center;
            }

                @media screen and (max-width: 768px) {
                    .elvCC__base {
                        display: block;
                    }
                }
        
                .elvCC__base__description {
                    -webkit-box-flex: 1;
                    -ms-flex-positive: 1;
                    flex-grow: 1;
                    margin-right: 20px;
                }

                    @media screen and (max-width: 768px) {
                        .elvCC__base__description {
                            margin-right: 0;
                            padding-bottom: 15px;
                        }
                    }

                .elvCC__base__confirm {
                    font-size: 15px;
                    font-weight: 600;
                    background-color: #{settings.partBase.cssButtonBackgroundColor};
                    color: #{settings.partBase.cssButtonColor};
                    cursor: pointer;
                    -webkit-user-select: none;
                    -moz-user-select: none;
                    -ms-user-select: none;
                    user-select: none;
                    padding: 5px 10px;
                    border-radius: 3px;
                    min-width: 140px;
                    text-align: center;
                    white-space: nowrap;
                    -webkit-transition: background-color 0.3s ease;
                    transition: background-color 0.3s ease;
                }

                    .elvCC__base__confirm:hover {
                        background-color: #{settings.partBase.cssButtonBackgroundColorHover};
                    }

            .elvCC__segments {
                -webkit-transition: max-height 0.3s linear, margin-top 0.2s ease;
                transition: max-height 0.3s linear, margin-top 0.2s ease;
                max-height: 0;
                overflow-x: auto;
                -webkit-overflow-scrolling: touch;
                margin-right: -25px;
                padding-right: 25px;
            }

                @media screen and (max-width: 768px) {
                    .elvCC__segments {
                        margin-right: -10px;
                        padding-right: 10px;
                    }
                }

                .elvCC__segments.-opened {
                    margin-top: 20px;
                    max-height: 300px;
                    margin-bottom: -15px;
                    padding-bottom: 10px;
                }

                .elvCC__segments__segment {
                    display: -webkit-box;
                    display: -ms-flexbox;
                    display: flex;
                    -webkit-box-align: start;
                    -ms-flex-align: start;
                    align-items: flex-start;
                    opacity: 0.6;
                    -webkit-transition: opacity 0.3s linear;
                    transition: opacity 0.3s linear;
                    padding: 5px 0;
                }

                    .elvCC__segments__segment.-isAllowed {
                        opacity: 1;
                    }

                    .elvCC__segments__segment__checkbox {
                        margin-top: 3px;
                        margin-right: 10px;
                    }

                    .elvCC__segments__segment__text {
                        -webkit-box-flex: 1;
                        -ms-flex-positive: 1;
                        flex-grow: 1;
                    }

                        .elvCC__segments__segment__text__title {
                            color: #{settings.partSegments.cssTitleColor};
                        }

                        .elvCC__segments__segment__text__description {
                            color: #{settings.partSegments.cssDescriptionColor};
                        }
        "
    
    
    head = document.getElementsByTagName('head')[0]
    s = document.createElement('style')
    s.setAttribute 'type', 'text/css'
    
    # IE
    if s.styleSheet
        s.styleSheet.cssText = css
        
    # The rest
    else
        s.appendChild document.createTextNode(css)
        
    head.appendChild s
    return

export default renderCSS