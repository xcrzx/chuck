import React from 'react'
import { WithStyles, withStyles, Theme } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'

import { getRandomJokes } from '../api'
import { Joke } from '../types'

const styles = (theme: Theme) => ({
  root: {
    width: '100%',
    maxWidth: 640,
  },
  padding: {
    padding: theme.spacing.unit,
  },
})

type RandomJokesProps = WithStyles<typeof styles>
type RandomJokesState = {
  isLoading: boolean
  jokes: Joke[]
  error?: Error
}

class RandomJokes extends React.Component<RandomJokesProps, RandomJokesState> {
  state: RandomJokesState = {
    isLoading: true,
    jokes: [],
  }

  componentDidMount() {
    this.fetchJokes()
  }

  fetchJokes = async () => {
    this.setState({ isLoading: true, error: undefined })
    try {
      const response = await getRandomJokes()
      this.setState({ jokes: response.data.value })
    } catch (error) {
      this.setState({ error, jokes: [] })
    } finally {
      this.setState({ isLoading: false })
    }
  }

  render() {
    const { classes } = this.props
    const { jokes, error, isLoading } = this.state

    return (
      <Paper className={classes.root}>
        {error ? (
          <div className={classes.padding}>
            <Typography variant="body1">{error.message}</Typography>
          </div>
        ) : (
          <List>
            {jokes.map(joke => (
              <ListItem alignItems="flex-start" key={joke.id}>
                <ListItemText primary={`Joke #${joke.id}`} secondary={<Typography>{joke.joke}</Typography>} />
              </ListItem>
            ))}
          </List>
        )}
        <Divider />
        <div className={classes.padding}>
          <Button disabled={isLoading} onClick={this.fetchJokes} size="small" color="primary">
            Fetch random jokes
          </Button>
        </div>
      </Paper>
    )
  }
}

export default withStyles(styles)(RandomJokes)
