"use client";
import StatCard from "@/src/components/elements/StatCard";
import React from "react";

export default function AdminPendingOrderCard({ stats, isLoading, error }: any) {
  return (
    <StatCard
      error={error}
      length={isLoading ? 0 : stats.get_admin_pendingorder.length}
      name={"Total Pending Orders"}
      svg={
        <svg
          width="25px"
          height="25px"
          viewBox="0 0 24 24"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="grid_system" />

          <g id="_icons">
            <path d="M17,2c-1.3,0-2.4,0.5-3.3,1.2c0,0-0.1,0-0.1-0.1C11.9,2.8,10,3.1,8.5,3.9C6.3,5.2,5,7.5,5,10v5.5c-0.6,0.5-1,1.2-1,2   C4,18.9,5.1,20,6.5,20h2.7c0.4,1.2,1.5,2,2.8,2s2.4-0.8,2.8-2h2.7c1.4,0,2.5-1.1,2.5-2.5c0-0.8-0.4-1.5-1-2v-3.9c0,0,0,0,0,0   c1.8-0.8,3-2.5,3-4.6C22,4.2,19.8,2,17,2z M17.5,18H14h-4H6.5C6.2,18,6,17.8,6,17.5S6.2,17,6.5,17h11c0.3,0,0.5,0.2,0.5,0.5   S17.8,18,17.5,18z M17,15H7v-5c0-1.8,1-3.4,2.5-4.3C10.4,5.2,11.4,5,12.4,5C12.1,5.6,12,6.3,12,7c0,2.8,2.2,5,5,5V15z M17,10   c-1.7,0-3-1.3-3-3s1.3-3,3-3s3,1.3,3,3S18.7,10,17,10z" />

            <path d="M18.7,5.3c-0.4-0.4-1-0.4-1.4,0L17,5.6l-0.3-0.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4L15.6,7l-0.3,0.3c-0.4,0.4-0.4,1,0,1.4   C15.5,8.9,15.7,9,16,9s0.5-0.1,0.7-0.3L17,8.4l0.3,0.3C17.5,8.9,17.7,9,18,9s0.5-0.1,0.7-0.3c0.4-0.4,0.4-1,0-1.4L18.4,7l0.3-0.3   C19.1,6.3,19.1,5.7,18.7,5.3z" />
          </g>
        </svg>
      }
    />
  );
}
