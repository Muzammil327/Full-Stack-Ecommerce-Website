"use client";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
} from "@headlessui/react";

import React, { Fragment, useState } from "react";
import Button from "@/src/components/ui/Button";

export default function Dialogs({
  className,
  title,
  description,
  para,
  onClick,
  children,
}: {
  className?: string;
  title: string;
  description?: string;
  para?: string;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  let [isOpen, setIsOpen] = useState(false);

  return (
    <DialogPanels
      dialog={{
        title: title,
        description: description,
        para: para,
      }}
      setIsOpen={setIsOpen}
      isOpen={isOpen}
      onClick={onClick}
      className={className}
    >
      {children}
    </DialogPanels>
  );
}

interface DialogPanelProps {
  dialog: {
    title?: string;
    description?: string;
    para?: string;
  };
  onClick?: () => void;
  setIsOpen: any;
  isOpen: any;
  className: any;
  children: React.ReactNode;
}

export function DialogPanels({
  className,
  dialog,
  setIsOpen,
  isOpen,
  onClick,
  children,
}: DialogPanelProps) {
  return (
    <Fragment>
      <Button
        className={className}
        onClick={() => setIsOpen(true)}
        type="submit"
      >
        {children}
      </Button>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <Transition
          appear
          show={isOpen}
          as={Fragment}
          enter="transition ease-out duration-300"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition ease-in duration-200"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <DialogPanel className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-black/30">
            <div className="max-w-lg space-y-4 border bg-gray-200 p-12 rounded-md">
              <DialogTitle className="font-bold text-xl text-center">
                {dialog.title}
              </DialogTitle>
              <Description>{dialog.description}</Description>
              <p>{dialog.para}</p>
              <div className="flex gap-4">
                <Button
                  onClick={() => setIsOpen(false)}
                  className="button_solid px-4"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    setIsOpen(false), onClick;
                  }}
                  className="button_outline px-4"
                >
                  Delete
                </Button>
              </div>
            </div>
          </DialogPanel>
        </Transition>
      </Dialog>
    </Fragment>
  );
}
