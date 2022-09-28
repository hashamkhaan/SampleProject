// list/tablePDF.js

import jsPDF from "jspdf"
import "jspdf-autotable"
// Date Fns is used to format the dates we receive
// from our API call
// import { format } from "date-fns"
import pakLogo from '../../../../assets/images/logo/size-2.png'
// define a generatePDF function that accepts a tickets argument
const generatePDF = filterName => {
  // initialize jsPDF
  const doc = new jsPDF()

  // define the columns we want and their titles
  const tableColumn = ["Sr. No", "Name", "Email", "Role"]
  // define an empty array of rows
  const tableRows = []

  // for each ticket pass all its data into an array
  filterName.forEach((data, index) => {
    const TableData = [
                index  + 1,
                data.name,
                data.email,
                data.role
      // called date-fns to format the date on the ticket
    //   format(new Date(data.updated_at), "yyyy-MM-dd")
    ]
    // push each tickcet's info into a row
    tableRows.push(TableData)
  })


  // startY is basically margin-top
  doc.autoTable(tableColumn, tableRows, { startY: 45 })
  const date = Date().split(" ")
  // we use a date string to generate our filename.
  const dateStr = date[0] + date[1] + date[2] + date[3] + date[4]
  // ticket title. and margin-top + margin-left

  doc.addImage(pakLogo, 'JPEG', 10, 2, 40, 40) 
  doc.setFontSize(24)
  doc.setFont("arial")
  doc.setFont(undefined, 'bold')
  doc.text("Koncept UPVC Upvc Doors & Windows SC", 46, 20)
  doc.setFontSize(12)
  doc.setFont("arial")
  doc.setFont(undefined, 'bold')
  doc.text("Ground Floor Sami Plaza High Court Road Rawalpindi", 47, 26)
  doc.text("Users / Admins List", 47, 32)
  doc.setFontSize(12)
  doc.setFont("normal")
  doc.setFont(undefined, 'normal')
  doc.text("", 14, 15)
  // we define the name of our PDF file.
  doc.save(`UsersList_${dateStr}.pdf`)
}

export default generatePDF