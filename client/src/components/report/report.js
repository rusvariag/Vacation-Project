// React
import React from 'react';

// Styles
import './report.css';

// Highcharts
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

// State managment
import { connect } from 'react-redux';

const ReportComponent = (props) => {
    // HighchartsConfig
    const options = {
        chart: {
            type: 'column'
        },
        legend: {
            enabled: false
        },
        title: {
            text: 'NUMBER OF FOLLOWERS PER DESTINATION'
        },
        xAxis: {
            title: {
                text: 'Followed destination'
            },
            categories: props.data.map(item => item.destination),
        },
        yAxis: {
            title: {
                text: 'Number of followers'
            },
            allowDecimals: false
        },
        series: [
            {
                name: 'Followers',
                data: props.data.map(item => item.count),
            }
        ]
    };

    return (
        <div>
            <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        data: state.data.follows,
    }
}

export default connect(mapStateToProps, null)(ReportComponent);