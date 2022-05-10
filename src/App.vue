<template>
  <ShowTodoList></ShowTodoList>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Loader from "./components/Loader.vue";
import ShowTodoList from "./components/ShowTodoList.vue";
import ShowTodos from "./components/ShowTodos.vue";

@Options({
  components: {
    ShowTodoList,
    ShowTodos,
    Loader,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss"></style>
