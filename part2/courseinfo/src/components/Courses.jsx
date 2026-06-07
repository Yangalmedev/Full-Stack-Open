const Header = () => {
  return <h1>Web development curriculum</h1>
}

const Content = ({ courses }) => {
  return (
    <div>
      {courses.map(course => {
        const total = course.parts.reduce((sum, part) => sum + part.exercises, 0)
        return (
          <div key={course.id}>
            <h2 key={course.id}>{course.name}</h2>
            {course.parts.map(part => (
              <p key={part.id}>{part.name} {part.exercises}</p>
            ))}
            <b>total of {total} exercises</b>
          </div>
        )
      })}
    </div>
  )
}

const Courses = ({ courses }) => {
  console.log(courses)
  return(
    <div>
      <Header />
      <Content courses={courses} />
    </div>
  )
}
export default Courses;


