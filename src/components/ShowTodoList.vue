<template>
  <div :class="mainContainer">
    <div :class="todoListContainer">
      <h2>Todo List</h2>
      <div :class="lines"><div :class="diamond"></div></div>
      <div :class="navContainer">
        <SortTodos
          @sortTodosByName="handleSortTodosByName($event)"
          @sortTodosByStatus="handleSortTodosByStatus($event)"
          sortBtnContainer="sort-btn-container"
          sort="sort"
        />
        <CreateTodo
          @createTodo="handleCreateTodo($event)"
          @handleEditTodo="handleUpdatedTodo($event)"
          inputGroup="input-group"
          newTodoInput="todo-input"
          label="label"
          addTodoButton="add-todo-btn"
          :editedTodo="edit"
          :editedIndex="index"
        />
      </div>
      <div :class="listContainer">
        <ShowTodo
          v-for="(t, i) in todos"
          :todo="t"
          :key="t.id"
          :task="t.task"
          :done="t.done"
          :index="i"
          @editTodo="handleEditTodo($event)"
          @markAsDone="handleMarkAsDone($event)"
          @deleteTodo="handleDeleteTodo($event)"
          liButtonsContainer="li-btns-container"
          liButtons="li-btns"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { IEditTodo } from "@/models/IEditTodo";
import { Todo } from "@/models/Todo";
import { Options, Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";
import CreateTodo from "./CreateTodo.vue";
import ShowTodo from "./ShowTodo.vue";
import SortTodos from "./SortTodos.vue";

const LOCAL_STORAGE_LIST_KEY = "todos";

@Options({
  components: {
    ShowTodo,
    CreateTodo,
    SortTodos,
  },
})
export default class ShowTodoList extends Vue {
  @Prop() mainContainer!: string;
  @Prop() todoListContainer!: string;
  @Prop() navContainer!: string;
  @Prop() lines!: string;
  @Prop() diamond!: string;
  @Prop() listContainer!: string;
  edit: Todo = { id: 0, done: false, task: "" };

  index = -1;

  todos: Todo[] = [];

  theEdit: IEditTodo = { index: 0, text: "" };

  created() {
    this.todos = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_LIST_KEY) || "[]"
    );
  }

  computed() {
    return this.todos.filter(({ done }) => done);
  }

  handleCreateTodo(task: Todo) {
    this.todos.push(task);

    this.saveToLocalStorage();
  }

  handleEditTodo(id: number) {
    this.edit = this.todos[id];
    this.index = id;
    console.log("Edit in ShowList", this.edit);

    this.saveToLocalStorage();
  }

  handleUpdatedTodo(theEdit: IEditTodo) {
    console.log(theEdit);

    this.todos[theEdit.index].task = theEdit.text;

    console.log("Successfully edited task", this.todos[theEdit.index]);

    this.saveToLocalStorage();

    this.edit = { id: 0, task: "", done: false };
  }

  handleDeleteTodo(todo: Todo) {
    this.todos.splice(this.todos.indexOf(todo), 1);

    this.saveToLocalStorage();
  }

  handleMarkAsDone(todo: Todo) {
    todo.done = !todo.done;

    this.saveToLocalStorage();
  }

  handleSortTodosByName(task: Todo) {
    this.todos = this.todos.sort(function (a: Todo, b: Todo) {
      let x = a.task.toLowerCase();
      let y = b.task.toLowerCase();
      if (x < y) {
        return -1;
      }
      if (x > y) {
        return 1;
      }
      return 0;
    });

    this.saveToLocalStorage();
  }

  handleSortTodosByStatus(task: Todo) {
    this.todos = this.todos.sort(function (a: Todo, b: Todo) {
      let x = a.done;
      let y = b.done;
      if (x < y) {
        return -1;
      }
      if (x > y) {
        return 1;
      }
      return 0;
    });

    this.saveToLocalStorage();
  }

  saveToLocalStorage() {
    localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(this.todos));
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/mixins";

.main-container {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .todo-list-container {
    background-color: snow;
    min-height: 73%;
    min-width: 100%;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 15px 20px 15px;
    margin: 15px 0 15px 0;
    box-shadow: 5px 5px 50px rgb(119, 143, 119);
    @include tablet {
      margin: 30px 0 30px 0;
      padding: 0 20px 30px 20px;
    }
    .lines {
      width: 100%;
      height: 7.6px;
      position: relative;
      @include tablet {
        height: 7.2px;
      }
    }
    .lines::after,
    .lines::before {
      content: "";
      position: absolute;
      margin: auto;
      height: 2px;
      background-color: rgb(199, 134, 134);
      width: 44%;
      top: -230%;
      @include tablet {
        width: 45%;
      }
    }
    .lines::after {
      left: 0;
    }
    .lines::before {
      right: 0;
    }
    .diamond {
      height: 12px;
      width: 12px;
      border: 2px solid rgb(180, 167, 93);
      margin: auto;
      transform: rotate(45deg);
      position: relative;
      top: -25px;
      @include tablet {
        height: 14px;
        width: 14px;
      }
    }
    .lines-2 {
      width: 70%;
      height: 7px;
      position: relative;
    }
    .lines-2::after,
    .lines-2::before {
      content: "";
      position: absolute;
      margin: auto;
      height: 2px;
      background-color: rgb(199, 134, 134);
      width: 48%;
      top: -230%;
    }
    .lines-2::after {
      left: 0;
    }
    .lines-2::before {
      right: 0;
    }
    h2 {
      font-size: 2.3em;
      text-decoration: none;
      color: rgb(26, 60, 26);
      @include tablet {
        font-size: 2.5em;
      }
    }
    .nav-container {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      @include tablet {
        gap: 5px;
      }
    }
  }
}
</style>
