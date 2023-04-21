import React, {useState} from 'react'
//import MaterialTable from 'material-table'

const assetsList  = [
    {assetId: "Asset1", appraisedValue: "1500", color: "white", size: "40"},
    {assetId: "Asset2", appraisedValue: "1500", color: "white", size: "40"},
    {assetId: "Asset3", appraisedValue: "1500", color: "white", size: "40"}
]

function AssetsTable() {

    const [data, setData] = useState(assetsList)
    const columns = [
        {title: "Id", field: "assetId"},
        {title: "value", field: "appraisedValue"},
        {title: "color", field: "color"},
        {title: "size", field: "size"},
    ]

  return (
    <div>
        {/* <MaterialTable
            title="Assets"
            data={data}
            columns={columns}
            // editable={{
            //     onRowAdd:
            // }}
        /> */}
        Asset Table
    </div>
  )
}

export default AssetsTable