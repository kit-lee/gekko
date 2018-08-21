var log = require('../core/log.js');
// Let's create our own buy and sell strategy
var strat = {};

// Prepare everything our strat needs
strat.init = function() {
  this.lastResultWILLR = null;
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
strat.check = function(candle) {
  var resultWILLR = this.indicators.myWILLR.result;
  var resultRSI = this.indicators.RSI.result;
  log.info('WILLR=' + resultWILLR + ', RSI=' + resultRSI);

  if (this.lastResultWILLR === null) {
    this.lastResultWILLR = resultWILLR;
    return;
  }

  if (this.settings.rsi.low > resultRSI) {
    if(this.settings.willr.up < resultWILLR && this.lastResultWILLR < resultWILLR){
      this.advice('long');
      log.info('buying...');
    }
  }

  if (this.settings.rsi.high < resultRSI) {
    if(this.settings.willr.down > resultWILLR && this.lastResultWILLR > resultWILLR){
      this.advice('short');
      log.info('selling...');
    }
  }

  // buy when it hits buy price
  /*if(candle.close <= this.buyPrice) {
    this.advice("long");
    // do some output
    console.log("buying BTC @", candle.close);
    return;
  }

  // sell when it hits sell price
  if(candle.close >= this.sellPrice) {
    this.advice("short");
    // do some output
    console.log("selling BTC @", candle.close);
    console.log("Profit:", (candle.close-this.buyPrice));
    return;
  }*/
}

module.exports = strat;
