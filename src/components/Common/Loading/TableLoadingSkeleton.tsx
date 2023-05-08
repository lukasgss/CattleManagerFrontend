import React from "react";

type TableLoadingSkeleton = {
  amountOfRows: number;
  amountOfColumns: number;
};

export default function TableLoadingSkeleton({ amountOfRows, amountOfColumns }: TableLoadingSkeleton) {
  const generateWidthPercentage = () => {
    const min = 75;
    const max = 100;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  return (
    <tbody>
      {[...Array(amountOfRows)].map((_, idx) => (
        // eslint-disable-next-line react/no-array-index-key
        <tr key={idx}>
          {[...Array(amountOfColumns)].map((__, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <td key={index}>
              <div
                style={{ width: `${generateWidthPercentage()}%` }}
                className="h-4 animate-pulse rounded-full bg-[var(--primary-light-gray)]"
              />
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}
