// Filter.js
import { Input } from "../components/ui/input"

const Filter = ({ table }) => {
  return (
    <Input
      placeholder="Filter emails..."
      value={(table.getColumn("email")?.getFilterValue()) ?? ""}
      onChange={(event) =>
        table.getColumn("email")?.setFilterValue(event.target.value)
      }
      className="max-w-sm"
    />
  )
}

export default Filter
