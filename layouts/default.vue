<template>
  <!-- <div class="page">
   <div class="container">
      <nuxt/>
    </div>
  </div>-->
  <div class="page">
    <div class="container">
      <div class="discography-wrapper">
        <div class="content"></div>
      </div>
      <div class="video-menu-wrapper">
        <div class="content">
          <div class="youtube-video">video</div>
          <div class="book-menu">menu</div>
        </div>
      </div>
    </div>
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

.page {
  display: flex;
  background: #f1f1f1;
  .container {
    display: flex;
    flex-direction: column;
    min-width: 374px;
    margin-left: auto;
    margin-right: auto;
    @media (min-width: 640px) {
      width: 640px;
    }
    @media (min-width: 944px) {
      flex-direction: row;
      width: 944px;
    }
    @media (min-width: 1280px) {
      width: 1280px;
    }
  }
}

.discography-wrapper,
.video-menu-wrapper {
  display: flex;
  width: 100%;
  height: 100vh;
  @media (min-width: 944px) {
      width: 50%;
  }
}

.discography-wrapper {
  background: #ccc;
  .content {
    background: lightcoral;
  }
}

.video-menu-wrapper {
  background: #dfdfdf;
  .content {
    background: lightblue;
    flex-direction: row-reverse;
    .youtube-video {
      background: lightcyan;
    }
    .book-menu {
      background: lightpink;
    }
  }
}

.content {
  background: #fff;
  width: 354px;
  margin-left: auto;
  margin-right: auto;
  @media (min-width: 640px) {
    width: 75%;
  }
  .youtube-video,
  .book-menu {
    height: 50%;
  }
}

/*.page {
  display: flex;
  justify-content: center;
  min-height: 100vh;
}

.container {
  width: 1040px;
  padding: 50px 0;
  display: flex;
}*/
</style>
