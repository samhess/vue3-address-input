# Vue 3 Component for Address Completion

This is a [Vue 3 Component](/src/components) for address autocompletion. It integrates with 
[Mapbox Geocoding API](https://docs.mapbox.com/api/search/geocoding/) and [Bootstrap 5](https://getbootstrap.com) and.

A current build (normally in /dist) can be found in the directory /docs so it can be served on GitHub Pages .

## Usage 
```html
<AddressInput @address="doSomething" v-model="street"></AddressInput>
```
v-model contains the current value of the field (what was typed or selected).
Additionally with the *@address* custom event, an object containing postcode, city and state can be reveived. 

## Demo
[Demo](https://samhess.github.io/vue3-bs5-autocomplete/index.html) is hosted on GitHub Pages ([docs](/docs) directory)

## Recommended IDE Setup
- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

### Run the project
- `npm i`
- `npm run dev` or `npm run build`
