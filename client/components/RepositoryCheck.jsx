import React, { Component, PropTypes } from 'react'
import { Alert, Panel, Well } from 'react-bootstrap'

import Toggle from './Toggle.jsx'

const INFO_TEXT = {
  approval: <p>The approval feature (<a href='https://zappr.readthedocs.org/en/latest/setup/#approvals'>docs</a>) blocks a pull request (if you
               enabled <a href='https://github.com/blog/2051-protected-branches-and-required-status-checks'>protected branches</a>)
               until it has the required amount of approvals.
            </p>,
  autobranch: <p>When enabling automatic branch creation (<a href='https://zappr.readthedocs.org/en/latest/setup/#autobranch'>docs</a>), ZAPPR will automatically
                 create a branch in your repository for every opened issue.
              </p>,
  commitmessage: <p>The commit message feature (<a href='https://zappr.readthedocs.org/en/latest/setup/#commitmessages'>docs</a>) will check that commit messages
                    in a pull request match at least one of some patterns you provide.
                 </p>
}

export default class RepositoryCheck extends Component {
  static propTypes = {
    check: PropTypes.object.isRequired,
    onToggle: PropTypes.func.isRequired
  };

  static defaultProps = {
    check: {}
  };

  render() {
    const style = {
      marginLeft: 15
    }
    const {check, onToggle} = this.props
    const header = (
      <div>
        <Toggle checked={check.isEnabled} isUpdating={check.isUpdating} onToggle={onToggle}/>
        <b style={style}>{check.name}</b> is {check.isEnabled ? 'enabled' : 'disabled'}
      </div>
    )
    return (
      <Panel header={header}>
        {check.error ? <Alert bsStyle='danger'>Error: {check.error.message}</Alert> : null}
        {INFO_TEXT[check.type]}
      </Panel>
    )
  }
}
