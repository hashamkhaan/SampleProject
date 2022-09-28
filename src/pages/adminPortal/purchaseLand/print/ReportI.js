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

import ConvertSizeIntoSqft from '../../formulas/ConvertSizeIntoSqft';
import ConvertSqftIntoSize from '../../formulas/ConvertSqftIntoSize';

// define a GeneratePDF function that accepts a tickets argument
const GeneratePDF = (data1, type) => {
	// initialize jsPDF

	//* *********************** Fuctions */

	const ConvertPurchasingLandTo_ = (khasraLand) => {
		let totalInSquareFeet = 0;
		// let totalInKanal = 0;
		let size = { kanal: 0, marla: 0, sarsai: 0, feet: 0 };

		if (khasraLand.length > 0) {
			if (khasraLand !== undefined) {
				khasraLand.forEach((data) => {
					const size2 = {
						kanal: data.purchased_land.kanal,
						marla: data.purchased_land.marla,
						sarsai: data.purchased_land.sarsai,
						feet: data.purchased_land.feet,
					};

					console.log('*****************');
					totalInSquareFeet += ConvertSizeIntoSqft(size2);
				});

				size = ConvertSqftIntoSize(totalInSquareFeet);
				console.log('*****************');

				return size;
			}
		}

		return size;
	};
	const ConvertTotalLandTo_ = (khasraLand) => {
		let totalInSquareFeet = 0;
		// let totalInKanal = 0;
		let size = { kanal: 0, marla: 0, sarsai: 0, feet: 0 };

		if (khasraLand.length > 0) {
			if (khasraLand !== undefined) {
				khasraLand.forEach((data) => {
					const size2 = {
						kanal: data.total_land.kanal,
						marla: data.total_land.marla,
						sarsai: data.total_land.sarsai,
						feet: data.total_land.feet,
					};

					console.log('*****************');
					totalInSquareFeet += ConvertSizeIntoSqft(size2);
				});

				size = ConvertSqftIntoSize(totalInSquareFeet);
				console.log('*****************');

				return size;
			}
		}

		return size;
	};

	const getRemainingLandToBeCleared = (totPurchasingLand, totClearedLand) => {
		return ConvertSqftIntoSize(
			Math.abs(ConvertSizeIntoSqft(totPurchasingLand) - ConvertSizeIntoSqft(totClearedLand)),
		);
	};
	//* *********************** Fuctions */
	// eslint-disable-next-line new-cap
	const doc = new jsPDF('p', 'pt', 'a4');

	//* *********************** Total Starts */

	let totalPurchasingLandActual = {
		kanal: 0,
		marla: 0,
		sarsai: 0,
		feet: 0,
	};
	const totalPurchasingLandInitial = {
		kanal: data1.form1.initialKanal,
		marla: data1.form1.initialMarla,
		sarsai: data1.form1.initialSarsai,
		feet: data1.form1.initialFeet,
	};
	// const totalPurchasingLand = ConvertPurchasingLandTo_(data1.land_details);
	const totalLand = ConvertTotalLandTo_(data1.land_details);
	const remainingLandToBeCleared = getRemainingLandToBeCleared(
		totalPurchasingLandInitial,
		data1.grandTotal.grandTotalLand,
	);

	//* *********************** Total Ends */
	// ****************** Mian Details
	const rowsMain = [];
	const columnsMain = [
		'Name of purchasers',
		'Name of sellers',

		'Rate Per Marla',
		'Purchasing Land (K-M-S-F)',
		'Total Value of Land',
		'Mouza',
		'Project Name',
	];

	let agents = '';
	let purchasers = '';

	data1.form1.agents.forEach((data) => {
		agents = `${agents} ${data.label}, `;
	});
	data1.form1.purchasers.forEach((data) => {
		purchasers = `${purchasers} ${data.label},`;
	});
	// data1.land_details.forEach((data) => {
	// 	totalPurchasingLand += data.totalPurchasing_land;
	// 	// push each tickcet's info into a row
	// });
	const dataMain = [
		purchasers,
		agents,

		// data1.form1.mutation_no,

		data1.form1.rate_per_marla,
		`${totalPurchasingLandInitial.kanal}-${totalPurchasingLandInitial.marla}-${totalPurchasingLandInitial.sarsai}-${totalPurchasingLandInitial.feet}`,
		data1.form1.total_price.toLocaleString(undefined, {
			maximumFractionDigits: 2,
		}),
		data1.form1.mouza.label,
		'Rehbar',
		// called date-fns to format the date on the ticket
		//   format(new Date(data.updated_at), "yyyy-MM-dd")
	];
	rowsMain.push(dataMain);
	// ****************** Mian Details Ends

	// ****************** Land Details Starts
	const rowsLand = [];
	const columnsLand = [
		'Sr No',
		'khasra #',
		// 'Total Land',
		'|',
		'Purchasing Land',

		// 'Remaining Land',
	];
	let count = 0;
	let calculateTotalPurchasingLandActualSum = 0;
	data1.land_details.forEach((data) => {
		count += 1;
		const dataLand = [
			count,
			data.khasra_number,
			// `${data.total_land.kanal}-${data.total_land.marla}-${data.total_land.sarsai}-${data.total_land.feet}`,

			'|',
			`${data.purchased_land.kanal === null ? 0 : data.purchased_land.kanal}-${
				data.purchased_land.marla === null ? 0 : data.purchased_land.marla
			}-${data.purchased_land.sarsai === null ? 0 : data.purchased_land.sarsai}-${
				data.purchased_land.feet === null ? 0 : data.purchased_land.feet
			}`,

			// `${data.remaining_land.kanal === null ? 0 : data.remaining_land.kanal}-${
			// 	data.remaining_land.marla === null ? 0 : data.remaining_land.marla
			// }-${data.remaining_land.sarsai === null ? 0 : data.remaining_land.sarsai}-${
			// 	data.remaining_land.feet === null ? 0 : data.remaining_land.feet
			// }`,
		];
		calculateTotalPurchasingLandActualSum += ConvertSizeIntoSqft(data.purchased_land);
		rowsLand.push(dataLand);
		totalPurchasingLandActual = ConvertSqftIntoSize(calculateTotalPurchasingLandActualSum);
	});

	const landTotal = [
		{
			content: `Total   `,
			colSpan: 3,
			rowSpan: 1,
			styles: { halign: 'right', fontStyle: 'bold', fontSize: 10 },
		},
		// {
		// 	content: ` ${totalLand.kanal}-${totalLand.marla}-${totalLand.sarsai}-${totalLand.feet}  `,
		// 	colSpan: 1,
		// 	rowSpan: 1,
		// 	styles: { halign: 'left', fontStyle: 'bold', fontSize: 10 },
		// },
		// {
		// 	content: `| `,
		// 	colSpan: 1,
		// 	rowSpan: 1,
		// 	styles: { halign: 'left', fontStyle: 'bold', fontSize: 10 },
		// },
		{
			content: ` ${totalPurchasingLandActual.kanal}-${totalPurchasingLandActual.marla}-${totalPurchasingLandActual.sarsai}-${totalPurchasingLandActual.feet}  `,
			colSpan: 1,
			rowSpan: 1,
			styles: { halign: 'left', fontStyle: 'bold', fontSize: 10 },
		},
	];
	rowsLand.push(landTotal);

	// ****************** Land Details Ends
	// ****************** Cleared Land Details Starts
	const rowsClearedLand = [];
	const ColumnsClearedLand = [
		'Sr No',
		'registry_no',
		'date ',
		'Fard no ',
		'Inteqal no ',

		'Total Land (K-M-S-F)',
		'BM (K-M-S-F)',
		'BK (K-M-S-F)',
		// 'RDA (K-M-S-F)',
	];

	count = 0;
	let index = 0;
	const dataClearedLand = [];
	data1.cleared_land.forEach((data) => {
		const rowKhasraHeader = [
			{
				content: `Khasra # ${data.khasra_no} - Khewat: ${data.khewat} - Khatoni: ${data.khatoni}`,
				colSpan: 7,
				rowSpan: 1,
				styles: { halign: 'center', fontStyle: 'bold', fontSize: 10 },
			},
		];

		rowsClearedLand.push(rowKhasraHeader);

		data1.cleared_land[index].registries.forEach((dataInner) => {
			count += 1;
			dataClearedLand[index] = [
				count,
				dataInner.registry_no,

				moment(dataInner.date).format('DD-MM-YYYY'),
				dataInner.fard_number,
				dataInner.inteqal_number,

				`${dataInner.totalLand.kanal === null ? 0 : dataInner.totalLand.kanal}-${
					dataInner.totalLand.marla === null ? 0 : dataInner.totalLand.marla
				}-${dataInner.totalLand.sarsai === null ? 0 : dataInner.totalLand.sarsai}-${
					dataInner.totalLand.feet === null ? 0 : dataInner.totalLand.feet
				}`,
				`${dataInner.bmLand.kanal === null ? 0 : dataInner.bmLand.kanal}-${
					dataInner.bmLand.marla === null ? 0 : dataInner.bmLand.marla
				}-${dataInner.bmLand.sarsai === null ? 0 : dataInner.bmLand.sarsai}-${
					dataInner.bmLand.feet === null ? 0 : dataInner.bmLand.feet
				}`,
				`${dataInner.bkLand.kanal === null ? 0 : dataInner.bkLand.kanal}-${
					dataInner.bkLand.marla === null ? 0 : dataInner.bkLand.marla
				}-${dataInner.bkLand.sarsai === null ? 0 : dataInner.bkLand.sarsai}-${
					dataInner.bkLand.feet === null ? 0 : dataInner.bkLand.feet
				}`,
				// `${dataInner.rdaLand.kanal === null ? 0 : dataInner.rdaLand.kanal}-${
				// 	dataInner.rdaLand.marla === null ? 0 : dataInner.rdaLand.marla
				// }-${dataInner.rdaLand.sarsai === null ? 0 : dataInner.rdaLand.sarsai}-${
				// 	dataInner.rdaLand.feet === null ? 0 : dataInner.rdaLand.feet
				// }`,
			];
			rowsClearedLand.push(dataClearedLand[index]);
		});
		const clearedLandOfKhasra = [
			{
				content: `Total   `,
				colSpan: 5,
				rowSpan: 1,
				styles: { halign: 'left', fontStyle: 'bold', fontSize: 10 },
			},
			{
				content: `${data.totalLandInKhasra.kanal}-${data.totalLandInKhasra.marla}-${data.totalLandInKhasra.sarsai}-${data.totalLandInKhasra.feet} `,
				colSpan: 1,
				rowSpan: 1,
				styles: { halign: 'left', fontStyle: 'bold', fontSize: 10 },
			},
			{
				content: `${data.totalbmLandInKhasra.kanal}-${data.totalbmLandInKhasra.marla}-${data.totalbmLandInKhasra.sarsai}-${data.totalbmLandInKhasra.feet} `,

				colSpan: 1,
				rowSpan: 1,
				styles: { halign: 'left', fontStyle: 'bold', fontSize: 10 },
			},
			{
				content: `${data.totalbkLandInKhasra.kanal}-${data.totalbkLandInKhasra.marla}-${data.totalbkLandInKhasra.sarsai}-${data.totalbkLandInKhasra.feet} `,

				colSpan: 1,
				rowSpan: 1,
				styles: { halign: 'left', fontStyle: 'bold', fontSize: 10 },
			},
			// {
			// 	content: `${data.totalrdaLandInKhasra.kanal}-${data.totalrdaLandInKhasra.marla}-${data.totalrdaLandInKhasra.sarsai}-${data.totalrdaLandInKhasra.feet} `,

			// 	colSpan: 1,
			// 	rowSpan: 1,
			// 	styles: { halign: 'left', fontStyle: 'bold', fontSize: 10 },
			// },
		];
		rowsClearedLand.push(clearedLandOfKhasra);

		index += 1;
	});
	const clearedLandTotal = [
		{
			content: `Grand Total   `,
			colSpan: 5,
			rowSpan: 1,
			styles: { halign: 'left', fontStyle: 'bold', fontSize: 10 },
		},
		{
			content: `${data1.grandTotal.grandTotalLand.kanal}-${data1.grandTotal.grandTotalLand.marla}-${data1.grandTotal.grandTotalLand.sarsai}-${data1.grandTotal.grandTotalLand.feet} `,
			colSpan: 1,
			rowSpan: 1,
			styles: { halign: 'left', fontStyle: 'bold', fontSize: 10 },
		},
		{
			content: `${data1.grandTotal.grandTotalBmLand.kanal}-${data1.grandTotal.grandTotalBmLand.marla}-${data1.grandTotal.grandTotalBmLand.sarsai}-${data1.grandTotal.grandTotalBmLand.feet} `,

			colSpan: 1,
			rowSpan: 1,
			styles: { halign: 'left', fontStyle: 'bold', fontSize: 10 },
		},
		{
			content: `${data1.grandTotal.grandTotalBkLand.kanal}-${data1.grandTotal.grandTotalBkLand.marla}-${data1.grandTotal.grandTotalBkLand.sarsai}-${data1.grandTotal.grandTotalBkLand.feet} `,

			colSpan: 1,
			rowSpan: 1,
			styles: { halign: 'left', fontStyle: 'bold', fontSize: 10 },
		},
		// {
		// 	content: `${data1.grandTotal.grandTotalRdaLand.kanal}-${data1.grandTotal.grandTotalRdaLand.marla}-${data1.grandTotal.grandTotalRdaLand.sarsai}-${data1.grandTotal.grandTotalRdaLand.feet} `,

		// 	colSpan: 1,
		// 	rowSpan: 1,
		// 	styles: { halign: 'left', fontStyle: 'bold', fontSize: 10 },
		// },
	];
	rowsClearedLand.push(clearedLandTotal);
	// ****************** Cleared Land Details Ends
	// ****************** Summary   Details Starts
	const tableRowsSummary = [];
	const tableColumnSummary = ['Summary'];
	// const TableDataSummary = [
	// 	{
	// 		// content: `Total Land in marlas:   ${data1.form1.file_no}`,
	// 		content: `Total Land: ${totalLand.kanal}-${totalLand.marla}-${totalLand.sarsai}-${totalLand.feet} `,
	// 		colSpan: 1,
	// 		rowSpan: 1,
	// 		styles: { halign: 'right', fontStyle: 'bold', fontSize: 10 },
	// 	},
	// ];
	// tableRowsSummary.push(TableDataSummary);
	const TableDataSummary4 = [
		{
			// content: `Total Land in marlas:   ${data1.form1.file_no}`,
			content: `Total Purchasing Land: ${totalPurchasingLandInitial.kanal}-${totalPurchasingLandInitial.marla}-${totalPurchasingLandInitial.sarsai}-${totalPurchasingLandInitial.feet} `,
			colSpan: 1,
			rowSpan: 1,
			styles: { halign: 'right', fontStyle: 'bold', fontSize: 10 },
		},
	];
	tableRowsSummary.push(TableDataSummary4);

	const TableDataSummary2 = [
		{
			content: ` Cleared Land: ${data1.grandTotal.grandTotalLand.kanal}-${data1.grandTotal.grandTotalLand.marla}-${data1.grandTotal.grandTotalLand.sarsai}-${data1.grandTotal.grandTotalLand.feet} `,

			colSpan: 1,
			rowSpan: 1,
			styles: { halign: 'right', fontStyle: 'bold', fontSize: 10 },
		},
	];
	tableRowsSummary.push(TableDataSummary2);
	//  convert remaining marlas into full size

	const TableDataSummary3 = [
		{
			content: `Remaining Land to be cleared in file: ${remainingLandToBeCleared.kanal}-${remainingLandToBeCleared.marla}-${remainingLandToBeCleared.sarsai}-${remainingLandToBeCleared.feet}`,
			colSpan: 1,
			rowSpan: 1,
			styles: { halign: 'right', fontStyle: 'bold', fontSize: 10 },
		},
	];
	tableRowsSummary.push(TableDataSummary3);

	// ****************** Summary  Details Ends

	let yPos = 100;
	doc.addImage(rehbarLogo, 'JPEG', 25, 20, 110, 80);
	doc.addImage(kbdLogo, 'JPEG', 470, 20, 110, 80);
	yPos += 10;
	doc.setFont(undefined, 'bold');
	doc.text('REHBAR HOUSING SOCIETY', 200, 40);
	doc.setFontSize(12);
	doc.setFont(undefined, 'normal');

	doc.text('File Report', 260, 55);

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
	// ****************** Main Details
	doc.autoTable(columnsMain, rowsMain, { startY: yPos, styles: { fontSize: 8 } });
	yPos = doc.lastAutoTable.finalY + 20;
	doc.text('Total Land', 47, yPos);
	yPos += 10;
	// ****************** Land Details
	doc.autoTable(columnsLand, rowsLand, { startY: yPos, styles: { fontSize: 8 } });
	yPos = doc.lastAutoTable.finalY + 20;
	doc.text('Cleared  Land', 47, yPos);
	yPos += 10;
	// ****************** Cleared Land Details
	doc.autoTable(ColumnsClearedLand, rowsClearedLand, { startY: yPos, styles: { fontSize: 8 } });
	yPos = doc.lastAutoTable.finalY + 20;

	doc.setFontSize(12);
	doc.autoTable(tableColumnSummary, tableRowsSummary, { startY: yPos, styles: { fontSize: 8 } });
	yPos = doc.lastAutoTable.finalY + 20;

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
	const pageHeight = pageSize.getHeight();
	doc.text(str, 40, pageHeight - 15);

	if (type === 1) {
		doc.save(`Report_I${dateStr}.pdf`);
	} else if (type === 2) {
		doc.output('dataurlnewwindow');
	}
};

export default GeneratePDF;
