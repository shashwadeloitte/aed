import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { StatusCard } from "@/components/StatusCard";
import { AbendTable } from "@/components/AbendTable";
import { AIInsightsPanel } from "@/components/AIInsightsPanel";
import AbendDetailModal from "@/components/AbendDetailModal";
import LoginButton from "@/components/auth/LoginButton";
import { toast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import styles from "@/components/AIInsightsPanel.module.css";
import {
  APP_CONFIG,
  PERFORMANCE_METRICS,
  CONFIDENCE_DATA,
  TOTAL_ABENDS,
  MOCK_ABENDS,
  type Abend,
} from "@/constants";
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  Brain,
  Activity,
  BarChart3,
  Database,
  Zap,
  Shield,
  RefreshCw,
  LogOut,
  User,
  XCircle,
} from "lucide-react";

const Index = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [systemStatus, setSystemStatus] = useState("operational");
  const [activeTab, setActiveTab] = useState("overview");
  const [appliedFilter, setAppliedFilter] = useState<string | null>(null);
  const [filterTimestamp, setFilterTimestamp] = useState<number>(0);
  const [selectedAbend, setSelectedAbend] = useState<Abend | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [lastRefreshTime, setLastRefreshTime] = useState<Date | null>(null);

  // Calculate actual counts from MOCK_ABENDS data
  const getAbendCounts = () => {
    const counts = {
      active: MOCK_ABENDS.filter(abend => 
        abend.status === "ABEND_DETECTED" || 
        abend.status === "REMEDIATION_SUGGESTIONS_GENERATED" || 
        abend.status === "MANUAL_ANALYSIS_REQUIRED"
      ).length,
      resolved: MOCK_ABENDS.filter(abend => abend.status === "resolved").length,
      pendingApproval: MOCK_ABENDS.filter(abend => abend.status === "PENDING_MANUAL_APPROVAL").length,
      total: MOCK_ABENDS.length,
      automationRate: 0
    };
    
    // Calculate automation rate (percentage of abends handled by AI System)
    const automatedCount = MOCK_ABENDS.filter(abend => abend.assignedTo === "AI System").length;
    counts.automationRate = Math.round((automatedCount / counts.total) * 100);
    
    return counts;
  };

  const abendCounts = getAbendCounts();

  // Use actual abend data from the table for recent activity
  const recentActivityAbends = MOCK_ABENDS.slice(0, 4); // Get first 4 abends from table data

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Function to format time elapsed since last refresh
  const getLastUpdateText = () => {
    if (!lastRefreshTime) return "";

    const now = new Date();
    const diffInSeconds = Math.floor(
      (now.getTime() - lastRefreshTime.getTime()) / 1000
    );

    if (diffInSeconds < 60) {
      return `Last updated ${
        diffInSeconds === 0 ? "now" : `${diffInSeconds} sec ago`
      }`;
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `Last updated ${minutes} min ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `Last updated ${hours} hr ago`;
    } else {
      const days = Math.floor(diffInSeconds / 86400);
      return `Last updated ${days} day${days > 1 ? "s" : ""} ago`;
    }
  };

  const handleRefresh = () => {
    setLastRefreshTime(new Date());
    toast({
      title: "Dashboard Refreshed",
      description: "All data has been updated with the latest information.",
      variant: "info",
    });
  };

  const handleCardClick = (filterType: string) => {
    setActiveTab("abends");
    setAppliedFilter(filterType);
    setFilterTimestamp(Date.now()); // Force update filter timestamp

    const filterLabels = {
      active: "Active Abends",
      "ABEND_DETECTED": "Abend Detected",
      "REMEDIATION_SUGGESTIONS_GENERATED": "Suggestions Generated",
      "PENDING_MANUAL_APPROVAL": "Pending Manual Approval",
      "MANUAL_ANALYSIS_REQUIRED": "Manual Analysis Required",
      resolved: "Resolved Abends",
      all: "All Abends",
    };

    toast({
      title: "Filter Applied",
      description: `Switched to Abends tab with ${
        filterLabels[filterType as keyof typeof filterLabels]
      } filter.`,
      variant: "info",
    });
  };

  const handleActivityClick = (abend: Abend) => {
    setSelectedAbend(abend);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedAbend(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-lg flex items-center justify-center">
                  <img
                    src="https://static.wixstatic.com/media/89b1fb_4876b9437e7b46359300abf5fc54901d~mv2.png/v1/fill/w_270,h_270,al_c/Elevance%20Health%20Logo_edited.png"
                    alt="Elevance Health Logo"
                    className="h-16 w-16 object-contain"
                  />
                </div>
                <div>
                  <h1 className="text-2xl font-display font-bold tracking-tight">
                    ADR Portal
                  </h1>
                  <p className="text-primary-foreground/80 text-sm font-body">
                    AI-Assisted Batch Diagnosis & Remediation
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                {lastRefreshTime && (
                  <div className="text-xs font-body text-primary-foreground/60">
                    {getLastUpdateText()}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-4">
                <div className="flex gap-2">
                  <Button variant="secondary" size="sm" onClick={handleRefresh}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh
                  </Button>
                </div>

                <div className="pl-4 border-l border-primary-foreground/20">
                  <LoginButton />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* System Status Alert */}
      <div className="container mx-auto px-6 py-4">
        <Alert className="border-success/50 bg-success/10">
          <CheckCircle className="h-4 w-4 text-success" />
          <AlertDescription>
            <span className="font-medium text-success">
              System Status: Operational
            </span>
            {" - "}All mainframe connections active. AI services running
            normally. Last health check: {currentTime.toLocaleTimeString()}
          </AlertDescription>
        </Alert>
      </div>

      <div className="container mx-auto px-6 py-6">
        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatusCard
            title="Active Abends"
            count={abendCounts.total}
            trend={-15}
            status="critical"
            description="Total abends in system"
            icon={<AlertTriangle className="h-5 w-5" />}
            onClick={() => handleCardClick("all")}
          />
          <StatusCard
            title="Pending Approval"
            count={abendCounts.pendingApproval}
            trend={+8}
            status="warning"
            description="Awaiting manual approval"
            icon={<Clock className="h-5 w-5" />}
            onClick={() => handleCardClick("PENDING_MANUAL_APPROVAL")}
          />
          <StatusCard
            title="Resolved"
            count={abendCounts.resolved}
            trend={+12}
            status="success"
            description="Successfully remediated"
            icon={<CheckCircle className="h-5 w-5" />}
            onClick={() => handleCardClick("resolved")}
          />
          <StatusCard
            title="Automation Rate"
            count={abendCounts.automationRate}
            trend={+3}
            status="info"
            description="Percentage automated"
            icon={<Zap className="h-5 w-5" />}
            onClick={() => handleCardClick("all")}
          />
        </div>

        {/* Main Dashboard Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="abends" className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              Abends
            </TabsTrigger>
            <TabsTrigger
              value="ai-insights"
              className="flex items-center gap-2"
            >
              <Brain className="h-4 w-4" />
              AI Insights
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-blue-600" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-3"
                  >
                    {recentActivityAbends.map((abend, index) => {
                      const getStatusColor = (status: string) => {
                        switch (status) {
                          case 'resolved': return 'bg-success';
                          case 'ABEND_DETECTED': return 'bg-error';
                          case 'REMEDIATION_SUGGESTIONS_GENERATED': return 'bg-warning';
                          case 'PENDING_MANUAL_APPROVAL': return 'bg-primary';
                          case 'MANUAL_ANALYSIS_REQUIRED': return 'bg-secondary';
                          default: return 'bg-muted';
                        }
                      };

                      const getStatusLabel = (status: string) => {
                        switch (status) {
                          case 'resolved': return 'Resolved';
                          case 'ABEND_DETECTED': return 'Detected';
                          case 'REMEDIATION_SUGGESTIONS_GENERATED': return 'Suggestions Generated';
                          case 'PENDING_MANUAL_APPROVAL': return 'Pending Approval';
                          case 'MANUAL_ANALYSIS_REQUIRED': return 'Manual Analysis';
                          default: return status;
                        }
                      };

                      return (
                        <div
                          key={abend.id}
                          className="flex items-start gap-3 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer"
                          onClick={() => handleActivityClick(abend)}
                        >
                          <div className={`w-2 h-2 ${getStatusColor(abend.status)} rounded-full mt-2`}></div>
                          <div className="flex-1">
                            <div className="font-medium text-sm">
                              {abend.jobName} {getStatusLabel(abend.status)}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {abend.jobName} - {abend.abendType} abend detected
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {abend.duration} ago
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </motion.div>
                </CardContent>
              </Card>

              {/* Performance Metrics */}
              <Card className="border-gray-200 shadow-sm hover:shadow-elevance transition-shadow duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <TrendingUp className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg font-semibold text-gray-900">
                          Performance Metrics
                        </CardTitle>
                        <p className="text-sm text-gray-500">
                          Real-time operational performance
                        </p>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-4">
                    {PERFORMANCE_METRICS.map((metric, index) => (
                      <div
                        key={index}
                        className="space-y-3 p-4 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <metric.icon className="h-4 w-4 text-gray-600" />
                            <span className="text-sm font-medium text-gray-700">
                              {metric.title}
                            </span>
                          </div>
                          <Badge
                            variant="secondary"
                            className={`text-xs ${
                              metric.status === "good"
                                ? "bg-green-100 text-green-800"
                                : metric.status === "warning"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {metric.status === "good"
                              ? "On Target"
                              : metric.status === "warning"
                              ? "At Risk"
                              : "Critical"}
                          </Badge>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between items-baseline">
                            <span className="text-2xl font-bold text-gray-900">
                              {metric.value}
                            </span>
                            <span className="text-xs text-gray-500">
                              Target: {metric.target}
                            </span>
                          </div>

                          <div className="space-y-1">
                            <Progress
                              value={metric.progress}
                              className={
                                metric.color === "green"
                                  ? "text-green-600"
                                  : metric.color === "amber"
                                  ? "text-amber-600"
                                  : "text-red-600"
                              }
                            />
                            <div className="flex justify-between text-xs text-gray-500">
                              <span>0</span>
                              <span className="font-medium">
                                {metric.progress.toFixed(0)}%
                              </span>
                              <span>100</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div>
                        <p className="text-sm font-medium text-blue-900">
                          Performance Insight
                        </p>
                        <p className="text-sm text-blue-700 mt-1">
                          System performance is within acceptable ranges.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* AI Confidence Distribution */}
              <Card className="border-gray-200 shadow-sm hover:shadow-elevance transition-shadow duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Brain className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg font-semibold text-gray-900">
                        AI Confidence
                      </CardTitle>
                      <p className="text-sm text-gray-500">
                        Analysis reliability scores
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {CONFIDENCE_DATA.map((item, index) => (
                      <div key={index} className={item.containerClass}>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            <item.icon className={item.iconClass} />
                            <div>
                              <span
                                className={`text-sm font-medium ${item.textColor}`}
                              >
                                {item.label}
                              </span>
                              <span className="text-xs text-gray-500 ml-1">
                                ({item.range})
                              </span>
                            </div>
                          </div>
                          <Badge
                            variant="secondary"
                            className={item.badgeClass}
                          >
                            {item.value}%
                          </Badge>
                        </div>

                        <div className="space-y-2">
                          <Progress
                            value={(item.value / TOTAL_ABENDS) * 100}
                            className={item.progressClass}
                          />
                          <p className="text-xs text-gray-600">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                    <div className="flex items-start space-x-3">
                      <TrendingUp className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-medium text-blue-900">
                          AI Performance Summary
                        </h4>
                        <p className="text-sm text-blue-700 mt-1">
                          <span className="font-medium">90%</span> of abends
                          processed with high confidence.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="abends">
            <AbendTable appliedFilter={appliedFilter} filterTimestamp={filterTimestamp} />
          </TabsContent>

          <TabsContent value="ai-insights">
            <AIInsightsPanel />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-muted-foreground">
                    <BarChart3 className="h-12 w-12 mx-auto mb-4" />
                    Advanced analytics dashboard will be implemented here
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Cost Savings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-success">
                        $247K
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Saved this month through automation
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-xl font-bold">156</div>
                        <div className="text-xs text-muted-foreground">
                          Hours saved
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold">87%</div>
                        <div className="text-xs text-muted-foreground">
                          Automation rate
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Abend Detail Modal */}
      <AbendDetailModal
        open={modalOpen}
        onClose={handleCloseModal}
        abend={selectedAbend}
        defaultTab="overview"
      />
    </div>
  );
};

export default Index;
