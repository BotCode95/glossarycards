'use client'
import { FC, useState } from 'react'
import { Term } from '../../types/index'
import {
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Button,
	Typography,
	Divider,
} from '@mui/material'
import styled from './term.module.css'
// Show page get term random 1 - NumberLimit
interface Props {
	term: Term
}

export const TermCard: FC<Props> = ({ term }) => {
	const [flip, setFlip] = useState(false)
	return (
		<Card className={styled.flippyCardContainer}>
			<CardContent
				className={flip ? styled.flippyBack : styled.flippyFront}
				onClick={() => setFlip(true)}
			>
				{!flip ? (
					<Typography
						gutterBottom
						variant="h5"
						component="div"
						fontFamily={'cursive'}
					>
						{term.title}
					</Typography>
				) : (
					<>
						<Typography
							gutterBottom
							variant="h5"
							component="div"
							fontFamily={'cursive'}
						>
							{term.translate}
						</Typography>
						<Typography gutterBottom variant="body2" component="div">
							{term.phrases}
						</Typography>
					</>
				)}
				<Divider />
				<Typography variant="body2" color="text.secondary" component="div">
					Category : {term.category}
				</Typography>
			</CardContent>

			<CardActions style={{ display: 'flex', justifyContent: 'space-around' }}>
				<Button size="large" color="error" variant="contained">
					Hard
				</Button>
				<Button size="large" color="info" variant="contained">
					Medium
				</Button>
				<Button size="large" color="success" variant="contained">
					Easy
				</Button>
			</CardActions>
		</Card>
	)
}
