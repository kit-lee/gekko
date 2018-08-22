/**
 * Created by kit on 2018/8/22.
 */

const talib = require('../core/talib');

talib['willr'].create({
  optInTimePeriod: 2
});

talib['rsi'].create({
  optInTimePeriod: 2
});
