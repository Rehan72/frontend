
import { Trash2Icon, UploadIcon } from "lucide-react";
import { useState } from "react";
import * as XLSX from 'xlsx';
import { Button } from "../components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../components/ui/dialog";
import FileTable from "./FileTable";

const BulkFileUploader = ({ onFilesChange, showDialog, setShowDialog }) => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [data, setData] = useState(null);
 const [showFileTable,setShowFileTable]=useState(false)
 const [missingFields, setMissingFields] = useState([]);
 const requiredFields = ['First Name', 'Last Name',"Email",'Phone Number',"Address line 1","Country","State"];


  const simulateUpload = (index) => {
   const progressInterval = setInterval(() => {
     setFiles((prevFiles) =>
       prevFiles.map((f, i) =>
         i === index ? { ...f, progress: Math.min(f.progress + 10, 100) } : f
       )
     );
   }, 300);
 
   setTimeout(() => {
     clearInterval(progressInterval);
     setFiles((prevFiles) =>
       prevFiles.map((f, i) =>
         i === index ? { ...f, progress: 100 } : f
       )
     );
     if (index === files.length - 1) {
       setUploading(false); // Only stop uploading after all files are done
     }
   }, 3000);
 };
 

  const handleFileChange = (event) => {
   const file = event.target.files[0];
   // if (file && file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      const reader = new FileReader();
      reader.onload = (e) => {
        console.log(e,"EEEEEEEEEE");
        
        const data = e.target.result;
       
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0]; // Get the first sheet
        const sheet = workbook.Sheets[sheetName];
        const sheetData = XLSX.utils.sheet_to_json(sheet);
      //   const jsonData = XLSX.utils.sheet_to_json(sheet);
        // Log the data to console
        setData(sheetData);
        // Ensure each row has all necessary fields, initializing missing ones as empty
      const completeData = sheetData.map(row => {
         const allFields = {
            'First Name':'',
            'Last Name':'',
            'Email':'',
            'Phone Number':'',
             'Address line 1': '',
             'Address line 2': '',
             Country: '',
             State: '',
             'City': '',
             'Postal Code': '',
             'Image': '',
             'Location': '',
            
             ...row, // Override empty fields with actual data from row
           };
 
         return allFields;
       });
        // Check for missing required fields
      const missing = completeData.map((row, index) => {
         const missingFieldsInRow = [];
         requiredFields.forEach((field) => {
           if (!row[field]) {
             missingFieldsInRow.push(field);
           }
         });
         return missingFieldsInRow.length > 0 ? { rowIndex: index, missing: missingFieldsInRow } : null;
       }).filter(Boolean);
 
       setMissingFields(missing);

 
       setData(completeData); // Store data in state
      };
      reader.readAsBinaryString(file);
   //  }
    
   const newFiles = Array.from(event.target.files).map((file) => ({
     file,
     preview: URL.createObjectURL(file),
     progress: 0,
   }));
   setFiles((prevFiles) => {
     const updatedFiles = [...prevFiles, ...newFiles];
     newFiles.forEach((_, index) =>
       simulateUpload(updatedFiles.length - newFiles.length + index)
     );
     return updatedFiles;
   });
 };
 

  const handleRemoveFile = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    if (onFilesChange) {
      onFilesChange(updatedFiles.map((f) => f.file));
    }
  };

  const handleSave = () => {
   const allFilesUploaded = files.every((file) => file.progress === 100);
   if (!allFilesUploaded) return; // Prevent saving until all uploads complete
 
   if (onFilesChange) {
     onFilesChange(files.map((f) => f.file));
   }
   if(missingFields != null){
      setShowFileTable(true)
   }
   setShowDialog(false);
   setShowFileTable(true)
 };

  const handleClose = () => {
    setShowDialog(false); // Close dialog
    setFiles([])
  };

  return (
   <>
       <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogContent className="w-full max-w-lg">
        <DialogHeader>
          <DialogTitle>Upload Files in Bulk</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer">
            <UploadIcon className="w-8 h-8 text-gray-500 mb-2" />
            <span className="text-gray-700 text-sm">Choose files</span>
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="hidden"
            />
          </label>

          <div className="space-y-2">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 border rounded-md"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={file.preview}
                    alt={file.file.name}
                    className="w-12 h-12 object-cover rounded-md"
                  />
                  <div>
                    <p className="text-sm font-medium">{file.file.name}</p>
                    {file.progress < 100 ? (
                      <div className="relative w-full h-2 bg-gray-200 rounded mt-1">
                        <div
                          className="absolute top-0 left-0 h-2 bg-green-500 rounded transition-all"
                          style={{ width: `${file.progress}%` }}
                        />
                      </div>
                    ) : (
                      <p className="text-xs text-green-600">Uploaded</p>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveFile(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2Icon className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={uploading || files.length === 0}>
              Save
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
    {
      showFileTable ? <FileTable setShowFileTable={setShowFileTable} showFileTable={showFileTable} data={data} parentMissingFields={missingFields} /> : ''
    }
   </>
    
  );
};

export default BulkFileUploader;
