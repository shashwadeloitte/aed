import { useState, useEffect } from "react";
import {
  X,
  AlertCircle,
  Brain,
  Wrench,
  CheckCircle,
  Clock,
  User,
  MapPin,
  Activity,
  Download,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  FileText,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { type Abend, ABEND_STATUS_CONFIG, PRIORITY_CONFIG } from "@/constants";
import { STATIC_TEXTS } from "@/constants/staticTexts";

interface AbendDetailModalProps {
  abend: Abend | null;
  open: boolean;
  onClose: () => void;
  defaultTab?: string;
}

export default function AbendDetailModal({
  abend,
  open,
  onClose,
  defaultTab = STATIC_TEXTS.TAB_ABENDS,
}: AbendDetailModalProps) {
  const [comments, setComments] = useState("");
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [approvePending, setApprovePending] = useState(false);
  const [rejectPending, setRejectPending] = useState(false);

  // Generate a random duration in current state between 10 and 50 minutes
  function getRandomDurationInState() {
    return Math.floor(Math.random() * 41) + 10;
  }
  const [randomDurationInState, setRandomDurationInState] = useState(
    getRandomDurationInState()
  );
  useEffect(() => {
    if (open) {
      setRandomDurationInState(getRandomDurationInState());
    }
  }, [open]);

  if (!abend) return null;

  const handleApprove = () => {
    setApprovePending(true);
    setTimeout(() => {
      setApprovePending(false);
      onClose();
    }, 1000);
  };

  const handleReject = () => {
    setRejectPending(true);
    setTimeout(() => {
      setRejectPending(false);
      onClose();
    }, 1000);
  };

  const getConfidenceLevel = (score: number) => {
    if (score >= 85)
      return { level: "High", color: "text-green-600", bgColor: "bg-green-50" };
    if (score >= 70)
      return {
        level: "Medium",
        color: "text-amber-600",
        bgColor: "bg-amber-50",
      };
    return { level: "Low", color: "text-red-600", bgColor: "bg-red-50" };
  };

  const confidence = getConfidenceLevel(abend.confidence);

  // Generate mock detailed data based on the actual abend
  const detailedAbend = {
    ...abend,
    trackingId: abend.id,
    incidentNumber: `INC-${abend.id.split("-")[2]}`,
    jobId: `JOB-${abend.id.split("-")[2]}`,
    orderId: `ORD-${abend.id.split("-")[2]}`,
    severity: abend.priority.toUpperCase(),
    currentState:
      abend.status === STATIC_TEXTS.STATUS_RESOLVED
        ? STATIC_TEXTS.STATUS_RESOLVED_CAPS
        : abend.status === STATIC_TEXTS.STATUS_PENDING_MANUAL_APPROVAL
        ? STATIC_TEXTS.STATUS_AI_ANALYSIS
        : STATIC_TEXTS.STATUS_DETECTED,
    durationInState:
      parseInt(abend.duration.split("h")[0]) * 60 +
      (abend.duration.includes("m")
        ? parseInt(abend.duration.split("m")[0].split(" ").pop() || "0")
        : 0),
    rootCause: getRootCause(abend.abendType),
    recommendedAction: getRecommendedAction(abend.abendType),
    createdAt: abend.timestamp,
  };

  function getRootCause(abendType: string): string {
    const causes = {
      S0C4: "Protection exception due to invalid memory access during data processing.",
      S0C7: "Data exception caused by invalid packed decimal data format.",
      S322: "Job time limit exceeded during batch processing window.",
      S0C1: "Operation exception due to invalid instruction sequence.",
      S222: "Job cancelled by operator or system timeout.",
    };
    return (
      causes[abendType as keyof typeof causes] ||
      "Unknown system error requiring investigation."
    );
  }

  function getRecommendedAction(abendType: string): string {
    const actions = {
      S0C4: "Restart job with increased memory allocation and validate input data integrity.",
      S0C7: "Correct data format issues in source files and restart with enhanced validation.",
      S322: "Restart job with extended time limit and optimized processing parameters.",
      S0C1: "Review job control statements and restart with corrected program logic.",
      S222: "Investigate system resources and restart during off-peak hours.",
    };
    return (
      actions[abendType as keyof typeof actions] ||
      "Perform system analysis and restart with default parameters."
    );
  }

  const workflowSteps = [
    {
      name: STATIC_TEXTS.WORKFLOW_DETECTED,
      state: STATIC_TEXTS.WORKFLOW_STATE_DETECTED,
      icon: AlertCircle,
      completed: true,
    },
    {
      name: STATIC_TEXTS.WORKFLOW_AI_ANALYSIS,
      state: STATIC_TEXTS.WORKFLOW_STATE_AI_ANALYSIS,
      icon: Brain,
      completed:
        detailedAbend.currentState !== STATIC_TEXTS.WORKFLOW_STATE_DETECTED,
    },
    {
      name: STATIC_TEXTS.WORKFLOW_REMEDIATION,
      state: STATIC_TEXTS.WORKFLOW_STATE_REMEDIATION,
      icon: Wrench,
      completed:
        detailedAbend.currentState === STATIC_TEXTS.WORKFLOW_STATE_RESOLVED,
    },
    {
      name: STATIC_TEXTS.WORKFLOW_RESOLVED,
      state: STATIC_TEXTS.WORKFLOW_STATE_RESOLVED,
      icon: CheckCircle,
      completed:
        detailedAbend.currentState === STATIC_TEXTS.WORKFLOW_STATE_RESOLVED,
    },
  ];

  // Generate a formatted Abend ID
  function getFormattedAbendId(abendId: string): string {
    // Use a hash or transformation for uniqueness, but keep it simple for now
    // Example: #ABEND#I@C718ND#<numeric part of abendId or fallback>
    const numeric = abendId.replace(/\D/g, "");
    const suffix = numeric.padEnd(10, "0").slice(0, 10);
    return `#ABEND#I@C718ND#${suffix}`;
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className={`${STATIC_TEXTS.DIALOG_MAX_WIDTH} ${STATIC_TEXTS.DIALOG_MAX_HEIGHT} ${STATIC_TEXTS.DIALOG_OVERFLOW}`}
      >
        <DialogHeader className="pb-4">
          <div>
            <DialogTitle className="text-2xl font-bold text-gray-900">
              {STATIC_TEXTS.ABEND_DETAILS}
            </DialogTitle>
            <p className="text-sm text-gray-600 mb-4">
              {STATIC_TEXTS.TRACKING_ID} {detailedAbend.trackingId}
            </p>
            <div className="text-sm text-gray-500 mb-4">
              {abend.jobName} • {STATIC_TEXTS.ORDER_ID}{" "}
              {`06${abend.id.slice(-3)}`} •{" "}
              {new Date(abend.timestamp).toLocaleString()}
            </div>
          </div>
        </DialogHeader>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className={STATIC_TEXTS.W_FULL}
        >
          <TabsList
            className={`grid ${STATIC_TEXTS.W_FULL} ${STATIC_TEXTS.GRID_COLS_5}`}
          >
            <TabsTrigger value={STATIC_TEXTS.TAB_OVERVIEW}>
              {STATIC_TEXTS.TAB_OVERVIEW_LABEL}
            </TabsTrigger>
            <TabsTrigger value={STATIC_TEXTS.TAB_AI_DIAGNOSTICS}>
              {STATIC_TEXTS.TAB_AI_DIAGNOSTICS_LABEL}
            </TabsTrigger>
            <TabsTrigger value={STATIC_TEXTS.TAB_REMEDIATION}>
              {STATIC_TEXTS.TAB_REMEDIATION_LABEL}
            </TabsTrigger>
            <TabsTrigger value={STATIC_TEXTS.TAB_SYSTEM_LOGS}>
              {STATIC_TEXTS.TAB_SYSTEM_LOGS_LABEL}
            </TabsTrigger>
            <TabsTrigger value={STATIC_TEXTS.TAB_JOB_LOGS}>
              {STATIC_TEXTS.TAB_JOB_LOGS_LABEL}
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value={STATIC_TEXTS.TAB_OVERVIEW}
            className={STATIC_TEXTS.MT_6}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertCircle className="h-5 w-5 mr-2 text-red-500" />
                    Abend Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Abend ID
                    </label>
                    <p className="text-sm font-medium">
                      {getFormattedAbendId(abend.id)}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Job Name
                    </label>
                    <p className="text-sm font-medium">{abend.jobName}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Job ID
                    </label>
                    <p className="text-sm font-medium">{abend.jobId}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Abend Type
                    </label>
                    <p className="text-sm font-medium">{abend.abendType}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      {STATIC_TEXTS.ADR_STATUS}
                    </label>
                    <Badge
                      className={cn(
                        "ml-2",
                        ABEND_STATUS_CONFIG[abend.status]?.variant === "destructive"
                          ? "bg-red-100 text-red-800"
                          : ABEND_STATUS_CONFIG[abend.status]?.variant === "outline"
                          ? "bg-yellow-100 text-yellow-800"
                          : ABEND_STATUS_CONFIG[abend.status]?.variant === "secondary"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-green-100 text-green-800"
                      )}
                    >
                      {ABEND_STATUS_CONFIG[abend.status]?.label || abend.status}
                    </Badge>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      {STATIC_TEXTS.TABLE_STATUS}
                    </label>
                    <p className="text-sm font-medium">
                      {ABEND_STATUS_CONFIG[abend.status]?.label || abend.status}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Priority
                    </label>
                    <Badge
                      className={cn(
                        "ml-2",
                        abend.priority === "high"
                          ? "bg-red-100 text-red-800"
                          : abend.priority === "medium"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                      )}
                    >
                      {PRIORITY_CONFIG[abend.priority].label}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Activity className="h-5 w-5 mr-2 text-blue-500" />
                    Workflow Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {workflowSteps.map((step, index) => {
                      const Icon = step.icon;
                      return (
                        <div
                          key={step.state}
                          className="flex items-center space-x-3"
                        >
                          <div
                            className={cn(
                              "flex h-8 w-8 items-center justify-center rounded-full",
                              step.completed ? "bg-green-100" : "bg-gray-100"
                            )}
                          >
                            <Icon
                              className={cn(
                                "h-4 w-4",
                                step.completed
                                  ? "text-green-600"
                                  : "text-gray-400"
                              )}
                            />
                          </div>
                          <div className="flex-1">
                            <p
                              className={cn(
                                "text-sm font-medium",
                                step.completed
                                  ? "text-green-600"
                                  : "text-gray-500"
                              )}
                            >
                              {step.name}
                            </p>
                            {step.state === detailedAbend.currentState && (
                              <p className="text-xs text-blue-600">
                                Current Step
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <Separator className="my-4" />
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Duration in Current State</span>
                      <span>{randomDurationInState} min</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Assigned To</span>
                      <span>{abend.assignedTo}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent
            value={STATIC_TEXTS.TAB_AI_DIAGNOSTICS}
            className={STATIC_TEXTS.MT_6}
          >
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Brain className="h-5 w-5 mr-2 text-purple-500" />
                    AI Confidence Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">
                        Confidence Score
                      </span>
                      <Badge
                        className={cn(confidence.bgColor, confidence.color)}
                      >
                        {confidence.level} ({abend.confidence}%)
                      </Badge>
                    </div>
                    <Progress value={abend.confidence} className="h-2" />
                    <p className="text-sm text-gray-600">
                      The AI system has analyzed the abend patterns and
                      historical data to provide diagnosis and remediation
                      recommendations.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{STATIC_TEXTS.AI_ANALYSIS_TITLE}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900">Job ID</h4>
                      <p className="text-sm text-gray-600 mt-1">JOB12456</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        Return Code Identified
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">GG33</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        Root Cause Summary
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Invalid record format in input file during STEP1 of job
                        OGGLOAD
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        Detailed Explanation
                      </h4>
                      <div className="text-sm text-gray-600 mt-1 space-y-2">
                        <p>
                          1. The job OGGLOAD (JOB12456) started successfully at
                          23:58:45.
                        </p>
                        <p>
                          2. STEP1 of the job began loading data into DB2 table
                          XYZ.TXN_LOG at 23:58:46.
                        </p>
                        <p>
                          3. At 23:58:50, an error was reported: "INVALID RECORD
                          FORMAT IN INPUT FILE".
                        </p>
                        <p>
                          4. This error led to job termination at 23:58:51 with
                          abend code GG33.
                        </p>
                        <p>
                          5. The abend reason is specified as "DATA FORMAT ERROR
                          ON LINE 2457".
                        </p>
                        <p>
                          6. Additional information from STC12345 confirms the
                          abend occurred in module OGGEXTR1 at offset
                          X'00001A24'.
                        </p>
                        <p>
                          7. Message OGG9999I indicates termination due to a
                          fatal input validation error.
                        </p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        IMS Status Code Interpretation
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        GG33: User abend code indicating a data format error in
                        Oracle GoldenGate processing
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent
            value={STATIC_TEXTS.TAB_REMEDIATION}
            className={STATIC_TEXTS.MT_6}
          >
            <div className="space-y-6">
              <Accordion
                type="single"
                collapsible
                className={STATIC_TEXTS.W_FULL}
              >
                <AccordionItem value={STATIC_TEXTS.ACCORDION_AI_ACTIONS}>
                  <AccordionTrigger className="text-left hover:bg-blue-50 transition-colors data-[state=open]:bg-blue-50 [&[data-state=open]>div>svg]:text-blue-600 hover:[&>div>svg]:text-blue-600">
                    <div className="flex items-center">
                      <Wrench className="h-5 w-5 mr-2 text-orange-500 transition-colors" />
                      <span className="font-medium">
                        AI Recommended Actions
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-blue-900">
                            Primary Recommendation
                          </h4>
                          <Badge className="bg-blue-100 text-blue-800">
                            Recommended
                          </Badge>
                        </div>
                        <p className="text-sm text-blue-800 mb-3">
                          Send email to operations Team to Restart the JOB from
                          the Abended State and also include the step number
                          (STEP1)
                        </p>
                        <div className="flex items-center space-x-4">
                          <div className="text-xs text-blue-600">
                            Success Rate:{" "}
                            <span className="font-medium">
                              {abend.confidence}%
                            </span>
                          </div>
                          <div className="text-xs text-blue-600">
                            Est. Duration:{" "}
                            <span className="font-medium">15 min</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-medium text-gray-900">
                          Corrective Actions
                        </h4>

                        <div className="p-4 border rounded-lg bg-gray-50">
                          <div className="space-y-3">
                            <div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">
                                  Review and correct the input file format
                                </span>
                                <div className="text-xs text-gray-500">
                                  Priority: High
                                </div>
                              </div>
                              <p className="text-xs text-gray-600 mt-1">
                                Review and correct the format of the input file,
                                particularly around line 2457.
                              </p>
                            </div>

                            <div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">
                                  Verify Oracle GoldenGate extract format
                                </span>
                                <div className="text-xs text-gray-500">
                                  Priority: High
                                </div>
                              </div>
                              <p className="text-xs text-gray-600 mt-1">
                                Verify the expected input format for the Oracle
                                GoldenGate extract process.
                              </p>
                            </div>

                            <div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">
                                  Check input file generation process
                                </span>
                                <div className="text-xs text-gray-500">
                                  Priority: Medium
                                </div>
                              </div>
                              <p className="text-xs text-gray-600 mt-1">
                                Check if any recent changes were made to the
                                input file generation process.
                              </p>
                            </div>

                            <div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">
                                  Update OGGEXTR1 module
                                </span>
                                <div className="text-xs text-gray-500">
                                  Priority: Medium
                                </div>
                              </div>
                              <p className="text-xs text-gray-600 mt-1">
                                Ensure the OGGEXTR1 module is up-to-date and
                                compatible with the current input format.
                              </p>
                            </div>

                            <div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">
                                  Rerun job from STEP1
                                </span>
                                <div className="text-xs text-gray-500">
                                  Priority: Final
                                </div>
                              </div>
                              <p className="text-xs text-gray-600 mt-1">
                                After corrections, rerun the job from STEP1.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-medium text-gray-900">
                          Explainability
                        </h4>
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-700 mb-2">
                            This analysis is based on the following key factors:
                          </p>
                          <ul className="text-xs text-gray-600 space-y-1">
                            <li>
                              • Clear identification of job name (OGGLOAD) and
                              job ID (JOB12456) from the JES2 log
                            </li>
                            <li>
                              • Specific error messages indicating invalid
                              record format and data validation error
                            </li>
                            <li>
                              • Abend code GG33 with reason "DATA FORMAT ERROR
                              ON LINE 2457"
                            </li>
                            <li>
                              • Additional context from STC12345 log entries
                              pinpointing the module and offset of the error
                            </li>
                            <li>
                              • The sequence of events in the log, showing
                              normal job start followed by error and abend
                            </li>
                            <li>
                              • Recognition of Oracle GoldenGate-specific
                              messages and processes
                            </li>
                          </ul>
                          <p className="text-xs text-gray-600 mt-2">
                            The recommendations are derived from standard
                            troubleshooting practices for data format errors in
                            mainframe batch jobs, particularly those involving
                            Oracle GoldenGate extract processes.
                          </p>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <Card className="h-fit">
                <CardHeader>
                  <CardTitle>Action Required</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Comments
                      </label>
                      <Textarea
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                        placeholder="Enter your comments about the remediation action..."
                        className="mt-1"
                        rows={3}
                      />
                    </div>
                    <div className="flex space-x-3">
                      <Button
                        onClick={handleApprove}
                        disabled={approvePending}
                        className="flex-1 bg-green-600 hover:bg-green-700"
                      >
                        <ThumbsUp className="h-4 w-4 mr-2" />
                        {approvePending
                          ? STATIC_TEXTS.APPROVING
                          : STATIC_TEXTS.APPROVE_RECOMMENDATION}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={handleReject}
                        disabled={rejectPending}
                        className="flex-1"
                      >
                        <ThumbsDown className="h-4 w-4 mr-2" />
                        {rejectPending
                          ? STATIC_TEXTS.REJECTING
                          : STATIC_TEXTS.REJECT_SUGGESTION}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent
            value={STATIC_TEXTS.TAB_SYSTEM_LOGS}
            className={STATIC_TEXTS.MT_6}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Activity className="h-5 w-5 mr-2 text-gray-500" />
                    Audit Logs
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    {STATIC_TEXTS.DOWNLOAD}
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">
                          ABEND_REGISTERED
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(abend.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        Abend notification received and processed
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Tracking ID: {detailedAbend.trackingId}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">
                          LOG_EXTRACTION_INITIATED
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(
                            new Date(abend.timestamp).getTime() + 30000
                          ).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        Log extraction job triggered
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Job Run ID: JR-{abend.id.slice(-4)} • Retries: 0
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">
                          LOG_UPLOAD_TO_S3
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(
                            new Date(abend.timestamp).getTime() + 120000
                          ).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        Abend Fault Log received
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">
                          PREPROCESSING_LOG_FILE
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(
                            new Date(abend.timestamp).getTime() + 150000
                          ).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        Preparing log file for AI Analysis
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">
                          AI_ANALYSIS_INITIATED
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(
                            new Date(abend.timestamp).getTime() + 180000
                          ).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        AI analysis started
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Confidence: {abend.confidence}% • Abend Type:{" "}
                        {abend.abendType}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">
                          REMEDIATION_SUGGESTIONS_GENERATED
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(
                            new Date(abend.timestamp).getTime() + 240000
                          ).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        AI remediation suggestions generated
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Status: {ABEND_STATUS_CONFIG[abend.status]?.label || abend.status} •
                        Assigned To: {abend.assignedTo}
                      </p>
                    </div>
                  </div>

                  {abend.status ===
                    STATIC_TEXTS.STATUS_PENDING_MANUAL_APPROVAL && (
                    <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                      <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-sm">
                            PENDING_MANUAL_APPROVAL
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(
                              new Date(abend.timestamp).getTime() + 300000
                            ).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          Waiting for manual approval
                        </p>
                      </div>
                    </div>
                  )}

                  {abend.status === STATIC_TEXTS.STATUS_RESOLVED && (
                    <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-sm">RESOLVED</span>
                          <span className="text-xs text-gray-500">
                            {new Date(
                              new Date(abend.timestamp).getTime() + 360000
                            ).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          Abend successfully resolved
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Duration: {abend.duration} • Verification: completed
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent
            value={STATIC_TEXTS.TAB_JOB_LOGS}
            className={STATIC_TEXTS.MT_6}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-gray-500" />
                    Job Logs
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    {STATIC_TEXTS.EXPORT}
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-black text-green-400 p-4 rounded-lg font-mono text-xs overflow-x-auto max-h-96 overflow-y-auto">
                  <pre className="whitespace-pre-wrap">{`Data Value         Source (Starting at Line # 000046)
TFILM
*M               *  01  AUDIT-DB-REC-MEM           PIC X(664).
*     049568822  *
*                *
*              ..*
*................*
*.p..@95559797ARE*
*ALTR 7ZUE0010M  *
*                *
*           04956*
*8822IMB0290 IMB2*
*90BDA           *
*                *

*0000000000000000*
*0000000000000000*
*        000000  *
*  000000    0000*
*00    000000    *
*                *
Data Value         Source (Starting at Line # 000051)
TFILG
*E50346O         *  01  AUDIT-DB-REC-GRP           PIC X(648).
*                *
*                *
*              ..*
*................*
*.p..@..h.<IMMSBU*
*P S             *
*                *
*AL78905 VCB23773*
*C...20250601    *
*       20250501 *
*                *

*                *

============================== WORKING STORAGE SECTION ==============================
Data Value         Source (Starting at Line # 000054)
------------------ ------------------------------------------------------------------------

                    77  DIR-STATS PICTURE X(49) VALUE                                000000
*${abend?.jobId || "IYM0798"}  02 01 1*            '${
                    abend?.jobId || "IYM0798"
                  }  02 01 14/12/24 03:55 AC67766  IYMP009890'.   000000
*4/12/24 03:55 AC*
*67766  IYMP00989*
*0               *
                    77  FILLER                      PIC X(040) VALUE
*${abend?.jobId || "IYM0798"}  WORKING*      '${
                    abend?.jobId || "IYM0798"
                  }  WORKING STORAGE STARTS HERE '.
* STORAGE STARTS *
*HERE            *
                    01  LAST-PARAGRAPH                               GLOBAL.
*LAST-PARA=      *      05  VALUE  'LAST-PARA='         PIC X(10).
*24000-READ-CHIL-*      05  LAST-PARA                   PIC X(40).
*SEG             *
*                *
                    01  MISCELLANEOUS.
99999999                05 ALL-NINES                PIC 9(09) COMP-3 VALUE 099999999.
79749477                05 NINES-COMP-EFF-DTE       PIC 9(09) COMP-3 VALUE 0.
0                       05 NINES-COMP-EFF-TIME      PIC 9(09) COMP-3 VALUE 0.
20250523                05 WS-CURRENT-DATE          PIC 9(08) VALUE ZEROS.
20250522                05 WS-CURRENT-DATE-1        PIC 9(08) VALUE ZEROS.
20160810                05  WS-UPDT-DATE-KEY        PIC 9(08) VALUE ZERO.
99999999                05  WS-NINES                PIC 9(8)   VALUE 99999999.
1                       05 WS-ONE                   PIC 9(01) VALUE 1.
0                       05 WS-SYS-TIME              PIC 9(08) VALUE ZEROS.
*${
                    abend?.jobId || "IYM0798"
                  }--       *      05  WS-PFX                  PIC X(10) VALUE '${
                    abend?.jobId || "IYM0798"
                  }--'.
*N               *      05  WS-SEGMENT-END-SW       PIC X(01)  VALUE SPACES.
*N               *      05  WS-CHILG-SEG                 PIC X(01) VALUE SPACE.
                    01 WS-AUDIT-GRP-REC.
*E99350N         *     05 WS-IMMAUDR-GRP            PIC X(80).
*                *
*                *
*              ..*
*................*
*.p..@.....IMMSBC*     05 WS-IMMAUDE-GRP            PIC X(568).
*X S             *
*                *
*AD00731 VCB23438*
*C...20250701    *
*                *

*   N            *
*                *

*           20250*
*70102           *
*    N           *
*                *

*                *
                    01 WS-AUDIT-MEM-REC.
*M               *     05 WS-IMMAUDR-MEM            PIC X(80).
*     049585689  *
*                *
*              ..*
*................*
*.p..@95559691ARE*     05 WS-IMMAUDS-MEM            PIC X(584).
*ALTR 817S0010M  *
*                *
*           04958*
*5689IMB0290 IMB2*
*90BDA           *

============================== PROGRAM EXECUTION TRACE ==============================
                    
JOB ${abend?.jobName} (${abend?.jobId}) EXECUTION LOG:
14:30:15 PROGRAM START - COBOL AUDIT PROCESSING MODULE
14:30:16 WORKING STORAGE INITIALIZED
14:30:17 DATABASE CONNECTION ESTABLISHED
14:30:18 READING AUDIT RECORDS FROM TFILM FILE...
14:30:19 PROCESSING RECORD 049568822 - MEMBER AUDIT DATA
14:30:20 PROCESSING RECORD 050346O - GROUP AUDIT DATA  
14:30:21 DATA VALIDATION CHECKS STARTED
14:30:22 ABEND CODE ${abend?.abendType} DETECTED AT OFFSET +000142
14:30:23 INVALID DATA FORMAT IN PACKED DECIMAL FIELD
14:30:24 PROGRAM TERMINATED ABNORMALLY
14:30:25 CORE DUMP GENERATED
14:30:26 JOB ENDED WITH COMPLETION CODE 0012

============================== MEMORY DUMP ==============================
Storage around failing instruction:
00F2A130: F2F3F4F5 F6F7F8F9 F0F1F2F3 F4F5F6F7  *2345678901234567*
00F2A140: F8F9F0F1 5820C008 1830C00C D203C004  *8901............*
00F2A150: C008F220 0000FA00 41F0F000 07FE      *................*

Working Storage Variables at time of abend:
WS-CURRENT-DATE:    20250523
WS-CURRENT-DATE-1:  20250522  
WS-UPDT-DATE-KEY:   20160810
WS-SYS-TIME:        14302400
WS-SEGMENT-END-SW:  N
LAST-PARA:          24000-READ-CHIL-SEG

============================== ERROR ANALYSIS ==============================
Error Type: ${abend?.abendType} - Data Exception
Location: Module ${abend?.jobName}, Offset +000142
Cause: Invalid packed decimal data in audit record processing
Recommendation: Review input data format and field definitions`}</pre>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
