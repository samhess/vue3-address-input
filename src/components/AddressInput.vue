<template>
  <input type="text" class="form-control" :value="props.modelValue" @input="searchAddress"/>
    <ul ref="dropdownMenu" class="dropdown-menu">
      <li v-for="suggestion in suggestions">
        <a class="dropdown-item" href="#" @click="selectAddress(suggestion)">
          {{formatLabel(suggestion.label,'start')}}<span class="text-primary">{{formatLabel(suggestion.label,'middle')}}</span>{{formatLabel(suggestion.label, 'end')}}
        </a> 
      </li>
    </ul>
</template>

<script setup>
  import { reactive, ref } from 'vue' 
  // mapbox options as per https://docs.mapbox.com/api/search/geocoding/
  const mapboxOptions = {
    api: 'https://api.mapbox.com/geocoding/v5/',
    endpoint: 'mapbox.places',
    access_token: 'pk.eyJ1Ijoic2FtaGVzcyIsImEiOiJjbDJhYXFpYTUwM21iM2tzMXo2ejg5YWltIn0.klumhVZ4oeembZPkcgtJ6g',
    limit: 5,
    types: 'address',
    proximity: 'ip',
    autocomplete: true,
    fuzzyMatch: true,
    language: 'en'
  }
  const dropdownMenu = ref()
  const suggestions = reactive([])

  const emit = defineEmits(['addressSelect','update:modelValue'])
  const props = defineProps({
    modelValue : String,
    mapboxOptions : Object
  })
  Object.assign(mapboxOptions, props.mapboxOptions)


  function formatLabel(label, part) {
    console.log(label)
    let index = label.toLowerCase().indexOf(props.modelValue.toLowerCase())
    if (index >= 0) {
      let text = ''
      switch (part) {
        case 'start':  
          text = label.substring(0,index)
          break
        case 'middle': 
          text = label.substring(index, index + props.modelValue.length)
          break
        case 'end': 
          text = label.substring(index + props.modelValue.length)
          break
      }
      // console.log(`Found ${props.modelValue} in ${label} at pos ${index} and ${part} part is ${text}`);
      return text
    } else if (part === 'start') {
      return label
    } else {
      return ''
    }
  }

  async function searchAddress(event) {
    let search = event.target.value
    // update the value of the input field to what was typed
    emit('update:modelValue', search)
    if (search.length >= 2) {
      suggestions.length = 0
      Object.assign(suggestions, await geoCode(search))
      dropdownMenu.value.classList.add('show')
    } else {
      dropdownMenu.value.classList.remove('show')
    }
  }

  function selectAddress(address) {
    // hide dropdown menu
    dropdownMenu.value.classList.remove('show')
    // update the value of the input field to what was selected
    emit('update:modelValue', address.street)
    // send address to parent component
    emit('addressSelect', address)
  }

  async function geoCode(street) {
    if (street.length >= 2) {
      let searchtext = encodeURIComponent(street)
      let {api, endpoint, ...query} = mapboxOptions
      let queryString = new URLSearchParams(query).toString()
      let request = new Request(`${api+endpoint}/${searchtext}.json?${queryString}`)
      let response = await fetch(request)
      let data = await response.json()
      if (data.features) {
        let addresses = data.features.map(address => {
          let label = address.place_name
          let location = label.split(', ')[1]
          return {
            label: label,
            street: label.split(', ')[0],
            postcode: location.slice(0, location.indexOf(' ')),
            city: location.slice(1+location.indexOf(' ')),
            state: address.context.at(-2).text,
            country: address.context.at(-1).text
          }
        })
        console.log(addresses)
        return addresses
      } else {
        console.log(data.message)
      }
    }
  }
</script>
