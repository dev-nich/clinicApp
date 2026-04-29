import { FunctionField, useRecordContext } from "react-admin";
import { formatFullName } from "./formatters";
// From `person`record
const FullName = (label="") => {
  const record = useRecordContext();
  return (
    <FunctionField
        label={label}
        render={record => formatFullName(record)}
    />
  )
}

// Helper component to check the record
const RecordCheck = (label=null) => {
  const record = useRecordContext();
  console.log(label, record)
}


export { FullName, RecordCheck}