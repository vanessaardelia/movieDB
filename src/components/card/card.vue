<template>
  <div class="card">
    <div
      class="card-wrapper"
      v-for="(item, idx) in items"
      :key="idx"
      @click="cardClick(idx)"
    >
      <VuePercentageCircle
        class="score" size="medium" :animate="true" :active-color="percentColor" complete-color="green" :percent="item.vote_average * 10"
      ></VuePercentageCircle>
      <img :src="cardImage(item.poster_path)" />
      <div class="card-content">
        <h3 class="card-title">{{ item.name || item.title }}</h3>
      </div>
    </div>
  </div>
</template>

<script src="./js/card.js"></script>
<style lang="scss" scoped>
@import '@/globalSCSS/globalvar.scss';
h3 {
  margin: 0;
}

img {
  width: 150px;
  height: auto;
  @media only screen and (max-width: 800px) {
    width: 120px;
  }
  @media only screen and (max-width: 500px) {
    width: 100%;
    height: auto;
    max-height: 150px;
    object-fit: cover;
  }
}

.card {
  &-wrapper {
    background: $tmdbWhite;
    background-size: cover;
    width: 150px;
    min-height: calc(150px * 1.5);
    height: calc(150px * 1.5);
    position: relative;
    display: flex;
    flex-direction: column;
    margin: 0 0 58px 0;
    transition: all 0.3s;
    border: .5px solid rgba($darkerGrey, 1);
    border-radius: $imageBorderRadius;
    @media only screen and (max-width: 800px) {
      width: 120px;
      min-height: calc(120px * 1.5);
      height: calc(120px * 1.5);
    }
    @media only screen and (max-width: 500px) {
      flex-basis: 45%;
    }
    .score {
      position: absolute;
      bottom: 32px;
      z-index: 100;
      right: 8px;
    }
    cursor: pointer;
    img {
      border-radius: $imageBorderRadius;
    }
  }
  &-content {
    height: 90px;
    width: calc(100% - 2rem);
    border-radius: $imageBorderRadius;
    background-color: #ffffff;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 50%);
    box-shadow: 0px 2px 20px 0px #67676738;
    padding: 0 1rem;
  }
  &-title {
    font-size: 12px;
    text-align: start;
    margin: 16px 0;
  }
  &-actors {
    font-size: 11px;
    text-align: start;
    margin: 0 0 2px 0;
  }
}
</style>
