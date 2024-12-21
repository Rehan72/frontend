import { Trash2Icon, UploadIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "../components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../components/ui/dialog";

const ImageUploader = ({ onImageChange, showDialog, setShowDialog }) => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const simulateUpload = () => {
    let progressValue = 0;
    setLoading(true);

    const interval = setInterval(() => {
      progressValue += 10;
      if (progressValue <= 100) {
        setProgress(progressValue);
      } else {
        clearInterval(interval);
        setLoading(false);
        setProgress(0);
      }
    }, 300);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      simulateUpload();
      const reader = new FileReader();
      reader.onload = () => {
        setTimeout(() => {
          const preview = reader.result;
          setImage({ file, preview });
          if (onImageChange) {
            onImageChange({ file, preview });
          }
        }, 3000);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    if (onImageChange) {
      onImageChange(null);
    }
  };

  const handleSaveImage = () => {
    if (onImageChange && image) {
      onImageChange(image); // Pass image back to parent
      setShowDialog(false); // Close the dialog after saving
    }
  };

  const handleClose = () => {
    setShowDialog(false); // Close dialog
  };

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogContent className="w-full max-w-md">
        <DialogHeader>
          <DialogTitle>Upload Your Image</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {!image && !loading ? (
            <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer">
              <UploadIcon className="w-8 h-8 text-gray-500 mb-2" />
              <span className="text-gray-700 text-sm">Choose an image</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          ) : loading ? (
            <div className="space-y-4">
              <p className="text-gray-700 text-sm">Uploading...</p>
              <div className="relative w-full h-4 bg-gray-200 rounded">
                <div
                  className="absolute top-0 left-0 h-4 rounded bg-green-500 transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-center text-sm text-green-600">{progress}%</p>
            </div>
          ) : (
            <div className="relative">
              <img
                src={image.preview}
                alt="Uploaded Preview"
                className="w-full h-auto rounded-lg"
              />
              <button
                onClick={handleRemoveImage}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
              >
                <Trash2Icon className="w-4 h-4" />
              </button>
            </div>
          )}
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button onClick={handleSaveImage} disabled={!image || loading}>
              Save
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageUploader;
