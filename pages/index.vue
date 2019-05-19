<template>
  <div class="content">
    <div class="left">
      <div>
        <div class="chapter">chapter {{ chapter }}</div>
        <div class="genre">{{ genre }}</div>
        <div class="artist" v-for="(artist, indexArtist) in artists" :key="indexArtist">
          <span class="name">{{ artist.name }},</span>
          <span class="albums" v-for="(album, indexAlbum) in artist.albums" :key="album.title">
            <span class="title" v-if="indexAlbum === 0">{{ album.title }}</span>
            <span v-else>
              ,&nbsp;
              <span class="title-without-coma">{{ album.title }}</span>
            </span>
          </span>
          <span class="songs" v-for="(song, indexSong) in artist.songs" :key="song.title">
            <span class="title" v-if="indexSong === 0">{{ song.title }}</span>
            <span v-else>
              ,&nbsp;
              <span class="title-without-coma">{{ song.title }}</span>
            </span>
          </span>
        </div>
      </div>
      <div class="pagination">
        <div :class="[ index === 0 ? 'disabled' : '', 'previous']" @click="handlePrevious">&lt;</div>
        <div
          :class="[ index === numberOfChapters - 1 ? 'disabled' : '', 'next']"
          @click="handleNext"
        >&gt;</div>
      </div>
    </div>
    <div class="right">
      <div class="top">
        <div class="wrapper">
          <div class="youtube-video">
            <iframe
              id="ytplayer"
              type="text/html"
              width="354"
              height="200"
              src="http://www.youtube.com/embed/9HUV5a7MgS4"
              frameborder="0"
            />
          </div>
        </div>
      </div>
      <div class="bottom"></div>
    </div>
  </div>
</template>

<script>
import musicData from "./../data/musicData";

export default {
  data() {
    return {
      index: 0,
      chapters: ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"],
      chapter: "I",
      genre: musicData.music[0].musicGenre,
      artists: musicData.music[0].artists,
      numberOfChapters: musicData.music.length
    };
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
    }
  },
  mounted() {}
};
</script>

<style <style lang="scss" scoped>
.content {
  display: flex;
  width: 100%;
}

.left {
  background: #eee;
  width: 50%;
  margin: 0 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .chapter {
    //background: yellow;
    margin-bottom: 20px;
    font-family: "Rubik", sans-serif;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 40px;
    font-weight: 300;
    text-transform: capitalize;
    font-style: italic;
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
    //background: orange;
    margin-bottom: 5px;
    font-family: "Karla", sans-serif;
    letter-spacing: 0.5px;
    .name {
      text-transform: uppercase;
    }
    .albums,
    .songs {
      font-style: italic;
      .title:hover,
      .title-without-coma:hover {
        cursor: pointer;
        text-decoration: underline;
      }
    }
  }
  .pagination {
    display: flex;
    justify-content: flex-end;
    margin-top: 50px;
    .previous,
    .next {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 20px;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      &:hover {
        cursor: pointer;
        text-decoration: underline;
      }
    }
    .disabled {
      pointer-events: none;
      opacity: 0.5;
      background: #ddd;
    }
  }
}

.right {
  background: #ccc;
  width: 50%;
  margin: 0 20px;
  display: flex;
  flex-direction: column;
  .top {
    background: yellow;
    height: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    .wrapper {
      .youtube-video {
        width: 354px;
        height: 200px;
        background: orangered;
        // add media queries, if screen smaller, adapt height to ratio 1.77
      }
    }
  }
  .bottom {
    background: mediumseagreen;
    width: 100%;
    height: 50%;
  }
}
</style>
