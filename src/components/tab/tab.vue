<template>
<div>
  <div class="tab">
    <div class="tabs_wrapper">
      <label class="tab_item"
        v-for="(item, idx) in tabs"
        :key="idx"
        ref="tabItems"
        :class="tabClasses(idx)"
        @click="selectTab(idx)"
      >
        <span class="title">{{ item.name }}</span>
      </label>
      <span class="shape" :style="sliderStyle"></span>
    </div>
  </div>
</div>
</template>

<script src="./js/tab.js"></script>
<style lang="scss" scoped>
@import '@/globalSCSS/globalvar.scss';
.tab {
  .tabs_wrapper {
    display: flex;
    align-items: center;
    background: white;
    border-radius: 50px;
    padding: 8px;
    position: relative;
    box-shadow: $shadow;
    .tab_item {
      border-radius: 50px;
      vertical-align: middle;
      font-size: 16px;
      font-weight: 500;
      width: 120px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      transition: all 0.4s;
      cursor: pointer;
      @media only screen and (max-width: 800px) {
        width: 68px;
        font-size: 12px;
      }
      .title{
        vertical-align: middle;
        color: $font-color-2;
        z-index: 1;
      }
    }
  .shape{
    width: 120px;
    height: 24px;
    background: linear-gradient(to right, rgba($tmdbLightGreen, 1) 0%, rgba($tmdbLightBlue, 1) 100%);
    border-radius: 50px;
    position: absolute;
    opacity: 0.6;
    pointer-events: none;
    transition: all 0.5s;
    @media only screen and (max-width: 800px) {
      width: 68px;
    }
  }
  }
}
</style>
