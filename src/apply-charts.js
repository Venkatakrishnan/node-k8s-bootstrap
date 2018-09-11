import debug from '@watchmen/debug'
import constants from './constants'
import {exec, clone, apply, getArgs, getKeyValueArgs} from './helper'

const dbg = debug(__filename)

const chartsRoot = `${constants.workRoot}/charts`
const specs = `${constants.workRoot}/specs.yml`

export default function({namespace, charts, dryRun}) {
  dbg('args=%o', arguments)

  exec('helm init --client-only')
  exec('helm repo update')

  for (const chart of charts) {
    const {name, version, values, release} = chart
    exec(
      `helm fetch \
        --untar \
        --untardir ${chartsRoot} \
        ${version ? `--version '${version}'` : ''} \
        ${name}`
    )

    const terseChart = name.split('/').pop()
    const chartRoot = `${chartsRoot}/${terseChart}`

    const valueFiles = []
    const {repo, file, useDefaults, setArgs} = values

    if (useDefaults) {
      // helm conventions use yaml extension
      valueFiles.push(`${chartRoot}/${'values.yaml'}`)
    }

    if (repo) {
      // i typically use yml extension (should switch or allow either?)
      const cloneRoot = clone({repo})
      valueFiles.push(`${cloneRoot}/${file || 'values.yml'}`)
    }

    exec(
      `helm template \
        ${getArgs({flag: 'values', args: valueFiles})} \
        --name ${release || namespace} \
        --namespace ${namespace} \
        ${getKeyValueArgs({flag: 'set', args: setArgs})} \
        ${chartRoot} \
        > ${specs}`
    )

    apply({dryRun, namespace, specs})
  }
}
