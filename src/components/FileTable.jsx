import { Edit, Save } from "lucide-react";
import { useEffect, useState } from "react";
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
} from "../components/ui/dialog";
import { showToast } from "../Utils";
import { Button } from "./ui/button";

const FileTable = ({
  data,
  onClose,
  showFileTable,
  setShowFileTable,
  parentMissingFields,
}) => {
  const [data1, setData] = useState(
    data?.map((row) => ({ ...row, hasError: false }))
  ); // Add `hasError` flag
  const [editRow, setEditRow] = useState(null);
  const [errors, setErrors] = useState({});
  const requiredFields = [
    "First Name",
    "Last Name",
    "Email",
    "Phone Number",
    "Address line 1",
    "Country",
    "State",
  ];

  useEffect(() => {
    // On initial load, mark rows with errors
    setData((prev) =>
      prev.map((row, index) => ({
        ...row,
        hasError: parentMissingFields?.some((item) => item.rowIndex === index),
      }))
    );
  }, [parentMissingFields]);

  // Handle input changes dynamically
  const handleInputChange = (e, rowIndex, key) => {
    const { value } = e.target;

    setData((prevData) =>
      prevData.map((row, index) =>
        index === rowIndex ? { ...row, [key]: value } : row
      )
    );

    // Clear error if the required field is fixed
    setErrors((prevErrors) => ({
      ...prevErrors,
      [rowIndex]: {
        ...prevErrors[rowIndex],
        [key]: value ? "" : `${key} is required`,
      },
    }));
  };

  // Validate and update error state
  const validateRow = (rowIndex) => {
    const rowErrors = {};
    const rowData = data1[rowIndex];
    let hasError = false;

    requiredFields.forEach((field) => {
      const value = rowData[field];
      if (!value) {
        rowErrors[field] = `${field} is required`;
        hasError = true;
      }
    });

    setErrors((prev) => ({ ...prev, [rowIndex]: rowErrors }));

    // Update row's error flag
    setData((prevData) =>
      prevData.map((row, index) =>
        index === rowIndex ? { ...row, hasError } : row
      )
    );

    return hasError;
  };

  // Save the edited row after validation
  const handleSaveClick = (rowIndex) => {
    const hasErrors = validateRow(rowIndex);
    if (!hasErrors) {
      setEditRow(null);
      showToast("success", "Row saved successfully");
      reSortData();
    } else {
      showToast("error", "Please fill all required fields");
    }
  };

  // Re-sort data to move rows with errors to the top
  const reSortData = () => {
    setData((prevData) =>
      [...prevData].sort((a, b) => (b.hasError ? 1 : 0) - (a.hasError ? 1 : 0))
    );
  };

  // Bulk submission handler
  const handleBulkCreateUser = () => {
    console.log(data1, "bulk Create user");
    showToast("success", "Users created successfully");
    setShowFileTable(false);
    setData([]);
  };
  console.log(errors, "Error");

  return (
    <Dialog open={showFileTable} onOpenChange={setShowFileTable}>
      <DialogContent className="w-full max-w-8xl h-[80vh] p-6 rounded-lg shadow-lg bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-gray-800 mb-4">
            Uploaded Excel Data
          </DialogTitle>
          
        </DialogHeader>
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-200 shadow-md">
            <thead>
              <tr className="bg-gray-100 text-left">
                {Object.keys(data1[0]).map((key) => (
                  <th
                    key={key}
                    className="p-3 border border-gray-300 text-gray-700 font-medium"
                  >
                    {key}
                  </th>
                ))}
                <th className="p-3 border border-gray-300 text-gray-700 font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {data1.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={row.hasError ? "bg-red-50" : "bg-white"}
                >
                  {Object.keys(row).map((key) => (
                    <td
                      key={key}
                      className="p-3 border border-gray-300 text-gray-600"
                    >
                      {editRow === rowIndex ? (
                        <>
                          <input
                            type="text"
                            value={row[key] || ""}
                            onChange={(e) =>
                              handleInputChange(e, rowIndex, key)
                            }
                            className="w-full p-2 border rounded-md"
                          />
                          {errors[rowIndex]?.[key] && (
                            <div className="text-red-500 text-sm mt-1">
                              {errors[rowIndex][key]}
                            </div>
                          )}
                        </>
                      ) : (
                        row[key] || ""
                      )}
                    </td>
                  ))}
                  <td className="p-3 border border-gray-300 text-center">
                    {editRow === rowIndex ? (
                      <Button
                        type="button"
                        onClick={() => handleSaveClick(rowIndex)}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                      >
                        <Save className="inline-block mr-1" /> Save
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        onClick={() => setEditRow(rowIndex)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                      >
                        <Edit className="inline-block mr-1" /> Edit
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-end mt-4 ml-6">
            <button
              onClick={handleBulkCreateUser}
              type="button"
              className={`bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md ${
                data1.some((row) => row.hasError)
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }'ml-8'`}
              disabled={data1.some((row) => row.hasError)}
            >
              Submit All Data
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FileTable;
