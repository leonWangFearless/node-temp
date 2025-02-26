import type { Option as GetJsonContextOptions } from './types'
import type { App } from 'vue'

export const showImportJsonContextSymbol = Symbol('showImportJsonContextSymbol')

const GetJsonContextPromise = (pathName: any, path: string) => {
  return new Promise((resolve) => {
    $getJson(pathName, path).then((res: any) => {
      resolve({ [pathName]: res })
    })
  })
}

const $getJson = function (pathName: string, path: string) {
  return new Promise((resolve, reject) => {
    fetch(`${path}/${pathName}.json`)
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        resolve(data)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

const initGetJsonContext = async (
  option: GetJsonContextOptions
): Promise<Record<string, any>> => {
  const { path } = option

  const jsonContextModule = import.meta.glob(`${path}/*.json`, {
    eager: true
  })

  const promiseJsonArr = Object.keys(jsonContextModule).map((key: any) => {
    const allPathName = key.replace(path, '').replace('.json', '')

    return GetJsonContextPromise(allPathName, path)
  })

  const finalPromiseArr = promiseJsonArr.filter((item) => item !== null)
  const jsonContext: any = {}
  const res = await Promise.all(finalPromiseArr)

  res.forEach((item) => {
    const key = Object.keys(item)[0]

    jsonContext[key] = item[key]
  })

  return jsonContext
}

export default {
  install: (app: App<Element>, option: GetJsonContextOptions) => {
    initGetJsonContext(option).then((jsonContext) => {
      app.provide(showImportJsonContextSymbol, jsonContext)
    })
  }
}
