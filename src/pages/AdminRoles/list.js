// ** React Imports
// import React, { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'

// import Pagination from "react-js-pagination"
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faPlus, faFilePdf } from '@fortawesome/free-solid-svg-icons'
// import Axios from 'axios'

// import { Input, Row, Col, Label, Button } from 'reactstrap'
// import generatePDF from './tablePDF'
// // ** Styles
// // import '@styles/react/libs/react-select/_react-select.scss'
// // import '@styles/react/libs/tables/react-dataTable-component.scss'
// import baseURL from '../../baseURL/baseURL'

//   // fitlter search
//   const FilterName = () => {
//     const [suppliersF, setSuppliersF] = useState([])
//     const [filter, setFilter] = useState('')
//     const [sortType, setSortType] = useState('desc')
//     const [pageNo, setPageNo] = useState(1)
//     const [total, setTotal] = useState()
//     // const [record, setRecord] = useState(10)
//     const [isLoading, setLoading] = useState(true)
//     const [column, setColumn] = useState('id')
//    const record = 900000
//     const handlePageChange = (pageNumber) => {
//       setLoading(true)
//       console.log(`active page is ${pageNumber}`)
//       setPageNo(pageNumber)
//     }

//     useEffect(() => {
// console.log('pageNo', pageNo)
//     Axios.get(`${baseURL}/getUsers?pageNo=${pageNo}&&records=${record}&&sort=${sortType}&&colName=${column}`)
//     .then(response => {
//       // console.log('Current apge', response.data.suppliers.current_page)
//       // setCurrentPage(response.data.suppliers.current_page)
//       console.log('User:::', response.data)
//       setSuppliersF(response.data.users.data)
//       setLoading(false) // stop loading when data is fetched
//       // console.log('linksss', response.data.users.links)
//       // setLinks(response.data.users.links)
//       setTotal(response.data.users.total)
//     })
//     .catch(err => console.log(err))
//   }, [pageNo, record, sortType, column])

//   // console.log(data, current_page, per_page, total)
//   console.log('Record value', record)
//     //  console.log(suppliersF)

//        const sorted = suppliersF
//       //  sort(sorted, sortType, column)
//      const filterName = sorted.filter(item => {
//       //  return item.name === 'Zahid Mehmood'
//       //  console.log('000000000', item)
//       return filter !== "" ? item.name.toLowerCase().includes(filter.toLowerCase()) || item.email.toLowerCase().includes(filter.toLowerCase()) || item.id.toString().includes(filter.toString())  || item.role.toLowerCase().includes(filter.toLowerCase()) : item

//      })

//      const mappSuppliers = filterName.map((data, index) => {
//        return (<tr key={data.email}>

//                 <td>{index + 1}</td>
//                 <td>{data.name}</td>
//                 <td>{data.email}</td>
//                 <td>{data.role}</td>
//       </tr>
//        )

//    })

//    return (
//      <div>
//         <div className='invoice-list-table-header w-100 mr-1 ml-50 mt-2 mb-75'>
//       <Row>

//       <Col xl='3' className='d-flex align-items-center p-0'>

//          &nbsp; &nbsp;
//          <div className='d-flex align-items-center mb-sm-0 mb-1 mr-1'>
//             <Label className='mb-0' for='search-invoice'>
//               Sort
//             </Label>
//          &nbsp;  &nbsp;
//         <select className="custom-select" value={column} onChange={(e) => setColumn(e.target.value)} required>
//         <option  value="id">Sr. No</option>
//         <option value="name">Name</option>
//         <option value="email">Email</option>
//         <option value="role">Role</option>

//         </select>
//         &nbsp;  &nbsp;
//         <select className="custom-select" value={sortType} onChange={(e) => setSortType(e.target.value)} required>
//         <option selected value="asc">Asc</option>
//         <option value="desc">Desc</option>
//         </select>
//          </div>
//         </Col>

