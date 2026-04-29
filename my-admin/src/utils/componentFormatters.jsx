import { FunctionField, useRecordContext } from "react-admin";
import { formatFullName } from "./formatters";
// From `person`record
const FullName = (label="") => {
  const record = useRecordContext();
  console.log(record)
  return (
    <FunctionField
        label={label}
        render={record => formatFullName(record)}
    />
  )
}


export { FullName }