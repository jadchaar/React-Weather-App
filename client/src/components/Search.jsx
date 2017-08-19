import React, {
  Component
} from 'react';
import {
  InputGroup,
  InputGroupButton,
  Input,
  Button
} from 'reactstrap';


class Search extends Component {
  submit() {

  }

  render() {
    return (
      <div>
        <InputGroup>
          <InputGroupButton><Button>I'm a button</Button></InputGroupButton>
          <Input />
        </InputGroup>
      </div>
    );
  }
}

export default Search;
