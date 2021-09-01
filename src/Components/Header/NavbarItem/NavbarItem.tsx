import { FC } from 'react'
import './NavbarItem.scss'

const NavbarItem: FC<NavbarItemProps> = ({ children, handleClick, spanWidth, isActive, label }) => {
    return (
        <div className="navbar-item">
            <h3 onClick={handleClick} className={ isActive ? 'active-text': ''}>{ children }</h3>
            <span style={{ width: spanWidth}} className={ isActive ? `active-${label}` : `inactive-${label}` }></span>
        </div>
    )
}

export default NavbarItem
