import React, { useState } from 'react';
import { Modal, Button, Dropdown } from 'react-bootstrap';

interface AddTransactionModalProps {
    onClose: () => void;
}

const AddTransactionModal: React.FC<AddTransactionModalProps> = ({ onClose }) => {
    const [note, setNote] = useState('')
    const [transactionType, setTransactionType] = useState('Sent')
    const [amount, setAmount] = useState('')
  
    return (
        <Modal show={true} onHide={onClose}>
        <Modal.Header closeButton>
            <Modal.Title>Add Transaction</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="mb-3">
            <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Add a note" onChange={(e) => {setNote(e.target.value)}}/>
            </div>
            <div className="input-group mb-3">
                <Dropdown>
                <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic" className="custom-dropdown-menu">
                    {transactionType}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setTransactionType('Sent')}>Sent</Dropdown.Item>
                    <Dropdown.Item onClick={() => setTransactionType('Received')}>Received</Dropdown.Item>
                </Dropdown.Menu>
                </Dropdown>
                <input type="text" className="form-control" placeholder='Amount' aria-label="Dollar amount (with dot and two decimal places)" onChange={(e) => {setAmount(e.target.value)}} />
                <span className="input-group-text">$</span>
                <span className="input-group-text">0.00</span>
            </div>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={onClose}>Close</Button>
            <Button variant="primary" className="custom-save-button">Save changes</Button>
        </Modal.Footer>
        </Modal>
    );
}

export default AddTransactionModal;
