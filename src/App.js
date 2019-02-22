import React, { Component } from 'react';
import SearchBar from './Components/SearchBar.js';
import BarChart from './Components/BarChart.js';
//import Example from './Components/Example.js'



class App extends Component {

  constructor() {
    super();
    this.state = {
      data: [
        {
          sentiment: 'Positive',
          value: 0
        },
        {
          sentiment: 'Neutral',
          value: 0
        },
        {
          sentiment: 'Negative',
          value: 0
        }],
      isLoading: false,
      status: ''

    }
  }






  fetchData(query) {

    this.setState({ isLoading: true, status: 'analyzing...' })



    fetch('https://4l5m7snv0h.execute-api.us-east-1.amazonaws.com/dev/search/', {
      method: 'post',
      body: JSON.stringify({ 'query': query }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
    }).then(res => res.json())
      .then((result) => {

        this.setState({ isLoading: false, status: '' });

        this.setState({
          data: [
            {
              sentiment: 'Positive',
              value: result['positive']
            },
            {
              sentiment: 'Neutral',
              value: result['neutral']
            },
            {
              sentiment: 'Negative',
              value: result['negative']
            }]
        })
      },
        (error) => {
          console.log(error);
          this.setState({
            isLoading: false,
            status: '',
            data: [
              {
                sentiment: 'Positive',
                value: 0
              },
              {
                sentiment: 'Neutral',
                value: 0
              },
              {
                sentiment: 'Negative',
                value: 0
              }]
          });
        });

  }






  render() {

    const styles = {
      color: 'red', position: 'absolute', left: '50%',
      transform: 'translate(-50%, -50%)'
    };

    if (this.state.isLoading) {
      this.interval = setInterval(() => {
        if (this.state.isLoading) {
          this.setState({
            data: [
              {
                sentiment: 'Positive',
                value: parseInt(Math.random() * 100)
              },
              {
                sentiment: 'Neutral',
                value: parseInt(Math.random() * 100),
              },
              {
                sentiment: 'Negative',
                value: parseInt(Math.random() * 100)
              }]
          })
        }

      }, 2000);
    }
    else {
      clearInterval(this.interval);
    }

    return (
      <div className="App">
        <SearchBar fetchData={this.fetchData.bind(this)} />
        <p style={styles}>{this.state.status}</p>
        <BarChart data={this.state.data} />
      </div>
    );
  }



}

export default App;
