<template>
  <nav>
    <div class="navbar">
      <div class="navbar__container">
        <div class="navbar__logo">
          <img src="@/assets/tmdb.svg" @click="goToHome"/>
        </div>
        <div class="navbar__route">
          <ul>
            <li><a class="navbar__route-link">Movie</a></li>
            <li><a class="navbar__route-link">TV Show</a></li>
            <li><a class="navbar__route-link">People</a></li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script src="./js/navbar.js"></script>
<style lang="scss" scoped>
@import '@/globalSCSS/globalvar.scss';

nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
}
.navbar {
  padding: 8px 24px;
  background: $tmdbDarkBlue;
  position: relative;
  box-shadow: $shadow;
  @media only screen and (max-width: 768px) {
    height: 46px;
    padding: 12px;
  }
  &__logo {
    cursor: pointer;
    img {
      width: auto;
      height: 24px;
      @media only screen and (max-width: 768px) {
        height: 16px;
      }
    }
  }
  &__route{
    &-link {
      display: block;
      text-align: center;
      padding: 0 16px;
      text-decoration: none;
      color: $tmdbWhite;
      @media only screen and (max-width: 768px) {
        width: max-content;
        padding: 0px 12px;
        font-size: 14px;
      }
    }
    ul {
      position: relative;
      display: flex;
      list-style: none;
      padding: 0px;
      @media only screen and (max-width: 768px) {
        justify-content: center;
        margin: 8px;
      }
    }
    &-link:hover {
      color: $accountTeal;
      cursor: pointer;
    }
  }
  &__container {
    margin: auto;
    max-width: 1200px;
    justify-content: space-between;
    align-items: center;
    display: flex;
  }
}

@media only screen and (max-width: 768px) {
  .navbar{
    &__container {
      flex-direction: column;
    }
    &__route{
      overflow-x: auto;
      width: 100%;
    }
  }
}
</style>
