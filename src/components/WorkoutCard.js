// components/WorkoutCard.js
import { Card } from 'react-bootstrap';
import CardActions from './CardActions';

const WorkoutCard = ({ workout, onComplete, onDelete, onUpdate }) => {
    return (
        <Card className="mt-3 d-flex flex-column" style={{ minHeight: '350px', maxWidth: '300px', minWidth: '300px' }}>
            <Card.Body className="flex-grow-1 d-flex flex-column">
                <Card.Title>{workout.name}</Card.Title>
                <Card.Text></Card.Text>
                
                <Card.Subtitle>Duration:</Card.Subtitle>
                <Card.Text>{workout.duration}</Card.Text>
                
                <Card.Subtitle>Status:</Card.Subtitle>
                <Card.Text
                    className={workout.status === "pending" ? "text-danger" : "text-success"}
                >
                    {workout.status}
                </Card.Text>
                
                <Card.Subtitle>Date Added:</Card.Subtitle> 
                <Card.Text>{new Date(workout.dateAdded).toLocaleString()}</Card.Text>
            </Card.Body>
            <Card.Footer className="d-flex justify-content-around align-items-center">
                <CardActions 
                    workoutId={workout._id}
                    onComplete={onComplete}
                    onDelete={onDelete}
                    onUpdate={onUpdate}
                />
            </Card.Footer>
        </Card>
    );
};

export default WorkoutCard;
