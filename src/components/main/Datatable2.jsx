import React from 'react'
import { useState, useEffect, useRef, useCallback } from 'react'
import Loader from "react-loader-spinner";
import { debounce } from 'lodash';

import axios from '../../utils/axios'

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import ArrowDown from './../icons/ArrowDown';
import ArrowUp from './../icons/ArrowUp';

const perPageOptions = [10, 25, 50, 100]

const DEBOUNCE_TIME = 500
const OFFSET = 4

const Loading = () => {
    return (
        <div className="flex justify-center items-center py-5">
            <Loader
                visible={true}
                type="Rings"
                color="#26AA20"
                secondaryColor="#61BC5B"
                height={100}
                width={100}
            />
            <p className="tracking-wider text-primary-900 font-semibold text-xl">Loading...</p>
        </div>
    )
}

const DatatableOptions = ({ perPage, handlePerPageChange, handleSearchChange, SelectedAction }) => {
    return (
        <div className="py-2 flex flex-row items-center justify-between">
            <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">Per Page</label>
                <div className="mt-1 rounded-md shadow-sm">
                    <select className="focus:ring-primary-900 focus:border-primary-900 block w-full px-2 py-1 sm:text-sm outline-none border-gray-300 rounded-md" value={perPage} onChange={e => handlePerPageChange(e.target.value)}> 
                        {perPageOptions.map(opt => (
                            <option value={opt} key={opt}>{opt}</option>
                        ))}
                    </select>
                </div>
            </div>
            {SelectedAction ? SelectedAction() : null}
            <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">Search</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                    <input type="text" className="focus:ring-primary-900 focus:border-priring-primary-900 outline-none block w-full px-2 py-1 sm:text-sm border-gray-300 rounded-md" placeholder="Search..." onChange={e => handleSearchChange(e.target.value)} />
                </div>
            </div>
        </div>
    )
}

const Paginator = ({ paginator: pagination, pageChanged }) => {

    const [pageNumbers, setPageNumbers] = useState([])
    useEffect(() => {
        const setPaginationPages = () => {
            let pages = []
            const { last_page, current_page, to } = pagination
            if (!to) return []
            let fromPage = current_page - OFFSET
            if (fromPage < 1) fromPage = 1
            let toPage = fromPage + OFFSET * 2
            if (toPage >= last_page) {
                toPage = last_page
            }
            for (let page = fromPage; page <= toPage; page++) {
                pages.push(page)
            }
            setPageNumbers(pages)
        }

        setPaginationPages()
    }, [pagination])

    return (
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
                <a onClick={e => pageChanged(pagination.current_page - 1)} className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
                    Previous
                </a>
                <a onClick={e => pageChanged(pagination.current_page + 1)} className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
                    Next
                </a>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        Showing
                        <span className="font-medium px-1">{pagination.from}</span>
                        to
                        <span className="font-medium px-1">{pagination.to}</span>
                        of
                        <span className="font-medium px-1">{pagination.total}</span>
                        results
                    </p>
                </div>
                <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                        <a onClick={e => pageChanged(pagination.current_page - 1)} className="relative cursor-pointer inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                            <span className="sr-only">Previous</span>
                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        </a>
                        {pageNumbers.map((pageNumber) => {
                            return (
                                <a
                                    key={pageNumber}
                                    aria-current="page"
                                    className={pageNumber === pagination.current_page ? `z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium` : `bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium`}>
                                    {pageNumber}
                                </a>
                            )
                        })}
                        <a onClick={e => pageChanged(pagination.current_page + 1)} className="relative cursor-pointer inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                            <span className="sr-only">Next</span>
                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                        </a>
                    </nav>
                </div>
            </div>
        </div>
    )
}

const resolve = (path, obj) => {
    return path.split('.').reduce(function(prev, curr) {
        return prev ? prev[curr] : null
    }, obj)
}
  
