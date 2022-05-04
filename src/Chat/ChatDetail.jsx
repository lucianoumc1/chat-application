import { Avatar } from "../ChatList/Avatar";
import { Menu } from "../Menu";

export function ChatDetail({ uImage, userName }) {
  return (
    <div className="chatDetail__container">
      <div className="userDetail__container">
        <Avatar uImage={uImage} />
        <div className="userDetail__name">{userName}</div>
      </div>
      <Menu>
        <li>Some Option</li>
      </Menu>
    </div>
  );
}
