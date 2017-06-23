import React from 'react'
import { Route } from 'react-router'
import VegetableBox from './VegetableBox'
import SignUp from './Signup'
import Home from './Home'

var routes = (
	<div>
		<Route path ='/' component={Home} />
		<Route path='/signup' component={SignUp} />
		<Route path='/login' component={Home} />
	</div>
)


export default routes;
