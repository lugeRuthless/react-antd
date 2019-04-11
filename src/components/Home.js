import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import {Card,CardHeader,CardMedia,CardContent,CardActions,Collapse,Avatar,IconButton,Typography} from '@material-ui/core';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import axios from 'axios'
const styles = theme => ({
  card: {
    width: '100%'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
});

class RecipeReviewCard extends React.Component {
  state = {
      expanded: false,
      home:[],
    };

  handleExpandClick = () => {
    this.setState(state => ({
        expanded: !state.expanded
     }));
  }
  componentWillMount(){
        axios({
            url:`${GLOBALURL}home?_limit=10&_sort=time&_order=desc`,
            method:'get'
        }).then(res=>{
            this.setState({
                home:res.data
            })
        })
  }
  handlerFab(){

  }

  render() {
    const { classes } = this.props;
    const {home} =this.state;
    return (
        <div>
            {home.map((value,index)=>{
                return (
                    <div key={index}>
                    <Card className={classes.card}>
                        <CardHeader
                        avatar={
                            <Avatar aria-label="Recipe" className={classes.avatar}>
                            {value.name.slice(0,1)}
                            </Avatar>
                        }
                        action={
                            <IconButton>
                            <MoreVertIcon />
                            </IconButton>
                        }
                        title={value.title}
                        subheader={value.time}
                        />
                        <CardMedia
                        className={classes.media}
                        image={value.img}
                        title="Paella dish"
                        />
                        <CardContent>
                        <Typography component="p">
                            {value.title}
                        </Typography>
                        </CardContent>
                        <CardActions className={classes.actions} disableActionSpacing>
                        <IconButton aria-label="添加喜爱" onClick={()=>{
                            this.handlerFab()
                        }}>
                        {value.fab ? <FavoriteIcon color='secondary' /> :<FavoriteIcon />}
                        </IconButton>
                        <IconButton aria-label="分享">
                            <ShareIcon />
                        </IconButton>
                        <IconButton
                            ref='collapse'
                            className={classnames(classes.expand, {
                            [classes.expandOpen]: this.state.expanded,
                            })}
                            onClick={()=>{
                                this.handleExpandClick()
                            }}
                            aria-expanded={this.state.expanded}
                            aria-label="更多"
                        >
                            <ExpandMoreIcon />
                        </IconButton>
                        </CardActions>
                        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            <Typography paragraph>
                             {value.text}
                            </Typography>
                            <Typography paragraph>
                            {value.text}
                            </Typography>
                            <Typography paragraph>
                            {value.text}
                            </Typography>
                            <Typography>
                                编辑：{value.name}
                            </Typography>
                        </CardContent>
                        </Collapse>
                    </Card>
                    </div>
                )
            })}
        </div>

    );
  }
}

RecipeReviewCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RecipeReviewCard);
