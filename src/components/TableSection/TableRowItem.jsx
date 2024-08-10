"use client";
import React from "react";
import { BsEyeFill } from "react-icons/bs";
import { Table } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { addWatchList, removeWatchList, openDrawer } from "@/store/dataSlice";
import Image from "next/image";

export default function TableRowItem({ id, data }) {
  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <Table.Row
      key={id}
      className="bg-blue-300 cursor-pointer dark:border-gray-700 dark:bg-gray-800"
    >
      <Table.Cell
        onClick={() => {
          router.push(`/${data.cca2}`);
        }}
        className="whitespace-nowrap font-medium text-gray-900 dark:text-white"
      >
        {data.name.common}
      </Table.Cell>
      <Table.Cell
        onClick={() => {
          router.push(`/${data.cca2}`);
        }}
      >
        <Image
          src={data.flags.svg}
          width={22}
          height={22}
          alt={data.name.common}
        />
      </Table.Cell>
      <Table.Cell
        onClick={() => {
          router.push(`/${data.cca2}`);
        }}
      >
        {data.capital}
      </Table.Cell>
      <Table.Cell
        onClick={() => {
          router.push(`/${data.cca2}`);
        }}
      >
        {String(data.population).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      </Table.Cell>

      <Table.Cell>
        <label htmlFor={id}>
          <BsEyeFill
            className={`${
              data.isInMyWatchList ? "text-[#ff2222]" : ""
            } cursor-pointer`}
            size={20}
          />
        </label>
        <input
          type="checkbox"
          name={id}
          id={data.cca2}
          onChange={() => {
            if (data.isInMyWatchList) {
              dispatch(removeWatchList(data.id));
            } else {
              dispatch(addWatchList(data.id));
              dispatch(openDrawer());
            }
          }}
          defaultChecked={data.isInMyWatchList}
          className="hidden"
        />
      </Table.Cell>
    </Table.Row>
  );
}
