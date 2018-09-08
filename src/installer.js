import debug from '@watchmen/debug'
import {pretty} from '@watchmen/helpr'
// import {exec} from './helper'

const dbg = debug(__filename)

export default function({cfg}) {
  dbg('begin: cfg=\n%s', pretty(cfg))
  dbg('end')
}
