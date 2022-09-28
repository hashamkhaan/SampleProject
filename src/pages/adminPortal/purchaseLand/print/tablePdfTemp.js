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
const GeneratePDF = (data1, data2, type) => {
	// initialize jsPDF

	const getPurchasingLandinMarla = (ClearedKhasraLand) => {
		let totalmarlas = 0;
		ClearedKhasraLand.forEach((data) => {
			totalmarlas += parseFloat(data.kanal > 0 ? data.kanal : 0) * 20;
			totalmarlas += parseFloat(data.marla > 0 ? data.marla : 0);
			totalmarlas += parseFloat(data.sarsai > 0 ? data.sarsai : 0) / 9;
			totalmarlas += parseFloat(data.feet > 0 ? data.feet : 0) * 0.00367309;
		});

		return totalmarlas.toFixed(2);
	};
	let allClearedLandinMarlas = 0;
	let allClearedLandinFullSize = { kanal: 0, marla: 0, sarsai: 0, feet: 0 };
	let remainingLandinFullSize = { kanal: 0, marla: 0, sarsai: 0, feet: 0 };
	const getClearedLandinMarlaForSpecificKhasra = (clearLandInSpecificKhasra) => {
		let totalmarlas = 0;
		clearLandInSpecificKhasra.forEach((data) => {
			totalmarlas += parseFloat(data.kanal > 0 ? data.kanal : 0) * 20;
			totalmarlas += parseFloat(data.marla > 0 ? data.marla : 0);
			totalmarlas += parseFloat(data.sarsai > 0 ? data.sarsai : 0) / 9;
			totalmarlas += parseFloat(data.feet > 0 ? data.feet : 0) * 0.00367309;
		});

		return totalmarlas.toFixed(2);
	};
	const getTotalLandinMarla = (khasraLand) => {
		let totalmarlas = 0;
		khasraLand.forEach((data) => {
			totalmarlas += parseFloat(data.Tkanal > 0 ? data.Tkanal : 0) * 20;
			totalmarlas += parseFloat(data.Tmarla > 0 ? data.Tmarla : 0);
			totalmarlas += parseFloat(data.Tsarsai > 0 ? data.Tsarsai : 0) / 9;
			totalmarlas += parseFloat(data.Tfeet > 0 ? data.Tfeet : 0) * 0.00367309;
		});

		return totalmarlas.toFixed(2);
	};

	const getAllClearLandInMarlaforSpecificKhasra = (khasraClearLand) => {
		let totalmarlas = 0;
		khasraClearLand.forEach((data) => {
			totalmarlas += parseFloat(data.kanal > 0 ? data.kanal : 0) * 20;
			totalmarlas += parseFloat(data.marla > 0 ? data.marla : 0);
			totalmarlas += parseFloat(data.sarsai > 0 ? data.sarsai : 0) / 9;
			totalmarlas += parseFloat(data.feet > 0 ? data.feet : 0) * 0.00367309;
		});

		return totalmarlas.toFixed(2);
	};
	// store.data.form1.rate_per_marla
	const getRatePerMarla = (ratePerMarla) => {
		return parseFloat(ratePerMarla > 0 ? ratePerMarla : 0).toFixed(2);
	};

	// store.data.stages[0].amount
	const getBayanaAmount = (data) => {
		if (data.stages.length > 0) {
			if (data.stages[0].amount !== undefined && data.stages[0].amount !== 0) {
				return parseFloat(data.stages[0].amount > 0 ? data.stages[0].amount : 0).toFixed(2);
			}
		}

		return 0;
	};
	const getRemainingAmount = (data) => {
		return (
			getTotalLandinMarla(data.khasra_record) * getRatePerMarla(data.form1.rate_per_marla) -
			getBayanaAmount(data)
		).toFixed(2);
	};

	// eslint-disable-next-line new-cap
	const doc = new jsPDF('p', 'pt', 'a4');

	console.log('In data1::::::', data1);
	console.log('In data2::::::', data2);
	// define the columns we want and their titles
	const tableColumn = [
		'Sr No',
		'Name of seller',
		'Name of purchasers',
		'Mutation No',
		'Rate Per Marla',
		'Purchasing Land (Marla)',
		'Total Value of Land',
		'Mouza',
	];
	const tableColumnTotalLand = [
		'Sr No',
		'khasra #',
		'T_kanal',
		'T_marla',
		'T_sarsai',
		'T_feet',
		'|',
		'kanal',
		'marla',
		'sarsai',
		'feet',
	];
	const tableColumnClearedLand = ['Sr No', 'date ', 'kanal', 'marla', 'sarsai', 'feet'];
	const tableColumnSummary = ['Summary'];
	// define an empty array of rows
	const tableRows = [];
	const tableRowsTotalLand = [];

	// for each ticket pass all its data into an array
	let sellers = '';
	let purchasers = '';
	data1.form1.sellers.forEach((data) => {
		sellers = `${sellers} ${data.label}, `;
		// push each tickcet's info into a row
	});
	data1.form1.purchasers.forEach((data) => {
		purchasers = `${purchasers} ${data.label},`;
		// push each tickcet's info into a row
	});
	console.log('hhh', sellers);
	console.log(purchasers);
	const count = 0;
	const TableData = [
		count + 1,
		sellers,
		purchasers,
		data1.stages[2].number,

		data1.form1.rate_per_marla,
		getPurchasingLandinMarla(data1.khasra_record),
		(
			getRatePerMarla(data1.form1.rate_per_marla) *
			getPurchasingLandinMarla(data1.khasra_record)
		).toFixed(2),
		data1.form1.mouza.label,
		'Sample Project',
		// called date-fns to format the date on the ticket
		//   format(new Date(data.updated_at), "yyyy-MM-dd")
	];
	// push each tickcet's info into a row
	let TotalLandinMarlas = 0;
	let TotalLandinMarlasCleared = 0;
	tableRows.push(TableData);
	let index = 0;
	const TableClearedLand = [];
	const tableRowsClearedLand = [];
	const tableRowsSummary = [];

	// start

	const getWhole = (value) => {
		const [whole, decimal] = String(value).split('.');
		return Number(whole);
	};
	const getDecimal = (value) => {
		const [whole, decimal] = String(value).split('.');
		return Number(decimal);
	};
	const getkanalAndMarlaFromSqfeet = (value) => {
		const [whole, decimal] = String(value).split('.');
		return [
			Number(whole),
			getWhole(Number(value % 1) * 20),
			getWhole(((Number(value % 1) * 20) % 1) * 9),
			parseFloat(((((Number(value % 1) * 20) % 1) * 9) % 1) * 30.25).toFixed(2),
		];
	};
	const ConvertPurchasingLandTo_ = (khasraLand) => {
		let totalInSquareFeet = 0;
		let totalInKanal = 0;
		const size = { kanal: 0, marla: 0, sarsai: 0, feet: 0 };

		if (khasraLand.length > 0) {
			if (khasraLand !== undefined) {
				khasraLand.forEach((data) => {
					totalInSquareFeet += parseFloat(data.kanal > 0 ? data.kanal : 0) * 20 * 272;
					totalInSquareFeet += parseFloat(data.marla > 0 ? data.marla : 0) * 272;
					totalInSquareFeet += (parseFloat(data.sarsai > 0 ? data.sarsai : 0) / 9) * 272;
					totalInSquareFeet += parseFloat(data.feet > 0 ? data.feet : 0);
				});
				totalInKanal = parseFloat(totalInSquareFeet) / 30.25 / 9 / 20;
				const [kanal, marla, sarsai, feet] = getkanalAndMarlaFromSqfeet(totalInKanal);
				size.kanal = kanal;
				size.marla = marla;
				size.sarsai = sarsai;
				size.feet = feet;

				console.log('sqfeet', totalInSquareFeet);

				console.log(size);
				return size;
			}
		}

		return size;
	};
	const ConvertTotalLandTo_ = (khasraLand) => {
		let totalInSquareFeet = 0;
		let totalInKanal = 0;
		const size = { kanal: 0, marla: 0, sarsai: 0, feet: 0 };

		if (khasraLand.length > 0) {
			if (khasraLand !== undefined) {
				khasraLand.forEach((data) => {
					totalInSquareFeet += parseFloat(data.Tkanal > 0 ? data.Tkanal : 0) * 20 * 272;
					totalInSquareFeet += parseFloat(data.Tmarla > 0 ? data.Tmarla : 0) * 272;
					totalInSquareFeet +=
						(parseFloat(data.Tsarsai > 0 ? data.Tsarsai : 0) / 9) * 272;
					totalInSquareFeet += parseFloat(data.Tfeet > 0 ? data.Tfeet : 0);
				});
				totalInKanal = parseFloat(totalInSquareFeet) / 30.25 / 9 / 20;
				const [kanal, marla, sarsai, feet] = getkanalAndMarlaFromSqfeet(totalInKanal);
				size.kanal = kanal;
				size.marla = marla;
				size.sarsai = sarsai;
				size.feet = feet;

				console.log('sqfeet', totalInSquareFeet);

				console.log(size);
				return size;
			}
		}

		return size;
	};
	const ConvertMarlaLandToFullSize = (ClearedLandInMarla) => {
		let totalInSquareFeet = 0;
		let totalInKanal = 0;
		const size = { kanal: 0, marla: 0, sarsai: 0, feet: 0 };

		if (ClearedLandInMarla > 0) {
			if (ClearedLandInMarla !== undefined) {
				totalInSquareFeet = parseFloat(ClearedLandInMarla) * 272;
				totalInKanal = parseFloat(totalInSquareFeet) / 30.25 / 9 / 20;
				const [kanal, marla, sarsai, feet] = getkanalAndMarlaFromSqfeet(totalInKanal);
				size.kanal = kanal;
				size.marla = marla;
				size.sarsai = sarsai;
				size.feet = feet;

				console.log('sqfeetttt', totalInSquareFeet);

				console.log(size);
				return size;
			}
		}

		return size;
	};
	const TableDataTotalHeading = [
		{
			content: `  `,
			colSpan: 2,
			rowSpan: 1,
			styles: { halign: 'center', fontStyle: 'bold', fontSize: 10 },
		},
		{
			content: `Total Land  `,
			colSpan: 4,
			rowSpan: 1,
			styles: { halign: 'center', fontStyle: 'bold', fontSize: 10 },
		},
		{
			content: `  `,
			colSpan: 1,
			rowSpan: 1,
			styles: { halign: 'center', fontStyle: 'bold', fontSize: 10 },
		},
		{
			content: 'Purchasing Land',
			colSpan: 4,
			rowSpan: 1,
			styles: { halign: 'center', fontStyle: 'bold', fontSize: 10 },
		},
	];
	tableRowsTotalLand.push(TableDataTotalHeading);

	data1.khasra_record.forEach((data) => {
		const TableTotalLand = [
			data.id + 1,
			data.khasra_number,
			data.Tkanal,
			data.Tmarla,
			data.Tsarsai,
			data.Tfeet,
			'|',
			data.kanal,
			data.marla,
			data.sarsai,
			data.feet,
		];
		console.log('cal sarts');

		// inner clear starts
		const TableDataTotal = [
			{
				content: `Khasra # ${data.khasra_number}`,
				colSpan: 6,
				rowSpan: 1,
				styles: { halign: 'center', fontStyle: 'bold', fontSize: 10 },
			},
		];

		tableRowsClearedLand.push(TableDataTotal);

		data.cleared_land.forEach((dataClearLand) => {
			TableClearedLand[index] = [
				dataClearLand.id + 1,

				dataClearLand.date,
				dataClearLand.kanal,
				dataClearLand.marla,
				dataClearLand.sarsai,
				dataClearLand.feet,
			];
			tableRowsClearedLand.push(TableClearedLand[index]);
			// eslint-disable-next-line operator-assignment
			TotalLandinMarlasCleared = TotalLandinMarlasCleared + [dataClearLand.kanal * 20];

			// inner clear ends
		});
		const totalCLearedLandInKhasra = getClearedLandinMarlaForSpecificKhasra(data.cleared_land);
		const sizeForCLearedLandInKhasra = ConvertMarlaLandToFullSize(totalCLearedLandInKhasra);
		allClearedLandinMarlas += parseFloat(totalCLearedLandInKhasra);

		const TableDataTotal3 = [
			{
				// content: `Total in Marlas  ${TotalLandinMarlasCleared}`,
				content: `Total Land Cleared  `,
				colSpan: 2,
				rowSpan: 1,
				styles: { halign: 'left', fontStyle: 'bold', fontSize: 10 },
			},
			{
				// content: `Total in Marlas  ${TotalLandinMarlasCleared}`,
				content: `${sizeForCLearedLandInKhasra.kanal} `,
				colSpan: 1,
				rowSpan: 1,
				styles: { halign: 'left', fontStyle: 'bold', fontSize: 10 },
			},
			{
				// content: `Total in Marlas  ${TotalLandinMarlasCleared}`,
				content: `${sizeForCLearedLandInKhasra.marla} `,
				colSpan: 1,
				rowSpan: 1,
				styles: { halign: 'left', fontStyle: 'bold', fontSize: 10 },
			},
			{
				// content: `Total in Marlas  ${TotalLandinMarlasCleared}`,
				content: `${sizeForCLearedLandInKhasra.sarsai} `,
				colSpan: 1,
				rowSpan: 1,
				styles: { halign: 'left', fontStyle: 'bold', fontSize: 10 },
			},
			{
				// content: `Total in Marlas  ${TotalLandinMarlasCleared}`,
				content: `${sizeForCLearedLandInKhasra.feet} `,
				colSpan: 1,
				rowSpan: 1,
				styles: { halign: 'left', fontStyle: 'bold', fontSize: 10 },
			},
		];
		tableRowsClearedLand.push(TableDataTotal3);
		TotalLandinMarlasCleared = 0;

		index += 1;

		tableRowsTotalLand.push(TableTotalLand);
		allClearedLandinFullSize = ConvertMarlaLandToFullSize(allClearedLandinMarlas);
	});
	const TableDataTotal2 = [
		{
			content: `Total Land  (marlas)`,
			colSpan: 2,
			rowSpan: 1,
			styles: { halign: 'left', fontStyle: 'bold', fontSize: 10 },
		},
		{
			content: ` ${ConvertTotalLandTo_(data1.khasra_record).kanal}`,
			colSpan: 1,
			rowSpan: 1,
			styles: { halign: 'center', fontStyle: 'bold', fontSize: 10 },
		},
		{
			content: ` ${ConvertTotalLandTo_(data1.khasra_record).marla}`,
			colSpan: 1,
			rowSpan: 1,
			styles: { halign: 'center', fontStyle: 'bold', fontSize: 10 },
		},
		{
			content: ` ${ConvertTotalLandTo_(data1.khasra_record).sarsai}`,
			colSpan: 1,
			rowSpan: 1,
			styles: { halign: 'center', fontStyle: 'bold', fontSize: 10 },
		},
		{
			content: ` ${ConvertTotalLandTo_(data1.khasra_record).feet}`,
			colSpan: 1,
			rowSpan: 1,
			styles: { halign: 'center', fontStyle: 'bold', fontSize: 10 },
		},
		{
			content: `|`,
			colSpan: 1,
			rowSpan: 1,
			styles: { halign: 'center', fontStyle: 'bold', fontSize: 10 },
		},
		{
			content: ` ${ConvertPurchasingLandTo_(data1.khasra_record).kanal}`,
			colSpan: 1,
			rowSpan: 1,
			styles: { halign: 'center', fontStyle: 'bold', fontSize: 10 },
		},
		{
			content: ` ${ConvertPurchasingLandTo_(data1.khasra_record).marla}`,
			colSpan: 1,
			rowSpan: 1,
			styles: { halign: 'center', fontStyle: 'bold', fontSize: 10 },
		},
		{
			content: ` ${ConvertPurchasingLandTo_(data1.khasra_record).sarsai}`,
			colSpan: 1,
			rowSpan: 1,
			styles: { halign: 'center', fontStyle: 'bold', fontSize: 10 },
		},
		{
			content: ` ${ConvertPurchasingLandTo_(data1.khasra_record).feet}`,
			colSpan: 1,
			rowSpan: 1,
			styles: { halign: 'center', fontStyle: 'bold', fontSize: 10 },
		},
	];
	tableRowsTotalLand.push(TableDataTotal2);
	TotalLandinMarlas = 0;

	const TableDataSummary = [
		{
			// content: `Total Land in marlas:   ${data1.form1.file_no}`,
			content: `Total Land :   ${ConvertTotalLandTo_(data1.khasra_record).kanal} kanal  ${
				ConvertTotalLandTo_(data1.khasra_record).marla
			} marla  ${ConvertTotalLandTo_(data1.khasra_record).sarsai} sarsai  ${
				ConvertTotalLandTo_(data1.khasra_record).feet
			} Feet`,
			colSpan: 1,
			rowSpan: 1,
			styles: { halign: 'right', fontStyle: 'bold', fontSize: 10 },
		},
	];
	tableRowsSummary.push(TableDataSummary);
	const TableDataSummary4 = [
		{
			// content: `Total Land in marlas:   ${data1.form1.file_no}`,
			content: `Total Purchasing Land:  ${
				ConvertPurchasingLandTo_(data1.khasra_record).kanal
			} kanal  ${ConvertPurchasingLandTo_(data1.khasra_record).marla} marla  ${
				ConvertPurchasingLandTo_(data1.khasra_record).sarsai
			} sarsai  ${ConvertPurchasingLandTo_(data1.khasra_record).feet} Feet`,
			colSpan: 1,
			rowSpan: 1,
			styles: { halign: 'right', fontStyle: 'bold', fontSize: 10 },
		},
	];
	tableRowsSummary.push(TableDataSummary4);

	const TableDataSummary2 = [
		{
			content: `Cleared Land in marlas:    ${allClearedLandinFullSize.kanal} kanal  ${allClearedLandinFullSize.marla} marla  ${allClearedLandinFullSize.sarsai} sarsai  ${allClearedLandinFullSize.feet} Feet`,
			colSpan: 1,
			rowSpan: 1,
			styles: { halign: 'right', fontStyle: 'bold', fontSize: 10 },
		},
	];
	tableRowsSummary.push(TableDataSummary2);
	// convert remaingin marlas into full size
	remainingLandinFullSize = ConvertMarlaLandToFullSize(
		getPurchasingLandinMarla(data1.khasra_record) - allClearedLandinMarlas,
	);
	const TableDataSummary3 = [
		{
			content: `Remaining Land to be cleared in marlas:  ${remainingLandinFullSize.kanal} kanal  ${remainingLandinFullSize.marla} marla  ${remainingLandinFullSize.sarsai} sarsai  ${remainingLandinFullSize.feet} Feet`,
			colSpan: 1,
			rowSpan: 1,
			styles: { halign: 'right', fontStyle: 'bold', fontSize: 10 },
		},
	];
	tableRowsSummary.push(TableDataSummary3);

	// console.log('Child date', sorted22[0]);

	// startY is basically margin-top
	let yPos = 100;
	//
	doc.text(`File # ${data1.form1.file_no}`, 47, yPos);
	yPos += 20;
	doc.autoTable(tableColumn, tableRows, { startY: yPos, styles: { fontSize: 8 } });
	yPos = doc.lastAutoTable.finalY + 20;
	doc.text('Total Land', 47, yPos);
	yPos += 10;
	doc.autoTable(tableColumnTotalLand, tableRowsTotalLand, {
		startY: yPos,
		styles: { fontSize: 8 },
	});
	yPos = doc.lastAutoTable.finalY + 20;
	doc.text('Cleared Land', 47, yPos);
	yPos += 10;
	doc.autoTable(tableColumnClearedLand, tableRowsClearedLand, {
		startY: yPos,
		styles: { fontSize: 8 },
	});
	yPos = doc.lastAutoTable.finalY + 20;
	doc.text('Summary', 47, yPos);
	yPos += 10;
	doc.autoTable(tableColumnSummary, tableRowsSummary, {
		startY: yPos,
		styles: { fontSize: 8 },
	});
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
	doc.text('Report I', 47, 32);
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
