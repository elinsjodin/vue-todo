<template>
  <div>
    <h3>{{ todo.task }}</h3>
    <span>{{ todo.done }}</span>
    <button @click="deleteTodo">Delete Todo</button>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";
import { Todo } from "@/models/Todo";
import CreateTodo from "./CreateTodo.vue";

@Options({
  components: {
    CreateTodo,
  },
})
export default class ShowTodo extends Vue {
  @Prop() todo!: Todo;

  todos: Todo[] = [];

  deleteTodo() {
    this.$emit("deleteTodo", this.todo);
  }
}
</script>

<style lang="scss" scoped></style>
