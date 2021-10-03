import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation, useHistory } from "react-router-dom";
import {
  Dropdown,
  Icon,
  Nav,
  Navbar,
  Sidebar as SideBar,
  Sidenav,
  Tooltip,
  Whisper,
} from "rsuite";

import { icons } from "../../assets";
import { SidebarItem } from "../../types/object";
//@ts-ignore
import Flags from "country-flag-icons/react/3x2";
import {
  getLocalizedComponents,
  languageSelector,
  themeSelector,
} from "../../redux/selectors";
import { setLanguage, setTheme } from "../../redux/actions/systemActions";
import { logout } from "../../redux/actions/userActions";

const iconStyles = {
  width: 56,
  height: 56,
  lineHeight: "56px",
};

const languagesArray = [
  { label: "English", value: "en", role: "Country" },
  { label: "Turkish", value: "tr", role: "Country" },
];

type NavToggleProps = {
  expand: boolean;
  onChange: () => void;
};

const NavToggle = ({ expand, onChange }: NavToggleProps) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const language = useSelector(languageSelector);
  const theme = useSelector(themeSelector);
  const strings = useSelector(getLocalizedComponents);

  return (
    <Navbar className="nav-toggle">
      <Navbar.Body>
        <Nav>
          <Dropdown
            placement="topStart"
            trigger="click"
            renderTitle={(children) => {
              return (
                <Icon
                  style={{ ...iconStyles, textAlign: "center" }}
                  icon="cog"
                />
              );
            }}
          >
            <Dropdown.Item onSelect={() => dispatch(logout())}>
              {strings.getString("logout")}
            </Dropdown.Item>
          </Dropdown>
        </Nav>

        <Whisper
          placement="top"
          trigger="hover"
          speaker={
            <Tooltip>{`Switch to ${
              theme === "dark" ? "light" : "dark"
            }`}</Tooltip>
          }
        >
          <Nav>
            <Nav.Item
              style={{ width: 56, textAlign: "center" }}
              onSelect={async () => {
                await dispatch(setTheme(theme === "dark" ? "light" : "dark"));
                history.go(0);
              }}
            >
              <Icon icon={theme === "dark" ? "sun-o" : "moon-o"} />
            </Nav.Item>
          </Nav>
        </Whisper>
        <Nav>
          <Dropdown
            placement="topStart"
            title={
              language === "en" ? (
                <div style={{ width: 20, marginBlockStart: 1 }}>
                  <Flags.GB title={language} className="flag" />
                </div>
              ) : (
                <div style={{ width: 20, marginBlockStart: 1 }}>
                  <Flags.TR title={language} className="flag" />
                </div>
              )
            }
            onSelect={(e) => {
              dispatch(setLanguage(e));
            }}
          >
            {languagesArray.map((item, i) => (
              <Dropdown.Item key={i} eventKey={item.value}>
                <div style={{ display: "flex" }}>
                  <div
                    style={{
                      width: 18,
                      height: 18,
                      marginInlineEnd: 10,
                      marginBlockStart: 1,
                    }}
                  >
                    {item.value === "en" && (
                      <Flags.GB title={item.label} className="flag" />
                    )}
                    {item.value === "tr" && (
                      <Flags.TR title={item.label} className="flag" />
                    )}
                  </div>
                  {item.label}
                </div>
              </Dropdown.Item>
            ))}
          </Dropdown>
        </Nav>
        <Nav pullRight>
          <Nav.Item
            onClick={onChange}
            style={{ width: 56, textAlign: "center" }}
          >
            <Icon icon={expand ? "angle-left" : "angle-right"} />
          </Nav.Item>
        </Nav>
      </Navbar.Body>
    </Navbar>
  );
};

type SidebarProps = {
  sidebarItems: SidebarItem[];
};

const Sidebar = ({ sidebarItems }: SidebarProps) => {
  const location = useLocation();
  const [expanded, setExpanded] = useState<boolean>(true);

  return (
    <SideBar
      style={{ display: "flex", flexDirection: "column" }}
      width={expanded ? 260 : 56}
      collapsible
    >
      <Sidenav style={{ height: "100%" }}>
        <Sidenav.Header style={{ textAlign: "center" }}>
          <img
            src={icons.logo}
            style={{ width: "50%", paddingBlock: 30 }}
            alt=""
          />
        </Sidenav.Header>
        <Sidenav.Body>
          <Nav>
            {sidebarItems.map((item) => (
              <Nav.Item
                key={item.id}
                eventKey={item.id}
                active={location.pathname === item.url ? true : false}
                icon={<Icon icon={item.icon} />}
                componentClass={Link}
                to={item.url}
              >
                {item.title}
              </Nav.Item>
            ))}
          </Nav>
        </Sidenav.Body>
      </Sidenav>
      <NavToggle expand={expanded} onChange={() => setExpanded(!expanded)} />
    </SideBar>
  );
};

export default Sidebar;
