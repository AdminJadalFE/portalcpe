import {useMemo} from 'react'  
import {KTCardBody} from '../../../../_metronic/helpers'

import {useTable, usePagination} from 'react-table'
import {CustomHeaderColumn} from './table/CustomHeaderColumn'
import {CustomRow} from './table/CustomRow'
  

export default function ReporteBody({cpes,cpesColumns}) {

    const columns = useMemo(() => cpesColumns, []) 
    const data = useMemo(() => cpes, [cpes]) 

  
    const {
        getTableProps,
        getTableBodyProps,
        headers,
        page,
        nextPage,
        previousPage,
        canPreviousPage,
        canNextPage,
        pageOptions,
        state,
        gotoPage,
        pageCount,
        setPageSize,
        prepareRow
      } = useTable(
        {
          columns,
          data,
          initialState: { pageIndex: 0 }
        },
        usePagination
      );

      
    const { pageIndex, pageSize } = state;
 
    return (
        <KTCardBody className='py-4'>
                <div className='table-responsive'>
                    
                <table
                    id='kt_table_users'
                    className='align-middle table-row-dashed dataTable no-footer'
                    {...getTableProps()}
                >
                    <thead>
                    <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
                        {headers.map((column) => (
                            <CustomHeaderColumn key={column.id} column={column} />
                        ))}
                    </tr>
                    </thead>  
  
                    <tbody className='text-gray-600 fw-bold' {...getTableBodyProps()}>
                        {page.length > 0 ? (
                            page.map((row, i) => {
                            prepareRow(row)
                            return <CustomRow row={row} key={`row-${i}-${row.id}`} />
                            })
                        ) : (
                            <tr>
                            <td colSpan={10}>
                                <div className='d-flex text-center w-100 align-content-center justify-content-center'>
                                No se han encontrado resultados
                                </div>
                            </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                </div>
                {/* <UsersListPagination /> */} 
                <br></br>
                <div className='row'>
                    <div className='col-sm-12 col-md-5 d-flex align-items-center justify-content-center justify-content-md-start'></div>
                     <div className='col-sm-12 col-md-7 d-flex align-items-center justify-content-center justify-content-md-end'>
                        <div id='kt_table_users_paginate'>

                        <ul className='pagination'> 

                            <li className="page-item"> 
                                <button  className="page-link" style={{cursor: 'pointer'}} onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{"<<"}</button>&nbsp;
                            </li>
                            <li className="page-item"> 
                                <button  className="page-link" style={{cursor: 'pointer'}} onClick={() => previousPage(0)} disabled={!canPreviousPage}>{"Anterior"}</button>&nbsp;
                            </li>
                            <li className="page-item"> 
                                <button  className="page-link" style={{cursor: 'pointer'}} onClick={() => nextPage(0)} disabled={!canNextPage}>{"Siguiente"}</button>&nbsp;
                            </li>
                            <li className="page-item"> 
                                <button  className="page-link" style={{cursor: 'pointer'}} onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>{">>"}</button>&nbsp;
                            </li>
                            <li className="page-item"> 
                                <span className="page-link" style={{cursor: 'pointer'}}> Página &nbsp; <strong> {pageIndex + 1} de {pageOptions.length}</strong>&nbsp;</span>&nbsp;
                            </li> 
                            <li className="page-item"> 
                                <span className="page-link">
                                    | Ir a Página:&nbsp;
                                    <input className="page-link"
                                        type="number"
                                        defaultValue={pageIndex}
                                        onChange={(e) => {
                                        const pageNumber = e.target.value
                                            ? Number(e.target.value) - 1
                                            : 0;
                                        gotoPage(pageNumber);
                                        }}
                                        style={{ width: "50px" }}
                                    />
                                </span>&nbsp;
                            </li> 
                            <li className="page-item">  
                                <select className="page-link"
                                    value={pageSize}
                                    onChange={(e) => setPageSize(Number(e.target.value))}
                                    >
                                        {[10, 25, 50].map((pageSize) => (
                                            <option className="page-link" key={pageSize} value={pageSize}>  Mostrar {pageSize} </option>
                                        ))}
                                </select> &nbsp;
                            </li>  
                    </ul>
                </div>
            </div>
        </div>
        </KTCardBody>
    )
}





