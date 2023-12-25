import LoginForm from "./components/LoginForm";
import LoginLogo from "./components/LoginLogo";
import SwitchDark from "@/components/SwitchDark";
import loginIllustration from "@/assets/images/login_illustration.svg";
import logo from "@/assets/images/logo.svg";
import "./index.less";

const Login: React.FC = () => {
  return (
    <div className="login-container">
      <div className="login-content">
        <SwitchDark />
        <div className="login-illustration">
          <img src={loginIllustration} alt="illustration" />
        </div>
        <div className="login-form">
          <div className="login-form-title">
            <img className="login-title-logo" src={"https://img.maiyadi.com/20/imgfile/20230927/27175603otci.png"} alt="logo" />
            <span className="login-title-text">login</span>
          </div>
          <LoginForm />
          <LoginLogo />
        </div>
      </div>
    </div>
  );
};

export default Login;
