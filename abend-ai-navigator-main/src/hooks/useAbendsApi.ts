import { useState, useCallback } from "react";

// Single abend object type
export interface AbendsApiAbend {
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

// Pagination info type
export interface AbendsApiPagination {
  nextPageToken: string;
  hasMore: boolean;
  limit: number;
}

// Full API response type
export interface AbendsApiResponse {
  abends: AbendsApiAbend[];
  pagination: AbendsApiPagination;
}

export interface UseAbendsApiResult {
  data: AbendsApiAbend[];
  loading: boolean;
  error: string | null;
  fetchAbends: () => void;
}

const API_BASE_URL = "https://adrportal-dev.elevancehealth.com:8000";

export function useAbendsApi(): UseAbendsApiResult {
  const [data, setData] = useState<AbendsApiAbend[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAbends = useCallback(() => {
    setLoading(true);
    setError(null);

    const apiUrl = ` /ui_api/v1alpha1/abends?limit=5`;

    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch abends");
        return res.json();
      })
      .then((data: AbendsApiResponse) => {
        setData(Array.isArray(data.abends) ? data.abends : []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { data, loading, error, fetchAbends };
}
