import React,{Component} from 'react';
export default class Detail extends Component{
   render(){
       return (
           <div>
               Detail{this.props.match.params.id}
           </div>
       )
   }
}