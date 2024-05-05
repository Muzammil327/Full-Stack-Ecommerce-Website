"use client";
import Button from "@/src/components/element/button";
import React, { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const MyTabs: React.FC = () => {
  const [rating, setRating] = useState<number | null>(null);
  const [review, setReview] = useState<string>("");

  const handleRatingChange = (value: number) => {
    setRating(value);
  };

  const handleReviewChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setReview(event.target.value);
  };

  const handleSubmit = () => {
    // Handle form submission, e.g., send rating and review data to server
    console.log("Rating:", rating);
    console.log("Review:", review);
  };

  return (
    <Tabs className="bg-red-100 p-4 rounded-md">
      <TabList className="flex">
        <Tab className={`px-4 py-2 rounded-md cursor-pointer`}>
          Product Details
        </Tab>
        <Tab className={`px-4 py-2 rounded-md cursor-pointer`}>
          Rating & Review
        </Tab>
      </TabList>

      <TabPanel className="p-4">
        <h2>Product Specification</h2>
      </TabPanel>
      <TabPanel className="md:p-4 p-2">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-base font-medium text-gray-700 mb-2">
              Rate this product:
            </label>
            <div>
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  className={`mr-2 px-3 py-1 border rounded-lg ${
                    rating === value ? "bg-blue-600 text-white" : "bg-white"
                  }`}
                  onClick={() => handleRatingChange(value)}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-base font-medium text-gray-700 mb-2">
              Write a review:
            </label>
            <textarea
              className="w-full px-3 py-2 rounded-lg border-none outline-none"
              rows={4}
              value={review}
              onChange={handleReviewChange}
            />
          </div>
          <Button variant="sm" bg="red">
            Submit
          </Button>
        </form>
      </TabPanel>
    </Tabs>
  );
};

export default MyTabs;
//
