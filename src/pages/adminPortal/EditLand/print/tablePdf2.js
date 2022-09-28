// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-unused-vars */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-console */
// list/tablePDF.js

import jsPDF from 'jspdf';
import 'jspdf-autotable';
// import pakLogo from '../../../../assets/images/logo/size-2.png';
// Date Fns is used to format the dates we receive
// from our API call
// import { format } from "date-fns"
// ** Store & Actions

// define a GeneratePDF function that accepts a tickets argument
const GeneratePDF = (data1, type) => {
	// initialize jsPDF

	// eslint-disable-next-line new-cap
	const doc = new jsPDF('p', 'pt', 'a4');

	let totalPaymentIssued = 0;
	let totalPaymentIssuedPending = 0;
	let totalPaymentIssuedCleared = 0;
	let totalExpenses = 0;
	let totalTaxes = 0;

	// define the columns we want and their titles
	const tableColumnPayments = [
		'Sr No',
		'date',
		'payee ',
		'payer ',
		'transaction_type  ',
		'amount   ',
		'paid_status',
		'remarks',
	];
	const tableColumnExpenses = [
		'Sr No',
		'date',
		'Exp Type ',

		'transaction_type  ',
		'amount   ',
		'paid_status',
		'remarks',
	];
	const tableColumnTaxes = [
		'Sr No',
		'date',
		'Tax Type ',

		'transaction_type  ',
		'amount   ',
		'paid_status',
		'remarks',
	];
	const tableRowsPayments = [];
	const tableRowsExpenses = [];
	const tableRowsTaxes = [];
	data1.payments.forEach((data) => {
		const TableData = [
			data.id + 1,
			data.date,
			data.payee.label,
			data.payer.label,
			data.transaction_type,
			data.amount,
			data.paid_status === true ? 'Cleared' : 'Pending',
			data.description,
		];
		totalPaymentIssued += parseFloat(data.amount);
		if (data.paid_status === true) {
			totalPaymentIssuedCleared += parseFloat(data.amount);
		} else {
			totalPaymentIssuedPending += parseFloat(data.amount);
		}
		tableRowsPayments.push(TableData);
	});
	// Expenses starts
	data1.expenses.forEach((data) => {
		const TableData = [
			data.id + 1,
			data.date,
			data.expense_type.label,

			data.transaction_type,
			data.amount,
			data.paid_status === true ? 'Cleared' : 'Pending',
			data.description,
			// called date-fns to format the date on the ticket
			//   format(new Date(data.updated_at), "yyyy-MM-dd")
		];
		// push each tickcet's info into a row
		totalExpenses += parseFloat(data.amount);
		tableRowsExpenses.push(TableData);
	});
	tableRowsExpenses.push([
		{
			content: `Total Expenses  `,
			colSpan: 4,
			rowSpan: 1,
			styles: { halign: 'center', fontStyle: 'bold', fontSize: 10 },
		},
		{
			content: `  ${totalExpenses}`,
			colSpan: 1,
			rowSpan: 1,
			styles: { halign: 'left', fontStyle: 'bold', fontSize: 10 },
		},
	]);
	// Expenses ended
	// Taxes starts
	data1.taxes.forEach((data) => {
		const TableData = [
			data.id + 1,
			data.date,
			data.tax_type.label,

			data.transaction_type,
			data.amount,
			data.paid_status === true ? 'Cleared' : 'Pending',
			data.description,
		];
		totalTaxes += parseFloat(data.amount);
		tableRowsTaxes.push(TableData);
	});
	tableRowsTaxes.push([
		{
			content: `Total Taxes  `,
			colSpan: 4,
			rowSpan: 1,
			styles: { halign: 'center', fontStyle: 'bold', fontSize: 10 },
		},
		{
			content: `  ${totalTaxes}`,
			colSpan: 1,
			rowSpan: 1,
			styles: { halign: 'left', fontStyle: 'bold', fontSize: 10 },
		},
	]);
	// Taxes ended

	const TableDataTotal = [
		{
			content: `Total Pyment Issued `,
			colSpan: 5,
			rowSpan: 1,
			styles: { halign: 'center', fontStyle: 'bold', fontSize: 10 },
		},
		{
			content: `  ${totalPaymentIssued}`,
			colSpan: 1,
			rowSpan: 1,
			styles: { halign: 'left', fontStyle: 'bold', fontSize: 10 },
		},
	];

	tableRowsPayments.push(TableDataTotal);
	tableRowsPayments.push([
		{
			content: `Cleared Amount til Date `,
			colSpan: 5,
			rowSpan: 1,
			styles: { halign: 'center', fontStyle: 'bold', fontSize: 10 },
		},
		{
			content: `  ${totalPaymentIssuedCleared}`,
			colSpan: 1,
			rowSpan: 1,
			styles: { halign: 'left', fontStyle: 'bold', fontSize: 10 },
		},
	]);
	tableRowsPayments.push([
		{
			content: `Pending Amount til Date  `,
			colSpan: 5,
			rowSpan: 1,
			styles: { halign: 'center', fontStyle: 'bold', fontSize: 10 },
		},
		{
			content: `  ${totalPaymentIssuedPending}`,
			colSpan: 1,
			rowSpan: 1,
			styles: { halign: 'left', fontStyle: 'bold', fontSize: 10 },
		},
	]);
	// startY is basically margin-top
	let yPos = 100;
	//

	doc.text(`File # ${data1.form1.file_no}`, 47, yPos);
	yPos += 20;
	doc.text('Payments Transactions', 47, yPos);
	yPos += 5;

	doc.autoTable(tableColumnPayments, tableRowsPayments, {
		startY: yPos,
		styles: { fontSize: 8 },
	});
	yPos = doc.lastAutoTable.finalY + 20;
	doc.text(' Expenses', 47, yPos);
	yPos += 5;

	doc.autoTable(tableColumnExpenses, tableRowsExpenses, {
		startY: yPos,
		styles: { fontSize: 8 },
	});
	yPos = doc.lastAutoTable.finalY + 20;
	doc.text(' Taxes', 47, yPos);
	yPos += 5;

	doc.autoTable(tableColumnTaxes, tableRowsTaxes, {
		startY: yPos,
		styles: { fontSize: 8 },
	});
	yPos = doc.lastAutoTable.finalY + 20;
	//
	doc.setFontSize(12);

	// doc.text('Logo', 47, 26);
	doc.setFontSize(24);
	doc.setFont('arial');
	doc.setFont(undefined, 'bold');
	doc.text('Kashmir Builders and Developers', 46, 20);
	doc.setFontSize(12);
	doc.setFont('arial');
	doc.setFont(undefined, 'bold');
	// doc.text('ABC Near GT Road Rawalpindi', 47, 26);
	doc.text('Report II', 47, 32);
	doc.setFontSize(12);
	doc.setFont('normal');
	doc.setFont(undefined, 'normal');
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

	if (type === 1) {
		doc.save(`Report 1${dateStr}.pdf`);
	} else if (type === 2) {
		doc.output('dataurlnewwindow');
	}
};

export default GeneratePDF;
