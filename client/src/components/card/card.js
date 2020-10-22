// React
import React from 'react';

// Styles
import './card.css';

// State managment
import { connect } from 'react-redux';
import { followCreate, followDelete, vacationDelete, onModalHandler, onActionHandler, onUpdateFillHandler } from '../../actions';
import { ACTION_UPDATE } from '../../actions/types';

// Materialize CSS Components
import { Card, Icon, CardTitle, Collection, CollectionItem } from 'react-materialize';

const CardComponent = (props) => {
    const { id, destination, description, price, from_date, to_date, picture, follow } = props.vacation;
    const { vacation, user, followDelete, followCreate, vacationDelete, onClickHandler } = props;
    const followStyle = follow ? 'pink' : 'grey darken-4 pulse';
    return (
        <Card
            className="large hoverable"
            closeIcon={<Icon>close</Icon>}
            header={<CardTitle image={picture} reveal />}
            reveal={<p>{description}</p>}
            revealIcon={<Icon>more_vert</Icon>}
            actions={user.isAdmin ?
                [
                    <button key="1" onClick={() => onClickHandler(ACTION_UPDATE, vacation)} className="btn-floating light-blue darken-3">
                        <i className="material-icons">edit</i>
                    </button>,
                    <button key="2" onClick={() => vacationDelete(id)} className="btn-floating red">
                        <i className="material-icons">delete</i>
                    </button>
                ]
                :
                [
                    <button key="23" onClick={follow ? () => followDelete(id) : () => followCreate(id)} className={'btn-floating ' + followStyle}>
                        <i className="material-icons">favorite</i>
                    </button>
                ]
            }
            title={destination}
        >
            <p>{Intl.DateTimeFormat('de-DE').format(from_date)} - {Intl.DateTimeFormat('de-DE').format(to_date)}</p>
            <br />
            <Collection >
                <CollectionItem className="blue-grey darken-4 yellow-text text-lighten-5 center-align"><span>price&#32;:&#32;</span>&#32;$&#32;{price}</CollectionItem>
            </Collection>
        </Card>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        followCreate: (id) => dispatch(followCreate(id)),
        followDelete: (id) => dispatch(followDelete(id)),
        vacationDelete: (id) => dispatch(vacationDelete(id)),
        onClickHandler: (action, data) => {
            dispatch(onModalHandler());
            dispatch(onActionHandler(action));
            dispatch(onUpdateFillHandler(data));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardComponent);