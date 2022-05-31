<template>
  <input type="text" class="form-control" :value="props.modelValue" @input="searchAddress"/>
    <ul ref="dropdownMenu" class="dropdown-menu">
      <li v-for="suggestion in suggestions">
        <a class="dropdown-item" href="#" @click="selectAddress(suggestion)" :value="suggestion.value">
          {{formatLabel(suggestion.label,'start')}}<span class="text-primary">{{formatLabel(suggestion.label,'middle')}}</span>{{formatLabel(suggestion.label, 'end')}}
        </a> 
      </li>
    </ul>
</template>

<script setup>
  import { reactive, ref } from 'vue' 
  const provider = 'https://api.mapbox.com/geocoding/v5/mapbox.places'
  const token = 'pk.eyJ1Ijoic2FtaGVzcyIsImEiOiJjbDJhYXFpYTUwM21iM2tzMXo2ejg5YWltIn0.klumhVZ4oeembZPkcgtJ6g'
  const dropdownMenu = ref()
  const suggestions = reactive([])

  const emit = defineEmits(['address','update:modelValue'])
  const props = defineProps({modelValue : String})

  function formatLabel(label, part) {
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

  function selectAddress(suggestion) {
    dropdownMenu.value.classList.remove('show')
    let {label, value} = suggestion
    let address = {}
    if (label.indexOf(', ')) {
      let addressParts = label.split(', ')
      address.street = addressParts[0]
      let pos = addressParts[1].indexOf(' ')
      address.postcode = addressParts[1].slice(0, pos)
      address.city = addressParts[1].slice(pos+1)
      address.state = value.split('-')[1]
      // update the value of the input field to what was selected
      emit('update:modelValue', address.street)
      // send address to parent component
      emit('address', address)
    } else {
      console.log(`Error: invalid format ${label}`)
    }
  }

  async function geoCode(street) {
    if (street.length >= 2) {
      let searchtext = encodeURIComponent(street)
      let query = {
        access_token : token,
        limit : 10,
        types : 'address',
        proximity : 'ip',
        autocomplete: true,
        fuzzyMatch: true,
        // country : 'CH',

      }
      let queryString = new URLSearchParams(query).toString()
      let request = new Request(`${provider}/${searchtext}.json?${queryString}`)
      let response = await fetch(request)
      let data = await response.json()
      let addresses = data.features.map(el => ({
          label: el.place_name,
          value: el.context[el.context.length-2].short_code
        }))
      return addresses
    }
  }
</script>
