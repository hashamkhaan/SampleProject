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

const GeneratePDF = (data1, accountSelected, type, startDate, endDate, openingBalance) => {
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
	let yPos = 100;
	// doc.addImage(rehbarLogo, 'JPEG', 25, 20, 110, 80);
	// doc.addImage(kbdLogo, 'JPEG', 470, 20, 110, 80);
	yPos -= 10;
	doc.setFont(undefined, 'bold');
	doc.text('REHBAR HOUSING SOCIETY', 200, 40);
	doc.setFontSize(12);
	doc.setFont(undefined, 'normal');
	doc.text(`Ledger: ${accountSelected.label}`, pageWidth / 2, 55, { align: 'center' });
	doc.text(
		`From ${moment(startDate).format('MMMM D, YYYY')} To ${moment(endDate).format(
			'MMMM D, YYYY',
		)}`,
		pageWidth / 2,
		70,
		{ align: 'center' },
	);
	doc.text(
		`Opening Balance: ${openingBalance.toLocaleString(undefined, {
			maximumFractionDigits: 2,
		})}`,
		pageWidth - 40,
		yPos,
		{
			align: 'right',
		},
	);
	// Start
	const rowsMain = [];
	const columnsMain = ['S no', 'T ID', 'V no', 'date', 'Desc', 'Dr', 'Cr', 'Balance'];

	// expenses Starts
	if (data1 !== undefined) {
		data1.forEach((data) => {
			count += 1;
			openingBalance = openingBalance + data.debit - data.credit;
			const TableData = [
				count,
				data.id,
				data.voucher_number && `${data.voucher_number.voucher_no}`,
				moment(data?.date).format('DD-MM-YYYY'),
				// data.coa_account.name,
				data.land !== null
					? `File: ${data.land?.file_no}-${data.land?.file_name}\n ${data.land_payment_head?.name}\n  ${data.description}`
					: `  ${data.description}`,
				`${data.debit.toLocaleString(undefined, {
					maximumFractionDigits: 2,
				})}`,
				`${data.credit.toLocaleString(undefined, {
					maximumFractionDigits: 2,
				})}`,
				`${openingBalance.toLocaleString(undefined, {
					maximumFractionDigits: 2,
				})}`,
			];
			rowsMain.push(TableData);
		});
	}

	yPos += 15;
	doc.setFont(undefined, 'normal');

	// doc.text(`File no:`, 45, yPos);
	// doc.text(`${data1.form1.file_no}`, 90, yPos);
	// doc.text(`__________________`, 90, yPos);

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
		styles: { fontSize: 8 },
	});
	yPos = doc.lastAutoTable.finalY + 20;
	// doc.text(`File name:`, 45, yPos);
	// doc.text(`${data1.form1.file_name}`, 105, yPos);
	// doc.text(`__________________`, 105, yPos);

	yPos += 5;
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
	doc.setFontSize(8);
	doc.text(`Date Printed: ${moment().format('DD-MM-YYYY hh:mm:ss a')}`, pageWidth - 40, yPos, {
		align: 'right',
	});

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
		doc.save(`Ledger_${accountSelected.label}_${dateStr}.pdf`);
	} else if (type === 2) {
		doc.output('dataurlnewwindow');
	}
};

export default GeneratePDF;
