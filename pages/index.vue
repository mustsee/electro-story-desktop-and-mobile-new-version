<template>
  <div class="content">
    <div class="left">
      <div class="discography-wrapper">
        <div class="chapter-wrapper">
          <div class="chapter">chapter {{ chapter }}</div>
          <div class="pagination">
            <div :class="[ index === 0 ? 'disabled' : '', 'previous']" @click="handlePrevious">&lt;</div>
            <div
              :class="[ index === numberOfChapters - 1 ? 'disabled' : '', 'next']"
              @click="handleNext"
            >&gt;</div>
          </div>
        </div>
        <div class="genre">{{ genre }}</div>
        <div class="artist" v-for="(artist, indexArtist) in artists" :key="indexArtist">
          <div class="name">{{ artist.name }}</div>
          <div class="pieces">
            <div class="albums" v-for="(album) in artist.albums" :key="album.title">
              <div class="title" @click="displayPiece(artist.name, album.title)">{{ album.title }}</div>
            </div>
            <div class="songs" v-for="(song) in artist.songs" :key="song.title">
              <div class="title" @click="displayPiece(artist.name, song.title)">{{ song.title }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="top">
        <div class="nextAndPreviousYoutubeVideoButtons">
          <div class="previous">prev</div>
          <div class="next">next</div>
        </div>
        <div class="videoWrapper">
          <div class="youtube-video">
            <iframe
              id="ytplayer"
              type="text/html"
              width="354"
              height="200"
              :src="videoFullURL"
              frameborder="0"
            />
          </div>
        </div>
        <div class="nextAndPreviousPlaylist">
          <div class="previous">|&lt;</div>
          <div class="trackNumber">{{ trackNumber }} / {{ tracksNumber }}</div>
          <div class="next">&gt;|</div>
        </div>
      </div>
      <div class="bottom">
        <div class="wrapper">
          <div class="book">
            <div class="information">
              <span class="icon">i</span>
            </div>
            <div class="image">
              <img
                src="/modulations-2.jpg"
                height="auto"
                width="200px"
                alt="cover of the book modulations, about electronic music history"
              >
            </div>
          </div>
          <div class="menu-wrapper">
            <div class="menu">
              <span class="icon">A</span>
              <span class="icon">B</span>
              <span class="icon">C</span>
              <span class="icon">D</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import musicData from "./../data/musicData";
import { getUrl, getFormattedVideosData } from "./../helpers/youtube";

export default {
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
      videoId: "4SwCObj4Ahk",
      trackNumber: 0,
      tracksNumber: 0
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
      const URL = getUrl(artistName, pieceName);
      const youtubeAPISearchResults = this.$axios.get(URL).then(res => {
        const results = res.data.items;
        this.videos = getFormattedVideosData(results);
        this.videoId = this.videos[0].videos[0].videoId;
        this.videoTitle = this.videos[0].videos[0].title;
      });
    }
  },
  mounted() {}
};
</script>

<style <style lang="scss" scoped>
.content {
  // Ajouter style pour IPAD pro, si height > width..., aspect ratioaspect-ratio
  display: flex;
  width: 100%;
  @media (max-width: 788px) {
    flex-direction: column;
    align-items: center;
  }
}

