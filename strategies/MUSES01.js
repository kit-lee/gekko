var log = require('../core/log.js');
// Let's create our own buy and sell strategy
var strat = {};

// Prepare everything our strat needs
strat.init = function() {
  this.trend = {
    direction: 'none',
    duration: 0,
    persisted: false,
    adviced: false
  };
  params = {
    optInTimePeriod: this.settings.interval
  }

  this.lastResultWILLR = null;
  this.requiredHistory = this.tradingAdvisor.historySize;
  this.addTalibIndicator('myWILLR', 'willr', params);
  this.addTalibIndicator('myRSI', 'rsi', params);
}

// What happens on every new candle?
strat.update = function(candle) {

}

// For debugging purposes.
strat.log = function() {
  // your code!
}

// Based on the newly calculated
// information, check if we should
// update or not.
strat.check = function() {

  var resultWILLR = this.talibIndicators['myWILLR'].result;
  var resultRSI = this.talibIndicators['myRSI'].result;
  /*for (var prop in resultRSI) {
    console.log("result." + prop + " = " + resultRSI[prop]);
  }*/

  //console.log('WILLR=' + resultWILLR.outReal + ', RSI=' + resultRSI.outReal);

  if (this.lastResultWILLR === null) {
    this.lastResultWILLR = resultWILLR.outReal;
    this.advice();
    return;
  }

  if (this.settings.rsi.low > resultRSI.outReal) {
    console.log('low=' + this.settings.rsi.low + ' and rsi=' + resultRSI.outReal);
    console.log('up=' + this.settings.willr.up + ' and lastwillr=' + this.lastResultWILLR + ' willr=' + resultWILLR.outReal);
    if (this.settings.willr.up < resultWILLR.outReal && this.lastResultWILLR < resultWILLR.outReal) {
      // new trend detected
      if (this.trend.direction !== 'up') {
        // reset the state for the new trend
        this.trend = {
          duration: 0,
          persisted: false,
          direction: 'up',
          adviced: false
        };
      }

      this.trend.duration++;

      if(this.trend.duration >= 1)
        this.trend.persisted = true;

      if(this.trend.persisted && !this.trend.adviced) {
        this.trend.adviced = true;
        this.advice('long');
      } else
        this.advice();
    }else{
      this.advice();
    }
  }else if (this.settings.rsi.high < resultRSI.outReal) {
    console.log('high=' + this.settings.rsi.high + ' and rsi=' + resultRSI.outReal);
    console.log('down=' + this.settings.willr.down + ' and rsi=' + resultWILLR.outReal);
    if(this.settings.willr.down > resultWILLR.outReal && this.lastResultWILLR > resultWILLR.outReal){

      // new trend detected
      if(this.trend.direction !== 'down')
        this.trend = {
          duration: 0,
          persisted: false,
          direction: 'down',
          adviced: false
        };

      this.trend.duration++;

      if(this.trend.duration >= 1)
        this.trend.persisted = true;

      if(this.trend.persisted && !this.trend.adviced) {
        this.trend.adviced = true;
        this.advice('short');
      } else
        this.advice();
    }else{
      this.advice();
    }
  } else {
    this.advice();
  }

}

module.exports = strat;
