var log = require('../core/log.js');
// Let's create our own buy and sell strategy
var strat = {};

// Prepare everything our strat needs
strat.init = function() {
  this.trend = {
    direction: 'none',
    duration: 0,
    persisted: false,
    adviced: false,
    warning: false
  };
  params = {
    optInTimePeriod: this.settings.interval
  }

  this.lastResultWILLR = undefined;
  this.requiredHistory = this.tradingAdvisor.historySize;
  this.addTalibIndicator('myWILLR', 'willr', params);
  this.addTalibIndicator('myRSI', 'rsi', params);
  this.addTalibIndicator('myOBV', 'obv');
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

  if (this.lastResultWILLR === undefined) {
    this.lastResultWILLR = resultWILLR.outReal;
    this.advice();
    return;
  }

  

  if (this.settings.rsi.low > resultRSI.outReal) {
    console.log('rsi buy chance! rsi=' + resultRSI.outReal);
    if (this.settings.willr.up < resultWILLR.outReal && this.lastResultWILLR < resultWILLR.outReal) {
      console.log('willr is up!  ' + this.lastResultWILLR + ' to ' + resultWILLR.outReal);
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
        console.log('buy!');
        this.advice('long');
      } else
        this.advice();
    }else{
      this.advice();
    }
  }else if (this.settings.rsi.high < resultRSI.outReal) {
    console.log('rsi sell chance! rsi=' + resultRSI.outReal);
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
        console.log('sell!');
        this.advice('short');
      } else
        this.advice();

  }else if(this.settings.willr.down > resultWILLR.outReal && this.lastResultWILLR > resultWILLR.outReal){
    console.log('willr sell chance! rsi=' + resultWILLR.outReal);
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
      console.log('sell!');
      this.trend.adviced = true;
      this.advice('short');
    } else
      this.advice();
  }else {
    this.advice();
  }

  this.lastResultWILLR = resultWILLR.outReal;
}

module.exports = strat;
