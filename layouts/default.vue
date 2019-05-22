<template>
  <div class="page">
    <nuxt/>
  </div>
</template>

<style <style lang="scss">
html {
  font-family: sans-serif;
  font-size: 17px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  user-select: none;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.disabled {
  pointer-events: none;
  opacity: 0.5;
  background: #ddd !important;
}

.page {
  display: flex;
  justify-content: center;
  //background: lightcyan;
  min-height: 100vh;
}
</style>
