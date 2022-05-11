<template>
  <div :class="sortBtnContainer">
    <button :class="sort" @click="sortTodosByName">Title</button>
    <button :class="sort" @click="sortTodosByStatus">Status</button>
    <button :class="sort" @click="renderCompletedTasks">Completed</button>
    <button :class="sort" @click="renderUncompletedTasks">Uncompleted</button>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import { Todo } from "@/models/Todo";
import { Prop } from "vue-property-decorator";

export default class SortTodos extends Vue {
  @Prop() sortBtnContainer!: string;
  @Prop() sort!: string;

  todos: Todo[] = [];

  sortTodosByName() {
    this.$emit("sortTodosByName", this.todos);
  }

  sortTodosByStatus() {
    this.$emit("sortTodosByStatus", this.todos);
  }

  renderCompletedTasks() {
    this.$emit("renderCompletedTasks", this.todos);
  }

  renderUncompletedTasks() {
    this.$emit("renderUncompletedTasks", this.todos);
  }
}
</script>

<style lang="scss" scoped>
.sort-btn-container {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 5px;
  margin-bottom: 20px;
}
.sort {
  background-color: rgb(201, 222, 201);
  color: rgb(16, 36, 16);
  border: none;
  padding: 5px;
  border-radius: 4px;
  cursor: pointer;
}
</style>
