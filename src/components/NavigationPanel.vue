<template>
  <div class="nav-panel">
    <a class="nav-panel__branding-wrapper" :href="$route.path === '/' ? '#' : '/'">
      <img src="@/assets/logo.png" alt="header image" class="nav-panel__logo">
      <span class="nav-panel__brand">Vue TODO List</span>
    </a>
    <a class="nav-panel__branding-wrapper" href="https://yode.pro">
      <span class="nav-panel__brand">For Yode.PRO</span>
      <img src="@/assets/yode_logo.svg" alt="yode logo" class="nav-panel__logo">
    </a>
  </div>
</template>

<script>
export default {
  name: "NavigationPanel",
}
</script>

<style scoped lang="scss">
.nav-panel {
  padding: 0 1.3rem;
  height: 60px;
  background: white;
  border-bottom: 2px solid #42b983;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 0 13px -2px darkgrey;
}

.nav-panel__branding-wrapper {
  display: flex;
  align-items: center;
  text-decoration: none;
}

.nav-panel__brand  {
  margin: 0 .7rem;
  font-weight: bolder;
  color: #2c3e50;
}

.nav-panel__logo {
  width: 40px;
}

.nav-panel__link {
  padding: 0 1rem;
  cursor: pointer;
  text-decoration: underline #42b983;
  &:hover {
    color: #42b983;
  }
}
</style>
