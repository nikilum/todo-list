<template>
  <div class="todo-list-item">
    <div class="todo-list-item__header">
      <b class="ellipsis">{{ todo.name }}</b>
      <button class="todo-list-item__header-delete-button" @click="deleteTodoClicked">✖</button>
    </div>
    <div class="todo-list-item__body">
      <b class="todo-list-item__body-header">Задачи:</b>
      <div>
        <div v-for="todoPart of todo.todo_parts.slice(0, 2)" class="ellipsis">
          <b>- </b>
          <span :class="{'strikethrough': todoPart.checked}">{{ todoPart.name }}</span>
        </div>
      </div>
      <b v-if="todo.todo_parts.length > 2">...</b>
    </div>
    <div class="todo-list-item__footer">
      <button class="button primary" @click="openTodoButtonClicked">Открыть</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "TodoListItem",
  props: ['todo'],
  methods: {
    deleteTodoClicked() {
      this.$emit('delete-button-clicked', this.todo.id)
    },
    openTodoButtonClicked() {
      this.$router.push(`/todo/${this.todo.id}`)
    }
  }
}
</script>

<style scoped>
.todo-list-item {
  border: 1px solid lightgray;
  border-radius: 4px;
  margin-bottom: .4rem;
}

.todo-list-item__header {
  padding: .6rem .7rem;
  border-bottom: 1px solid #42b983;
  display: flex;
  justify-content: space-between;
}

.todo-list-item__footer {
  padding: .6rem .7rem;
  border-top: 1px solid #42b983;
  display: flex;
  justify-content: flex-end;
}

.todo-list-item__body {
  padding: .6rem .7rem;
  display: flex;
  flex-direction: column;
}

.todo-list-item__header-delete-button {
  border: none;
  cursor: pointer;
  color: red;
  background: none;
  border-radius: 4px;
}

.todo-list-item__body-header {
  margin-bottom: .3rem;
}

.ellipsis {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.strikethrough {
  text-decoration: line-through;
}
</style>
