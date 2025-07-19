import { useState, useCallback } from "react";

export interface AbendDetailApiResponse {
  abendId: string;
  abendedAt: string;
  jobId: string;
  jobName: string;
  jobStatus: string;
  incidentNumber: string;
  severity: string;
  domainArea: string;
  processStatus: string;
  abendActionStatus: string;
  orderId: string;
  faId: string;
  ai_confidence: string;
  assigned_to: string;
  serviceNowGroup: string;
}

export interface UseAbendDetailApiResult {
  data: AbendDetailApiResponse | null;
  loading: boolean;
  error: string | null;
  fetchAbendDetail: (trackingId: string) => void;
}

const API_BASE_URL = "https://adrportal-dev.elevancehealth.com:8000";

// Mock response data
const MOCK_ABEND_DETAIL_RESPONSE: AbendDetailApiResponse = {
  "abendId": "ABEND#WGMP001D#01K09RDG2AQYTEQD85RQ3AEFJ5",
  "abendedAt": "2025-06-10T07:32:00Z",
  "jobId": "JOB24111",
  "jobName": "WGMP001D",
  "jobStatus": "Unknown",
  "incidentNumber": "INC22101010",
  "severity": "High",
  "domainArea": "MM",
  "processStatus": "",
  "abendActionStatus": "",
  "orderId": "XQXGG",
  "faId": "",
  "ai_confidence": "87%",
  "assigned_to": "AI System",
  "serviceNowGroup": "MEMBER WGS APP PROJ SUP"
};

export function useAbendDetailApi(): UseAbendDetailApiResult {
  const [data, setData] = useState<AbendDetailApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAbendDetail = useCallback((trackingId: string) => {
    setLoading(true);
    setError(null);
    setData(null);
    
    // Simulate API delay
    setTimeout(() => {
      setData(MOCK_ABEND_DETAIL_RESPONSE);
      setLoading(false);
    }, 500);
    
    // Original API call code (commented out for now)
    /*
    const apiUrl = `${API_BASE_URL}/ui_api/v1alpha1/abends/${encodeURIComponent(trackingId)}`;
    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch abend detail");
        return res.json();
      })
      .then((data: AbendDetailApiResponse) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
    */
  }, []);

  return { data, loading, error, fetchAbendDetail };
}
