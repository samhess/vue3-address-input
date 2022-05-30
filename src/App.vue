<script setup>
  import { reactive } from 'vue'
  import AddressInput from './components/AddressInput.vue'
  const editedItem = reactive({})
  function autoComplete(place) {
    editedItem.postcode = place.postcode
    editedItem.city = place.city 
    editedItem.state = place.state 
  }
</script>

<template>
  <nav class="navbar bg-secondary">
  </nav>
  <main class="container">
    <br>
    <h1>Address Autocomplete</h1>
    <p>Minimal Vite project with <a href="https://vuejs.org/" target="_blank">Vue3</a>, <a href="https://getbootstrap.com" target="_blank">Bootstrap 5</a> and <a href="https://docs.mapbox.com/api/search/geocoding/" target="_blank">Mapbox Geocoding API</a> integration.</p>
    <p>Type two and more letters in the street field and select an address from the suggestions.</p>
    <form @submit.prevent>
      <div class="row g-3">
        <div class="col-md-3 mb-2">
          <label class="form-label" for="street">Street</label>
          <AddressInput @address="autoComplete" v-model="editedItem.street"></AddressInput>
        </div>
      </div>
      <div class="row g-3">
        <div class="col-md-2 mb-2">
          <label class="form-label" for="postcode">Postcode</label>
          <input class="form-control" v-model="editedItem.postcode"/>
        </div>
        <div class="col-md-3 mb-2">
          <label class="form-label" for="city">City</label>
          <input class="form-control" v-model="editedItem.city"/>
        </div>
        <div class="col-md-2 mb-2">
          <label class="form-label" for="state">State</label>
          <input class="form-control" v-model="editedItem.state"/>
        </div>
      </div>
    </form>
  </main>
  <br>
  <footer class="footer mt-auto py-4 bg-light">
    <div class="container d-flex justify-content-between">
      <span class="text-primary">Vue 3 Address Autocomplete Component</span>
      <span class="text-primary">&copy; 2022 Samuel Hess</span>
    </div>
  </footer>
</template>

