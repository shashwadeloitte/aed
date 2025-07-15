import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Brain, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Zap,
  Target
} from "lucide-react";
import { motion } from "framer-motion";
import { STATIC_TEXTS } from "@/constants/staticTexts";

export function AIInsightsPanel() {
  return (
    <div className="space-y-6">
      {/* AI Performance Overview */}
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            {STATIC_TEXTS.AI_SYSTEM_PERFORMANCE}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">94%</div>
              <div className="text-sm text-muted-foreground">{STATIC_TEXTS.AUTOMATION_SUCCESS_RATE}</div>
              <Progress value={94} className="mt-2" />
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-success">87%</div>
              <div className="text-sm text-muted-foreground">{STATIC_TEXTS.PREDICTION_ACCURACY}</div>
              <Progress value={87} className="mt-2" />
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-info">2.3x</div>
              <div className="text-sm text-muted-foreground">{STATIC_TEXTS.FASTER_RESOLUTION}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Real-time Insights */}
      <Tabs defaultValue="insights" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="insights">{STATIC_TEXTS.AI_INSIGHTS_TAB}</TabsTrigger>
          <TabsTrigger value="predictions">{STATIC_TEXTS.PREDICTIONS_TAB}</TabsTrigger>
          <TabsTrigger value="patterns">{STATIC_TEXTS.PATTERNS_TAB}</TabsTrigger>
          <TabsTrigger value="recommendations">{STATIC_TEXTS.RECOMMENDATIONS_TAB}</TabsTrigger>
        </TabsList>

        <TabsContent value="insights" className="space-y-4">
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>{STATIC_TEXTS.HIGH_PRIORITY_ALERT}</strong> {STATIC_TEXTS.UNUSUAL_SPIKE_ALERT}
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-success" />
                  {STATIC_TEXTS.TRENDING_ISSUES}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">{STATIC_TEXTS.SOC4_MEMORY_VIOLATIONS}</span>
                  <Badge variant="destructive">+23%</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">{STATIC_TEXTS.DATASET_SIZE_OVERFLOW}</span>
                  <Badge variant="secondary">+15%</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">{STATIC_TEXTS.JCL_PARAMETER_ISSUES}</span>
                  <Badge variant="outline">+8%</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  {STATIC_TEXTS.RESOLUTION_SUCCESS}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">{STATIC_TEXTS.AUTOMATED_FIXES}</span>
                  <span className="text-sm font-medium text-success">{STATIC_TEXTS.AUTOMATED_FIXES_COUNT}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">{STATIC_TEXTS.AVG_RESOLUTION_TIME}</span>
                  <span className="text-sm font-medium">{STATIC_TEXTS.AVG_RESOLUTION_TIME_VALUE}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">{STATIC_TEXTS.MANUAL_INTERVENTIONS}</span>
                  <span className="text-sm font-medium text-warning-foreground">{STATIC_TEXTS.MANUAL_INTERVENTIONS_COUNT}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="predictions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                {STATIC_TEXTS.PREDICTIVE_ANALYTICS}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">{STATIC_TEXTS.BILLING_RECONCILE_JOB}</div>
                    <div className="text-sm text-muted-foreground">{STATIC_TEXTS.BILLING_RECONCILE_PREDICTION}</div>
                  </div>
                  <Badge variant="destructive">{STATIC_TEXTS.RISK_85_PERCENT}</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">{STATIC_TEXTS.MEMBER_SYNC_NIGHTLY}</div>
                    <div className="text-sm text-muted-foreground">{STATIC_TEXTS.MEMBER_SYNC_PREDICTION}</div>
                  </div>
                  <Badge variant="secondary">{STATIC_TEXTS.RISK_62_PERCENT}</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">{STATIC_TEXTS.CLAIMS_EXPORT_WEEKLY}</div>
                    <div className="text-sm text-muted-foreground">{STATIC_TEXTS.CLAIMS_EXPORT_PREDICTION}</div>
                  </div>
                  <Badge variant="outline">{STATIC_TEXTS.RISK_34_PERCENT}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="patterns" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                {STATIC_TEXTS.PATTERN_RECOGNITION}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="p-3 border rounded-lg bg-error/5">
                  <div className="font-medium text-error mb-1">{STATIC_TEXTS.MEMORY_LEAK_PATTERN}</div>
                  <div className="text-sm text-muted-foreground mb-2">
                    {STATIC_TEXTS.MEMORY_LEAK_DESCRIPTION}
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="text-xs">{STATIC_TEXTS.OCCURRENCES_12}</Badge>
                    <Badge variant="outline" className="text-xs">{STATIC_TEXTS.LAST_24H}</Badge>
                  </div>
                </div>
                
                <div className="p-3 border rounded-lg bg-warning/5">
                  <div className="font-medium text-warning-foreground mb-1">{STATIC_TEXTS.TIMING_CORRELATION}</div>
                  <div className="text-sm text-muted-foreground mb-2">
                    {STATIC_TEXTS.TIMING_CORRELATION_DESCRIPTION}
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="text-xs">{STATIC_TEXTS.STATISTICAL_SIGNIFICANCE}</Badge>
                  </div>
                </div>

                <div className="p-3 border rounded-lg bg-info/5">
                  <div className="font-medium text-info mb-1">{STATIC_TEXTS.DEPENDENCY_CHAIN_IMPACT}</div>
                  <div className="text-sm text-muted-foreground mb-2">
                    {STATIC_TEXTS.DEPENDENCY_CHAIN_DESCRIPTION}
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="text-xs">{STATIC_TEXTS.IMPACT_SCORE_HIGH}</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                {STATIC_TEXTS.AI_RECOMMENDATIONS}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-3"
              >
                <div className="p-4 border rounded-lg bg-success/5">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="font-medium text-success mb-1">{STATIC_TEXTS.IMMEDIATE_ACTION_REQUIRED}</div>
                      <div className="text-sm text-muted-foreground">
                        {STATIC_TEXTS.INCREASE_MEMORY_ALLOCATION}
                      </div>
                    </div>
                    <Badge variant="default">{STATIC_TEXTS.CONFIDENCE_96_PERCENT}</Badge>
                  </div>
                  <Button size="sm" className="mt-2">{STATIC_TEXTS.APPLY_RECOMMENDATION}</Button>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="font-medium mb-1">{STATIC_TEXTS.OPTIMIZATION_OPPORTUNITY}</div>
                      <div className="text-sm text-muted-foreground">
                        {STATIC_TEXTS.SCHEDULE_OFF_PEAK}
                      </div>
                    </div>
                    <Badge variant="outline">{STATIC_TEXTS.CONFIDENCE_78_PERCENT}</Badge>
                  </div>
                  <Button variant="outline" size="sm" className="mt-2">{STATIC_TEXTS.SCHEDULE_CHANGE}</Button>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="font-medium mb-1">{STATIC_TEXTS.PREVENTIVE_MEASURE}</div>
                      <div className="text-sm text-muted-foreground">
                        {STATIC_TEXTS.ADD_CHECKPOINT_RESTART}
                      </div>
                    </div>
                    <Badge variant="secondary">{STATIC_TEXTS.CONFIDENCE_65_PERCENT}</Badge>
                  </div>
                  <Button variant="outline" size="sm" className="mt-2">{STATIC_TEXTS.PLAN_IMPLEMENTATION}</Button>
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}