// app/components/ElementSelector.js

"use client";

import { Listbox } from "@headlessui/react";
import { Fragment, useState } from "react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";

export default function ElementSelector({ elements, onSelectElement }) {
  const [selected, setSelected] = useState(null);

  const handleChange = (value) => {
    setSelected(value);
    onSelectElement(value.id.toString());
  };

  return (
    <div className="w-72 mx-auto mt-4">
      <Listbox value={selected} onChange={handleChange}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white border border-gray-300 rounded-lg shadow-md cursor-default focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <span className="block truncate">
              {selected ? selected.name : "Select an Element"}
            </span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <SelectorIcon
                className="w-5 h-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white border border-gray-300 rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {elements.map((element) => (
              <Listbox.Option key={element.id} value={element} as={Fragment}>
                {({ active, selected }) => (
                  <li
                    className={`${
                      active ? "text-white bg-indigo-600" : "text-gray-900"
                    } cursor-default select-none relative py-2 pl-10 pr-4`}
                  >
                    <span
                      className={`${
                        selected ? "font-medium" : "font-normal"
                      } block truncate`}
                    >
                      {element.name}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-600">
                        <CheckIcon className="w-5 h-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </li>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  );
}
