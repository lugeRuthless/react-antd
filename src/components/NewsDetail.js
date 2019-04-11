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

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

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
  full:{
    overflow:'hidden',
    textOverflow:'ellipsis',
    whiteSpace:'nowrap',
    width:'100%'
  },
  btn:{
    position:'fixed',
    width:'100%',
    bottom:0,
    zIndex:999
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
            news:{},
            comment:[],
            page:1
        }
    }


 getList(){
    axios({
        url:`${GLOBALURL}comment?parentId=${this.props.match.params.id}&_page=${this.state.page}&_limit=5`,
        method:'get'
    }).then(res=>{
        this.setState({
            comment:[...this.state.comment,...res.data],
            page:this.state.page+1
        })
    })
 }

  componentWillMount(){
        axios({
            url:`${GLOBALURL}news/${this.props.match.params.id}`,
            method:'get'
        }).then(res=>{
            this.setState({
                news:{...this.state.product,...res.data}
            },()=>{
                this.getList()
            })
        })
    }
  render(){
      const { classes } = this.props;
      const { news,comment }  =this.state;
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

                    <CardActions className={classes.btn}>
                    <Button size="small" variant="contained"  style={{height:58,width:'50%'}}
                    onClick={()=>{this.getList()}}
                    color="primary">
                            查看更多评论
                    </Button>
                    <Button size="small" variant="contained"   style={{height:58,width:'50%'}} color="primary">
                            评论
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

export default withStyles(styles)(Detail);
