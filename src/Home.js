import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

class Home extends Component {
  handleClick = (event) => {
    this.props.onClick('home');   
  };
  
  render() {
    return (
      <div>
        <Typography variant="display2" gutterBottom>
          桃園市育兒補助報馬仔
        </Typography>
        <Typography variant="headline" gutterBottom >
          回答幾個簡單的問題，就可知道未滿 2 歲幼兒有哪些補助可以申請。
        </Typography>
        <Button color="secondary" variant="contained" style={{ flex:1, maxWidth:'600px'}} size="large" onClick={this.handleClick}>
          開始
        </Button>  
      </div>
    );
  }
}

export default Home;
