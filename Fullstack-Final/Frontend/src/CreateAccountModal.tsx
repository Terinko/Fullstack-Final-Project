import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const createAccountSchema = z.object({
  userType: z.enum(["Student", "Faculty/Administrator"]),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().min(1, "Email prefix is required"),
});

type CreateAccountFormData = z.infer<typeof createAccountSchema>;

interface CreateAccountModalProps {
  showModal: boolean;
  onClose: () => void;
  onContinue: (userData: {
    email: string;
    firstName: string;
    lastName: string;
    userType: string;
  }) => void;
}

const CreateAccountModal: React.FC<CreateAccountModalProps> = ({
  showModal,
  onClose,
  onContinue,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateAccountFormData>({
    resolver: zodResolver(createAccountSchema),
    defaultValues: {
      userType: "Student",
      firstName: "",
      lastName: "",
      email: "",
    },
  });

  const onSubmit = (data: CreateAccountFormData) => {
    // Pass the data forward to the password step.
    onContinue({
      email: data.email.toLowerCase(),
      firstName: data.firstName,
      lastName: data.lastName,
      userType: data.userType,
    });
    reset();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  if (!showModal) return null;

  return (
    <div
      className="modal fade show d-block"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      onClick={handleClose}
    >
      <div
        className="modal-dialog modal-dialog-centered modal-dialog-scrollable"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Create Account</h5>
            <button
              type="button"
              className="btn-close"
              onClick={handleClose}
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <label className="form-label">Account Type</label>
                <select
                  className={`form-select ${errors.userType ? "is-invalid" : ""}`}
                  {...register("userType")}
                >
                  <option value="Student">Student</option>
                  <option value="Faculty/Administrator">
                    Faculty/Administrator
                  </option>
                </select>
                {errors.userType && (
                  <div className="invalid-feedback">
                    {errors.userType.message}
                  </div>
                )}
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
                  placeholder="First Name"
                  {...register("firstName")}
                />
                {errors.firstName && (
                  <div className="invalid-feedback">
                    {errors.firstName.message}
                  </div>
                )}
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
                  placeholder="Last Name"
                  {...register("lastName")}
                />
                {errors.lastName && (
                  <div className="invalid-feedback">
                    {errors.lastName.message}
                  </div>
                )}
              </div>

              <div className="mb-3">
                <div className="input-group has-validation">
                  <input
                    type="text"
                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
                    placeholder="Quinnipiac E-Mail"
                    {...register("email")}
                  />
                  <span className="input-group-text" id="basic-addon2">
                    @quinnipiac.edu
                  </span>
                  {errors.email && (
                    <div className="invalid-feedback">
                      {errors.email.message}
                    </div>
                  )}
                </div>
              </div>

              <div className="d-flex gap-2">
                <button type="submit" className="btn btn-dark flex-grow-1">
                  Next: Create Password
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={handleClose}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAccountModal;
