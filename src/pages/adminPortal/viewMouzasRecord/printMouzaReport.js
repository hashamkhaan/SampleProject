// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable prefer-const */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-unused-vars */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-console */
// list/tablePDF.js

import jsPDF from 'jspdf';
import 'jspdf-autotable';
import moment from 'moment';
import rehbarLogo from '../../../assets/logos/reh_kbd/rehbar.png';
import kbdLogo from '../../../assets/logos/reh_kbd/kbd.png';
import ConvertSizeIntoSqft from '../formulas/ConvertSizeIntoSqft';
import ConvertSqftIntoSize from '../formulas/ConvertSqftIntoSize';

// Date Fns is used to format the dates we receive
// from our API call
// import { format } from "date-fns"
// ** Store & Actions

// define a GeneratePDF function that accepts a tickets argument
const GeneratePDF = (data1, khasraNo, type, mouzaName) => {
	// initialize jsPDF

	//* *********************** Fuctions */

	//* *********************** Fuctions */
	// eslint-disable-next-line new-cap
	const doc = new jsPDF('p', 'pt', 'a4');

	//* *********************** Total Starts */
	// const totalPurchasingLand = ConvertPurchasingLandTo_(data1.land_details);
	// const totalLand = ConvertTotalLandTo_(data1.land_details);
	// const remainingLandToBeCleared = getRemainingLandToBeCleared(
	// 	totalPurchasingLand,
	// 	data1.grandTotal.grandTotalLand,
	// );

	//* *********************** Total Ends */
	// ****************** Mian Details
	const rowsMain = [];
	const columnsMain = ['Total Land', 'Purchasing Land', 'Cleared Land', 'Remaining Land'];

	//   data1.land_details.forEach((data) => {
	//   	totalPurchasingLand += data.totalPurchasing_land;
	//   	// push each tickcet's info into a row
	//   });
	// const dataMain = [
	// 	`${data1.total_land.kanal}-${data1.total_land.marla}-${data1.total_land.sarsai}-${data1.total_land.feet}`,
	// 	`${data1.purchased_land.kanal}-${data1.purchased_land.marla}-${data1.purchased_land.sarsai}-${data1.purchased_land.feet}`,
	// 	`${data1.cleared_land.kanal}-${data1.cleared_land.marla}-${data1.cleared_land.sarsai}-${data1.cleared_land.feet}`,
	// 	`${data1.remaining_land.kanal}-${data1.remaining_land.marla}-${data1.remaining_land.sarsai}-${data1.remaining_land.feet}`,

	// 	// called date-fns to format the date on the ticket
	// 	// format(new Date(data.updated_at), "yyyy-MM-dd")
	// ];
	// rowsMain.push(dataMain);
	// ****************** Mian Details Ends

	// ****************** Land Details Starts
	const rowsLand = [];
	const columnsLand = [
		'sr No',
		'Khasra #',
		'Total Land ',
		'Purchased Land',
		'Cleared Land',
		'Remaining Land',
		'BM Land',
	];
	let count = 0;
	let totalLand = 0;
	let totalPurchasedLand = 0;
	let totalClearedLand = 0;
	let totalRemainingLand = 0;
	let totalBmLand = 0;
	let totalBkLand = 0;
	let totalRdaLand = 0;
	data1.forEach((data) => {
		count += 1;

		const dataLand = [
			count,
			data.khasra_no,

			`${data.total_land.kanal}-${data.total_land.marla}-${data.total_land.sarsai}-${data.total_land.feet}`,
			`${data.purchased_land.kanal}-${data.purchased_land.marla}-${data.purchased_land.sarsai}-${data.purchased_land.feet}`,
			`${data.cleared_land.kanal}-${data.cleared_land.marla}-${data.cleared_land.sarsai}-${data.cleared_land.feet}`,
			`${data.remaining_land.kanal}-${data.remaining_land.marla}-${data.remaining_land.sarsai}-${data.remaining_land.feet}`,
			`${data.bmLand.kanal}-${data.bmLand.marla}-${data.bmLand.sarsai}-${data.bmLand.feet}`,
		];
		rowsLand.push(dataLand);
		totalLand = ConvertSqftIntoSize(
			ConvertSizeIntoSqft(totalLand) + ConvertSizeIntoSqft(data.total_land),
		);
		totalPurchasedLand = ConvertSqftIntoSize(
			ConvertSizeIntoSqft(totalPurchasedLand) + ConvertSizeIntoSqft(data.purchased_land),
		);
		totalClearedLand = ConvertSqftIntoSize(
			ConvertSizeIntoSqft(totalClearedLand) + ConvertSizeIntoSqft(data.cleared_land),
		);
		totalRemainingLand = ConvertSqftIntoSize(
			ConvertSizeIntoSqft(totalRemainingLand) + ConvertSizeIntoSqft(data.remaining_land),
		);
		totalBmLand = ConvertSqftIntoSize(
			ConvertSizeIntoSqft(totalBmLand) + ConvertSizeIntoSqft(data.bmLand),
		);
		totalBkLand = ConvertSqftIntoSize(
			ConvertSizeIntoSqft(totalBkLand) + ConvertSizeIntoSqft(data.bkLand),
		);
		totalRdaLand = ConvertSqftIntoSize(
			ConvertSizeIntoSqft(totalRdaLand) + ConvertSizeIntoSqft(data.rdaLand),
		);
	});

	const totalLandCalculated = [
		{
			content: `Total   `,
			colSpan: 2,
			rowSpan: 1,
			styles: { halign: 'left', fontStyle: 'bold', fontSize: 10 },
		},
		{
			content: `${totalLand.kanal}-${totalLand.marla}-${totalLand.sarsai}-${totalLand.feet}`,

			colSpan: 1,
			rowSpan: 1,
			styles: { halign: 'left', fontStyle: 'bold', fontSize: 10 },
		},
		{
			content: `${totalPurchasedLand.kanal}-${totalPurchasedLand.marla}-${totalPurchasedLand.sarsai}-${totalPurchasedLand.feet}`,

			colSpan: 1,
			rowSpan: 1,
			styles: { halign: 'left', fontStyle: 'bold', fontSize: 10 },
		},
		{
			content: `${totalClearedLand.kanal}-${totalClearedLand.marla}-${totalClearedLand.sarsai}-${totalClearedLand.feet}`,

			colSpan: 1,
			rowSpan: 1,
			styles: { halign: 'left', fontStyle: 'bold', fontSize: 10 },
		},
		{
			content: `${totalRemainingLand.kanal}-${totalRemainingLand.marla}-${totalRemainingLand.sarsai}-${totalLand.feet}`,

			colSpan: 1,
			rowSpan: 1,
			styles: { halign: 'left', fontStyle: 'bold', fontSize: 10 },
		},
		{
			content: `${totalBmLand.kanal}-${totalBmLand.marla}-${totalBmLand.sarsai}-${totalBmLand.feet}`,

			colSpan: 1,
			rowSpan: 1,
			styles: { halign: 'left', fontStyle: 'bold', fontSize: 10 },
		},
		// {
		// 	content: `${totalBkLand.kanal}-${totalBkLand.marla}-${totalBkLand.sarsai}-${totalBkLand.feet}`,

		// 	colSpan: 1,
		// 	rowSpan: 1,
		// 	styles: { halign: 'left', fontStyle: 'bold', fontSize: 10 },
		// },
		// {
		// 	content: `${totalRdaLand.kanal}-${totalRdaLand.marla}-${totalRdaLand.sarsai}-${totalRdaLand.feet}`,

		// 	colSpan: 1,
		// 	rowSpan: 1,
		// 	styles: { halign: 'left', fontStyle: 'bold', fontSize: 10 },
		// },
	];
	rowsLand.push(totalLandCalculated);

	// ****************** Land Details Ends
	// ****************** Cleared Land Details Starts
	const rowsClearedLand = [];
	const ColumnsClearedLand = ['Sr No', 'registry_no', 'date ', 'Total Land (K-M-S-F)'];

	count = 0;
	let index = 0;
	const dataClearedLand = [];
	let dataClearedLandInteqalBezubani = [];

	// ****************** Cleared Land  Details Ends

	let yPos = 100;
	doc.addImage(rehbarLogo, 'JPEG', 25, 20, 110, 80);
	doc.addImage(kbdLogo, 'JPEG', 470, 20, 110, 80);

	yPos += 10;
	doc.setFont(undefined, 'bold');
	doc.text('REHBAR HOUSING SOCIETY', 200, 40);
	doc.setFontSize(12);
	doc.setFont(undefined, 'normal');

	doc.text('Mouza Report', 260, 55);

	doc.setFont(undefined, 'normal');

	doc.text(`Mouza:`, 45, yPos);
	doc.text(`${mouzaName}`, 110, yPos);
	doc.text(`__________________`, 110, yPos);

	doc.text(`Date Printed:`, 367, yPos);
	doc.text(`__________________`, 440, yPos);
	doc.text(`${moment().format('DD-MM-YYYY hh:mm:ss a')}`, 440, yPos);

	yPos += 20;
	// ****************** Main Details
	// doc.autoTable(columnsMain, rowsMain, { startY: yPos, styles: { fontSize: 8 } });
	// yPos = doc.lastAutoTable.finalY + 20;
	doc.text('List of Khasra', 47, yPos);
	yPos += 10;
	// ****************** Land Details
	doc.autoTable(columnsLand, rowsLand, {
		startY: yPos,
		styles: {
			halign: 'center',
			valign: 'middle',
			fontSize: 8,
		},
	});
	yPos = doc.lastAutoTable.finalY + 20;

	doc.setFontSize(12);
	// doc.autoTable(tableColumnSummary, tableRowsSummary, { startY: yPos, styles: { fontSize: 8 } });
	// yPos = doc.lastAutoTable.finalY + 20;

	// doc.text('Logo', 47, 26);
	doc.setFontSize(24);
	doc.setFont('arial');
	doc.setFont(undefined, 'bold');

	doc.setFontSize(12);
	doc.setFont('arial');
	doc.setFont(undefined, 'bold');
	// doc.text('ABC Near GT Road Rawalpindi', 47, 26);

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
	const pageHeight = pageSize.getHeight();
	doc.text(str, 40, pageHeight - 15);

	if (type === 1) {
		doc.save(`MouzaReport${dateStr}.pdf`);
	} else if (type === 2) {
		doc.output('dataurlnewwindow');
	}
};

export default GeneratePDF;
