import React, { Component } from 'react';

import Button from 'calcite-react/Button';
import { CalciteH1 } from 'calcite-react/Elements';

class Home extends Component {
  render() {
    return (
      <div>
        <CalciteH1>Extend Demo</CalciteH1>
        <Button>Log Out</Button>
      </div>
    );
  }
}

export default Home;
