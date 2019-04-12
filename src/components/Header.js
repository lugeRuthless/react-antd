import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {AppBar,Toolbar,Typography} from '@material-ui/core';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import Drawer from './Drawer'

const styles = {
  root: {
    flexGrow: 1,
    position:'fixed',
    width:'100%',
    zIndex:999,
    top:0,
  },
  menuButton: {
    marginLeft: -18,
    marginRight: 10,
  },
  drawer:{
      float:'right'
  }
};

function DenseAppBar(props) {
  const { classes } = props;
  let title=location.hash.split('/')[1].trim()
    switch(title){
        case '':

        case 'home':
        title='首页';

        break;
        case 'news':
        if(location.hash.split('/')[2]){
            title='新闻详情';
        }else{
            title='新闻'
        }
            break;
        case 'product':
           if(location.hash.split('/')[2]){
               title='商品详情';
           }else{
               title='商品列表'
           }
             break;
        case 'cart':
        title='购物车';break;
        case 'mine':
        title='我的';break;
        default: break;
    }
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense">
          {title=='首页' || title=='我的' ?null:<KeyboardArrowLeft  onClick={()=>{props.history.goBack()}}/>}
          <Typography variant="h6" color="inherit">
            {title}
          </Typography>
          <Drawer/>
        </Toolbar>
      </AppBar>
    </div>
  );
}

DenseAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DenseAppBar);
