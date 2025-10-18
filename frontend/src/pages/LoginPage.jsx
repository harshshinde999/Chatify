import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import { MessageCircleIcon, MailIcon, LoaderIcon, LockIcon } from "lucide-react";
import { Link } from "react-router";

function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className=" w-fit min-h-min flex items-center justify-center p-4 bg-gradient-to-tr from-slate-900 to-slate-800">
      <div className="relative w-full max-w-6xl md:h-[550px] h-[700px]">
        <BorderAnimatedContainer>
          <div className="w-full flex flex-col md:flex-row bg-slate-900/70 rounded-3xl shadow-2xl overflow-hidden">
            {/* FORM COLUMN - LEFT SIDE */}
            <div className="md:w-1/2 p-10 flex items-center justify-center border-r border-slate-600/30">
              <div className="w-full max-w-md">
                {/* HEADING TEXT */}
                <div className="text-center mb-8">
                  <MessageCircleIcon className="w-12 h-12 mx-auto text-cyan-400 mb-4" />
                  <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
                  <p className="text-gray-400">Login to access your account</p>
                </div>

                {/* FORM */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* EMAIL INPUT */}
                  <div>
                    <label className="block text-gray-300 mb-1 font-medium">Email</label>
                    <div className="relative">
                      <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full py-3 pl-10 pr-4 rounded-xl bg-slate-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition"
                        placeholder="example@gmail.com"
                      />
                    </div>
                  </div>

                  {/* PASSWORD INPUT */}
                  <div>
                    <label className="block text-gray-300 mb-1 font-medium">Password</label>
                    <div className="relative">
                      <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="w-full py-3 pl-10 pr-4 rounded-xl bg-slate-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition"
                        placeholder="Enter your password"
                      />
                    </div>
                  </div>

                  {/* SUBMIT BUTTON */}
                  <button
                    className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white font-semibold shadow-md transition duration-200 disabled:opacity-50 flex justify-center items-center gap-2"
                    type="submit"
                    disabled={isLoggingIn}
                  >
                    {isLoggingIn ? <LoaderIcon className="w-5 h-5 animate-spin" /> : "Sign In"}
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <Link to="/signup" className="text-cyan-400 hover:underline font-medium">
                    Don't have an account? Sign Up
                  </Link>
                </div>
              </div>
            </div>

            {/* FORM ILLUSTRATION - RIGHT SIDE */}
            <div className="hidden md:w-1/2 md:flex items-center justify-center p-6 bg-gradient-to-bl from-slate-800/20 to-transparent">
              <div className="text-center">
                <img
                  src="/login.png"
                  alt="People using mobile devices"
                  className="w-full h-auto object-contain rounded-2xl shadow-lg"
                />
                <div className="m-5 pb-10">
                  <h3 className="text-xl font-semibold text-cyan-400">Connect anytime, anywhere</h3>

                  
                </div>
              </div>
            </div>
          </div>
        </BorderAnimatedContainer>
      </div>
    </div>
  );
}

export default LoginPage;
