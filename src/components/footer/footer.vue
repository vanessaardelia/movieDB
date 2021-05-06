<template>
  <div class="footer">
    <div class="footer__wrapper">
      <div>
        <img class="footer__img" src="../../assets/logo2.jpg" />
        <a href="http://cv-vanessaardelia.surge.sh" target="_blank"><h4 class="footer__more">More project</h4></a>
      </div>
      <div class="footer__content">
        <h5>API: https://developers.themoviedb.org/3</h5>
        <p>created using vue js, by implementing the use of components and the design language system</p>
      </div>
    </div>
  </div>
</template>

<script src="./js/footer.js"></script>
<style lang="scss" scoped>
@import '@/globalSCSS/globalvar.scss';
p, h5 {
  color: white;
}

h5 {
  @media only screen and (max-width: 800px) {
    margin: 0;
  }
}
a {
  text-decoration: none;
}
p {
  font-size: 12px;
}
.footer {
  height: 200px;
  background: radial-gradient(at 30% top, #031d33 0%, rgba($tmdbDarkBlue, 1) 70%);
  align-items: center;
  text-align: center;
  padding: 24px 56px;
  position: relative;
  display: flex;
  margin: auto;
  justify-content: center;
  @media only screen and (max-width: 1200px) {
    padding: 24px;
    height: 200px;
  }
  &__wrapper {
    display: flex;
    gap: 24px;
    @media only screen and (max-width: 800px) {
      flex-direction: column;
      align-items: center;
      gap: 16px;
    }
  }
  &__img {
    width: 146px;
    @media only screen and (max-width: 800px) {
      width: 60px;
    }
  }
  &__more {
    border-radius: $imageBorderRadius;
    padding: 8px 0px;
    border-color: $tmdbWhite;
    background-color: $tmdbWhite;
    color: rgba($accountTeal, 1);
    margin: 0;
    cursor: pointer;
    width: 150px;
  }
  &__content {
    width: 300px;
  }
}
</style>
