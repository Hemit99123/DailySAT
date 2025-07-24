import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Table Component
 *
 * A wrapper component for the HTML <table> element that provides basic styling and scrollable functionality.
 * It uses React.forwardRef to allow access to the underlying <table> element via ref.
 */
const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    <table
      ref={ref}
      className={cn("w-full caption-bottom text-sm", className)}
      {...props}
    />
  </div>
));
Table.displayName = "Table";

/**
 * TableHeader Component
 *
 * A wrapper component for the HTML <thead> element that applies styling for the table header.
 * It uses React.forwardRef to allow access to the underlying <thead> element via ref.
 * The className prop allows for additional custom styles to be applied.
 */
const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
));
TableHeader.displayName = "TableHeader";

/**
 * TableBody Component
 *
 * A wrapper component for the HTML <tbody> element that applies styling for the table body.
 * It uses React.forwardRef to allow access to the underlying <tbody> element via ref.
 * The className prop allows for additional custom styles to be applied.
 */
const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
));
TableBody.displayName = "TableBody";

/**
 * TableFooter Component
 *
 * A wrapper component for the HTML <tfoot> element that applies styling for the table footer.
 * It uses React.forwardRef to allow access to the underlying <tfoot> element via ref.
 * The className prop allows for additional custom styles to be applied.
 */
const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
      className
    )}
    {...props}
  />
));
TableFooter.displayName = "TableFooter";

/**
 * TableRow Component
 *
 * A wrapper component for the HTML <tr> element that applies styling for a table row.
 * It uses React.forwardRef to allow access to the underlying <tr> element via ref.
 * The className prop allows for additional custom styles to be applied.
 */
const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      className
    )}
    {...props}
  />
));
TableRow.displayName = "TableRow";

/**
 * TableHead Component
 *
 * A wrapper component for the HTML <th> element that applies styling for a table header cell.
 * It uses React.forwardRef to allow access to the underlying <th> element via ref.
 * The className prop allows for additional custom styles to be applied.
 */
const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className
    )}
    {...props}
  />
));
TableHead.displayName = "TableHead";

/**
 * TableCell Component
 *
 * A wrapper component for the HTML <td> element that applies styling for a table data cell.
 * It uses React.forwardRef to allow access to the underlying <td> element via ref.
 * The className prop allows for additional custom styles to be applied.
 */
const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      "p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
      className
    )}
    {...props}
  />
));
TableCell.displayName = "TableCell";

/**
 * TableCaption Component
 *
 * A wrapper component for the HTML <caption> element that applies styling for a table caption.
 * It uses React.forwardRef to allow access to the underlying <caption> element via ref.
 * The className prop allows for additional custom styles to be applied.
 */
const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-muted-foreground", className)}
    {...props}
  />
));
TableCaption.displayName = "TableCaption";

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};
