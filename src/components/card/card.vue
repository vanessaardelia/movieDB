<template>
  <div class="card">
    <div
      class="card-wrapper"
      v-for="(item, idx) in items"
      :key="idx"
      @click="cardClick(idx)"
    >
      <img :src="cardImage(item.poster_path)" />
      <div class="card-content">
        <h3 class="card-title">{{ item.name || item.title }}</h3>
        <p class="card-actors">
          asdasdada
        </p>
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
.card {
  &-wrapper{
    background-size: cover;
    width: 150px;
    min-height: calc(150px * 1.5);
    height: calc(150px * 1.5);
    position: relative;
    display: flex;
    flex-direction: column;
    margin: 0 0 58px 0;
    transition: all 0.3s;
    cursor: pointer;
    img {
      border-radius: $imageBorderRadius;
    }
  }
  &-content {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
    height: 100px;
    width: calc(100% - 2rem);
    border-radius: 20px;
    background-color: #ffffff;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 50%);
    box-shadow: 0px 2px 20px 0px #67676738;
    padding: 0 1rem;
  }
  &-title {
    font-size: 15px;
    text-align: start;
    margin: 2px 0;
  }
  &-actors {
    font-size: 11px;
    text-align: start;
    margin: 0 0 2px 0;
  }
}
</style>
