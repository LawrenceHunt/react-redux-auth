import React, {Component} from 'react'
import {connect} from 'react-redux'

class CommentList extends Component {
  renderComments() {
    return this.props.comments.reverse().map(c => {
      return (
        <li key={c}>
          {c}
        </li>
      )
    })
  }

  render() {
    return (
      <div>
        <h4>Comment List</h4>
        <ul>
          {this.renderComments()}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => ({comments: state.comments})
export default connect(mapStateToProps)(CommentList)
