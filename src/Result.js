import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const styles = {
  primary: {
    fontSize:'1.5rem'
  },
  secondary: {
    fontSize:'1rem'
  },
};

class Result extends Component {
  handleClick = (event) => {
    this.props.onClick('result');   
  };
  
  renderResult = () => {
    let result = [];
    const {historyQuestion, historyAnswer} = this.props;
    historyQuestion.forEach((val, i) => {
      console.log(val)
      if (val === 0 && historyAnswer[i] === "yes")
        result.push({ primary:"每月 $3000，領到 3 歲", secondary:"舊制育兒津貼(繼續領)" });
      else if (val === 1 && historyAnswer[i] === "no")
        result.push({ primary:"每月 $3000，領到 2 歲", secondary:"新制育兒津貼(需申請)" });
      else if (val === 2 && historyAnswer[i] === "no")
        result.push({ primary:"每月 $3000，領到 2 歲", secondary:"新制育兒津貼(需申請)" });
      else if (val === 3 && historyAnswer[i] === "public_baby_care_center")
        result.push({ primary:"每月 $3000，領到 2 歲", secondary:"新制托育補助(需申請)" });
      else if (val === 3 && historyAnswer[i] === "family_care")
        result.push({ primary:"每月 $3000，領到 2 歲", secondary:"新制育兒津貼(需申請)" });
      else if (val === 4 && historyAnswer[i] === "yes")
        result.push({ primary:"每月 $8000，領到 2 歲", secondary:"新制托育補助(需申請)" });
      else if (val === 4 && historyAnswer[i] === "no")
        result.push({ primary:"每月 $3000，領到 2 歲", secondary:"新制育兒津貼(需申請)" });
      else if (val === 5 && historyAnswer[i] === "yes")
        result.push({ primary:"每月 $7000，領到 2 歲", secondary:"新制托育補助(需申請)" });
      else if (val === 5 && historyAnswer[i] === "no")
        result.push({ primary:"每月 $3000，領到 2 歲", secondary:"新制育兒津貼(需申請)" });
    });
    
    return (
      <div>
        {result.length > 1 ?
          <Typography variant="display1" gutterBottom style={{ fontSize: '2rem' }}>
            {result.length} 種補助擇 1 領取
          </Typography> :
          <Typography variant="display1" gutterBottom style={{ fontSize: '2rem' }}>
            1 種補助可領取
          </Typography>
        }
        <List>
          {result.map((res, i) =>
            <ListItem key={i}>
              <Icon>lens</Icon>
              <ListItemText 
                primary={<span style={styles.primary}>{res.primary}</span>} 
                secondary={<span style={styles.secondary}>{res.secondary}</span>}
              />
            </ListItem>
          )}
        </List>
      </div>
    )
  };
  
  render() {
    return (
      <div>
        {this.renderResult()}
        <Button color="secondary" variant="contained" size="large" onClick={this.handleClick}>
          重新作答
        </Button>
        <Typography variant="subheading" gutterBottom align="left" style={{backgroundColor:'#e6e6e6',padding:'16px',fontWeight:300,marginTop:'16px'}}>
          <div><a href="http://sab.tycg.gov.tw/home.jsp?id=30714&parentpath=0%2C30713&mcustomize=onemessage_view.jsp&dataserno=201208290022&aplistdn=ou=data,ou=childcarenew,ou=chsocial,ou=ap_root,o=tycg,c=tw&toolsflag=Y" target='_blank' rel="noopener noreferrer">新制育兒津貼申請方式</a></div>
          <div><a href="http://sab.tycg.gov.tw/home.jsp?id=30714&parentpath=0,30713&mcustomize=onemessages_view.jsp&dataserno=201807310001&aplistdn=ou=data,ou=childcarenew,ou=chsocial,ou=ap_root,o=tycg,c=tw&toolsflag=Y" target='_blank' rel="noopener noreferrer">新制托育補助申請方式</a></div>
          <br />
          <div>其他問題請洽桃園市社會局婦女福利及兒童托育科</div>
          <div>03-332-2101 轉 6317-18、6424-27 或 03-3390702</div>
        </Typography>
        <Typography variant="subheading" gutterBottom align="left" style={{backgroundColor:'#e6e6e6',padding:'16px',fontWeight:300}}>
          <div>意見回饋：faye1821@gmail.com</div>
        </Typography>
      </div>
    ); 
    
  }
}

export default Result;