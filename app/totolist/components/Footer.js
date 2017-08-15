import PropTypes from 'prop-types';
import Link from './Link.js';

/**
 * 
 * @component
 * @param {object} props 
 * @returns 
 */
export default function Footer({
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

Footer.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.node,
  onClick: PropTypes.func
}