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
const GeneratePDF = (data1, khasraNo, type) => {
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
					totalInSquareFeet +=
						parseFloat(data.total_land.kanal > 0 ? data.total_land.kanal : 0) *
						20 *
						272;
					totalInSquareFeet +=
						parseFloat(data.total_land.marla > 0 ? data.total_land.marla : 0) * 272;
					totalInSquareFeet +=
						(parseFloat(data.total_land.sarsai > 0 ? data.total_land.sarsai : 0) / 9) *
						272;
					totalInSquareFeet += parseFloat(
						data.total_land.feet > 0 ? data.total_land.feet : 0,
					);
				});
				// totalInKanal = parseFloat(totalInSquareFeet) / 5440;
				// const [kanal, marla, sarsai, feet] = getkanalAndMarlaFromSqfeet(
				// 	totalInKanal,
				// 	totalInSquareFeet,
				// );
				size = ConvertSqftIntoSize(totalInSquareFeet);

				return size;
			}
		}

		return size;
	};
	const getRemainingLandToBeCleared = (totPurchasingLand, totClearedLand) => {
		return ConvertSqftIntoSize(
			ConvertSizeIntoSqft(totPurchasingLand) - ConvertSizeIntoSqft(totClearedLand),
		);
	};
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
	const dataMain = [
		`${data1.total_land.kanal}-${data1.total_land.marla}-${data1.total_land.sarsai}-${data1.total_land.feet}`,
		`${data1.purchased_land.kanal}-${data1.purchased_land.marla}-${data1.purchased_land.sarsai}-${data1.purchased_land.feet}`,
		`${data1.cleared_land.kanal}-${data1.cleared_land.marla}-${data1.cleared_land.sarsai}-${data1.cleared_land.feet}`,
		`${data1.remaining_land.kanal}-${data1.remaining_land.marla}-${data1.remaining_land.sarsai}-${data1.remaining_land.feet}`,

		// called date-fns to format the date on the ticket
		// format(new Date(data.updated_at), "yyyy-MM-dd")
	];
	rowsMain.push(dataMain);
	// ****************** Mian Details Ends

	// ****************** Land Details Starts
	const rowsLand = [];
	const columnsLand = ['sr No', 'File #', 'Purchasing Land', 'Cleared Land'];
	let count = 0;
	data1.purchased_land_details.forEach((data) => {
		count += 1;
		const dataLand = [
			count,
			data.file_no,
			`${data.purchased_land.kanal}-${data.purchased_land.marla}-${data.purchased_land.sarsai}-${data.purchased_land.feet}`,
			`${data.cleared_land.kanal}-${data.cleared_land.marla}-${data.cleared_land.sarsai}-${data.cleared_land.feet}`,
		];
		rowsLand.push(dataLand);
	});

	// ****************** Land Details Ends
	// ****************** Cleared Land Details Starts
	const rowsClearedLand = [];
	const ColumnsClearedLand = ['Sr No', 'registry_no', 'date ', 'Total Land (K-M-S-F)'];

	count = 0;
	let index = 0;
	const dataClearedLand = [];
	let dataClearedLandInteqalBezubani = [];

	data1.cleared_land_details.forEach((data, i) => {
		if (data.inteqal_bezubani === 1) {
			const rowKhasraHeader = [
				{
					content: `File # ${data.file_no} - Khewat: ${data.record.khasra_record.khewat} - Khatoni: ${data.record.khasra_record.khatoni}`,
					colSpan: 7,
					rowSpan: 1,
					styles: { halign: 'center', fontStyle: 'bold', fontSize: 10 },
				},
			];

			rowsClearedLand.push(rowKhasraHeader);
			count = 0;
			// data.record.forEach((dataInner) => {
			count += 1;
			dataClearedLandInteqalBezubani = [
				count,
				'Inteqal Bezubani',
				data.record.date,

				`${data.record.total_land.kanal === null ? 0 : data.record.total_land.kanal}-${
					data.record.total_land.marla === null ? 0 : data.record.total_land.marla
				}-${data.record.total_land.sarsai === null ? 0 : data.record.total_land.sarsai}-${
					data.record.total_land.feet === null ? 0 : data.record.total_land.feet
				}`,
			];
			rowsClearedLand.push(dataClearedLandInteqalBezubani);
			// });
		} else if (data.inteqal_bezubani === 0) {
			const rowKhasraHeader = [
				{
					content: `File # ${data.file_no} - Khewat: ${data.registry_record[0]?.khasra_record.khewat} - Khatoni: ${data.registry_record[0]?.khasra_record.khatoni}`,
					colSpan: 7,
					rowSpan: 1,
					styles: { halign: 'center', fontStyle: 'bold', fontSize: 10 },
				},
			];

			rowsClearedLand.push(rowKhasraHeader);
			count = 0;
			data.registry_record.forEach((dataInner) => {
				count += 1;
				dataClearedLand[index] = [
					count,
					dataInner.registry.number,
					dataInner.date,

					`${dataInner.total_land.kanal === null ? 0 : dataInner.total_land.kanal}-${
						dataInner.total_land.marla === null ? 0 : dataInner.total_land.marla
					}-${dataInner.total_land.sarsai === null ? 0 : dataInner.total_land.sarsai}-${
						dataInner.total_land.feet === null ? 0 : dataInner.total_land.feet
					}`,
				];
				rowsClearedLand.push(dataClearedLand[index]);
			});
		}

		index += 1;
	});

	// ****************** Cleared Land  Details Ends

	let yPos = 100;
	doc.addImage(rehbarLogo, 'JPEG', 25, 20, 110, 80);
	doc.addImage(kbdLogo, 'JPEG', 470, 20, 110, 80);

	yPos += 10;
	doc.setFont(undefined, 'bold');
	doc.text('REHBAR HOUSING SOCIETY', 200, 40);
	doc.setFontSize(12);
	doc.setFont(undefined, 'normal');

	doc.text('Khasra Report', 260, 55);

	doc.setFont(undefined, 'normal');

	doc.text(`Khasra no:`, 45, yPos);
	doc.text(`${khasraNo}`, 110, yPos);
	doc.text(`__________________`, 110, yPos);

	doc.text(`Date Printed:`, 367, yPos);
	doc.text(`__________________`, 440, yPos);
	doc.text(`${moment().format('DD-MM-YYYY hh:mm:ss a')}`, 440, yPos);

	yPos += 5;
	// ****************** Main Details
	doc.autoTable(columnsMain, rowsMain, { startY: yPos, styles: { fontSize: 8 } });
	yPos = doc.lastAutoTable.finalY + 20;
	doc.text('Purchasing Land by file', 47, yPos);
	yPos += 10;
	// ****************** Land Details
	doc.autoTable(columnsLand, rowsLand, { startY: yPos, styles: { fontSize: 8 } });
	yPos = doc.lastAutoTable.finalY + 20;
	doc.text('Registries', 47, yPos);
	yPos += 10;
	// ****************** Cleared Land Details
	doc.autoTable(ColumnsClearedLand, rowsClearedLand, { startY: yPos, styles: { fontSize: 8 } });
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
		doc.save(`Report_I${dateStr}.pdf`);
	} else if (type === 2) {
		doc.output('dataurlnewwindow');
	}
};

export default GeneratePDF;
