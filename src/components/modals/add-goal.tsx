import { useState } from "react";
import { Modal, Button } from "react-bootstrap";

interface AddGoalModalProps {
    onClose: () => void;
}

const AddGoalModal: React.FC<AddGoalModalProps> = ({ onClose }) => {
    const [note, setNote] = useState('')
    const [amount, setAmount] = useState('')
  
    return (
        <Modal show={true} onHide={onClose}>
        <Modal.Header closeButton>
            <Modal.Title>Add Goal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="mb-3">
            <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Add a note" onChange={(e) => {setNote(e.target.value)}}/>
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text">$</span>
                <span className="input-group-text">0.00</span>
                <input type="text" className="form-control" placeholder='Amount' aria-label="Dollar amount (with dot and two decimal places)" onChange={(e) => {setAmount(e.target.value)}} />
            </div>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={onClose}>Close</Button>
            <Button variant="primary" className="custom-save-button">Save changes</Button>
        </Modal.Footer>
        </Modal>
    );
}

export default AddGoalModal