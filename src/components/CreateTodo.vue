<template>
  <div>
    <input v-model="newTodo" type="text" placeholder="New Todo" />
    <button @click="addNewTodo">Add Task</button>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import { Todo } from "@/models/Todo";

export default class CreateTodo extends Vue {
  newTodo = "";

  addNewTodo() {
    this.$emit("createTodo", new Todo(this.newTodo, false));
    this.newTodo = "";
  }
}
</script>

<style lang="scss" scoped></style>
