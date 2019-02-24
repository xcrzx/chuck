import React from 'react'
import * as R from 'ramda'
import { connect, ResolveThunks } from 'react-redux'
import Button from '@material-ui/core/Button'

import { Joke, StoreState } from '../types'
import { fetchJokes, fetchRandomJokes } from '../store/allJokes'
import { addToFavorites } from '../store/favoriteJokes'

import JokesLayout from './JokesLayout'

type FavoriteJokesConnectProps = {
  favorites: StoreState['favorites']
  jokes: Joke[]
}

type FavoriteJokesDispatchProps = ResolveThunks<typeof mapDispatchToProps>

type FavoriteJokesProps = FavoriteJokesConnectProps & FavoriteJokesDispatchProps

type FavoriteJokesState = {
  error?: Error
  isFetching: boolean
}

class FavoriteJokes extends React.Component<FavoriteJokesProps, FavoriteJokesState> {
  state: FavoriteJokesState = {
    isFetching: false,
  }

  timer: number | undefined

  componentDidMount() {
    this.fetchJokes()
  }

  componentWillUnmount() {
    this.stopTimer()
  }

  fetchJokes = async () => {
    const { favorites } = this.props

    this.setState({ error: undefined })
    try {
      await this.props.fetchJokes(favorites)
    } catch (error) {
      this.setState({ error })
    }
  }

  toggleTimer = () => {
    if (this.timer) {
      this.stopTimer()
    } else {
      this.startTimer()
    }
  }

  startTimer = () => {
    this.setState({ isFetching: true })
    this.timer = setTimeout(this.fetchRandomJokes, 5000)
  }

  stopTimer = () => {
    clearTimeout(this.timer)
    this.timer = undefined
    this.setState({ isFetching: false })
  }

  fetchRandomJokes = async () => {
    const jokes = await this.props.fetchRandomJokes(1)
    this.props.addToFavorites(jokes[0].id)

    if (this.props.favorites.length < 10) {
      this.startTimer()
    } else {
      this.stopTimer()
    }
  }

  render() {
    const { jokes } = this.props
    const { error, isFetching } = this.state

    return (
      <JokesLayout
        error={error}
        title={'Favorite Jokes'}
        jokes={jokes}
        actions={
          <Button onClick={this.toggleTimer} size="small" color="primary">
            {isFetching ? 'Stop fetching' : 'Fetch random jokes'}
          </Button>
        }
      />
    )
  }
}

const mapStateToProps = (state: StoreState) => {
  const favorites = state.favorites
  const jokes = R.props(favorites.map(String), state.jokes).filter(Boolean)
  return {
    favorites,
    jokes,
  }
}

const mapDispatchToProps = { fetchJokes, fetchRandomJokes, addToFavorites }

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FavoriteJokes)
