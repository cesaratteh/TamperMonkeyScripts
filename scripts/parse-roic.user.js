// ==UserScript==
// @name         parse-roic
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://roic.ai/company/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=roic.ai
// @grant        none
// ==/UserScript==

const STAT = {
	Revenue_Per_Share: 0,
	Earnings_Per_Share: 1,
	FCF_Per_Share: 2,
	Dividends_Per_Share: 3,
	CAPEX_Per_Share: 4,
	Book_Value_Per_Share: 5,
	Comm_Shares_outs: 6,
	Avg_annual_PE_ratio: 7,
	PE_to_SP500: 8,
	Avg_annual_div_yield: 9,
	Revenue: 10,
	Operating_Margin: 11,
	Depreciation: 12,
	Net_profit: 13,
	Income_tax_rate: 14,
	Net_profit_margin: 15,
	Working_capital: 16,
	Long_term_debt: 17,
	Equity: 18,
	ROIC: 19,
	Return_on_capital: 20,
	Return_on_equity: 21,
	Plowback_ratio: 22,
	Div_Repurch_FCF: 23
};

const roic = {
    getStatRow: function(stat) {
        return document.getElementsByClassName("flex h-[30px] min-w-[1050px] pr-[40px]  items-center text-sm font-light border-[#f0f3fa]  border-b group hover:bg-[#f0f3fa]")[stat]
    },

    getStatArray: function(stat) {
        var result = [];

        var length = this.getStatRow(stat).getElementsByClassName("min-w-[50px] w-full grow text-center text-xs 2xl:text-sm h-full flex items-center pr-0.5 justify-end").length;
        var slides = this.getStatRow(stat).getElementsByClassName("min-w-[50px] w-full grow text-center text-xs 2xl:text-sm h-full flex items-center pr-0.5 justify-end");
        for(var i = 0; i < slides.length; i++)
        {
            var value = slides[i].textContent;
            var normalizedValue = this.normalizeNumber(value);
            result.push(normalizedValue);
        }

        return result;
    },

    normalizeNumber: function(num) {
        var temp = num.trim();
        var result = 1;

        if(temp.includes('- -')) { ////////// THIS WON'T ALSWAYS BE APPLICABLE. -- means missing not really 0
           return 0;
        }

        if(temp.includes('%')) {
            result *= 0.01;
        }

        if(temp.includes('(') && temp.includes(')')) {
            result *= -1;
        }

        result *= temp.replace('(', '').replace(')', '').replace('%', '');
        return result;
    }
};

(function() {
    'use strict';

    // Your code here...
    console.log(roic.getStatArray(STAT.Revenue_Per_Share));
    console.log(roic.getStatArray(STAT.Dividends_Per_Share));
    console.log(roic.getStatArray(STAT.Plowback_ratio));
})();





