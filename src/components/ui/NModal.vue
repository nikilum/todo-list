<template>
  <div :id="modalId">
    <transition name="fade">
      <div class="n-modal" v-if="opened">
        <div class="n-modal__wrapper" tabindex="0" @click="hideByBackdrop" ref="backdrop">
          <div class="n-modal__frame">
            <div class="n-modal__header">
              <slot name="header"></slot>
            </div>
            <div class="n-modal__body">
              <slot></slot>
            </div>
            <div class="n-modal__footer">
              <slot name="footer"></slot>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "NModal",

  created() {
    if (!window.nModals) window.nModals = {}
    window.nModals[this.modalId] = this
  },

  data() {
    return {
      opened: false,
    }
  },
  props: {
    closeOnBackdrop: {type: Boolean, default: false},
    modalId: {type: String, required: true}
  },
  methods: {
    show() {
      this.opened = true;
    },
    hideByBackdrop(evt) {
      if (evt.target === this.$refs.backdrop)
        this.hide()
    },
    hide() {
      this.opened = false
      document.querySelector('body').style.overflow = 'auto'
    }
  }
}
</script>

<style scoped>
.n-modal {
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
}

.n-modal__wrapper {
  z-index: 1000;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.n-modal__frame {
  background: #eeeeee;
  min-width: 400px;
  min-height: 100px;
  border-radius: 4px;
}

.n-modal__header {
  padding: 1rem;
  border-bottom: 1px solid #42b983;
}

.n-modal__body {
  padding: 1rem;
}

.n-modal__footer {
  padding: 1rem;
  border-top: 1px solid #42b983;
}

@media (max-width: 400px) {
  .n-modal__frame {
    min-width: 90% !important;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
