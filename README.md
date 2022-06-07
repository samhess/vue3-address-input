# Vue Component for Address Completion

This is a Vue 3 Single File Components (SFC) for address autocompletion. It integrates with 
[Mapbox Geocoding API](https://docs.mapbox.com/api/search/geocoding/) and [Bootstrap 5](https://getbootstrap.com).

A current build of the component can be found in the *dist* directory.

A current build of the example app can be found in the *docs* directory so it can be served on GitHub Pages.

## Installation
```bash
npm install @samhess/vue-address-input
```

## Usage 
```html
<template>
  <AddressInput @addressSelect="getAddress" :mapboxOptions="mapboxOptions"></AddressInput>
</template>

<script setup>
  import { reactive } from 'vue'
  // import AddressInput from './components/AddressInput.vue'
  // import AddressInput from './components/AddressInput.js'
  import AddressInput from '@samhess/vue-address-input'
  const editedItem = reactive({})
  // mapbox options as per https://docs.mapbox.com/api/search/geocoding
  const mapboxOptions = {
    access_token : 'YOUR_TOKEN',
    limit : 10,
    language: 'de'
  }
  function getAddress(address) {
    Object.assign(editedItem,address)
  }
</script>
```

## Demo
[Demo](https://samhess.github.io/vue3-address-input/index.html) is hosted on GitHub Pages ([docs](/docs) directory)

## Properties

| Property      | Subproperty   | Type    | Description                        | Required | Default |
| :------:      | :-------:     | :---:   | :---------:                        | :------: | :-----: |
| mapboxOptions |               | Object  | Mapbox options as indicated below  | Yes      |         |
|               | .access_token | String  | Mapbox access token                | Yes      | ''      |
|               | .limit        | String  | Limit of suggestions               | No       | 10      |
|               | .proximity    | String  | Search near                        | No       |'ip'     |
|               | .autocomplete | Boolean | Autocomplete search input          | No       | true    |
|               | .fuzzyMatch   | Boolean | Not only exact match               | No       | true    |
|               | .country      | String  | Limit to certain countries         | No       | ''   |
|               | .language     | String  | Language for search and results    | No       | 'en'    |

Please refer to [Mapbox Geocoding API documentation](https://docs.mapbox.com/api/search/geocoding) for further information

## Events

| Event | Description |
| :---: | :---------: |
| **@addressSelect** | Triggered when user selects address. Returns object with selected address containing street, postcode, city state and country |