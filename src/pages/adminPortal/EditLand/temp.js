import React, { useState, Fragment } from 'react';
import Flatpickr from 'react-flatpickr';
import { Label } from 'reactstrap';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import Humans from '../../../assets/img/scene4.png';
import HumansWebp from '../../../assets/img/scene4.webp';
import { layoutMenu } from '../../../menu';
// ** Reactstrap Imports

const OnlyContent = () => {
	const [picker, setPicker] = useState(new Date());
	return (
		<PageWrapper title={layoutMenu.pageLayout.subMenu.onlyContent.text}>
			<Page>
				<div className='row d-flex align-items-center h-100'>
					<div
						className='col-12 d-flex justify-content-center'
						style={{ fontSize: 'calc(3rem + 3vw)' }}>
						<p>
							Only <span className='text-primary fw-bold ms-1'>Content</span>
						</p>
					</div>
					<div className='col-12 d-flex align-items-baseline justify-content-center'>
						<img
							srcSet={HumansWebp}
							src={Humans}
							alt='Humans'
							style={{ height: '50vh' }}
						/>
					</div>
				</div>
			</Page>
			<>
				<Label className='form-label' for='default-picker'>
					dfff
				</Label>
				<Flatpickr
					className='form-control'
					value={picker}
					onChange={(date) => setPicker(date)}
					id='default-picker'
				/>
			</>
		</PageWrapper>
	);
};

export default OnlyContent;
