// React
import React, { Component } from 'react';

// State managment
import { connect } from 'react-redux';
import { vacations, follows, socketInit } from '../../actions';

// Components
import Navbar from '../navbar';
import Modal from '../modal';

class CardComponent extends Component {

    render() {
        return (
            <div>
                {this.props.isModalOpen && <Modal />}
                <Navbar />
                {this.props.children}
            </div>
        )
    }

    componentDidMount() {
        this.props.vacations();
        this.props.follows();
        this.props.socketInit();
    }
}

const mapStateToProps = (state) => {
    return {
        isModalOpen: state.signals.isModalOpen,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        vacations: () => dispatch(vacations()),
        follows: () => dispatch(follows()),
        socketInit: () => dispatch(socketInit()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardComponent);