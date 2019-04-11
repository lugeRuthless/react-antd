import React,{Component} from 'react';
import ReactDOM from 'react-dom'
import {TabBar,Header,Home,News,Cart,Product,Mine} from './components'
import CssBaseline from '@material-ui/core/CssBaseline';

import {HashRouter as Router,Route,Switch,NavLink} from 'react-router-dom'
import store from './store'
import {Provider} from 'react-redux'

window.GLOBALURL='http://localhost:3000/'

class Index extends Component{
    render(){
       // console.log(location.hash.split('/')[1].trim())
        return (
            <Provider store={store}>
                <Router>
                    <CssBaseline>

                        <div>
                            <Switch>
                                <Route path='/' component={TabBar}/>
                            </Switch>
                        </div>
                    </CssBaseline>
                </Router>
            </Provider>
        )
    }
}



ReactDOM.render(<Index/>,document.getElementById('app'))