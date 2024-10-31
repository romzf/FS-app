// src/components/AddWorkout.js
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Notyf } from 'notyf';

const AddWorkout = ({ show, handleClose, fetchData, workoutsData }) => {
    const notyf = new Notyf();
    const [name, setName] = useState('');
    const [duration, setDuration] = useState('');
    const [error, setError] = useState('');

    const handleAddWorkout = (e) => {
        e.preventDefault();

        // Check for duplicate name
        const duplicate = workoutsData?.some(workout => workout.name === name);
        if (duplicate) {
            setError('Workout name already exists. Please choose a different name.');
            return;
        } else {
            setError('');
        }

        fetch(`${process.env.REACT_APP_API_BASE_URL}/workouts/addWorkout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                name: name,
                duration: duration, // Send duration instead of price
                status: 'pending' // Default status
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data) {
                console.log('Workout added:', data);
                fetchData(); // Refresh the workout list
                handleClose();
                notyf.success('Workout added successfully');
            }
        })
        .catch(err => {
            console.error('Error adding workout:', err);
            notyf.error('Error adding workout. Please try again.');
        });
    };

    return (
        <Modal show={show} onHide={handleClose} dialogClassName="modal-dialog-centered">
            <Modal.Header closeButton>
                <Modal.Title>Add Workout</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleAddWorkout}>
                    <Form.Group controlId="workoutName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter workout name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </Form.Group>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <Form.Group controlId="workoutDuration">
                        <Form.Label>Duration</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter duration"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="mt-3 me-2">
                        Add Workout
                    </Button>
                    <Button variant="secondary" className="mt-3" onClick={handleClose}>
                        Close
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddWorkout;
