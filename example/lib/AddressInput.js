import { ref, reactive, openBlock, createElementBlock, Fragment, withDirectives, createElementVNode, isRef, vModelText, unref, renderList, createTextVNode, toDisplayString } from 'vue';

const _hoisted_1 = ["onClick"];
const _hoisted_2 = { class: "text-primary" };
  // mapbox options as per https://docs.mapbox.com/api/search/geocoding/
  
var script = {
  __name: 'AddressInput',
  props: {
    mapboxOptions : Object
  },
  emits: ['addressSelect'],
  setup(__props, { emit }) {

const props = __props;

  const mapboxOptions = {
    api: 'https://api.mapbox.com/geocoding/v5/',
    endpoint: 'mapbox.places',
    access_token: '',
    limit: 5,
    types: 'address',
    proximity: 'ip',
    autocomplete: true,
    fuzzyMatch: true,
    language: 'en'
  };
  const dropdownMenu = ref();
  var searchtext = ref('');
  const suggestions = reactive([]);

  
  
  Object.assign(mapboxOptions, props.mapboxOptions);


  function formatLabel(label, part) {
    let index = label.toLowerCase().indexOf(searchtext.value.toLowerCase());
    if (index >= 0) {
      let text = '';
      switch (part) {
        case 'start':  
          text = label.substring(0,index);
          break
        case 'middle': 
          text = label.substring(index, index + searchtext.value.length);
          break
        case 'end': 
          text = label.substring(index + searchtext.value.length);
          break
      }
      // console.log(`Found ${searchtext.value} in ${label} at pos ${index} and ${part} part is ${text}`);
      return text
    } else if (part === 'start') {
      return label
    } else {
      return ''
    }
  }

  async function searchAddress() {
    if (searchtext.value.length >= 2) {
      suggestions.length = 0;
      Object.assign(suggestions, await geoCode(searchtext.value));
      dropdownMenu.value.classList.add('show');
    } else {
      dropdownMenu.value.classList.remove('show');
    }
  }

  function selectAddress(address) {
    // hide dropdown menu
    dropdownMenu.value.classList.remove('show');
    // update the value of the input field to what was selected
    searchtext.value = address.street;
    // send address to parent component
    emit('addressSelect', address);
  }

  async function geoCode(street) {
    if (street.length >= 2) {
      let searchtext = encodeURIComponent(street);
      let {api, endpoint, ...query} = mapboxOptions;
      let queryString = new URLSearchParams(query).toString();
      let request = new Request(`${api+endpoint}/${searchtext}.json?${queryString}`);
      let response = await fetch(request);
      let data = await response.json();
      if (data.features) {
        let addresses = data.features.map(address => {
          let label = address.place_name;
          let location = label.split(', ')[1];
          return {
            label: label,
            street: label.split(', ')[0],
            postcode: location.slice(0, location.indexOf(' ')),
            city: location.slice(1+location.indexOf(' ')),
            state: address.context.at(-2).text,
            country: address.context.at(-1).text
          }
        });
        return addresses
      } else {
        console.log(data.message);
      }
    }
  }

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock(Fragment, null, [
    withDirectives(createElementVNode("input", {
      type: "text",
      class: "form-control",
      "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => (isRef(searchtext) ? (searchtext).value = $event : searchtext = $event)),
      onInput: searchAddress
    }, null, 544 /* HYDRATE_EVENTS, NEED_PATCH */), [
      [vModelText, unref(searchtext)]
    ]),
    createElementVNode("ul", {
      ref_key: "dropdownMenu",
      ref: dropdownMenu,
      class: "dropdown-menu"
    }, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(suggestions, (suggestion) => {
        return (openBlock(), createElementBlock("li", null, [
          createElementVNode("a", {
            class: "dropdown-item",
            href: "#",
            onClick: $event => (selectAddress(suggestion))
          }, [
            createTextVNode(toDisplayString(formatLabel(suggestion.label,'start')), 1 /* TEXT */),
            createElementVNode("span", _hoisted_2, toDisplayString(formatLabel(suggestion.label,'middle')), 1 /* TEXT */),
            createTextVNode(toDisplayString(formatLabel(suggestion.label, 'end')), 1 /* TEXT */)
          ], 8 /* PROPS */, _hoisted_1)
        ]))
      }), 256 /* UNKEYED_FRAGMENT */))
    ], 512 /* NEED_PATCH */)
  ], 64 /* STABLE_FRAGMENT */))
}
}

};

script.__file = "src/AddressInput.vue";

export { script as default };
