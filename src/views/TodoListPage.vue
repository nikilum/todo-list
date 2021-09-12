<template>
  <div class="todo-list">
    <div class="todo-list__header">
      <span class="todo-list__header-text">{{ headerText }}</span>
      <button class="button primary" @click="onCreateTodoClicked">Создать новое дело</button>
    </div>
    <div class="todo-list__body">
      <div v-for="todo of todos" :key="todo.id">
        <TodoListItem :todo="todo" @delete-button-clicked="onDeleteTodoClicked"/>
      </div>
    </div>
    <CreateTodoModal/>
    <ConfirmationModal :item-id="todoToDeleteId" @confirmed="deleteTodo" text="Вы уверены что хотите удалить данный список задач?"/>
  </div>
</template>

<script>
import CreateTodoModal from "@/components/CreateTodoModal";
import TodoListItem from "@/components/TodoListItem";
import ConfirmationModal from "@/components/ConfirmationModal";
export default {
  name: "TodoListPage",
  metaInfo: {
    title: 'Список дел'
  },
  components: {ConfirmationModal, TodoListItem, CreateTodoModal},
  data() {
    return {
      clicked: false,
      todoToDeleteId: undefined
    }
  },
  methods: {
    onCreateTodoClicked() {
      this.$modal('create-todo-modal', 'show')
    },
    onDeleteTodoClicked(id) {
      this.todoToDeleteId = id
      this.$modal('confirmation-modal', 'show')
    },
    deleteTodo(todoId) {
      this.$store.commit('deleteTodo', todoId)
    }
  },
  computed: {
    todos() {
      return this.$store.state.todos
    },
    headerText() {
      return this.todos.length > 0 ? 'Список дел' : 'Давайте создадим ваше первое дело!'
    }
  }
}
</script>

<style scoped lang="scss">
.todo-list__header {
  padding: .5rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.todo-list__body {
  padding: .5rem 1rem;
}

.todo-list__header-text {
  font-size: 24px;
}
</style>
