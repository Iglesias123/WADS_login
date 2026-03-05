"use client";

import dynamic from "next/dynamic";
import "swagger-ui-react/swagger-ui.css";

const SwaggerUI = dynamic(() => import("swagger-ui-react"), { ssr: false });

const spec = {
  openapi: "3.0.0",
  info: {
    title: "Iglesias Assignment Log Book App",
    version: "1.0.0",
  },
  paths: {
    "/api/assignment": {
      get: {
        summary: "Get all assignments",
        tags: ["Assignment"],
        parameters: [
          {
            name: "status",
            in: "query",
            schema: {
              type: "string",
              enum: ["Create", "On Process", "Submitted"],
            },
            description: "Filter by status",
          },
        ],
        responses: {
          200: { description: "List of assignments" },
          401: { description: "Unauthorized" },
        },
      },
      post: {
        summary: "Create new assignment",
        tags: ["Assignment"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["title", "dueDate"],
                properties: {
                  title: { type: "string", example: "Web Programming Assignment" },
                  description: { type: "string", example: "Make REST API with Next.js" },
                  dueDate: { type: "string", example: "2026-05-03" },
                  status: {
                    type: "string",
                    enum: ["Create", "On Process", "Submitted"],
                    example: "Create",
                  },
                },
              },
            },
          },
        },
        responses: {
          201: { description: "Assignment created successfully" },
          400: { description: "Validation error" },
        },
      },
    },
    "/api/assignment/{id}": {
      get: {
        summary: "Get assignment detail",
        tags: ["Assignment"],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "integer" }, example: 1 },
        ],
        responses: {
          200: { description: "Assignment detail" },
          404: { description: "Assignment not found" },
        },
      },
      put: {
        summary: "Update assignment",
        tags: ["Assignment"],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "integer" }, example: 1 },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  title: { type: "string" },
                  description: { type: "string" },
                  dueDate: { type: "string" },
                  status: {
                    type: "string",
                    enum: ["Create", "On Process", "Submitted"],
                  },
                },
              },
            },
          },
        },
        responses: {
          200: { description: "Assignment updated successfully" },
          400: { description: "Invalid value" },
          404: { description: "Assignment not found" },
        },
      },
      delete: {
        summary: "Delete assignment",
        tags: ["Assignment"],
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "integer" }, example: 1 },
        ],
        responses: {
          200: { description: "Assignment deleted successfully" },
          404: { description: "Assignment not found" },
        },
      },
    },
  },
};

export default function DocsPage() {
  return <SwaggerUI spec={spec} />;
}