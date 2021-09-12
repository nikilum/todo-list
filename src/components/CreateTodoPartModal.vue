<template>
  <NModal modal-id="create-todo-part-modal">
    <template #header>
      Создание нового дела
    </template>
    <template>
      <NInput label="Введите название дела" placeholder="Название" v-model="name"/>
    </template>
    <template #footer>
      <div class="create-todo-part-modal__footer">
        <button class="button secondary" @click="hide">Отмена</button>
        <button class="button primary" @click="create">Создать</button>
      </div>
    </template>
  </NModal>
</template>

<script>
import NModal from "@/components/ui/NModal";
import NInput from "@/components/ui/NInput";
export default {
  name: "CreateTodoPartModal",
  components: {NInput, NModal},
  data() {
    return {
      name: ''
    }
  },
  methods: {
    hide() {
      this.$modal('create-todo-part-modal', 'hide')
    },
    create() {
      this.$emit('todo-part-created', this.name)
      this.hide()
    }
  }
}
</script>

<style scoped>
.create-todo-part-modal__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
