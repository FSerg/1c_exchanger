import React from 'react';
import { Container, Segment, List } from 'semantic-ui-react';

const Footer = () => (
  <Segment secondary vertical>
    <Container textAlign="center">
      <List horizontal divided link>
        <List.Item as="a" href="#">
          Contact Us
        </List.Item>
        <List.Item as="a" href="#">
          Privacy Policy
        </List.Item>
      </List>
    </Container>
  </Segment>
);

export default Footer;
