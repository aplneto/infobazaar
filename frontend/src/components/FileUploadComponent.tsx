import { ChangeEvent, FormEvent, useState } from "react";
import AxiosInstance from "../utils/AxiosInstance";

interface Props {
  product: string;
}

export default function FileUploadComponent({ product }: Props) {
  const [file, setFile] = useState<File>();
  const [description, setDescription] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    setFile(event.target.files[0]);
  };
  const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const handleClick = (event: FormEvent) => {
    event.preventDefault();
    if (!file) return;
    let formData = new FormData();
    formData.append("file", file);
    formData.append("product", product);
    formData.append("description", description);
    AxiosInstance.post("upload/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then(() => {
      window.location.reload();
    });
  };

  return (
    <div className="container my-3">
      <div id="fileUploadWidget" className="card bg-dark border-light p-4">
        <h5 className="text-center mb-3">Upload Files</h5>
        <form>
          <div className="mb-3">
            <label htmlFor="fileInput" className="form-label">
              Choose files to upload
            </label>
            <input
              type="file"
              className="form-control bg-dark text-light border-light"
              id="fileInput"
              name="file"
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="fileDescription" className="form-label">
              File Description
            </label>
            <input
              type="text"
              className="form-control bg-dark text-light border-light"
              id="fileDescription"
              placeholder="Enter a description"
              onChange={handleDescriptionChange}
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-outline-light w-100"
            onClick={handleClick}
          >
            Upload Files
          </button>
        </form>
      </div>
    </div>
  );
}
