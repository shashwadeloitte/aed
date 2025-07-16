import React, { useState, useEffect } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  ColumnDef,
  flexRender,
  ColumnFiltersState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DateRange } from "react-day-picker";
import {
  Search,
  Filter,
  X,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Calendar,
} from "lucide-react";
import { cn } from "@/lib/utils";
import styles from "./AbendTable.module.css";
import AbendDetailModal from "./AbendDetailModal";
import {
  type Abend,
  MOCK_ABENDS,
  ABEND_STATUS_CONFIG,
  PRIORITY_CONFIG,
  APP_CONFIG,
} from "@/constants";
import { STATIC_TEXTS } from "@/constants/staticTexts";

interface AbendTableProps {
  appliedFilter?: string | null;
  filterTimestamp?: number;
  onClearCardFilter?: () => void; // <-- add this
}

export function AbendTable({
  appliedFilter,
  filterTimestamp,
  onClearCardFilter,
}: AbendTableProps = {}) {
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [selectedAbend, setSelectedAbend] = useState<Abend | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Date filter state
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(), // today only
    to: new Date(), // today only
  });

  const formatDate = (date: Date | undefined): string => {
    if (!date) return "";
    return date.toLocaleDateString();
  };

  // Only one useEffect to handle card filter changes
  useEffect(() => {
    if (appliedFilter !== undefined && appliedFilter !== null) {
      setGlobalFilter(""); // Reset search
      setDateRange({ from: new Date(), to: new Date() }); // Reset date
      setColumnFilters(() => {
        if (appliedFilter === STATIC_TEXTS.FILTER_ALL) {
          // No status filter
          return [];
        } else {
          // Only status filter
          return [
            { id: STATIC_TEXTS.KEY_STATUS, value: appliedFilter },
          ];
        }
      });
    }
    // If appliedFilter is null, do nothing (user controls filters)
  }, [appliedFilter, filterTimestamp]);

  // Get unique values for filter dropdowns
  const uniqueStatuses = Array.from(
    new Set(MOCK_ABENDS.map((abend) => abend.status))
  );
  const uniquePriorities = Array.from(
    new Set(MOCK_ABENDS.map((abend) => abend.priority))
  );
  // Domain area options as provided
  const uniqueDomains: string[] = ["MM", "CM", "SCLC", "WDS", "CIW"];

  const [modalDefaultTab, setModalDefaultTab] = useState(
    STATIC_TEXTS.TAB_OVERVIEW
  );

  const handleViewDetails = (abend: Abend) => {
    setSelectedAbend(abend);
    setModalDefaultTab(STATIC_TEXTS.TAB_OVERVIEW);
    setModalOpen(true);
  };

  const handleViewRemediation = (abend: Abend) => {
    setSelectedAbend(abend);
    setModalDefaultTab(STATIC_TEXTS.TAB_REMEDIATION);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedAbend(null);
    setModalDefaultTab("overview");
  };

  // Always show all data - date filter is visual only
  const tableData = MOCK_ABENDS;

  // Define columns for react-table
  const columns: ColumnDef<Abend>[] = [
    {
      accessorKey: STATIC_TEXTS.KEY_JOB_NAME,
      header: STATIC_TEXTS.TABLE_JOB_NAME,
      cell: ({ row }) => (
        <div className="font-medium text-blue-700 underline underline-offset-2 hover:bg-blue-50 hover:text-blue-900 transition-colors duration-200 rounded px-2 py-1 cursor-pointer">
          {row.getValue("jobName")}
        </div>
      ),
    },
    {
      accessorKey: STATIC_TEXTS.KEY_JOB_ID,
      header: STATIC_TEXTS.TABLE_JOB_ID,
      cell: ({ row }) => (
        <div className="font-mono text-sm">{row.getValue("jobId")}</div>
      ),
    },
    // Move domain area column here
    {
      accessorKey: STATIC_TEXTS.KEY_DOMAIN,
      header: STATIC_TEXTS.TABLE_DOMAIN_AREA,
      cell: ({ row }) => <span>{row.getValue("domain") || ""}</span>,
    },
    {
      accessorKey: STATIC_TEXTS.KEY_ABEND_TYPE,
      header: STATIC_TEXTS.ABEND_TYPE,
      cell: ({ row }) => {
        const assignedTo = row.getValue("assignedTo");
        if (assignedTo === STATIC_TEXTS.AI_SYSTEM) return "";
        return (
          <Badge variant="outline" className="font-mono">
            {row.getValue("abendType")}
          </Badge>
        );
      },
    },
    {
      accessorKey: STATIC_TEXTS.KEY_STATUS,
      header: STATIC_TEXTS.TABLE_STATUS,
      cell: ({ row }) => {
        const status = row.getValue(
          "status"
        ) as keyof typeof ABEND_STATUS_CONFIG;
        return (
          <Badge variant={ABEND_STATUS_CONFIG[status].variant}>
            {ABEND_STATUS_CONFIG[status].label}
          </Badge>
        );
      },
      filterFn: (row, id, value) => {
        if (value === STATIC_TEXTS.FILTER_ALL) return true;
        if (value === STATIC_TEXTS.FILTER_ACTIVE) {
          // "active" filter maps to multiple state machine statuses
          const status = row.getValue(id) as string;
          return (
            status === STATIC_TEXTS.STATUS_ABEND_DETECTED ||
            status === STATIC_TEXTS.STATUS_REMEDIATION_SUGGESTIONS_GENERATED ||
            status === STATIC_TEXTS.STATUS_MANUAL_ANALYSIS_REQUIRED
          );
        }
        return row.getValue(id) === value;
      },
    },
    {
      accessorKey: STATIC_TEXTS.KEY_PRIORITY,
      header: STATIC_TEXTS.TABLE_PRIORITY,
      cell: ({ row }) => {
        const priority = row.getValue(
          "priority"
        ) as keyof typeof PRIORITY_CONFIG;
        const config = PRIORITY_CONFIG[priority];
        if (!config) return null;
        return <span className={config.className}>{config.label}</span>;
      },
      filterFn: (row, id, value) => {
        return value === STATIC_TEXTS.FILTER_ALL || row.getValue(id) === value;
      },
    },
    {
      accessorKey: STATIC_TEXTS.KEY_TIMESTAMP,
      header: STATIC_TEXTS.TABLE_TIMESTAMP,
      cell: ({ row }) => (
        <div className="text-muted-foreground">
          {new Date(row.getValue("timestamp")).toLocaleString()}
        </div>
      ),
    },
    {
      accessorKey: STATIC_TEXTS.KEY_CONFIDENCE,
      header: STATIC_TEXTS.TABLE_AI_CONFIDENCE,
      cell: ({ row }) => {
        const assignedTo = row.getValue("assignedTo");
        if (assignedTo === STATIC_TEXTS.AI_SYSTEM) return "";
        const confidence = row.getValue("confidence") as number;
        return (
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-muted h-2 rounded-full overflow-hidden">
              <div
                className={cn(
                  styles.confidenceBar,
                  confidence >= 90
                    ? styles.confidenceHigh
                    : confidence >= 70
                    ? styles.confidenceMedium
                    : styles.confidenceLow
                )}
                style={
                  {
                    "--confidence-width": `${confidence}%`,
                  } as React.CSSProperties
                }
              />
            </div>
            <span className="text-sm font-medium w-8">{confidence}%</span>
          </div>
        );
      },
    },
    {
      accessorKey: STATIC_TEXTS.KEY_ASSIGNED_TO,
      header: STATIC_TEXTS.TABLE_ASSIGNED_TO,
    },
    {
      id: "actions",
      header: STATIC_TEXTS.TABLE_ACTIONS,
      cell: ({ row }) => {
        const abend = row.original;
        if (abend.status !== STATIC_TEXTS.STATUS_PENDING_MANUAL_APPROVAL) {
          return null; // Don't show button for non-pending statuses
        }

        return (
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation(); // Prevent row click when button is clicked
              handleViewRemediation(abend);
            }}
          >
            {STATIC_TEXTS.VIEW_DETAILS}
          </Button>
        );
      },
    },
  ];

  const table = useReactTable({
    data: tableData,
    columns,
    state: {
      globalFilter,
      columnFilters,
    },
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    globalFilterFn: "includesString",
    initialState: {
      pagination: {
        pageSize: APP_CONFIG.PAGINATION_DEFAULT_SIZE,
      },
    },
  });

  // Helper functions for filter management
  const getColumnFilterValue = (columnId: string): string => {
    const filter = columnFilters.find((f) => f.id === columnId);
    return (filter?.value as string) || STATIC_TEXTS.FILTER_ALL;
  };

  // Wrap filter setters to clear card filter only if needed
  const setColumnFilterValue = (columnId: string, value: string) => {
    if (onClearCardFilter && appliedFilter !== null) onClearCardFilter();
    setColumnFilters((prev) => {
      const otherFilters = prev.filter((f) => f.id !== columnId);
      if (value === STATIC_TEXTS.FILTER_ALL) {
        return otherFilters;
      }
      return [...otherFilters, { id: columnId, value }];
    });
  };
  const handleGlobalFilterChange = (value: string) => {
    if (onClearCardFilter && appliedFilter !== null) onClearCardFilter();
    setGlobalFilter(value);
  };

  const clearAllFilters = () => {
    setGlobalFilter("");
    setColumnFilters([]);
    // Reset date back to today
    setDateRange({
      from: new Date(),
      to: new Date(),
    });
  };

  // Check if date selection is different from today
  const isDateSelectionActive = () => {
    const today = new Date();
    const todayStr = today.toDateString();

    if (!dateRange?.from) return false;

    const fromStr = dateRange.from.toDateString();
    const toStr = dateRange.to?.toDateString() || fromStr;

    // If it's not today only, then selection is different from default
    return fromStr !== todayStr || toStr !== todayStr;
  };

  const hasActiveFilters =
    globalFilter !== "" || columnFilters.length > 0 || isDateSelectionActive();

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{STATIC_TEXTS.ABENDS}</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {STATIC_TEXTS.SHOWING} {table.getFilteredRowModel().rows.length} {STATIC_TEXTS.ABENDS.toLowerCase()}
              </p>
            </div>
            <div className="flex items-center justify-between gap-4 flex-wrap w-full">
              <div className="flex items-center gap-4 flex-wrap">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder={STATIC_TEXTS.SEARCH_BY_JOB_NAME || "Search by job name"}
                    value={globalFilter}
                    onChange={(e) => handleGlobalFilterChange(e.target.value)}
                    className="pl-10 w-80"
                  />
                  {globalFilter && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                      onClick={() => setGlobalFilter("")}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  )}
                </div>

                <Select
                  value={getColumnFilterValue("status")}
                  onValueChange={(value) => setColumnFilterValue("status", value)}
                >
                  <SelectTrigger className="w-48">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder={STATIC_TEXTS.FILTER_BY_STATUS || "Filter by status"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={STATIC_TEXTS.FILTER_ALL}>
                      {STATIC_TEXTS.FILTER_ALL_STATUSES}
                    </SelectItem>
                    {uniqueStatuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {ABEND_STATUS_CONFIG[status].label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={getColumnFilterValue("priority")}
                  onValueChange={(value) =>
                    setColumnFilterValue("priority", value)
                  }
                >
                  <SelectTrigger className="w-44">
                    <SelectValue
                      placeholder={STATIC_TEXTS.PLACEHOLDER_PRIORITY}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={STATIC_TEXTS.FILTER_ALL}>
                      {STATIC_TEXTS.FILTER_ALL_PRIORITIES}
                    </SelectItem>
                    {uniquePriorities.map((priority) => (
                      <SelectItem key={priority} value={priority}>
                        {PRIORITY_CONFIG[priority].label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Domain Area Filter Dropdown */}
                <Select
                  value={getColumnFilterValue(STATIC_TEXTS.KEY_DOMAIN)}
                  onValueChange={(value) =>
                    setColumnFilterValue(STATIC_TEXTS.KEY_DOMAIN, value)
                  }
                >
                  <SelectTrigger className="w-44">
                    <SelectValue placeholder={STATIC_TEXTS.PLACEHOLDER_DOMAIN} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={STATIC_TEXTS.FILTER_ALL}>
                      {STATIC_TEXTS.FILTER_ALL_DOMAINS}
                    </SelectItem>
                    {/* No domain options for now */}
                    {uniqueDomains.map((domain) => (
                      <SelectItem key={domain} value={domain}>
                        {domain}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-64 justify-start text-left font-normal"
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {dateRange?.from ? (
                        dateRange.to &&
                        dateRange.from.toDateString() !==
                          dateRange.to.toDateString() ? (
                          <>
                            {formatDate(dateRange.from)} -{" "}
                            {formatDate(dateRange.to)}
                          </>
                        ) : (
                          formatDate(dateRange.from)
                        )
                      ) : (
                        <span>{STATIC_TEXTS.PICK_A_DATE || "Pick a date"}</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="range"
                      defaultMonth={dateRange?.from}
                      selected={dateRange}
                      onSelect={setDateRange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                    />
                  </PopoverContent>
                </Popover>
              </div>
              {hasActiveFilters && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearAllFilters}
                  className="text-muted-foreground"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  {STATIC_TEXTS.CLEAR_FILTERS}
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[500px] flex flex-col rounded-xl border shadow bg-gray-50 p-4">
            {table.getFilteredRowModel().rows.length === 0 ? (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-muted-foreground">
                    {STATIC_TEXTS.NO_ABENDS_FOUND || "No abends found matching your search criteria."}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearAllFilters}
                    className="mt-2"
                  >
                    {STATIC_TEXTS.CLEAR_FILTERS}
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-auto">
                  <Table className="w-full table-fixed rounded-xl overflow-hidden shadow-sm">
                    <TableHeader className="sticky top-0 z-10 bg-gray-100">
                      {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                          {headerGroup.headers.map((header) => (
                            <TableHead
                              key={header.id}
                              className="px-6 py-3 text-base font-semibold text-gray-800 bg-gray-100 border-b border-gray-200 uppercase tracking-wide first:rounded-tl-xl last:rounded-tr-xl"
                            >
                              {header.isPlaceholder
                                ? null
                                : flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                  )}
                            </TableHead>
                          ))}
                        </TableRow>
                      ))}
                    </TableHeader>
                    <TableBody>
                      {table.getRowModel().rows.map((row, idx) => (
                        <TableRow
                          key={row.id}
                          className={
                            `cursor-pointer transition-colors even:bg-white hover:bg-blue-50` +
                            (row.getIsSelected() ? ' bg-blue-100' : '')
                          }
                          onClick={() => handleViewDetails(row.original)}
                        >
                          {row.getVisibleCells().map((cell, cellIdx) => (
                            <TableCell
                              key={cell.id}
                              className={
                                `px-6 py-3 align-middle text-base text-gray-900 border-b border-gray-100 ` +
                                (cellIdx === 0 ? 'rounded-bl-xl' : '') +
                                (cellIdx === row.getVisibleCells().length - 1 ? 'rounded-br-xl' : '')
                              }
                            >
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Pagination Controls */}
                <div className="border-t bg-background p-4 flex-shrink-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-sm text-muted-foreground">
                        {STATIC_TEXTS.SHOWING}
                        {table.getState().pagination.pageIndex *
                          table.getState().pagination.pageSize +
                          1}
                        -
                        {Math.min(
                          (table.getState().pagination.pageIndex + 1) *
                            table.getState().pagination.pageSize,
                          table.getFilteredRowModel().rows.length
                        )}{" "}
                        {STATIC_TEXTS.OF} {table.getFilteredRowModel().rows.length} {STATIC_TEXTS.RESULTS}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">
                          {STATIC_TEXTS.ROWS_PER_PAGE || "Rows per page:"}
                        </span>
                        <Select
                          value={table
                            .getState()
                            .pagination.pageSize.toString()}
                          onValueChange={(value) => {
                            table.setPageSize(Number(value));
                          }}
                        >
                          <SelectTrigger className="w-20">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="5">5</SelectItem>
                            <SelectItem value="10">10</SelectItem>
                            <SelectItem value="20">20</SelectItem>
                            <SelectItem value="50">50</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="text-sm text-muted-foreground">
                        {STATIC_TEXTS.PAGE} {table.getState().pagination.pageIndex + 1} {STATIC_TEXTS.OF} {table.getPageCount()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => table.setPageIndex(0)}
                          disabled={!table.getCanPreviousPage()}
                          className="h-8 w-8 p-0"
                        >
                          <ChevronsLeft className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => table.previousPage()}
                          disabled={!table.getCanPreviousPage()}
                          className="h-8 w-8 p-0"
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => table.nextPage()}
                          disabled={!table.getCanNextPage()}
                          className="h-8 w-8 p-0"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            table.setPageIndex(table.getPageCount() - 1)
                          }
                          disabled={!table.getCanNextPage()}
                          className="h-8 w-8 p-0"
                        >
                          <ChevronsRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      <AbendDetailModal
        abend={selectedAbend}
        open={modalOpen}
        onClose={handleCloseModal}
        defaultTab={modalDefaultTab}
      />
    </>
  );
}
