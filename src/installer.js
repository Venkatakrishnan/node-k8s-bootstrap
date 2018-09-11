import debug from '@watchmen/debug'
import {pretty} from '@watchmen/helpr'
import applySpecs from './apply-specs'
import applyCharts from './apply-charts'
import {exec} from './helper'

const dbg = debug(__filename)

export default function({config, dryRun}) {
  dbg('begin: dry-run=%o, config=\n%s', dryRun, pretty(config))

  for (const namespace of config.namespaces) {
    dbg('namespace=%o', namespace.name)

    try {
      exec(`kubectl create namespace ${namespace.name}`)
    } catch (error) {
      if (error.message.includes('AlreadyExists')) {
        dbg('namespace=%o already exists, continuing...', namespace.name)
      } else {
        throw error
      }
    }

    const {specs, charts, name} = namespace
    specs && applySpecs({namespace: name, specs, dryRun})
    charts && applyCharts({namespace: name, charts, dryRun})
  }
  dbg('end')
}
