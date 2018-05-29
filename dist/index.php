<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>CC</title>


</head>
<body>

<script src="js/elv_cookieConsent.js" type="text/javascript"></script>

<script type="text/javascript">
   document.addEventListener("DOMContentLoaded", function (event) {

      var app = elv_cookieConsent;

      var input = {
         CCsettings: {
            domainLimiter: '/dev/CC/',
            partWrapper: {
               cssTextColor: '#F5F5F5',
               cssBackgroundColor: 'rgba(29, 29, 29, 0.9)',
               cssLinkColor: '#31A8F0',
               cssLinkHoverColor: '#B2F7FF',
               cssCheckboxBorder: '#656565',
               cssCheckboxColor: '#31A8F0'
            },
            partSummon: {
               cssTextColor: '#ffffff',
               cssBackgroundColor: '#007bff',
               strTitle: 'C',
               strDescription: 'Cookie Settings'
            },
            partBase: {
               cssButtonColor: '#000000',
               cssButtonBackgroundColor: '#F1D600',
               cssButtonBackgroundColorHover: '#FFFC26',
               linkMoreInfo: 'https://cookiesandyou.com/',
               strDescription: 'Your experience on this site will be improved by allowing cookies.',
               strMoreInfo: 'more info',
               strShowCookieSettings: 'show cookie settings',
               strHideCookieSettings: 'hide cookie settings',
               strConfirm: 'Allow cookies',
               strConfirmSaveSettings: 'Save settings'
            },
            partSegments: {
               cssTitleColor: '#31A8F0',
               cssDescriptionColor: '#9a9a9a',
               segments: [
                  {
                     segmentID: 'social',
                     strTitle: 'Social',
                     strDescription: 'Facebook, Twitter and other social websites need to know who you are to work properly.',
                     allowed: false,
                     onAllow: function (idTest) {
                        console.log(idTest + ' allowed');
                     },
                     onReject: function (idTest) {
                        console.log(idTest + ' revoked');
                     }
                  },
                  {
                     segmentID: 'analytics',
                     strTitle: 'Analytics',
                     strDescription: 'We use Google Analytics, it is cool. You should allow it so we can conquer the world!',
                     allowed: true,
                     onAllow: function (idTest) {
                        console.log(idTest + ' allowed');
                     },
                     onReject: function (idTest) {
                        console.log(idTest + ' revoked');
                     }
                  }
               ]
            }
         }
      };

      app.modules.manager(app, 'initiate', input);

   })
   ;


</script>
</body>
</html>
