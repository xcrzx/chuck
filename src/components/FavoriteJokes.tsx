import React from 'react'
import * as R from 'ramda'
import { connect, ResolveThunks } from 'react-redux'

import { Joke, StoreState } from '../types'
import { fetchJokes } from '../store/allJokes'

import JokesLayout from './JokesLayout'

type FavoriteJokesConnectProps = {
  favorites: StoreState['favorites']
  jokes: Joke[]
}

type FavoriteJokesDispatchProps = ResolveThunks<typeof mapDispatchToProps>

type FavoriteJokesProps = FavoriteJokesConnectProps & FavoriteJokesDispatchProps

type FavoriteJokesState = {
  error?: Error
}

class FavoriteJokes extends React.Component<FavoriteJokesProps, FavoriteJokesState> {
  state: FavoriteJokesState = {}

  componentDidMount() {
    this.fetchJokes()
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

  render() {
    const { jokes } = this.props
    const { error } = this.state

    return <JokesLayout error={error} title={'Favorite Jokes'} jokes={jokes} />
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

const mapDispatchToProps = { fetchJokes }

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FavoriteJokes)
