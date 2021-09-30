import React, { useState, useRef } from 'react';
import Highlighter from 'react-highlight-words';
import './Table.css';

import { SearchOutlined } from '@ant-design/icons';
import { Table as AntdTable, Input, Space, Button } from 'antd';

export default function Table ( props ) {
    const beerList = props.beerList;

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInputRef = useRef(undefined);

    const onChange = ( pagination, filters, sorter, extra ) => {
        console.log('params', pagination, filters, sorter, extra )
    }

    //Defines parameters for column search by text dropdown menu, such as its layout, input, and methods for searching text
    const getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={searchInputRef}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{marginBottom: 8, display: 'block'}}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                        >Search
                    </Button>
                    <Button 
                        onClick={() => handleReset(clearFilters)} 
                        size="small" 
                        style={{width: 90}}
                        >Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false})
                            setSearchText(selectedKeys[0])
                            setSearchedColumn(dataIndex)
                        }}
                        >Filter
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{color: filtered ? '#1890ff' : undefined }} />,
        onFilter: ( value, record ) =>
            record[dataIndex]
                ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
                : '',
        onFilterDropdownVisibleChange: visible => {
            if ( visible ) {
                setTimeout(() => searchInputRef.current.select(), 100);     
            }
        },
        render: text =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{backgroundColor: '#ffc069', padding: 0}}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            )
    });

    const handleSearch = ( selectedKeys, confirm, dataIndex ) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    }

    const handleReset = clearFilters => {
        clearFilters();
        setSearchText('');
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: ( a, b ) => {
                if ( a.name === undefined ) {
                    return -1
                }
                if ( b.name === undefined ) {
                    return 1
                }
                return a.name.localeCompare(b.name)
            },
            sortDirections: ['descend', 'ascend'],
            width: '10vh',
            ...getColumnSearchProps('name')
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            sorter: ( a, b ) => {
                if ( a.category === undefined ) {
                    return -1
                }
                if ( b.category === undefined ) {
                    return 1
                }
                return a.category.localeCompare(b.category)
            },
            sortDirections: ['descend', 'ascend'],
            width: '10%',
            ...getColumnSearchProps('category')
        },
        {
            title: 'ABV',
            dataIndex: 'abv',
            key: 'abv',
            render: abv => `${abv.toFixed(1)}%`,
            sorter: ( a, b ) => {
                if ( a.abv === undefined ) {
                    return -1
                }
                if ( b.abv === undefined ) {
                    return 1
                }
                return a.abv - b.abv
            },
            sortDirections: ['descend', 'ascend'],
            width: '5%'
        },
        {
            title: 'IBU',
            dataIndex: 'ibu',
            key: 'ibu',
            sorter: ( a, b ) => {
                if ( a.ibu === undefined ) {
                    return -1
                }
                if ( b.ibu === undefined ) {
                    return 1
                }
                return a.ibu - b.ibu
            },
            sortDirections: ['descend', 'ascend'],
            width: '5%'
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            width: '30%',
            ...getColumnSearchProps('description')
        },
        {
            title: 'Website',
            dataIndex: 'website',
            key: 'website',
            width: '10%',
            render: website => `${website.toString()}`,
            ...getColumnSearchProps('description')
        },
        {
            title: 'Country',
            dataIndex: 'country',
            key: 'country',
            sorter: ( a, b ) => {
                if ( a.country === undefined ) {
                    return -1
                }
                if ( b.country === undefined ) {
                    return 1
                }
                return a.country.localeCompare(b.country)
            },
            sortDirections: ['descend', 'ascend'],
            width: '5%',
            ...getColumnSearchProps('country')
        },
        {
            title: 'City',
            dataIndex: 'city',
            key: 'city',
            sorter: ( a, b ) => {
                if ( a.city === undefined ) {
                    return -1
                }
                if ( b.city === undefined ) {
                    return 1
                }
                return a.city.localeCompare(b.city)
            },
            sortDirections: ['descend', 'ascend'],
            width: '5%',
            ...getColumnSearchProps('city')
        },
        {
            title: 'State',
            dataIndex: 'state',
            key: 'state',
            sorter: ( a, b ) => {
                if ( a.state === undefined ) {
                    return -1
                }
                if ( b.state === undefined ) {
                    return 1
                }
                return a.state.localeCompare(b.state)
            },
            sortDirections: ['descend', 'ascend'],
            width: '5%',
            ...getColumnSearchProps('state')
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            width: '10%',
            ...getColumnSearchProps('address')
        },
        {
            title: 'Coordinates',
            dataIndex: 'coordinates',
            key: 'coordinates',
            render: coordinates => {
                if ( coordinates !== undefined ) {
                    return `${ coordinates[0] > 0 ? `${coordinates[0].toFixed(2)}N` : `${coordinates[0].toFixed(2)}S`}, ${ coordinates[1] > 0 ? `${coordinates[1].toFixed(2)}E` : `${coordinates[1].toFixed(2)}W`}`
                }
            },
            width: '10%'
        }

    ]

    return(
        <div>
            <table id='beerList'>
                <tbody>
                    <AntdTable columns={columns} dataSource={beerList} onChange={onChange()}/>
                </tbody>
            </table>
        </div>
    );
}