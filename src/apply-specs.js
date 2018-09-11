import assert from 'assert'
import debug from '@watchmen/debug'
import {clone, apply} from './helper'

const dbg = debug(__filename)

export default function({namespace, specs, dryRun}) {
  dbg('args=%j', arguments)

  for (const spec of specs) {
    const {repo, files} = spec
    let fileRoot = ''

    if (repo) {
      const cloneRoot = clone({repo})
      fileRoot = `${cloneRoot}/`
    }

    assert(files && files.length)
    for (const file of files) {
      apply({dryRun, namespace, specs: `${fileRoot}${file}`})
    }
  }
}