//         <Col
//           xl='9'
//           className='d-flex align-items-sm-center justify-content-lg-end justify-content-start flex-lg-nowrap flex-wrap flex-sm-row flex-column pr-lg-1 p-0 mt-lg-0 mt-1'
//         >
//           <div className='d-flex align-items-center mb-sm-0 mb-1 mr-1'>
//             <Label className='mb-0' for='search-invoice'>
//               Search:
//             </Label>
//             <Input
//               id='search-invoice'
//               className='ml-50 w-100'
//               type='text'
//                value={filter}
//               onChange={e => setFilter(e.target.value)}
//             />
//           </div>
//         </Col>

//       </Row>

//       <div style={{height:5, width: 100}}>
//   {/* Just for Space */}
//       </div>

//       <Row>
//       <Col xl='3' className='d-flex align-items-center p-0'>
//       &nbsp;  &nbsp;
//           <div className='d-flex align-items-center w-100'>

//             <Label for='rows-per-page'>Show</Label>
//             {/* <CustomInput
//               className='form-control mx-50'
//               type='select'
//               id='rows-per-page'
//               value={record}
//               onChange={(e) => setRecord(e.target.value)}
//               style={{
//                 width: '5rem',
//                 padding: '0 0.8rem',
//                 backgroundPosition: 'calc(100% - 3px) 11px, calc(100% - 20px) 13px, 100% 0'
//               }}
//             >
//               <option value='10'>10</option>
//               <option value='25'>25</option>
//               <option value='50'>50</option>
//             </CustomInput> */}
//             <Label for='rows-per-page'>Entries</Label>
//           </div>
//         </Col>
//         <Col
//           xl='9'
//           className='d-flex align-items-sm-center justify-content-lg-end justify-content-start flex-lg-nowrap flex-wrap flex-sm-row flex-column pr-lg-1 p-0 mt-lg-0 mt-1'
//         >
//            <Link to='/apps/admin/add'>
//         <Button.Ripple color='primary' onClick=''>  <FontAwesomeIcon icon={faPlus} color="white" /> &nbsp; Add </Button.Ripple>
//          </Link> &nbsp;  &nbsp;
//             <Button.Ripple
//               className="btn btn-primary"
//               onClick={() => generatePDF(filterName)}
//             >
//             <FontAwesomeIcon icon={faFilePdf} color="white" />  Export
//             </Button.Ripple> &nbsp;  &nbsp;  &nbsp;
//         </Col>
//       </Row>
//       <div style={{height:10, width: 100}}>
//   {/* Just for Space */}
//       </div>

//       {/* Loader */}
//      {  isLoading ? (
//      <div className="text-center">
//      <div className="spinner-border" role="status">
//        <span className="sr-only">Loading...</span>
//      </div>
//    </div>)  : (
//       <div className="table-responsive">
//     <table className="table table-striped">
//    <thead>
//      <tr>
//                 <th scope="col">Sr. No</th>
//                 <th scope="col">Name</th>
//                 <th scope="col">Email</th>
//                 <th scope="col">Role</th>
//                 {/* <th scope="col">Email</th> */}

//                 {/* <th scope="col">Update Record</th> */}

//      </tr>
//    </thead>
//    <tbody>
//     {mappSuppliers}

//    </tbody>
//    </table>
//   <Row>
//   <Col
//           xl='12'
//           className='d-flex align-items-sm-center justify-content-lg-end justify-content-start flex-lg-nowrap flex-wrap flex-sm-row flex-column pr-lg-1 p-0 mt-lg-0 mt-1'
//         >
//   <Pagination
//          activePage={pageNo}
//          itemsCountPerPage={record}
//          totalItemsCount={total}
//          onChange={(e) => handlePageChange(e)}
//          itemClassName="page-item"
//           linkClassName="page-link"
//           firstPageText="First"
//           lastPageText="Last"
//           nextPageText="Next"
//           prevPageText="Prev"

//        />
//        </Col>
//   </Row>
//      </div>)}

//      </div>
//    </div>

//    )
//    }

// const ListAdmin = () => {
//   return (
//     <div>
//        <FilterName />
//        {/* <h3><FontAwesomeIcon icon={faPlus} color="blue" /> Font Awesome Address Icon</h3> */}
//     </div>
//    )
//    }

//    export default ListAdmin
import React from 'react';

function list() {
	return <div>In Progress ........</div>;
}

export default list;
