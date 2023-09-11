import React from "react";
import { useState } from "react";

const FileInput = ({ files, setFiles }) => {
  const [message, setMessage] = useState();
  const handleFile = async (e) => {
    setMessage("");
    let file = e.target.files;
    console.log(file);

    let images = [];

    for (let i = 0; i < file.length; i++) {
      const fileType = file[i]["type"];
      const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
      if (validImageTypes.includes(fileType)) {
        const formData = new FormData();
        formData.append("file", file[i]);
        console.log(formData);
        const data = await fetch(
          "http://localhost:5002/api/v1/user/upload_picture",
          {
            method: "POST",
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDlhZGUxOGQ5ZjM3OGNmNTU4ZGRhYjYiLCJlbWFpbCI6ImRldmVsb3BlcmFuc2gxNkBnbWFpbC5jb20iLCJyb2xlIjoidXNlciIsImlhdCI6MTY5MTc1MjU3MCwiZXhwIjoxNjk0MzQ0NTcwLCJpc3MiOiJ3YXJwYmF5LmNvbSJ9.FkpQxBj4Ulyr1GL-qgRtRTtMOqop_ed4EIaHn3FV_r0",
            },
            body: formData,
          }
        );
        const res = await data.json();
        console.log(res);
        if (res.url) {
          images.push(res.url);
        }
      } else {
        setMessage("only images accepted");
      }
    }
    setFiles([...files, ...images]);
  };

  const removeImage = (i) => {
    setFiles(files.filter((x) => x !== i));
  };

  return (
    <>
      <div className="flex justify-center w-full items-center ">
        <div className="rounded-lg shadow-xl bg-gray-50">
          <div className="m-4">
            <span className="flex justify-center items-center text-[12px] mb-1 text-red-500">
              {message}
            </span>
            <div className="flex items-center justify-center w-full">
              <label className="flex cursor-pointer flex-col w-full h-32 border-2 rounded-md border-dashed hover:bg-gray-100 hover:border-gray-300">
                <div className="flex flex-col items-center justify-center pt-7">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-12 h-12 text-gray-400 group-hover:text-gray-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                    Select a photo
                  </p>
                </div>
                <input
                  type="file"
                  onChange={handleFile}
                  className="opacity-0"
                  multiple="multiple"
                  name="files[]"
                />
              </label>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {files.map((file, key) => {
                return (
                  <div key={key} className="overflow-hidden relative">
                    <div className="cursor-pointer absolute right-1 stroke-white" onClick={()=>{removeImage(file)}}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="inherit"
                      className="w-6 h-6"
                      >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                        </div>

                    <img className="h-20 w-20 rounded-md" src={file} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FileInput;
