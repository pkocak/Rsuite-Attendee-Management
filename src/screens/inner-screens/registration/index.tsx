import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Alert, Button, ButtonToolbar, Col, Form, Grid, Row } from "rsuite";
import { Formik } from "formik";
import * as Yup from "yup";
import { Input } from "../../../components";
import {
  getLocalizedErrors,
  getLocalizedRegistration,
} from "../../../redux/selectors";
import { registerNewAttendee } from "../../../utils/firebaseFunctions";

const Registration = () => {
  const history = useHistory();
  const strings = useSelector(getLocalizedRegistration);
  const errorStrings = useSelector(getLocalizedErrors);

  const RegistrationSchema = Yup.object().shape({
    fullName: Yup.string().required(errorStrings.getString("required")),
    email: Yup.string()
      .email(errorStrings.getString("email"))
      .required(errorStrings.getString("required")),
    hes: Yup.string()
      .min(10, errorStrings.getString("hes_range"))
      .max(10, errorStrings.getString("hes_range"))
      .matches(/^(?=.*[0-9])(?=.*[A-Z])/, errorStrings.getString("hes"))
      .required(errorStrings.getString("required")),
  });

  const onRegister = (fullName: string) => {
    Alert.success(strings.getString("successfully_registered"));
    history.push(`/attendee-management#${fullName}`);
  };

  const onSubmit = ({
    email,
    fullName,
    hes,
  }: {
    email: string;
    fullName: string;
    hes: string;
  }) => {
    registerNewAttendee(
      { email, fullName, hes, isAttended: false },
      (err, fullName) => {
        if (err) Alert.error(strings.getString("failed_to_register"));
        else onRegister(fullName);
      }
    );
  };

  return (
    <>
      <Formik
        initialValues={{
          email: "",
          fullName: "",
          hes: "",
        }}
        validationSchema={RegistrationSchema}
        onSubmit={onSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, touched, errors }) => (
          <Form fluid>
            <Grid fluid>
              <Row>
                <Col xs={24} md={12}>
                  <Input
                    label={strings.getString("full_name")}
                    name="fullName"
                    onChange={handleChange("fullName")}
                    onBlur={handleBlur("fullName")}
                    error={errors.fullName}
                    touched={touched.fullName}
                  />
                </Col>
              </Row>
              <Row>
                <Col xs={24} md={12}>
                  <Input
                    label={strings.getString("email")}
                    name="email"
                    onChange={handleChange("email")}
                    onBlur={handleBlur("email")}
                    error={errors.email}
                    touched={touched.email}
                  />
                </Col>
              </Row>
              <Row>
                <Col xs={24} md={12}>
                  <Input
                    label={strings.getString("hes")}
                    name="hes"
                    onChange={handleChange("hes")}
                    onBlur={handleBlur("hes")}
                    error={errors.hes}
                    touched={touched.hes}
                  />
                </Col>
              </Row>
            </Grid>
            <ButtonToolbar
              style={{ paddingInlineStart: 5, marginBlockStart: 10 }}
            >
              <Button appearance="primary" onClick={() => handleSubmit()}>
                {strings.getString("save")}
              </Button>
            </ButtonToolbar>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Registration;
