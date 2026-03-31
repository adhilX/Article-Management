"use client";

import Link from "next/link";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../store/slice/authSlice";
import { useRouter } from "next/navigation";
import { registerUser } from "../../services/authServices";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, SignupFormData } from "../../validations/authSchema";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

export default function SignupPage() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormData) => {
    setLoading(true);

    try {
      const response = await registerUser(data);
      dispatch(setCredentials({
        user: { name: response.name, email: response.email },
        token: response.accessToken
      }));
      router.push("/");
    } catch (err: any) {
      console.error("Signup error:", err);
      toast.error(err.response?.data?.message || "An error occurred during signup");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center relative w-full h-full">
      {/* Signup card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-md px-8"
      >
        <motion.div
          className="bg-zinc-900/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-zinc-800"
          whileHover={{ boxShadow: "0 0 40px rgba(37, 99, 235, 0.15)" }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-block p-4 bg-blue-600 rounded-2xl mb-4 shadow-lg shadow-blue-500/30"
            >
              <svg
                className="w-12 h-12 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
            </motion.div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Create Account
            </h1>
            <p className="text-gray-400">Join to start writing articles</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-left">
            {/* Name input */}
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Full Name
              </label>
              <input
                type="text"
                {...register("name")}
                placeholder="John Doe"
                disabled={loading}
                className={`w-full px-4 py-3 bg-black border rounded-xl text-white placeholder-gray-500 focus:outline-none transition-all duration-300 ${
                  errors.name
                    ? "border-red-500 focus:border-red-500"
                    : "border-zinc-700 focus:border-blue-500"
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email input */}
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                {...register("email")}
                placeholder="you@example.com"
                disabled={loading}
                className={`w-full px-4 py-3 bg-black border rounded-xl text-white placeholder-gray-500 focus:outline-none transition-all duration-300 ${
                  errors.email
                    ? "border-red-500 focus:border-red-500"
                    : "border-zinc-700 focus:border-blue-500"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password input */}
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  placeholder="••••••••"
                  disabled={loading}
                  className={`w-full px-4 py-3 bg-black border rounded-xl text-white placeholder-gray-500 focus:outline-none transition-all duration-300 pr-12 ${
                    errors.password
                      ? "border-red-500 focus:border-red-500"
                      : "border-zinc-700 focus:border-blue-500"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-200 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit button */}
            <motion.button
              type="submit"
              disabled={loading}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              whileHover={{
                scale: 1.02,
                boxShadow: "0 0 30px rgba(37, 99, 235, 0.4)",
              }}
              whileTap={{ scale: 0.98 }}
              className={`w-full py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300 ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </motion.button>
          </form>

          <p className="mt-8 text-sm text-gray-400 text-center font-medium">
            Already have an account? <Link href="/login" className="text-white hover:text-blue-400 transition-colors ml-1">Sign in</Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
