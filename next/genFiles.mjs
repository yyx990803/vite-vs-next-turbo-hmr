import fs from 'node:fs'

let imports = ``
let renderCode = ``

for (let i = 0; i < 1000; i++) {
  imports += `import { Comp${i} } from './comp${i}.jsx'\n`
  renderCode += `<Comp${i}/>\n`
  fs.writeFileSync(
    `app/comp${i}.jsx`,
    `export function Comp${i}() {
    return <div>hello ${i}</div>
  }`
  )
}

const code = `
 ${imports}
export default function Page() {
  return <div>
   ${renderCode}
  </div>
}
`

fs.writeFileSync('app/page.js', code)
