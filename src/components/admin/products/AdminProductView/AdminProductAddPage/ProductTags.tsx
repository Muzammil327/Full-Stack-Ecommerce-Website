import React, { ChangeEvent } from "react";
import Label from "@/src/components/ui/Label";
import Select from "@/src/components/ui/Select";

export default function ProductTags({
  isCheckedFreeDelivery,
  setIsCheckedFreeDelivery,
  isBestPriceCheckbox,
  setIsBestPriceCheckbox,
  isFeatureCheckbox,
  setIsFeatureCheckbox,
  isTopCheckbox,
  setIsTopCheckbox,
}: {
  isCheckedFreeDelivery: boolean;
  setIsCheckedFreeDelivery: (freeDelivery: boolean) => void;
  isBestPriceCheckbox: boolean;
  setIsBestPriceCheckbox: (bestprice: boolean) => void;
  isFeatureCheckbox: boolean;
  setIsFeatureCheckbox: (feature: boolean) => void;
  isTopCheckbox: boolean;
  setIsTopCheckbox: (top: boolean) => void;
}) {
  return (
    <div className="md:mb-5 mb-2">
      <Label label="Tags:" htmlFor="tags" />

      <div className="grid grid-cols-4 items-center justify-between mt-2">
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="freeDeliveryCheckbox"
            checked={isCheckedFreeDelivery}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              const isCheckedFreeDelivery = e.target.checked;
              setIsCheckedFreeDelivery(isCheckedFreeDelivery);
            }}
          />
          <label
            className="form-check-label pl-2"
            htmlFor="freeDeliveryCheckbox"
          >
            Free Delivery
          </label>
        </div>

        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="bestPriceCheckbox"
            checked={isBestPriceCheckbox}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              const isBestPriceCheckbox = e.target.checked;
              setIsBestPriceCheckbox(isBestPriceCheckbox);
            }}
          />
          <label className="form-check-label pl-2" htmlFor="bestPriceCheckbox">
            Best Price
          </label>
        </div>

        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="featureCheckbox"
            checked={isFeatureCheckbox}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              const isFeatureCheckbox = e.target.checked;
              setIsFeatureCheckbox(isFeatureCheckbox);
            }}
          />
          <label className="form-check-label pl-2" htmlFor="featureCheckbox">
            Featured
          </label>
        </div>

        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="topCheckbox"
            checked={isTopCheckbox}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              const isTopCheckbox = e.target.checked;
              setIsTopCheckbox(isTopCheckbox);
            }}
          />
          <label className="form-check-label pl-2" htmlFor="topCheckbox">
            Top
          </label>
        </div>
      </div>
    </div>
  );
}
