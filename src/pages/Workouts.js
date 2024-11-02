// pages/Workouts.js
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Loading from '../components/Loading';
import { Button, Row, Col } from 'react-bootstrap';
import AddWorkout from '../components/AddWorkout';
import UpdateWorkout from '../components/UpdateWorkout'; 
import WorkoutCard from '../components/WorkoutCard';

export default function Workouts() {
    const [loading, setLoading] = useState(true);
    const [workoutsData, setWorkoutsData] = useState([]);
    const [showAddWorkout, setShowAddWorkout] = useState(false);
    const [showUpdateWorkout, setShowUpdateWorkout] = useState(false);
    const [currentWorkout, setCurrentWorkout] = useState(null);
    
    const token = localStorage.getItem('token');

    const fetchData = () => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/workouts/getMyWorkouts`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
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
    }, []); // Fetch data on mount

    if (!token) {
        return <Navigate to="/login" />;
    }

    const handleShowAdd = () => setShowAddWorkout(true);
    const handleCloseAdd = () => setShowAddWorkout(false);
    const handleShowUpdate = (workout) => {
        setCurrentWorkout(workout);
        setShowUpdateWorkout(true);
    };
    const handleCloseUpdate = () => setShowUpdateWorkout(false);

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <>
                    <div className="d-flex justify-content-center pt-3">
                        <h1 className='text-light'>My Workouts</h1>
                    </div>
                    <div className="d-flex justify-content-center mb-3">
                        <Button 
                            id="addWorkout"
                            variant="success" 
                            className="mb-3" 
                            onClick={handleShowAdd}
                        >
                            Add Workout
                        </Button>
                    </div>
                    <Row className='justify-content-center'>
                        {workoutsData.length > 0 ? (
                            workoutsData.map(workout => (
                                <Col key={workout._id} md={4} className="mb-4 d-flex justify-content-center">
                                    <WorkoutCard 
                                        workout={workout}
                                        onComplete={fetchData} 
                                        onDelete={fetchData} 
                                        onUpdate={() => handleShowUpdate(workout)} 
                                    />
                                </Col>
                            ))
                        ) : (
                            <div className="d-flex flex-column align-items-center">
                                <img
                                    src="/EmptyWorkout.png"
                                    alt="EmptyWorkout..."
                                    className="EmptyWorkout img-fluid"
                                />
                                <h3 className="d-flex justify-content-center mt-2 text-light">
                                    Workout list is Empty.
                                </h3>
                            </div>
                        )}
                    </Row>
                    <AddWorkout show={showAddWorkout} handleClose={handleCloseAdd} fetchData={fetchData} workoutsData={workoutsData} />
                    <UpdateWorkout show={showUpdateWorkout} handleClose={handleCloseUpdate} fetchData={fetchData} workout={currentWorkout} />
                </>
            )}
        </>
    );
}
