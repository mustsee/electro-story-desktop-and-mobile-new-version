<template>
  <div class="container">
    <div class="discography-wrapper">
      <discography
        :chapters="chapters"
        :chapter="chapter"
        :genre="genre"
        :artists="artists"
        :numberOfChapters="numberOfChapters"
        :displayPiece="displayPiece"
        :handlePrevious="handlePrevious"
        :handleNext="handleNext"
        :modidfyContent="modifyContent"
        :index="index"
        :isActive="isActive"
        :handleClickOnArtist="handleClickOnArtist"
        :availablePieces="availablePieces"
        :currentArtistName="currentArtistName"
        :currentPieceName="currentPieceName"
      />
    </div>
    <div class="video-menu-wrapper">
      <youtube-video
        class="video-component-wrapper"
        :src="videoFullURL"
        :isVideoLoading="isVideoLoading"
        :errorLoadingVideo="errorLoadingVideo"
      />
      <main-menu/>
    </div>
  </div>
</template>

<script>
import MainMenu from "./../components/MainMenu";
import Discography from "./../components/Discography";
import YoutubeVideo from "./../components/YoutubeVideo";
import musicData from "./../data/musicData";
import {
  getSearchUrl,
  getFormattedVideoData,
  getPlaylistItemsUrl,
  getFormattedPlaylistData
} from "./../helpers/youtube";

export default {
  components: {
    "main-menu": MainMenu,
    discography: Discography,
    "youtube-video": YoutubeVideo
  },
  data() {
    return {
      index: 0,
      chapters: ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"],
      chapter: "I",
      genre: musicData.music[0].musicGenre,
      artists: musicData.music[0].artists,
      numberOfChapters: musicData.music.length,
      videos: [],
      src: "http://www.youtube.com/embed/",
      videoId: "B2U-WKmeJSM",
      trackNumber: 0,
      tracksNumber: 0,
      isActive: musicData.music[0].artists[0].albums[0].title,
      isVideoLoading: false,
      currentPieceName: musicData.music[0].artists[0].albums[0].title,
      currentArtistName: musicData.music[0].artists[0].name,
      errorLoadingVideo: "",
      availablePieces: {}
    };
  },
  computed: {
    videoFullURL() {
      return this.src + this.videoId;
    }
  },
  methods: {
    handlePrevious() {
      this.index -= 1;
      this.modifyContent();
    },
    handleNext() {
      this.index += 1;
      this.modifyContent();
    },
    modifyContent() {
      this.chapter = this.chapters[this.index];
      this.genre = musicData.music[this.index].musicGenre;
      this.artists = musicData.music[this.index].artists;
    },
    displayPiece(artistName, pieceName) {
      this.errorLoadingVideo = "";
      if (pieceName === this.currentPieceName) return;
      this.currentArtistName = artistName;
      this.currentPieceName = pieceName;
      this.isActive = pieceName;
      return;
      this.isVideoLoading = true;
      const URL = getSearchUrl(artistName, pieceName);
      this.$axios.get(URL).then(res => {
        const results = res.data.items;
        this.handleVideosAndPlaylists(results).then(res => {
          this.videos = res;
          this.isVideoLoading = false;
          console.log("this.videos", this.videos);
          /*
          this.videoId = this.videos[0].videos[0].videoId;
          this.videoTitle = this.videos[0].videos[0].title;
          */
        });
      }).then(err => {
        console.log('err : ', err);
        this.errorLoadingVideo = "Error loading video"
      });
    },
    handleVideosAndPlaylists(results) {
      return new Promise(resolve => {
        let videos = [];
        let types = [];
        results.forEach((result, i) => {
          if (result.id.kind === "youtube#video") {
            types.push("video");
            videos[i] = getFormattedVideoData(result);
            if (types.length === results.length) resolve(videos);
          } else if (result.id.kind === "youtube#playlist") {
            this.findVideoIdsOfPlaylist(result).then(res => {
              types.push("playlist");
              videos[i] = res;
              if (types.length === results.length) resolve(videos);
            });
          }
        });
      });
    },
    findVideoIdsOfPlaylist(result) {
      return new Promise(resolve => {
        const { playlistId } = result.id;
        const URL = getPlaylistItemsUrl(playlistId);
        this.$axios.get(URL).then(res => {
          const videos = getFormattedPlaylistData(res, playlistId);
          resolve(videos);
        });
      });
    },
    handleClickOnArtist(genreIndex, artistNameIndex) {
      this.availablePieces =
        musicData.music[genreIndex].artists[artistNameIndex];
    }
  }
};
</script>

<style <style lang="scss" scoped>
.container {
  //background: yellow;
  display: flex;
  flex-direction: column-reverse;
  @media (min-width: 868px) {
    flex-direction: row;
  }
}

.discography-wrapper {
  width: 354px;
  min-height: 711px;
  padding-top: 0;
  padding-bottom: 50px;
  //background: lightcoral;
  @media (min-width: 601px) {
    min-height: 671px;
  }
  @media (min-width: 868px) {
    height: initial;
    padding-top: 50px;
    padding-left: 30px;
    padding-right: 50px;
    width: 434px;
  }
  @media (min-width: 994px) {
    width: 560px;
  }
  @media (min-width: 1104px) {
    width: 650px;
    padding-right: 70px;
  }
}

.video-menu-wrapper {
  //background: #dfdfdf;
  padding-top: 50px;
  padding-bottom: 50px;
  display: flex;
  flex-direction: column-reverse;
  @media (min-width: 868px) {
    flex-direction: column;
    padding-left: 50px;
    padding-right: 30px;
  }
  @media (min-width: 1104px) {
    padding-left: 70px;
  }
}

.video-component-wrapper {
  margin: 36.875px 0 73.75px 0;
  @media (max-width: 867px) {
    margin: 50px 0 0 0;
  }
}
</style>
