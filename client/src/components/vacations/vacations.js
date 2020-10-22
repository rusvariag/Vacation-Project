// React
import React from 'react';

// Styles
import './vacations.css';

// State managment
import { connect } from 'react-redux';
import { SUCCESS } from '../../actions/types';

// Components
import { Row, Col, Parallax, ProgressBar } from 'react-materialize';
import Card from '../card';

const Vacations = ({ data, vacationsStatus }) => {
    return (
        <div>
            <Parallax className="hide-on-med-and-down" image={<img alt="" src="https://www.familyvacationcritic.com/uploads/sites/19/2018/09/best-ideas-1280x640.jpg" />} />
            <Row className="container section">
                {vacationsStatus === SUCCESS ?
                    data.map(vacation => {
                        return (
                            <Col l={4} m={6} s={12} key={vacation.id}>
                                <Card vacation={vacation}></Card>
                            </Col>
                        )
                    })
                    :
                    <ProgressBar className="orange" />
                }
            </Row>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        vacationsStatus: state.signals.vacationsStatus,
        data: state.data.vacations,
    }
}

export default connect(mapStateToProps, null)(Vacations);