import React, { Component } from 'react';
import Question from './Question';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Home from './Home';
import Result from './Result';

const data = [
  { 
    heading: "是否有領桃園市舊制育兒津貼？",
    options: [
      { val:"yes", label:"是", finish:false, next:1 },
      { val:"no", label:"否", finish:false, next:1 }
    ],
    note: "<div>舊制育兒津貼：每月 $3000，領到 3 歲。</div> \
           <div>詳情請參考<a href='http://sab.tycg.gov.tw/home.jsp?id=30714&parentpath=0%2C30713&mcustomize=onemessage_view.jsp&dataserno=201503100002&aplistdn=ou=data,ou=childcarenew,ou=chsocial,ou=ap_root,o=tycg,c=tw&toolsflag=Y' target='_blank'>「桃園市政府社會局桃園市育兒津貼公告」</a></div>"
  }, {
    heading: "<div>是否符合下列條件：\
      <ul style='text-align:left;font-size:1.5rem;'> \
        <li>家戶綜合所得稅稅率未達 20%</li> \
        <li>育有未滿二歲兒童</li> \
        <li>未領取該名兒童(軍保、公保、就業保險)育嬰留職停薪津貼</li> \
        <li>未接受政府公費安置</li> \
      </ul></div>",
    options: [
      { val:"yes", label:"是", finish:false, next:2 },
      { val:"no", label:"否", finish:true }
    ]
  }, {
    heading: "小孩是否有送托？",
    options: [
      { val:"yes", label:"是", finish:false, next:3 },
      { val:"no", label:"否", finish:true }
    ],
    note: "<div>送請日托、全日托或夜托每週托育時數達 30 小時以上</div>",
  }, {
    heading: "小孩送托單位",
    options: [
      { val:"baby_care_center", label:"私立托嬰中心", finish:false, next:4 },
      { val:"babysitter", label:"合格登記保母", finish:false, next:5 },
      { val:"public_baby_care_center", label:"公辦托嬰中心或公共托育家園", finish:true },
      { val:"family_care", label:"爺奶或親屬照顧", finish:true }
    ]
  }, {
    heading: "私立托嬰中心是否有和政府簽約？",
    options: [
      { val:"yes", label:"是", finish:true },
      { val:"no", label:"否", finish:true }
    ]
  }, {
    heading: "合格登記保母是否有和政府簽約？",
    options: [
      { val:"yes", label:"是", finish:true },
      { val:"no", label:"否", finish:true }
    ]
  }
];

class App extends Component {
  state = {
    targetQuestion: 0,
    selectedVal: data[0].options[0].val,
    historyQuestion: [0],
    historyAnswer: [data[0].options[0].val],
    page: 'home',
  };
  
  handleOnChange = (val) => {
    this.setState({ 
      selectedVal: val, 
      historyAnswer:[...this.state.historyAnswer.slice(0, this.state.historyAnswer.length-1), val], 
    });
  };
  
  handleClickNext = () => {
    data[this.state.targetQuestion].options.forEach((option) => {
      if (option.val === this.state.selectedVal) {
        if (!option.finish)
          this.setState({ 
            targetQuestion: option.next, 
            selectedVal: data[option.next].options[0].val,  
            historyQuestion:[...this.state.historyQuestion, option.next],
            historyAnswer:[...this.state.historyAnswer, data[option.next].options[0].val],
          });
        else
          this.setState({
            page: 'result',
          });
      }
    })
  };
  
  handleClickPrev = () => {
    const target = this.state.historyQuestion[this.state.historyQuestion.length - 2];
    this.setState({
      targetQuestion: target,
      selectedVal: data[target].options[0].val,
      historyQuestion: this.state.historyQuestion.filter((val,i) => i < this.state.historyQuestion.length - 1),
      historyAnswer: this.state.historyAnswer.filter((val,i) => i < this.state.historyAnswer.length - 1),
    });
  };
  
  handleHomeClick = () => {
    this.setState({ page:'question' });
  };
  
  handleResultClick = () => {
    this.setState({ 
      targetQuestion: 0,
      selectedVal: data[0].options[0].val,
      historyQuestion: [0],
      historyAnswer: [data[0].options[0].val],
      page:'question' 
    });
  };
  
  renderContent() {
    if (this.state.page === "home")
      return <Home onClick={this.handleHomeClick} />
    else if (this.state.page === "question") {
      const finish = data[this.state.targetQuestion].options.filter(option => option.val === this.state.selectedVal)[0].finish;
      return (
        <div style={{ height:'100%', width:'100%', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column' }}>
          <Question 
            heading={data[this.state.targetQuestion].heading}
            options={data[this.state.targetQuestion].options}
            onChange={this.handleOnChange}
            selectedVal={this.state.selectedVal}
            number={this.state.historyQuestion.length}
            note={data[this.state.targetQuestion].note}
          />
          {this.state.targetQuestion === 0 ?
            <div style={{ width:'100%', display:'flex', justifyContent:'center' }}>
              {this.state.selectedVal ?
                <Button variant="contained" onClick={this.handleClickNext} style={{ flex:1, maxWidth:'600px'}} size="large">
                  {finish ? '看結果':'下一題'}
                  <Icon>arrow_forward_ios</Icon>
                </Button> :
                <Button variant="contained" disabled style={{ flex:1, maxWidth:'600px'}} size="large">
                  {finish ? '看結果':'下一題'}
                  <Icon>arrow_forward_ios</Icon>
                </Button>
              }
            </div>:
            <div style={{ width:'100%', display:'flex', justifyContent:'space-between' }}>
              <Button variant="contained" onClick={this.handleClickPrev} style={{ flex:1, maxWidth:'300px'}} size="large">
                <Icon>arrow_back_ios</Icon>
                回到上一題
              </Button>
              {this.state.selectedVal ?
                <Button variant="contained" onClick={this.handleClickNext} style={{ flex:1, maxWidth:'300px'}} size="large">
                  {finish ? '看結果':'下一題'}
                  <Icon>arrow_forward_ios</Icon>
                </Button> :
                <Button variant="contained" disabled style={{ flex:1, maxWidth:'300px'}} size="large">
                  {finish ? '看結果':'下一題'}
                  <Icon>arrow_forward_ios</Icon>
                </Button>
              }
            </div>
          }
        </div>
      )
    }
    else if (this.state.page === "result")
      return <Result 
                historyQuestion={this.state.historyQuestion}
                historyAnswer={this.state.historyAnswer}
                onClick={this.handleResultClick}
             />
    else
      return null;
  }
  
  render() {
    return (
      <div className="App" style={{ height:'100%', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column' }}>
        {this.renderContent()}
      </div>
    );
  }
}

export default App;
