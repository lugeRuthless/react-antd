import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import {NavLink} from 'react-router-dom'
import axios from 'axios'


const styles = {
  card: {
    width: '50%',
    float:'left',
  },
  media: {
      float:'left',
      width:'90%',
      marginLeft:'5%',
      height:'90%',
      marginRight:10,
      marginTop:10
    //objectFit: 'cover',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

function ImgMediaCard(props) {
    const { classes } = props;

    return (
        <div>
            {props.list.map((value,index)=>{
                return (
                    <NavLink to={`/product/${value.id}`} style={{textDecoration:'none'}} key={index}>
                    <Card className={classes.card} >
                    <CardActionArea>
                    <CardMedia
                        component="img"
                        alt={value.text}
                        className={classes.media}
                        height="140"
                        image={value.img[0]}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h5" style={{overflow: 'hidden',
                        height:30,
                        lineHeight:'30px',
                        width:'100%',
                        fontSize:16,
                        textOverflow:'ellipsis',
                        whiteSpace: 'nowrap'}}>
                         {value.name}
                        </Typography>
                        <Typography component="p">
                         <strong style={{fontSize:16,color:'red'}}>￥{value.price.now}</strong>
                         <del style={{fontSize:16}}>￥{value.price.now+10}</del>
                        </Typography>
                    </CardContent>
                    </CardActionArea>
                </Card>
                </NavLink>)
            })}
            <div style={{clear:'both',height: 0, lineHeight: 0, fontSize: 0}}></div>
        </div>


    );
  }

  ImgMediaCard.propTypes = {
    classes: PropTypes.object.isRequired,
  };

class Product extends Component{
    constructor(props){
        super(props)
        this.state={
            list:[],
            page:1
        }
    }
    getListData=()=>{
        axios({
            url:`${GLOBALURL}product?_page=${this.state.page}&_limit=20&_sort=time&_order=desc`,
            method:'get'
        }).then(res=>{
            //console.log(res.data)
            this.setState({
                list:[...this.state.list,...res.data],
                page:this.state.page+1
            })
        })
    }

    componentDidMount(){
       this.getListData();
    }

    render(){

        return (
            <ImgMediaCard {...this.props} {...this.state}/>
        )
    }
}
export default withStyles(styles)(Product);
