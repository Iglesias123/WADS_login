"use client";

import dynamic from "next/dynamic";
import "swagger-ui-react/swagger-ui.css";

const SwaggerUI = dynamic(() => import("swagger-ui-react"), {
  ssr: false,
});

const spec = {
  openapi: "3.0.0",
  info: {
    title: "User API",
    version: "1.0.0",
  },
  paths: {
    "/api/users": {
      get: {
        summary: "Get all users",
        responses: {
          200: { description: "Success" },
        },
      },
      post: {
        summary: "Create new user",
        responses: {
          201: { description: "User created" },
        },
      },
    },
    "/api/users/{id}": {
      get: {
        summary: "Get user by ID",
      },
      put: {
        summary: "Update user",
      },
      delete: {
        summary: "Delete user",
      },
    },
  },
};

export default function DocsPage() {
  return <SwaggerUI spec={spec} />;
}