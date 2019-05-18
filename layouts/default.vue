<template>
  <div class="page">
    <div class="container">
      <nuxt/>
    </div>
  </div>
</template>

<style>
html {
  font-family: sans-serif;
  font-size: 17px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.page {
  display: flex;
  justify-content: center;
  min-height: 100vh;
  background-color: red;
}

.container {
  width: 1040px;
  padding: 50px 20px;
  display: flex;
  background: azure;
}
</style>
