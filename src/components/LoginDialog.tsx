import React from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import FormHelperText from '@material-ui/core/FormHelperText'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

import { validatePassword } from '../lib/validatePassword'

type LoginDialogState = {
  open: boolean
  password: string
  validationError?: string
}

export default class LoginDialog extends React.Component<{}, LoginDialogState> {
  state: LoginDialogState = {
    open: false,
    password: '',
  }

  handleClickOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  handleLogin = () => {
    sessionStorage.setItem('loggedIn', JSON.stringify(true))
    this.setState({ open: false })
  }

  handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    const password = e.target.value
    const validationError = validatePassword(password)
    this.setState({ password, validationError })
  }

  render() {
    const { password, validationError } = this.state

    if (sessionStorage.getItem('loggedIn')) {
      return null
    }

    return (
      <div>
        <Button variant="outlined" size="small" color="inherit" onClick={this.handleClickOpen}>
          Login
        </Button>
        <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Login</DialogTitle>
          <DialogContent>
            <TextField autoFocus margin="dense" id="login" label="Login" fullWidth />
            <TextField
              value={password}
              autoFocus
              margin="dense"
              id="password"
              label="Password"
              fullWidth
              error={Boolean(validationError)}
              onChange={this.handlePasswordChange}
            />
            {validationError && <FormHelperText error>{validationError}</FormHelperText>}
            <DialogContentText component="div">
              <ul>
                <li>Passwords must include straight of at least three letters, like abc, cde, and so on, up to xyz.</li>
                <li>Passwords may not contain the letters i, O, or l.</li>
                <li>Passwords must contain at least two non-overlapping pairs of letters, like aa, bb, or cc.</li>
                <li>Passwords cannot be longer than 32 characters.</li>
                <li>Passwords can only contain lower case alphabetic characters.</li>
              </ul>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleLogin} color="primary" disabled={password.length === 0}>
              Login
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}
