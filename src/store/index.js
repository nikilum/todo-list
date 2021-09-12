import Vue from 'vue'
import Vuex from 'vuex'
import VueMeta from 'vue-meta'

Vue.use(Vuex)
Vue.use(VueMeta, {
    refreshOnceOnNavigation: true
})

export default new Vuex.Store({
    state: {
        last_id: 2,
        todos: []
    },
    mutations: {
        addTodo(state, createdTodo) {
            state.last_id = state.last_id + 1
            createdTodo['id'] = state.last_id
            state.todos.push(createdTodo)
        },
        updateTodo(state, updatedTodo) {
            let todoIndex = state.todos.findIndex(todo => todo.id === updatedTodo.id)
            Vue.set(state.todos, todoIndex, updatedTodo)
        },
        deleteTodo(state, idToDelete) {
            state.todos = state.todos.filter(todo => todo.id !== idToDelete)
        },
        setTodoListLastId(state, lastId) {
            state.last_id = Number(lastId)
        },
        setTodoList(state, todoList) {
            state.todos = todoList
        }
    }
})
