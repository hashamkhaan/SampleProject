import * as React from 'react';

function SvgTabletAndroid(props) {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			height='1em'
			viewBox='0 0 24 24'
			width='1em'
			className='svg-icon'
			{...props}>
			<path d='M0 0h24v24H0V0zm0 0h24v24H0V0z' fill='none' />
			<path d='M4.75 3h14.5v16H4.75z' opacity={0.3} />
			<path d='M18 0H6C4.34 0 3 1.34 3 3v18c0 1.66 1.34 3 3 3h12c1.66 0 3-1.34 3-3V3c0-1.66-1.34-3-3-3zm-4 22h-4v-1h4v1zm5.25-3H4.75V3h14.5v16z' />
		</svg>
	);
}

export default SvgTabletAndroid;
