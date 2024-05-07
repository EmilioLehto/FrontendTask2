
import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import Editcustomer from './Editcustomer';
import Addcustomer from './Addcustomer';
import Button from "@material-ui/core/Button";
import { CSVLink } from "react-csv";

export default function Traininglist() {
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

  const convertToCSV = () => {
    const csvData = customers.map(customer => ({
      Firstname: customer.firstname,
      Lastname: customer.lastname,
      Address: customer.streetaddress,
      "Postal Code": customer.postcode,
      City: customer.city,
      Email: customer.email,
      Phone: customer.phone
    }));
  
  
    const headers = [
      { label: "Name", key: "firstname" },
      { label: "Surname", key: "lastname" },
      { label: "Address", key: "streetaddress" },
      { label: "Postal Code", key: "postcode" },
      { label: "City", key: "city" },
      { label: "Email", key: "email" },
      { label: "Phone", key: "phone" }
    ];
  
    return [headers, ...csvData.map(item => Object.values(item))];
  };

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
      <div style={{ marginTop: '10px', marginBottom: '20px', marginLeft: '20px' }}>
        <Button variant="outline" color="Primary">
          <CSVLink
            data={convertToCSV()}
            filename={"customers.csv"}
            target="_blank"
          >
            Export to CSV
          </CSVLink>
        </Button>
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
