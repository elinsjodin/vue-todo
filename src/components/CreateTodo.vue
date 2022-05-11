<template>
  <form>
    <div :class="inputGroup">
      <input
        :class="newTodoInput"
        v-model="newTodo"
        type="text"
        placeholder=" "
      />
      <span :class="label">New Todo</span>
    </div>
    <button
      :class="addTodoButton"
      @click.prevent="addNewTodo"
      :disabled="!newTodo"
    >
      Add Task
    </button>
  </form>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import { Todo } from "@/models/Todo";
import { Prop } from "vue-property-decorator";

export default class CreateTodo extends Vue {
  @Prop() newTodoInput!: string;
  @Prop() addTodoButton!: string;
  @Prop() label!: string;
  @Prop() inputGroup!: string;

  newTodo = "";

  addNewTodo() {
    this.$emit("createTodo", new Todo(this.newTodo, false));
    this.newTodo = "";
  }
}
</script>

<style lang="scss" scoped>
form {
  display: flex;
  align-items: center;
  flex-direction: row;
}

.input-group {
  width: 200px;
  position: relative;
}

.todo-input {
  width: 50%;
  padding: 5px 0;
  border: none;
  border-bottom: 1px solid rgb(26, 60, 26);
  outline: none;
  min-width: 200px;
}

.todo-input:focus {
  outline: none;
}

.label {
  color: rgb(26, 60, 26);
  position: absolute;
  left: 1px;
  top: 3;
  pointer-events: none;
  transition: all 0.2s ease;
}

.todo-input:focus + .label,
.todo-input:not(:placeholder-shown) + .label {
  top: -10px;
  font-size: 12px;
}

.add-todo-btn {
  background-color: rgb(204, 196, 152);
  color: rgb(16, 36, 16);
  border: none;
  padding: 5px;
  border-radius: 4px;
  cursor: pointer;
}
</style>
