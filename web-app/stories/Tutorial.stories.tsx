import { action } from '@storybook/addon-actions'
import { withKnobs } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import React from 'react'
import * as T from '../../typings'
import * as TT from '../../typings/tutorial'
import Tutorial from '../src/containers/Tutorial'
import SideBarDecorator from './utils/SideBarDecorator'

type ModifiedLevel = TT.Level & {
  status: T.ProgressStatus
  index: number
  steps: Array<TT.Step & { status: T.ProgressStatus }>
}

const context: Partial<T.MachineContext> = {
  env: { machineId: '', sessionId: '', token: '' },
  error: null,
  position: { levelId: '1', stepId: '1.1' },
  progress: { levels: {}, steps: {}, complete: false },
  processes: [],
  testStatus: null,
  tutorial: {
    id: '',
    version: '0.1.0',
    config: {
      appVersions: { vscode: '0.1.0' },
      testRunner: {
        command: '',
        args: { tap: '' },
      },
      repo: {
        branch: '',
        uri: '',
      },
    },
    summary: {
      title: 'Example Title',
      description: 'An example description',
    },
    levels: [
      {
        id: '1',
        title: 'A Title',
        summary: 'A summary of the level',
        content: 'Should support markdown test\n ```js\nvar a = 1\n```\nwhew it works!',
        setup: null,
        status: 'ACTIVE' as 'ACTIVE',
        steps: [
          {
            id: '1.1',
            content: 'Should support markdown test\n ```shell\nnpn install some-packagen```\nwhew it works!',
            setup: {
              commits: ['abcdefg'],
            },
            solution: {
              commits: ['hijklmn'],
            },
            status: 'COMPLETE',
          },
          {
            id: '1.2',
            content: 'Should support markdown test\n ```js\nvar a = 1\n```\nwhew it works!',
            setup: {
              commits: ['abcdefg'],
            },
            solution: {
              commits: ['hijklmn'],
            },
            status: 'ACTIVE',
          },
          {
            id: '1.3',
            content: 'Should support markdown test\n ```js\nvar a = 1\n```\nwhew it works!',
            setup: {
              commits: ['abcdefg'],
            },
            solution: {
              commits: ['hijklmn'],
            },
            status: 'INCOMPLETE',
          },
        ],
      },
    ],
  },
}

storiesOf('Tutorial', module)
  .addDecorator(SideBarDecorator)
  .addDecorator(withKnobs)
  .add('Example', () => <Tutorial context={context} send={action('send')} />)
