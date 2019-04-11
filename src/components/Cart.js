import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Add from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Remove from '@material-ui/icons/Remove';
import DeleteIcon  from '@material-ui/icons/Delete';
import Paper from '@material-ui/core/Paper';
import {connect} from 'react-redux'
import {changeTotalNum,addToCart,removeToCart,deleteCart} from '../actions'

import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

var _=require('lodash')
const mapStateToProps=(state)=>{
    return {
        cart:state.cart
    }
}

const styles = theme => ({
  card: {
    display: 'flex',
    marginBottom:5
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 100,
    textAlign:'center'
  },
  pay:{
      position:'fixed',
      bottom:0,
      width:'100%',
      borderTop:'1px solid #f50057',
      height:56,
      lineHeight:'56px',
      ...theme.mixins.gutters(),
  },
  kong:{
      height:'100%',
      textAlign:'center',
      marginTop:300
  }
});

class Cart extends Component{
    state={
        checkValues:[],
        allNum:0,
        allTotal:0
    }

    handlerChange=(ev,value)=>{
        if(ev.target.value<0){
            ev.target.value=1
        }else{

            value.quantity=ev.target.value
            this.props.changeTotalNum(value)
        }
    }
    handlerAddClick=(data)=>{
            this.props.addToCart(data)
    }
    handlerRemoveClick=(data)=>{
        if(data.quantity>1){
            this.props.removeToCart(data)
        }
    }



    handlerCheckboxChange=(data)=>()=>{
        var checkValues=this.state.checkValues.slice()
       // var newVal=JSON.parse(event.target.value);
       var newVal=data
       // var index=checkValues.indexOf(newVal)
        var index=_.findIndex(this.state.checkValues,{id:newVal.id})
             if(index==-1){
                checkValues.push(newVal)
            }else{
                checkValues.splice(index,1)
            }
            this.setState({
                checkValues
            },()=>{
                var allNum=0;
                var allTotal=0;
                this.state.checkValues.map((value,index)=>{
                    allNum+=parseFloat(value.subTotal);
                    allTotal+=parseInt(value.quantity);
                })
               this.setState({
                    allNum,
                    allTotal
               })
            })

    }


    render(){
        const { classes, theme } = this.props;
        /* var allNum=0;
        var allTotal=0; */
         if(this.props.cart.length==0){
          return (
              <div>
                <div className={classes.kong} elevation={1}>
                    购物车为空，快去购物吧
                </div>
                <Paper className={classes.pay} elevation={1}>
                     总数：{0}
                     总价：{0}
                     <Button variant="contained" style={{position:'absolute',right:0,height:'100%'}} color='secondary'>立即结算</Button>
                </Paper>
              </div>
          )
        }else{
          return (
              <div>
                  {this.props.cart.map((value,index)=>{
                     /*  allNum+=parseInt(value.quantity);
                      allTotal+=parseFloat(value.subTotal); */
                    return(
                        <Card className={classes.card} key={index}>
                        <Checkbox
                            name='group'
                            onChange={this.handlerCheckboxChange(value)}
                            value={JSON.stringify(value)}
                            />
                          <CardMedia
                              className={classes.cover}
                              image={value.img[0]}
                              title={value.name}
                          />
                      <div className={classes.details}>
                          <CardContent className={classes.content}>
                          <Typography component="h5" variant="h5">
                              {value.name}
                          </Typography>
                          <Typography variant="subtitle1" color="textSecondary">
                          单价：￥{value.price.now}
                          </Typography>
                          </CardContent>
                          <div className={classes.controls}>
                          数量
                          <Remove onClick={()=>{
                            this.handlerRemoveClick(value)}}/>
                          <TextField
                          id="standard-number"
                          value={value.quantity}
                          type="number"
                          onChange={(e)=>{this.handlerChange(e,value)}}
                          className={classes.textField}
                          InputLabelProps={{
                            shrink: true,
                          }}
                          margin="normal"
                        />
                          <Add onClick={()=>{this.handlerAddClick(value)}}/>
                          </div>
                          <Typography variant="subtitle1" color="textSecondary" component='p'>
                           小计： ￥{value.subTotal}
                            <DeleteIcon color="secondary" onClick={()=>{this.props.deleteCart(value)}}/>
                          </Typography>
                      </div>
                  </Card>)
                  })}

                  <Paper className={classes.pay} elevation={1}>
                            总数：{this.state.allTotal}
                            总价：{this.state.allNum}
                            <Button variant="contained" style={{position:'absolute',right:0,height:'100%'}} color='secondary'>立即结算</Button>
                    </Paper>

              </div>
            );
        }
    }
}

Cart.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default connect(mapStateToProps,{changeTotalNum,addToCart,removeToCart,deleteCart})(withStyles(styles,{ withTheme: true })(Cart));
