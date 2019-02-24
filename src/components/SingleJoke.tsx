import React from 'react'
import { connect } from 'react-redux'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton'
import StarIcon from '@material-ui/icons/Star'
import Typography from '@material-ui/core/Typography'

import { Joke, StoreState } from '../types'
import { addToFavorites, removeFromFavorites } from '../store/favoriteJokes'

type SingleJokeSelfProps = {
  joke: Joke
}

type SingleJokeConnectProps = {
  isFavorite: boolean
}

type SingleJokeDispatchProps = {
  addToFavorites: (id: number) => void
  removeFromFavorites: (id: number) => void
}

type SingleJokeProps = SingleJokeSelfProps & SingleJokeConnectProps & SingleJokeDispatchProps

class SingleJoke extends React.Component<SingleJokeProps> {
  toggleFavorite = () => {
    if (this.props.isFavorite) {
      this.props.removeFromFavorites(this.props.joke.id)
    } else {
      this.props.addToFavorites(this.props.joke.id)
    }
  }

  render() {
    const { isFavorite, joke } = this.props

    return (
      <ListItem>
        <ListItemText primary={`Joke #${joke.id}`} secondary={<Typography>{joke.joke}</Typography>} />
        <ListItemSecondaryAction>
          <IconButton aria-label="Favorite" onClick={this.toggleFavorite}>
            <StarIcon color={isFavorite ? 'secondary' : 'action'} />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    )
  }
}

const mapStateToProps = (state: StoreState, props: SingleJokeSelfProps) => ({
  isFavorite: state.favorites.includes(props.joke.id),
})

const mapDispatchToProps = { addToFavorites, removeFromFavorites }

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SingleJoke)
