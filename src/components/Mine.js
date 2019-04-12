import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {Card,CardContent,CardMedia,CardActions,BottomNavigationAction,BottomNavigation,Fab,Typography,List,ListItem,ListItemIcon,ListItemText,Divider,Button,TextField,Dialog,DialogActions,DialogContent,DialogContentText,DialogTitle} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Subject from '@material-ui/icons/Subject';
import QuestionAnswer from '@material-ui/icons/QuestionAnswer';
import PlaylistAddCheck from '@material-ui/icons/PlaylistAddCheck';
import AddLocation from '@material-ui/icons/AddLocation';
import CheckCircle from '@material-ui/icons/CheckCircle';
import DraftsIcon from '@material-ui/icons/Drafts';
import ChevronRight from '@material-ui/icons/ChevronRight';
import CreditCard from '@material-ui/icons/CreditCard';
import Settings from '@material-ui/icons/Settings';
import Message from '@material-ui/icons/Message';
import axios from 'axios'

const styles =theme=> ({
  root:{
    width: '100%',
    marginTop:20,
    backgroundColor: theme.palette.background.paper,
  },
  card: {
    width:'100%',
  },
  media: {
    height: 140,
  },
  login:{
    position:'absolute',
    top:'60%',
    left:'50%',
    transform:'translate(-50%,-50%)'
  },
  bg:{
      position:'relative',
      margin:0,
      padding:0,
      width:'100%',
      textAlign:'center'
  },
  iconRight:{
      position:'absolute',
      right:10
  }
});

class Mine extends Component{
    state={
        icons:[
            {icon:<AddLocation/>,text:'我的地址'},
            {icon:<CreditCard/>,text:'优惠券'},
            {icon:<DraftsIcon/>,text:'我的邮件'},
            {icon:<Settings/>,text:'设置'},
            {icon:<Message/>,text:'意见反馈'}
        ],
        open:false,
        username:'',
        password:'',
        message:'点击登录'
    }
    handlerChangeUsername(e){
        this.setState({
            username:e.target.value
        })
    }
    handlerChangePassword(e){
        this.setState({
            password:e.target.value
        })
    }

      handleClickOpen = () => {
        this.state.username ?
        this.setState({open:false}):
        this.setState({open:true})

      };
      handleCloseCancel = () =>{
          this.setState({open:false})
      }

      handleClose = () => {
          if(this.state.username=='' || this.state.password==''){
              alert('用户名或密码不能为空')
          }else{
            axios({
                url:`${GLOBALURL}users?username=${this.state.username}&password=${this.state.password}`,
                method:'get',
            }).then(res=>{
                if(res.data.length>0){
                    this.setState({
                         open: false,
                         message:res.data[0].username
                         });
                    alert('登录成功')
                }else{
                    this.setState({
                        //username:'',
                        password:''
                    },()=>{
                        alert('用户名或密码错误')
                    })
                }
            })
          }
      };
  render(){
  const { classes } = this.props;
  return (
    <div>      {/* 登录 */}
    <Card className={classes.card}>
      <CardContent className={classes.bg}>
        <CardMedia
          className={classes.media}
          image="./asserts/images/banner.gif"
          title="Contemplative Reptile"
        />
        <div className={classes.login}>
        {this.state.message=='点击登录'
        ?<Fab color="secondary">
            <AddIcon onClick={this.handleClickOpen}/>
        </Fab>
       :<Fab color="primary">
            <CheckCircle onClick={this.handleClickOpen} />
        </Fab>}
        <p className={classes.bg}>{this.state.message}</p>
        </div>
      </CardContent>
      <CardActions style={{background:"#fefefe"}}>
      <BottomNavigation
        showLabels
        className={classes.card}
      >
        <BottomNavigationAction  label="我的订单" icon={<Subject />} />
        <BottomNavigationAction  label="我的消息" icon={<QuestionAnswer />} />
        <BottomNavigationAction  label="我的进度" icon={<PlaylistAddCheck />} />
        </BottomNavigation>
      </CardActions>
    </Card>
    <div className={classes.root}>
        <List component="nav">    {/*列表 */}
        {this.state.icons.map((value,index)=>{
            return (
                <div key={index}>
                <ListItem button>
                    <ListItemIcon>
                    {value.icon}
                    </ListItemIcon>
                    <ChevronRight className={classes.iconRight}/>
                    <ListItemText primary={value.text} />
                </ListItem>
                <Divider />
                </div>
            )
        })}
        </List>
        <div>
            <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
            >
            <DialogTitle id="form-dialog-title">登录</DialogTitle>
            <DialogContent>
                <DialogContentText>
                请输入你的用户名和密码
                </DialogContentText>
                <TextField
                id='username'
                autoFocus
                margin="dense"
                label="用户名"
                placeholder='admin'
                type="email"
                fullWidth
                value={this.state.username}
                onChange={(e)=>{this.handlerChangeUsername(e)}}
                />
                <TextField
                autoFocus
                margin="dense"
                id="password"
                label="密码"
                type="password"
                placeholder='admin'
                fullWidth
                value={this.state.password}
                onChange={(e)=>{this.handlerChangePassword(e)}}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={this.handleCloseCancel} color="primary">
                取消登录
                </Button>
                <Button onClick={this.handleClose} color="primary">
                确认登录
                </Button>
            </DialogActions>
            </Dialog>
        </div>

    </div>
    </div>
  );
}
}
Mine.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Mine);
