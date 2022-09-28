// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-unused-vars */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-console */
// list/tablePDF.js

import jsPDF from 'jspdf';
import 'jspdf-autotable';
import moment from 'moment';
import rehbarLogo from '../../../../../../assets/logos/reh_kbd/logo_Voucher.png';
// import pakLogo from '../../../../assets/images/logo/size-2.png';
// Date Fns is used to format the dates we receive
// from our API call
// import { format } from "date-fns"
// ** Store & Actions

// define a GeneratePDF function that accepts a tickets argument
const GeneratePDF = (data1, type) => {
	// initialize jsPDF

	//* *********************** Fuctions */

	//* *********************** Fuctions */
	// eslint-disable-next-line new-cap
	const doc = new jsPDF('p', 'pt', 'a4');

	// ****************** Top  Details
	// const rowsTopDetails = [];
	// const topDetails = [
	// 	{
	// 		content: `Paid To   `,
	// 		colSpan: 4,
	// 		rowSpan: 1,
	// 		styles: { halign: 'left', fontStyle: 'bold', fontSize: 10 },
	// 	},
	// 	// {
	// 	// 	content: `${data1.name} `,
	// 	// 	colSpan: 1,
	// 	// 	rowSpan: 1,
	// 	// 	styles: { halign: 'left', fontStyle: 'bold', fontSize: 10 },
	// 	// },
	// 	// {
	// 	// 	content: `Date `,
	// 	// 	colSpan: 1,
	// 	// 	rowSpan: 1,
	// 	// 	styles: { halign: 'left', fontStyle: 'bold', fontSize: 10 },
	// 	// },
	// 	{
	// 		content: `${data1.date} `,
	// 		colSpan: 2,
	// 		rowSpan: 1,
	// 		styles: { halign: 'left', fontStyle: 'bold', fontSize: 10 },
	// 	},
	// ];
	// rowsTopDetails.push(topDetails);
	// ****************** Top Details Ends

	// ****************** Table Details Starts
	const rowsLand = [];
	const columnsLand = [
		'Sr No',
		'Account Cr/ Dr',
		'Description',
		'Amount Dr (Rs)',
		'Amount Cr (Rs)',
	];
	let count = 0;
	data1.voucher_transactions.forEach((data) => {
		count += 1;
		const dataLand = [
			count,

			`${data.coa_account.code}-${data.coa_account.name}`,
			data.description,
			data.debit.toLocaleString(undefined, {
				maximumFractionDigits: 2,
			}),
			data.credit.toLocaleString(undefined, {
				maximumFractionDigits: 2,
			}),
		];
		rowsLand.push(dataLand);
	});

	const landTotal = [
		{
			content: `Cheque No:`,
			colSpan: 1,
			rowSpan: 1,
			styles: { halign: 'left', fontStyle: 'normal', fontSize: 10 },
		},
		{
			content: `${data1.cheque_no !== null ? data1.cheque_no : 'none'}`,
			colSpan: 1,
			rowSpan: 1,
			styles: { halign: 'left', fontStyle: 'normal', fontSize: 10 },
		},
		{
			content: `Total`,
			colSpan: 1,
			rowSpan: 1,
			styles: { halign: 'right', fontStyle: 'bold', fontSize: 10 },
		},
		{
			content: `${data1.total_amount.toLocaleString(undefined, {
				maximumFractionDigits: 2,
			})} `,
			colSpan: 1,
			rowSpan: 1,
			styles: { halign: 'left', fontStyle: 'bold', fontSize: 10 },
		},
	];
	rowsLand.push(landTotal);
	const landTotal2 = [
		{
			content: `Cheque date:`,
			colSpan: 1,
			rowSpan: 1,
			styles: { halign: 'left', fontStyle: 'normal', fontSize: 10 },
		},
		{
			content: `${data1.cheque_no !== null ? data1.cheque_date : 'none'}`,
			colSpan: 3,
			rowSpan: 1,
			styles: { halign: 'left', fontStyle: 'normal', fontSize: 10 },
		},
	];
	if (data1.cheque_no !== null) {
		rowsLand.push(landTotal2);
	}

	const landTotal3 = [
		{
			content: `Amount in Words:`,
			colSpan: 1,
			rowSpan: 2,
			styles: { halign: 'left', fontStyle: 'normal', fontSize: 10 },
		},
		{
			content: ``,
			colSpan: 3,
			rowSpan: 2,
			styles: { halign: 'left', fontStyle: 'normal', fontSize: 10 },
		},
	];
	rowsLand.push(landTotal3);

	// ****************** Land Details Ends
	// ****************** Get Land Details Starts
	// let debitAccountName = '';
	// data1.voucher_transactions.forEach((data) => {
	// 	if (data.debit !== 0) {
	// 		debitAccountName = data.coa_account.name;
	// 	}
	// });
	// ****************** Cleared Land Details Ends
	// ****************** Summary   Details Starts
	const tableRowsSummary = [];
	const tableColumnSummary = ['Signatures'];
	const TableDataSummary = [
		{
			// content: `Total Land in marlas:   ${data1.form1.file_no}`,
			content: `Prepared by: `,
			colSpan: 1,
			rowSpan: 1,
			styles: { halign: 'left', fontStyle: 'bold', fontSize: 10 },
		},
	];
	tableRowsSummary.push(TableDataSummary);
	const TableDataSummary2 = [
		{
			// content: `Total Land in marlas:   ${data1.form1.file_no}`,
			content: `Verified by: `,
			colSpan: 1,
			rowSpan: 1,
			styles: { halign: 'left', fontStyle: 'bold', fontSize: 10 },
		},
	];
	tableRowsSummary.push(TableDataSummary2);
	const TableDataSummary3 = [
		{
			// content: `Total Land in marlas:   ${data1.form1.file_no}`,
			content: `Approved by: `,
			colSpan: 1,
			rowSpan: 1,
			styles: { halign: 'left', fontStyle: 'bold', fontSize: 10 },
		},
	];
	tableRowsSummary.push(TableDataSummary3);
	const TableDataSummary4 = [
		{
			// content: `Total Land in marlas:   ${data1.form1.file_no}`,
			content: `Received by: `,
			colSpan: 1,
			rowSpan: 1,
			styles: { halign: 'left', fontStyle: 'bold', fontSize: 10 },
		},
	];
	tableRowsSummary.push(TableDataSummary4);

	// ****************** Summary  Details Ends

	let yPos = 100;
	doc.addImage(rehbarLogo, 'JPEG', 25, 20, 110, 80);
	yPos += 5;
	doc.setFont(undefined, 'bold');
	doc.text('REHBAR HOUSING SOCIETY', 200, 40);
	doc.setFontSize(12);
	doc.setFont(undefined, 'normal');
	// // doc.text('Phone No: 051 512622', 230, 55);
	doc.text('Journal Voucher', 230, 70);

	doc.setFont(undefined, 'normal');

	// yPos += 20;
	// doc.text(`Received From:`, 45, yPos);
	// doc.text(`${data1.name}`, 135, yPos);
	// doc.text(`______________________________`, 135, yPos);

	doc.text(`Date:`, 430, yPos);
	doc.text(`______________`, 460, yPos);
	doc.text(`${moment(data1.date).format('DD/MM/YY')}`, 460, yPos);
	yPos += 20;

	// doc.text(`Account (Dr):`, 45, yPos);
	// doc.text(`${debitAccountName}`, 135, yPos);
	// doc.text(`______________________________`, 135, yPos);

	doc.text(`V.no:`, 430, yPos);
	doc.text(`______________`, 460, yPos);
	doc.text(` ${data1.id}`, 460, yPos);
	yPos += 10;
	// doc.text(`Account (Dr): ${debitAccountName}`, 47, yPos);
	// yPos += 20;

	// ****************** Main Details
	// doc.autoTable(['ddd', 'ddd', 'ddd'], rowsTopDetails, { startY: yPos, styles: { fontSize: 8 } });
	// yPos = doc.lastAutoTable.finalY + 20;
	// doc.text('Total Land', 47, yPos);
	// yPos += 10;
	// ****************** Land Details
	doc.autoTable(columnsLand, rowsLand, { startY: yPos, styles: { fontSize: 8 } });
	yPos = doc.lastAutoTable.finalY + 20;
	// doc.text('Cleared  Land', 47, yPos);
	// yPos += 10;
	// ****************** Cleared Land Details
	// ****************** Summary
	yPos += 20;
	doc.text(
		'______________             ______________             ______________                ______________',
		45,
		yPos,
	);
	yPos += 15;
	doc.text(
		`   Prepared by                       Verified by                        Approved by                         Received by `,
		45,
		yPos,
	);
	yPos += 20;
	// doc.autoTable(tableColumnSummary, tableRowsSummary, {
	// 	startY: yPos,
	// 	styles: { fontSize: 8, height: 80 },
	// });
	// yPos = doc.lastAutoTable.finalY + 20;
	// ****************** Summary ends

	// doc.text('Logo', 47, 26);
	doc.setFontSize(24);
	doc.setFont('arial');
	doc.setFont(undefined, 'bold');

	doc.setFontSize(12);
	doc.setFont('arial');

	doc.setFontSize(10);
	doc.setFont('normal');
	doc.setFont(undefined, 'normal');
	// Footer Starts
	doc.page = 1;
	// doc.text(150, yPos, `Print date: ${Date()}`);
	doc.text(`Date Printed:`, 380, yPos);
	doc.text(`____________________`, 440, yPos);
	doc.text(`${moment().format('DD-MM-YYYY')}`, 440, yPos);
	doc.page += 1;
	// Footer Ends
	const date = Date().split(' ');
	// we use a date string to generate our filename.
	const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];

	// Footer
	let str = `Page ${doc.internal.getNumberOfPages()}`;

	if (typeof doc.putTotalPages === 'function') {
		str = `${str} of ${doc.internal.getNumberOfPages()}`;
	}
	doc.setFontSize(10);

	// jsPDF 1.4+ uses getWidth, <1.4 uses .width
	// eslint-disable-next-line prefer-destructuring
	const pageSize = doc.internal.pageSize;
	const pageHeight = pageSize.getHeight();
	doc.text(str, 40, pageHeight - 15);

	if (type === 1) {
		doc.save(`Voucher_JV_${data1.id}_${dateStr}.pdf`);
	} else if (type === 2) {
		doc.output('dataurlnewwindow');
	}
};

export default GeneratePDF;
