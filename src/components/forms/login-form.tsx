import React, { useState } from "react";
import { CgSpinner } from "react-icons/cg";
import { toast, Toaster } from "react-hot-toast";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import {
  ConfirmationResult,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

import { auth } from "@/firebase/setup";
import FormInput from "@components/ui/form-input";

declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier | null;
    confirmationResult: ConfirmationResult | null;
  }
}

const LoginForm = () => {
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);

  const onCaptchVerify = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response: string | null | undefined) => {
            if (response) {
              onSignup();
            }
          },
          "expired-callback": () => {},
        }
      );
    }
  };

  const onSignup = () => {
    setLoading(true);
    onCaptchVerify();

    const appVerifier = window.recaptchaVerifier as RecaptchaVerifier;

    const formatPh = "+" + ph;

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult as ConfirmationResult;
        setLoading(false);
        setShowOTP(true);
        toast.success("OTP sent successfully!");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const onOTPVerify = async () => {
    try {
      setLoading(true);
      const res = await (
        window.confirmationResult as ConfirmationResult
      ).confirm(otp);
      console.log(res);
      setLoading(false);
      toast.success("OTP verification successful!");
    } catch (err) {
      console.error("Error verifying OTP:", err);
      toast.error("Failed to verify OTP. Please try again.");
      setLoading(false);
    }
  };

  return (
    <React.Fragment>
      <Toaster toastOptions={{ duration: 4000 }} />
      <div id="recaptcha-container"></div>

      <div>
        {showOTP ? (
          <>
            <h1 className="text-2xl font-bold text-left">Verify code</h1>
            <p className="mt-4 text-sm text-left text-slate-500">
              An authentication code has been sent to your email.
            </p>
            <div className="my-7">
              <FormInput
                inputType="number"
                placeholder="XXXXXX"
                label="Enter Code"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <button
                onClick={onOTPVerify}
                className="bg-[#515DEF] mt-4 transition-colors duration-300 ease-in-out hover:bg-[#5e6af0] w-full flex gap-1 items-center justify-center py-2 px-4 text-white rounded-md"
              >
                {loading && (
                  <CgSpinner size={20} className="mt-1 animate-spin" />
                )}
                <span>Verify</span>
              </button>
            </div>
            <p className="text-left">
              Didn’t receive a code? <a href="/">Resend</a>
            </p>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-left">Login</h1>
            <p className="mt-4 text-sm text-left text-slate-500">
              Login to access your travelwise account
            </p>
            <div className="my-7">
              <PhoneInput country={"in"} value={ph} onChange={setPh} />
              <button
                onClick={onSignup}
                className="bg-[#515DEF] mt-4 transition-colors duration-300 ease-in-out hover:bg-[#5e6af0] w-full flex gap-1 items-center justify-center py-2 px-4 text-white rounded-md"
              >
                {loading && (
                  <CgSpinner size={20} className="mt-1 animate-spin" />
                )}
                <span>Get OTP</span>
              </button>
            </div>
            <p>
              Don’t have an account? <a href="/">Sign up</a>
            </p>
          </>
        )}
      </div>
    </React.Fragment>
  );
};

export default LoginForm;
