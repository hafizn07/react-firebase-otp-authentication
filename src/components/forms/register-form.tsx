import IMAGES from "@/assets/images";
import FormInput from "@components/ui/form-input";

const RegisterForm = () => {
  return (
    <div className="flex items-center justify-evenly">
      <div className="aspect-video">
        <img className="w-96" src={IMAGES.registerImg} alt="first image" />
      </div>
      <div>
        <h1 className="text-2xl font-bold text-left">Sign up</h1>
        <p className="mt-4 text-sm text-left text-slate-500">
          Let’s get you all st up so you can access your personal account.
        </p>
        <form className="my-7">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <FormInput placeholder="john" label="First Name" inputType="text" />
            <FormInput placeholder="doe" label="Last Name" inputType="text" />
            <div className="col-span-2">
              <FormInput
                placeholder="john.doe@gmail.com"
                label="Email"
                inputType="email"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <input type="checkbox" name="agree" id="agree" />
            <p>
              I agree to all the <a href="/">Terms</a> and{" "}
              <a href="/">Privacy Policies</a>
            </p>
          </div>

          <button className="bg-[#515DEF] py-2 px-4 text-white rounded-md w-full">
            Create account
          </button>
        </form>
        <p>
          Already have an account? <a href="/">Login</a>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
