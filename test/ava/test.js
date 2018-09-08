import test from 'ava'
import debug from '@watchmen/debug'
// import installer from '../../src'

const dbg = debug(__filename)

test('main', t => {
  dbg('here')
  // eslint-disable-next-line import/no-unassigned-import
  require('../../src')
  t.pass()
})
