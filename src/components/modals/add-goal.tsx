import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from '../../../firebaseConfig.ts';

interface AddGoalModalProps {
    onClose: () => void;
}

const AddGoalModal: React.FC<AddGoalModalProps> = ({ onClose }) => {
    const [note, setNote] = useState('');
    const [amount, setAmount] = useState('');

    const handleSaveChanges = async () => {
        try {
            
            const userId = auth.currentUser?.uid;

            if (!userId) {
                console.error('User not authenticated');
                return;
            }

            const docRef = await addDoc(collection(db, `users/${userId}/goals`), {
                note,
                amount: parseFloat(amount),
                createdAt: new Date(),
            });

            console.log("Goal added with ID: ", docRef.id);
            onClose(); 
        } catch (error) {
            console.error("Error adding goal: ", error);
        }
    };

    return (
        <Modal show={true} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Goal</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="mb-3">
                    <input type="text" className="form-control" placeholder="Add a note" onChange={(e) => { setNote(e.target.value) }} />
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text">$</span>
                    <span className="input-group-text">0.00</span>
                    <input type="text" className="form-control" placeholder='Amount' aria-label="Dollar amount (with dot and two decimal places)" onChange={(e) => { setAmount(e.target.value) }} />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>Close</Button>
                <Button variant="primary" className="custom-save-button" onClick={handleSaveChanges}>Save changes</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddGoalModal;
