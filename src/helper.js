import child from 'child_process'
import debug from '@watchmen/debug'
import {pretty} from '@watchmen/helpr'
import {getArg, getRequiredArg} from '@watchmen/helpr/dist/args'
import constants from './constants'

const dbg = debug(__filename)

const cloneRoot = `${constants.workRoot}/clone`

export function exec(cmd) {
  dbg('cmd=[%o]', cmd)
  const out = child.execSync(cmd)
  process.stdout.write(out)
  const lines = out.toString().split('\n')
  dbg('result=\n%s', pretty(lines))
  return lines
}

export function clone({repo}) {
  exec(`rm -rf ${cloneRoot}`)
  exec(`git clone ${repo} ${cloneRoot}`)
  return cloneRoot
}

export function apply({dryRun, namespace, specs}) {
  exec(
    `kubectl apply \
      ${dryRun ? '--dry-run' : ''} \
      --namespace ${namespace} \
      -f ${specs}`
  )
}

// pass:
//
// {
//   flag: 'flag-1',
//   args: [
//     'val-1',
//     'val-2',
//     'val-3'
//   ]
// }
//
// return:
//
// '--flag-1 val-1 --flag-1 val-2 --flag-1 val-3'
//
export function getArgs({flag, args}) {
  const _args = args || []
  return _args.map(arg => `--${flag} ${arg}`).join(' ')
}

// pass:
//
// {
//   flag: 'flag-1',
//   args: [
//     {
//       key: 'key-1',
//       value: 'val-1'
//     },
//     {
//       key: 'key-2',
//       value: 'val-2'
//     },
//     {
//       key: 'key-3'
//     }
//   ]
// }
//
// return:
//
// '--flag-1 key-1=val-1 --flag-1 key-2=val-2 --flag-1 key-3=true'
//
export function getKeyValueArgs({flag, args}) {
  return getArgs({
    flag,
    args:
      args &&
      args.map(arg => {
        const {key, value, env} = arg
        let _value
        if (env) {
          _value = value ? getArg(env, {dflt: value}) : getRequiredArg(env)
        } else {
          _value = value || 'true'
        }
        return `${key}=${_value}`
      })
  })
}
