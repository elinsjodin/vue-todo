<template>
  <CreateTodo @createTodo="handleCreateTodo($event)" />
  <ShowTodo
    v-for="(t, i) in todos"
    :todo="t"
    :key="i"
    @deleteTodo="handleDeleteTodo($event)"
  />
</template>

<script lang="ts">
import { Todo } from "@/models/Todo";
import { Options, Vue } from "vue-class-component";
import CreateTodo from "./CreateTodo.vue";
import ShowTodo from "./ShowTodo.vue";

@Options({
  components: {
    ShowTodo,
    CreateTodo,
  },
})
export default class ShowTodoList extends Vue {
  todos: Todo[] = [];

  handleCreateTodo(task: Todo) {
    this.todos.push(task);
    console.log(this.todos);
  }

  handleDeleteTodo(todo: Todo) {
    this.todos.splice(this.todos.indexOf(todo), 1);
  }
}
</script>

<style lang="scss" scoped></style>
