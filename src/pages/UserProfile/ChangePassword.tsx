import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FiLock, FiSave } from "react-icons/fi";
import { useChangePasswordMutation } from "../../redux/features/auth/authApi";
import { logout } from "../../redux/features/auth/authSlice";
import { useAppDispatch } from "../../redux/features/hooks";
import { APIErrorType } from "../../interfaces/interfaces";

interface ChangePasswordData {
    oldPassword: string;
    newPassword: string;
  }

export default function ChangePassword() {

    const dispatch = useAppDispatch();
    const [isChangingPassword, setIsChangingPassword] = useState(false); // State for password change section

    const [changePassword] = useChangePasswordMutation();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors: passwordErrors },
        } = useForm<ChangePasswordData>();



    const onSubmit: SubmitHandler<ChangePasswordData> = async (newData) => {
        try {
            const res = await changePassword(newData);

            if (!res?.error) {
                toast.success("Password changed successfully!");
                setIsChangingPassword(false);
                dispatch(logout());
          reset();
            } else {
                toast.error("Invalid Credentials!");
                dispatch(logout());
              }
          
        } catch (error: unknown) {
          const errorMessage =
          (error as APIErrorType)?.data?.message || "Failed to authenticate!";
        toast.error(errorMessage);
      }
    };
  return (
    <div className="mt-6">
          <button
            onClick={() => setIsChangingPassword(!isChangingPassword)}
            className="flex items-center justify-center gap-2 w-full py-2 bg-primary text-base-100 rounded-lg hover:bg-primary/80"
          >
            <FiLock />
            Change Password
          </button>

          {isChangingPassword && (
            <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
              <div>
                <input
                  type="password"
                  {...register("oldPassword", {
                    required: true,
                  })}
                  className={`w-full px-3 py-2 border rounded-md outline-none ${passwordErrors.oldPassword && "border-red-500"}`}
                  placeholder="Old Password"
                />
              </div>

              <div>
                <input
                  type="password"
                  {...register("newPassword", {
                    required: "New password is required",
                  })}
                  className={`w-full px-3 py-2 border rounded-md outline-none ${passwordErrors.newPassword && "border-red-500"}`}
                  placeholder="New Password"
                />
              </div>

              <button
                type="submit"
                className="bg-green-600 text-white w-full py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-green-700"
              >
                <FiSave />
                Change Password
              </button>
            </form>
          )}
        </div>
  )
}
