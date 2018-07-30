<template lang='pug'>
  div
    #top
    header.bg--off-white.grd
      .contain.grd-row
        h3.py1.px2.col-2 Muses-Bitbot
    nav.bg--light-gray
      .menu.contain
        router-link(to='/home').py1 Home
        router-link(to='/live').py1 Live Bitbot
        router-link(to='/backtest').py1 Backtest
        router-link(to='/data').py1 Local data
        router-link(to='/config').py1 Config

</template>

<script>
export default {}
</script>

<style>
.menu {
  display: flex;
  flex-direction: row;
  margin-top: 0;
  margin-bottom: 2rem;
}

.menu a {
  flex: 1 1 100%;
  display: block;
  text-align: center;
  text-decoration: none;
  color: #333;

}

.menu .router-link-active {
  background-color: rgba(250,250,250,.99);
}

.menu a:hover {
  text-decoration: underline;
}

</style>
