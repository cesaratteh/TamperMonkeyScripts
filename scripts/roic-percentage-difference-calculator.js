// ==UserScript==
// @name         ROIC percentage difference calculator
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://roic.ai/company/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=roic.ai
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    function displayOnTop(content) {
        var banner = document.getElementById("bannerID");
        if (typeof(banner) != 'undefined' && banner != null)
        {
            banner.remove();
        }

        var newHTML = document.createElement ('div');
            newHTML.innerHTML = `             \
            <div id="bannerID" style="position:fixed; top=0; z-index:100; background-color: #c0c0c0;">             \
                    <p> ${content} </p>       \
                </div>                          \
            `;

        document.body.insertBefore(newHTML, document.body.firstChild);
    }

    function grabSelectionAndCalculateDifference() {
        var result = [];
        var strip = (str) => {return str.replace(',', '').replace('(', '').replace(')', '');}

        var list = document.getSelection().toString().split(/\s+/);
        for (var i = 0; i < list.length-1; i++) {
            var re = (strip(list[i+1]) - strip(list[i]) ) / strip(list[i]) * 100;

            result[i] = " %" + parseFloat(re).toFixed(2);
        }

        displayOnTop(result.join(' | '));
    }

    function onAltQ() {
        grabSelectionAndCalculateDifference();
    }

    function onKeydown(evt) {
        // Use https://keycode.info/ to get keys
        if (evt.altKey && evt.keyCode == 81) {
            onAltQ();
        }
    }
    document.addEventListener('keydown', onKeydown, true);
})();