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

export function AIInsightsPanel() {
  return (
    <div className="space-y-6">
      {/* AI Performance Overview */}
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            AI System Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">94%</div>
              <div className="text-sm text-muted-foreground">Automation Success Rate</div>
              <Progress value={94} className="mt-2" />
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-success">87%</div>
              <div className="text-sm text-muted-foreground">Prediction Accuracy</div>
              <Progress value={87} className="mt-2" />
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-info">2.3x</div>
              <div className="text-sm text-muted-foreground">Faster Resolution</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Real-time Insights */}
      <Tabs defaultValue="insights" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
          <TabsTrigger value="predictions">Predictions</TabsTrigger>
          <TabsTrigger value="patterns">Patterns</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="insights" className="space-y-4">
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>High Priority Alert:</strong> Unusual spike in S0C4 abends detected in CLAIMS_BATCH jobs.
              Pattern suggests memory corruption in dataset processing module.
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-success" />
                  Trending Issues
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">S0C4 Memory Violations</span>
                  <Badge variant="destructive">+23%</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Dataset Size Overflow</span>
                  <Badge variant="secondary">+15%</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">JCL Parameter Issues</span>
                  <Badge variant="outline">+8%</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  Resolution Success
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Automated Fixes</span>
                  <span className="text-sm font-medium text-success">156 today</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Avg Resolution Time</span>
                  <span className="text-sm font-medium">12.3 minutes</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Manual Interventions</span>
                  <span className="text-sm font-medium text-warning-foreground">23 today</span>
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
                Predictive Analytics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">BILLING_RECONCILE Job</div>
                    <div className="text-sm text-muted-foreground">Likely to fail within 2 hours</div>
                  </div>
                  <Badge variant="destructive">85% Risk</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">MEMBER_SYNC_NIGHTLY</div>
                    <div className="text-sm text-muted-foreground">Increased runtime expected</div>
                  </div>
                  <Badge variant="secondary">62% Risk</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">CLAIMS_EXPORT_WEEKLY</div>
                    <div className="text-sm text-muted-foreground">Resource contention likely</div>
                  </div>
                  <Badge variant="outline">34% Risk</Badge>
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
                Pattern Recognition
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="p-3 border rounded-lg bg-error/5">
                  <div className="font-medium text-error mb-1">Memory Leak Pattern Detected</div>
                  <div className="text-sm text-muted-foreground mb-2">
                    Jobs starting with "CLAIMS_" showing progressive memory usage increase
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="text-xs">12 occurrences</Badge>
                    <Badge variant="outline" className="text-xs">Last 24h</Badge>
                  </div>
                </div>
                
                <div className="p-3 border rounded-lg bg-warning/5">
                  <div className="font-medium text-warning-foreground mb-1">Timing Correlation</div>
                  <div className="text-sm text-muted-foreground mb-2">
                    Abends peak during 8-10 AM window correlating with peak data volume
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="text-xs">Statistical significance: 89%</Badge>
                  </div>
                </div>

                <div className="p-3 border rounded-lg bg-info/5">
                  <div className="font-medium text-info mb-1">Dependency Chain Impact</div>
                  <div className="text-sm text-muted-foreground mb-2">
                    Upstream job failures causing cascading effects in 3+ downstream processes
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="text-xs">Impact score: High</Badge>
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
                AI Recommendations
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
                      <div className="font-medium text-success mb-1">Immediate Action Required</div>
                      <div className="text-sm text-muted-foreground">
                        Increase memory allocation for CLAIMS_BATCH_DAILY from 512MB to 1GB
                      </div>
                    </div>
                    <Badge variant="default">96% Confidence</Badge>
                  </div>
                  <Button size="sm" className="mt-2">Apply Recommendation</Button>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="font-medium mb-1">Optimization Opportunity</div>
                      <div className="text-sm text-muted-foreground">
                        Schedule MEMBER_UPDATE_JOB during off-peak hours (2-4 AM)
                      </div>
                    </div>
                    <Badge variant="outline">78% Confidence</Badge>
                  </div>
                  <Button variant="outline" size="sm" className="mt-2">Schedule Change</Button>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="font-medium mb-1">Preventive Measure</div>
                      <div className="text-sm text-muted-foreground">
                        Add checkpoint restart capability to long-running BILLING_RECONCILE job
                      </div>
                    </div>
                    <Badge variant="secondary">65% Confidence</Badge>
                  </div>
                  <Button variant="outline" size="sm" className="mt-2">Plan Implementation</Button>
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}