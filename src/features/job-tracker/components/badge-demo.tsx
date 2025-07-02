/**
 * Demo component showing all badge variants
 * This demonstrates how to use the colored badges for job tracking
 */

import React from "react"

import { JobTypeBadge, PriorityBadge, StatusBadge } from "./badges"

export function BadgeDemo() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h2 className="mb-4 text-xl font-semibold">Job Tracker Badge Colors</h2>
        <p className="text-muted-foreground mb-6 text-sm">
          Demonstration of colored badges for status, priority, and job type in
          the job tracker
        </p>
      </div>

      {/* Status Badges */}
      <div className="space-y-3">
        <h3 className="text-lg font-medium">Status Badges</h3>
        <div className="flex flex-wrap gap-2">
          <StatusBadge status="applied" />
          <StatusBadge status="interview" />
          <StatusBadge status="offer" />
          <StatusBadge status="accepted" />
          <StatusBadge status="rejected" />
        </div>
      </div>

      {/* Priority Badges */}
      <div className="space-y-3">
        <h3 className="text-lg font-medium">Priority Badges</h3>
        <div className="flex flex-wrap gap-2">
          <PriorityBadge priority="low" />
          <PriorityBadge priority="medium" />
          <PriorityBadge priority="high" />
        </div>
      </div>

      {/* Job Type Badges */}
      <div className="space-y-3">
        <h3 className="text-lg font-medium">Job Type Badges</h3>
        <div className="flex flex-wrap gap-2">
          <JobTypeBadge jobType="full_time" />
          <JobTypeBadge jobType="part_time" />
          <JobTypeBadge jobType="contract" />
          <JobTypeBadge jobType="temporary" />
          <JobTypeBadge jobType="internship" />
          <JobTypeBadge jobType="remote" />
          <JobTypeBadge jobType="hybrid" />
          <JobTypeBadge jobType="freelance" />
        </div>
      </div>

      {/* Usage Example */}
      <div className="space-y-3">
        <h3 className="text-lg font-medium">Example Usage</h3>
        <div className="rounded-lg border bg-gray-50 p-4">
          <div className="mb-2 text-sm font-medium">
            Senior React Developer at TechCorp
          </div>
          <div className="flex flex-wrap gap-2">
            <StatusBadge status="interview" />
            <PriorityBadge priority="high" />
            <JobTypeBadge jobType="full_time" />
          </div>
        </div>
      </div>

      {/* Code Example */}
      <div className="space-y-3">
        <h3 className="text-lg font-medium">How to Use</h3>
        <div className="rounded-lg bg-gray-900 p-4 text-sm text-white">
          <pre className="whitespace-pre-wrap">
            {`import { StatusBadge, PriorityBadge, JobTypeBadge } from "../badges"

// Individual badges
<StatusBadge status="applied" />
<PriorityBadge priority="high" />
<JobTypeBadge jobType="full_time" />

// Group of badges
<div className="flex gap-2">
  <StatusBadge status={jobApplication.status} />
  <PriorityBadge priority={jobApplication.priority} />
  <JobTypeBadge jobType={jobApplication.job_type} />
</div>`}
          </pre>
        </div>
      </div>
    </div>
  )
}

export default BadgeDemo
