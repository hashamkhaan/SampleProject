import * as React from 'react';

function SvgInfoLg(props) {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='1em'
			height='1em'
			fill='currentColor'
			className='svg-icon'
			viewBox='0 0 16 16'
			{...props}>
			<path d='M9.708 6.075l-3.024.379-.108.502.595.108c.387.093.464.232.38.619l-.975 4.577c-.255 1.183.14 1.74 1.067 1.74.72 0 1.554-.332 1.933-.789l.116-.549c-.263.232-.65.325-.905.325-.363 0-.494-.255-.402-.704l1.323-6.208zm.091-2.755a1.32 1.32 0 11-2.64 0 1.32 1.32 0 012.64 0z' />
		</svg>
	);
}

export default SvgInfoLg;
