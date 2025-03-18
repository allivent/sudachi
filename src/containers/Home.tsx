import { Link } from 'react-router-dom';
import AllCourses from '../data/AllCourses';
import { StyledLink } from 'baseui/link';

function renderCourseLinks() {
  const courses = Object.values(AllCourses);
  return courses.map((course, index) => {
    return (
      <span key={`course-${course.id}`}>
        <StyledLink $as={Link} to={`/${course.id}`}>
          {course.name}
        </StyledLink>
        {index < courses.length - 1 ? ' | ' : null}
      </span>
    );
  });
}

function Home() {
  return (
    <div className="home">
      <h1>金木犀</h1>
      <h4>コースを選んで下さい</h4>
      <div>{renderCourseLinks()}</div>
    </div>
  );
}

export default Home;
