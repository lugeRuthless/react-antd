import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import Badge from '@material-ui/core/Badge';

import {Link} from 'react-router-dom'
import axios from 'axios'

import {connect} from 'react-redux'
import {addToCart} from '../actions'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';


const mapStateToProps=(state)=>{
    return {
        cart:state.cart
    }
}

const styles = theme=>({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
      },
      inline: {
        display: 'inline',
      },
  card: {
    width:'100%',
  },
  btn:{
    position:'fixed',
    width:'100%',
    bottom:0,
    zIndex:999
  },
  full:{
      overflow:'hidden',
      textOverflow:'ellipsis',
      whiteSpace:'nowrap',
      width:'100%'
  },
  margin: {
    margin: theme.spacing.unit * 2,
  },
  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: 'cover',
  }
});

class Detail extends Component {
  constructor(props){
        super(props)
        this.state={
            product:{},
            comment:[]
        }
    }
  componentWillMount(){
        axios({
            url:`${GLOBALURL}product/${this.props.match.params.id}`,
            method:'get'
        }).then(res=>{
            this.setState({
                product:{...this.state.product,...res.data}
            },()=>{
                axios({
                    url:`${GLOBALURL}comment?parentId=${this.props.match.params.id}`,
                    method:'get'
                }).then(res=>{
                    this.setState({
                        comment:res.data
                    })
                })
            })
        })
    }
 handlerClick(data){
     this.props.addToCart(data)
 }
  render(){
     // console.log(this.props.cart)
      const { classes } = this.props;
      const { product,comment }  =this.state;
      var allNum=0;
        this.props.cart.map((value,index)=>{
            allNum+=parseInt(value.quantity);
        })
      if(product.img){
          return (
            <div style={{marginBottom:76}}>
                <Card className={classes.card}>
                    <CardMedia
                    component="img"
                    alt={product.name}
                    className={classes.media}
                    width='100%'
                    height='250'
                    image={product.img[0]}
                    title={product.name}
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h5"  component="h2">
                       {product.name}
                    </Typography>
                    <Typography gutterBottom variant="h5" style={{color:'red',fontSize:16}} component="h3">
                       ￥{product.price.now}
                    </Typography>
                    <Typography component="p" className={classes.full}>
                        {product.text}
                    </Typography>
                    </CardContent>
                    <CardActions className={classes.btn}>
                    <Button size="small" variant="contained" style={{height:60,width:'50%'}} component={Link}
                    to='/cart' color="primary">
                        <Badge color="secondary" badgeContent={allNum} className={classes.margin}>
                            <ShoppingCart/>
                        </Badge>
                    </Button>
                        <Button size="small" variant="contained" onClick={()=>{this.handlerClick(product)}}  style={{height:60,width:'50%'}} color="primary">
                            加入购物车
                        </Button>
                    </CardActions>
                </Card>
                <div>
                <List className={classes.root}>
                    {comment.map((value,index)=>{
                        return (
                            <ListItem alignItems="flex-start" key={index}>
                            <ListItemAvatar>
                                <Avatar alt="Remy Sharp" src={value.avatar} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={value.title}
                                secondary={
                                <React.Fragment>
                                    <Typography className={classes.full} component="span" color="textPrimary">
                                    {value.text}
                                    </Typography>
                                    {value.time}
                                </React.Fragment>
                                }
                            />
                            </ListItem>
                        )
                    })}
                </List>
                </div>
            </div>
        );
      }else{
        return false;
      }

  }
}

Detail.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps,{addToCart})(withStyles(styles)(Detail));
