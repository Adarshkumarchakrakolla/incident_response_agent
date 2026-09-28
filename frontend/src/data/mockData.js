// RECALL — Hackathon Prototype Data
// Differentiators: Hindsight Memory, Failed Fix Memory, Outdated Detection, Engineer Feedback, Continuous Learning

export const INCIDENTS_DATA = {
  incident1: {
    id: "INC-2026-01",
    tag: "DEMO INCIDENT",
    title: "Payment API is failing",
    subtitle: "Redis authentication error",
    impact: "31% requests failing",
    logs: [
      "ERROR Redis AUTH failed",
      "ERROR Payment request returned HTTP 500",
      "ERROR Redis connection rejected"
    ],
    hindsight: {
      pastIncidentId: "INC-1842",
      pastService: "Payment API",
      similarity: "91% similar",
      whySimilar: [
        "Same service",
        "Same error",
        "Same dependency"
      ],
      likelyCause: "Expired Redis credential after secret rotation",
      workedBefore: [
        "Rotate Redis credential",
        "Restart workers"
      ],
      failedBefore: [
        "Restart API",
        "Rollback deployment"
      ],
      dontTryFirst: {
        action: "Restart API",
        reason: "It failed in INC-1842.",
        detail: "INC-1842\nRestart API → did not fix the Redis authentication problem."
      },
      outdatedWarning: {
        title: "POSSIBLY OUTDATED",
        text: "An older fix depends on Redis configuration that changed after the incident.",
        advice: "Verify before using this fix."
      },
      recommendation: {
        action: "Check the Redis credential.",
        why: "2 similar incidents were fixed after checking the credential.",
        confidence: "High",
        basedOn: ["INC-1842", "INC-1911"]
      }
    }
  },

  incident2: {
    id: "INC-2026-02",
    tag: "DEMO INCIDENT",
    // Note: Rephrased wording as specifically requested in Section 10
    title: "Payment service cannot authenticate with Redis",
    subtitle: "Redis connection rejected",
    impact: "28% requests failing",
    logs: [
      "ERROR Payment service cannot authenticate with Redis",
      "ERROR Payment request returned HTTP 500",
      "ERROR Redis connection rejected"
    ],
    hindsight: {
      pastIncidentId: "Payment API (Just resolved)",
      pastService: "Payment API",
      similarity: "96% similar",
      whySimilar: [
        "Same service & dependency",
        "Same underlying Redis authentication failure",
        "Matches fix verified 2 minutes ago"
      ],
      likelyCause: "Expired Redis credential after secret rotation",
      workedBefore: [
        "Check the Redis credential",
        "Rotate Redis credential"
      ],
      failedBefore: [
        "Restart API (Failed in INC-1842)",
        "Rollback deployment"
      ],
      dontTryFirst: {
        action: "Restart API",
        reason: "It failed in INC-1842.",
        detail: "INC-1842\nRestart API → did not fix the Redis authentication problem."
      },
      outdatedWarning: null, // Outdated warning only applies to old configuration
      recommendation: {
        action: "Check the Redis credential.",
        why: "Remembered from the incident you just resolved.",
        confidence: "High",
        basedOn: ["Payment API (Just resolved)", "INC-1842"]
      }
    }
  }
};

export const PAST_INCIDENTS_INSPECTOR = [
  {
    id: "INC-1842",
    title: "Redis credential issue",
    role: "✓ Used in answer",
    type: "success",
    detail: "Redis password expired after vault rotation. Resolved by credential rotation."
  },
  {
    id: "INC-1911",
    title: "Redis credential issue",
    role: "✓ Used in answer",
    type: "success",
    detail: "Worker pod auth rejected. Resolved by checking credential."
  },
  {
    id: "INC-2031",
    title: "API restart failed",
    role: "✓ Used to avoid bad fix",
    type: "failed",
    detail: "Restarting API pods failed to fix authentication and caused service delay."
  }
];

export const COMPARISON_DATA = {
  withoutMemory: {
    likelyCause: "Could be Redis, network, or configuration.",
    recommendation: "Check service configuration.",
    evidence: "None",
    failedFixes: "None known (might suggest restarting API!)"
  },
  withRecall: {
    likelyCause: "Expired Redis credential.",
    recommendation: "Check Redis credential first.",
    evidence: "INC-1842\nINC-1911",
    failedFixes: "Restart API"
  }
};
