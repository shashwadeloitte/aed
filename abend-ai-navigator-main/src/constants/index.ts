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


export interface Abend {
  id: string;
  jobName: string;
  jobId: string;
  abendType: string;
  jobStatus: string;
  severity: string;
  assignedTo: string;
  timestamp: string;
  domain?: string;
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
  "LOG_EXTRACTION_ERROR": { label: STATIC_TEXTS.LOG_EXTRACTION_ERROR_LABEL, variant: "destructive" as const },
  "AI_ANALYSIS_INITIATED": { label: STATIC_TEXTS.AI_ANALYSIS_INITIATED_LABEL, variant: "secondary" as const },
  "REMEDIATION_SUGGESTIONS_GENERATED": { label: STATIC_TEXTS.REMEDIATION_SUGGESTIONS_GENERATED_LABEL, variant: "secondary" as const },
  "PENDING_MANUAL_APPROVAL": { label: STATIC_TEXTS.PENDING_MANUAL_APPROVAL_LABEL, variant: "outline" as const },
  "AUTOMATED_REMEDIATION_IN_PROGRESS": { label: STATIC_TEXTS.AUTOMATED_REMEDIATION_IN_PROGRESS_LABEL, variant: "secondary" as const },
  "REMEDIATION_ERROR": { label: STATIC_TEXTS.REMEDIATION_ERROR_LABEL, variant: "destructive" as const },
  "VERIFICATION_IN_PROGRESS": { label: STATIC_TEXTS.VERIFICATION_IN_PROGRESS_LABEL, variant: "secondary" as const },
  "RESOLVED": { label: STATIC_TEXTS.RESOLVED_LABEL, variant: "default" as const },
  "RESOLVED_WITH_WORKAROUND": { label: STATIC_TEXTS.RESOLVED_WITH_WORKAROUND_LABEL, variant: "default" as const },
};

// Priority Configuration for AbendTable
export const PRIORITY_CONFIG = {
  high: { label: STATIC_TEXTS.PRIORITY_HIGH_LABEL, className: "text-red-600 font-semibold" },
  medium: { label: STATIC_TEXTS.PRIORITY_MEDIUM_LABEL, className: "text-yellow-600 font-semibold" },
  low: { label: STATIC_TEXTS.PRIORITY_LOW_LABEL, className: "text-green-600 font-semibold" },
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