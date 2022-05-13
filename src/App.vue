<template>
  <Loader
    v-if="loadingTodos"
    loadingWrapper="loading-wrapper"
    loadingContainer="loading-container"
    lines="lines"
    diamond="diamond"
  ></Loader>
  <div v-else>
    <ShowTodoList
      mainContainer="main-container"
      todoListContainer="todo-list-container"
      navContainer="nav-container"
      lines="lines"
      diamond="diamond"
      listContainer="list-container"
    ></ShowTodoList>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Loader from "./components/Loader.vue";
import CreateTodo from "./components/CreateTodo.vue";
import ShowTodoList from "./components/ShowTodoList.vue";

@Options({
  components: {
    Loader,
    CreateTodo,
    ShowTodoList,
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
* {
  font-family: serif;
}
body {
  height: 100vh;
  background-image: linear-gradient(300deg, rgb(84, 134, 84), mintcream);
  margin: 0px;
  padding: 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: serif;
}
</style>
