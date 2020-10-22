// React
import React from 'react';

// Styles
import './modal.css';

// State managment
import { connect } from 'react-redux';
import { vacationCreate, vacationUpdate, onChangeInsertHandler, onModalHandler, onClearInputsHandler } from '../../actions';
import { ACTION_INSERT, ACTION_UPDATE } from '../../actions/types'

// Materialize CSS Components
import { Button, Modal, TextInput, DatePicker } from 'react-materialize';

const ModalComponent = (props) => {
    const { destination, from_date, to_date, price, description, picture } = props.fields;
    const { validation, onChangeInner, actionStatus, isModalOpen, onSubmit, onModalHandler, onClearInputsHandler } = props;
    const valid = Object.values(validation).reduce((acc, v) => acc && v);
    const header = actionStatus === ACTION_INSERT ? 'Create new vacation' : 'Update vacation'
    return (
        <Modal
            open={isModalOpen}
            actions={[
                <Button className="teal darken-3" disabled={!valid} modal="confirm" node="button" onClick={(e) => onSubmit(e, actionStatus, isModalOpen)}>Submit</Button>,
                <Button className="deep-orange darken-2" modal="close" node="button">Cancel</Button>
            ]}
            header={header}
            trigger={false}
            options={{
                endingTop: '10%',
                inDuration: 250,
                onCloseEnd: () => {
                    if (isModalOpen) {
                        onModalHandler();
                        onClearInputsHandler();
                    }
                },
                onCloseStart: null,
                onOpenEnd: null,
                onOpenStart: null,
                opacity: 0.5,
                outDuration: 250,
                preventScrolling: false,
                startingTop: '4%'
            }}
        >
            <div className="container">
                <form className="" onSubmit={valid ? (e) => onSubmit(e, actionStatus, isModalOpen) : () => { }} autoComplete="off">
                    <TextInput
                        id="TextInput-Modal-1"
                        inputClassName={validation.destination ? '' : 'invalid'}
                        error="Descrition can't be longer that 100 characters"
                        label="Destination"
                        name="destination"
                        value={destination}
                        onChange={onChangeInner}
                    />
                    <DatePicker
                        id="TextInput-Modal-2"
                        inputClassName={validation.from_date ? '' : 'invalid'}
                        error=""
                        label="From"
                        options={{
                            format: 'yyyy-mm-dd',
                            defaultDate: from_date,
                            setDefaultDate: true,
                            autoClose: false,
                        }}
                        onChange={(e) => onChangeInner({ target: { name: 'from_date', value: e } })}
                    />
                    <DatePicker
                        id="TextInput-Modal-3"
                        inputClassName={validation.to_date ? '' : 'invalid'}
                        error=""
                        label="To"
                        options={{ format: 'yyyy-mm-dd', defaultDate: to_date, setDefaultDate: true, autoClose: true }}
                        onChange={(e) => onChangeInner({ target: { name: 'to_date', value: e } })}
                    />
                    <TextInput
                        id="TextInput-Modal-4"
                        inputClassName={validation.price ? '' : 'invalid'}
                        error="Price must be a number"
                        label="Price"
                        name="price"
                        value={price}
                        onChange={onChangeInner}
                    />
                    <TextInput
                        id="TextInput-Modal-5"
                        inputClassName={validation.description ? '' : 'invalid'}
                        error="Price must be a number"
                        label="Description"
                        name="description"
                        value={description}
                        onChange={onChangeInner} />
                    <TextInput
                        id="TextInput-Modal-6"
                        inputClassName={validation.picture ? '' : 'invalid'}
                        error="Picture url can't be longer that 2083 characters"
                        label="Picture"
                        name="picture"
                        value={picture}
                        onChange={onChangeInner}
                    />
                </form>
            </div>
        </Modal>
    );

};

const mapStateToProps = (state) => {
    return {
        fields: state.input.fields,
        isModalOpen: state.signals.isModalOpen,
        actionStatus: state.signals.actionStatus,
        validation: state.signals.validVacationInput
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onChangeInner: ({ target: { value, name } }) => dispatch(onChangeInsertHandler(name, value)),
        onModalHandler: () => dispatch(onModalHandler()),
        onClearInputsHandler: () => dispatch(onClearInputsHandler()),
        onSubmit: (e, status, open) => {
            e.preventDefault();
            if (status === ACTION_INSERT) {
                dispatch(vacationCreate());
            }
            if (status === ACTION_UPDATE) {
                dispatch(vacationUpdate());
            }
            if (open) {
                dispatch(onModalHandler());
                dispatch(onClearInputsHandler());
            }
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalComponent);