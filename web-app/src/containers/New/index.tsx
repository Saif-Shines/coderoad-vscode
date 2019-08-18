import * as React from 'react'
import { useQuery } from '@apollo/react-hooks'
import * as T from '../../../../typings/graphql'

import queryTutorials from './queryTutorials'
import { send } from '../../utils/vscode'
import LoadingPage from '../LoadingPage'
import TutorialList from '../../components/TutorialList'

interface Props {
  tutorialList: T.Tutorial[]
  onNew(tutorialId: string): void
}

export const NewPage = (props: Props) => (
  <div>
    <h2>Start a new Project</h2>
    <TutorialList tutorialList={props.tutorialList} onNew={props.onNew} />
  </div>
)

const Loading = () => <LoadingPage text="Loading tutorials" />

const NewPageContainer = () => {
  const { data, loading, error } = useQuery(queryTutorials)
  if (loading) {
    return Loading
  }

  if (error) {
    return (
      <div>
        <h5>{error.message}</h5>
        <p>{JSON.stringify(error, null, 2)}</p>
      </div>
    )
  }

  return (
    <React.Suspense fallback={Loading}>
      <NewPage onNew={() => send('TUTORIAL_START')} tutorialList={data.tutorials} />
    </React.Suspense>
  )
}

export default NewPageContainer
