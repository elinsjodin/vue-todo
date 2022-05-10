<template>
  <Loader
    v-if="loadingTodos"
    loadingWrapper="loading-wrapper"
    loadingContainer="loading-container"
    lines="lines"
    diamond="diamond"
  ></Loader>
  <div v-else>
    <ShowTodoList></ShowTodoList>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Loader from "./components/Loader.vue";
import ShowTodoList from "./components/ShowTodoList.vue";

@Options({
  components: {
    ShowTodoList,
    Loader,
  },
})
export default class App extends Vue {
  loadingTodos = true;

  mounted() {
    setTimeout(() => {
      this.loadingTodos = !this.loadingTodos;
    }, 1200);
  }
}
</script>

<style lang="scss">
// body {
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
// }
</style>
