// pages/Workouts.js
import { useEffect, useState } from 'react';
import Loading from '../components/Loading';
import { Card, Button, Row, Col } from 'react-bootstrap';
import AddWorkout from '../components/AddWorkout';
import UpdateWorkout from '../components/UpdateWorkout'; // Import the UpdateWorkout component
import { Notyf } from 'notyf';

export default function Products() {
    
    const [loading, setLoading] = useState(true);
    const [workoutsData, setWorkoutsData] = useState([]);
    const [showAddWorkout, setShowAddWorkout] = useState(false);
    const [showUpdateWorkout, setShowUpdateWorkout] = useState(false); // Manage modal visibility for updating
    const [currentWorkout, setCurrentWorkout] = useState(null); // State to hold the current workout being updated
    const notyf = new Notyf();

    const fetchData = () => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/workouts/getMyWorkouts`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setWorkoutsData(data.workouts || []);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching workouts:', err);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleShowAdd = () => setShowAddWorkout(true);
    const handleCloseAdd = () => setShowAddWorkout(false);
    const handleShowUpdate = (workout) => {
        setCurrentWorkout(workout);
        setShowUpdateWorkout(true);
    }; // Show update modal and set current workout
    const handleCloseUpdate = () => setShowUpdateWorkout(false);

    const completeWorkout = (id) => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/workouts/completeWorkoutStatus/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if (data.updatedWorkout) {
                notyf.success(data.message);
                fetchData();
            } else {
                notyf.error(data.message);
            }
        })
        .catch(err => {
            console.error('Error completing workout:', err);
            notyf.error('Error completing workout. Please try again.');
        });
    };

    const deleteWorkout = (id) => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/workouts/deleteWorkout/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if (data.message) {
                notyf.success(data.message);
                fetchData();
            } else {
                notyf.error(data.message);
            }
        })
        .catch(err => {
            console.error('Error deleting workout:', err);
            notyf.error('Error deleting workout. Please try again.');
        });
    };

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <>
                    <div className="d-flex justify-content-center mt-3">
                        <h1>My Workouts</h1>
                    </div>
                    <div className="d-flex justify-content-center mb-3">
                        <Button 
                            id = "addWorkout"
                            variant="success" 
                            className="mb-3" 
                            onClick={handleShowAdd}
                        >
                            Add Workout
                        </Button>
                    </div>
                    <Row>
                        {workoutsData.length > 0 ? (
                            workoutsData.map(workout => (
                                <Col key={workout._id} md={4} className="mb-4">
                                    <Card className="mt-3 d-flex flex-column" style={{ minHeight: '400px' }}>
                                        <Card.Body className="flex-grow-1 d-flex flex-column">
                                            <Card.Title>Name: {workout.name}</Card.Title>
                                            <Card.Subtitle>Duration: {workout.duration}</Card.Subtitle>
                                            <Card.Subtitle>Status: {workout.status}</Card.Subtitle>
                                            <Card.Subtitle>Date Added: {new Date(workout.dateAdded).toLocaleDateString()}</Card.Subtitle>
                                        </Card.Body>
                                        <Card.Footer className="d-flex justify-content-around align-items-center">
                                            <Button 
                                                variant="success" 
                                                className="btn btn-primary btn-sm" 
                                                onClick={() => completeWorkout(workout._id)}
                                            >
                                                Complete
                                            </Button>
                                            <Button 
                                                variant="primary" 
                                                className="btn btn-primary btn-sm" 
                                                onClick={() => handleShowUpdate(workout)} // Show update modal
                                            >
                                                Update
                                            </Button>
                                            <Button 
                                                variant="primary" 
                                                className="btn btn-danger btn-sm" 
                                                onClick={() => deleteWorkout(workout._id)}
                                            >
                                                Delete
                                            </Button>
                                        </Card.Footer>
                                    </Card>
                                </Col>
                            ))
                        ) : (
                            <p>No workouts available.</p>
                        )}
                    </Row>
                    <AddWorkout show={showAddWorkout} handleClose={handleCloseAdd} fetchData={fetchData} workoutsData={workoutsData} />
                    <UpdateWorkout show={showUpdateWorkout} handleClose={handleCloseUpdate} fetchData={fetchData} workout={currentWorkout} />
                </>
            )}
        </>
    );
}
