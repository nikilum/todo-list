<template>
  <div>
    <NavigationPanel/>
    <div class="layout__main">
      <router-view/>
    </div>
  </div>
</template>

<script>
import NavigationPanel from "@/components/NavigationPanel";

export default {
  name: "AppLayout",
  components: {NavigationPanel},
  created() {
    let todoList = window.localStorage.getItem('todoList')
    let todoListLastId = window.localStorage.getItem('todoListLastId')

    if(todoList && todoListLastId) {
      this.$store.commit('setTodoList', JSON.parse(todoList))
      this.$store.commit('setTodoListLastId', todoListLastId)
    }

    console.log(JSON.parse(todoList), todoListLastId)

    window.onbeforeunload = () => {
      window.localStorage.setItem('todoList', JSON.stringify(this.$store.state.todos))
      window.localStorage.setItem('todoListLastId', this.$store.state.last_id)
    }
  }
}
</script>

<style scoped>
.layout__main {
  width: 50%;
  height: 100%;
  margin: 2rem auto 0;
}

@media (max-width: 800px) {
  .layout__main {
    width: 95% !important;
  }
}
</style>
