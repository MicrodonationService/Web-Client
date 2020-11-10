/* Copyright (C) Ebix Software Technologies Pvt. Ltd. - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */
import React, { Component } from 'react';
class GlobalHelper extends Component
{

     constructor(props) {
 		    super(props)
 			  this.globlevar = {};
      }

      getContextPath()
      {
       	//var path = window.location.pathname;
        //var contextroot = "/" + path.split('/')[1];
        //return (window.location.origin + contextroot +"/portalservices");
        let contextPath = window.location.origin + "/"+ window.location.pathname.split('/')[1] ;

        if (process.env.NODE_ENV == 'development') {
            return "/auth";
        }
        else if (process.env.NODE_ENV == 'test') {
            return "/auth";
        }
        else if (process.env.NODE_ENV === 'production')
        {
            return contextPath +"/portalservices";
        }
        return contextPath +"/portalservices";
        //return "/mobileweb/portalservices";
      }
      getContextCaptchaPath()
      {
        let contextPath = window.location.origin + "/"+ window.location.pathname.split('/')[1] ;

        if (process.env.NODE_ENV == 'development') {
            return "/lmsmobileweb";
        }
        else if (process.env.NODE_ENV == 'test') {
            return "/lmsmobileweb";
        }
        else if (process.env.NODE_ENV === 'production')
        {
            return contextPath ;
        }

        return contextPath ;
        //return "/mobileweb";
      }


    checkBrowserType(){
       var browserMap = new Map();

       // Opera 8.0+
       var isOpera = (!!window.opr && !!window.opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
       browserMap.set("isOpera",isOpera);

       // Firefox 1.0+
       var isFirefox = typeof InstallTrigger !== 'undefined';
       browserMap.set("isFirefox",isFirefox);

       // Safari 3.0+ "[object HTMLElementConstructor]"
       var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof window['safari'] !== 'undefined' && window['safari'].pushNotification));
       browserMap.set("isSafari",isSafari);

       // Internet Explorer 6-11
       var isIE = /*@cc_on!@*/false || !!document.documentMode;
       browserMap.set("isIE",isIE);

       // Edge 20+
       var isEdge = !isIE && !!window.StyleMedia;
       browserMap.set("isEdge",isEdge);

       // Chrome 1 - 71
       var isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
       browserMap.set("isChrome",isChrome);

       // Blink engine detection
       var isBlink = (isChrome || isOpera) && !!window.CSS;
       browserMap.set("isOpera",isOpera);

       var output = 'Detecting browsers by ducktyping:';
       output += 'isFirefox: ' + isFirefox + '\n';
       output += 'isChrome: ' + isChrome + '\n';
       output += 'isSafari: ' + isSafari + '\n';
       output += 'isOpera: ' + isOpera + '\n';
       output += 'isIE: ' + isIE + '\n';
       output += 'isEdge: ' + isEdge + '\n';
       output += 'isBlink: ' + isBlink + '\n';
       console.log("Browser type is:-----",output,browserMap);
       if(browserMap != null){
         console.log("Browser type is:-----",output,browserMap);
         return browserMap;
       }
     }

}
export default (new GlobalHelper);
