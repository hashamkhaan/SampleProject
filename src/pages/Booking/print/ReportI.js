// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-unused-vars */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-console */
// list/tablePDF.js
import { ToWords } from 'to-words';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import moment from 'moment';
import rehbarLogo from '../../../assets/logos/reh_kbd/rehbar.png';
import square from '../../../assets/pdfImages/square.png';
import checkBoxEmpty from '../../../assets/pdfImages/check-box-empty.png';
import check from '../../../assets/pdfImages/check.png';
import kbdLogo from '../../../assets/logos/reh_kbd/kbd.png';

const GeneratePDF = (BookingData, type) => {
	// initialize jsPDF

	console.log('Data inside PDF::::::::', BookingData);
	// eslint-disable-next-line new-cap
	const doc = new jsPDF('p', 'pt', 'a4');
	const pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
	const pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();
	const toWords = new ToWords();

	let yPos = 100;
	doc.addImage(rehbarLogo, 'JPEG', 25, 20, 110, 80);
	// doc.addImage(kbdLogo, 'JPEG', 470, 20, 110, 80);
	yPos -= 10;
	doc.setFont(undefined, 'bold');
	doc.text('REHBAR HOUSING SOCIETY', 200, 40);
	doc.setFontSize(12);
	doc.setFont(undefined, 'normal');
	doc.text(`Booking No: BK-N0-${BookingData?.id}`, pageWidth / 2, 55, { align: 'center' });

	yPos += 40;
	doc.setFontSize(11);
	doc.setFont(undefined, 'normal');
	doc.text('Booking Date:', 400, yPos);
	doc.text(`${moment(BookingData?.client.updated_at).format('MMMM D, YYYY')}`, 475, yPos);

	doc.setFontSize(12);
	doc.setFont(undefined, 'normal');

	yPos += 20;
	doc.text(
		`Dear Sir / Ma'am,
I the undersigned request you to please register my name for booking a ${
			BookingData?.plot?.plot_type === 1 ? 'Residential' : 'Commercial'
		} plot in
your Project "REHBAR Housing Society, Main Chakri Road Rawalpindi!" on the prescribed 
schedule of payment.`,
		40,
		yPos,
		{ lineHeightFactor: 1.5 },
	);

	yPos += 75;
	doc.text('Name Mr / Mrs / Miss: ', 40, yPos);
	doc.text(`${BookingData?.client.name}`, 200, yPos - 4);
	doc.line(162, yPos, 400, yPos);

	yPos += 30;
	doc.text('Name of Father / Husband: ', 40, yPos);
	doc.text(`${BookingData?.client.father_name}`, 200, yPos - 4);
	doc.line(190, yPos, 400, yPos);

	yPos += 30;
	doc.text('CNIC: ', 40, yPos);
	doc.text(`${BookingData?.client.cnic}`, 100, yPos - 4);
	doc.line(80, yPos, 400, yPos);

	yPos += 30;
	doc.text('Address (Residence):', 40, yPos);
	doc.text(`${BookingData?.client.address}`, 170, yPos - 4);
	doc.line(170, yPos, 550, yPos);

	yPos += 30;
	doc.text('Tell (Office):', 40, yPos);
	doc.text(`${BookingData?.client?.profile[0].tel_office}`, 120, yPos - 4);
	doc.line(110, yPos, 210, yPos);

	doc.text('RoS:', 220, yPos);
	doc.text(``, 255, yPos - 4);
	doc.line(250, yPos, 350, yPos);

	doc.text('Cell No:', 355, yPos);
	doc.text(`${BookingData?.client.phone_no}`, 415, yPos - 4);
	doc.line(400, yPos, 550, yPos);

	yPos += 30;
	doc.text('Emergency Contact:', 40, yPos);
	doc.text(`${BookingData?.client?.profile[0].emergency_contact}`, 170, yPos - 4);
	doc.line(150, yPos, 345, yPos);

	doc.text('Email:', 355, yPos);
	doc.text(`${BookingData?.client.email}`, 402, yPos - 4);
	doc.line(400, yPos, 550, yPos);

	yPos += 30;
	doc.text('Nominee:', 40, yPos);
	doc.text(`${BookingData?.client?.profile[0].nominee}`, 110, yPos - 4);
	doc.line(100, yPos, 300, yPos);

	doc.text('Relationship:', 305, yPos);
	doc.text(`${BookingData?.client?.profile[0].relationship}`, 390, yPos - 4);
	doc.line(380, yPos, 550, yPos);

	yPos += 30;
	doc.text('CNIC of Nominee:', 40, yPos);
	doc.text(`${BookingData?.client?.profile[0].cnic_nominee}`, 170, yPos - 4);
	doc.line(150, yPos, 550, yPos);

	doc.setFontSize(14);
	doc.setFont('arial');
	doc.setFont(undefined, 'bold');

	yPos += 80;
	doc.text('DECLARATION', 40, yPos);

	doc.setFontSize(11);
	doc.setFont('arial');
	doc.setFont(undefined, 'bold');
	doc.text(`Urdu text will be here`, 170, yPos + 10);

	yPos += 230;
	doc.text('Thumb:', 305, yPos);
	doc.line(360, yPos, 550, yPos);

	yPos += 30;
	doc.text('Dated:', 40, yPos);
	doc.line(77, yPos, 250, yPos);

	doc.text(`Applicant's Signature:`, 255, yPos);
	doc.line(370, yPos, 550, yPos);
	// End of page 1 content

	doc.addPage('A4', 'portrait');
	doc.setFontSize(14);
	doc.setFont('arial');
	doc.setFont(undefined, 'bold');

	yPos = 30;
	doc.text(`TERMS & CONDITIONS`, 200, yPos);
	yPos += 25;

	doc.setFontSize(11);
	doc.setFont('arial');
	doc.setFont(undefined, 'normal');
	doc.text(
		`1. The name of the project shall be REHBAR COLONY  which is being developed at, Main Chakri Road Rawalpindi launched and developed by Kashmir builders and developers (pvt). Limited.
2. The person applying for purchasing the residential/commercial plot in rehbar colony housing scheme and the final owner/allottee in rehbar colony will be refered to as customer for the purpose of these terms and conditions. Therefore, these terms and conditions are meant for all customers, and all customers are required to abide by these terms during and after the allotment of plot in rehbar colony. Similarly, all agreements regarding customer’s unit are and will be between customer and rehbar colony (hereinafter refer to as company).
3. The customers shall pay all the installments as per the payment schedule agreed upon between customer and company.
4. All payments are to be made according to the category/size of the plot, as per schedule of payment, through bank draft/ pay order in favour of Kashmir Builders and Developers (pvt). Limited. Overseas Pakistanis may remit their payments by online transfer/bank drafts in US dollar or British Pounds/Euro in favour of Kashmir Builders and Developers (Pvt) Limited. 
5. The demand notice of payments and all correspondence will be dispatched at the address/ phone number provided by the customers given in application form. The company shall not be responsible for non-delivery of communication if change of address/phone number is not notified to the company by the customer(s) in advance. 
6. In case of any delay in payment of monthly installments or if the customer opts, society has the right to cancel the file and return customer’s amount already paid, in full, without any deduction. In all of the above scenario, customer will have to intimate the management in advance and the amount will be refunded via a bank cheque/online transfer, post-dated 2 to 3 months subsequent of the day. 
7. Any processing fee paid is non-refundable and not a part of the total amount. 
8. In event of non-payment of current dues of surcharge levies or installments received after the due date from the allottee/applicants will only be accepted with 15% surcharge per month (which will be taken as 0.05% daily). Provided that if any allottee fails to pay 2 successive installments within the prescribed period, the allotment is liable to be canceled. In the event of property cancellation by rebar colony/ Kashmir Builders and Developers the submitted payment will be refunded with 20% deduction, without any profit, interest or markup. However, any processing fee is non-refundable. 
9 .For each preferential location, i.e. corner, park-facing, applicants will pay 10% premium/each and for main boulevard plot applicants will pay 15% premium/each. In case of multiple preferences in location the applicant will pay in multiples of the premium amount for example main boulevard, corner, park-facing plots will be charged 35% in addition to the total amount. 
10.No applicant shall be entitled to claim or receive any interest/mark up against the amount paid by applicant to rehbar colony/Kashmir Builders and Developers.
11.Plot allotted to an applicant shall not be used by the allottee for any purpose other than that applied or meant for
12.Only the pre-approved elevation by rehbar colony for a given plot can be constructed on the plots. No further construction or modification to any construction can be done without pre-approval of rehbar colony. 
13.The size and location of the property is tentative and subject to adjustment after demarcation/measurement of the property at time of handing over possession. 
14.In case of extra area with any property, proportionate extra amount will be charged in addition to the total amount. Likewise, in case of lesser areas, proportionate amount will be adjusted accordingly. 
15.Transfer of property allotted to an applicant shall be allowed only after the receipt of updated payment/charges. All registration/mutation charges shall be borne by the allottee. 


	`,
		40,
		yPos,
		{ lineHeightFactor: 1.5, maxWidth: 510, align: 'justify' },
	);
	yPos += 700;
	doc.setFontSize(12);
	doc.setFont('arial');
	doc.setFont(undefined, 'bold');

	yPos += 30;
	doc.text('Thumb:', 305, yPos);
	doc.line(360, yPos, 550, yPos);

	yPos += 30;
	doc.text('Dated:', 40, yPos);
	doc.line(77, yPos, 250, yPos);

	doc.text(`Applicant's Signature:`, 255, yPos);
	doc.line(370, yPos, 550, yPos);

	// End of page 2 content

	doc.addPage('A4', 'portrait');
	doc.setFontSize(14);
	doc.setFont('arial');
	doc.setFont(undefined, 'bold');

	yPos = 30;

	doc.setFontSize(11);
	doc.setFont('arial');
	doc.setFont(undefined, 'normal');
	doc.text(
		`16.In case of transfer of plot, first allottee will be bound to clear all the committed dues till that time with rehbar colony before the transfer.
17.All registration/mutation charges shall be borne by the allottee along with any other government tax in vogue.
18.Rehbar Colony reserves the right to allot/sell the property cancelled from the name of the allottee due to non-payment of dues or any reason whatsoever, to any other applicant or person and the ex-allottee shall have no right to such a property. Rehbar colony’s decision in this regards shall be final. Any dispute shall be resolved according to the para# 24 below. 
19.Charges include the charges of internal construction but do not include the cost% charges of provision of electricity, public amenities, and maintenance. Provision of utility and service charges shall be obtained later.
20.In addition to the dues specified above, any dues payable under applicable laws, the allottee will be able to pay escalation and other charges at the rates specified by Rehbar Colony from time to time to accommodate escalations in the cost of raw material/products required and provisions/up-gradation of other amenities/services. 
21.In case of any dispute between the allottee and rehbar colony, the dispute will be referred to arbitration, which will be conducted by an authorized officer of Rehbar Colony whose decision shall be final and binding on the parties to the dispute
22.Every applicant will abide by these terms and conditions in addition to the bye-law rules and regulations governing allotment, possession, ownership, construction and transfer of plots, enforced from time to time by Rehbar Colony, and any other development authority competent to do so, in accordance with applicable laws. 
23.Development charges are exclusive. 
24.I hereby confirm having read and understood the aforesaid terms and conditions and hereby agree to abide by the same unconditionally for all times and put my signature herein below as my acceptance of all terms and conditions mentioned above. 

	`,
		40,
		yPos,
		{ lineHeightFactor: 1.5, maxWidth: 510, align: 'justify' },
	);
	yPos += 700;
	doc.setFontSize(12);
	doc.setFont('arial');
	doc.setFont(undefined, 'bold');

	yPos += 30;
	doc.text('Thumb:', 305, yPos);
	doc.line(360, yPos, 550, yPos);

	yPos += 30;
	doc.text('Dated:', 40, yPos);
	doc.line(77, yPos, 250, yPos);

	doc.text(`Applicant's Signature:`, 255, yPos);
	doc.line(370, yPos, 550, yPos);
	// End of page 3

	doc.addPage('A4', 'portrait');

	yPos = 100;
	doc.addImage(rehbarLogo, 'JPEG', 25, 20, 110, 80);
	// doc.addImage(kbdLogo, 'JPEG', 470, 20, 110, 80);
	yPos -= 10;
	// doc.setFont(undefined, 'bold');
	// doc.text('REHBAR HOUSING SOCIETY', 200, 40);
	doc.setFontSize(16);
	doc.setFont(undefined, 'bold');
	doc.text(`FOR OFFICIAL USE ONLY`, pageWidth / 2, 55, { align: 'center' });

	yPos += 40;
	doc.setFontSize(14);
	doc.setFont(undefined, 'bold');
	doc.text(
		`${BookingData?.plot?.plot_type === 1 ? 'RESIDENTIAL' : 'COMMERCIAL'} PLOT:`,
		40,
		yPos,
	);

	doc.setFontSize(12);
	doc.setFont(undefined, 'normal');

	yPos += 20;
	doc.text(`Preferred Choice (Subject to Availibility).`, 40, yPos, { lineHeightFactor: 1.5 });
	
	// doc.text(`${BookingData.plot.plot_type === 1 ? 'RESIDENTIAL' : 'COMMERCIAL'}`, 70, yPos);
	// doc.addImage(checkBoxEmpty, 'JPEG', 40, yPos + 10, 20, 20);
	// doc.addImage(check, 'JPEG', 40, yPos + 10, 20, 20);

	yPos += 30;
	doc.text('Plot No:', 40, yPos);
	doc.text(`${BookingData?.plot.plot_no}`, 95, yPos - 4);
	doc.line(85, yPos, 200, yPos);

	doc.text('Plot Size:', 210, yPos);
	doc.text(`${BookingData?.plot.size_in_SRFT}`, 270, yPos - 4);
	doc.line(260, yPos, 450, yPos);

	yPos += 30;
	doc.text('Street No:', 40, yPos);
	doc.text(`${BookingData?.street.name}`, 95, yPos - 4);
	doc.line(90, yPos, 200, yPos);

	doc.text('Block / Sector:', 210, yPos);
	doc.text(`${BookingData?.block.name}`, 290, yPos - 4);
	doc.line(285, yPos, 450, yPos);

	yPos += 30;
	doc.setFontSize(12);
	doc.setFont(undefined, 'bold');

	doc.text('Location / Type:', 40, yPos);
	doc.text(`${BookingData?.block.name}`, 135, yPos - 4);
	doc.line(125, yPos, 450, yPos);

	yPos += 35;
	doc.setFontSize(12);
	doc.setFont(undefined, 'normal');

	doc.text('Preference of Plot:', 40, yPos);
	
	doc.addImage(`${BookingData.plot.is_general === 0 ? square : check}`, 150, yPos - 13, 17, 17);
	doc.text('General', 172, yPos);

	doc.addImage(`${BookingData.plot.is_corner === 0 ? square : check}`, 250, yPos - 13, 17, 17);
	doc.text('Corner (10% Extra)', 272, yPos);

	doc.addImage(`${BookingData.plot.is_boulevard === 0 ? square : check}`, 390, yPos - 13, 17, 17);
	doc.text('Boulevard (10% Extra)', 412, yPos);

	yPos += 30;

	doc.addImage(`${BookingData.plot.is_west_open === 0 ? square : check}`, 150, yPos - 13, 17, 17);
	doc.text('West Open (10% Extra)', 172, yPos);

	doc.addImage(`${BookingData.plot.is_facing_park	=== 0 ? square : check}`, 300, yPos - 13, 17, 17);
	doc.text('Facing Park (10% Extra)', 322, yPos);

	yPos += 50;
	doc.setFontSize(14);
	doc.setFont(undefined, 'bold');
	doc.text(
		`BANK DETAILS:`,
		40,
		yPos,
	);

	doc.setFontSize(12);
	doc.setFont(undefined, 'normal');

	yPos += 20;
	doc.text(`Preferred Choice (Subject to Availibility).`, 40, yPos, { lineHeightFactor: 1.5 });
	
	yPos += 30;
	doc.text('Account:', 40, yPos);
	doc.text(`984545437234`, 110, yPos - 4);
	doc.line(100, yPos, 450, yPos);

	yPos += 30;
	doc.text('DD / Pay Order No:', 40, yPos);
	doc.text(`984545437234`, 150, yPos - 4);
	doc.line(140, yPos, 450, yPos);

	yPos += 30;
	doc.text('Total Amount:', 40, yPos);
	doc.text(`${BookingData.plot.price}`, 130, yPos - 4);
	doc.line(125, yPos, 190, yPos);

	doc.text('In words:', 195, yPos);
	doc.text(toWords.convert(BookingData.plot.price), 260, yPos - 4);
	doc.line(250, yPos, 530, yPos);

	yPos += 30;
	doc.text('(PKR) Drwan On Bank', 40, yPos);
	doc.text(`${BookingData.plot.price}`, 170, yPos - 4);
	doc.line(165, yPos, 340, yPos);

	doc.text('Branch', 350, yPos);
	doc.text('', 400, yPos - 4);
	doc.line(390, yPos, 530, yPos);

	yPos += 40;
	doc.setFontSize(14);
	doc.setFont(undefined, 'bold');
	doc.text(
		`Booked By:`,
		40,
		yPos,
	);
	doc.text(`${BookingData?.client?.name}`, 125, yPos - 4);
	doc.line(120, yPos, 530, yPos);

	doc.setFontSize(12);
	doc.setFont(undefined, 'normal');

	yPos += 30;
	doc.text('Down Payment Rs:', 40, yPos);
	doc.text(`${BookingData?.notInBackend}`, 150, yPos - 4);
	doc.line(145, yPos, 300, yPos);

	yPos += 30;
	doc.text('Confirmation Charges Rs:', 40, yPos);
	doc.text(`${BookingData?.notInBackend}`, 180, yPos - 4);
	doc.line(175, yPos, 300, yPos);

	yPos += 30;
	doc.text('Total Price Rs:', 40, yPos);
	doc.text(`${BookingData?.notInBackend}`, 130, yPos - 4);
	doc.line(125, yPos, 300, yPos);

	doc.text('Thumb:', 360, yPos);
	doc.text('', 400, yPos - 4);
	doc.line(400, yPos, 530, yPos);

	yPos += 30;
	doc.text('Payment Plan agreed & submitted:', 40, yPos);
	doc.setFont(undefined, 'bold');
	doc.text(`YES / No`, 225, yPos);

	doc.setFont(undefined, 'normal');

	doc.text('Signature:', 360, yPos);
	doc.text('', 412, yPos - 4);
	doc.line(410, yPos, 530, yPos);

	yPos += 70;
	doc.text('Booking Executive:', 40, yPos);
	doc.line(140, yPos, 250, yPos);

	doc.text(`Account Section:`, 255, yPos);
	doc.line(350, yPos, 550, yPos);

	yPos += 30;
	doc.text('GM Operation:', 255, yPos);
	doc.line(350, yPos, 550, yPos);

	// End of page 4

	// Footer Date
    
	doc.setFontSize(12);
	doc.setFont('normal');
	doc.setFont(undefined, 'normal');
	doc.setFontSize(8);
	doc.text(
		`Date Printed: ${moment().format('DD-MM-YYYY hh:mm:ss a')}`,
		pageWidth - 40,
		yPos + 20,
		{
			align: 'right',
		},
	);

	// Footer Starts
	doc.page = 1;
	// doc.text(150, yPos, `Print date: ${Date()}`);
	doc.page += 1;
	// Footer Ends
	const date = Date().split(' ');
	// we use a date string to generate our filename.
	const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];

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
		doc.save(`BookingList_${dateStr}.pdf`);
	} else if (type === 2) {
		doc.output('dataurlnewwindow');
	}
};

export default GeneratePDF;
