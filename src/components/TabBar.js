import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import Home from '@material-ui/icons/Home';
import FiberNew from '@material-ui/icons/FiberNew';
import ListAlt from '@material-ui/icons/ListAlt';
import PersonPinIcon from '@material-ui/icons/PersonPin';

import HomeComponent from './Home'
import News from './News'
import NewsDetail from './NewsDetail'
import Product from './Product'
import Cart from './Cart'
import Mine from './Mine'
import Detail from './Detail'
import {HashRouter as Router,Route,Switch} from 'react-router-dom'

const styles = {
  root: {
    width: '100%',
    position:'fixed',
    bottom:0,
  },
  rootNull:{
    width: '100%',
    position:'fixed',
    bottom:-56,
  }
};

class SimpleBottomNavigation extends React.Component {
  state = {
    value: '/home',
  };

  handleChange = (event, value) => {
    this.setState({ value },()=>{
        this.props.history.push(value)
    });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;
    return (
        <div>
            <div style={{marginTop:48,marginBottom:56}}>
                <Switch>
                    <Route path='/home' component={HomeComponent}/>
                    <Route path='/news/:id' component={NewsDetail}/>
                    <Route path='/news' component={News}/>
                    <Route path='/product/:id' component={Detail}/>
                    <Route path='/product' component={Product} exact/>
                    <Route path='/cart' component={Cart}/>
                    <Route path='/mine' component={Mine}/>
                    <Route  component={HomeComponent}/>
                </Switch>
            </div>
            <BottomNavigation
                value={value}
                onChange={this.handleChange}
                showLabels
                className={(location.hash.split('/')[2]==null) && (location.hash.split('/')[1] !=='cart')?classes.root:classes.rootNull}
            >
                <BottomNavigationAction label="首页" value='/home' icon={<Home />} />
                <BottomNavigationAction label="新闻" value='/news' icon={<FiberNew />} />
                <BottomNavigationAction label="产品" value='/product' icon={<ListAlt />} />
                <BottomNavigationAction label="购物车" value='/cart' icon={<ShoppingCart />} />
                <BottomNavigationAction label="我的" value='/mine' icon={<PersonPinIcon />} />
            </BottomNavigation>
      </div>
    );
  }
}

SimpleBottomNavigation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleBottomNavigation);
