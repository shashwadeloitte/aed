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
import { STATIC_TEXTS } from "@/constants/staticTexts";

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
  "ABEND_DETECTED": { label: STATIC_TEXTS.ABEND_DETECTED_LABEL, variant: "destructive" as const },
  "REMEDIATION_SUGGESTIONS_GENERATED": { label: STATIC_TEXTS.REMEDIATION_SUGGESTIONS_GENERATED_LABEL, variant: "secondary" as const },
  "PENDING_MANUAL_APPROVAL": { label: STATIC_TEXTS.PENDING_MANUAL_APPROVAL_LABEL, variant: "outline" as const },
  "MANUAL_ANALYSIS_REQUIRED": { label: STATIC_TEXTS.MANUAL_ANALYSIS_REQUIRED, variant: "secondary" as const },
  "resolved": { label: STATIC_TEXTS.RESOLVED_LABEL, variant: "default" as const },
};

// Priority Configuration for AbendTable
export const PRIORITY_CONFIG = {
  high: { label: STATIC_TEXTS.PRIORITY_HIGH_LABEL, className: "text-error" },
  medium: { label: STATIC_TEXTS.PRIORITY_MEDIUM_LABEL, className: "text-warning-foreground" },
  low: { label: STATIC_TEXTS.PRIORITY_LOW_LABEL, className: "text-muted-foreground" },
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
    title: STATIC_TEXTS.RESPONSE_TIME,
    value: "1.2s",
    target: "< 2s",
    progress: 85,
    status: "good",
    color: "green",
    icon: Clock
  },
  {
    title: STATIC_TEXTS.AUTOMATION_RATE_METRIC,
    value: "87%",
    target: "90%",
    progress: 87,
    status: "warning",
    color: "amber",
    icon: Zap
  },
  {
    title: STATIC_TEXTS.RESOLUTION_ACCURACY,
    value: "94%",
    target: "95%",
    progress: 94,
    status: "good",
    color: "green",
    icon: Target
  },
  {
    title: STATIC_TEXTS.SLA_COMPLIANCE,
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
    label: STATIC_TEXTS.HIGH_CONFIDENCE,
    range: STATIC_TEXTS.HIGH_CONFIDENCE_RANGE, 
    value: 68,
    containerClass: styles.confidenceHigh,
    textColor: styles.textGreen,
    iconClass: styles.iconGreen,
    badgeClass: styles.badgeBgGreen,
    progressClass: styles.progressGreen,
    icon: CheckCircle,
    description: STATIC_TEXTS.HIGH_CONFIDENCE_DESC
  },
  {
    label: STATIC_TEXTS.MEDIUM_CONFIDENCE, 
    range: STATIC_TEXTS.MEDIUM_CONFIDENCE_RANGE,
    value: 22,
    containerClass: styles.confidenceMedium,
    textColor: styles.textAmber,
    iconClass: styles.iconAmber,
    badgeClass: styles.badgeBgAmber,
    progressClass: styles.progressAmber,
    icon: Shield,
    description: STATIC_TEXTS.MEDIUM_CONFIDENCE_DESC
  },
  {
    label: STATIC_TEXTS.LOW_CONFIDENCE,
    range: STATIC_TEXTS.LOW_CONFIDENCE_RANGE,
    value: 7,
    containerClass: styles.confidenceLow,
    textColor: styles.textOrange,
    iconClass: styles.iconOrange,
    badgeClass: styles.badgeBgOrange,
    progressClass: styles.progressRed,
    icon: AlertTriangle,
    description: STATIC_TEXTS.LOW_CONFIDENCE_DESC
  },
  {
    label: STATIC_TEXTS.VERY_LOW_CONFIDENCE,
    range: STATIC_TEXTS.VERY_LOW_CONFIDENCE_RANGE,
    value: 3,
    containerClass: styles.confidenceNone,
    textColor: styles.textRed,
    iconClass: styles.iconRed,
    badgeClass: styles.badgeBgRed,
    progressClass: styles.progressRed,
    icon: XCircle,
    description: STATIC_TEXTS.VERY_LOW_CONFIDENCE_DESC
  }
];

// Total Abends Count
export const TOTAL_ABENDS = 156;

// Application Constants
export const APP_CONFIG = {
  MOBILE_BREAKPOINT: STATIC_TEXTS.MOBILE_BREAKPOINT,
  PAGINATION_DEFAULT_SIZE: STATIC_TEXTS.PAGINATION_DEFAULT_SIZE,
  DEFAULT_USER: {
    name: STATIC_TEXTS.DEFAULT_USER_NAME,
    role: STATIC_TEXTS.DEFAULT_USER_ROLE
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