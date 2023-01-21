import React, { useEffect } from 'react';

export default function DocumentTitle(props: { title: string; }) {
	useEffect(() => {
		document.title = props.title
	}, [props])
	return (<></>)
}