// register
import RegisterForm from "../../src/components/units/register"; // Make sure to import the correct path
import { useRecoilState } from "recoil";
import { isLoginVisibleState } from "../../src/components/commons/recoilState";

const RegisterPage = (): JSX.Element => {
  const [isLoginVisible, setIsLoginVisible] =
    useRecoilState(isLoginVisibleState);
  setIsLoginVisible(false);
  return RegisterForm(); // Call the registerForm function to render the JSX content
};

export default RegisterPage;
