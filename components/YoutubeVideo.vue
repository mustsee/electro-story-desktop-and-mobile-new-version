<template>
  <div class="wrapper">
    <div class="youtube-search-results-buttons">
      <div
        :class="[!videosLength || videoIndex === 0 ? 'disabled' : '', 'btn']"
        @click="handlePreviousYTResult"
      >prev</div>
      <div>video length : {{ videosLength }}, video index : {{ videoIndex }}</div>
      <div
        :class="[!videosLength || videoIndex === videosLength - 1 ? 'disabled' : '', 'btn']"
        @click="handleNextYTResult"
      >next</div>
    </div>
    <div class="video-wrapper">
      <iframe
        v-if="!isVideoLoading"
        title="youtube player"
        id="ytplayer"
        type="text/html"
        width="354"
        height="200"
        :src="src"
        frameborder="0"
      />
      <div class="loading" v-else-if="!errorLoadingVideo">Loading...</div>
      <div class="loading" v-else>{{ errorLoadingVideo }}</div>
    </div>
    <div class="playlist-buttons">
      <div :class="[ !tracksNumber ? 'disabled' : '' , 'btn']">|&lt;</div>
      <div
        :class="[ !tracksNumber ? 'disabled' : '', 'btn track-number']"
      >{{ trackNumber }} / {{ tracksNumber }}</div>
      <div :class="[ !tracksNumber ? 'disabled' :  '', 'btn']">&gt;|</div>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    "src",
    "trackNumber",
    "tracksNumber",
    "isVideoLoading",
    "errorLoadingVideo",
    "handlePreviousYTResult",
    "handleNextYTResult",
    "videosLength",
    "videoIndex"
  ]
};
</script>

<style lang="scss" scoped>
.wrapper {
  width: 354px;
}
.btn {
  display: flex;
  align-items: center;
  background: #fff;
  border: 0.5px solid #d1d1d1;
  height: 32px;
  padding: 0 16px;
  margin: 10px 5px;
  &:hover:not(.track-number) {
    cursor: pointer;
  }
}
.youtube-search-results-buttons {
  background: #fafafa;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  display: flex;
  justify-content: center;
  .btn {
    text-transform: uppercase;
    font-size: 13px;
    border-radius: 25px;
  }
}
.playlist-buttons {
  background: #f1f1f1;
  display: flex;
  justify-content: space-between;
}
.video-wrapper {
  height: 200px;
  iframe {
    height: 200px;
  }
  .loading {
    width: 353px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "Rubik", sans-serif;
    font-size: 25px;
    font-weight: 300;
    border-left: 0.5px solid #f1f1f1;
    border-right: 0.5px solid #f1f1f1;
  }
}
</style>