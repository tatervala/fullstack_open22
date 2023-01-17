import React from 'react'

const Total = props => {
    const total = props.parts.reduce(
      (value1, value2) => value1 + value2.exercises,
      0
    );
    return <p>total of {total} exercises</p>;
  };
export default Total