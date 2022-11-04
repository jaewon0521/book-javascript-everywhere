import React, { useState } from 'react';
import styled from 'styled-components';
import Button from './Button';

const NoteForm = props => {
  const [formData, setFormData] = useState({ content: props.content || '' });

  const handleOnChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = e => {
    e.preventDefault();
    props.action({
      variables: {
        ...formData
      }
    });
  };
  return (
    <Wrapper>
      <Form onSubmit={handleOnSubmit}>
        <TextArea
          required
          type="text"
          name="content"
          placeholder="Note content"
          value={formData.content}
          onChange={handleOnChange}
        />
        <Button type="submit">Save</Button>
      </Form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100%;
`;

const Form = styled.form`
  height: 100%;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 90%;
`;

export default NoteForm;
