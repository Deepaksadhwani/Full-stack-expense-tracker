import { BiLogOut } from "react-icons/bi";

import { FC } from "react";

interface DropDownMenuProps {
  onLogOutHandler: () => void;
}

const DropDownMenu: FC<DropDownMenuProps> = ({ onLogOutHandler }) => {
  return (
    <div className="absolute -bottom-10 right-8 z-10 flex w-[200px] flex-col rounded-lg border-2 border-black bg-gray-100 p-2 font-semibold text-gray-600">
      <div className="absolute -top-4 right-8 rotate-180 text-gray-100">⏷</div>

      <button className="dropdown" onClick={onLogOutHandler}>
        <BiLogOut />
        Logout
      </button>
    </div>
  );
};

export default DropDownMenu;
