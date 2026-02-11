"use client";

import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

export default function ApiReferencePage() {
  return (
    <div className="p-6">
      <SwaggerUI url="/openapi.json" />
    </div>
  );
}