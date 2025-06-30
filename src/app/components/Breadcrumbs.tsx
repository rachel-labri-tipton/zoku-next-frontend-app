'use client'

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { Breadcrumbs as MuiBreadcrumbs, Typography } from "@mui/material";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

// Map path segments to human-readable names and routes
const pathMap: Record<string, { label: string; href: string }> = {
  "calendar": { label: "Calendar", href: "/calendar" },
  "week": { label: "Week View", href: "/week" },
  "day": { label: "Day View", href: "/day" },
  "login": { label: "Login", href: "/login" },
};

export default function Breadcrumbs() {
  const router = useRouter();
  const pathname = usePathname();
  
  // Remove leading/trailing slashes and split into segments
  const segments = pathname.replace(/^\/|\/$/g, "").split("/").filter(Boolean);

  // Build crumb data
  const crumbs = [{ label: "Home", href: "/" }].concat(
    segments.map((seg, idx) => {
      const mapData = pathMap[seg];
      return mapData
        ? { label: mapData.label, href: mapData.href }
        : { 
            label: seg.charAt(0).toUpperCase() + seg.slice(1), 
            href: "/" + segments.slice(0, idx + 1).join("/") 
          };
    })
  );

  return (
    <MuiBreadcrumbs 
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
      sx={{ my: 2 }}
    >
      {crumbs.map((crumb, index) => {
        const isLast = index === crumbs.length - 1;
        
        return isLast ? (
          <Typography key={crumb.href} color="text.primary" sx={{ fontWeight: 500 }}>
            {crumb.label}
          </Typography>
        ) : (
          <Link
            key={crumb.href}
            href={crumb.href}
            style={{
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            {crumb.label}
          </Link>
        );
      })}
    </MuiBreadcrumbs>
  );
}