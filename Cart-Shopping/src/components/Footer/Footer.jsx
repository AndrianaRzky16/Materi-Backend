import {ListGroup} from "reactstrap"

import logo from "../../assets/images/logodes.png";
import "../../styles/footer.css";


const Footer = () => {
    return (
        <footer>
            <div>
                <img src={logo} alt="logo" />
                <h5>MyPizza</h5>
                <p>Pizza terbaik di kota, cobalah!</p>
            </div>
            <div>
                <h5 className="footer__title mb-3">Delivery Time</h5>
            <ListGroup>
                 <div className="delivery__time-item border-0 ps-0">
                    <span>Friday - Tuesday</span>
                    <p>10:00am - 11:00pm</p>
                 </div>
                 <div className="delivery__time-item border-0 ps-0">
                    <span>Wednesday - Thursday</span>
                    <p>Off day</p>
                 </div>
            </ListGroup>
        </div>
    </footer>
    )
}

export default Footer