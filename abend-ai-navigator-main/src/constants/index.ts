import {
  CheckCircle,
  Clock,
  Zap,
  Target,
  Shield,
  AlertTriangle,
  XCircle
} from "lucide-react";
import styles from "@/components/AIInsightsPanel.module.css";

// Types and Interfaces
export interface Abend {
  id: string;
  jobName: string;
  jobId: string;
  abendType: string;
  status: "ABEND_DETECTED" | "REMEDIATION_SUGGESTIONS_GENERATED" | "PENDING_MANUAL_APPROVAL" | "MANUAL_ANALYSIS_REQUIRED" | "resolved";
  duration: string;
  confidence: number;
  assignedTo: string;
  priority: "high" | "medium" | "low";
  timestamp: string;
}

export interface Metric {
  title: string;
  value: string;
  target: string;
  progress: number;
  status: "good" | "warning" | "critical";
  color: "green" | "amber" | "red";
  icon: any;
}

export interface ConfidenceItem {
  label: string;
  range: string;
  value: number;
  containerClass: string;
  textColor: string;
  iconClass: string;
  badgeClass: string;
  progressClass: string;
  icon: any;
  description: string;
}

// Status Configuration for AbendTable
export const ABEND_STATUS_CONFIG = {
  "ABEND_DETECTED": { label: "Abend Detected", variant: "destructive" as const },
  "REMEDIATION_SUGGESTIONS_GENERATED": { label: "Remediation Suggestions Generated", variant: "secondary" as const },
  "PENDING_MANUAL_APPROVAL": { label: "Pending Manual Approval", variant: "outline" as const },
  "MANUAL_ANALYSIS_REQUIRED": { label: "Manual Analysis Required", variant: "secondary" as const },
  "resolved": { label: "Resolved", variant: "default" as const },
};

// Priority Configuration for AbendTable
export const PRIORITY_CONFIG = {
  high: { label: "High", className: "text-error" },
  medium: { label: "Medium", className: "text-warning-foreground" },
  low: { label: "Low", className: "text-muted-foreground" },
};

// Status Configuration for StatusCard
export const STATUS_CARD_CONFIG = {
  critical: {
    cardClass: "cardCritical",
    textClass: "textCritical", 
    iconClass: "iconCritical",
    badgeVariant: "destructive" as const,
  },
  warning: {
    cardClass: "cardWarning",
    textClass: "textWarning",
    iconClass: "iconWarning", 
    badgeVariant: "secondary" as const,
  },
  success: {
    cardClass: "cardSuccess",
    textClass: "textSuccess",
    iconClass: "iconSuccess",
    badgeVariant: "default" as const,
  },
  info: {
    cardClass: "cardInfo",
    textClass: "textInfo",
    iconClass: "iconInfo",
    badgeVariant: "outline" as const,
  },
};

// Mock Abends Data
export const MOCK_ABENDS: Abend[] = [
  {
    id: "ABD-2024-001",
    jobName: "WGMP110D",
    jobId: "IYM98ID",
    abendType: "SOC4",
    status: "ABEND_DETECTED",
    duration: "2h 15m",
    confidence: 94,
    assignedTo: "AI System",
    priority: "high",
    timestamp: "2024-12-19 14:30:00",
  },
  {
    id: "ABD-2024-002", 
    jobName: "WGMB230A",
    jobId: "JOB45QW",
    abendType: "SOC7",
    status: "REMEDIATION_SUGGESTIONS_GENERATED",
    duration: "1h 45m",
    confidence: 87,
    assignedTo: "John Smith",
    priority: "medium",
    timestamp: "2024-12-19 12:30:00",
  },
  {
    id: "ABD-2024-003",
    jobName: "WGPF150C",
    jobId: "PRT82XY",
    abendType: "GG",
    status: "PENDING_MANUAL_APPROVAL",
    duration: "45m",
    confidence: 96,
    assignedTo: "AI System",
    priority: "high",
    timestamp: "2024-12-19 13:30:00",
  },
  {
    id: "ABD-2024-004",
    jobName: "WGDT180B",
    jobId: "DAT67MN",
    abendType: "EFX",
    status: "resolved",
    duration: "3h 20m",
    confidence: 91,
    assignedTo: "Sarah Johnson", 
    priority: "low",
    timestamp: "2024-07-03 06:45:00",
  },
  {
    id: "ABD-2024-005",
    jobName: "WGPR090E",
    jobId: "PRO34KL",
    abendType: "SOC4",
    status: "MANUAL_ANALYSIS_REQUIRED",
    duration: "1h 30m",
    confidence: 88,
    assignedTo: "Mike Chen",
    priority: "medium",
    timestamp: "2024-12-19 14:00:00",
  },
  {
    id: "ABD-2024-006",
    jobName: "WGBK340F",
    jobId: "BKP91ZA",
    abendType: "EFX",
    status: "resolved",
    duration: "15m",
    confidence: 99,
    assignedTo: "AI System",
    priority: "low",
    timestamp: "2024-07-03 12:00:00",
  },
  {
    id: "ABD-2024-007",
    jobName: "WGIN270G",
    jobId: "INC56VB",
    abendType: "SOC4",
    status: "ABEND_DETECTED",
    duration: "45m",
    confidence: 85,
    assignedTo: "AI System",
    priority: "medium",
    timestamp: "2024-07-03 13:00:00",
  },
  {
    id: "ABD-2024-008",
    jobName: "WGRP120H",
    jobId: "RPT24CD",
    abendType: "SOC7",
    status: "resolved",
    duration: "20m",
    confidence: 92,
    assignedTo: "Sarah Johnson",
    priority: "low",
    timestamp: "2024-07-03 14:00:00",
  },
  {
    id: "ABD-2024-009",
    jobName: "WGUA250J",
    jobId: "UPD73EF",
    abendType: "GG",
    status: "REMEDIATION_SUGGESTIONS_GENERATED",
    duration: "1h 10m",
    confidence: 78,
    assignedTo: "Mike Chen",
    priority: "high",
    timestamp: "2024-07-03 15:00:00",
  },
  {
    id: "ABD-2024-010",
    jobName: "WGBC080K",
    jobId: "BAT18GH",
    abendType: "EFX",
    status: "PENDING_MANUAL_APPROVAL",
    duration: "30m",
    confidence: 95,
    assignedTo: "AI System",
    priority: "low",
    timestamp: "2024-07-03 16:00:00",
  },
];

