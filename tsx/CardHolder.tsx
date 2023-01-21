import React, { useEffect, useState } from 'react';
import Card from './Card';

export default function CardHolder(props: {count: number}) {
	const [cards, setCards] = useState<JSX.Element[]>([]);

	useEffect(() => {
		if (cards.length == 0) {
			for (let i = 0; i < props.count; i++) {
				cards.push(<Card />);
			}
		}
	})

	return (
		<div className='card-holder'>
			{cards}
		</div>
	)
}