import fs from 'fs'
import yml from 'js-yaml'
import debug from '@watchmen/debug'
import {getArg} from '@watchmen/helpr/dist/args'
import installer from './installer'

const dbg = debug(__filename)

const ymlFile = getArg('ymlFile', {dflt: 'values.yml'})
const dryRun = getArg('dryRun')

try {
  const config = yml.safeLoad(fs.readFileSync(ymlFile, 'utf8'))
  installer({config, dryRun})
} catch (error) {
  dbg('caught: error=%o', error)
}
