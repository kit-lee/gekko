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
  this.lastResultWILLR = null;
  this.requiredHistory = this.tradingAdvisor.historySize;
  this.addTalibIndicator('myWILLR', 'WILLR');
  this.addTalibIndicator('myRSI', 'RSI');
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
  var resultWILLR = this.talibIndicators.myWILLR.result;
  var resultRSI = this.talibIndicators.RSI.result;
  console.log('WILLR=' + resultWILLR + ', RSI=' + resultRSI);
  log.info('WILLR=' + resultWILLR + ', RSI=' + resultRSI);

  if (this.lastResultWILLR === null) {
    this.lastResultWILLR = resultWILLR;
    this.advice();
    return;
  }

  if (this.settings.rsi.low > resultRSI) {
    if (this.settings.willr.up < resultWILLR && this.lastResultWILLR < resultWILLR) {
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

      if(this.trend.duration >= this.settings.thresholds.persistence)
        this.trend.persisted = true;

      if(this.trend.persisted && !this.trend.adviced) {
        this.trend.adviced = true;
        this.advice('long');
      } else
        this.advice();
    }else{
      this.advice();
    }
  }else if (this.settings.rsi.high < resultRSI) {
    if(this.settings.willr.down > resultWILLR && this.lastResultWILLR > resultWILLR){

      // new trend detected
      if(this.trend.direction !== 'down')
        this.trend = {
          duration: 0,
          persisted: false,
          direction: 'down',
          adviced: false
        };

      this.trend.duration++;

      log.debug('In downtrend since', this.trend.duration, 'candle(s)');

      if(this.trend.duration >= this.settings.thresholds.persistence)
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
