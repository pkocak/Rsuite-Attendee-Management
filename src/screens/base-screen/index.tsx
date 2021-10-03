import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Route, Switch, useLocation } from "react-router-dom";
import { Container, Content, Header } from "rsuite";
import { Sidebar } from "../../components";
import {
  getLocalizedSidebar,
  languageSelector,
  themeSelector,
} from "../../redux/selectors";
import { SidebarItem } from "../../types/object";
import { AttendeeManagement, Registration } from "../inner-screens";
import "./style.css";

const BaseScreen = () => {
  const location = useLocation();
  const strings = useSelector(getLocalizedSidebar);
  const language = useSelector(languageSelector);
  const theme = useSelector(themeSelector);

  const [header, setHeader] = useState<string>("");

  const sidebarItems: SidebarItem[] = [
    {
      id: "1",
      icon: "list-ul",
      title: strings.getString("attendee_management"),
      url: "/attendee-management",
    },
    {
      id: "2",
      icon: "user-plus",
      title: strings.getString("registration"),
      url: "/registration",
    },
  ];

  useEffect(() => {
    const header = sidebarItems.find((item) => item.url === location.pathname);
    if (header) setHeader(header.title);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, language]);

  return (
    <Container className="baseScreen">
      <Sidebar sidebarItems={sidebarItems} />
      <Container>
        <Header
          style={{
            padding: 30,
            borderBlockEnd:
              theme === "dark" ? "1px solid #3c3f43" : "1px solid #e5e5ea",
          }}
        >
          <h3>{header}</h3>
        </Header>
        <Content style={{ padding: 30, height: `calc(100% - 103px)` }}>
          <Switch location={location}>
            <Route
              exact
              path="/attendee-management"
              component={AttendeeManagement}
            />
            <Route exact path="/registration" component={Registration} />
          </Switch>
        </Content>
      </Container>
    </Container>
  );
};

export default BaseScreen;
