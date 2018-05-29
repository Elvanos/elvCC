var elv_cookieConsent = function () {
  'use strict';

  var globals;

  globals = {};

  var globals_1 = globals;

  var applyCookieContent;

  applyCookieContent = function applyCookieContent(app, module) {
    var elvCC, elvCCCookie, globals, i, len, results, segment, segmentElement, segments, segmentsSettings, singleSetting;
    globals = app.modules.globals;
    elvCCCookie = globals.elvCCCookie;
    segmentsSettings = globals.inputFeed.CCsettings.partSegments.segments;
    segments = elvCCCookie.segments;
    elvCC = $('.elvCC');

    // Show bar if set
    if (elvCCCookie.barShown === true) {
      elvCC.addClass('-opened');
    }
    results = [];

    // Run for all segments
    for (i = 0, len = segments.length; i < len; i++) {
      segment = segments[i];
      segmentElement = $('[data-segmentid="' + segment.segmentID + '"]');

      // If segment is allowed
      if (segment.segmentAllowance === true) {
        segmentElement.addClass('-isAllowed');
        segmentElement.find('input').prop('checked', true);
        results.push(function () {
          var j, len1, results1;
          results1 = [];

          // Match right segment with input settings
          for (j = 0, len1 = segmentsSettings.length; j < len1; j++) {
            singleSetting = segmentsSettings[j];
            if (segment.segmentID === singleSetting.segmentID) {
              results1.push(singleSetting.onAllow(segment.segmentID));
            } else {
              results1.push(void 0);
            }
          }
          return results1;
        }());
      } else {
        // If segment is not allowed
        segmentElement.removeClass('-isAllowed');
        segmentElement.find('input').prop('checked', false);
        results.push(function () {
          var j, len1, results1;
          results1 = [];

          // Match right segment with input settings
          for (j = 0, len1 = segmentsSettings.length; j < len1; j++) {
            singleSetting = segmentsSettings[j];
            if (segment.segmentID === singleSetting.segmentID) {
              results1.push(singleSetting.onReject(segment.segmentID));
            } else {
              results1.push(void 0);
            }
          }
          return results1;
        }());
      }
    }
    return results;
  };

  var applyCookieContent_2 = applyCookieContent;

  var constructCookieContent;

  constructCookieContent = function constructCookieContent(app, module) {
    var cookieContent, elvCC, globals, i, len, segment, segmentAllowance, segmentID, segmentObject, segments;
    globals = app.modules.globals;
    elvCC = $('.elvCC');
    segments = elvCC.find('.elvCC-segment');
    cookieContent = {};
    cookieContent.segments = [];

    // Check if cookie already exists, if yes, read from it, otherwise set defaults
    if (globals.elvCCCookie) {
      if (elvCC.hasClass('-opened')) {
        cookieContent.barShown = true;
      } else {
        cookieContent.barShown = false;
      }
    } else {
      cookieContent.barShown = true;
    }
    // Set dynamic values for all segments
    for (i = 0, len = segments.length; i < len; i++) {
      segment = segments[i];
      segment = $(segment);
      segmentID = segment.attr('data-segmentid');
      segmentAllowance = false;
      if (segment.hasClass('-isAllowed')) {
        segmentAllowance = true;
      }
      segmentObject = {
        segmentID: segmentID,
        segmentAllowance: segmentAllowance
      };
      cookieContent.segments.push(segmentObject);
    }
    return cookieContent;
  };

  var constructCookieContent_3 = constructCookieContent;

  var helperGetCookie;

  helperGetCookie = function helperGetCookie(app, module, cname) {
    var c, ca, i, name;
    name = cname + '=';
    ca = document.cookie.split(';');
    i = 0;
    while (i < ca.length) {
      c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return JSON.parse(c.substring(name.length, c.length));
      }
      i++;
    }
  };

  var helperGetCookie_4 = helperGetCookie;

  var helperSetCookie;

  helperSetCookie = function helperSetCookie(app, module, cname, cvalue) {
    var cookieString, d, expires, globals;
    globals = app.modules.globals;
    d = new Date();
    d.setTime(d.getTime() + 31536000000);
    expires = 'expires=' + d.toUTCString();
    cvalue = JSON.stringify(cvalue);
    cookieString = cname + ' = ' + cvalue + '; ' + expires + ';path=' + globals.inputFeed.CCsettings.domainLimiter;
    document.cookie = cookieString;

    // Reload cookie into globals after setting it
    app.modules.manager(app, 'getCookie');
    return;
  };

  var helperSetCookie_5 = helperSetCookie;

  var jqCheck;

  jqCheck = function jqCheck(app) {
    var loadScript;
    loadScript = function loadScript(url, callback) {
      var script;
      script = document.createElement('script');
      script.type = 'text/javascript';
      if (script.readyState) {

        //IE
        script.onreadystatechange = function () {
          if (script.readyState === 'loaded' || script.readyState === 'complete') {
            script.onreadystatechange = null;
            callback();
          }
        };
      } else {
        //Others
        script.onload = function () {
          callback();
        };
      }
      script.src = url;
      document.getElementsByTagName('head')[0].appendChild(script);
    };
    return loadScript('https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js', function () {

      //After jQuery loads, relaunch the app
      app.modules.manager(app, 'initiate');
    });
  };

  var jqCheck_6 = jqCheck;

  var manager;

  manager = function manager(app, command, inputFeed) {
    var cookieContent, cookieTemp, globals, subModule;

    // Set globals, load input into globals and kill app if there is no config
    globals = app.modules.globals;
    if (!globals.inputFeed && inputFeed) {
      globals.inputFeed = inputFeed;
    }
    if (!globals.inputFeed) {
      console.log('No input data. Application terminated.');
      return false;
    }

    // Loads jQuery if it isnt present on the page
    if (!window.jQuery) {
      app.modules.jqCheck.jqCheck(app);
      return;
    }

    // Run for first load on each page

    // Resets all other commands so no code is run inefficiently
    if (command === 'initiate') {
      /* RUN RENDERING MODULE */
      subModule = app.modules.rendering;

      // Render CSS
      subModule.renderCSS(app, subModule);

      // Render all parts of the HTML
      subModule.renderCC(app, subModule, 'renderWrapper');
      /* RUN UI CONTROL MODULE */
      subModule = app.modules.uiControl;

      // Hook in triggers for UI control
      subModule.uiControl(app, subModule, 'hookTriggers');
      /* GET COOKIE DATA & APPLY THEM */
      app.modules.manager(app, 'getCookie');
      app.modules.manager(app, 'applyCookieContent');
      return;
    }

    // TODO - UI controls
    // - Add confirm button to segment settings (save cookie, reload specific segment)

    // Reloads cookie from user
    if (command === 'getCookie') {
      subModule = app.modules.internalCookieManagement;
      cookieTemp = subModule.helperGetCookie(app, subModule, 'elvCC');
      globals.elvCCCookie = cookieTemp;

      // If no cookie is defined, make a new one from the scratch
      if (!globals.elvCCCookie) {
        app.modules.manager(app, 'setCookie');
      }
      return;
    }

    // Sets cookie for the user
    if (command === 'setCookie') {
      subModule = app.modules.internalCookieManagement;
      cookieContent = app.modules.manager(app, 'constructCookieContent');
      subModule.helperSetCookie(app, subModule, "elvCC", cookieContent);
    }

    // Rebuilds the cookie from HTML settings (reads page content)
    if (command === 'constructCookieContent') {
      subModule = app.modules.internalCookieManagement;
      cookieContent = subModule.constructCookieContent(app, subModule);
      return cookieContent;
    }

    // Sets HTML content in accordance with the cookie content
    if (command === 'applyCookieContent') {
      subModule = app.modules.internalCookieManagement;
      return subModule.applyCookieContent(app, subModule);
    }
  };

  var manager_7 = manager;

  var renderCC;

  renderCC = function renderCC(app, module, command) {
    if (command === 'renderWrapper') {
      module._renderWrapper(app, module);
    }
    if (command === 'renderSummon') {
      module._renderSummon(app, module);
    }
    if (command === 'renderBase') {
      module._renderBase(app, module);
    }
    if (command === 'renderSegments') {
      module._renderSegments(app, module);
    }
  };

  var renderCC_8 = renderCC;

  var renderCSS;

  renderCSS = function renderCSS(app, module) {
    var css, globals, head, s, settings;
    globals = app.modules.globals;
    settings = globals.inputFeed.CCsettings;
    css = '.elvCC { position: fixed; -webkit-box-sizing: border-box; box-sizing: border-box; z-index: 9998; bottom: 0; left: 0; right: 0; padding: 15px 25px; opacity: 1; background-color: ' + settings.partWrapper.cssBackgroundColor + '; color: ' + settings.partWrapper.cssTextColor + '; -webkit-transition: max-height 0.3s linear, margin-bottom 0.3s linear; transition: max-height 0.3s linear, margin-bottom 0.3s linear; max-height: 0; margin-bottom: -30px; overflow-y: hidden; } @media screen and (max-width: 768px) { .elvCC { display: -webkit-box; display: -ms-flexbox; display: flex; -webkit-box-orient: vertical; -webkit-box-direction: normal; -ms-flex-direction: column; flex-direction: column; padding: 10px 10px; } } .elvCC.-opened { max-height: 100vh; margin-bottom: 0; } .elvCC * { font-family: Helvetica,Calibri,Arial,sans-serif; font-size: 14px; line-height: 1.5em; } .elvCC a { text-decoration: none; color: ' + settings.partWrapper.cssLinkColor + '; display: inline-block; position: relative; margin-left: 12px; } .elvCC a:before { content: \'-\'; position: absolute; left: -10px; color: ' + settings.partWrapper.cssTextColor + '; text-decoration: none; } @media screen and (max-width: 768px) { .elvCC a { margin-top: 10px; display: block; } } .elvCC a:hover { text-decoration: none; color: ' + settings.partWrapper.cssLinkHoverColor + '; } .elvCC label { cursor: pointer; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; } .elvCC input[type=\'checkbox\'] { display: none; } .elvCC__fancyCheckbox { position: relative; display: block; height: 12px; width: 12px; border: 2px solid ' + settings.partWrapper.cssCheckboxBorder + '; } .elvCC input[type=checkbox]:checked + .elvCC__fancyCheckbox:before { content: \'\'; position: absolute; background-color: ' + settings.partWrapper.cssCheckboxColor + '; width: 2px; height: 8px; left: 6px; top: 2px; -webkit-transform: rotate(45deg); transform: rotate(45deg); } .elvCC input[type=checkbox]:checked + .elvCC__fancyCheckbox:after { content: \'\'; position: absolute; background-color: ' + settings.partWrapper.cssCheckboxColor + '; width: 3px; height: 2px; left: 2px; top: 6px; -webkit-transform: rotate(45deg); transform: rotate(45deg); } .elvCC__summonButton { position: fixed; bottom: 0; left: 0; width: 0; height: 0; border-style: solid; border-width: 50px 0 0 50px; border-color: transparent transparent transparent ' + settings.partSummon.cssBackgroundColor + '; cursor: pointer; -webkit-transition: left 0.3s linear; transition: left 0.3s linear; } .elvCC__summonButton:after { content: \'' + settings.partSummon.strTitle + '\'; position: fixed; left: 10px; bottom: 2px; color: ' + settings.partSummon.cssTextColor + '; font-size: 16px; font-weight: 600; -webkit-transition: left 0.3s linear; transition: left 0.3s linear; } .elvCC.-opened .elvCC__summonButton { left: -50px; } .elvCC.-opened .elvCC__summonButton:after { left: -50px; } .elvCC__base { display: -webkit-box; display: -ms-flexbox; display: flex; -webkit-box-pack: justify; -ms-flex-pack: justify; justify-content: space-between; -webkit-box-align: center; -ms-flex-align: center; align-items: center; } @media screen and (max-width: 768px) { .elvCC__base { display: block; } } .elvCC__base__description { -webkit-box-flex: 1; -ms-flex-positive: 1; flex-grow: 1; margin-right: 20px; } @media screen and (max-width: 768px) { .elvCC__base__description { margin-right: 0; padding-bottom: 15px; } } .elvCC__base__confirm { font-size: 15px; font-weight: 600; background-color: ' + settings.partBase.cssButtonBackgroundColor + '; color: ' + settings.partBase.cssButtonColor + '; cursor: pointer; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; padding: 5px 10px; border-radius: 3px; min-width: 140px; text-align: center; white-space: nowrap; -webkit-transition: background-color 0.3s ease; transition: background-color 0.3s ease; } .elvCC__base__confirm:hover { background-color: ' + settings.partBase.cssButtonBackgroundColorHover + '; } .elvCC__segments { -webkit-transition: max-height 0.3s linear, margin-top 0.2s ease; transition: max-height 0.3s linear, margin-top 0.2s ease; max-height: 0; overflow-x: auto; -webkit-overflow-scrolling: touch; margin-right: -25px; padding-right: 25px; } @media screen and (max-width: 768px) { .elvCC__segments { margin-right: -10px; padding-right: 10px; } } .elvCC__segments.-opened { margin-top: 20px; max-height: 300px; margin-bottom: -15px; padding-bottom: 10px; } .elvCC__segments__segment { display: -webkit-box; display: -ms-flexbox; display: flex; -webkit-box-align: start; -ms-flex-align: start; align-items: flex-start; opacity: 0.6; -webkit-transition: opacity 0.3s linear; transition: opacity 0.3s linear; padding: 5px 0; } .elvCC__segments__segment.-isAllowed { opacity: 1; } .elvCC__segments__segment__checkbox { margin-top: 3px; margin-right: 10px; } .elvCC__segments__segment__text { -webkit-box-flex: 1; -ms-flex-positive: 1; flex-grow: 1; } .elvCC__segments__segment__text__title { color: ' + settings.partSegments.cssTitleColor + '; } .elvCC__segments__segment__text__description { color: ' + settings.partSegments.cssDescriptionColor + '; }';
    head = document.getElementsByTagName('head')[0];
    s = document.createElement('style');
    s.setAttribute('type', 'text/css');

    // IE
    if (s.styleSheet) {
      s.styleSheet.cssText = css;
    } else {

      // The rest
      s.appendChild(document.createTextNode(css));
    }
    head.appendChild(s);
  };

  var renderCSS_9 = renderCSS;

  var _renderBase;

  _renderBase = function _renderBase(app, module) {
    var appendContainer, appendString, globals, segmentTrigger, settings;
    globals = app.modules.globals;
    settings = globals.inputFeed.CCsettings;
    appendContainer = $('.elvCC');
    if (settings.partSegments.segments) {
      segmentTrigger = '<a href=\'#\' class=\'elvCC-segmentSettings\'> ' + settings.partBase.strShowCookieSettings + ' </a>';
    } else {
      segmentTrigger = '';
    }
    appendString = '<div class=\'elvCC__base\'> <div class=\'elvCC__base__description\'> ' + settings.partBase.strDescription + ' <a href=\'' + settings.partBase.linkMoreInfo + '\' class=\'elvCC-moreInfo\' target=\'_blank\'> ' + settings.partBase.strMoreInfo + ' </a> ' + segmentTrigger + ' </div> <div class=\'elvCC__base__confirm elvCC-confirm\'> ' + settings.partBase.strConfirm + ' </div> </div>';
    appendContainer.append(appendString);

    // Stop render if no segments present
    if (settings.partSegments.segments) {
      module.renderCC(app, module, 'renderSegments');
    }
  };

  var _renderBase_10 = _renderBase;

  var _renderSegments;

  _renderSegments = function _renderSegments(app, module) {
    var appendContainer, appendString, globals, i, isAllowed, isChecked, len, segment, segments, settings;
    globals = app.modules.globals;
    settings = globals.inputFeed.CCsettings;

    // Append segments wrapper
    appendContainer = $('.elvCC');
    appendString = '<div class="elvCC__segments elvCC-segmentsWrapper"> </div>';
    appendContainer.append(appendString);

    // Append individual segments
    appendContainer = $('.elvCC-segmentsWrapper');
    segments = settings.partSegments.segments;
    for (i = 0, len = segments.length; i < len; i++) {
      segment = segments[i];
      if (segment.allowed === true) {
        isChecked = 'checked';
        isAllowed = '-isAllowed';
      } else {
        isChecked = '';
        isAllowed = '';
      }
      appendString = '<div class=\'elvCC__segments__segment elvCC-segment ' + isAllowed + '\' data-segmentid=\'' + segment.segmentID + '\'> <div class=\'elvCC__segments__segment__checkbox\'> <input type=\'checkbox\' id=\'elvCC-segment-' + segment.segmentID + '\' ' + isChecked + ' > <label for=\'elvCC-segment-' + segment.segmentID + '\' class=\'elvCC__fancyCheckbox\'> </label> </div> <div class=\'elvCC__segments__segment__text\'> <label for=\'elvCC-segment-' + segment.segmentID + '\' class=\'elvCC__segments__segment__text__title\'> ' + segment.strTitle + ' </label> <div class=\'elvCC__segments__segment__text__description\'> ' + segment.strDescription + ' </div> </div> </div>';
      appendContainer.append(appendString);
    }
  };

  var _renderSegments_11 = _renderSegments;

  var _renderSummon;

  _renderSummon = function _renderSummon(app, module) {
    var appendContainer, appendString, globals, settings;
    globals = app.modules.globals;
    settings = globals.inputFeed.CCsettings;
    appendContainer = $('.elvCC');
    appendString = '<div class=\'elvCC__summonButton elvCC-summon\' title=\'' + settings.partSummon.strDescription + '\'> </div>';
    appendContainer.append(appendString);
    module.renderCC(app, module, 'renderBase');
  };

  var _renderSummon_12 = _renderSummon;

  var _renderWrapper;

  _renderWrapper = function _renderWrapper(app, module) {
    var appendContainer, appendString;
    appendContainer = $('body');
    appendString = '<div class="elvCC"></div>';
    appendContainer.append(appendString);
    module.renderCC(app, module, 'renderSummon');
  };

  var _renderWrapper_13 = _renderWrapper;

  var stringUpdate;

  stringUpdate = function stringUpdate(app, module, command) {
    var confirmButton, settingsButton;
    if (command === 'segmentsShow') {
      confirmButton = $('.elvCC-confirm');
      settingsButton = $('.elvCC-segmentSettings');
      confirmButton.text('Save settings');
      settingsButton.text('hide cookie settings');
    }
    if (command === 'segmentsHide') {
      confirmButton = $('.elvCC-confirm');
      settingsButton = $('.elvCC-segmentSettings');
      settingsButton.text('show cookie settings');
    }
  };

  var stringUpdate_14 = stringUpdate;

  var uiControl;

  uiControl = function uiControl(app, module, command, segment) {
    if (command === 'hookTriggers') {
      module._uiHookTriggers(app, module);
    }
    if (command === 'showBar') {
      module._uiBarShow(app, module);
    }
    if (command === 'hideBar') {
      module._uiBarHide(app, module);
    }
    if (command === 'showSegments') {
      module._uiSegmentsShow(app, module);
    }
    if (command === 'hideSegments') {
      module._uiSegmentsHide(app, module);
    }
    if (command === 'segmentCheck') {
      module._uiSegmentCheck(app, module, segment);
    }
    if (command === 'segmentUncheck') {
      module._uiSegmentUncheck(app, module, segment);
    }
  };

  var uiControl_15 = uiControl;

  var _uiBarHide;

  _uiBarHide = function _uiBarHide(app, module) {
    var uiBar;
    uiBar = $('.elvCC');
    uiBar.removeClass('-opened');
  };

  var _uiBarHide_16 = _uiBarHide;

  var _uiBarShow;

  _uiBarShow = function _uiBarShow(app, module) {
    var uiBar;
    uiBar = $('.elvCC');
    uiBar.addClass('-opened');
  };

  var _uiBarShow_17 = _uiBarShow;

  var _uiHookTriggers;

  _uiHookTriggers = function _uiHookTriggers(app, module) {
    var triggerApply, triggerSegmentsTrigger, triggerSegmentsWrapper, triggerSummon;

    // Set all DOM elements
    triggerSummon = $('.elvCC-summon');
    triggerApply = $('.elvCC-confirm');
    triggerSegmentsTrigger = $('.elvCC-segmentSettings');
    triggerSegmentsWrapper = $('.elvCC-segmentsWrapper');

    // Click for the summon button
    triggerSummon.on('click', function () {
      return module.uiControl(app, module, 'showBar');
    });

    // Click for the apply/save button
    triggerApply.on('click', function () {
      module.uiControl(app, module, 'hideBar');
      app.modules.manager(app, 'setCookie');
      return app.modules.manager(app, 'applyCookieContent');
    });

    // Click to open/close the segments wrapper
    triggerSegmentsTrigger.on('click', function (e) {
      e.preventDefault();
      if (triggerSegmentsWrapper.hasClass('-opened')) {
        return module.uiControl(app, module, 'hideSegments');
      } else {
        return module.uiControl(app, module, 'showSegments');
      }
    });

    // Click to allow/disallow the individual segments
    triggerSegmentsWrapper.on('click', 'label', function () {
      var segment;
      segment = $(this).closest('.elvCC-segment');
      if (segment.hasClass('-isAllowed')) {
        return module.uiControl(app, module, 'segmentUncheck', segment);
      } else {
        return module.uiControl(app, module, 'segmentCheck', segment);
      }
    });
  };

  var _uiHookTriggers_18 = _uiHookTriggers;

  var _uiSegmentCheck;

  _uiSegmentCheck = function _uiSegmentCheck(app, module, segment) {
    var segmentCheckbox;
    segmentCheckbox = segment.find('input[type="checkbox"]');
    if (!segmentCheckbox.is(':checked')) {
      segment.addClass('-isAllowed');
    }
  };

  var _uiSegmentCheck_19 = _uiSegmentCheck;

  var _uiSegmentsHide;

  _uiSegmentsHide = function _uiSegmentsHide(app, module) {
    var uiBar;
    uiBar = $('.elvCC-segmentsWrapper');
    uiBar.removeClass('-opened');
    module.stringUpdate(app, module, 'segmentsHide');
  };

  var _uiSegmentsHide_20 = _uiSegmentsHide;

  var _uiSegmentsShow;

  _uiSegmentsShow = function _uiSegmentsShow(app, module) {
    var uiBar;
    uiBar = $('.elvCC-segmentsWrapper');
    uiBar.addClass('-opened');
    module.stringUpdate(app, module, 'segmentsShow');
  };

  var _uiSegmentsShow_21 = _uiSegmentsShow;

  var _uiSegmentUncheck;

  _uiSegmentUncheck = function _uiSegmentUncheck(app, module, segment) {
    var segmentCheckbox;
    segmentCheckbox = segment.find('input[type="checkbox"]');
    if (segmentCheckbox.is(':checked')) {
      segment.removeClass('-isAllowed');
    }
  };

  var _uiSegmentUncheck_22 = _uiSegmentUncheck;

  var exportObject = { modules: { globals: globals_1, internalCookieManagement: { applyCookieContent: applyCookieContent_2, constructCookieContent: constructCookieContent_3, helperGetCookie: helperGetCookie_4, helperSetCookie: helperSetCookie_5 }, jqCheck: { jqCheck: jqCheck_6 }, manager: manager_7, rendering: { renderCC: renderCC_8, renderCSS: renderCSS_9, _renderBase: _renderBase_10, _renderSegments: _renderSegments_11, _renderSummon: _renderSummon_12, _renderWrapper: _renderWrapper_13 }, uiControl: { stringUpdate: stringUpdate_14, uiControl: uiControl_15, _uiBarHide: _uiBarHide_16, _uiBarShow: _uiBarShow_17, _uiHookTriggers: _uiHookTriggers_18, _uiSegmentCheck: _uiSegmentCheck_19, _uiSegmentsHide: _uiSegmentsHide_20, _uiSegmentsShow: _uiSegmentsShow_21, _uiSegmentUncheck: _uiSegmentUncheck_22 } } };

  return exportObject;
}();