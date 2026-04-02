const DEFAULT_TASKS_BY_ROLE = {
  patient: [
    {
      title: "Complete health profile",
      description: "Add your profile details and maintain accurate contact information.",
      priority: "high"
    },
    {
      title: "Find suitable specialist",
      description: "Search doctors by specialization and location for your current concern.",
      priority: "medium"
    }
  ],
  doctor: [
    {
      title: "Create professional profile",
      description: "Add qualification, specialization, fees, and clinic location.",
      priority: "high"
    },
    {
      title: "Review assigned patient queue",
      description: "Check pending consultations and keep treatment notes updated.",
      priority: "medium"
    }
  ],
  hospital: [
    {
      title: "Validate transfer workflow",
      description: "Perform one secure patient record transfer to verify integration.",
      priority: "high"
    },
    {
      title: "Audit record handoff logs",
      description: "Confirm all record exchange events are reviewed by operations.",
      priority: "medium"
    }
  ],
  pharmacy: [
    {
      title: "Register pharmacy profile",
      description: "Provide store details and geolocation for discovery.",
      priority: "high"
    },
    {
      title: "Verify contact channels",
      description: "Ensure public contact information is accurate for patient outreach.",
      priority: "low"
    }
  ],
  admin: [
    {
      title: "Assign tasks to all roles",
      description: "Create and distribute operational tasks for patients, doctors, hospitals, and pharmacies.",
      priority: "high"
    },
    {
      title: "Monitor workflow completion",
      description: "Track pending and completed tasks across the organization.",
      priority: "medium"
    }
  ]
};

function getDefaultTasksForRole(role) {
  return DEFAULT_TASKS_BY_ROLE[role] || [];
}

module.exports = { getDefaultTasksForRole };
