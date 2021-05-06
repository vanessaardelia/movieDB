<template>
  <div class="searchbar" :class="inputClasses">
    <input
      type="text"
      class="searchbar__input"
      :placeholder="placeholder"
      :value="value"
      @input="updateValue($event.target.value)"
    >
    <div class="searchbar__btn" @click="btnClick">
      <img src="../../assets/search.svg" />
    </div>
  </div>
</template>

<script src="./js/searchbar.js"></script>
<style lang="scss" scoped>
@import '@/globalSCSS/globalvar.scss';
.searchbar {
  height: 36px;
  border-radius: 40px;
  display: flex;
  align-items: center;
  padding-left: 20px;
  position: relative;
  max-width: 950px;
  background: $tmdbWhite;
  position: absolute;
  z-index: 5;
  width: 80%;
  &__input {
    border: none;
    height: 25px;
    width: 80%;
    color: $font-color-2;
    font-size: 15px;
    outline: none;
    background-color: transparent;
  }
  &__btn {
    background: $tmdbLightGreen;
    border-radius: 20px;
    height: 38px;
    min-width: 38px;
    display: flex;
    align-items: center;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    justify-content: center;
    cursor: pointer;
    right: 0;
    position: absolute;
    img {
      width: 18px;
      height: 18px;
    }
  }
}
</style>
