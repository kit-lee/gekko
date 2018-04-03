<template lang='jade'>
  section.contain.grd-row
    .grd-row-col-3-6(v-html='left')
    .grd-row-col-3-6.txt--center
      
</template>

<script>
import marked from '../../tools/marked';
import { basePath } from '../../tools/api';

const left = marked(`

## Muses-Bitbot

Muses-Bitbot is a Bitcoin trading bot and backtesting platform that
connects to popular Bitcoin exchanges.

[Find out more](http://www.muses.cc/).


`);

export default {
  data: () => {
    return {
      left
    }
  },
  computed: {
    imageUrl: function() {
      return basePath + 'assets/gekko.jpg';
    }
  }
}
</script>
