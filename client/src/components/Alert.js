import { XMarkIcon } from '@heroicons/react/24/solid'

const Alert = ({ message, showAlert, setShowAlert }) => {
  return (
    <>
      { showAlert && 
        <div className="text-white flex justify-between px-5 py-3 border-0 rounded-lg h-fit w-full bg-green-500">
          <p>{ message }</p>
          <div className='w-6 h-6 hover:bg-green-600 rounded-lg'>
            <XMarkIcon onClick={ () => setShowAlert(false) } />
          </div>
        </div>
      }
    </>
  );
}
 
export default Alert;