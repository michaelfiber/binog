import React, { ReactElement } from 'react';

export default function Curtain(props: { children: ReactElement | ReactElement[] }) {
	return (
		<div className='curtain'>
			<div className='content'>
				{props.children}
			</div>
		</div>
	)
}