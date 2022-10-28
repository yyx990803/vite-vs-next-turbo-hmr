import { watch } from 'node:fs'

watch('app/page.js', (e, filename) => {
  console.log(Date.now(), filename)
})

watch('app/comp0.js', (e, filename) => {
  console.log(Date.now(), filename)
})
