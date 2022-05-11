<template>
  <div :class="loadingWrapper">
    <div :class="loadingContainer">
      <div :class="lines"></div>
      <div :class="diamond"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";

export default class Loader extends Vue {
  @Prop() loadingWrapper!: string;
  @Prop() loadingContainer!: string;
  @Prop() lines!: string;
  @Prop() diamond!: string;
}
</script>

<style lang="scss" scoped>
@import "@/styles/mixins";
.loading-wrapper {
  min-width: 400px;
  max-width: 400px;
  .loading-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .lines {
      min-width: 100%;
      height: 10px;
      position: relative;
      @include tablet {
        min-width: 110%;
      }
    }
    .lines::after,
    .lines::before {
      content: "";
      position: absolute;
      margin: auto;
      height: 1.8px;
      background-color: rgb(199, 134, 134);
      width: 45%;
      top: 195%;
      animation: line 1s ease-in;
      @include tablet {
        height: 2px;
      }
    }
    .lines::after {
      left: 0;
    }
    .lines::before {
      right: 0;
    }
    .diamond {
      height: 30px;
      width: 30px;
      border: 2px solid rgb(180, 167, 93);
      margin: auto;
      transform: rotate(45deg);
      @include tablet {
        height: 6px;
        width: 6px;
      }
      @include desktop {
        height: 20px;
        width: 20px;
      }
    }
    @keyframes line {
      0% {
        transform: translateX(-120%);
        opacity: 0;
      }
      50% {
        transform: translateX(0%);
        opacity: 1;
      }
      0% {
        left: 53%;
      }
    }
  }
}
</style>