.left {
  //background: #eee;
  width: 50%;
  margin: 0 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media (max-width: 788px) {
    width: 480px;
  }
  @media (max-width: 520px) {
    width: 334px;
  }
  .chapter-wrapper {
    display: flex;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .chapter {
      //background: yellow;
      font-family: "Rubik", sans-serif;
      display: flex;
      align-items: center;
      font-size: 40px;
      font-weight: 300;
      text-transform: capitalize;
      font-style: italic;
    }
    .pagination {
      display: flex;
      .previous,
      .next {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 20px;
        width: 50px;
        height: 30px;
        border: 0.5px solid black;
        &:hover {
          cursor: pointer;
          text-decoration: underline;
        }
      }
      .previous {
        margin-right: 10px;
      }
      .disabled {
        pointer-events: none;
        opacity: 0.5;
        background: #ddd;
      }
    }
  }
  .genre {
    display: flex;
    justify-content: flex-end;
    text-transform: uppercase;
    font-size: 20px;
    //background: yellowgreen;
    margin-bottom: 40px;
    font-family: "Rubik", sans-serif;
    font-weight: 700;
    letter-spacing: 1px;
  }
  .artist {
    margin-bottom: 5px;
    font-family: "Karla", sans-serif;
    letter-spacing: 0.5px;
    display: flex;
    text-align: right;
    .name {
      text-transform: uppercase;
      width: 50%;
      padding-right: 10px;
    }
    .pieces {
      width: 50%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      border: 0.5px solid #000;
    }
    .albums,
    .songs {
      font-style: italic;
      width: 100%;
      padding: 0 1px;
      .title:hover,
      .title-without-coma:hover {
        cursor: pointer;
        text-decoration: underline;
      }
    }
  }
}

.right {
  //background: #ccc;
  width: 50%;
  margin: 0 20px;
  display: flex;
  flex-direction: column;
  @media (max-width: 788px) {
    margin-top: 50px !important;
    width: 480px;
  }
  @media (max-width: 520px) {
    margin-top: 50px !important;
    width: 354px;
    margin: 0 10px;
  }
  .top {
    //background: #ccc;
    height: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    @media (max-width: 788px) {
      align-items: center;
    }
    .nextAndPreviousYoutubeVideoButtons {
      width: 354px;
      background: #fafafa;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      display: flex;
      justify-content: center;
      .previous,
      .next {
        background: #fff;
        text-transform: uppercase;
        display: flex;
        align-items: center;
        margin: 10px 5px;
        padding: 0 16px;
        height: 32px;
        border: 0.5px solid #d1d1d1;
        font-size: 13px;
        border-radius: 25px;
        font-family: "Karla", sans-serif;
      }
    }
    .videoWrapper {
      .youtube-video {
        width: 354px;
        height: 200px;
        //background: orangered;
        // add media queries, if screen smaller, adapt height to ratio 1.77
      }
      .html5-video-container video {
        height: 200px;
      }
    }
    .nextAndPreviousPlaylist {
      background: #f1f1f1;
      display: flex;
      width: 354px;
      justify-content: space-between;
      font-family: "Karla", sans-serif;
      .previous,
      .next,
      .trackNumber {
        background: #fff;
        border: 0.5px solid #d1d1d1;
        height: 32px;
        padding: 0 16px;
        margin: 10px 5px;
        display: flex;
        align-items: center;
      }
    }
  }
  .bottom {
    display: flex;
    justify-content: flex-end;
    height: 50%;
    align-items: center;
    .wrapper {
      //background: green;
      display: flex;
      justify-content: space-between;
      width: 354px;
      .book {
        display: flex;
        justify-content: center;
        align-items: center;
        //background: yellow;
      }
      .information {
        height: 258.5px;
        margin-bottom: 5px;
        background: #f1f1f1;
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        .icon {
          border: 0.5px solid #d1d1d1;
          height: 32px;
          width: 32px;
          border-radius: 50%;
          background: #fff;
          display: flex;
          justify-content: center;
          align-items: center;
          font-family: "Karla", sans-serif;
          margin: 10px 5px;
        }
      }
      .menu-wrapper {
        display: flex;
        align-items: center;
        .menu {
          height: 258.5px;
          margin-bottom: 5px;
          background: #fafafa;
          //border-top-left-radius: 10px;
          //border-bottom-left-radius: 10px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .icon {
            border: 0.5px solid #d1d1d1;
            height: 40px;
            width: 30px;
            background: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
            font-family: "Karla", sans-serif;
            margin: 5px 10px;
          }
        }
      }
    }
  }
}
</style>
