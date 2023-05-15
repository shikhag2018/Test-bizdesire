import React from 'react';
import { Table } from 'antd';

const MyTable = ({ candidates }) => {
  const data = candidates?.candidates ?
    candidates?.candidates?.map((x, index) => {
      return {
        key: `${index}`,
        name: Object.keys(x)[0],
        ...x,
      }
    }) : []

  const columns = [
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Date of Birth',
      dataIndex: 'dateOfBirth',
      key: 'dateOfBirth',
    },
    {
      title: 'Residential Address',
      dataIndex: 'residentialAddress',
      key: 'residentialAddress',
      render: (address) => (
        <>
          <p>{address.street1}</p>
          <p>{address.street2}</p>
        </>
      ),
    },
    {
      title: 'Permanent Address',
      dataIndex: 'permanentAddress',
      key: 'permanentAddress',
      render: (address) => (
        <>
          <p>{address.street1}</p>
          <p>{address.street2}</p>
        </>
      ),
    },
    {
      title: 'Documents',
      dataIndex: 'imageUrls',
      key: 'imageUrls',
      render: (doc) => {
        return (<>
          {doc.map(x => (
            <div>
              <a href={x?.docUrl} target='_blank' rel="noreferrer">{x?.fileName}</a>
            </div>

          ))
          }
        </>)
      },
    },
  ];

  return <Table dataSource={data} columns={columns} />;
};

export default MyTable;
