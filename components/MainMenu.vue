<template>
  <div class="wrapper">
    <div class="left">
      <div class="information">
        <span v-show="isMenuAActive" class="icon" @mouseover="active" @click="active">i</span>
      </div>
      <img
        v-show="!showBookInformation && isMenuAActive"
        src="/modulations-2.jpg"
        height="auto"
        width="200px"
        alt="cover of the book modulations, about electronic music history"
      >
      <div v-show="showBookInformation && isMenuAActive" class="informations">
        <h1>Modulations - A History of Electronic Music</h1>
        <div>Modulations is a 2000 book edited by Peter Shapiro. It's one of the major book on electronic music history and a companion piece to the documentary film Modulations: Cinema for the Ear.</div>
        <div>This website aims to be another companion, a facilitator for listening to the book's discography.</div>
      </div>
      <div v-show="isMenuBActive" class="informations">
        <h1>Featuring</h1>
        <div>Wrote a short poem ?</div>
        <div>Draw something silly?</div>
        <div>Painted a tiny picture ?</div>
        <div>
          Write me an email at
          <span>thomas.sypniewski[@]gmail.com</span>
        </div>
        <div>Would be happy to present it in this little square.</div>
        <div>:)</div>
      </div>
      <div v-show="isMenuCActive" class="informations">
        <h1>Get in touch</h1>
        <div>A comment ?</div>
        <div>A thank you note ?</div>
        <div>A problem or an idea to make this website better ?</div>
        <div>Want some more ?</div>
        <div>
          Write me an email at
          <span>thomas.sypniewski[@]gmail.com</span>
        </div>
        <div>Would be delighted to read it.</div>
      </div>
    </div>
    <div class="right">
      <div class="menu">
        <span class="icon" @mouseover="showMenuA" @click="showMenuA">A</span>
        <span class="icon" @mouseover="showMenuB" @click="showMenuB">B</span>
        <span class="icon" @mouseover="showMenuC" @click="showMenuC">C</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showBookInformation: false,
      isMenuAActive: true,
      isMenuBActive: false,
      isMenuCActive: false
    };
  },
  methods: {
    active() {
      this.showBookInformation = !this.showBookInformation;
    },
    showMenuA() {
      this.isMenuAActive = true;
      this.isMenuBActive = false;
      this.isMenuCActive = false;
    },
    showMenuB() {
      this.isMenuBActive = true;
      this.isMenuAActive = false;
      this.isMenuCActive = false;
    },
    showMenuC() {
      this.isMenuCActive = true;
      this.isMenuBActive = false;
      this.isMenuAActive = false;
    }
  }
};
</script>


<style lang="scss" scoped>
.wrapper {
  display: flex;
  justify-content: space-between;
  width: 354px;
}
.icon {
  font-family: "Karla", sans-serif;
  border: 0.5px solid #d1d1d1;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
}
.left,
.right {
  display: flex;
  align-items: center;
  .information,
  .menu {
    height: 258.5px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .information {
    background: #f1f1f1;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    width: 42px;
    .icon {
      height: 32px;
      width: 32px;
      border-radius: 50%;
      margin: 0 5px;
    }
  }
  .informations {
    user-select: text;
    height: 257.5px;
    width: 261px;
    padding: 15px 10px;
    font-size: 14px;
    border: 0.5px solid #d1d1d1;
    text-align: center;
    font-family: "Karla", sans-serif;
    h1 {
      text-align: center;
      font-size: 15px;
      margin-bottom: 15px;
      text-decoration: underline;
    }
    div {
      margin: 10px;
      span {
      }
    }
  }
  .menu {
    background: #fafafa;
    flex-direction: column;
    .icon {
      height: 40px;
      width: 30px;
      margin: 5px 10px;
    }
  }
}
</style>