import { auth } from "@/firebase/setup";

const HomePage = () => {
  const logout = () => {
    auth.signOut();
  };

  return (
    <div className="mt-7">
      <center>
        <h3>
          Welcome
          {auth.currentUser ? auth.currentUser.phoneNumber : ""}
        </h3>
        <button className="ml-5" onClick={logout}>
          Logout
        </button>
      </center>
    </div>
  );
};

export default HomePage;
