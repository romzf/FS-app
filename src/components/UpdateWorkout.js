// src/components/UpdateWorkout.js
import { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Notyf } from 'notyf';

export default function UpdateWorkout({ show, handleClose, fetchData, workout }) {
    const [name, setName] = useState('');
    const [duration, setDuration] = useState('');
    const notyf = new Notyf();

    useEffect(() => {
        if (workout) {
            setName(workout.name);
            setDuration(workout.duration);
        }
    }, [workout]);

    const handleUpdate = () => {
        if (!name || !duration) {
            notyf.error('Please fill in all fields.');
            return;
        }

        fetch(`${process.env.REACT_APP_API_BASE_URL}/workouts/updateWorkout/${workout._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ name, duration }) // Removed status from the request body
        })
        .then(res => res.json())
        .then(data => {
            if (data.updatedWorkout) {
                notyf.success(data.message);
                fetchData(); // Refresh the workout list
                handleClose(); // Close the modal
            } else {
                notyf.error(data.message);
            }
        })
        .catch(err => {
            console.error('Error updating workout:', err);
            notyf.error('Error updating workout. Please try again.');
        });
    };

    return (
        <Modal show={show} onHide={handleClose} dialogClassName="modal-dialog-centered">
            <Modal.Header closeButton>
                <Modal.Title>Update Workout</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="workoutName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter workout name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="workoutDuration">
                        <Form.Label>Duration</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter workout duration"
                            value={duration}
                            onChange={e => setDuration(e.target.value)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleUpdate}>
                    Update
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
