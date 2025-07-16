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
import { STATIC_TEXTS } from "@/constants/staticTexts";
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
import appLogo from "@/assets/channels4_profile.jpg";
import { useOktaAuth } from "@okta/okta-react";

const Index = () => {
  const { oktaAuth, authState } = useOktaAuth();
  const userInfo = authState?.idToken?.claims;
  const userName = userInfo?.name || userInfo?.preferred_username || STATIC_TEXTS.DEFAULT_USER_NAME;
  const handleLogout = async () => {
    try {
      await oktaAuth.signOut();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  const [currentTime, setCurrentTime] = useState(new Date());
  const [systemStatus, setSystemStatus] = useState(STATIC_TEXTS.STATUS_OPERATIONAL);
  const [activeTab, setActiveTab] = useState(STATIC_TEXTS.TAB_ABENDS);
  const [appliedFilter, setAppliedFilter] = useState<string | null>(null);
  const [filterTimestamp, setFilterTimestamp] = useState<number>(0);
  const [selectedAbend, setSelectedAbend] = useState<Abend | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [lastRefreshTime, setLastRefreshTime] = useState<Date | null>(null);

  // Calculate actual counts from MOCK_ABENDS data
  const getAbendCounts = () => {
    const counts = {
      active: MOCK_ABENDS.filter(abend => 
        abend.status === STATIC_TEXTS.STATUS_ABEND_DETECTED || 
        abend.status === STATIC_TEXTS.STATUS_REMEDIATION_SUGGESTIONS_GENERATED || 
        abend.status === STATIC_TEXTS.STATUS_MANUAL_ANALYSIS_REQUIRED
      ).length,
      resolved: MOCK_ABENDS.filter(abend => abend.status === STATIC_TEXTS.STATUS_RESOLVED).length,
      pendingApproval: MOCK_ABENDS.filter(abend => abend.status === STATIC_TEXTS.STATUS_PENDING_MANUAL_APPROVAL).length,
      total: MOCK_ABENDS.length,
      automationRate: 0
    };
    
    // Calculate automation rate (percentage of abends handled by AI System)
    const automatedCount = MOCK_ABENDS.filter(abend => abend.assignedTo === STATIC_TEXTS.AI_SYSTEM).length;
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
        diffInSeconds === 0 ? STATIC_TEXTS.NOW : `${diffInSeconds} ${STATIC_TEXTS.SEC_AGO}`
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
      title: STATIC_TEXTS.DASHBOARD_REFRESHED_TITLE,
      description: STATIC_TEXTS.DASHBOARD_REFRESHED_DESCRIPTION,
      variant: "info",
    });
  };

  const handleCardClick = (filterType: string) => {
    setActiveTab(STATIC_TEXTS.TAB_ABENDS);
    setAppliedFilter(filterType);
    setFilterTimestamp(Date.now()); // Force update filter timestamp

    const filterLabels = {
      active: STATIC_TEXTS.ACTIVE_ABENDS,
      "ABEND_DETECTED": STATIC_TEXTS.ABEND_DETECTED_LABEL,
      "REMEDIATION_SUGGESTIONS_GENERATED": STATIC_TEXTS.SUGGESTIONS_GENERATED,
      "PENDING_MANUAL_APPROVAL": STATIC_TEXTS.PENDING_MANUAL_APPROVAL_LABEL,
      "MANUAL_ANALYSIS_REQUIRED": STATIC_TEXTS.MANUAL_ANALYSIS_REQUIRED,
      resolved: STATIC_TEXTS.RESOLVED_ABENDS,
      all: STATIC_TEXTS.ALL_ABENDS,
    };

    toast({
      title: STATIC_TEXTS.FILTER_APPLIED_TITLE,
      description: `${STATIC_TEXTS.SWITCHED_TO_ABENDS_TAB} ${
        filterLabels[filterType as keyof typeof filterLabels]
      } ${STATIC_TEXTS.FILTER}`,
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

  // function to clear the card filter
  const clearCardFilter = () => {
    setAppliedFilter(null);
    setFilterTimestamp(Date.now());
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
                    src={appLogo}
                    alt="App Logo"
                    className="h-16 w-16 object-contain rounded-lg"
                  />
                </div>
                <div>
                  <h1 className="text-2xl font-display font-bold tracking-tight">
                    {STATIC_TEXTS.APP_TITLE}
                  </h1>
                  <p className="text-primary-foreground/80 text-sm font-body">
                    {STATIC_TEXTS.APP_SUBTITLE}
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
                    {STATIC_TEXTS.REFRESH}
                  </Button>
                </div>
                {authState?.isAuthenticated && (
                  <div className="flex items-center gap-4 pl-4 border-l border-white/30">
                    <div className="flex items-center gap-3 bg-white/10 px-4 py-2 rounded-lg shadow-sm">
                      <span className="font-semibold text-base capitalize tracking-wide text-white">
                        {userName}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleLogout}
                        className="bg-white text-gray-800 border border-gray-300 shadow-sm hover:bg-red-600 hover:text-white hover:border-red-600 transition-colors"
                      >
                        <LogOut className="h-4 w-4 mr-1" />
                        {STATIC_TEXTS.LOGOUT}
                      </Button>
                    </div>
                  </div>
                )}
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
              {STATIC_TEXTS.SYSTEM_STATUS_OPERATIONAL}
            </span>
            {" - "}{STATIC_TEXTS.SYSTEM_STATUS_DESCRIPTION} {currentTime.toLocaleTimeString()}
          </AlertDescription>
        </Alert>
      </div>

      <div className="container mx-auto px-6 py-6">
        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatusCard
            title={STATIC_TEXTS.ACTIVE_ABENDS}
            count={abendCounts.total}
            trend={-15}
            status="critical"
            description={STATIC_TEXTS.TOTAL_ABENDS_IN_SYSTEM}
            icon={<AlertTriangle className="h-5 w-5" />}
            onClick={() => handleCardClick(STATIC_TEXTS.FILTER_ALL)}
          />
          <StatusCard
            title={STATIC_TEXTS.PENDING_APPROVAL}
            count={abendCounts.pendingApproval}
            trend={+8}
            status="warning"
            description={STATIC_TEXTS.AWAITING_MANUAL_APPROVAL}
            icon={<Clock className="h-5 w-5" />}
            onClick={() => handleCardClick(STATIC_TEXTS.STATUS_PENDING_MANUAL_APPROVAL)}
          />
          <StatusCard
            title={STATIC_TEXTS.RESOLVED}
            count={abendCounts.resolved}
            trend={+12}
            status="success"
            description={STATIC_TEXTS.SUCCESSFULLY_REMEDIATED}
            icon={<CheckCircle className="h-5 w-5" />}
            onClick={() => handleCardClick(STATIC_TEXTS.STATUS_RESOLVED)}
          />
          <StatusCard
            title={STATIC_TEXTS.AUTOMATION_RATE}
            count={abendCounts.automationRate + '%'}
            trend={+3}
            status="info"
            description={STATIC_TEXTS.PERCENTAGE_AUTOMATED}
            icon={<Zap className="h-5 w-5" />}
            onClick={() => handleCardClick(STATIC_TEXTS.FILTER_ALL)}
          />
        </div>

        {/* Main Dashboard Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value={STATIC_TEXTS.TAB_ABENDS} className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              {STATIC_TEXTS.ABENDS}
            </TabsTrigger>
            <TabsTrigger value={STATIC_TEXTS.TAB_OVERVIEW} className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              {STATIC_TEXTS.OVERVIEW}
            </TabsTrigger>
            <TabsTrigger
              value="ai-insights"
              className="flex items-center gap-2"
            >
              <Brain className="h-4 w-4" />
              {STATIC_TEXTS.AI_INSIGHTS}
            </TabsTrigger>
            <TabsTrigger value={STATIC_TEXTS.TAB_ANALYTICS} className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              {STATIC_TEXTS.ANALYTICS}
            </TabsTrigger>
          </TabsList>

          <TabsContent value={STATIC_TEXTS.TAB_OVERVIEW} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-blue-600" />
                    {STATIC_TEXTS.RECENT_ACTIVITY}
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
                          case 'resolved': return STATIC_TEXTS.RESOLVED_LABEL;
                          case 'ABEND_DETECTED': return STATIC_TEXTS.DETECTED;
                          case 'REMEDIATION_SUGGESTIONS_GENERATED': return STATIC_TEXTS.SUGGESTIONS_GENERATED;
                          case 'PENDING_MANUAL_APPROVAL': return STATIC_TEXTS.PENDING_APPROVAL_STATUS;
                          case 'MANUAL_ANALYSIS_REQUIRED': return STATIC_TEXTS.MANUAL_ANALYSIS;
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
                              {abend.jobName} - {abend.abendType} {STATIC_TEXTS.ABEND_DETECTED}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {abend.duration} {STATIC_TEXTS.AGO}
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
                          {STATIC_TEXTS.PERFORMANCE_METRICS}
                        </CardTitle>
                        <p className="text-sm text-gray-500">
                          {STATIC_TEXTS.REAL_TIME_OPERATIONAL_PERFORMANCE}
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
                              ? STATIC_TEXTS.ON_TARGET
                              : metric.status === "warning"
                              ? STATIC_TEXTS.AT_RISK
                              : STATIC_TEXTS.CRITICAL}
                          </Badge>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between items-baseline">
                            <span className="text-2xl font-bold text-gray-900">
                              {metric.value}
                            </span>
                            <span className="text-xs text-gray-500">
                              {STATIC_TEXTS.TARGET} {metric.target}
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
                          {STATIC_TEXTS.PERFORMANCE_INSIGHT}
                        </p>
                        <p className="text-sm text-blue-700 mt-1">
                          {STATIC_TEXTS.PERFORMANCE_INSIGHT_DESCRIPTION}
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
                        {STATIC_TEXTS.AI_CONFIDENCE}
                      </CardTitle>
                      <p className="text-sm text-gray-500">
                        {STATIC_TEXTS.ANALYSIS_RELIABILITY_SCORES}
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
                          {STATIC_TEXTS.AI_PERFORMANCE_SUMMARY}
                        </h4>
                        <p className="text-sm text-blue-700 mt-1">
                          {STATIC_TEXTS.AI_PERFORMANCE_SUMMARY_DESC}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value={STATIC_TEXTS.TAB_ABENDS}>
            <AbendTable 
              appliedFilter={appliedFilter} 
              filterTimestamp={filterTimestamp} 
              onClearCardFilter={clearCardFilter}
            />
          </TabsContent>

          <TabsContent value="ai-insights">
            <AIInsightsPanel />
          </TabsContent>

          <TabsContent value={STATIC_TEXTS.TAB_ANALYTICS} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>{STATIC_TEXTS.PERFORMANCE_TRENDS}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-muted-foreground">
                    <BarChart3 className="h-12 w-12 mx-auto mb-4" />
                    {STATIC_TEXTS.ADVANCED_ANALYTICS_DASHBOARD}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{STATIC_TEXTS.COST_SAVINGS}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-success">
                        $247K
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {STATIC_TEXTS.SAVED_THIS_MONTH}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-xl font-bold">156</div>
                        <div className="text-xs text-muted-foreground">
                          {STATIC_TEXTS.HOURS_SAVED}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold">87%</div>
                        <div className="text-xs text-muted-foreground">
                          {STATIC_TEXTS.AUTOMATION_RATE_PERCENT}
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
        defaultTab={STATIC_TEXTS.TAB_OVERVIEW}
      />
    </div>
  );
};

export default Index;
