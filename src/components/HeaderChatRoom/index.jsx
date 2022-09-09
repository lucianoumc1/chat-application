import { Avatar } from "../Avatar";
import { Menu } from "../Menu";
import "./HeaderChatRoom.css";

export function HeaderChatRoom({ uImage, userName }) {
  return (
    <div className="header-chat-room__container">
      <div className="header-chat__partner">
        <Avatar uImage={uImage} />
        <div className="partner__name">{userName}</div>
      </div>
      <Menu>
        <li>
          <button type="button">Some Option</button>
        </li>
      </Menu>
    </div>
  );
}
