import React from 'react';
import BarChart from 'react-bar-chart';


const margin = { top: 50, right: 20, bottom: 30, left: 40 };

var createReactClass = require('create-react-class');

const Example = createReactClass({
  getInitialState() {
    return { width: 500 };
  },

  componentDidMount: () => {
    window.onresize = () => {
      this.setState({ width: this.refs.root.offsetWidth });
    };
  },


  render() {
    return (
      <div ref='root'>
        <div style={{ width: '50%' }}>
          <BarChart ylabel='percent'
            width={this.state.width}
            height={250}
            margin={margin}
            data={this.props.data}
            onBarClick={this.handleBarClick}
            colorByLabel={true} />
        </div>
      </div>
    );
  }
});

/*
React.render(
 <Example/>,
 document.getElementById('react-container')
);*/

export default Example;