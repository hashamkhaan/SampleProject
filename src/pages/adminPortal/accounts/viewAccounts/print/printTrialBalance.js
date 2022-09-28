// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-unused-vars */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-console */
// list/tablePDF.js

import jsPDF from 'jspdf';
import 'jspdf-autotable';
import moment from 'moment';
import rehbarLogo from '../../../../../assets/logos/reh_kbd/rehbar.png';
import kbdLogo from '../../../../../assets/logos/reh_kbd/kbd.png';

const GeneratePDF = (data1, type, startDate, endDate) => {
	// initialize jsPDF

	// eslint-disable-next-line new-cap
	const doc = new jsPDF('p', 'pt', 'a4');
	const pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
	const pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();
	// Functions Starts
	let count = 0;
	let drTotal = 0;
	let crTotal = 0;
	const CalcluateTotalDr = (amount) => {
		drTotal += parseFloat(Math.abs(amount));
	};
	const CalcluateTotalCr = (amount) => {
		crTotal += parseFloat(Math.abs(amount));
	};
	// Functions Ends
	let yPos = 80;
	// doc.addImage(rehbarLogo, 'JPEG', 25, 20, 110, 80);
	// doc.addImage(kbdLogo, 'JPEG', 470, 20, 110, 80);
	// yPos += 10;
	doc.setFont(undefined, 'bold');
	doc.text('REHBAR HOUSING SOCIETY', 200, 40);
	doc.setFontSize(12);
	doc.setFont(undefined, 'normal');
	doc.text('Trial Balance', pageWidth / 2, 55, { align: 'center' });
	doc.text(
		`From ${moment(startDate).format('MMMM D, YYYY')} To ${moment(endDate).format(
			'MMMM D, YYYY',
		)}`,
		pageWidth / 2,
		70,
		{ align: 'center' },
	);
	// Start

	const rowsMain = [];
	const columnsMain = ['Code', 'Account', 'Debit', 'Credit'];
	// Assets Starts
	if (data1.assets !== undefined) {
		data1.assets.forEach((data) => {
			// const TableData = ['', `${data.name}`, '-', '-'];
			// rowsMain.push(TableData);
			if (data.non_depreciation_sub_groups !== undefined) {
				data.non_depreciation_sub_groups.forEach((itemSubGroups) => {
					const TableData2 = [`${itemSubGroups.code}`, `${itemSubGroups.name}`, '', ''];
					rowsMain.push(TableData2);
					if (itemSubGroups.coa_accounts !== undefined) {
						itemSubGroups.coa_accounts.forEach((itemAccounts) => {
							let TableData3 = [];
							if (itemAccounts.balance !== null) {
								if (itemAccounts.balance.balance > 0) {
									TableData3 = [
										`${itemAccounts.code}`,
										`    ${itemAccounts.name}`,
										`${Math.abs(itemAccounts.balance.balance).toLocaleString(
											undefined,
											{
												maximumFractionDigits: 2,
											},
										)}`,
										'0',
									];
									CalcluateTotalDr(itemAccounts.balance.balance);
								} else if (itemAccounts.balance.balance < 0) {
									TableData3 = [
										`${itemAccounts.code}`,
										`    ${itemAccounts.name}`,
										'0',
										`${Math.abs(itemAccounts.balance.balance).toLocaleString(
											undefined,
											{
												maximumFractionDigits: 2,
											},
										)}`,
									];
									CalcluateTotalCr(itemAccounts.balance.balance);
								}
							} else {
								TableData3 = [
									`${itemAccounts.code}`,
									`    ${itemAccounts.name}`,
									'0',
									'0',
								];
							}
							rowsMain.push(TableData3);
							count += 1;
						});
					}
				});
			}
		});
	}
	// Assets Ends
	// liabilities Starts
	if (data1.liabilities !== undefined) {
		data1.liabilities.forEach((data) => {
			// const TableData = ['', `${data.name}`, '-', '-'];
			// rowsMain.push(TableData);
			if (data.coa_sub_groups !== undefined) {
				data.coa_sub_groups.forEach((itemSubGroups) => {
					const TableData2 = [`${itemSubGroups.code}`, `${itemSubGroups.name}`, '', ''];
					rowsMain.push(TableData2);
					if (itemSubGroups.coa_accounts !== undefined) {
						itemSubGroups.coa_accounts.forEach((itemAccounts) => {
							let TableData3 = [];
							if (itemAccounts.balance !== null) {
								if (itemAccounts.balance.balance > 0) {
									TableData3 = [
										`${itemAccounts.code}`,
										`    ${itemAccounts.name}`,
										`${Math.abs(itemAccounts.balance.balance).toLocaleString(
											undefined,
											{
												maximumFractionDigits: 2,
											},
										)}`,
										'0',
									];
									CalcluateTotalDr(itemAccounts.balance.balance);
								} else if (itemAccounts.balance.balance < 0) {
									TableData3 = [
										`${itemAccounts.code}`,
										`    ${itemAccounts.name}`,
										'0',
										`${Math.abs(itemAccounts.balance.balance).toLocaleString(
											undefined,
											{
												maximumFractionDigits: 2,
											},
										)}`,
									];
									CalcluateTotalCr(itemAccounts.balance.balance);
								}
							} else {
								TableData3 = [
									`${itemAccounts.code}`,
									`    ${itemAccounts.name}`,
									'0',
									'0',
								];
							}
							rowsMain.push(TableData3);
							count += 1;
						});
					}
				});
			}
		});
	}
	// liabilities Ends
	// capital Starts
	if (data1.capital !== undefined) {
		data1.capital.forEach((data) => {
			// const TableData = ['', `${data.name}`, '-', '-'];
			// rowsMain.push(TableData);
			if (data.coa_sub_groups !== undefined) {
				data.coa_sub_groups.forEach((itemSubGroups) => {
					const TableData2 = [`${itemSubGroups.code}`, `${itemSubGroups.name}`, '', ''];
					rowsMain.push(TableData2);
					if (itemSubGroups.coa_accounts !== undefined) {
						itemSubGroups.coa_accounts.forEach((itemAccounts) => {
							let TableData3 = [];
							if (itemAccounts.balance !== null) {
								if (itemAccounts.balance.balance > 0) {
									TableData3 = [
										`${itemAccounts.code}`,
										`    ${itemAccounts.name}`,
										`${Math.abs(itemAccounts.balance.balance).toLocaleString(
											undefined,
											{
												maximumFractionDigits: 2,
											},
										)}`,
										'0',
									];
									CalcluateTotalDr(itemAccounts.balance.balance);
								} else if (itemAccounts.balance.balance < 0) {
									TableData3 = [
										`${itemAccounts.code}`,
										`    ${itemAccounts.name}`,
										'0',
										`${Math.abs(itemAccounts.balance.balance).toLocaleString(
											undefined,
											{
												maximumFractionDigits: 2,
											},
										)}`,
									];
									CalcluateTotalCr(itemAccounts.balance.balance);
								}
							} else {
								TableData3 = [
									`${itemAccounts.code}`,
									`    ${itemAccounts.name}`,
									'0',
									'0',
								];
							}
							rowsMain.push(TableData3);
							count += 1;
						});
					}
				});
			}
		});
	}
	// capital Ends
	// revenues Starts
	if (data1.revenues !== undefined) {
		data1.revenues.forEach((data) => {
			// const TableData = ['', `${data.name}`, '-', '-'];
			// rowsMain.push(TableData);
			if (data.coa_sub_groups !== undefined) {
				data.coa_sub_groups.forEach((itemSubGroups) => {
					const TableData2 = [`${itemSubGroups.code}`, `${itemSubGroups.name}`, '', ''];
					rowsMain.push(TableData2);
					if (itemSubGroups.coa_accounts !== undefined) {
						itemSubGroups.coa_accounts.forEach((itemAccounts) => {
							let TableData3 = [];
							if (itemAccounts.balance !== null) {
								if (itemAccounts.balance.balance > 0) {
									TableData3 = [
										`${itemAccounts.code}`,
										`    ${itemAccounts.name}`,
										`${Math.abs(itemAccounts.balance.balance).toLocaleString(
											undefined,
											{
												maximumFractionDigits: 2,
											},
										)}`,
										'0',
									];
									CalcluateTotalDr(itemAccounts.balance.balance);
								} else if (itemAccounts.balance.balance < 0) {
									TableData3 = [
										`${itemAccounts.code}`,
										`    ${itemAccounts.name}`,
										'0',
										`${Math.abs(itemAccounts.balance.balance).toLocaleString(
											undefined,
											{
												maximumFractionDigits: 2,
											},
										)}`,
									];
									CalcluateTotalCr(itemAccounts.balance.balance);
								}
							} else {
								TableData3 = [
									`${itemAccounts.code}`,
									`    ${itemAccounts.name}`,
									'0',
									'0',
								];
							}
							rowsMain.push(TableData3);
							count += 1;
						});
					}
				});
			}
		});
	}
	// revenues Ends
	// expenses Starts
	if (data1.expenses !== undefined) {
		data1.expenses.forEach((data) => {
			// const TableData = ['', `${data.name}`, '-', '-'];
			// rowsMain.push(TableData);
			if (data.coa_sub_groups !== undefined) {
				data.coa_sub_groups.forEach((itemSubGroups) => {
					const TableData2 = [`${itemSubGroups.code}`, `${itemSubGroups.name}`, '', ''];
					rowsMain.push(TableData2);
					if (itemSubGroups.coa_accounts !== undefined) {
						itemSubGroups.coa_accounts.forEach((itemAccounts) => {
							let TableData3 = [];
							if (itemAccounts.balance !== null) {
								if (itemAccounts.balance.balance > 0) {
									TableData3 = [
										`${itemAccounts.code}`,
										`    ${itemAccounts.name}`,
										`${Math.abs(itemAccounts.balance.balance).toLocaleString(
											undefined,
											{
												maximumFractionDigits: 2,
											},
										)}`,
										'0',
									];
									CalcluateTotalDr(itemAccounts.balance.balance);
								} else if (itemAccounts.balance.balance < 0) {
									TableData3 = [
										`${itemAccounts.code}`,
										`    ${itemAccounts.name}`,
										'0',
										`${Math.abs(itemAccounts.balance.balance).toLocaleString(
											undefined,
											{
												maximumFractionDigits: 2,
											},
										)}`,
									];
									CalcluateTotalCr(itemAccounts.balance.balance);
								}
							} else {
								TableData3 = [
									`${itemAccounts.code}`,
									`    ${itemAccounts.name}`,
									'0',
									'0',
								];
							}
							rowsMain.push(TableData3);
							count += 1;
						});
					}
				});
			}
		});
	}
	// expenses Ends
	// End
	const TableDataTotal = ['', `Totals`, `${drTotal}`, `${crTotal}`];
	rowsMain.push(TableDataTotal);
	yPos += 15;
	doc.setFont(undefined, 'normal');

	// doc.text(`File no:`, 45, yPos);
	// doc.text(`${data1.form1.file_no}`, 90, yPos);
	// doc.text(`__________________`, 90, yPos);
	doc.setFontSize(10);

	doc.autoTable(columnsMain, rowsMain, {
		theme: 'grid',
		headStyles: {
			fillColor: [255, 255, 255],
			textColor: [0, 0, 0],
			lineWidth: 1,
			lineColor: [0, 0, 0],
		},
		bodyStyles: {
			fillColor: [255, 255, 255],
			textColor: [0, 0, 0],
			lineWidth: 1,
			lineColor: [0, 0, 0],
		},
		startY: yPos,
		styles: { fontSize: 12 },
	});
	yPos = doc.lastAutoTable.finalY + 20;
	// doc.text(`File name:`, 45, yPos);
	// doc.text(`${data1.form1.file_name}`, 105, yPos);
	// doc.text(`__________________`, 105, yPos);

	yPos += 5;
	doc.text(`Date Printed: ${moment().format('DD-MM-YYYY hh:mm:ss a')}`, pageWidth - 40, yPos, {
		align: 'right',
	});
	// ****************** Main Details
	// doc.autoTable(columnsMain, rowsMain, { startY: yPos, styles: { fontSize: 8 } });
	// yPos = doc.lastAutoTable.finalY + 20;
	// doc.text('Total Land', 47, yPos);
	// yPos += 10;
	// ****************** Land Details

	// ****************** Cleared Land Details

	// doc.text('Logo', 47, 26);
	doc.setFontSize(24);
	doc.setFont('arial');
	doc.setFont(undefined, 'bold');

	doc.setFontSize(12);
	doc.setFont('arial');
	doc.setFont(undefined, 'bold');
	// doc.text('ABC Near GT Road Rawalpindi', 47, 26);
	// doc.text('Report I', 47, 32);
	doc.setFontSize(12);
	doc.setFont('normal');
	doc.setFont(undefined, 'normal');
	// Footer Starts
	doc.page = 1;
	// doc.text(150, yPos, `Print date: ${Date()}`);
	doc.page += 1;
	// Footer Ends
	const date = Date().split(' ');
	// we use a date string to generate our filename.
	const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
	// const myImage = require('../../../../assets/images/logo/logo-dark.png');
	// doc.text(`Qutation No : QT-00${sorted11[0].masterID}`, 14, 48);
	// doc.text(`Date : ${sorted11[0].Quotation_date}`, 130, 48);
	// doc.text(`Profile Name : ${sorted11[0].profileName}`, 130, 42);
	// doc.text(`Client Name : ${sorted11[0].name}`, 14, 42);
	// doc.text(`Total : ${sorted11[0].Quotation1_Total}`, 130, 95)
	// doc.text(`Sale Tax : ${sorted11[0].Quotation1_sales_tax}`, 130, 100)
	// doc.text(`Discount : ${sorted11[0].Quotation1_Discount}`, 130, 105)
	// doc.text(`Net Total : ${sorted11[0].Quotation1_total_amount}`, 130, 110)
	// we define the name of our PDF file.

	// Footer
	let str = `Page ${doc.internal.getNumberOfPages()}`;
	// Total page number plugin only available in jspdf v1.0+
	if (typeof doc.putTotalPages === 'function') {
		str = `${str} of ${doc.internal.getNumberOfPages()}`;
	}
	doc.setFontSize(10);

	// jsPDF 1.4+ uses getWidth, <1.4 uses .width
	// eslint-disable-next-line prefer-destructuring
	const pageSize = doc.internal.pageSize;

	doc.text(str, 40, pageHeight - 15);

	if (type === 1) {
		doc.save(`TrialBalance${dateStr}.pdf`);
	} else if (type === 2) {
		doc.output('dataurlnewwindow');
	}
};

export default GeneratePDF;
