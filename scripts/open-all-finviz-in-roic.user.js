// ==UserScript==
// @name         Open all in Roic
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://finviz.com/screener.ashx*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=finviz.com
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_openInTab
// ==/UserScript==


const TICKERS = 'TICKERS';
const INDEX = 'INDEX';

function storeTickerList(){
    var result = [];

    var n = document.getElementsByClassName("screener-link-primary").length
    for(var i = 0; i < n; i++){
        var ticker = document.getElementsByClassName("screener-link-primary")[i].text
        result.push(ticker);
    }

    GM_setValue(TICKERS, result.join(','));
}

function onAltO(){
    var tickers = GM_getValue(TICKERS).split(',');
    for(var i = 0; i< tickers.length; i++){
        var url = 'https://roic.ai/company/' + tickers[i];
        GM_openInTab(url);
    }
}

function onKeyDown(evt) {
    if(evt.altKey && evt.keyCode == 79) {
        onAltO();
    }
}

(function() {
    'use strict';

    // Your code here...
    document.addEventListener('keydown', onKeyDown, true);
    storeTickerList();
})();
