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
        :chapterIndex="chapterIndex"
        :isActive="isActive"
        :handleClickOnArtist="handleClickOnArtist"
        :availablePieces="availablePieces"
        :currentArtistName="currentArtistName"
        :currentPieceName="currentPieceName"
        :artistNameIndex="artistNameIndex"
        :artistActiveNameIndex="artistActiveNameIndex"
      />
    </div>
    <div class="video-menu-wrapper">
      <youtube-video
        class="video-component-wrapper"
        :src="videoFullURL"
        :isVideoLoading="isVideoLoading"
        :errorLoadingVideo="errorLoadingVideo"
        :handlePreviousYTResult="handlePreviousYTResult"
        :handleNextYTResult="handleNextYTResult"
        :videosLength="videosLength"
        :videoIndex="videoIndex"
        :trackNumber="trackNumber"
        :tracksNumber="tracksNumber"
        :handlePreviousInPlaylist="handlePreviousInPlaylist"
        :handleNextInPlaylist="handleNextInPlaylist"
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
      chapterIndex: 0,
      numberOfChapters: musicData.music.length,
      chapters: ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"],
      chapter: "I",
      genre: musicData.music[0].musicGenre,
      artists: musicData.music[0].artists,
      videos: [],
      videosLength: 0,
      videoIndex: 0,
      src: "https://www.youtube.com/embed/",
      videoId: "B2U-WKmeJSM",
      trackNumber: 0,
      tracksNumber: 0,
      isActive: musicData.music[0].artists[0].albums[0].title,
      isVideoLoading: false,
      currentPieceName: musicData.music[0].artists[0].albums[0].title,
      currentArtistName: musicData.music[0].artists[0].name,
      errorLoadingVideo: "",
      availablePieces: {},
      currentActiveArtistIndex: 0,
      artistNameIndex: 0,
      artistActiveNameIndex: 0,
    };
  },
  computed: {
    videoFullURL() {
      return this.src + this.videoId;
    }
  },
  methods: {
    handlePrevious() {
      this.chapterIndex -= 1;
      this.modifyContent();
    },
    handleNext() {
      this.chapterIndex += 1;
      this.modifyContent();
    },
    handlePreviousYTResult() {
      this.videoIndex -= 1;
      this.loadVideo();
    },
    handleNextYTResult() {
      this.videoIndex += 1;
      this.loadVideo();
    },
    handlePreviousInPlaylist() {
      this.trackNumber -= 1;
      this.modifyPlaylistItem();
    },
    handleNextInPlaylist() {
      this.trackNumber += 1;
      this.modifyPlaylistItem();
    },
    modifyPlaylistItem() {
      const currentVideo = this.videos[this.videoIndex];
      const { videoId, videoTitle } = currentVideo.videos[this.trackNumber - 1];
      this.videoId = videoId;
      this.videoTitle = videoTitle;
    },
    loadVideo() {
      const currentVideo = this.videos[this.videoIndex];
      const { videoId, videoTitle } = currentVideo.videos[0];
      this.videoId = videoId;
      this.videoTitle = videoTitle;
      if (currentVideo.type === "video") {
        this.trackNumber = 0;
        this.tracksNumber = 0;
      } else {
        this.trackNumber = 1;
        this.tracksNumber = currentVideo.length;
      }
    },
    modifyContent() {
      this.chapter = this.chapters[this.chapterIndex];
      this.genre = musicData.music[this.chapterIndex].musicGenre;
      this.artists = musicData.music[this.chapterIndex].artists;
    },
    displayPiece(artistName, pieceName, artistIndex) {
      if (pieceName === this.currentPieceName) return;
      this.errorLoadingVideo = "";
      this.currentArtistName = artistName;
      this.currentPieceName = pieceName;
      this.isActive = pieceName;
      this.isVideoLoading = true;
      this.artistActiveNameIndex = artistIndex;
      const URL = getSearchUrl(artistName, pieceName);
      this.$axios
        .get(URL)
        .then(res => {
          const results = res.data.items;
          this.handleVideosAndPlaylists(results).then(res => {
            this.videos = res;
            this.videosLength = res.length;
            this.videoIndex = 0;
            this.isVideoLoading = false;
            this.loadVideo();
          });
        })
        .catch(err => {
          console.log("err : ", err.response);
          if (err.response.status === 403) this.errorLoadingVideo = "Youtube quota exceeded"
          else this.errorLoadingVideo = "Error loading video";
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
      this.artistNameIndex = artistNameIndex;
    }
  },
  mounted() {
    this.availablePieces = musicData.music[0].artists[0];
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
