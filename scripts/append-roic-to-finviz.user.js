// ==UserScript==
// @name         Append ROIC.IO to FINVIZ full view page
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://finviz.com/quote.ashx*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=finviz.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    var ticker = document.getElementsByClassName("fullview-ticker")[0].textContent
    var roicURL = "https://roic.ai/company/" + ticker

    var roicHTML = document.createElement ('a')
    roicHTML.innerHTML = `<a target="_blank" href="${roicURL}"> | open in roic.io </a>`
    document.getElementsByClassName("fullview-links flex items-center")[0].appendChild(roicHTML)
})();