// Performance Metrics Data
export const PERFORMANCE_METRICS: Metric[] = [
  {
    title: "Response Time",
    value: "1.2s",
    target: "< 2s",
    progress: 85,
    status: "good",
    color: "green",
    icon: Clock
  },
  {
    title: "Automation Rate",
    value: "87%",
    target: "90%",
    progress: 87,
    status: "warning",
    color: "amber",
    icon: Zap
  },
  {
    title: "Resolution Accuracy",
    value: "94%",
    target: "95%",
    progress: 94,
    status: "good",
    color: "green",
    icon: Target
  },
  {
    title: "SLA Compliance",
    value: "92%",
    target: "98%",
    progress: 92,
    status: "warning",
    color: "amber",
    icon: CheckCircle
  }
];

// AI Confidence Distribution Data
export const CONFIDENCE_DATA: ConfidenceItem[] = [
  {
    label: "High Confidence",
    range: "85-100%", 
    value: 68,
    containerClass: styles.confidenceHigh,
    textColor: styles.textGreen,
    iconClass: styles.iconGreen,
    badgeClass: styles.badgeBgGreen,
    progressClass: styles.progressGreen,
    icon: CheckCircle,
    description: "AI can automatically resolve these abends with high accuracy"
  },
  {
    label: "Medium Confidence", 
    range: "60-84%",
    value: 22,
    containerClass: styles.confidenceMedium,
    textColor: styles.textAmber,
    iconClass: styles.iconAmber,
    badgeClass: styles.badgeBgAmber,
    progressClass: styles.progressAmber,
    icon: Shield,
    description: "Requires human approval before implementing AI recommendations"
  },
  {
    label: "Low Confidence",
    range: "40-59%",
    value: 7,
    containerClass: styles.confidenceLow,
    textColor: styles.textOrange,
    iconClass: styles.iconOrange,
    badgeClass: styles.badgeBgOrange,
    progressClass: styles.progressRed,
    icon: AlertTriangle,
    description: "Manual investigation needed with AI providing supporting analysis"
  },
  {
    label: "No Confidence",
    range: "0-39%",
    value: 3,
    containerClass: styles.confidenceNone,
    textColor: styles.textRed,
    iconClass: styles.iconRed,
    badgeClass: styles.badgeBgRed,
    progressClass: styles.progressRed,
    icon: XCircle,
    description: "Completely manual resolution required, unknown abend patterns"
  }
];

// Total Abends Count
export const TOTAL_ABENDS = 156;

// Application Constants
export const APP_CONFIG = {
  MOBILE_BREAKPOINT: 768,
  PAGINATION_DEFAULT_SIZE: 5,
  DEFAULT_USER: {
    name: "John Smith",
    role: "System Administrator"
  }
} as const;

// Elevance Health Brand Constants
export const ELEVANCE_BRAND = {
  COLORS: {
    NAVY: 'hsl(213 87% 23%)',
    NAVY_LIGHT: 'hsl(213 67% 35%)',
    NAVY_LIGHTER: 'hsl(213 47% 55%)',
    WHITE: 'hsl(0 0% 100%)',
    GREY_LIGHT: 'hsl(210 20% 96%)',
  },
  FONTS: {
    DISPLAY: 'Source Sans Pro',
    BODY: 'Inter',
  }
} as const; 