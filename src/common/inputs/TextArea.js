import React from "react";

function TextArea({ label, id, placeholder, required, register, ...props }) {
  return (
    <div
      className={`relative mb-7 ${
        props.mt ? `mt-[${props.mt}]` : `mt-[30px]`
      } `}
    >
      <textarea
        rows={4}
        cols={50}
        className="whitespace-pre-line-wrap peer bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg placeholder-transparent focus:ring-primary focus:border-primary block w-full p-2.5 "
        placeholder=" "
        {...register(id, {
          required: required,
        })}
        {...props}
      ></textarea>
      <label
        htmlFor={id}
        className="absolute left-2 -top-5 mb-1 text-sm peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-900 peer-placeholder-shown:text-opacity-40 peer-placeholder-shown:top-3 peer-placeholder-shown:left-2 transition-all peer-focus:-top-5 peer-focus:text-gray-900 peer-focus:text-opacity-40 peer-focus:text-[13px] font-medium text-gray-900 text-opacity-40 dark:text-gray-300"
      >
        {required ? (
          <>
            {label}
            &nbsp;<span className="text-red-600">*</span>
          </>
        ) : (
          <> {label}</>
        )}
      </label>
    </div>
  );
}

export default TextArea;
