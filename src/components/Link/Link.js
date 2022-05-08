/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import PropTypes from 'prop-types'
import history from 'history.js'

const isLeftClickEvent = event => event.button === 0

const isModifiedEvent = event =>
  !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey)

const handleClick = (props, event) => {
  if (props.onClick) {
    props.onClick(event)
  }

  if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
    return
  }

  if (event.defaultPrevented === true) {
    return
  }

  event.preventDefault()
  history.push(props.to)
}

const Link = props => {
  const { to, children, ...attrs } = props

  return (
    <a href={to} {...attrs} onClick={e => handleClick(props, e)}>
      {children}
    </a>
  )
}

Link.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
}

Link.defaultProps = {
  onClick: null,
}

export default Link
