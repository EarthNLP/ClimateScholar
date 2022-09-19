import React from "react";

/**
 * 
 * @returns 
 */
export function SearchBar(): JSX.Element {
    return(
        <form>   
            <label htmlFor="default-search" className="mb-2 font-medium text-gray-900 sr-only dark:text-gray-300">Search</label>
            <div className="flex flex-row my-8 gap-4 w-search">
                <input type="search" id="default-search" className="text-white p-4 pl-10 w-full text-sm rounded-lg border focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-white dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required />
                <button
            className="inline-flex items-center px-6 py-3 text-base font-sm text-white bg-teal-600 border border-transparent rounded-md shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            onClick={() => 0}
          >
            Search
          </button>
            </div>
            
        </form>
    );
}