// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-unused-vars */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-console */
// list/tablePDF.js

import jsPDF from 'jspdf';
import 'jspdf-autotable';
import rehbarLogo from '../../../assets/logos/reh_kbd/rehbar.png';

// Date Fns is used to format the dates we receive
// from our API call
// import { format } from "date-fns"
// define a generatePDF function that accepts a tickets argument
const generatePDF = (data1, type) => {
	// initialize jsPDF

	// eslint-disable-next-line new-cap
	const doc = new jsPDF();

	// define the columns we want and their titles
	const tableColumn = ['Sr. No', 'Name', 'Email', 'Role'];
	// define an empty array of rows
	const tableRows = [];

	// for each ticket pass all its data into an array
	data1.forEach((data, index) => {
		const TableData = [
			index + 1,
			data.name,
			data.email,
			data.role.role,
			// called date-fns to format the date on the ticket
			//   format(new Date(data.updated_at), "yyyy-MM-dd")
		];
		// push each tickcet's info into a row
		tableRows.push(TableData);
	});

	// startY is basically margin-top
	doc.autoTable(tableColumn, tableRows, { startY: 45 });
	const date = Date().split(' ');
	// we use a date string to generate our filename.
	const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
	// ticket title. and margin-top + margin-left

	doc.addImage(rehbarLogo, 'JPEG', 10, 8, 35, 30);
	doc.setFontSize(24);
	doc.setFont('arial');
	doc.setFont(undefined, 'bold');
	doc.text('REHBAR HOUSING SOCIETY', 46, 20);
	doc.setFontSize(12);
	doc.setFont('arial');
	doc.setFont(undefined, 'bold');
	doc.text('Phone No: 051 512622', 47, 26);
	doc.text('Users / Admins List', 47, 32);
	doc.setFontSize(12);
	doc.setFont('normal');
	doc.setFont(undefined, 'normal');
	doc.text('', 14, 15);
	console.log('font::::::', doc.getFontList());
	// we define the name of our PDF file.

	if (type === 1) {
		doc.save(`UsersList_${dateStr}.pdf`);
	} else if (type === 2) {
		doc.output('UserList');
	}
};

export default generatePDF;
