import * as React from 'react'
import * as T from 'typings'
import * as TT from 'typings/tutorial'
import { Form, Select } from '@alifd/next'
import useFetch from '../../services/hooks/useFetch'
import TutorialOverview from '../../components/TutorialOverview'

const FormItem = Form.Item
const Option = Select.Option

const styles = {
  page: {},
  header: {
    padding: '1rem',
  },
}

interface ContainerProps {
  send(action: T.Action): void
  context: T.MachineContext
}

interface TutorialsData {
  tutorials: TT.Tutorial[]
}

interface GitHubFetchProps {
  url: string
  send: any
}

const GitHubFetch = (props: GitHubFetchProps) => {
  const { data, error, loading } = useFetch<TT.Tutorial>(props.url)
  if (loading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>{JSON.stringify(error)}</div>
  }
  if (!data) {
    return <div>No data returned</div>
  }
  const onNext = () => {
    console.log('called tutorial start')
    props.send({
      type: 'TUTORIAL_START',
      payload: {
        tutorial: data,
      },
    })
  }
  return <TutorialOverview onNext={onNext} tutorial={data} />
}

const tutorials = [
  {
    id: '1',
    title: 'Basic Node & Express',
    configUrl: 'https://raw.githubusercontent.com/coderoad/fcc-basic-node-and-express/master/coderoad-config.json',
  },
  {
    id: '2',
    title: 'Learn NPM',
    configUrl: 'https://raw.githubusercontent.com/coderoad/fcc-learn-npm/master/coderoad-config.json',
  },
]

interface Props {
  send: any
  context: any
}

const SelectTutorialPage = (props: Props) => {
  const [url, setUrl] = React.useState<string | null>(null)
  const handleUrlChange = (value: string) => {
    setUrl(value)
  }
  return (
    <div css={styles.page}>
      <div css={styles.header}>
        <Form style={{ maxWidth: '500px' }}>
          <FormItem label="Select Tutorial:">
            <Select onChange={handleUrlChange} style={{ width: '100%' }}>
              {tutorials.map((tutorial) => (
                <Option key={tutorial.id} value={tutorial.configUrl}>
                  {tutorial.title}
                </Option>
              ))}
            </Select>
          </FormItem>
        </Form>
      </div>
      {url && <GitHubFetch url={url} send={props.send} />}
    </div>
  )
}

export default SelectTutorialPage
