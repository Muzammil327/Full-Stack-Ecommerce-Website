"use client";
import React, { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import ReviewView from "@/src/components/productDetail/components/Reviews/Reviews";
interface ProductDetailTagProps {
  data: {
    Ldescription: string;
  };
}

export default function ProductDetailTab({ data }: ProductDetailTagProps) {
  const [reviewsFetched, setReviewsFetched] = useState(false);

  const handleTabSelect = () => {
    setReviewsFetched(true);
  };

  return (
    <Tabs className="">
      <TabList className="flex sm:flex-row flex-col md:p-4 md:items-center md:justify-center gap-4">
        <Tab
          className="text-gray-600 px-4 py-2 cursor-pointer outline-none border-b-2 border-solid border-gray-200"
          selectedClassName="border-b-2 border-solid border-indigo-500"
        >
          Description
        </Tab>
        <Tab
          className="text-gray-600 px-4 py-2 cursor-pointer outline-none border-b-2 border-solid border-gray-200"
          selectedClassName="border-b-2 border-solid border-indigo-500"
          onSelect={() => handleTabSelect()}
        >
          Reviews
        </Tab>
      </TabList>

      <TabPanel className="">
        <h1 className="text-2xl font-semibold my-2">Product Description</h1>
        <p className="mt-4 mb-6 sm:text-base text-sm text-gray-500">
          <div dangerouslySetInnerHTML={{ __html: data.Ldescription }} />
        </p>
      </TabPanel>
      <TabPanel className="">
        <h1 className="text-2xl font-semibold my-2">
          Product Review and Rating
        </h1>
        <ReviewView productId={data} setReviewsFetched={setReviewsFetched} />
      </TabPanel>
    </Tabs>
  );
}
