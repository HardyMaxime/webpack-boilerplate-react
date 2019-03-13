import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'

const Button = props => {
    return (
        <button className="btn" onClick={ () => props.emitEvent('Changé !') } data-test="buttonComponent">
            { props.text }
        </button>
    )
}

Button.propTypes = {
    text: PropTypes.string,
    emitEvent: PropTypes.func
}

export default Button
