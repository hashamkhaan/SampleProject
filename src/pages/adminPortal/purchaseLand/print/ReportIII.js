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
	let totalExpenseIssued = 0;

	// define the columns we want and their titles
	const tableColumnPayments = ['Sr No', 'V no', 'date', 'Account', 'Desc ', 'Amount'];
	const tableColumnExpenses = ['Sr No', 'V no', 'date', 'Desc ', 'Amount'];

	const tableRowsPayments = [];
	const tableRowsExpenses = [];

	// tableRowsPayments
	let count = 1;
	data1.payments.forEach((data) => {
		count += 1;
		const TableData = [
			count,

			data.voucher_number.voucher_no,
			moment(data.date).format('DD-MM-YYYY'),
			`${data.coa_account.code}\n  ${data.coa_account.name}`,

			data.land !== null ? `${data.land_payment_head?.name}\n  ${data.description}` : ``,
			data.debit,
		];
		totalPaymentIssued += Number(data.debit);

		tableRowsPayments.push(TableData);
	});

	tableRowsPayments.push([
		{
			content: `Total Amount  `,
			colSpan: 5,
			rowSpan: 1,
			styles: { halign: 'center', fontStyle: 'bold', fontSize: 10 },
		},
		{
			content: `${data1.land_value.toLocaleString(undefined, {
				maximumFractionDigits: 2,
			})}`,
			colSpan: 1,
			rowSpan: 1,
			styles: { halign: 'left', fontStyle: 'bold', fontSize: 10 },
		},
	]);
	tableRowsPayments.push([
		{
			content: `Total Payment Issued `,
			colSpan: 5,
			rowSpan: 1,
			styles: { halign: 'center', fontStyle: 'bold', fontSize: 10 },
		},
		{
			content: `${totalPaymentIssued.toLocaleString(undefined, {
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
			colSpan: 5,
			rowSpan: 1,
			styles: { halign: 'center', fontStyle: 'bold', fontSize: 10 },
		},
		{
			content: `${(
				parseFloat(data1.land_value) - parseFloat(totalPaymentIssued)
			).toLocaleString(undefined, {
				maximumFractionDigits: 2,
			})}`,
			colSpan: 1,
			rowSpan: 1,
			styles: { halign: 'left', fontStyle: 'bold', fontSize: 10 },
		},
	]);
	// tableRowsExpenses
	count = 1;
	data1.expenses.forEach((data) => {
		count += 1;
		const TableData = [
			count,

			data.voucher_number.voucher_no,
			moment(data.date).format('DD-MM-YYYY'),
			data.land !== null ? `${data.land_payment_head?.name}\n  ${data.description}` : ``,
			data.debit,
		];
		totalExpenseIssued += Number(data.debit);

		tableRowsExpenses.push(TableData);
	});

	tableRowsExpenses.push([
		{
			content: `Total Amount`,
			colSpan: 4,
			rowSpan: 1,
			styles: { halign: 'center', fontStyle: 'bold', fontSize: 10 },
		},
		{
			content: `${totalExpenseIssued.toLocaleString(undefined, {
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

	doc.text('File Transactions Report (Vouchers)', 230, 55);

	doc.setFont(undefined, 'normal');

	doc.text(`File no:`, 45, yPos);
	doc.text(`${data1.payments[0]?.land.file_no}`, 90, yPos);
	doc.text(`__________________`, 90, yPos);
	doc.text(`Date Printed:`, 367, yPos);
	doc.text(`__________________`, 440, yPos);
	doc.text(`${moment().format('DD-MM-YYYY hh:mm:ss a')}`, 440, yPos);
	yPos += 20;
	doc.text(`File name:`, 45, yPos);
	doc.text(`${data1.payments[0]?.land.file_name}`, 105, yPos);
	doc.text(`__________________`, 105, yPos);

	yPos += 20;
	doc.text(`Payments:`, 45, yPos);
	yPos += 5;
	doc.autoTable(tableColumnPayments, tableRowsPayments, {
		startY: yPos,
		styles: { fontSize: 8 },
	});
	yPos = doc.lastAutoTable.finalY + 20;
	doc.text(`Other Expenses:`, 45, yPos);
	yPos += 5;
	doc.autoTable(tableColumnExpenses, tableRowsExpenses, {
		startY: yPos,
		styles: { fontSize: 8 },
	});
	yPos = doc.lastAutoTable.finalY + 20;

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
		doc.save(`Report_III${dateStr}.pdf`);
	} else if (type === 2) {
		doc.output('dataurlnewwindow');
	}
};

export default GeneratePDF;
