import Vue from 'vue'
import VueRouter from 'vue-router'
import AppLayout from "@/components/AppLayout"
import TodoListPage from "@/views/TodoListPage";
import ShowTodoPage from "@/views/ShowTodoPage";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: AppLayout,
    children: [
      {
        path: '/',
        name: 'Vue TODO List',
        component: TodoListPage
      },
      {
        path: '/todo/:id',
        component: ShowTodoPage
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
