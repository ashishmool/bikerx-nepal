import { SportsMotorsports } from '@mui/icons-material';

const HelmetRating = ({ difficultyRating }: { difficultyRating: number }) => {
    const maxDifficulty = 5; // Define the maximum difficulty level
    const helmets = [];

    for (let i = 1; i <= maxDifficulty; i++) {
        helmets.push(
            <SportsMotorsports
                key={i}
                style={{
                    color: i <= difficultyRating ? '#FBBF24' : '#D1D5DB', // Yellow for filled, gray for unfilled
                    fontSize: '24px', // Adjust size if needed
                    margin: '0 2px', // Optional: Space between icons
                }}
            />
        );
    }

    return (
        <div className="flex">
            {helmets}
        </div>
    );
};

export default HelmetRating;