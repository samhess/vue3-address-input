<template>
  <input ref="streetRef" id="street" class="form-control" :value="props.modelValue" @input="changeStreet"/>
</template>

<script setup>
  import { onMounted, ref } from 'vue' 
  const provider = 'https://api.mapbox.com/geocoding/v5/mapbox.places'
  const token = 'pk.eyJ1Ijoic2FtaGVzcyIsImEiOiJjbDJhYXFpYTUwM21iM2tzMXo2ejg5YWltIn0.klumhVZ4oeembZPkcgtJ6g'
  const streetRef = ref(null)
  const emit = defineEmits(['selectPlace'])
  const props = defineProps({
    modelValue : String
  })
  let autocomplete = null

  function initAutocomplete() {
    autocomplete = new Autocomplete(streetRef.value, {
      data: [{label: "Sample place", value: 42}],
      maximumItems: 10,
      threshold: 2,
      onSelectItem: processResults
    })
  }

  function processResults({label, value}) {
    let address = {}
    if (label.indexOf(', ')) {
      let addressParts = label.split(', ')
      address.street = addressParts[0]
      let pos = addressParts[1].indexOf(' ')
      address.postcode = addressParts[1].slice(0, pos)
      address.city = addressParts[1].slice(pos+1)
      address.state = value.split('-')[1]
      emit('selectPlace', address)
    } else {
      console.log(`Error: invalid format ${label}`)
    }
  }

  async function changeStreet(event) {
    let street = event.target.value
    if (street.length >= 2) {
      let searchtext = encodeURIComponent(street)
      let query = {
        access_token : token,
        types : 'address',
        proximity : 'ip',
        autocomplete: true,
        fuzzyMatch: true,
        country : 'CH'
      }
      let queryString = new URLSearchParams(query).toString()
      let request = new Request(`${provider}/${searchtext}.json?${queryString}`)
      let response = await fetch(request)
      let data = await response.json()
      let arr = data.features.map(el => ({
          label: el.place_name,
          value: el.context[el.context.length-2].short_code
        }))
      autocomplete.setData(arr)
    }
  }

  // Hooks
  onMounted(initAutocomplete)
</script>

<script>
// Adapted source code from  https://github.com/gch1p/bootstrap-5-autocomplete
import { Dropdown } from 'bootstrap'

const DEFAULTS = {
  threshold: 2,
  maximumItems: 5,
  highlightTyped: true,
  highlightClass: 'text-primary',
  label: 'label',
  value: 'value',
  showValue: false,
  showValueBeforeLabel: false,
};

class Autocomplete {
  constructor(field, options) {
    this.field = field;
    this.options = Object.assign({}, DEFAULTS, options);
    this.dropdown = null;

    field.parentNode.classList.add('dropdown');
    field.setAttribute('data-bs-toggle', 'dropdown');
    field.classList.add('dropdown-toggle');

    const dropdown = ce(`<div class="dropdown-menu"></div>`);
    if (this.options.dropdownClass)
      dropdown.classList.add(this.options.dropdownClass);

    insertAfter(dropdown, field);

    this.dropdown = new Dropdown(field, this.options.dropdownOptions);

    field.addEventListener('click', (e) => {
      if (this.createItems() === 0) {
        e.stopPropagation();
        this.dropdown.hide();
      }
    });

    field.addEventListener('input', () => {
      if (this.options.onInput)
        this.options.onInput(this.field.value);
      this.renderIfNeeded();
    });

    field.addEventListener('keydown', (e) => {
      if (e.keyCode === 27) {
        this.dropdown.hide();
        return;
      }
      if (e.keyCode === 40) {
        this.dropdown._menu.children[0]?.focus();
        return;
      }
    });
  }

  setData(data) {
    this.options.data = data;
    this.renderIfNeeded();
  }

  renderIfNeeded() {
    if (this.createItems() > 0)
      this.dropdown.show();
    else
      this.field.click();
  }

  createItem(lookup, item) {
    let label;
    if (this.options.highlightTyped) {
      const idx = removeDiacritics(item.label)
          .toLowerCase()
          .indexOf(removeDiacritics(lookup).toLowerCase());
      const className = Array.isArray(this.options.highlightClass) ? this.options.highlightClass.join(' ')
        : (typeof this.options.highlightClass == 'string' ? this.options.highlightClass : '');
      label = item.label.substring(0, idx)
        + `<span class="${className}">${item.label.substring(idx, idx + lookup.length)}</span>`
        + item.label.substring(idx + lookup.length, item.label.length);
    } else {
      label = item.label;
    }

    if (this.options.showValue) {
      if (this.options.showValueBeforeLabel) {
        label = `${item.value} ${label}`;
      } else {
        label += ` ${item.value}`;
      }
    }

    return ce(`<button type="button" class="dropdown-item" data-label="${item.label}" data-value="${item.value}">${label}</button>`);
  }

  createItems() {
    const lookup = this.field.value;
    if (lookup.length < this.options.threshold) {
      this.dropdown.hide();
      return 0;
    }

    const items = this.field.nextSibling;
    items.innerHTML = '';

    const keys = Object.keys(this.options.data);

    let count = 0;
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const entry = this.options.data[key];
      const item = {
          label: this.options.label ? entry[this.options.label] : key,
          value: this.options.value ? entry[this.options.value] : entry
      };

      let needle = removeDiacritics(lookup).toLowerCase().split(' ')
      let haystack = removeDiacritics(item.label).toLowerCase()
      let test = 0
      // check if all parts of the search string are present
      for (let i = 0; i < needle.length; i++) {
        if (haystack.indexOf(needle[i]) >= 0) test++
      }
      if (test === needle.length) {
        items.appendChild(this.createItem(lookup, item));
        if (this.options.maximumItems > 0 && ++count >= this.options.maximumItems)
          break;
      }
    }

    this.field.nextSibling.querySelectorAll('.dropdown-item').forEach((item) => {
      item.addEventListener('click', (e) => {
        let dataLabel = e.currentTarget.getAttribute('data-label');
        let dataValue = e.currentTarget.getAttribute('data-value');

        this.field.value = dataLabel;

        if (this.options.onSelectItem) {
          this.options.onSelectItem({
            value: dataValue,
            label: dataLabel
          });
        }

        this.dropdown.hide();
      })
    });

    return items.childNodes.length;
  }
}

/**
 * @param html
 * @returns {Node}
 */
function ce(html) {
  let div = document.createElement('div');
  div.innerHTML = html;
  return div.firstChild;
}

/**
 * @param elem
 * @param refElem
 * @returns {*}
 */
function insertAfter(elem, refElem) {
  return refElem.parentNode.insertBefore(elem, refElem.nextSibling);
}

/**
 * @param {String} str
 * @returns {String}
 */
function removeDiacritics(str) {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}
</script>
