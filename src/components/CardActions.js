// components/CardActions.js
import { Button } from 'react-bootstrap';
import { Notyf } from 'notyf';

const notyf = new Notyf();

const CardActions = ({ workoutId, onComplete, onDelete, onUpdate }) => {
    const completeWorkout = () => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/workouts/completeWorkoutStatus/${workoutId}`, {
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
                onComplete(); // Call the passed function to refresh data
            } else {
                notyf.error(data.message);
            }
        })
        .catch(err => {
            console.error('Error completing workout:', err);
            notyf.error('Error completing workout. Please try again.');
        });
    };

    const deleteWorkout = () => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/workouts/deleteWorkout/${workoutId}`, {
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
                onDelete(); // Call the passed function to refresh data
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
            <Button 
                variant="success" 
                className="btn btn-primary btn-sm" 
                onClick={completeWorkout}
            >
                Complete
            </Button>
            <Button 
                variant="primary" 
                className="btn btn-primary btn-sm" 
                onClick={onUpdate} // Call the onUpdate function from props
            >
                Update
            </Button>
            <Button 
                variant="danger" 
                className="btn btn-danger btn-sm" 
                onClick={deleteWorkout} // Call the delete function from props
            >
                Delete
            </Button>
        </>
    );
};

export default CardActions;
