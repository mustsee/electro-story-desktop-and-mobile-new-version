<template>
  <div>
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
    <div class="artists">
      <div class="artist" v-for="(artist, indexArtist) in artists" :key="indexArtist">
        <div class="name medium-screen">{{ artist.name }}</div>
        <div class="pieces medium-screen">
          <div class="albums" v-for="(album) in artist.albums" :key="album.title">
            <div
              :class="[ isActive === album.title ? 'active' : '', 'title']"
              @click="displayPiece(artist.name, album.title)"
            >{{ album.title }}</div>
          </div>
          <div class="songs" v-for="(song) in artist.songs" :key="song.title">
            <div
              :class="[ isActive === song.title ? 'active' : '', 'title']"
              @click="displayPiece(artist.name, song.title)"
            >{{ song.title }}</div>
          </div>
        </div>
        <div
          :class="[ artist.name === currentArtistName ? 'active-name' : '', 'name small-screen-name']"
          @click="handleClickOnArtist(index, indexArtist)"
        >{{ artist.name }}</div>
        <div class="small-screen">
          <div class="pieces" v-if="artist.name === availablePieces.name">
            <div class="albums" v-for="(album) in availablePieces.albums" :key="album.title">
              <div
                :class="[ isActive === album.title ? 'active-small-screen' : '', 'title']"
                @click="displayPiece(availablePieces.name, album.title)"
              >{{ album.title }}</div>
            </div>
            <div class="songs" v-for="(song) in availablePieces.songs" :key="song.title">
              <div
                :class="[ isActive === song.title ? 'active-small-screen' : '', 'title']"
                @click="displayPiece(availablePieces.name, song.title)"
              >{{ song.title }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    "chapters",
    "chapter",
    "genre",
    "artists",
    "numberOfChapters",
    "displayPiece",
    "handlePrevious",
    "handleNext",
    "modifyContent",
    "index",
    "isActive",
    "handleClickOnArtist",
    "availablePieces",
    "currentArtistName"
  ]
};
</script>

<style lang="scss" scoped>
.chapter-wrapper {
  display: flex;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .chapter {
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
  }
}
.genre {
  display: flex;
  justify-content: flex-end;
  text-transform: uppercase;
  font-size: 20px;
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
    padding: 0 10px;
  }
  .small-screen-name {
    border-right: 1px solid black;
    background: yellow;
    cursor: pointer;
    @media (max-width: 600px) {
      min-height: 48px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
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
    .title:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }
}

.active {
  background: red;
}

.active-small-screen {
  text-decoration: underline;
}

.active-name {
  background: #fff !important;
}

.medium-screen {
  @media (max-width: 994px) {
    display: none !important;
  }
}

.artists {
  position: relative;
}

.small-screen,
.small-screen-name {
  @media (min-width: 995px) {
    display: none !important;
  }
}

.small-screen {
  //background: greenyellow;
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  .pieces {
    border: none;
    width: 100%;
    //background: blue;
    border-bottom: 1px solid black;
    @media (max-width: 600px) {
      .title {
        padding: 10px 0;
      }
    }
  }
}
</style>
