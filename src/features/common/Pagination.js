import { ITEMS_PER_PAGE } from "../../constants";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

export default function Pagination({ page, handlePage, totalItems }) {
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    return (
      <>
        <div className="flex flex-1 justify-between sm:hidden">
          <div
            onClick={(e) => handlePage(page > 1 ? page - 1 : page, "prev")}
            className="relative cursor-pointer inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Previous
          </div>
          <div
            onClick={(e) => handlePage(page < totalPages ? page + 1 : page, "next")}
            className="relative ml-3 cursor-pointer inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Next
          </div>
        </div>
        <div className="flex flex-1 items-center justify-between">
          <div className="xs:mx-auto xs:my-2">
            <p className="text-sm text-gray-700">
              Showing{" "}
              <span className="font-medium">
                {(page - 1) * ITEMS_PER_PAGE + 1}
              </span>{" "}
              to{" "}
              <span className="font-medium">
                {page * ITEMS_PER_PAGE < totalItems
                  ? page * ITEMS_PER_PAGE
                  : totalItems}
              </span>{" "}
              of <span className="font-medium">{totalItems}</span> results
            </p>
          </div>
          <div className="xs:hidden">
            <nav
              className="isolate inline-flex -space-x-px rounded-md shadow-sm"
              aria-label="Pagination"
            >
              <div
                onClick={(e) => handlePage(page > 1 ? page - 1 : page, "prev")}
                className="relative cursor-pointer inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </div>
              {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
              {Array.from({ length: totalPages }).map((el, index) => (
                <div
                  key={index}
                  onClick={(e) => handlePage(index + 1)}
                  aria-current="page"
                  className={`relative z-10 cursor-pointer inline-flex items-center ${
                    page === index + 1
                      ? "bg-indigo-600 text-white"
                      : "text-gray-400 bg-white"
                  } px-4 py-2 text-sm font-semibold focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                >
                  {index + 1}
                </div>
              ))}
  
              <div
                onClick={(e) => handlePage(page < totalPages ? page + 1 : page, "next")}
                className="relative cursor-pointer inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </div>
            </nav>
          </div>
        </div>
      </>
    );
  }