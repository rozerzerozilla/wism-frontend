import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { useHistory } from "react-router-dom";

const UnauthorizedModal = (props) => {
    const history = useHistory();
    const sessionLogout = () => {
        localStorage.clear();
        history.replace("/admin/login");
        //setAccess(true)
    }
    return (
        < Modal open={true}
            //onClose={closeDelete}
            center>
            <br />
            {/* <h5 className="text-center text-black">Unauthorized access</h5> */}
            <h6>User already logged in. Try logging in after closing the current session</h6>
            <form
                className="mx-4 my-4"
            >
                <div className="row">
                    <div className="col-5"></div>
                    <div className="col-2">
                        <button
                            type="submit"
                            className="btn btn-danger"
                            onClick={sessionLogout}
                        >
                            &nbsp;&nbsp;Ok
                        </button>
                    </div>
                    <div className="col-5"></div>
                </div>
            </form>
        </Modal>
    )
}

export default UnauthorizedModal;