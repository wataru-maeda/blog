import { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { actions as searchActions } from "../modules/search.module"

class Connector extends Component {
  render() {
    const { state, actions, children } = this.props

    return children({ state, actions })
  }
}

const mapStateToProps = state => ({ state })
const mapDispatchToProps = dispatch => {
  const actionList = [
    { label: "search", value: searchActions },
    // add more actions here
  ]

  return {
    actions: actionList.reduce(
      (prev, cur) => ({
        ...prev,
        [cur.label]: bindActionCreators(cur.value, dispatch),
      }),
      {}
    ),
  }
}

Connector.propTypes = {
  state: PropTypes.any.isRequired,
  actions: PropTypes.any.isRequired,
  children: PropTypes.any.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Connector)
