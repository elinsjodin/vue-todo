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
      v-if="editedTodo!.task.length > 0"
      :class="addTodoButton"
      @click.prevent="handleEditTodo"
    >
      Edit Task
    </button>
    <button
      v-else
      :class="addTodoButton"
      @click.prevent="addNewTodo"
      :disabled="!newTodo"
    >
      Add Task
    </button>
  </form>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Todo } from "@/models/Todo";
import { Prop } from "vue-property-decorator";
import { IEditTodo } from "@/models/IEditTodo";

@Options({
  watch: {
    editedTodo: function () {
      console.log("Edit in Create", this.editedTodo);

      if (this.editedTodo) this.newTodo = this.editedTodo.task;
    },
  },
})
export default class CreateTodo extends Vue {
  @Prop() newTodoInput!: string;
  @Prop() addTodoButton!: string;
  @Prop() label!: string;
  @Prop() inputGroup!: string;
  @Prop() editedTodo!: Todo | undefined;
  @Prop() editedIndex!: number;

  todos: Todo[] = [];

  newTodo = "";

  mounted() {
    if (this.editedTodo && this.editedTodo.id > 0) {
      console.log("Edit in Create", this.editedTodo);

      this.newTodo = this.editedTodo.task;
    }
  }

  addNewTodo() {
    this.$emit("createTodo", new Todo(this.newTodo, false));

    this.newTodo = "";
  }

  handleEditTodo() {
    let updatedTask: IEditTodo = {
      index: this.editedIndex,
      text: this.newTodo,
    };
    this.$emit("handleEditTodo", updatedTask);
    this.newTodo = "";
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/mixins";

form {
  display: flex;
  align-items: center;
  flex-direction: row;
}
.input-group {
  width: 180px;
  position: relative;
  @include tablet {
    width: 210px;
  }
}
.todo-input {
  width: 87%;
  padding: 5px 0;
  border: none;
  border-bottom: 1px solid rgb(26, 60, 26);
  outline: none;
  margin-left: 20px;
  @include tablet {
    width: 100%;
    margin-left: 0;
  }
}
.todo-input:focus {
  outline: none;
}
.label {
  color: rgb(26, 60, 26);
  position: absolute;
  left: 20px;
  top: 3;
  pointer-events: none;
  transition: all 0.2s ease;
  @include tablet {
    left: 1px;
  }
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
  font-size: 0.7em;
  cursor: pointer;
  @include tablet {
    font-size: 0.9em;
  }
}
</style>
