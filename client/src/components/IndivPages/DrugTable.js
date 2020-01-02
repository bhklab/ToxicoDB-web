import React, { Component } from 'react';
import { useTable, useFilters, useGlobalFilter } from 'react-table';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import { checkPropTypes } from 'prop-types';
import matchSorter from 'match-sorter';
import LoadingComponent from '../Utils/Loading';


// Define a default UI for filtering
function DefaultColumnFilter({
    column: { filterValue, preFilteredRows, setFilter },
}) {
    const count = preFilteredRows.length;

    return (
        <input
            value={filterValue || ''}
            onChange={(e) => {
                setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
            }}
            placeholder={`Search ${count} records...`}
        />
    );
}

function fuzzyTextFilterFn(rows, id, filterValue) {
    return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
}

// Define a default UI for filtering
function GlobalFilter({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
}) {
    const count = preGlobalFilteredRows.length;

    return (
        <span>
        Search:
            {' '}
            <input
                value={globalFilter || ''}
                onChange={(e) => {
                    setGlobalFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
                }}
                placeholder={`${count} records...`}
                style={{
                    fontSize: '1.1rem',
                    border: '0',
                }}
            />
        </span>
    );
}

function Table({ columns, data }) {
    const filterTypes = React.useMemo(
        () => ({
        // Add a new fuzzyTextFilterFn filter type.
            fuzzyText: fuzzyTextFilterFn,
            // Or, override the default text filter to use
            // "startWith"
            text: (rows, id, filterValue) => rows.filter((row) => {
                const rowValue = row.values[id];
                return rowValue !== undefined
                    ? String(rowValue)
                        .toLowerCase()
                        .startsWith(String(filterValue).toLowerCase())
                    : true;
            }),
        }),
        [],
    );

    const defaultColumn = React.useMemo(
        () => ({
        // Let's set up our default Filter UI
            Filter: DefaultColumnFilter,
        }),
        [],
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state,
        flatColumns,
        preGlobalFilteredRows,
        setGlobalFilter,
    } = useTable(
        {
            columns,
            data,
            defaultColumn, // Be sure to pass the defaultColumn option
            filterTypes,
        },
        useFilters, // useFilters!
        useGlobalFilter, // useGlobalFilter!
    );

    // We don't want to render all of the rows for this example, so cap
    // it for this use case
    const firstPageRows = rows.slice(0, 10);

    return (
        <>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps()}>
                                    {column.render('Header')}
                                    {/* Render the columns filter UI */}
                                    <div>{column.canFilter ? column.render('Filter') : null}</div>
                                </th>
                            ))}
                        </tr>
                    ))}
                    <tr>
                        <th
                            colSpan={flatColumns.length}
                            style={{
                                textAlign: 'left',
                            }}
                        >
                            <GlobalFilter
                                preGlobalFilteredRows={preGlobalFilteredRows}
                                globalFilter={state.globalFilter}
                                setGlobalFilter={setGlobalFilter}
                            />
                        </th>
                    </tr>
                </thead>
                <tbody {...getTableBodyProps()}>
                    {firstPageRows.map((row, i) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => <td {...cell.getCellProps()}>{cell.render('Cell')}</td>)}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <br />
            <div>
Showing the first 20 results of
                {' '}
                {rows.length}
                {' '}
rows
            </div>
            <div>
                <pre>
                    <code>{JSON.stringify(state.filters, null, 2)}</code>
                </pre>
            </div>
        </>
    );
}

const filterCaseInsensitive = (filter, row) => {
    const id = filter.pivotId || filter.id;
    switch (typeof row[id]) {
    case 'object':
        // checks for metastasis label
        if (row[id] && row[id].origin) {
            return String('metastasis').includes(filter.value.toLowerCase());
        }
        // checks for disease name (additional check is to filter out null values)
        return row[id] && row[id].name
            ? String(row[id].name.toLowerCase()).includes(filter.value.toLowerCase())
            : false;
        // handles age filtering
    case 'number':
        return row[id].toString().includes(filter.value);
    case 'string':
        return String(row[id].toLowerCase()).includes(filter.value.toLowerCase());
    default:
        return false;
    }
};

function SelectColumnFilter({
    column: {
        filterValue, setFilter, preFilteredRows, id,
    },
}) {
    // Calculate the options for filtering
    // using the preFilteredRows
    const options = React.useMemo(() => {
        const options = new Set();
        preFilteredRows.forEach((row) => {
            options.add(row.values[id]);
        });
        return [...options.values()];
    }, [id, preFilteredRows]);

    // Render a multi-select box
    return (
        <select
            value={filterValue}
            onChange={(e) => {
                setFilter(e.target.value || undefined);
            }}
        >
            <option value="">All</option>
            {options.map((option, i) => (
                <option key={i} value={option}>
                    {option}
                </option>
            ))}
        </select>
    );
}


function DrugTable(props) {
    const columns = React.useMemo(
        () => [{
            Header: 'Gene',
            accessor: 'gene_name',
            sortable: true,
            Cell: (row) => (<Link to={`/expression?drugId=${props.drugData.id}&geneId=${row.original.gene_id}`}>{row.value}</Link>),
        }, {
            Header: 'log2(fold change)',
            accessor: 'fold_change',
            sortable: true,
            sortMethod(a, b) { return b - a; },
            Cell: (row) => parseFloat(row.value).toFixed(1),
        }, {
            Header: 'p-value',
            accessor: 'p_value',
            sortable: true,
            sortMethod(a, b) { return b - a; },
            Cell: (row) => parseFloat(row.value).toExponential(1),
        }, {
            Header: 'fdr',
            accessor: 'fdr',
            sortable: true,
            sortMethod(a, b) { return b - a; },
            Cell: (row) => parseFloat(row.value).toExponential(1),
        }, {
            Header: 'Dataset',
            accessor: 'dataset_name',
            sortable: true,
            Filter: SelectColumnFilter,
            filter: 'includes',
        }],
    );

    return (
        <Table
            data={checkPropTypes.data}
            columns={columns}
            filterable
            defaultFilterMethod={filterCaseInsensitive}
            className="table -highlight"
            defaultPageSize={10}
            defaultSorted={[
                {
                    id: 'fold_change',
                    desc: true,
                },
            ]}
            loading={props.loading}
            LoadingComponent={LoadingComponent}
            Filter={
                ({ filter, onChange }) => (
                    <select
                        onChange={(event) => onChange(event.target.value)}
                        style={{ width: '100%' }}
                        value={filter ? filter.value : 'all'}
                    >
                        <option value="all">Show All</option>
                        <option value="true">Can Drink</option>
                        <option value="false">Can't Drink</option>
                    </select>
                )
            }
        />
    );
}
export default DrugTable;
