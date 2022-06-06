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
          <AddressInput @addressSelect="getAddress" :mapboxOptions="mapboxOptions"></AddressInput>
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
        <div class="col-md-2 mb-2">
          <label class="form-label" for="state">Country</label>
          <input class="form-control" v-model="editedItem.country"/>
        </div>
      </div>
    </form>
  </main>
  <br>
  <footer class="footer mt-auto py-4 bg-light">
    <div class="container d-flex justify-content-between">
      <span class="text-primary">Vue Address Autocomplete Component</span>
      <span class="text-primary">&copy; 2022 Samuel Hess</span>
    </div>
  </footer>
</template>

<script setup>
  import { reactive } from 'vue'
  // import AddressInput from './components/AddressInput.vue'
  import AddressInput from '../lib/AddressInput.js'
  const editedItem = reactive({})
  // mapbox options as per https://docs.mapbox.com/api/search/geocoding
  const mapboxOptions = {
    access_token : 'pk.eyJ1Ijoic2FtaGVzcyIsImEiOiJjbDJhYXFpYTUwM21iM2tzMXo2ejg5YWltIn0.klumhVZ4oeembZPkcgtJ6g',
    limit : 10,
    language: 'de'
  }
  function getAddress(address) {
    Object.assign(editedItem,address)
  }
</script>