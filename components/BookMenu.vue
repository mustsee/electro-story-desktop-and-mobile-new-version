<template>
  <div class="wrapper">
    <div class="left">
      <div class="information">
        <span class="icon disabled">i</span>
      </div>
      <img
        src="/modulations-2.jpg"
        height="auto"
        width="200px"
        alt="cover of the book modulations, about electronic music history"
      >
    </div>
    <div class="right">
      <div class="menu">
        <span class="icon disabled">A</span>
        <span class="icon disabled">B</span>
        <span class="icon disabled">C</span>
        <span class="icon disabled">D</span>
      </div>
    </div>
  </div>
</template>

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
    .icon {
      height: 32px;
      width: 32px;
      border-radius: 50%;
      margin: 0 5px;
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