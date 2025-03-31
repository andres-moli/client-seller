import { ReactNode } from "react";
import Button from "../button/Button";

// Props for Table
interface TableProps {
  children: ReactNode; // Table content (thead, tbody, etc.)
  className?: string; // Optional className for styling
}

// Props for TableHeader
interface TableHeaderProps {
  children: ReactNode; // Header row(s)
  className?: string; // Optional className for styling
}

// Props for TableBody
interface TableBodyProps {
  children: ReactNode; // Body row(s)
  className?: string; // Optional className for styling
}

// Props for TableRow
interface TableRowProps {
  children: ReactNode; // Cells (th or td)
  className?: string; // Optional className for styling
}

// Props for TableCell
interface TableCellProps {
  children: ReactNode; // Cell content
  isHeader?: boolean; // If true, renders as <th>, otherwise <td>
  className?: string; // Optional className for styling
  onClick?: () => void;
}


// Props for ButtonTable
interface ButtonTableProps {
  onClick: () => void; // Function to handle click event
  children: ReactNode; // Button content (text or icon)
  className?: string; // Optional className for styling
  disabled?: boolean
}

// ButtonTable Component
const ButtonTable: React.FC<ButtonTableProps> = ({ onClick, children, className, disabled }) => {
  return (
    <Button
      disabled={disabled}
      onClick={onClick}
      className={`bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors my-4  ml-4  ${className}`}
    >
      {children}
    </Button>
  );
};

// Table Component
const Table: React.FC<TableProps> = ({ children, className }) => {
  return <table className={`min-w-full  ${className}`}>{children}</table>;
};

// TableHeader Component
const TableHeader: React.FC<TableHeaderProps> = ({ children, className }) => {
  return <thead className={className}>{children}</thead>;
};

// TableBody Component
const TableBody: React.FC<TableBodyProps> = ({ children, className }) => {
  return <tbody className={className}>{children}</tbody>;
};

// TableRow Component
const TableRow: React.FC<TableRowProps> = ({ children, className }) => {
  return <tr className={className}>{children}</tr>;
};

// TableCell Component
const TableCell: React.FC<TableCellProps> = ({
  children,
  isHeader = false,
  className,
onClick
}) => {
  const CellTag = isHeader ? "th" : "td";
  return <CellTag className={` ${className}`} onClick={onClick}>{children}</CellTag>;
};

export { Table, TableHeader, TableBody, TableRow, TableCell, ButtonTable };
