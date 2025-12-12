export type OpkEventType =
  | "WARDEN_DECISION"
  | "JUDICIARY_VERDICT"
  | "ORIGIN_HEALTH_CHANGED"
  | "JOB_QUEUED"
  | "JOB_STARTED"
  | "JOB_FINISHED"
  | "JOB_FAILED"
  | "GRAVEYARD_ENTRY"
  | "CHAOS_INJECTION"
  | "KILL_SWITCH"
  | "SYSTEM_NOTICE";

export type OpkSeverity = "DEBUG" | "INFO" | "WARN" | "ERROR" | "CRITICAL";

export type OpkEvent = {
  id: string;
  ts: string; // ISO
  type: OpkEventType;
  severity: OpkSeverity;

  origin_id?: string;
  job_id?: string;
  workspace_id?: string;

  verdict?: "ALLOW" | "SANDBOX" | "REJECT";
  health_state?: "HEALTHY" | "INEFFICIENT" | "TOXIC" | "UNKNOWN";

  summary: string;
  details?: Record<string, any>;
  tags?: string[];
};

export type GraveyardVerdict = {
  id: string;
  ts: string;
  severity: OpkSeverity;
  title: string;
  cause: string;

  origin_id?: string;
  job_id?: string;

  payload?: Record<string, any>;
  raw_event?: Record<string, any>;
  tags?: string[];
};
