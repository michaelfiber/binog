import React, { useEffect, useRef, useState } from 'react';
import CardHolder from './CardHolder';
import DocumentTitle from './DocumentTitle'
import Curtain from './Curtain'

function saveNumbers(numbers: number[]) {
	localStorage.setItem('binog-stored-numbers', JSON.stringify(numbers))
}

function loadNumbers(): number[] {
	let numbersString = localStorage.getItem('binog-stored-numbers');
	if (numbersString) {
		return JSON.parse(numbersString)
	}
	return [];
}

export default function Main() {
	const [numbers, setNumbers] = useState<number[]>([]);

	const isCoolingDown = useRef(false);
	const debounceTimer = useRef<any>(-1);
	const pickButtonRef = useRef<HTMLButtonElement>(null);
	const [showCards, setShowCards] = useState<boolean>(false);

	const startCooldown = () => {
		isCoolingDown.current = true;
		if (pickButtonRef.current) pickButtonRef.current.disabled = true;

		debounceTimer.current = setTimeout(() => {
			if (pickButtonRef.current) pickButtonRef.current.disabled = false;
			isCoolingDown.current = false;
		}, 500);
	}

	const resetNumbers = () => {
		clearTimeout(debounceTimer.current);
		debounceTimer.current = -1;
		if (pickButtonRef.current) pickButtonRef.current.disabled = false;

		setNumbers([]);
		saveNumbers([]);
	}

	const pickRandomNumber = () => {
		if (isCoolingDown.current) return;

		startCooldown();

		setNumbers(n => {
			if (n.length == 75) {
				return n;
			}

			let randomNumber = Math.ceil(Math.random() * 75);

			while (n.indexOf(randomNumber) > -1) {
				randomNumber = Math.ceil(Math.random() * 75);
			}

			n.push(randomNumber);
			saveNumbers(n);

			return [...n];
		})
	}

	useEffect(() => {
		if (isCoolingDown.current) return;
		setNumbers(loadNumbers);
	})

	return (
		<>
			<DocumentTitle title='BINgo!' />
			<div className='main container noprint'>
				<section className='section'>
					<div>
						<div className='columns is-mobile'>
							<div className='column is-8'>
								<h1 className='title has-text-light'>BINgo</h1>
							</div>
							<div className='column is-4 has-text-right'>
								<button className='button is-size-7 is-rounded is-info' onClick={() => setShowCards(true)}>Generate Cards</button>
							</div>
						</div>
						<div className='columns is-mobile'>
							<div className='column'>
								<button ref={pickButtonRef} className='button is-rounded is-success is-size-3' onClick={pickRandomNumber}>Pick Number</button>
							</div>
							<div className='column has-text-right'>
								<button className='button is-rounded is-danger is-size-7' onClick={resetNumbers}>RESET</button>
							</div>
						</div>
						{numbers.length >= 75 ?
							<div className='notification is-info is-rounded is-size-1 has-text-centered'>All numbers have been called!</div>
							: <></>}
						<div className='number-holder columns'>
							{numbers.reverse().map((n, i) => <span className={'column ' + (i == 0 ? 'latest' : 'is-size-3')} key={i}>{n}</span>)}
						</div>
					</div>
				</section>
			</div>
			{showCards ?
				<Curtain>
					<button className='noprint button is-size-7 is-danger is-rounded' onClick={() => setShowCards(false)}>Close Cards</button>
					<CardHolder count={10} />
				</Curtain>
				: <></>}
		</>
	)
}