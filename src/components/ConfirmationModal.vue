<template>
  <NModal modal-id="confirmation-modal">
    <template #header>
      <b>Подтверждение</b>
    </template>
    <template>
      {{ text }}
    </template>
    <template #footer>
      <div class="delete-todo-modal__footer">
        <button class="button secondary" @click="hide">Отмена</button>
        <button class="button primary" @click="confirm">Подтвердить</button>
      </div>
    </template>
  </NModal>
</template>

<script>
import NModal from "@/components/ui/NModal";

export default {
  name: "ConfirmationModal",
  components: {NModal},
  props: ['itemId', 'text'],
  methods: {
    hide() {
      this.$modal('confirmation-modal', 'hide')
    },
    confirm() {
      this.$emit('confirmed', this.itemId)
      this.hide()
    }
  }
}
</script>

<style scoped>
.delete-todo-modal__footer {
  display: flex;
  justify-content: space-between;
}
</style>
