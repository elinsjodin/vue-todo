<template>
  <div :class="sortBtnContainer">
    <button :class="sort" @click="sortTodosByName">Title</button>
    <button :class="sort" @click="sortTodosByStatus">Status</button>
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
}
</script>

<style lang="scss" scoped>
@import "@/styles/mixins";

.sort-btn-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 3px;
  margin-bottom: 18px;
  @include tablet {
    gap: 5px;
    margin-bottom: 20px;
  }
}
.sort {
  background-color: rgb(201, 222, 201);
  color: rgb(16, 36, 16);
  border: none;
  padding: 5px;
  border-radius: 4px;
  cursor: pointer;
  min-width: 40px;
  @include tablet {
    font-size: 0.9em;
    min-width: 70px;
  }
}
</style>
