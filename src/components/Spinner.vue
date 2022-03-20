<template>
  <div class="spinner">
    <div class="lds-dual-ring"></div>
  </div>
</template>
<script></script>
<style lang="scss" scoped>
@import "~assets/scss/_color.scss";
.spinner {
  display: flex;
  justify-content: center;
  align-items: center;
  height:100vh;
}
.lds-dual-ring {
  display: inline-block;
  width: 8rem;
  height: 8rem;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 6.4rem;
  height: 6.4rem;
  margin: 0.8rem;
  border-radius: 50%;
  border: 0.6rem solid $white;
  border-color: #61d179 transparent $white transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}



</style>