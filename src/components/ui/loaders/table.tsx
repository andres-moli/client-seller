import React from 'react';

interface TableSkeletonProps {
  columns?: number;  // Número de columnas que la tabla tendrá
  rows?: number;     // Número de filas que quieres mostrar en el loading
}

const TableSkeleton: React.FC<TableSkeletonProps> = ({ columns = 6, rows = 6 }) => {
  // Crea un array de filas de acuerdo con el número de filas que deseas mostrar
  const rowsArray = new Array(rows).fill(null);

  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        {/* <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {new Array(columns).fill(null).map((_, index) => (
              <th key={index} className="px-6 py-3">
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
              </th>
            ))}
          </tr>
        </thead> */}
        <tbody>
          {rowsArray.map((_, rowIndex) => (
            <tr key={rowIndex} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              {new Array(columns).fill(null).map((_, columnIndex) => (
                <td key={columnIndex} className="px-6 py-4">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableSkeleton;
