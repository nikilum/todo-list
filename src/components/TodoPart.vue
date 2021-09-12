<template>
  <div class="todo-part">
    <div class="todo-part__name-wrapper">
      <span class="todo-part__name" :class="{'todo-part__name_striked': part.checked}" v-if="!editable">
        {{ part.name }}
      </span>
      <textarea v-model="newName" class="form-control todo-part__name-editor" v-else/>
    </div>
    <div class="todo-part__controls" v-if="!editable">
      <button class="button primary" @click="finishClicked" v-if="!part.checked">Завершить</button>
      <button class="button secondary" @click="editClicked" v-if="!part.checked">Изменить</button>
      <button class="button danger" @click="deleteClicked">Удалить</button>
    </div>
    <div class="todo-part__controls" v-else>
      <button class="button secondary" @click="cancelEditing">Отменить</button>
      <button class="button primary" @click="nameEdited">Сохранить</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "TodoPart",
  props: ['part', 'index'],
  data() {
    return {
      editable: false,
      newName: '',
    }
  },
  methods: {
    finishClicked() {
      this.$emit('finished', this.index)
    },
    editClicked() {
      this.newName = this.part.name
      this.editable = true
    },
    deleteClicked() {
      this.$emit('deleted', this.index)
    },

    nameEdited() {
      this.$emit('name-edited', {index: this.index, newName: this.newName})
      this.editable = false
    },
    cancelEditing() {
      this.editable = false
      this.newName = this.part.name
    }
  }
}
</script>

<style scoped>
.todo-part {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid lightgray;
  border-left: 1px solid lightgray;
  border-right: 1px solid lightgray;
  padding: 1rem;
}

.todo-part:first-of-type {
  border-top: 1px solid lightgray;
}

.todo-part__controls {
  margin-top: .4rem;
  display: flex;
  justify-content: flex-end;
  width: 100%;
  border-top: 1px solid lightgray;
}

.todo-part__controls > button {
  margin-left: .4rem;
  margin-top: 1rem;
}

.todo-part__name_striked {
  text-decoration: line-through;
}

.todo-part__name-wrapper {
  width: 100%;
}

.todo-part__name {
  word-wrap: break-word;
}

.todo-part__name-editor {
  width: 100%;
  box-sizing: border-box;
  height: 100px;
}
</style>
