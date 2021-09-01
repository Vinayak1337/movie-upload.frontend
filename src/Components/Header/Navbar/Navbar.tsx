import { FC, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, RouteComponentProps, withRouter } from 'react-router-dom'
import { Dispatch } from 'redux'
import { setLocation } from '../../../Redux/NavLocation/Actions'
import NavbarItem from '../NavbarItem/NavbarItem'
import './Navbar.scss'

const Navbar: FC<NavbarProps & RouteComponentProps> = ({ navLocation, setLocation, history }) => {
    useEffect(() => {
        const path = history.location.pathname.slice(1);
        if (path) setLocation(null) 
    }, [history.location.pathname, setLocation]);

    const LinkStyle = { color: 'transparent', margin: '0px', padding: '0px'}

    return (
        <div className="main-navbar">
            <div className="navbar-items">
                <Link to="/"  style={LinkStyle}>
                <NavbarItem isActive={ navLocation === 'upload_movies'} handleClick={() => setLocation('upload_movies')} spanWidth="130px" label="upload">Upload Movie</NavbarItem>
                </Link>
                <Link to="/" style={LinkStyle}>
                <NavbarItem isActive={ navLocation === 'view_movies'} handleClick={() => setLocation('view_movies')} spanWidth="115px" label="view">View Movies</NavbarItem>
                </Link>
            </div>
        </div>
    )
}

const mapStateToProps = (state: RootState) => ({
    navLocation: state.locationReducer.navLocation
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    setLocation: (location: NavLocation) => dispatch(setLocation(location))
}) 

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar))