const Datatable2 = ({ url, columns, isSelectable = false, SelectedAction = null }) => {

    const sortIndex = columns.findIndex(col => col?.orderable !== false)
    const [data, setData] = useState([])
    const [paginator, setPaginator] = useState({
        from: 1,
        to: 1,
        current_page: 1,
        last_page: 1,
        total: 0
    })
    const [loading, setLoading] = useState(true)

    const [sortField, setSortField] = useState(sortIndex !== -1 ? columns[sortIndex].data : '')
    const [sortOrder, setSortOrder] = useState("asc")
    const [currentPage, setCurrentPage] = useState(1)
    const [perPage, setPerPage] = useState(10)
    const [search, setSearch] = useState("")

    const getData = useCallback(async () => {
        const params = {
            sort_field: sortField,
            sort_order: sortOrder,
            limit: perPage,
            current_page: currentPage,
            search: search
        }

        try {
            setLoading(true)
            const response = await axios.get(url, { params })
            setData(response.data.data.data.map(item => ({...item, isSelected: false})))
            setPaginator({
                from: response.data.data.from,
                to: response.data.data.to,
                current_page: response.data.data.current_page,
                last_page: response.data.data.last_page,
                first_page: response.data.data.first_page,
                total: response.data.data.total,
            })
        } catch (e){
            console.error(e)
            setLoading(false)
        } finally {
            setLoading(false)
        }
    }, [sortField, sortOrder, currentPage, perPage, search])

    useEffect(() => {

        getData()

    }, [getData])

    const handleSort = (column) => {
        if(column === sortField){
            sortOrder === 'asc' ? setSortOrder('desc') : setSortOrder('asc')
        } else {
            setSortField(column)
            setSortOrder('asc')
        }
    }

    const handlePerPageChange = (value) => {
        setPerPage(value)
    }

    const handleSearchChange = useRef(debounce(query => {
        setSearch(query)
        setCurrentPage(1)
    }, DEBOUNCE_TIME)).current

    const pageChanged = (page) => {
        if(currentPage != page && page > paginator.last_page && page < paginator.first_page && page != paginator.current_page){
            setCurrentPage(page)
        }
    }

    const handleSelectAll = (e) => {
        let isChecked = e.target.checked

        const selectedData = data.map(item => {
            return {...item, isSelected: isChecked }
        })

        setData(selectedData)
    }

    const handleSelected = (item, index, isChecked) => {
        data.splice(index, 1, {...item, isSelected: isChecked})
        setData(data.map(l => Object.assign({}, l)))
    }

    return (
      <div className="flex flex-col w-full">
        <DatatableOptions handlePerPageChange={handlePerPageChange} perPage={perPage} handleSearchChange={handleSearchChange}  SelectedAction={isSelectable && data.filter(d => d.isSelected).length > 0 ? () => <SelectedAction selectedItems={data.filter(d => d.isSelected)} reload={getData} /> : null}  />
        <div className="-my-2 overflow-x-auto">
            <div className="pt-2 align-middle inline-block w-full">
                <div className="shadow border-b border-gray-200 sm:rounded-lg">
                    <table className="w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                        <tr>
                            {isSelectable && (
                                <th scope="col" className="px-3 py-1">
                                    <input type="checkbox" disabled={data.length === 0} checked={data.length > 0 && data.filter(d => d.isSelected).length === data.length ? true : false} onChange={e => handleSelectAll(e)} />
                                </th>
                            )}
                            {columns.map(col => (
                                <th
                                onClick={e => col?.orderable === false ? () => {} : handleSort(col.data)}
                                key={col.label}
                                scope="col"
                                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                >
                                <span className="flex flex-row items-center justify-center">
                                    <span>{col.label}</span>

                                    {sortField === col.data && col?.orderable !== false ? (
                                        <span className="pl-1">
                                            {sortOrder === 'asc' ? (
                                                <ArrowDown width={16} height={16} />
                                            ) : (
                                                <ArrowUp width={16} height={16} />
                                            )}
                                        </span>
                                    ) : null}
                                </span>
                                </th>
                            ))}
                        </tr>
                        </thead>
                        <tbody className="bg-white text-center divide-y divide-gray-200">
                            {loading ? (
                                <tr>
                                    <td colSpan={columns.length + 1}>
                                    <Loading />
                                    </td> 
                                </tr>
                            ) : (
                                data.length === 0 ? (
                                    <tr>
                                        <td colSpan={columns.length + 1}>
                                            <div className="flex justify-center items-center py-5">
                                                <p className="tracking-wider text-primary-900 font-semibold text-xl">No Record Found!</p>
                                            </div>
                                        </td> 
                                    </tr>
                                ) : (
                                    data.map((item, index) => (
                                        <tr key={index}>
                                            {isSelectable && (
                                                <td className="px-4 py-2">
                                                    <input type="checkbox" checked={item.isSelected} onChange={e => handleSelected(item, index, e.target.checked)} />
                                                </td>
                                            )}
                                            {columns.map(col => (
                                                col?.renderer ? (
                                                    <td key={col.label} className="px-6 py-4 whitespace-nowrap"><col.renderer item={item} reload={getData} /></td>
                                                ) : (<td key={col.data} className="px-6 py-4 whitespace-nowrap">{resolve(col.data, item)}</td>)
                                            ))}
                                        </tr>
                                    ))
                                )  
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        {data.length > 0 ? <Paginator paginator={paginator} pageChanged={pageChanged} /> : null}
      </div>
    )
}

export default Datatable2
