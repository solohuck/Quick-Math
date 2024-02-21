## Quick Math

Welcome to Quick Math, a straightforward math quiz game built using React. Test your arithmetic skills by answering random math questions within a limited time frame. This game features various components to enhance your gaming experience, including timers, scoring systems, and feedback for your answers.

### How to Play

1. **Start the Game:** Click the "Start" button to kickstart the game.
2. **Answer Questions:** Choose the correct answer for each displayed question.
3. **Scoring:** Your score fluctuates based on the time left on the upper-right question timer.
4. **Time Limits:** Each question has a 10-second timer displayed in the upper-right corner. Additionally, there's a 60-second session timer shown in the bottom-left corner. The game ends when this session timer runs out, provided your score is above zero.
5. **Game Over:** The game concludes when either the time limit is reached or your score drops to zero. Click the "Restart" button to start a new game.

### Features

- **Random Questions:** Generates random arithmetic questions.
- **Scoring System:** Scores increase for correct answers and decrease for incorrect ones, based on the question timer.
- **Question Timer:** Provides 10 seconds to answer each question.
- **Session Timer:** Limits the time for the entire session to 60 seconds.
- **Feedback:** Receive feedback for correct, incorrect, and unanswered questions.
- **Restart:** Allows you to restart the game after completing or when the game ends.

### Components

- **App Component:** Manages game logic and rendering.
- **Display Question:** Shows the arithmetic question.
- **Answer Selection:** Offers options to select answers.
- **Timer:** Displays remaining time for questions and the overall session.
- **Start/Restart Button:** Initiates or restarts the game.

### Technologies Used

- **React:** Utilized for building the game.
- **useState:** Manages state variables.
- **useEffect:** Executes side effects.
- **CSS:** Styling for the game interface.

### Code Structure

The code is organized into functional components, employing React hooks for state management and effects. The primary functionalities include generating random questions, scoring, managing timers, and providing feedback.

### Getting Started

To play the game:

1. Clone this repository to your local machine.
2. Navigate to the project directory.
3. Run `npm install` to install dependencies.
4. Run `npm start` to launch the development server.
5. Open your browser and go to `http://localhost:3000` to start playing.

Enjoy playing Quick Math! If you have any feedback or suggestions, feel free to contribute or reach out.
