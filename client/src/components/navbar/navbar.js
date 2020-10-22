// React
import React from 'react';
import history from '../../services/history';

// Styles
import './navbar.css';

// State managment
import { connect } from 'react-redux';
import { onModalHandler, onActionHandler, onPageLocationChange, authSignOut } from '../../actions';
import { ACTION_INSERT } from '../../actions/types';

// Materialize CSS Components
import { Navbar, NavItem, Icon } from 'react-materialize';

const NavbarComponent = ({ user: { first_name, last_name, isAdmin }, logout, onClickHandler, onPageLocationChange, location }) => {
    return (
        <Navbar
            alignLinks="right"
            brand={<span><span className="hide-on-med-and-down" >Welcome :</span> {first_name} {last_name}</span>}
            centerChildren
            className="blue-grey darken-3"
            id="mobile-nav"
            menuIcon={<Icon>menu</Icon>}
            fixed
            options={{
                preventScrolling: false
            }}
        >
            {!!isAdmin && location === '/vacations' && <NavItem onClick={() => onPageLocationChange('/reports')}>Report</NavItem>}
            {!!isAdmin && location === '/vacations' && <NavItem onClick={() => onClickHandler(ACTION_INSERT)}>Create Vacation</NavItem>}
            {!!isAdmin && location === '/reports' && <NavItem onClick={() => onPageLocationChange('/vacations')}>Vacations</NavItem>}
            <NavItem href="" onClick={logout}>Logout</NavItem>
        </Navbar>
    );
};

const mapStateToProps = (state) => {
    return {
        location: state.signals.location,
        user: state.auth.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onClickHandler: (action) => {
            dispatch(onModalHandler());
            dispatch(onActionHandler(action));
        },
        onPageLocationChange: (path) => {
            dispatch(onPageLocationChange(path));
            history.push(path);
        },
        logout: () => dispatch(authSignOut()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavbarComponent);