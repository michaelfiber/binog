import React, { useEffect, useState } from 'react';

function getRandom(from: number, to: number): number {
	return Math.ceil(Math.random() * (to - from)) + from;
}

export default function Card() {
	const [numbers, setNumbers] = useState<number[]>([])

	useEffect(() => {
		if (numbers.length == 0) {
			let n: number[] = [];

			let min = 1;
			let max = 15;

			for (let j = 0; j < 5; j++) {
				for (let i = 0; i < 5; i++) {
					let r = getRandom(min, max);
					while (n.indexOf(r) > -1) {
						r = getRandom(min, max);
					}
					n.push(r);
				}

				min += 15;
				max += 15;
			}

			n[12] = 0;

			setNumbers(n)
		}
	});

	return (
		<div className='card'>
			<div className='columns'>
				<div className='column'>B</div>
				<div className='column'>I</div>
				<div className='column'>N</div>
				<div className='column'>G</div>
				<div className='column'>0</div>
			</div>
			<div className='columns'>
				<div className='column'>
					{numbers.filter((v, i) => i < 5).map(v => <div>{v}</div>)}
				</div>
				<div className='column'>
					{numbers.filter((v, i) => i >= 5 && i < 10).map(v => <div>{v}</div>)}
				</div>
				<div className='column'>
					{numbers.filter((v, i) => i >= 10 && i < 15).map(v => <div>{v}</div>)}
				</div>
				<div className='column'>
					{numbers.filter((v, i) => i >= 15 && i < 20).map(v => <div>{v}</div>)}
				</div>
				<div className='column'>
					{numbers.filter((v, i) => i >= 20 && i < 25).map(v => <div>{v}</div>)}
				</div>
			</div>
		</div>
	)
}