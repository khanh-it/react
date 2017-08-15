import PropTypes from 'prop-types';

/**
 * 
 * @component
 * @param {object} props 
 * @returns 
 */
export default function Link({
    // Events
    onClick,
    // Attrs
    active, children
}) {
    let text = active
        ? children
        : <a href="#" onClick={e => { e.preventDefault(); onClick(); }}>{children}</a>
    ;
    return <span> {text} </span>;
}

Link.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.node,
  onClick: PropTypes.func
}