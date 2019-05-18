<template>
  <div class="content">
    <div class="left">
      <div class="chapter">chapter {{ chapter }}</div>
      <div class="genre">{{ genre }}</div>
      <div class="artist" v-for="(artist, index) in artists" :key="index">
        <span class="name">{{ artist.name }},</span>
        <span class="albums" v-for="(album, index) in artist.albums" :key="album.title">
          <span v-if="index === 0">{{ album.title }}</span>
          <span v-else>, {{ album.title }}</span>
        </span>
        <span class="songs" v-for="song in artist.songs" :key="song.title">{{ song.title }}</span>
      </div>
    </div>
    <div class="right">
      <div class="top"></div>
      <div class="bottom-right"></div>
    </div>
  </div>
</template>

<script>
import musicData from "./../data/musicData";

export default {
  data() {
    return {
      chapter: "IV",
      genre: musicData.music[4].musicGenre,
      artists: musicData.music[4].artists
    };
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
  width: 500px;
  padding-right: 20px;
  .chapter {
    font-size: 40px;
    font-weight: 300;
    font-style: italic;
    text-transform: capitalize;
    background: yellow;
    margin-bottom: 20px;
    font-family: "Rubik", sans-serif;
  }
  .genre {
    display: flex;
    justify-content: flex-end;
    text-transform: uppercase;
    font-size: 20px;
    background: yellowgreen;
    margin-bottom: 40px;
    font-family: "Rubik", sans-serif;
    font-weight: 700;
    letter-spacing: 1px;
  }
  .artist {
    background: orange;
    margin-bottom: 5px;
    font-family: "Karla", sans-serif;
    letter-spacing: 0.5px;
    .name {
      text-transform: uppercase;
    }
    .albums,
    .songs {
      font-style: italic;
    }
  }
}

.right {
  background: #ccc;
  width: 500px;
  padding-left: 20px;
}
</style>
