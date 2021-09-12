<template>
  <div class="show-todo-page" v-if="todo">
    <div class="show-todo-page__controls">
      <div class="show-todo-page__controls-header">
        <span class="fs-24">Управление задачей</span>
        <button @click="onGoBackButtonClicked" class="button primary">На главную</button>
      </div>
      <div class="show-todo-page__controls-body">
        <button class="button danger" @click="onDeleteButtonClicked">
          Удалить задачу
        </button>
        <button class="button primary" @click="onSaveButtonClicked" :disabled="!isAnythingUpdated">
          Сохранить изменения
        </button>
        <button class="button secondary" @click="onCancelAllUpdatesButtonClicked" :disabled="!isAnythingUpdated">
          Отменить все изменения
        </button>
        <button class="button secondary" @click="onUndoLastUpdateButtonClicked" :disabled="!isAnythingToUndo">
          Отменить действие
        </button>
        <button class="button secondary" @click="onRedoLastUpdateButtonClicked" :disabled="!isAnythingToRedo">
          Вернуть изменение
        </button>
      </div>
    </div>
    <div class="show-todo-page__header">
      <span class="fs-24 show-todo-page__todo-name">{{ todo.name }}</span>
    </div>
    <div class="show-todo-page__body">
      <TodoPart v-for="(todoPart, index) of todo.todo_parts" :key="index" :part="todoPart" :index="index"
                @finished="onMarkAsFinishedButtonClicked" @name-edited="editName" @deleted="deletePart"
      />
      <button class="button show-todo-page__create-part-btn" @click="onAddTodoPartButtonClicked">
        Добавить ещё одно дело
      </button>
    </div>
    <ConfirmationModal :item-id="todo.id" @confirmed="handleConfirmation" :text="confirmationModalText"/>
    <CreateTodoPartModal @todo-part-created="addTodoPart"/>
  </div>
</template>

<script>
import ConfirmationModal from "@/components/ConfirmationModal";
import TodoPart from "@/components/TodoPart";
import CreateTodoPartModal from "@/components/CreateTodoPartModal";

export default {
  name: "TodoPage",
  metaInfo() {
    return {
      title: `Дело "${this.todo.name}"`
    }
  },
  components: {CreateTodoPartModal, TodoPart, ConfirmationModal},
  mounted() {
    this.cloneTodoFromStore()
  },
  data() {
    return {
      currentTodoId: this.$route.params.id,
      todo: undefined,
      historyToUndo: [],
      historyToRedo: [],

      confirmationModalText: '',
      confirmationModalType: '',
    }
  },
  methods: {
    // Кнопки панели управления задачей

    /* Кнопка сохранения */
    onSaveButtonClicked() {
      this.$store.commit('updateTodo', this.todo)
    },

    /* Кнопка удаления */
    onDeleteButtonClicked() {
      this.confirmationModalType = 'delete'
      this.confirmationModalText = 'Вы уверены что хотите удалить данный список задач?'
      this.$modal('confirmation-modal', 'show')
    },

    deleteTodo(todoId) {
      this.$store.commit('deleteTodo', todoId)
      this.$router.replace('/')
    },

    /* Кнопка отмены всех действий */
    onCancelAllUpdatesButtonClicked() {
      this.confirmationModalType = 'cancelUpdates'
      this.confirmationModalText = 'Вы уверены что хотите отменить все изменения?'
      this.$modal('confirmation-modal', 'show')
    },

    cancelAllUpdates(id) {
      this.historyToRedo = []
      this.historyToUndo = []
      this.cloneTodoFromStore()
    },

    onGoBackButtonClicked() {
      if(!this.isAnythingUpdated) {
        this.goBack()
        return
      }
      this.confirmationModalType = 'goBack'
      this.confirmationModalText = 'Вы уверены что хотите выйти без сохранения изменений?'
      this.$modal('confirmation-modal', 'show')
    },

    goBack() {
      this.$router.push('/')
    },

    // Изменение деталей задачи

    /* Пометка действия как оконченного */
    onMarkAsFinishedButtonClicked(indexOfPart) {
      this.saveTodoSnapshot()
      this.todo.todo_parts[indexOfPart].checked = true
    },

    /* Изменение названия дела */
    editName(editNameData) {
      let index = editNameData['index']
      this.saveTodoSnapshot()
      this.todo.todo_parts[index].name = editNameData['newName']
    },

    /* Удаление дела */
    deletePart(indexOfPart) {
      this.saveTodoSnapshot()
      this.todo.todo_parts.splice(indexOfPart, 1)
    },

    // Доп. функции
    cloneTodoFromStore() {
      let todoToEdit = this.$store.state.todos.find(todo => todo.id === Number(this.currentTodoId))

      if (!todoToEdit) {
        this.$router.replace('/')
        return
      }

      this.todo = this.cloneObject(todoToEdit)
    },

    handleConfirmation(id) {
      switch (this.confirmationModalType) {
        case 'delete':
          this.deleteTodo(id)
          break;
        case 'cancelUpdates':
          this.cancelAllUpdates(id)
          break;
        case 'goBack':
          this.goBack()
          break;
      }
    },

    cloneObject(obj) {
      return JSON.parse(JSON.stringify(obj))
    },

    // Управление историей изменений

    saveTodoSnapshot() {
      let historySnapshot = this.cloneObject(this.todo)
      this.historyToUndo.push(historySnapshot)
      this.historyToRedo = []
    },

    onUndoLastUpdateButtonClicked() {
      let lastIndex = this.historyToUndo.length - 1;
      let snapshot = this.historyToUndo.splice(lastIndex, 1)[0]
      this.historyToRedo.push(this.cloneObject(this.todo))
      this.todo = snapshot
    },

    onRedoLastUpdateButtonClicked() {
      let lastIndex = this.historyToRedo.length - 1;
      let snapshot = this.historyToRedo.splice(lastIndex, 1)[0]
      this.historyToUndo.push(this.cloneObject(this.todo))
      this.todo = snapshot
    },

    onAddTodoPartButtonClicked() {
      this.$modal('create-todo-part-modal', 'show')
    },
    addTodoPart(name) {
      this.saveTodoSnapshot()
      this.todo.todo_parts.push({
        checked: false,
        name
      })
    }
  },
  computed: {
    isAnythingUpdated() {
      return JSON.stringify(this.todo) !== JSON.stringify(this.$store.state.todos.find(todo => todo.id === this.todo.id))
    },
    isAnythingToUndo() {
      return this.historyToUndo.length > 0
    },
    isAnythingToRedo() {
      return this.historyToRedo.length > 0
    }
  }
}
</script>

<style scoped lang="scss">
.show-todo-page__header {
  padding: .5rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 31px;
}

.show-todo-page__controls {
  padding: .5rem 1rem;
}

.show-todo-page__body {
  padding: .5rem 1rem;
}

.fs-24 {
  font-size: 24px;
}

.show-todo-page__controls-header {
  margin-bottom: .8rem;
  display: flex;
  justify-content: space-between;
}

.show-todo-page__controls-body {
  padding: 0.438rem 0;
  display: flex;
  flex-wrap: wrap;
  transition: 0.2s ease-in-out;
  width: 100%;

  & > * {
    margin: .2rem;
    flex: 1 1 auto;
  }
}

.show-todo-page__create-part-btn {
  width: 100%;
  margin-top: .8rem;
}

.show-todo-page__todo-name {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
