import Spinner from 'react-bootstrap/Spinner';

function CommonLoader() {
  return (
    <div className='loaderset'>
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
}

export default CommonLoader;