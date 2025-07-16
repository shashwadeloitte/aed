import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import styles from "./StatusCard.module.css";
import { STATUS_CARD_CONFIG } from "@/constants";

interface StatusCardProps {
  title: string;
  count: number | string;
  trend: number;
  status: "critical" | "warning" | "success" | "info";
  description: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

export function StatusCard({ title, count, trend, status, description, icon, onClick }: StatusCardProps) {
  const config = STATUS_CARD_CONFIG[status];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
      className={onClick ? "cursor-pointer" : ""}
    >
      <Card className={styles[config.cardClass]}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
          <div className={styles[config.iconClass]}>
            {icon}
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <div className={cn("text-3xl font-bold", styles[config.textClass])}>
                {typeof count === 'number' ? count.toLocaleString() : count}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {description}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}