<template>
  <div>
    <div
      class="mobile-card"
      v-for="(item, idx) in items"
      :key="idx"
      @click="cardClick(idx)">
      <img :src="cardImage(item.backdrop_path)">
      <div class="card-content">
        <div class="card-info">
          <h3>Discover</h3>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel sequi dolorem tempore quisquam inventore consequuntur?</p>
          <div class="card-more-img">
            <!-- <div v-for="i in items">
              <img @click="changeImage(i)" :src="i" alt="">
            </div> -->
          </div>
        </div>
        <div class="card-action">
          <span>More</span>
          <i class="fas fa-arrow-right"></i>
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
  display: flex;
  justify-content: space-between;
  color: #fff;
  padding: 0 2rem;
}

.card-info {
  font-size: 0.7rem;
  padding: 0 2rem 2rem 2rem;
}
.card-info h3 {
  font-size: 1.3rem;
  padding-bottom: 1rem;
}
.card-more-img {
  height: 50px;
  margin-top: 1rem;
  display: flex;
  gap: 0.5rem;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 10px;
}
.card-more-img div {
  width: 40px;
  height: calc(90% - 0.4rem);
  transform: translateY(15%);
  border-radius: 7px;
  overflow: hidden;
  filter: brightness(0.7);
  cursor: pointer;
  transition: filter 0.3s ease;
}
.card-more-img div:hover {
  filter: brightness(1);
}
.card-more-img div img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
