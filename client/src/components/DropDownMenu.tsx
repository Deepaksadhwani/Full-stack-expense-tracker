import { BiLogOut } from "react-icons/bi";
import { MdVerified } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FC } from "react";

interface DropDownMenuProps {
  navigate: (path: string) => void;
  onLogOutHandler: () => void;
  ontoggleDropMenu: (isOpen: boolean) => void;
}

const DropDownMenu: FC<DropDownMenuProps> = ({
  navigate,
  onLogOutHandler,
  ontoggleDropMenu,
}) => {
  const navigateProfilePageHandler = () => {
    navigate("/ProfilePage");
    ontoggleDropMenu(false);
  };

  const navigateEmailVerificationPageHandler = () => {
    navigate("/EmailVerification");
    ontoggleDropMenu(false);
  };

  return (
    <div className="absolute -bottom-28 right-8 z-10 flex w-[200px] flex-col rounded-lg border-2 border-black bg-gray-100 p-2 font-semibold text-gray-600">
      <div className="absolute -top-4 right-8 rotate-180 text-gray-100">⏷</div>
      <button
        onClick={navigateProfilePageHandler}
        className="dropdown border-b border-black"
      >
        <CgProfile />
        Profile
      </button>
      <button
        onClick={navigateEmailVerificationPageHandler}
        className="dropdown border-b border-black"
      >
        <MdVerified />
        Verify Email
      </button>
      <button className="dropdown" onClick={onLogOutHandler}>
        <BiLogOut />
        Logout
      </button>
    </div>
  );
};

export default DropDownMenu;
