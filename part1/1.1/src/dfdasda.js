const App = () => {
    const course = {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
      
    }
    return (
      <div>
        <Course course={course} />
      </div>
    )
  }
  const Course = (props) => {
    const name = props.course.name
    const parts = props.course.parts
    return (
      <div>
        <Header course = {name} />
        <Content parts = {parts} />
        <Total parts = {parts} />
      </div>
  
    )
  }
  const Header = (props) => {
    return (
      <h1>
        {props.course}
      </h1>
  
    )
  }
  const Content = (props) => {
    return ( 
      <div>
        {props.parts.map((part) => (
          <div key={part.id}> {part.name} {part.exercises} </div>
        ))}
      </div>
    )
  }
  const Total = props => {
    const total = props.parts.reduce(
      (value1, value2) => value1 + value2.exercises,
      0
    );
    return <p>total of {total} exercises</p>;
  };
  
  export default App