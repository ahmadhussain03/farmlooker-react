import React, { useRef, useEffect } from 'react'

import { createUrl, getAuthorizationHeader } from '../../utils/axios'

const $ = require('jquery')
$.DataTable = require('datatables.net-dt')
require('datatables.net-responsive-dt')

$.fn.dataTable.ext.errMode = 'none';

const Datatable = ({ url, columns, columnNames, listeners = [] }) => {

    const table = useRef(null)
    const datatable = useRef(null)

    useEffect(() => {

        const tr = table.current.tHead.children[0]
        const trFoot = table.current.tFoot.children[0]
        columnNames.map(columnName => {
            const th = document.createElement('th');
            const thFoot = document.createElement('th');
            th.innerHTML = columnName;
            thFoot.innerHTML = columnName;
            tr.appendChild(th);
            trFoot.appendChild(thFoot);

            return columnName
        })
        
        datatable.current = $(table.current).DataTable({
            responsive: true,
            processing: true,
            serverSide: true,
            autoWidth: false,
            ajax: {
                url: createUrl(url),
                headers: {
                    ...getAuthorizationHeader()
                }
            },
            search: {
                regex: false
            },
            columns: columns,
            columnDefs: [
                { className: 'text-center items-center justify-center', targets: '_all' }
            ]
        })

        listeners.forEach(listener => {
            $( "#datatable" ).on( "click", 'a' + listener.key, async (e) => {
                e.preventDefault()

                let id = $(e.target.parentNode.parentNode).attr("id")   
                if(!id){
                    id = $(e.target.parentNode.parentNode.parentNode.parentNode.parentNode).prev().attr('id')  
                } 
                if(id){
                    try {
                        await listener.listener(id)
                    } catch(e){
                        console.error(e)
                    }
                    datatable.current.ajax.reload()
                }
            });
        })

        return () => {
            listeners.forEach(listener => {
                $("#datatable").off("click", listener.key)
            })
            datatable.current.destroy(true)
        }

    }, [columnNames, columns, url, listeners])

    return (
        <div className="bg-gray-100 shadow-lg py-2 px-3 w-full rounded-md max-w-full" id="datatable" style={{width: '100%'}}>
            <table ref={table} className="max-w-full">
                <thead>
                    <tr>
                    
                    </tr>
                </thead>
                <tbody>
                    
                </tbody>
                <tfoot>
                    <tr>

                    </tr>
                </tfoot>
            </table>
        </div>
    )
}

export default Datatable
