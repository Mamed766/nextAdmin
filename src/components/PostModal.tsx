"use client";
import { useState } from "react";
import { useRequestMutation } from "@/services/http/axiosFetcher";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function PostModal({ onClose }: { onClose: () => void }) {
  const { trigger: createProject } = useRequestMutation("data", {
    method: "POST",
    module: "imageApi",
  });

  const initialValues = {
    projectName: "",
    projectDesc: "",
    assignedDate: "",
    dueDate: "",
    status: "",
    priority: "High",
    projectImage: "",
  };

  const validationSchema = Yup.object({
    projectName: Yup.string().required("Project Name is required"),
    projectDesc: Yup.string().required("Project Description is required"),
    assignedDate: Yup.string().required("Assigned Date is required"),
    dueDate: Yup.string().required("Due Date is required"),
    status: Yup.number()
      .min(0, "Status should be grater than 0")
      .max(100, "Status cannot greater than 100")
      .required("Status is required"),
    priority: Yup.string().required("Priority is required"),
    projectImage: Yup.string().required("Image is required"),
  });

  const handleSubmit = async (values: any) => {
    try {
      await createProject({
        body: values,
      });
      onClose();
    } catch (error) {
      console.error("Hata:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded w-[400px]">
        <h2 className="text-xl font-bold mb-4">Create New Project</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => (
            <Form>
              <div className="mb-2">
                <Field
                  type="text"
                  name="projectName"
                  placeholder="Project Name"
                  className="border p-2 rounded w-full"
                />
                <ErrorMessage
                  name="projectName"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="mb-2">
                <Field
                  type="text"
                  name="projectDesc"
                  placeholder="Project Description"
                  className="border p-2 rounded w-full"
                />
                <ErrorMessage
                  name="projectDesc"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="mb-2">
                <Field
                  type="date"
                  name="assignedDate"
                  placeholder="Assigned Date"
                  className="border p-2 rounded w-full"
                />
                <ErrorMessage
                  name="assignedDate"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="mb-2">
                <Field
                  type="date"
                  name="dueDate"
                  placeholder="Due Date"
                  className="border p-2 rounded w-full"
                />
                <ErrorMessage
                  name="dueDate"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="mb-2">
                <Field
                  type="number"
                  name="status"
                  placeholder="Status"
                  className="border p-2 rounded w-full"
                />
                <ErrorMessage
                  name="status"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="mb-2">
                <Field
                  as="select"
                  name="priority"
                  className="border p-2 rounded w-full"
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </Field>
                <ErrorMessage
                  name="priority"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="mb-2">
                <input
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setFieldValue("projectImage", reader.result);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="border p-2 rounded w-full"
                />
                <ErrorMessage
                  name="projectImage"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded mt-4"
              >
                Create Project
              </button>
              <button
                onClick={onClose}
                className="bg-red-500 text-white p-2 rounded mt-4 ml-2"
                type="button"
              >
                Cancel
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
