"use client";
import { useRequestMutation } from "@/services/http/axiosFetcher";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { mutate } from "swr";
import * as Yup from "yup";

export default function EditModal({
  card,
  onClose,
}: {
  card: any;
  onClose: () => void;
}) {
  const { trigger: updateProject } = useRequestMutation("dataWithId", {
    method: "PUT",
    module: "imageApi",
  });

  const initialValues = {
    projectImage: card?.projectImage || "",
    projectName: card?.projectName || "",
    projectDesc: card?.projectDesc || "",
    assignedDate: card?.assignedDate || "",
    dueDate: card?.dueDate || "",
    status: card?.status || "",
    priority: card?.priority || "",
  };

  const validationSchema = Yup.object({
    projectName: Yup.string().required("Project Name is required"),
    projectDesc: Yup.string().required("Project Description is required"),
    assignedDate: Yup.string().required("Assigned Date is required"),
    dueDate: Yup.string().required("Due Date is required"),
    status: Yup.number()
      .min(0, "Status must be at least 0")
      .max(100, "Status cannot exceed 100")
      .required("Status is required"),
    priority: Yup.string().required("Priority is required"),
  });

  const handleSubmit = async (values: any) => {
    try {
      await updateProject({
        body: values,
        dynamicValue: card.id,
      });
      mutate("data");
      onClose();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded w-[400px]">
        <h2 className="text-xl font-bold mb-4">Edit Project</h2>
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

              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded mt-4"
              >
                Save Changes
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
