import vue from 'rollup-plugin-vue'

export default {
  input: 'src/AddressInput.vue',
  output: {
    format: 'esm',
    file: 'dist/AddressInput.js',
  },
  plugins: [
    vue()
  ],
  external: ['vue'] 
}
