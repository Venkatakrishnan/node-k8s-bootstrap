import child from 'child_process'
import debug from '@watchmen/debug'
import {pretty} from '@watchmen/helpr'

const dbg = debug(__filename)

export function exec(cmd) {
  const out = child.execSync(cmd)
  process.stdout.write(out)
  const lines = out.toString().split('\n')
  dbg('cmd=[%o], result=\n%s', cmd, pretty(lines))
  return lines
}
