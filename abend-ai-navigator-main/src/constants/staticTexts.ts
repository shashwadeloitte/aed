// Static texts and constants for the entire application
export const STATIC_TEXTS = {
  // Application Info
  APP_TITLE: "ADR Portal",
  APP_SUBTITLE: "AI-Assisted Batch Diagnosis & Remediation",
  LOGO_ALT: "Elevance Health Logo",
  AI_SYSTEM: "AI System",
  
  // Navigation and Buttons
  REFRESH: "Refresh",
  DOWNLOAD: "Download",
  EXPORT: "Export",
  APPROVE: "Approve",
  REJECT: "Reject",
  CLOSE: "Close",
  LOGOUT: "Logout",
  
  // Dashboard Header
  DASHBOARD_REFRESHED_TITLE: "Dashboard Refreshed",
  DASHBOARD_REFRESHED_DESCRIPTION: "All data has been updated with the latest information.",
  SYSTEM_STATUS_OPERATIONAL: "System Status: Operational",
  SYSTEM_STATUS_DESCRIPTION: "All mainframe connections active. AI services running normally. Last health check:",
  
  // Time and Status
  LAST_UPDATED_NOW: "Last updated now",
  LAST_UPDATED_SEC_AGO: "Last updated {0} sec ago",
  LAST_UPDATED_MIN_AGO: "Last updated {0} min ago",
  LAST_UPDATED_HR_AGO: "Last updated {0} hr ago",
  LAST_UPDATED_DAY_AGO: "Last updated {0} day ago",
  LAST_UPDATED_DAYS_AGO: "Last updated {0} days ago",
  
  // Status Cards
  ACTIVE_ABENDS: "Active Abends",
  PENDING_APPROVAL: "Pending Approval",
  RESOLVED: "Resolved",
  AUTOMATION_RATE: "Automation Rate",
  TOTAL_ABENDS_IN_SYSTEM: "Total abends in system",
  AWAITING_MANUAL_APPROVAL: "Awaiting manual approval",
  SUCCESSFULLY_REMEDIATED: "Successfully remediated",
  PERCENTAGE_AUTOMATED: "Percentage automated",
  
  // Tab Navigation
  OVERVIEW: "Overview",
  ABENDS: "Abends",
  AI_INSIGHTS: "AI Insights",
  ANALYTICS: "Analytics",
  
  // Recent Activity
  RECENT_ACTIVITY: "Recent Activity",
  DETECTED: "Detected",
  SUGGESTIONS_GENERATED: "Suggestions Generated",
  PENDING_APPROVAL_STATUS: "Pending Approval",
  MANUAL_ANALYSIS: "Manual Analysis",
  ABEND_DETECTED: "abend detected",
  AGO: "ago",
  
  // Performance Metrics
  PERFORMANCE_METRICS: "Performance Metrics",
  REAL_TIME_OPERATIONAL_PERFORMANCE: "Real-time operational performance",
  RESPONSE_TIME: "Response Time",
  AUTOMATION_RATE_METRIC: "Automation Rate",
  RESOLUTION_ACCURACY: "Resolution Accuracy",
  SLA_COMPLIANCE: "SLA Compliance",
  ON_TARGET: "On Target",
  AT_RISK: "At Risk",
  CRITICAL: "Critical",
  TARGET: "Target:",
  PERFORMANCE_INSIGHT: "Performance Insight",
  PERFORMANCE_INSIGHT_DESCRIPTION: "System performance is within acceptable ranges.",
  
  // AI Confidence
  AI_CONFIDENCE: "AI Confidence",
  ANALYSIS_RELIABILITY_SCORES: "Analysis reliability scores",
  HIGH_CONFIDENCE: "High Confidence",
  MEDIUM_CONFIDENCE: "Medium Confidence",
  LOW_CONFIDENCE: "Low Confidence",
  VERY_LOW_CONFIDENCE: "Very Low Confidence",
  HIGH_CONFIDENCE_RANGE: "85-100%",
  MEDIUM_CONFIDENCE_RANGE: "60-84%",
  LOW_CONFIDENCE_RANGE: "40-59%",
  VERY_LOW_CONFIDENCE_RANGE: "0-39%",
  HIGH_CONFIDENCE_DESC: "AI can automatically resolve these abends with high accuracy",
  MEDIUM_CONFIDENCE_DESC: "Requires human approval before implementing AI recommendations",
  LOW_CONFIDENCE_DESC: "Manual investigation needed with AI providing supporting analysis",
  VERY_LOW_CONFIDENCE_DESC: "Completely manual resolution required, unknown abend patterns",
  AI_PERFORMANCE_SUMMARY: "AI Performance Summary",
  AI_PERFORMANCE_SUMMARY_DESC: "90% of abends processed with high confidence.",
  
  // Analytics
  PERFORMANCE_TRENDS: "Performance Trends",
  COST_SAVINGS: "Cost Savings",
  ADVANCED_ANALYTICS_DASHBOARD: "Advanced analytics dashboard will be implemented here",
  SAVED_THIS_MONTH: "Saved this month through automation",
  HOURS_SAVED: "Hours saved",
  AUTOMATION_RATE_PERCENT: "Automation rate",
  
  // Filter Messages
  FILTER_APPLIED_TITLE: "Filter Applied",
  SWITCHED_TO_ABENDS_TAB: "Switched to Abends tab with",
  FILTER: "filter.",
  ALL_ABENDS: "All Abends",
  RESOLVED_ABENDS: "Resolved Abends",
  MANUAL_ANALYSIS_REQUIRED: "Manual Analysis Required",
  REMEDIATION_SUGGESTIONS_GENERATED: "Remediation Suggestions Generated",
  
  // AbendDetailModal
  ABEND_DETAILS: "Abend Details",
  TRACKING_ID: "Tracking ID:",
  ORDER_ID: "Order ID:",
  ABEND_INFORMATION: "Abend Information",
  ABEND_ID: "Abend ID",
  JOB_NAME: "Job Name",
  JOB_ID: "Job ID",
  ABEND_TYPE: "Abend Type",
  PRIORITY: "Priority",
  STATUS: "Status",
  ADR_STATUS: "ADR Status",
  CONFIDENCE: "Confidence",
  INCIDENT_NUMBER: "Incident Number",
  SEVERITY: "Severity",
  CURRENT_STATE: "Current State",
  DURATION_IN_STATE: "Duration in Current State",
  ASSIGNED_TO: "Assigned To",
  ROOT_CAUSE: "Root Cause",
  RECOMMENDED_ACTION: "Recommended Action",
  CREATED_AT: "Created At",
  
  // Workflow Progress
  WORKFLOW_PROGRESS: "Workflow Progress",
  CURRENT_STEP: "Current Step",
  WORKFLOW_DETECTED: "Detected",
  WORKFLOW_AI_ANALYSIS: "AI Analysis",
  WORKFLOW_REMEDIATION: "Remediation",
  WORKFLOW_RESOLVED: "Resolved",
  
  // Workflow Step States
  WORKFLOW_STATE_DETECTED: "DETECTED",
  WORKFLOW_STATE_AI_ANALYSIS: "AI_ANALYSIS",
  WORKFLOW_STATE_REMEDIATION: "REMEDIATION",
  WORKFLOW_STATE_RESOLVED: "RESOLVED",
  
  // AI Confidence Analysis
  AI_CONFIDENCE_ANALYSIS: "AI Confidence Analysis",
  CONFIDENCE_SCORE: "Confidence Score",
  AI_ANALYSIS_DESCRIPTION: "The AI system has analyzed the abend patterns and historical data to provide diagnosis and remediation recommendations.",
  
  // Root Cause Analysis
  ROOT_CAUSE_ANALYSIS: "Root Cause Analysis",
  RETURN_CODE_IDENTIFIED: "Return Code Identified",
  ROOT_CAUSE_SUMMARY: "Root Cause Summary",
  ROOT_CAUSE_SUMMARY_DETAIL: "Invalid record format in input file during STEP1 of job OGGLOAD",
  DETAILED_EXPLANATION: "Detailed Explanation",
  DETAILED_EXPLANATION_STEP1: "1. The job OGGLOAD (JOB12456) started successfully at 23:58:45.",
  DETAILED_EXPLANATION_STEP2: "2. STEP1 of the job began loading data into DB2 table XYZ.TXN_LOG at 23:58:46.",
  DETAILED_EXPLANATION_STEP3: "3. At 23:58:50, an error was reported: \"INVALID RECORD FORMAT IN INPUT FILE\".",
  DETAILED_EXPLANATION_STEP4: "4. This error led to job termination at 23:58:51 with abend code GG33.",
  DETAILED_EXPLANATION_STEP5: "5. The abend reason is specified as \"DATA FORMAT ERROR ON LINE 2457\".",
  DETAILED_EXPLANATION_STEP6: "6. Additional information from STC12345 confirms the abend occurred in module OGGEXTR1 at offset X'00001A24'.",
  DETAILED_EXPLANATION_STEP7: "7. Message OGG9999I indicates termination due to a fatal input validation error.",
  IMS_STATUS_CODE_INTERPRETATION: "IMS Status Code Interpretation",
  IMS_STATUS_CODE_INTERPRETATION_DETAIL: "GG33: User abend code indicating a data format error in Oracle GoldenGate processing",
  
  // AI Recommendations
  AI_RECOMMENDED_ACTIONS: "AI Recommended Actions",
  PRIMARY_RECOMMENDATION: "Primary Recommendation",
  RECOMMENDED: "Recommended",
  PRIMARY_RECOMMENDATION_DETAIL: "Send email to operations Team to Restart the JOB from the Abended State and also include the step number (STEP1)",
  SUCCESS_RATE: "Success Rate",
  EST_DURATION: "Est. Duration",
  EST_DURATION_VALUE: "15 min",
  
  // Corrective Actions
  CORRECTIVE_ACTIONS: "Corrective Actions",
  REVIEW_CORRECT_INPUT_FORMAT: "Review and correct the input file format",
  PRIORITY_HIGH: "Priority: High",
  PRIORITY_MEDIUM: "Priority: Medium",
  PRIORITY_FINAL: "Priority: Final",
  REVIEW_CORRECT_INPUT_FORMAT_DETAIL: "Review and correct the format of the input file, particularly around line 2457.",
  VERIFY_OGG_EXTRACT_FORMAT: "Verify Oracle GoldenGate extract format",
  VERIFY_OGG_EXTRACT_FORMAT_DETAIL: "Verify the expected input format for the Oracle GoldenGate extract process.",
  CHECK_INPUT_FILE_GENERATION: "Check input file generation process",
  CHECK_INPUT_FILE_GENERATION_DETAIL: "Check if any recent changes were made to the input file generation process.",
  UPDATE_OGGEXTR1_MODULE: "Update OGGEXTR1 module",
  UPDATE_OGGEXTR1_MODULE_DETAIL: "Ensure the OGGEXTR1 module is up-to-date and compatible with the current input format.",
  RERUN_JOB_FROM_STEP1: "Rerun job from STEP1",
  RERUN_JOB_FROM_STEP1_DETAIL: "After corrections, rerun the job from STEP1.",
  
  // Explainability
  EXPLAINABILITY: "Explainability",
  EXPLAINABILITY_KEY_FACTORS: "This analysis is based on the following key factors:",
  EXPLAINABILITY_KEY_FACTOR1: "Clear identification of job name (OGGLOAD) and job ID (JOB12456) from the JES2 log",
  EXPLAINABILITY_KEY_FACTOR2: "Specific error messages indicating invalid record format and data validation error",
  EXPLAINABILITY_KEY_FACTOR3: "Abend code GG33 with reason \"DATA FORMAT ERROR ON LINE 2457\"",
  EXPLAINABILITY_KEY_FACTOR4: "Additional context from STC12345 log entries pinpointing the module and offset of the error",
  EXPLAINABILITY_KEY_FACTOR5: "The sequence of events in the log, showing normal job start followed by error and abend",
  EXPLAINABILITY_KEY_FACTOR6: "Recognition of Oracle GoldenGate-specific messages and processes",
  EXPLAINABILITY_RECOMMENDATIONS_DERIVED: "The recommendations are derived from standard troubleshooting practices for data format errors in mainframe batch jobs, particularly those involving Oracle GoldenGate extract processes.",
  
  // Action Required
  ACTION_REQUIRED: "Action Required",
  COMMENTS: "Comments",
  ENTER_YOUR_COMMENTS: "Enter your comments about the remediation action...",
  APPROVE_RECOMMENDATION: "Approve Recommendation",
  REJECT_SUGGESTION: "Reject Suggestion",
  APPROVING: "Approving...",
  REJECTING: "Rejecting...",
  
  // Audit Logs
  AUDIT_LOGS: "Audit Logs",
  ABEND_REGISTERED: "ABEND_REGISTERED",
  ABEND_NOTIFICATION_RECEIVED: "Abend notification received and processed",
  LOG_EXTRACTION_INITIATED: "LOG_EXTRACTION_INITIATED",
  LOG_EXTRACTION_JOB_TRIGGERED: "Log extraction job triggered",
  JOB_RUN_ID: "Job Run ID",
  RETRIES: "Retries",
  LOG_UPLOAD_TO_S3: "LOG_UPLOAD_TO_S3",
  ABEND_FAULT_LOG_RECEIVED: "Abend Fault Log received",
  PREPROCESSING_LOG_FILE: "PREPROCESSING_LOG_FILE",
  PREPARING_LOG_FILE_FOR_AI_ANALYSIS: "Preparing log file for AI Analysis",
  AI_ANALYSIS_INITIATED: "AI_ANALYSIS_INITIATED",
  AI_ANALYSIS_STARTED: "AI analysis started",
  AI_REMEDIATION_SUGGESTIONS_GENERATED: "AI remediation suggestions generated",
  PENDING_MANUAL_APPROVAL: "PENDING_MANUAL_APPROVAL",
  WAITING_FOR_MANUAL_APPROVAL: "Waiting for manual approval",
  ABEND_SUCCESSFULLY_RESOLVED: "Abend successfully resolved",
  DURATION: "Duration",
  VERIFICATION: "Verification",
  COMPLETED: "completed",
  
  // Job Logs
  JOB_LOGS: "Job Logs",
  DATA_VALUE: "Data Value",
  SOURCE_LINE_START: "Source (Starting at Line #",
  TFILM: "TFILM",
  TFILG: "TFILG",
  AUDIT_DB_REC_MEM: "AUDIT-DB-REC-MEM",
  AUDIT_DB_REC_GRP: "AUDIT-DB-REC-GRP",
  WORKING_STORAGE_SECTION: "============================== WORKING STORAGE SECTION ==============================",
  DIR_STATS_PICTURE: "DIR-STATS PICTURE",
  FILLER: "FILLER",
  WORKING_STORAGE_STARTS_HERE: "WORKING STORAGE STARTS HERE",
  STORAGE_STARTS: "STORAGE STARTS",
  LAST_PARAGRAPH: "LAST-PARAGRAPH",
  GLOBAL: "GLOBAL",
  VALUE: "VALUE",
  LAST_PARA: "LAST-PARA",
  MISCELLANEOUS: "MISCELLANEOUS",
  ALL_NINES: "ALL-NINES",
  NINES_COMP_EFF_DTE: "NINES-COMP-EFF-DTE",
  NINES_COMP_EFF_TIME: "NINES-COMP-EFF-TIME",
  WS_CURRENT_DATE: "WS-CURRENT-DATE",
  WS_CURRENT_DATE_1: "WS-CURRENT-DATE-1",
  WS_UPDT_DATE_KEY: "WS-UPDT-DATE-KEY",
  WS_NINES: "WS-NINES",
  WS_ONE: "WS-ONE",
  WS_SYS_TIME: "WS-SYS-TIME",
  WS_PFX: "WS-PFX",
  WS_SEGMENT_END_SW: "WS-SEGMENT-END-SW",
  WS_CHILG_SEG: "WS-CHILG-SEG",
  WS_AUDIT_GRP_REC: "WS-AUDIT-GRP-REC",
  WS_IMMAUDR_GRP: "WS-IMMAUDR-GRP",
  WS_IMMAUDE_GRP: "WS-IMMAUDE-GRP",
  WS_AUDIT_MEM_REC: "WS-AUDIT-MEM-REC",
  WS_IMMAUDR_MEM: "WS-IMMAUDR-MEM",
  WS_IMMAUDS_MEM: "WS-IMMAUDS-MEM",
  PROGRAM_EXECUTION_TRACE: "============================== PROGRAM EXECUTION TRACE ==============================",
  JOB: "JOB",
  EXECUTION_LOG: "EXECUTION LOG:",
  PROGRAM_START: "PROGRAM START",
  COBOL_AUDIT_PROCESSING_MODULE: "COBOL AUDIT PROCESSING MODULE",
  WORKING_STORAGE_INITIALIZED: "WORKING STORAGE INITIALIZED",
  DATABASE_CONNECTION_ESTABLISHED: "DATABASE CONNECTION ESTABLISHED",
  READING_AUDIT_RECORDS_FROM_TFILM_FILE: "READING AUDIT RECORDS FROM TFILM FILE",
  PROCESSING_RECORD: "PROCESSING RECORD",
  MEMBER_AUDIT_DATA: "MEMBER AUDIT DATA",
  GROUP_AUDIT_DATA: "GROUP AUDIT DATA",
  DATA_VALIDATION_CHECKS_STARTED: "DATA VALIDATION CHECKS STARTED",
  ABEND_CODE: "ABEND CODE",
  DETECTED_AT_OFFSET: "DETECTED AT OFFSET",
  INVALID_DATA_FORMAT_IN_PACKED_DECIMAL_FIELD: "INVALID DATA FORMAT IN PACKED DECIMAL FIELD",
  PROGRAM_TERMINATED_ABNORMALLY: "PROGRAM TERMINATED ABNORMALLY",
  CORE_DUMP_GENERATED: "CORE DUMP GENERATED",
  JOB_ENDED_WITH_COMPLETION_CODE: "JOB ENDED WITH COMPLETION CODE",
  MEMORY_DUMP: "============================== MEMORY DUMP ==============================",
  STORAGE_AROUND_FAILING_INSTRUCTION: "Storage around failing instruction:",
  WORKING_STORAGE_VARIABLES_AT_TIME_OF_ABEND: "Working Storage Variables at time of abend:",
  ERROR_ANALYSIS: "============================== ERROR ANALYSIS ==============================",
  ERROR_TYPE: "Error Type",
  DATA_EXCEPTION: "Data Exception",
  LOCATION: "Location",
  MODULE: "Module",
  OFFSET: "Offset",
  CAUSE: "Cause",
  INVALID_PACKED_DECIMAL_DATA_IN_AUDIT_RECORD_PROCESSING: "Invalid packed decimal data in audit record processing",
  RECOMMENDATION: "Recommendation",
  REVIEW_INPUT_DATA_FORMAT_AND_FIELD_DEFINITIONS: "Review input data format and field definitions",
  
  // AI Insights Panel
  AI_SYSTEM_PERFORMANCE: "AI System Performance",
  AUTOMATION_SUCCESS_RATE: "Automation Success Rate",
  PREDICTION_ACCURACY: "Prediction Accuracy",
  FASTER_RESOLUTION: "Faster Resolution",
  
  // AI Insights Tabs
  AI_INSIGHTS_TAB: "AI Insights",
  PREDICTIONS_TAB: "Predictions",
  PATTERNS_TAB: "Patterns",
  RECOMMENDATIONS_TAB: "Recommendations",
  
  // AI Insights Content
  HIGH_PRIORITY_ALERT: "High Priority Alert:",
  UNUSUAL_SPIKE_ALERT: "Unusual spike in S0C4 abends detected in CLAIMS_BATCH jobs. Pattern suggests memory corruption in dataset processing module.",
  TRENDING_ISSUES: "Trending Issues",
  RESOLUTION_SUCCESS: "Resolution Success",
  PREDICTIVE_ANALYTICS: "Predictive Analytics",
  PATTERN_RECOGNITION: "Pattern Recognition",
  AI_RECOMMENDATIONS: "AI Recommendations",
  
  // Trending Issues
  SOC4_MEMORY_VIOLATIONS: "S0C4 Memory Violations",
  DATASET_SIZE_OVERFLOW: "Dataset Size Overflow",
  JCL_PARAMETER_ISSUES: "JCL Parameter Issues",
  
  // Resolution Success Metrics
  AUTOMATED_FIXES: "Automated Fixes",
  AUTOMATED_FIXES_COUNT: "156 today",
  AVG_RESOLUTION_TIME: "Avg Resolution Time",
  AVG_RESOLUTION_TIME_VALUE: "12.3 minutes",
  MANUAL_INTERVENTIONS: "Manual Interventions",
  MANUAL_INTERVENTIONS_COUNT: "23 today",
  
  // Predictive Analytics
  BILLING_RECONCILE_JOB: "BILLING_RECONCILE Job",
  BILLING_RECONCILE_PREDICTION: "Likely to fail within 2 hours",
  MEMBER_SYNC_NIGHTLY: "MEMBER_SYNC_NIGHTLY",
  MEMBER_SYNC_PREDICTION: "Increased runtime expected",
  CLAIMS_EXPORT_WEEKLY: "CLAIMS_EXPORT_WEEKLY",
  CLAIMS_EXPORT_PREDICTION: "Resource contention likely",
  RISK_85_PERCENT: "85% Risk",
  RISK_62_PERCENT: "62% Risk",
  RISK_34_PERCENT: "34% Risk",
  
  // Pattern Recognition
  MEMORY_LEAK_PATTERN: "Memory Leak Pattern Detected",
  MEMORY_LEAK_DESCRIPTION: "Jobs starting with \"CLAIMS_\" showing progressive memory usage increase",
  TIMING_CORRELATION: "Timing Correlation",
  TIMING_CORRELATION_DESCRIPTION: "Abends peak during 8-10 AM window correlating with peak data volume",
  DEPENDENCY_CHAIN_IMPACT: "Dependency Chain Impact",
  DEPENDENCY_CHAIN_DESCRIPTION: "Upstream job failures causing cascading effects in 3+ downstream processes",
  OCCURRENCES_12: "12 occurrences",
  LAST_24H: "Last 24h",
  STATISTICAL_SIGNIFICANCE: "Statistical significance: 89%",
  IMPACT_SCORE_HIGH: "Impact score: High",
  
  // AI Recommendations
  IMMEDIATE_ACTION_REQUIRED: "Immediate Action Required",
  INCREASE_MEMORY_ALLOCATION: "Increase memory allocation for CLAIMS_BATCH_DAILY from 512MB to 1GB",
  OPTIMIZATION_OPPORTUNITY: "Optimization Opportunity",
  SCHEDULE_OFF_PEAK: "Schedule MEMBER_UPDATE_JOB during off-peak hours (2-4 AM)",
  PREVENTIVE_MEASURE: "Preventive Measure",
  ADD_CHECKPOINT_RESTART: "Add checkpoint restart capability to long-running BILLING_RECONCILE job",
  CONFIDENCE_96_PERCENT: "96% Confidence",
  CONFIDENCE_78_PERCENT: "78% Confidence",
  CONFIDENCE_65_PERCENT: "65% Confidence",
  
  // Action Buttons
  APPLY_RECOMMENDATION: "Apply Recommendation",
  SCHEDULE_CHANGE: "Schedule Change",
  PLAN_IMPLEMENTATION: "Plan Implementation",
  
  // Status Labels
  ABEND_DETECTED_LABEL: "Abend Detected",
  REMEDIATION_SUGGESTIONS_GENERATED_LABEL: "Remediation Suggestions Generated",
  PENDING_MANUAL_APPROVAL_LABEL: "Pending Manual Approval",
  RESOLVED_LABEL: "Resolved",
  
  // Priority Labels
  PRIORITY_HIGH_LABEL: "High",
  PRIORITY_MEDIUM_LABEL: "Medium",
  PRIORITY_LOW_LABEL: "Low",
  
  // NotFound Page
  NOT_FOUND_404: "404",
  PAGE_NOT_FOUND: "Oops! Page not found",
  RETURN_TO_HOME: "Return to Home",
  
  // Default User
  DEFAULT_USER_NAME: "John Smith",
  DEFAULT_USER_ROLE: "System Administrator",
  
  // Application Constants
  MOBILE_BREAKPOINT: 768,
  PAGINATION_DEFAULT_SIZE: 5,
  
  // Tab Values
  TAB_OVERVIEW: "overview",
  TAB_AI_DIAGNOSTICS: "ai-diagnostics",
  TAB_REMEDIATION: "remediation",
  TAB_SYSTEM_LOGS: "system-logs",
  TAB_JOB_LOGS: "job-logs",
  TAB_ABENDS: "abends",
  TAB_ANALYTICS: "analytics",
  TAB_INSIGHTS: "insights",
  TAB_PREDICTIONS: "predictions",
  TAB_PATTERNS: "patterns",
  TAB_RECOMMENDATIONS: "recommendations",
  
  // Tab Labels
  TAB_OVERVIEW_LABEL: "Overview",
  TAB_AI_DIAGNOSTICS_LABEL: "AI Diagnostics",
  TAB_REMEDIATION_LABEL: "Remediation",
  TAB_SYSTEM_LOGS_LABEL: "Audit Logs",
  TAB_JOB_LOGS_LABEL: "Job Logs",
  TAB_ABENDS_LABEL: "Abends",
  TAB_ANALYTICS_LABEL: "Analytics",
  
  // Table Headers
  TABLE_JOB_NAME: "Job Name",
  TABLE_JOB_ID: "Job ID",
  TABLE_TYPE: "Type",
  TABLE_STATUS: "Job Status",
  TABLE_TIMESTAMP: "Timestamp",
  TABLE_AI_CONFIDENCE: "AI Confidence",
  TABLE_ASSIGNED_TO: "Assigned To",
  TABLE_PRIORITY: "Priority",
  TABLE_DOMAIN_AREA: "Domain Area", 
  TABLE_ACTIONS: "Actions",
  
  // Status Values
  STATUS_RESOLVED: "resolved",
  STATUS_PENDING_MANUAL_APPROVAL: "PENDING_MANUAL_APPROVAL",
  STATUS_DETECTED: "DETECTED",
  STATUS_RESOLVED_CAPS: "RESOLVED",
  STATUS_AI_ANALYSIS: "AI_ANALYSIS",
  STATUS_OPERATIONAL: "operational",
  STATUS_ABEND_DETECTED: "ABEND_DETECTED",
  STATUS_REMEDIATION_SUGGESTIONS_GENERATED: "REMEDIATION_SUGGESTIONS_GENERATED",
  STATUS_MANUAL_ANALYSIS_REQUIRED: "MANUAL_ANALYSIS_REQUIRED",
  
  // Filter Values
  FILTER_ALL: "all",
  FILTER_ACTIVE: "active",
  FILTER_ALL_STATUSES: "All Statuses",
  FILTER_ALL_PRIORITIES: "All Priorities",
  FILTER_ALL_DOMAINS: "All Domains",
  FILTER_BY_STATUS: "Filter by job status",
  SEARCH_BY_JOB_NAME: "Search by job name",
  PICK_A_DATE: "Pick a date",
  NO_ABENDS_FOUND: "No abends found matching your search criteria.",
  SHOWING: "Showing",
  OF: "of",
  RESULTS: "results",
  ROWS_PER_PAGE: "Rows per page:",
  PAGE: "Page",
  
  // System Values
  NOW: "now",
  SEC_AGO: "sec ago",
  
  // Button Labels
  VIEW_DETAILS: "View Details",
  CLEAR_FILTERS: "Clear Filters",
  TOGGLE_SIDEBAR: "Toggle Sidebar",
  
  // Aria Labels
  ARIA_TOGGLE_SIDEBAR: "Toggle Sidebar",
  ARIA_BREADCRUMB: "breadcrumb",
  
  // Placeholders
  PLACEHOLDER_PRIORITY: "Priority",
  PLACEHOLDER_STATUS: "Job Status",
  PLACEHOLDER_DOMAIN: "Domain Area", // Added for domain area filter
  
  // Dialog Content
  DIALOG_MAX_WIDTH: "max-w-6xl",
  DIALOG_MAX_HEIGHT: "max-h-[90vh]",
  DIALOG_OVERFLOW: "overflow-y-auto",
  
  // CSS Classes
  CLASS_FONT_MONO: "font-mono",
  CLASS_TEXT_SM: "text-sm",
  CLASS_FONT_MEDIUM: "font-medium",
  CLASS_FONT_BOLD: "font-bold",
  CLASS_TEXT_MUTED_FOREGROUND: "text-muted-foreground",
  
  // Accordion Values
  ACCORDION_AI_ACTIONS: "ai-actions",
  
  // Component Display Names
  CARD_DISPLAY_NAME: "Card",
  CARD_HEADER_DISPLAY_NAME: "CardHeader",
  CARD_TITLE_DISPLAY_NAME: "CardTitle",
  CARD_DESCRIPTION_DISPLAY_NAME: "CardDescription",
  CARD_CONTENT_DISPLAY_NAME: "CardContent",
  CARD_FOOTER_DISPLAY_NAME: "CardFooter",
  
  // Default Tab
  DEFAULT_TAB: "overview",
  
  // Button Variants
  VARIANT_OUTLINE: "outline",
  VARIANT_GHOST: "ghost",
  VARIANT_SECONDARY: "secondary",
  VARIANT_DESTRUCTIVE: "destructive",
  VARIANT_DEFAULT: "default",
  
  // Badge Variants
  BADGE_OUTLINE: "outline",
  BADGE_SECONDARY: "secondary",
  BADGE_DESTRUCTIVE: "destructive",
  BADGE_DEFAULT: "default",
  
  // Button Sizes
  SIZE_SM: "sm",
  SIZE_DEFAULT: "default",
  
  // Date Formats
  DATE_LOCALE_STRING: "toLocaleString",
  
  // Object Keys
  KEY_JOB_NAME: "jobName",
  KEY_JOB_ID: "jobId",
  KEY_ABEND_TYPE: "abendType",
  KEY_STATUS: "status",
  KEY_TIMESTAMP: "timestamp",
  KEY_CONFIDENCE: "confidence",
  KEY_ASSIGNED_TO: "assignedTo",
  KEY_PRIORITY: "priority",
  KEY_DOMAIN: "domain", // Added for domain area column
  
  // Filter Functions
  FILTER_INCLUDES_STRING: "includesString",
  
  // Calendar/Popover
  POPOVER_ALIGN_START: "start",
  CALENDAR_MODE_RANGE: "range",
  
  // HTML Elements
  ELEMENT_BUTTON: "button",
  ELEMENT_NAV: "nav",
  ELEMENT_OL: "ol",
  ELEMENT_LI: "li",
  ELEMENT_SPAN: "span",
  
  // ARIA Roles
  ROLE_LINK: "link",
  ROLE_PRESENTATION: "presentation",
  ROLE_ALERT: "alert",
  
  // ARIA States
  ARIA_DISABLED_TRUE: "true",
  ARIA_CURRENT_PAGE: "page",
  ARIA_HIDDEN_TRUE: "true",
  
  // CSS Values
  COLOR_GREEN: "green",
  COLOR_AMBER: "amber",
  COLOR_RED: "red",
  
  // Grid Columns
  GRID_COLS_5: "grid-cols-5",
  
  // Spacing
  SPACE_Y_6: "space-y-6",
  SPACE_Y_4: "space-y-4",
  SPACE_Y_3: "space-y-3",
  
  // Flex
  FLEX_ITEMS_CENTER: "flex items-center",
  FLEX_JUSTIFY_BETWEEN: "flex justify-between",
  
  // Background Colors
  BG_GRAY_50: "bg-gray-50",
  BG_BLUE_50: "bg-blue-50",
  BG_GREEN_50: "bg-green-50",
  BG_YELLOW_50: "bg-yellow-50",
  BG_RED_50: "bg-red-50",
  BG_AMBER_50: "bg-amber-50",
  
  // Text Colors
  TEXT_GRAY_500: "text-gray-500",
  TEXT_GRAY_600: "text-gray-600",
  TEXT_GRAY_700: "text-gray-700",
  TEXT_GRAY_800: "text-gray-800",
  TEXT_GRAY_900: "text-gray-900",
  TEXT_BLUE_600: "text-blue-600",
  TEXT_BLUE_800: "text-blue-800",
  TEXT_BLUE_900: "text-blue-900",
  TEXT_GREEN_600: "text-green-600",
  TEXT_GREEN_800: "text-green-800",
  TEXT_YELLOW_600: "text-yellow-600",
  TEXT_YELLOW_800: "text-yellow-800",
  TEXT_RED_600: "text-red-600",
  TEXT_RED_800: "text-red-800",
  TEXT_AMBER_600: "text-amber-600",
  
  // Border Colors
  BORDER_ROUNDED_LG: "border rounded-lg",
  ROUNDED_LG: "rounded-lg",
  
  // Padding
  P_3: "p-3",
  P_4: "p-4",
  
  // Margin
  MT_1: "mt-1",
  MT_2: "mt-2",
  MT_6: "mt-6",
  
  // Width
  W_FULL: "w-full",
  W_AUTO: "w-auto",
  
  // Height
  H_4: "h-4",
  H_5: "h-5",
  H_8: "h-8",
  
  // Position
  RELATIVE: "relative",
  
  // Display
  HIDDEN: "hidden",
  
  // Transitions
  TRANSITION_COLORS: "transition-colors",
  
  // Domain Area Values
  DOMAIN_MM: "MM",
  DOMAIN_CM: "CM",
  DOMAIN_SCLC: "SCLC",
  DOMAIN_WDS: "WDS",
  DOMAIN_CIW: "CIW",
  DOMAIN_AREA_FILTER_LABEL: "Domain Area",
  
  // Modal Titles
  AI_ANALYSIS_TITLE: "AI Analysis",
  LOG_EXTRACTION_ERROR_LABEL: "Log Extraction Error",
  AI_ANALYSIS_INITIATED_LABEL: "AI Analysis Initiated",
  AUTOMATED_REMEDIATION_IN_PROGRESS_LABEL: "Automated Remediation In Progress",
  REMEDIATION_ERROR_LABEL: "Remediation Error",
  VERIFICATION_IN_PROGRESS_LABEL: "Verification In Progress",
  RESOLVED_WITH_WORKAROUND_LABEL: "Resolved with Workaround",
};

// Export individual text groups for easier imports
export const UI_TEXTS = {
  BUTTONS: {
    REFRESH: STATIC_TEXTS.REFRESH,
    DOWNLOAD: STATIC_TEXTS.DOWNLOAD,
    EXPORT: STATIC_TEXTS.EXPORT,
    APPROVE: STATIC_TEXTS.APPROVE,
    REJECT: STATIC_TEXTS.REJECT,
    CLOSE: STATIC_TEXTS.CLOSE,
  },
  NAVIGATION: {
    OVERVIEW: STATIC_TEXTS.OVERVIEW,
    ABENDS: STATIC_TEXTS.ABENDS,
    AI_INSIGHTS: STATIC_TEXTS.AI_INSIGHTS,
    ANALYTICS: STATIC_TEXTS.ANALYTICS,
  },
  STATUS: {
    ACTIVE_ABENDS: STATIC_TEXTS.ACTIVE_ABENDS,
    PENDING_APPROVAL: STATIC_TEXTS.PENDING_APPROVAL,
    RESOLVED: STATIC_TEXTS.RESOLVED,
    AUTOMATION_RATE: STATIC_TEXTS.AUTOMATION_RATE,
  },
};

export default STATIC_TEXTS; 