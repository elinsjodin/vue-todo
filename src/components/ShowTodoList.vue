<template>
  <div :class="mainContainer">
    <div :class="todoListContainer">
      <h2>Todo List</h2>
      <div :class="lines"><div :class="diamond"></div></div>
      <div :class="navContainer">
        <SortTodos
          @sortTodosByName="handleSortTodosByName($event)"
          @sortTodosByStatus="handleSortTodosByStatus($event)"
          @renderCompletedTasks="handleRenderCompletedTasks($event)"
          sortBtnContainer="sort-btn-container"
          sort="sort"
        />
        <CreateTodo
          @createTodo="handleCreateTodo($event)"
          inputGroup="input-group"
          newTodoInput="todo-input"
          label="label"
          addTodoButton="add-todo-btn"
        />
      </div>
      <div :class="listContainer">
        <ShowTodo
          v-for="(t, i) in todos"
          :todo="t"
          :key="i"
          @deleteTodo="handleDeleteTodo($event)"
          @markAsDone="handleMarkAsDone($event)"
          taskTitleDone="task-title-done"
          taskDone="task-done"
          liButtonsContainer="li-btns-container"
          liButtons="li-btns"
          liButtonsDone="li-btns-done"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
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

  todos: Todo[] = [];
  // showAllTodos: boolean = false;
  // showCompletedTodos: boolean = false;
  // showUncompletedTodos: boolean = false;

  // computed() {
  //   return this.todos.filter(({ done }) => done || !done);
  // }

  created() {
    this.todos = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_LIST_KEY) || "[]"
    );
  }

  handleCreateTodo(task: Todo) {
    this.todos.push(task);

    this.saveToLocalStorage();
  }

  handleDeleteTodo(todo: Todo) {
    this.todos.splice(this.todos.indexOf(todo), 1);

    this.saveToLocalStorage();
  }

  handleMarkAsDone(todo: Todo) {
    todo.done = !todo.done;

    this.saveToLocalStorage();
  }

  handleSortTodosByName() {
    this.todos = this.todos.sort(function (a, b) {
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

  handleSortTodosByStatus() {
    this.todos = this.todos.sort(function (a, b) {
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

  handleRenderCompletedTasks() {
    // let completedTasks = [];
    // for (let i = 0; i < this.todos.length; i++) {
    //   let completed = this.todos[i].done;
    //   if (completed === true) {
    //     completedTasks.push(this.todos[i]);
    //     console.log(completedTasks);
    //   }
    // }
    // this.saveToLocalStorage();
    // return completedTasks;
  }

  handleRenderUncompletedTasks() {
    let unCompletedTasks = [];
    for (let i = 0; i < this.todos.length; i++) {
      let unCompleted = this.todos[i].done;
      if (unCompleted === false) {
        unCompletedTasks.push(this.todos[i]);
      }
    }

    this.saveToLocalStorage();
    return unCompletedTasks;
  }

  saveToLocalStorage() {
    localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(this.todos));
  }
}
</script>

<style lang="scss" scoped>
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
    padding: 30px;
    box-shadow: 5px 5px 50px rgb(119, 143, 119);

    .lines {
      width: 100%;
      height: 7px;
      position: relative;
    }

    .lines::after,
    .lines::before {
      content: "";
      position: absolute;
      margin: auto;
      height: 2px;
      background-color: rgb(199, 134, 134);
      width: 45%;
      top: -230%;
    }

    .lines::after {
      left: 0;
    }
    .lines::before {
      right: 0;
    }

    .diamond {
      height: 14px;
      width: 14px;
      border: 2px solid rgb(180, 167, 93);
      margin: auto;
      transform: rotate(45deg);
      position: relative;
      top: -25px;
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
      font-size: 2.5em;
      text-decoration: none;
      color: rgb(26, 60, 26);
    }
    .nav-container {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      gap: 5px;
    }
  }
}
</style>
