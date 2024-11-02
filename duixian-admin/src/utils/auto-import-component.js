import { install } from "element-plus"

const components = import.meta.glob('../components/*.vue',{
  eager: true,
  import: 'default',
})

export default {
  install(app){
    Object.entries(components).forEach(item =>{
      const [path,component] = item
      const name = path.replace('../components/','').replace('.vue','')
      app.component(`App${name}`,component)
    })
  }
}
