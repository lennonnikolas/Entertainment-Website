import React, { Component } from 'react'
import SeriesList from '../../components/SeriesList';
import Loader from '../../components/Loader'
import Intro from '../../components/Intro';

class Series extends Component {
    state = {
        series: [],
        seriesName: '',
        isFetching: false
    }

    handleSeriesInput = (e) => {
        const series = e.target.value;
        this.setState({seriesName: series, isFetching: true})
        fetch(`http://api.tvmaze.com/search/shows?q=${series}`)
        .then(response => response.json())
        .then(json => this.setState({series: json, isFetching: false}))
    }

    render() {
        const { series, seriesName, isFetching } = this.state;
        console.log(series);
        return (
            <div>
                <Intro message="Here you can find all of your most loved series"/>
                <div>
                    Search: <input type="text" value={seriesName} onChange={this.handleSeriesInput} />
                </div>
                {
                    !isFetching && series.length === 0 && seriesName.trim() === ''
                    &&
                    <p>Please enter a series name</p>
                }
                {
                    !isFetching && series.length === 0 && seriesName.trim() !== ''
                    &&
                    <p>No results found for that series Name</p>
                }
                {
                    !isFetching && <SeriesList list={series} />
                }
                {
                    isFetching && <Loader />
                }
            </div>
        )
    }
}

export default Series;