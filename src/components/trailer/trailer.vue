<template>
  <div>
    <div
      class="mobile-card"
      v-for="(item, idx) in items"
      :key="idx"
      @click="cardClick(idx)"
      v-on:mouseover="mouseOver(item.backdrop_path)">
      <img class="backdrop" :src="cardImage(item.backdrop_path)">
      <div class="card-content">
        <img v-if="playbtn" class="playbtn" src="../../assets/play.svg" />
        <div class="card-action">
          <span>{{ item.name || item.title }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="./js/trailer.js"></script>
<style lang="scss" scoped>
@import '@/globalSCSS/globalvar.scss';
.playbtn {
  width: 40px;
  height: 40px;
  display: flex;
  align-self: center;
  position: relative;
  bottom: 24px;
}
.mobile-card {
  position: relative;
  width: 300px;
  height: 150px;
  border-radius: $imageBorderRadius;
  overflow: hidden;
  transition: 0.3s ease;
  cursor: pointer;
  @media only screen and (max-width: 800px) {
    width: 280px;
  }
}
.mobile-card::before {
  content: "";
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 2rem;
  height: 200px;
}
.mobile-card {
  .backdrop {
  width: 100%;
  height: 100%;
  object-fit: cover;
  background-size: cover;
  border-radius: inherit;
  background-position: center;
  transition: 1s ease;
  transition-delay: 0.5s;
  }
}
.card-content {
  position: absolute;
  bottom: 20px;
  color: $tmdbWhite;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 24px;
  width: -webkit-fill-available;
}
.card-action {
  span {
    text-align: left;
    float: left;
  }
}
</style>
