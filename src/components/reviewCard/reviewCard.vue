<template>
  <div>
    <div
      class="reviewcard"
      v-for="(item, idx) in items"
      :key="idx"
    >
      <div class="reviewcard__img">
        <img :src="cardImage(item.author_details)">
      </div>
      <div class="reviewcard__profile">
        <h1 class="reviewername">A review by {{ item.author }}</h1>
        <p class="reviewdate" :date="format(item.updated_at)">Written by {{ item.author }} on {{ date }}</p>
        <read-more class="reviewcard__review" more-str="read the rest" :text="item.content" link="#" less-str="read less" :max-chars="150"></read-more>
      </div>
    </div>
  </div>
</template>
<script src="./js/reviewCard.js"></script>
<style lang="scss" scoped>
@import '@/globalSCSS/globalvar.scss';
h2 {
  margin-top: 0;
}
.reviewcard {
  box-shadow: $shadow;
  padding: 30px 50px;
  font-weight: 400;
  border-radius: 15px;
  background: #fff;
  display: flex;
  @media only screen and (max-width: 800px) {
    flex-direction: column;
    padding: 16px;
  }
  &__img {
    float: left;
    img {
      width: 50px;
      height: 50px;
      border-radius: 50px; 
      object-fit: cover;
      margin-right: 16px;
      @media only screen and (max-width: 800px) {
        margin-right: 0;
        margin-bottom: 8px;
      }
    }
  }
  &__profile {
    text-align: left;
  }
  &__review {
    font-size: 14px;
    @media only screen and (max-width: 800px) {
      max-width: 600px;
    }
  }
}

.reviewername {
  margin: 0px;
  font-size: 16px;
}

.reviewdate {
  font-size: 12px;
}
</style>
