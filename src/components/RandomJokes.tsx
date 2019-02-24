import React from 'react'
import * as R from 'ramda'
import { connect, ResolveThunks } from 'react-redux'
import Button from '@material-ui/core/Button'

import { replaceRandomJokes } from '../store/randomJokes'
import { fetchRandomJokes } from '../store/allJokes'
import { Joke, StoreState } from '../types'

import JokesLayout from './JokesLayout'

type RandomJokesConnectProps = {
  jokes: Joke[]
}

type RandomJokesDispatchProps = ResolveThunks<typeof mapDispatchToProps>

type RandomJokesProps = RandomJokesDispatchProps & RandomJokesConnectProps

type RandomJokesState = {
  isLoading: boolean
  error?: Error
}

class RandomJokes extends React.Component<RandomJokesProps, RandomJokesState> {
  state: RandomJokesState = {
    isLoading: true,
  }

  componentDidMount() {
    this.fetchJokes()
  }

  fetchJokes = async () => {
    this.setState({ isLoading: true, error: undefined })
    try {
      const jokes = await this.props.fetchRandomJokes()
      this.props.replaceRandomJokes(jokes.map(joke => joke.id))
    } catch (error) {
      this.setState({ error })
    } finally {
      this.setState({ isLoading: false })
    }
  }

  render() {
    const { jokes } = this.props
    const { error, isLoading } = this.state

    return (
      <JokesLayout
        error={error}
        title={'Random Jokes'}
        jokes={jokes}
        actions={
          <Button disabled={isLoading} onClick={this.fetchJokes} size="small" color="primary">
            Fetch random jokes
          </Button>
        }
      />
    )
  }
}

const mapStateToProps = (state: StoreState) => {
  const jokes = R.props(state.random.map(String), state.jokes)
  return {
    jokes,
  }
}

const mapDispatchToProps = { fetchRandomJokes, replaceRandomJokes }

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RandomJokes)
