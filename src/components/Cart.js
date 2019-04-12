import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {Card,CardContent,CardMedia,Button,Typography,TextField,Paper,Checkbox} from '@material-ui/core';
import Add from '@material-ui/icons/Add';
import Remove from '@material-ui/icons/Remove';
import DeleteIcon  from '@material-ui/icons/Delete';
import {connect} from 'react-redux'
import {changeTotalNum,addToCart,removeToCart,deleteCart} from '../actions'

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
        allTotal:0,
        flag:false,
        isSelected:[]
    }

    handlerChange=(ev,value)=>{
        if(ev.target.value<0){
            ev.target.value=1
        }else{
            value.quantity=parseInt(ev.target.value)
            this.props.changeTotalNum(value)
            this.updateAllNumTotal()
        }
    }
    handlerAddClick=(data)=>{
            this.props.addToCart(data)
            this.updateAllNumTotal()

    }
    handlerRemoveClick=(data)=>{
        if(data.quantity>1){
            this.props.removeToCart(data)
            this.updateAllNumTotal()
        }
    }

    updateAllNumTotal(){
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
    }
    componentWillMount(){
       // console.log('componentWillMount')
        this.setState({
            isSelected:this.props.cart.map(()=>true),
            checkValues:this.props.cart
        },()=>{
            this.updateAllNumTotal()
        })
    }
    componentDidMount(){
        var len=this.state.isSelected.filter((value)=>value==true).length
        if(len==this.state.isSelected.length){
            this.setState({
                flag:!this.state.flag
            },()=>{
                //console.log(this.state.checkValues)
            })
        }
    }
    componentWillReceiveProps(){
        this.updateAllNumTotal();
        var len=this.state.isSelected.filter((value)=>value==true).length
        if(len==this.state.isSelected.length && this.state.flag == false){
            this.setState({
                flag:!this.state.flag
            },()=>{
                this.updateAllNumTotal();
            })
        }
    }
    handlerCheckboxChange=(suoyin)=>()=>{
        var checkValues=this.state.checkValues.slice()
        var newVal=JSON.parse(event.target.value);
       // var index=checkValues.indexOf(newVal)

        var index=_.findIndex(this.state.checkValues,{id:newVal.id})
             if(index==-1){
                checkValues.push(newVal)
            }else{
                checkValues.splice(index,1)
            }
            this.state.isSelected[suoyin]=!this.state.isSelected[suoyin]

            this.setState({
                checkValues,
                isSelected:this.state.isSelected
            },()=>{
                //console.log(this.state.isSelected)
                var len=this.state.isSelected.filter((value)=>value==true).length
               // console.log(this.state.isSelected.filter((value)=>value==true))
                if(!this.state.isSelected[suoyin]){
                    this.setState({
                        flag:false
                    },()=>{

                        this.updateAllNumTotal();
                    })
                }else if(len == this.state.isSelected.length){
                    this.setState({
                        flag:true
                    },()=>{
                        this.updateAllNumTotal();
                    })
                }
             //  this.updateAllNumTotal();
            // console.log(this.state.checkValues)
            })

    }
    selectAll=(data)=>ev=>{
       // console.log(this.state.isSelected)
       // var len=this.state.isSelected.filter((value)=>value==true).length
        if(ev.target.checked){
            this.setState({
                flag:!this.state.flag
            },()=>{
                this.setState({
                    isSelected:this.state.isSelected.map(()=>true),
                },()=>{this.updateAllNumTotal()})
            })
        }else{
             this.setState({
            flag:!this.state.flag
            },()=>{
                this.setState({
                    isSelected:this.state.isSelected.map(()=>false),
                    allNum:0,
                    allTotal:0
                })
            })
        }
        //console.log(len)
        //console.log(ev.target.checked)
       /// console.log(data)
       // console.log(this.refs)
       //console.log(this.state)
        //console.log(this.state)
        //console.log(ev.target.checked){
        //}
        /* this.setState({
            flag:ev.target.checked
        },()=>{
            //console.log(this.state.checkValues)
        }) */
    }


    render(){
        const { classes, theme } = this.props;
         if(this.props.cart.length==0){
          return (
              <div>
                <div className={classes.kong} elevation={1}>
                    购物车为空，快去购物吧
                </div>
                <Paper className={classes.pay} elevation={1}>
                    <Checkbox
                        disabled
                    />
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
                           // ref={`checkbox${index}`}
                            checked={this.state.isSelected[index]}
                            onChange={this.handlerCheckboxChange(index)}
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
                            <Checkbox
                                name='group'
                                 checked={this.state.flag}
                                onChange={this.selectAll(this.props.cart)}
                                value={'selectAll'}
                            />
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
