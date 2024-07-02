"use client";
import PizzaContainer from "@/components/organisms/PizzaContainer";
import axios from "axios";
import { debounce } from "lodash";
import { useEffect, useState } from "react";

type ListItemType = {
  name: string;
  url: string;
};

export default function Home() {
  const [listData, setListData] = useState<ListItemType[]>([]);
  const [filterText, setFilterText] = useState<string>("");
  const getData = async () => {
    try {
      const response = await axios.get("/api/search/");
      if (response?.data?.results) {
        setListData(response.data.results);
      }
    } catch (e) {
      alert(e);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const onChange = debounce((e) => {
    setFilterText(e.target.value);
  }, 300);

  const list = listData.filter((data) => data?.name?.includes(filterText));

  return (
    <main className="flex flex-col items-center justify-center container mx-auto py-1 min-h-[100vh]">
      <div className="mt-5 w-[90vw] md:w-[70vw]">
        <input
          type="text"
          placeholder="Search"
          onChange={onChange}
          className="w-full p-4 border border-gray-200 my-2 rounded-xl shadow-md focus-visible:border-gray-400 focus-visible:outline-gray-300"
        />
        <ul className="w-full mt-2">
          {list?.length > 0 ? (
            list?.map((item, k) => (
              <li key={k} className="p-4 border bg-gray-100 border-gray-200 my-2 rounded-xl shadow-md">
                <p>{item?.name}</p>
              </li>
            ))
          ) : (
            <p>No item found!</p>
          )}
        </ul>
      </div>
    </main>
  );
}
