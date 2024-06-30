import { useAuthState } from "react-firebase-hooks/auth";
import HomePage from "@components/home-page";
import LoginPage from "@pages/login-page";
import { auth } from "@/firebase/setup";
import "@/App.css";

function App() {
  const [user] = useAuthState(auth);
  return user ? <HomePage /> : <LoginPage />;
}

export default App;
