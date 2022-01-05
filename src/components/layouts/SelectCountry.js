import React from "react";

import { Select } from "antd";
const { Option } = Select;

export default function SelectCountry({
  options,
  value,
  title,
  handleSelectChange,
}) {
  return (
    <Select
      size="large"
      className="select-country"
      bordered
      name="title"
      value={value}
      onChange={handleSelectChange}
      optionFilterProp="children"
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
      filterSort={(optionA, optionB) =>
        optionA.children
          .toLowerCase()
          .localeCompare(optionB.children.toLowerCase())
      }
    >
      <Option value="" disabled defaultValue hidden>
        {title}
      </Option>
      {options?.map((item, index) => (
        <Option key={index} value={item.slug}>
          {item.name}
        </Option>
      ))}
    </Select>
  );
}
