<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home | </router-link>
      <router-link v-if="isAuthorized" to="/create">Create post | </router-link>
      <a v-if="isAuthorized" @click="logout">Logged in as {{username}} (click to log out)</a>
      <router-link v-else to="/login">Log in</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
import router from './router';
import { authHelper } from './utils/authHelper';

export default {
  data () {
    return {
      isAuthorized: sessionStorage.getItem(authHelper.tokenStorageKey)?.length > 0,
      username: sessionStorage.getItem(authHelper.usernameStorageKey)
    }
  },
  methods: {
    logout() {
      sessionStorage.removeItem(authHelper.usernameStorageKey);
      sessionStorage.removeItem(authHelper.tokenStorageKey);
      router.push({ name: "home" });
      window.location.reload();
    }
  }
}
</script>


<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  text-align: center;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.card {
  margin-left: 2%;
  margin-right: 2%;
}

.btn-del {
  border: 2px solid #e74b1b; 
  color: #e74b1b;
}

.btn-del:hover {
  background-color: #e74b1b;
  color: white;
}

</style>
