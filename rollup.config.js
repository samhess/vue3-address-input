import vue from 'rollup-plugin-vue'
// import peerDepsExternal from 'rollup-plugin-peer-deps-external'

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
