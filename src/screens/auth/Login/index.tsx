import {
  Alert,
  Button,
  ButtonToolbar,
  Container,
  Content,
  FlexboxGrid,
  Form,
  FormGroup,
  Panel,
} from "rsuite";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { Formik } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { getLocalizedAuth, getLocalizedErrors } from "../../../redux/selectors";
import Input from "../../../components/Input";
import { login } from "../../../redux/actions/userActions";

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const strings = useSelector(getLocalizedAuth);
  const errorStrings = useSelector(getLocalizedErrors);

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email(errorStrings.getString("email"))
      .required(errorStrings.getString("required")),
    password: Yup.string()
      .min(6, errorStrings.getString("password_min"))
      .matches(
        /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])/,
        errorStrings.getString("password")
      )
      .required(errorStrings.getString("required")),
  });

  const onSubmit = ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    dispatch(
      login({
        params: { email, password },
        onSuccess: (message, payload) => {
          history.push("/attendee-management");
        },
        onError: (message) => {
          Alert.error(errorStrings.getString("login"), 10000);
        },
      })
    );
  };

  return (
    <Container style={{ height: "100vh" }}>
      <Content style={{ height: "100%" }}>
        <FlexboxGrid justify="center" align="middle" style={{ height: "100%" }}>
          <FlexboxGrid.Item colspan={12}>
            <Panel header={<h3>{strings.getString("login")}</h3>} bordered>
              <Formik
                initialValues={{
                  email: "",
                  password: "",
                }}
                validationSchema={LoginSchema}
                onSubmit={onSubmit}
              >
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  touched,
                  errors,
                }) => (
                  <Form fluid>
                    <FormGroup>
                      <Input
                        label={strings.getString("email")}
                        name="email"
                        onChange={handleChange("email")}
                        onBlur={handleBlur("email")}
                        error={errors.email}
                        touched={touched.email}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Input
                        label={strings.getString("password")}
                        type="password"
                        name="password"
                        onChange={handleChange("password")}
                        onBlur={handleBlur("password")}
                        error={errors.password}
                        touched={touched.password}
                      />
                    </FormGroup>
                    <FormGroup>
                      <ButtonToolbar>
                        <Button
                          appearance="primary"
                          onClick={() => handleSubmit()}
                        >
                          {strings.getString("signin")}
                        </Button>
                      </ButtonToolbar>
                    </FormGroup>
                  </Form>
                )}
              </Formik>
            </Panel>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </Content>
    </Container>
  );
};

export default Login;
