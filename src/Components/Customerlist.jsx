
import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import Editcustomer from './Editcustomer';
import Addcustomer from './Addcustomer';
import Button from "@material-ui/core/Button";

export default function Customerlist() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch('https://customerrestservice-personaltraining.rahtiapp.fi/api/customers')
      .then(response => response.json())
      .then(data => setCustomers(data._embedded.customers))
      .catch(err => console.error(err));
  }

  const deleteCustomer = (link) => {
    if (window.confirm('Are you sure?')) {
      fetch(link, { method: 'DELETE' })
        .then(res => fetchData())
        .catch(err => console.error(err));
    }
  }

  const updateCustomer = (customers, link) => {
    fetch(link, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(customers)
    })
      .then(res => fetchData())
      .catch(err => console.error(err));
  }

  const saveCustomers = (customers) => {
    fetch('https://customerrestservice-personaltraining.rahtiapp.fi/api/customers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(customers)
    })
      .then(res => fetchData())
      .catch(err => console.log(err));
  }


  const columns = [
    {
        Header: 'Name',
        accessor: 'firstname'
    },
    {
        Header: 'Surname',
        accessor: 'lastname'
    },
    {
      Header: 'Address',
      accessor: 'streetaddress',
      width: 170,
    },
    {
      Header: 'Postal Code',
      accessor: 'postcode',
      width: 170
    },
    {
      Header: 'City',
      accessor: 'city',
      width: 170
    },
    {
      Header: 'Email',
      accessor: 'email',
      width: 170,
    },
    {
      Header: 'Phone',
      accessor: 'phone',
      width: 170
      
    },
    {
      sortable: false,
      filterable: false,
      width: 170,
    Cell: row => <Editcustomer updateCustomer={updateCustomer} customers={row.original} />

    },
    {
      sortable: false,
      filterable: false,
      width: 50000,
      accessor: '_links.self.href',
      Cell: row => <Button color='secondary' size='small' onClick={() => deleteCustomer(row.value)}>Delete</Button>
    }
  ];

  return (
    <div>
      <div style={{ marginTop: '10px', marginBottom: '10px', marginLeft: '10px' }}>
        <Addcustomer saveCustomer={saveCustomers} />
      </div>
      
      <div>
        <ReactTable
          filterable={true}
          data={customers}
          columns={columns}
        />
      </div>

    </div>
  );
}
