<template>
  <div>
    <div
      class="mobile-card"
      v-for="(item, idx) in items"
      :key="idx"
      @click="cardClick(idx)"
      v-on:mouseover="mouseOver(item.backdrop_path)">
      <img :src="cardImage(item.backdrop_path)">
      <div class="card-content">
        <div class="card-info">
          <p>{{ item.name || item.title }}</p>
        </div>
        <div class="card-action">
          <span>See Trailer</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="./js/trailer.js"></script>
<style lang="scss" scoped>
@import '@/globalSCSS/globalvar.scss';
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
.mobile-card:hover {
  box-shadow: $shadow;
}
.mobile-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  background-size: cover;
  border-radius: inherit;
  background-position: center;
  transition: 1s ease;
  transition-delay: 0.5s;
}
.card-content {
  position: absolute;
  bottom: 20px;
  color: #fff;
}
.card-action {
  padding: 0 2rem;
}
.card-info {
  font-size: 0.7rem;
}
</style>
