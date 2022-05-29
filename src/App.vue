<script setup>
  import { reactive } from 'vue'
  import AddressAutocomplete from './components/AddressAutocomplete.vue'
  const editedItem = reactive({})
  function autoComplete(place) {
    console.log(place)
    editedItem.street = place.street
    editedItem.postcode = place.postcode
    editedItem.city = place.city 
  }
</script>

<template>
  <nav class="navbar bg-secondary">

  </nav>
  <main class="container">
    <br>
    <h1>Vue 3 Address Autocomplete</h1>
    <p>Minimal Vite project with <a href="https://vuejs.org/" target="_blank">Vue3</a>, <a href="https://getbootstrap.com" target="_blank">Bootstrap 5</a> and <a href="https://docs.mapbox.com/api/search/geocoding/" target="_blank">Mapbox Geocoding API</a> integration.</p>
    <p>Type two and more letters in the street field and select an address from the suggestions.</p>
    <form class="row g-3" @submit.prevent>
      <div class="col-md-3 mb-2">
        <label class="form-label" for="street">Street</label>
        <AddressAutocomplete @selectPlace="autoComplete" v-model="editedItem.street"></AddressAutocomplete>
      </div>
      <div class="col-md-2 mb-2">
        <label class="form-label" for="postcode">Postcode</label>
        <input id="postcode" class="form-control" v-model="editedItem.postcode"/>
      </div>
      <div class="col-md-3 mb-2">
        <label class="form-label" for="city">City</label>
        <input id="city" class="form-control" v-model="editedItem.city"/>
      </div>
    </form>
  </main>
  <br>
  <footer class="footer mt-auto py-4 bg-light">
    <div class="container d-flex justify-content-between">
      <span class="text-primary">Vue 3 Address Autocomplete Integration</span>
      <span class="text-primary">&copy; 2022 Samuel Hess</span>
    </div>
  </footer>
</template>

