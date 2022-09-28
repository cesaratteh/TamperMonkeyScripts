// ==UserScript==
// @name         Make roic classic printable
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://roic.ai/classic/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=roic.ai
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    document.getElementsByClassName("w-full relative bg-white")[0].remove();
    document.getElementsByClassName("w-full border-b-2")[0].remove();
    document.getElementsByClassName("justify-center text-center items-center")[0].remove();
    document.getElementsByClassName("border-r  border-black h-12 min-w-[40%]")[0].classList.remove("overflow-x-auto");
})();
