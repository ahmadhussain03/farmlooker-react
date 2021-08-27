import React, { useRef, useEffect, useState } from 'react'

import { createUrl, getAuthorizationHeader } from '../../utils/axios'

const $ = require('jquery')
$.DataTable = require('datatables.net-dt')
require('datatables.net-responsive-dt')

const Datatable = ({ url, columns }) => {

    const table = useRef(null)
    const datatable = useRef(null)

    useEffect(() => {
      datatable.current = $(table.current).DataTable({
          responsive: true,
          processing: true,
          serverSide: true,
          ajax: {
              url: createUrl('animal?client=datatable'),
              headers: {
                ...getAuthorizationHeader()
              }
          },
          search: {
            regex: false
          },
          columns: [
              {data: 'animal_id', name: 'animal_id'},
              {data: 'type', name: 'type'},
              {data: 'breed', name: 'breed'},
              {data: 'sex', name: 'sex'},
              {data: 'dob', name: 'dob'},
              {data: 'add_as', name: 'add_as'},
          ],
          initComplete: function () {
            this.api().columns().every( function () {
                var column = this;
                var select = $('<input type="text" style="border: 1px solid black" />')
                    .appendTo( $(column.footer()).empty() )
                    .on( 'change', function () {
                        var val = $.fn.dataTable.util.escapeRegex(
                            $(this).val()
                        );

                        console.log(val)

                        val = $(this).val()
 
                        column
                            .search( val ? '^'+val+'$' : '', true, false )
                            .draw();
                    } );
 
            } );
        }
      })       

      return () => {
          datatable.current.destroy(true)
      }

    }, [])

    return (
        <div className="bg-gray-100 shadow-lg py-2 px-3 w-full rounded-md">
            <table ref={table} className="max-w-full">
                <thead>
                    <tr>
                        <th>Animal ID</th>
                        <th>Animal Type</th>
                        <th>Animal Breed</th>
                        <th>Sex</th>
                        <th>DOB</th>
                        <th>Add As</th>
                    </tr>
                </thead>
                <tbody>
                    
                </tbody>
                <tfoot>
                    <tr>
                        <th>Animal ID</th>
                        <th>Animal Type</th>
                        <th>Animal Breed</th>
                        <th>Sex</th>
                        <th>DOB</th>
                        <th>Add As</th>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}

export default Datatable
