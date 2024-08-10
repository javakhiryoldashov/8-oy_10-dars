import React from "react";
import TableRowItem from "./TableRowItem";

export default function RenderAllData({ data }) {
  return (
    <>
      {data.map((item) => (
        <TableRowItem key={item.id} id={item.id} data={item} />
      ))}
    </>
  );
}
