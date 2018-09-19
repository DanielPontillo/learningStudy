import React from 'react';

function BlockCount(props) {

  return (
    <div className="blockCount">
      Block <span>{props.counter}</span> of <span>{props.total}</span>
    </div>
  );

}

BlockCount.propTypes = {
  counter: React.PropTypes.number.isRequired,
  total: React.PropTypes.number.isRequired
};

export default BlockCount;
