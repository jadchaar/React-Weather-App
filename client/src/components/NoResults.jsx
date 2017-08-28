import React from 'react';
import FontAwesome from 'react-fontawesome';
import {
  Row
} from 'reactstrap';

const NoResults = () => {
  return (
    <div>
      <Row className="flex-center">
        <h4>
          No results. Please try again. <FontAwesome name='frown-o' />
        </h4>
      </Row>
    </div>
  );
};

export default NoResults;
