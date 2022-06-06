# Vue 3 Component for Address Completion

This is a [Vue 3 Component](/src/components) for address autocompletion. It integrates with 
[Mapbox Geocoding API](https://docs.mapbox.com/api/search/geocoding/) and [Bootstrap 5](https://getbootstrap.com).

A current build (normally in /dist) can be found in the directory /docs so it can be served on GitHub Pages .

## Usage 
```html
<template>
  <AddressInput @addressSelect="getAddress" :mapboxOptions="mapboxOptions"></AddressInput>
</template>

<script setup>
  import { reactive } from 'vue'
  import AddressInput from './components/AddressInput.vue'
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

| Property                   | Type   | Description                        | Required | Default |
| :------:                   | :---:  | :---------:                        | :------: | :-----: |
| mapboxOptions              | Object | Mapbox options as indicated below  | Yes      | []      |
| mapboxOptions.access_token | String | Mapbox access token                | Yes      | null    |
| mapboxOptions.limit        | String | Limit of suggestions               | No       | 10      |
| mapboxOptions.proximity    | String |                                    | No       |'ip'     |
| mapboxOptions.autocomplete | Boolean|                                    | No       | true    |
| mapboxOptions.fuzzyMatch   | Boolean|                                    | No       | true    |
| mapboxOptions.country      | String |                                    | No       | null    |
| mapboxOptions.language     | String |                                    | No       | 'en'    |

Please refer to [Mapbox Geocoding API documentation](https://docs.mapbox.com/api/search/geocoding) for further information

## Events

| Event | Description |
| :---: | :---------: |
| **@addressSelect** | Triggered when user selects address. Returns object with selected address containing street, postcode, city state and country |

## Recommended IDE Setup
- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

### Run the project
- `npm i`
- `npm run dev` or `npm run build`
