// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-console */
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const GeneratePDF = (data1, data2) => {
	console.log(data1);
	console.log(data2);
	// eslint-disable-next-line new-cap
	const doc = new jsPDF();
	const col = ['Sr. No.', 'Details'];
	const col1 = ['Details', 'Values'];
	const rows = [];
	const rows1 = [];

	/* The following array of object as response from the API req  */

	const itemNew = [
		{ index: '1', id: 'Case Number', name: '101111111' },
		{ index: '2', id: 'Patient Name', name: 'UAT DR' },
		{ index: '3', id: 'Hospital Name', name: 'Dr Abcd' },
	];

	itemNew.forEach((element) => {
		const temp = [element.index, element.id];
		const temp1 = [element.name, element.id];
		rows.push(temp);
		rows1.push(temp1);
	});

	doc.autoTable(col, rows, { startY: 10 });

	doc.autoTable(col1, rows1, { startY: 60 });
	doc.save('Test.pdf');
};

export default GeneratePDF;
