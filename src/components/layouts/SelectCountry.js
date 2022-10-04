import React from "react";

export default function SelectCountry({
  options,
  value,
  title,
  onChangeSelectValue,
  onChangeValue,
}) {
  return (
    <select
      className="mt-1 block p-2 w-full text-sm text-gray-900 bg-white shadow-sm rounded-md border border-slate-300 placeholder-slate-400 focus:outline-none focus:border-green-500 focus:ring-green-500"
      name="search"
      value={value ? value : ""}
      onChange={(e) => { onChangeSelectValue(e); onChangeValue(e) }}
    >
      <option value="" >{title}</option>
      {options?.map((item, index) => (
        <option key={index} value={item.slug}>
          {item.name}
        </option>
      ))}
    </select>
  );
}
