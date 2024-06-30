import IMAGES from "@/assets/images";
import LoginForm from "@/components/forms/login-form";

const LoginPage = () => {
  return (
    <section className="flex items-center h-screen justify-evenly">
      <LoginForm />
      <div className="aspect-video">
        <img className="w-96" src={IMAGES.loginImg} alt="first image" />
      </div>
    </section>
  );
};

export default LoginPage;
