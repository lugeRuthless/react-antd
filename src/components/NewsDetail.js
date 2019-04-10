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
import Comment from './Comment'
import axios from 'axios'
const styles = theme=>({
  card: {
    width:'100%',
  },
  btn:{
    position:'fixed',
    width:'100%',
    bottom:0
  },
  margin: {
    margin: theme.spacing.unit * 2,
  },
  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: 'cover',
  },
});

class Detail extends Component {
  constructor(props){
        super(props)
        this.state={
            news:{}
        }
    }
  componentWillMount(){
        axios({
            url:`http://localhost:3000/news/${this.props.match.params.id}`,
            method:'get'
        }).then(res=>{
            this.setState({
                news:{...this.state.product,...res.data}
            })
        })
    }
  render(){
      const { classes } = this.props;
      const { news }  =this.state;
      if(news.img){
          return (
            <div>
                <Card className={classes.card}>
                    <CardMedia
                    component="img"
                    alt={news.title}
                    className={classes.media}
                    width='100%'
                    height='100%'
                    image={news.img[0]}
                    title={news.title}
                    />
                    <CardContent>
                    <Typography gutterBottom variant="h5"  component="h2">
                       {news.title}
                    </Typography>

                    <Typography component="p">
                        {news.descript}
                    </Typography>
                    </CardContent>
                    <Comment/>
                    <Button color="primary" onClick={()=>{this.props.history.goBack()}}>回到上级</Button>
                    <CardActions className={classes.btn}>
                    <Button size="small" variant="contained"  style={{height:58,width:'50%'}}
                    to='/cart' color="primary">
                            查看评论
                    </Button>
                    <Button size="small" variant="contained"   style={{height:58,width:'50%'}} color="primary">
                            评论
                    </Button>
                    </CardActions>
                </Card>
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

export default withStyles(styles)(Detail);
