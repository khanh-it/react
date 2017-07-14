import PropTypes from 'prop-types';

/**
 * 
 * @component
 * @param {object} props 
 * @returns 
 */
export default function Todo({ 
    // Events
    onClick, 
    // Data
    done, text
}) {
    return (
        <li onClick={onClick} style={{textDecoration: done ? 'line-through' : 'none'}}>{text}</li>
    );
}

Todo.propTypes = {
    onClick: PropTypes.func,
    done: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
}