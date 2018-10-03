import React, { Component } from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';

class Question extends Component {
  
  handleChange = (event) => {
    this.setState({ selectedVal: event.target.value });
    this.props.onChange(event.target.value);   
  }
  
  render() {
    return (
      <div className="Question" style={{ flex:1, display:'flex', alignItems:'center' }}>
        <div>
          <Typography variant="headline" gutterBottom style={{ fontSize: '2rem', fontWeight: 300 }}>
            Q{this.props.number} <div dangerouslySetInnerHTML={{ __html:this.props.heading }} />
          </Typography>
          <FormControl component="fieldset">
          <RadioGroup
            aria-label="Options"
            name="option"
            value={this.props.selectedVal}
            onChange={this.handleChange}
          >
            {this.props.options.map((option, index) =>
              index === 0 ?
                <FormControlLabel 
                  value={option.val} 
                  control={<Radio />} 
                  label={<span style={{ fontSize:'1.5rem', fontWeight:300 }}>{option.label}</span>} 
                  key={index} 
                /> :
                <FormControlLabel 
                  value={option.val} 
                  control={<Radio />} 
                  label={<span style={{ fontSize:'1.5rem', fontWeight:300 }}>{option.label}</span>} 
                  key={index}
                /> 
            )}
          </RadioGroup>
          </FormControl>
          {this.props.note &&
            <Typography variant="subheading" gutterBottom align="left" style={{backgroundColor:'#e6e6e6',padding:'16px',fontWeight:300}}>
              <div dangerouslySetInnerHTML={{ __html:this.props.note }} />
            </Typography>
          }
        </div>
      </div>
    );
  }
}

export default Question;
