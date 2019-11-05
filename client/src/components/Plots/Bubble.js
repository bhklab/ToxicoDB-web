import * as d3 from 'd3';
import React from 'react';
import colors from '../../styles/colors';

class Bubble extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {
      data, plotId
    } = this.props;
    this.plotBubble(data, plotId);
  }


  plotBubble(names, nums, plotId) {
    // positions and dimensions
    const margin = {
      top: 20,
      right: 50,
      bottom: 90,
      left: 70,
    };

    const width = 800;
    const height = 400;
    

    
  }

  render() {
    return <div id={this.props.plotId} className="plot" />;
  }
}

export default Bubble;
