import React from 'react';

import { Cards, Chart, CountryPicker } from './components';
import styles from './App.module.css';
import { fetchData } from './api';
import coronaImg from './images/image.png';
import ReactGA from 'react-ga';

class App extends React.Component {
    state = {
        data: {},
        country: '',
    }
    initializeReactGA = () => {
        // ReactGA.initialize('UA-162979718-1');
        // ReactGA.pageview('/');
    }
    async componentDidMount() {
        const fetchedData = await fetchData();
        this.setState({ data: fetchedData });
    }
    handleCountryChange = async (country) => {
        const fetchedData = await fetchData(country);
        console.log(fetchedData);
        this.setState({ data: fetchedData, country: country });
    }
    render() {
        ReactGA.initialize('UA-162979718-1');
        ReactGA.pageview('/');
        const { data, country } = this.state;
        return (
            <div className={styles.container}>
                <img className={styles.image} src={coronaImg} alt="COVID-19" />
                <Cards data={data} />
                <CountryPicker handleCountryChange={this.handleCountryChange} />
                <Chart data={data} country={country} />
                <div class={styles.footer}>
                <span>
                    Created By  <a href="https://dsouzastan30.gitlab.io/stanleyportfolio/"> Stanley Dsouza</a>
                </span>
            </div>
            </div >
        );
    }
}

export default App;