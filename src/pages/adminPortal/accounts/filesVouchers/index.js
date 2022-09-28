// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-console */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Select from 'react-select';
import classNames from 'classnames';
import Checks, { ChecksGroup } from '../../../../components/bootstrap/forms/Checks';
import SubHeader, { SubHeaderLeft } from '../../../../layout/SubHeader/SubHeader';
import FormGroup from '../../../../components/bootstrap/forms/FormGroup';
import Breadcrumb from '../../../../components/bootstrap/Breadcrumb';
import Page from '../../../../layout/Page/Page';
import PageWrapper from '../../../../layout/PageWrapper/PageWrapper';
import AddCoeSubGroup from '../accountsHeadsSubgroups/modals/AddCoeSubGroup';
import AddAccount from '../accountsHeadsSubgroups/modals/AddAccount';
// import AddPersonAccount from './modals/AddPersonAccount';

import Button, { ButtonGroup } from '../../../../components/bootstrap/Button';
import Card, {
	CardActions,
	CardBody,
	CardCodeView,
	CardFooter,
	CardFooterLeft,
	CardFooterRight,
	CardHeader,
	CardLabel,
	CardSubTitle,
	CardTabItem,
	CardTitle,
} from '../../../../components/bootstrap/Card';
import Dropdown, {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from '../../../../components/bootstrap/Dropdown';
// ** Axios Imports
import baseURL from '../../../../baseURL/baseURL';
import useSortableData from '../../../../hooks/useSortableData';
import PaginationButtons, { dataPagination } from '../../../../components/PaginationButtons';
import useSelectTable from '../../../../hooks/useSelectTable';

import Icon from '../../../../components/icon/Icon';
import { componentsMenu } from '../../../../menu';
import PaymentVoucher from './PaymentVoucher/index';
import ReceiptVoucher from './ReceiptVoucher/index';
import JVVoucher from './JVVoucher/index';

const TablePage = () => {
	const [refreshSubgroupsView, setRefreshSubgroupsView] = useState(0);
	const [refreshAccountsView, setRefreshAccountsView] = useState(0);
	const refreshSubgroupsHandler = (arg) => {
		setRefreshSubgroupsView(arg);
	};
	const refreshAccountsHandler = (arg) => {
		setRefreshAccountsView(arg);
	};

	return (
		<Card hasTab tabButtonColor='info'>
			<CardTabItem id='tab-item-1' title='Land Payment Voucher' icon='Architecture'>
				<PaymentVoucher />
			</CardTabItem>

			<CardTabItem id='tab-item-2' title='Land Receipt Voucher' icon='Architecture'>
				<div className='row'>
					<div className='col-12'>
						<ReceiptVoucher />
					</div>
				</div>
			</CardTabItem>

			<CardTabItem id='tab-item-3' title='Land Journal Voucher' icon='Architecture'>
				<div className='row'>
					<div className='col-12'>
						<JVVoucher />
					</div>
				</div>
			</CardTabItem>
		</Card>
	);
};

export default TablePage;
