import fs from 'fs'
import yml from 'js-yaml'
import debug from '@watchmen/debug'
import {getArg} from '@watchmen/helpr/dist/args'
import installer from './installer'

const dbg = debug(__filename)

const ymlFile = getArg('ymlFile', {dflt: 'values.yml'})
try {
  const cfg = yml.safeLoad(fs.readFileSync(ymlFile, 'utf8'))
  installer({cfg})
} catch (error) {
  dbg('caught: error=%o', error)
}
