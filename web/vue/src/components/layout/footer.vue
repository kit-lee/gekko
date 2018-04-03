<template lang='jade'>
  footer.p2.bg--off-white
    .contain
      p
        em Contact us with email: im@muses.cc
      p 
</template>

<script>
const gekkoPackage = require('../../../../../package.json');
const uiPackage = require('../../../package.json');

export default {
  data: () => {
    return {
      version: {
        gekko: gekkoPackage.version,
        ui: uiPackage.version
      }
    }
  }
}
</script>
