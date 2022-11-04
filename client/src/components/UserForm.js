import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';

const UserForm = props => {
  const [formData, setFormData] = useState({});

  const handleOnChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSumit = e => {
    e.preventDefault();
    props.action({
      variables: {
        ...formData
      }
    });
  };

  return (
    <Wrapper>
      <h2>Sign Up</h2>
      <Form onSubmit={handleSumit}>
        {props.formType === 'signup' && (
          <React.Fragment>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              onChange={handleOnChange}
              required
            />
          </React.Fragment>
        )}
        <label htmlFor="username">Email:</label>
        <input
          type="text"
          id="email"
          name="email"
          placeholder="Email"
          onChange={handleOnChange}
          required
        />
        <label htmlFor="username">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          onChange={handleOnChange}
          required
        />
        <Button type="submit">Submit</Button>
      </Form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border: 1px solid #f5f4f0;
  max-width: 500px;
  padding: 1em;
  margin: 0 auto;
`;

const Form = styled.form`
  label,
  input {
    display: block;
    line-height: 2em;
  }

  input {
    width: 100%;
    margin-bottom: 1em;
  }
`;

export default UserForm;
