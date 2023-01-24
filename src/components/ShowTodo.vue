<template>
  <ul>
    <li :class="[{ taskDone: todo.done }]">
      <h3>{{ todo.task }}</h3>
      <div :class="liButtonsContainer">
        <span v-if="todo.done">
          <button :class="liButtons" @click="markAsDone">X</button>
        </span>
        <span v-else
          ><button :class="liButtons" @click="markAsDone">
            &#10003;
          </button></span
        >
        <button :class="liButtons" @click="deleteTodo">Delete</button>
        <button :class="liButtons" @click="editTodo(index)">Edit</button>
      </div>
    </li>
  </ul>
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
  @Prop() liButtonsContainer!: string;
  @Prop() liButtons!: string;
  @Prop() index!: number;

  todos: Todo[] = [];

  deleteTodo() {
    this.$emit("deleteTodo", this.todo);
  }

  markAsDone() {
    this.$emit("markAsDone", this.todo);
  }

  editTodo(id: number) {
    this.$emit("editTodo", id);
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/mixins";

ul {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding-inline-start: 0;
  min-width: 230px;
  @include desktop {
    min-width: 300px;
  }
  li {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    flex-wrap: wrap;
    min-width: 95%;
    max-width: 95%;
    flex-basis: 100%;
    flex: 1;
    background-image: linear-gradient(300deg, rgb(84, 134, 84), mintcream);
    list-style: none;
    border-radius: 5px;
    font-size: 1em;
    @include tablet {
      font-size: 1.2em;
      min-width: 93%;
      max-width: 93%;
    }
    h3 {
      font-size: 1.2em;
      text-decoration: none;
      color: rgb(26, 60, 26);
      width: 60%;
    }
    .li-btns-container {
      display: flex;
      justify-content: flex-end;
      width: 30%;
      gap: 5px;
      .li-btns {
        background-color: rgb(201, 222, 201);
        color: rgb(16, 36, 16);
        border: none;
        padding: 5px;
        border-radius: 4px;
        cursor: pointer;
      }
    }
    &.taskDone {
      background-image: linear-gradient(300deg, rgb(194, 146, 146), snow);
      opacity: 0.6;
      h3 {
        text-decoration: 0.8px line-through rgb(26, 60, 26);
      }
      .li-btns {
        background-color: rgb(234, 225, 225);
      }
    }
  }
}
</style>
