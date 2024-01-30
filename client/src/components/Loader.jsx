import ClipLoader from 'react-spinners/ClipLoader';

const override = {
  display: 'block',
  margin: '0 auto',
  borderColor: 'red',
//   position: 'fixed',
//   zIndex: '999',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
};

function Loader() {
  return <ClipLoader color={'#53a7d8'} loading={true} cssOverride={override} />;
}

export default Loader;
