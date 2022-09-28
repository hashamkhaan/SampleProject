// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-unused-vars */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-console */
// list/tablePDF.js

import jsPDF from 'jspdf';
import 'jspdf-autotable';
import moment from 'moment';
import rehbarLogo from '../../../../assets/logos/reh_kbd/rehbar.png';
import kbdLogo from '../../../../assets/logos/reh_kbd/kbd.png';
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
		'payer ',
		'payee Seller ',
		'payee Agent',
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
	const bayanaRow = [
		1,

		moment(data1.stages[0].stage_date).format('DD-MM-YYYY'),
		'-',
		'-',
		'-',

		data1.stages[0].stage_name,
		data1.stages[0].amount.toLocaleString(undefined, {
			maximumFractionDigits: 2,
		}),

		'Cleared',
		data1.stages[0].description,
	];
	tableRowsPayments.push(bayanaRow);
	let count = 1;
	data1.payments.forEach((data) => {
		count += 1;
		const TableData = [
			count,

			moment(data.date).format('DD-MM-YYYY'),

			data.payer.label,
			data.payee_seller.label,
			data.payee_agent.label,

			data.transaction_type,
			data.amount.toLocaleString(undefined, {
				maximumFractionDigits: 2,
			}),

			data.paid_status === '1' ? 'Cleared' : 'Pending',
			data.description,
		];
		totalPaymentIssued += parseFloat(data.amount);
		if (data.paid_status === '1') {
			totalPaymentIssuedCleared += parseFloat(data.amount);
		} else {
			totalPaymentIssuedPending += parseFloat(data.amount);
		}
		tableRowsPayments.push(TableData);
	});
	totalPaymentIssued += parseFloat(data1.stages[0].amount);
	totalPaymentIssuedCleared += parseFloat(data1.stages[0].amount);
	// Expenses starts
	data1.expenses.forEach((data) => {
		const TableData = [
			data.id + 1,

			moment(data.date).format('DD-MM-YYYY'),
			data.expense_type.label,

			data.transaction_type,
			data.amount.toLocaleString(undefined, {
				maximumFractionDigits: 2,
			}),
			data.paid_status === '1' ? 'Cleared' : 'Pending',
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
			content: `  ${totalExpenses.toLocaleString(undefined, {
				maximumFractionDigits: 2,
			})}`,
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

			moment(data.date).format('DD-MM-YYYY'),
			data.tax_type.label,

			data.transaction_type,
			data.amount.toLocaleString(undefined, {
				maximumFractionDigits: 2,
			}),
			data.paid_status === '1' ? 'Cleared' : 'Pending',
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
			content: `  ${totalTaxes.toLocaleString(undefined, {
				maximumFractionDigits: 2,
			})}`,
			colSpan: 1,
			rowSpan: 1,
			styles: { halign: 'left', fontStyle: 'bold', fontSize: 10 },
		},
	]);
	// Taxes ended

	const TableDataTotal = [
		{
			content: `Total Payment Issued `,
			colSpan: 7,
			rowSpan: 1,
			styles: { halign: 'center', fontStyle: 'bold', fontSize: 10 },
		},
		{
			content: ` ${totalPaymentIssued.toLocaleString(undefined, {
				maximumFractionDigits: 2,
			})}`,
			colSpan: 1,
			rowSpan: 1,
			styles: { halign: 'left', fontStyle: 'bold', fontSize: 10 },
		},
	];
	tableRowsPayments.push([
		{
			content: `Total Land Value `,
			colSpan: 7,
			rowSpan: 1,
			styles: { halign: 'center', fontStyle: 'bold', fontSize: 10 },
		},
		{
			content: ` ${parseFloat(data1.form1.total_price).toLocaleString(undefined, {
				maximumFractionDigits: 2,
			})}`,
			colSpan: 1,
			rowSpan: 1,
			styles: { halign: 'left', fontStyle: 'bold', fontSize: 10 },
		},
	]);
	tableRowsPayments.push(TableDataTotal);

	tableRowsPayments.push([
		{
			content: `Cleared Amount til Date `,
			colSpan: 7,
			rowSpan: 1,
			styles: { halign: 'center', fontStyle: 'bold', fontSize: 10 },
		},
		{
			content: ` ${totalPaymentIssuedCleared.toLocaleString(undefined, {
				maximumFractionDigits: 2,
			})}`,
			colSpan: 1,
			rowSpan: 1,
			styles: { halign: 'left', fontStyle: 'bold', fontSize: 10 },
		},
	]);
	tableRowsPayments.push([
		{
			content: `Pending Amount til Date  `,
			colSpan: 7,
			rowSpan: 1,
			styles: { halign: 'center', fontStyle: 'bold', fontSize: 10 },
		},
		{
			content: `${totalPaymentIssuedPending.toLocaleString(undefined, {
				maximumFractionDigits: 2,
			})}`,
			colSpan: 1,
			rowSpan: 1,
			styles: { halign: 'left', fontStyle: 'bold', fontSize: 10 },
		},
	]);
	tableRowsPayments.push([
		{
			content: `Remaining Balance  `,
			colSpan: 7,
			rowSpan: 1,
			styles: { halign: 'center', fontStyle: 'bold', fontSize: 10 },
		},
		{
			content: `${(
				parseFloat(data1.form1.total_price) - totalPaymentIssuedCleared
			).toLocaleString(undefined, {
				maximumFractionDigits: 2,
			})}`,
			colSpan: 1,
			rowSpan: 1,
			styles: { halign: 'left', fontStyle: 'bold', fontSize: 10 },
		},
	]);
	// startY is basically margin-top

	let yPos = 100;
	doc.addImage(rehbarLogo, 'JPEG', 25, 20, 110, 80);
	doc.addImage(kbdLogo, 'JPEG', 470, 20, 110, 80);

	yPos += 10;
	doc.setFont(undefined, 'bold');
	doc.text('REHBAR HOUSING SOCIETY', 200, 40);
	doc.setFontSize(12);
	doc.setFont(undefined, 'normal');

	doc.text('File Transactions Report', 230, 55);

	doc.setFont(undefined, 'normal');

	doc.text(`File no:`, 45, yPos);
	doc.text(`${data1.form1.file_no}`, 90, yPos);
	doc.text(`__________________`, 90, yPos);
	doc.text(`Date Printed:`, 367, yPos);
	doc.text(`__________________`, 440, yPos);
	doc.text(`${moment().format('DD-MM-YYYY hh:mm:ss a')}`, 440, yPos);
	yPos += 20;
	doc.text(`File name:`, 45, yPos);
	doc.text(`${data1.form1.file_name}`, 105, yPos);
	doc.text(`__________________`, 105, yPos);

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
	// doc.text('Kashmir Builders and Developers', 46, 20);
	doc.setFontSize(12);
	doc.setFont('arial');
	doc.setFont(undefined, 'bold');
	// doc.text('ABC Near GT Road Rawalpindi', 47, 26);
	// doc.text('Report II', 47, 32);
	doc.setFontSize(12);
	doc.setFont('normal');
	doc.setFont(undefined, 'normal');

	// Footer Starts
	doc.page = 1;
	// doc.text(150, 285, `page ${doc.page}`);
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
	const pageHeight = pageSize.getHeight();
	doc.text(str, 40, pageHeight - 15);

	if (type === 1) {
		doc.save(`Report_II${dateStr}.pdf`);
	} else if (type === 2) {
		doc.output('dataurlnewwindow');
	}
};

export default GeneratePDF;
