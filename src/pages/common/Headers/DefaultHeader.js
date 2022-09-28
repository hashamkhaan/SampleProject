import React from 'react';
// eslint-disable-next-line no-unused-vars
import Header, { HeaderLeft } from '../../../layout/Header/Header';
// eslint-disable-next-line no-unused-vars
import Navigation from '../../../layout/Navigation/Navigation';
// eslint-disable-next-line no-unused-vars
import { componentsMenu, layoutMenu } from '../../../menu';
import useDeviceScreen from '../../../hooks/useDeviceScreen';
import CommonHeaderRight from './CommonHeaderRight';

const DefaultHeader = () => {
	// eslint-disable-next-line no-unused-vars
	const deviceScreen = useDeviceScreen();
	return (
		<Header>
			<HeaderLeft />
			<CommonHeaderRight />
		</Header>
	);
};

export default DefaultHeader;
