// ==UserScript==
// @name         Open in Roic on hover
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://finviz.com/screener.ashx*
// @match        https://roic.ai/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=finviz.com
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_openInTab
// ==/UserScript==


const TICKER = 'TICKER';
const TRANSITION_DONE = 'TRANSITION_DONE';

function runOnHover(e) {
    var ticker;

    if(e != null && e.classList.value == 'screener-link-primary') {
         ticker = e.text
        if(GM_getValue(TICKER) != ticker) {
            GM_setValue(TICKER, ticker);
            GM_setValue(TRANSITION_DONE, false);
        }
    }
}

var lastTransition;
function runOnRoic() {
    var curr = window.location.href.split('/')[4];

    var ticker = GM_getValue(TICKER);
    var transitionDone = GM_getValue(TRANSITION_DONE);

    if(!transitionDone) {
        var url = 'https://roic.ai/company/' + ticker;
        GM_setValue(TRANSITION_DONE, true);
        window.location.href = url;
    }
}


(function() {
    'use strict';

    // Your code here...
    if(window.location.href.indexOf("finviz.com") != -1) {
        document.addEventListener('mousemove', function(e){
            runOnHover(document.elementFromPoint(e.clientX, e.clientY));
        });
    } else if (window.location.href.indexOf("roic.ai") != -1) {
        setInterval(runOnRoic, 1000);
    }
})();



