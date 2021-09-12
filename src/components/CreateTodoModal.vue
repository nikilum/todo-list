<template>
  <NModal :modal-id="modalId">
    <template #header>
      <b>Создание дела</b>
    </template>
    <template>
      <NInput label="Название задачи" placeholder="Введите название" v-model="name"/>
    </template>
    <template #footer>
      <div class="create-todo-modal__footer">
        <button class="button secondary" @click="hide">Отмена</button>
        <button class="button primary" @click="create" :disabled="!name">Создать</button>
      </div>
    </template>
  </NModal>
</template>

<script>
import NModal from "@/components/ui/NModal";
import NInput from "@/components/ui/NInput";

export default {
  name: "CreateTodoModal",
  components: {NInput, NModal},
  data() {
    return {
      modalId: 'create-todo-modal',
      name: ''
    }
  },
  methods: {
    hide() {
      this.$modal(this.modalId, 'hide')
    },
    create() {
      this.$store.commit('addTodo', {
        name: this.name,
        todo_parts: []
      })
      let lastId = this.$store.state.last_id
      this.$router.push(`/todo/${lastId}`)
    }
  }
}
</script>

<style scoped>
.create-todo-modal__footer {
  display: flex;
  justify-content: space-between;
}
</style>
