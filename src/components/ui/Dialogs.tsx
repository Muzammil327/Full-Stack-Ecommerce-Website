"use client";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ReactNode, useState } from "react";
import Button from "./Button";

export default function Dialogs({
  className,
  children,
  title,
  description,
  para,
  delete: isDelete = false,
  update: isUpdate = false,
  onClick,
  form,
}: {
  children: ReactNode;
  className?: string;
  title: string;
  description?: string;
  para?: string;
  delete?: boolean;
  update?: boolean;
  form?: any;
  onClick?: () => void;
}) {
  let [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button className={className} onClick={() => setIsOpen(true)}>
        {children}
      </Button>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        {isDelete && (
          <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
            <DialogPanel className="max-w-lg space-y-4 border bg-gray-200 p-12">
              <DialogTitle className="font-bold text-xl text-center">
                {title}
              </DialogTitle>
              <Description>{description}</Description>
              <p> {para}</p>
              <div className="flex gap-4">
                <Button onClick={() => setIsOpen(false)} className="button_bg">
                  Cancel
                </Button>
                <button onClick={onClick} className="button_bg">
                  Delete
                </button>
              </div>
            </DialogPanel>
          </div>
        )}
        {isUpdate && (
          <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
            <DialogPanel className="max-w-lg space-y-4 border bg-gray-200 p-12">
              <DialogTitle className="font-bold text-xl text-center">
                {title}
              </DialogTitle>
              <div className="flex gap-4 flex-col">
                {form}
                <button onClick={onClick} className="button_bg">
                  Submit
                </button>
              </div>
            </DialogPanel>
          </div>
        )}
      </Dialog>
    </>
  );
}
