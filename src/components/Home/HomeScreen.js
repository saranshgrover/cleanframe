import React from 'react'
import HomeList from './HomeList'
import Grid from '@material-ui/core/Grid'

export default function HomeScreen({ history }) {
	return (
		<Grid
			spacing={5}
			container
			direction='column'
			alignItems='center'
			justify='space-around'
		>
			<Grid item>
				<HomeList history={history} />
			</Grid>
		</Grid>
	)
}
