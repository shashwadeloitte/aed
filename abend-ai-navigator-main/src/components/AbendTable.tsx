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
import { Search, Filter, X, RotateCcw, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import styles from "./AbendTable.module.css";
import AbendDetailModal from "./AbendDetailModal";
import {
  type Abend,
  MOCK_ABENDS,
  ABEND_STATUS_CONFIG,
  PRIORITY_CONFIG,
  APP_CONFIG
} from "@/constants";

interface AbendTableProps {
  appliedFilter?: string | null;
  filterTimestamp?: number;
}

export function AbendTable({ appliedFilter, filterTimestamp }: AbendTableProps = {}) {
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [selectedAbend, setSelectedAbend] = useState<Abend | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  
  // Date filter state  
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(), // today only
    to: new Date() // today only
  });

  const formatDate = (date: Date | undefined): string => {
    if (!date) return "";
    return date.toLocaleDateString();
  };

  // Apply external filter when it changes
  useEffect(() => {
    if (appliedFilter !== undefined && appliedFilter !== null) {
      setColumnFilters(prev => {
        // Remove any existing status filter
        const otherFilters = prev.filter(f => f.id !== "status");
        
        if (appliedFilter === "all") {
          // For "all", just remove the status filter, keep other filters
          return otherFilters;
        } else {
          // Add the new status filter while keeping other filters
          return [...otherFilters, { id: "status", value: appliedFilter }];
        }
      });
    }
  }, [appliedFilter, filterTimestamp]);

  // Get unique values for filter dropdowns
  const uniqueStatuses = Array.from(new Set(MOCK_ABENDS.map(abend => abend.status)));
  const uniquePriorities = Array.from(new Set(MOCK_ABENDS.map(abend => abend.priority)));

  const [modalDefaultTab, setModalDefaultTab] = useState("overview");

  const handleViewDetails = (abend: Abend) => {
    setSelectedAbend(abend);
    setModalDefaultTab("overview");
    setModalOpen(true);
  };

  const handleViewRemediation = (abend: Abend) => {
    setSelectedAbend(abend);
    setModalDefaultTab("remediation");
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
      accessorKey: "jobName",
      header: "Job Name",
      cell: ({ row }) => (
        <div className="font-medium hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200 rounded px-2 py-1 cursor-pointer">
          {row.getValue("jobName")}
        </div>
      ),
    },
    {
      accessorKey: "jobId",
      header: "Job ID",
      cell: ({ row }) => (
        <div className="font-mono text-sm">{row.getValue("jobId")}</div>
      ),
    },
    {
      accessorKey: "abendType",
      header: "Type",
      cell: ({ row }) => (
        <Badge variant="outline" className="font-mono">
          {row.getValue("abendType")}
        </Badge>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as keyof typeof ABEND_STATUS_CONFIG;
        return (
          <Badge variant={ABEND_STATUS_CONFIG[status].variant}>
            {ABEND_STATUS_CONFIG[status].label}
          </Badge>
        );
      },
      filterFn: (row, id, value) => {
        if (value === "all") return true;
        if (value === "active") {
          // "active" filter maps to multiple state machine statuses
          const status = row.getValue(id) as string;
          return status === "ABEND_DETECTED" || 
                 status === "REMEDIATION_SUGGESTIONS_GENERATED" || 
                 status === "MANUAL_ANALYSIS_REQUIRED";
        }
        return row.getValue(id) === value;
      },
    },
    {
      accessorKey: "timestamp",
      header: "Timestamp",
      cell: ({ row }) => (
        <div className="text-muted-foreground">{new Date(row.getValue("timestamp")).toLocaleString()}</div>
      ),
    },
    {
      accessorKey: "confidence",
      header: "AI Confidence",
      cell: ({ row }) => {
        const confidence = row.getValue("confidence") as number;
        return (
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-muted h-2 rounded-full overflow-hidden">
              <div 
                className={cn(
                  styles.confidenceBar,
                  confidence >= 90 ? styles.confidenceHigh :
                  confidence >= 70 ? styles.confidenceMedium : styles.confidenceLow
                )}
                style={{ "--confidence-width": `${confidence}%` } as React.CSSProperties}
              />
            </div>
            <span className="text-sm font-medium w-8">
              {confidence}%
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "assignedTo",
      header: "Assigned To",
    },
    {
      accessorKey: "priority",
      header: "Priority",
      cell: ({ row }) => (
        <span className="font-medium">{row.getValue("priority")}</span>
      ),
      filterFn: (row, id, value) => {
        return value === "all" || row.getValue(id) === value;
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const abend = row.original;
        if (abend.status !== "PENDING_MANUAL_APPROVAL") {
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
            View Details
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
    const filter = columnFilters.find(f => f.id === columnId);
    return (filter?.value as string) || "all";
  };

  const setColumnFilterValue = (columnId: string, value: string) => {
    setColumnFilters(prev => {
      const otherFilters = prev.filter(f => f.id !== columnId);
      if (value === "all") {
        return otherFilters;
      }
      return [...otherFilters, { id: columnId, value }];
    });
  };

  const clearAllFilters = () => {
    setGlobalFilter("");
    setColumnFilters([]);
    // Reset date back to today
    setDateRange({
      from: new Date(),
      to: new Date()
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

  const hasActiveFilters = globalFilter !== "" || columnFilters.length > 0 || isDateSelectionActive();

  return (
    <>
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
            <div>
              <CardTitle>Abends</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Showing {table.getFilteredRowModel().rows.length} abends
              </p>
            </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by job name"
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
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
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                  {uniqueStatuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {ABEND_STATUS_CONFIG[status].label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select 
                value={getColumnFilterValue("priority")} 
                onValueChange={(value) => setColumnFilterValue("priority", value)}
              >
                <SelectTrigger className="w-44">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  {uniquePriorities.map((priority) => (
                    <SelectItem key={priority} value={priority}>
                      {PRIORITY_CONFIG[priority].label}
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
                      dateRange.to && dateRange.from.toDateString() !== dateRange.to.toDateString() ? (
                        <>
                          {formatDate(dateRange.from)} - {formatDate(dateRange.to)}
                        </>
                      ) : (
                        formatDate(dateRange.from)
                      )
                    ) : (
                      <span>Pick a date</span>
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

              {hasActiveFilters && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearAllFilters}
                  className="text-muted-foreground"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Clear
                </Button>
              )}
            </div>
        </div>
      </CardHeader>
      <CardContent>
          <div className="h-[500px] overflow-hidden flex flex-col">
            {table.getFilteredRowModel().rows.length === 0 ? (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-muted-foreground">No abends found matching your search criteria.</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearAllFilters}
                    className="mt-2"
                  >
                    Clear filters
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-auto">
        <Table>
                    <TableHeader className="sticky top-0 bg-background z-10">
                      {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                          {headerGroup.headers.map((header) => (
                            <TableHead key={header.id}>
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
                      {table.getRowModel().rows.map((row) => (
                        <TableRow 
                          key={row.id} 
                          className="hover:bg-muted/50 cursor-pointer"
                          onClick={() => handleViewDetails(row.original)}
                        >
                          {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id}>
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
                        Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}-{Math.min((table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize, table.getFilteredRowModel().rows.length)} of {table.getFilteredRowModel().rows.length} results
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Rows per page:</span>
                        <Select
                          value={table.getState().pagination.pageSize.toString()}
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
                        Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
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
                          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
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