<template>
  <div>
    <label class="n-input__label">
      <small class="n-input__label-text"><b>{{ label }}</b></small>
      <input :placeholder="placeholder" class="form-control" @input="$emit('input', $event.target.value)">
    </label>
  </div>
</template>

<script>
export default {
  name: "NInput",
  props: ['placeholder', 'label']
}
</script>

<style scoped lang="scss">
.n-input__input {
  border: 1px solid lightgray;
  outline: none;
  padding: .4rem .8rem;
  border-radius: 4px;
  transition: border-color .2s;

  &:focus {
    border: 1px solid #42b983;
  }
}

.n-input__label {
  display: flex;
  flex-direction: column;
}

.n-input__label-text {
  margin-bottom: .2rem;
}
</style>
