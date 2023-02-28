import { useRef } from "react";
import { Button, Container, Form } from "react-bootstrap";

const url =
  "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBYxZtW-QJQBPYeX0LkWJfWu1oXeusEVOs";

const Login = () => {
  //refs
  const enteredEmail = useRef();
  const enteredPassword = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const userCredentials = {
      email: enteredEmail.current.value,
      password: enteredPassword.current.value,
    };
    console.log(userCredentials);

    const loginRequest = async () => {
      try {
        const response = await fetch(url, {
          method: "POST",
          body: JSON.stringify({
            ...userCredentials,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        console.log('user logged in');
        console.log(data);
      } catch (err) {
        console.log("error logging in" + err.message);
      }
    };
    loginRequest();
  };
  return (
    <Container>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            ref={enteredEmail}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            ref={enteredPassword}
          />
        </Form.Group>
        <Button type="submit">Login</Button>
      </Form>
    </Container>
  );
};

export default Login;
