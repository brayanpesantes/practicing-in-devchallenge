import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import GuessTheWordGame from './page'; // Adjust path as necessary
import ImageLogo from "../images/Word Scramblle.svg"; // Will be mocked

// Mock the Image import
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt || 'mocked image'} />;
  },
}));

// Mock the ImageLogo SVG import
jest.mock('../images/Word Scramblle.svg', () => 'ImageLogoMock');

// Mock the words array for predictable testing
const mockWords = ["test", "game"];
jest.spyOn(React, 'useMemo')
  .mockReturnValueOnce(mockWords) // First useMemo is for words
  .mockImplementation(React.useMemo); // Subsequent useMemo calls use original implementation

// Mock alert
global.alert = jest.fn();

// Helper function to get input fields
const getLetterInputs = () => screen.queryAllByRole('textbox') as HTMLInputElement[];

// Helper function to simulate typing a correct word
const typeCorrectWord = async (word: string) => {
  const inputs = getLetterInputs();
  for (let i = 0; i < word.length; i++) {
    await act(async () => {
      fireEvent.change(inputs[i], { target: { value: word[i] } });
    });
  }
};

// Helper function to simulate N incorrect guesses
const makeNIncorrectGuesses = async (count: number) => {
  const inputs = getLetterInputs();
  for (let i = 0; i < count; i++) {
    // Assuming the first input is always available for incorrect guess
    // and the word is long enough or we don't care about hitting the same input
    await act(async () => {
      fireEvent.change(inputs[0], { target: { value: 'x' } }); // 'x' is unlikely to be correct
    });
    // If an alert for running out of tries appears, clear it for next actions
    if ((global.alert as jest.Mock).mock.calls.length > 0 && (global.alert as jest.Mock).mock.calls[0][0].includes("run out of tries")) {
        (global.alert as jest.Mock).mockClear();
    }
  }
};


describe('GuessTheWordGame - Two Player Functionality', () => {
  beforeEach(() => {
    // Reset mocks before each test
    (global.alert as jest.Mock).mockClear();
    // Ensure the words mock is reset if necessary, though useMemo mock handles it for initial load.
    // We re-render for each test, so a fresh component state is ensured.
    // Forcing the first word "test" to be selected for predictability in some tests.
    jest.spyOn(global.Math, 'random').mockReturnValue(0); // Makes Math.random() predictable for word selection
  });

  afterEach(() => {
    jest.spyOn(global.Math, 'random').mockRestore();
  });

  test('initial state: Player 1 starts, scores are 0, tries are 0', () => {
    render(<GuessTheWordGame />);
    expect(screen.getByText("Player 1's Turn")).toBeInTheDocument();
    expect(screen.getByText("Player 1 Score: 0")).toBeInTheDocument();
    expect(screen.getByText("Player 2 Score: 0")).toBeInTheDocument();
    expect(screen.getByText(/P1 Tries \(0\/5\):/)).toBeInTheDocument();
  });

  describe('Score Updates', () => {
    test('Player 1 score increments after guessing a word', async () => {
      render(<GuessTheWordGame />); // Word will be "test"
      await typeCorrectWord("test");
      expect(global.alert).toHaveBeenCalledWith("Player 1, you guessed the word!");
      expect(screen.getByText("Player 1 Score: 10")).toBeInTheDocument();
      expect(screen.getByText("Player 2 Score: 0")).toBeInTheDocument();
    });

    test('Player 2 score increments after guessing a word', async () => {
      render(<GuessTheWordGame />); // Player 1 starts with "test"
      await typeCorrectWord("test"); // Player 1 finishes turn

      // Now Player 2's turn, word should be "game" (Math.random will be > 0 for next word)
      jest.spyOn(global.Math, 'random').mockReturnValue(0.5); // next word "game"
      // The component re-renders or startGame is called, new word "game"
      
      expect(screen.getByText("Player 2's Turn")).toBeInTheDocument();
      await typeCorrectWord("game");
      expect(global.alert).toHaveBeenCalledWith("Player 2, you guessed the word!");
      expect(screen.getByText("Player 1 Score: 10")).toBeInTheDocument(); // P1 score remains
      expect(screen.getByText("Player 2 Score: 10")).toBeInTheDocument();
    });

    test('scores do not change on incorrect guesses', async () => {
      render(<GuessTheWordGame />);
      await makeNIncorrectGuesses(1);
      expect(screen.getByText("Player 1 Score: 0")).toBeInTheDocument();
      expect(screen.getByText("Player 2 Score: 0")).toBeInTheDocument();
    });
  });

  describe('Turn Switching', () => {
    test('switches from Player 1 to Player 2 after P1 guesses word', async () => {
      render(<GuessTheWordGame />);
      await typeCorrectWord("test");
      expect(screen.getByText("Player 2's Turn")).toBeInTheDocument();
    });

    test('switches from Player 1 to Player 2 after P1 runs out of tries', async () => {
      render(<GuessTheWordGame />);
      await makeNIncorrectGuesses(5); // P1 makes 5 mistakes
      expect(global.alert).toHaveBeenCalledWith("Player 1, you've run out of tries!");
      expect(screen.getByText("Player 2's Turn")).toBeInTheDocument();
    });

    test('switches from Player 2 to Player 1 after P2 guesses word', async () => {
      render(<GuessTheWordGame />);
      await typeCorrectWord("test"); // P1 completes turn

      jest.spyOn(global.Math, 'random').mockReturnValue(0.5); // next word "game" for P2
      await typeCorrectWord("game"); // P2 completes turn
      expect(global.alert).toHaveBeenCalledWith("Player 2, you guessed the word!");
      expect(screen.getByText("Player 1's Turn")).toBeInTheDocument();
    });

    test('switches from Player 2 to Player 1 after P2 runs out of tries', async () => {
      render(<GuessTheWordGame />);
      await typeCorrectWord("test"); // P1 completes turn

      jest.spyOn(global.Math, 'random').mockReturnValue(0.5); // next word "game" for P2
      await makeNIncorrectGuesses(5); // P2 makes 5 mistakes
      expect(global.alert).toHaveBeenCalledWith("Player 2, you've run out of tries!");
      expect(screen.getByText("Player 1's Turn")).toBeInTheDocument();
    });
  });

  describe('Try Tracking (per player)', () => {
    test('Player 1 tries increment on incorrect guess', async () => {
      render(<GuessTheWordGame />);
      await makeNIncorrectGuesses(1);
      expect(screen.getByText(/P1 Tries \(1\/5\):/)).toBeInTheDocument();
      await makeNIncorrectGuesses(1);
      expect(screen.getByText(/P1 Tries \(2\/5\):/)).toBeInTheDocument();
    });

    test('Player 2 tries increment on incorrect guess', async () => {
      render(<GuessTheWordGame />);
      await typeCorrectWord("test"); // P1 completes turn

      expect(screen.getByText("Player 2's Turn")).toBeInTheDocument();
      expect(screen.getByText(/P2 Tries \(0\/5\):/)).toBeInTheDocument(); // P2 starts with 0 tries
      await makeNIncorrectGuesses(1);
      expect(screen.getByText(/P2 Tries \(1\/5\):/)).toBeInTheDocument();
    });

    test('Player 1 tries reset when Player 1 starts a new word (after P2 turn)', async () => {
      render(<GuessTheWordGame />);
      await typeCorrectWord("test"); // P1 finishes

      jest.spyOn(global.Math, 'random').mockReturnValue(0.5); // for P2's word
      await typeCorrectWord("game"); // P2 finishes

      expect(screen.getByText("Player 1's Turn")).toBeInTheDocument();
      // P1's tries should be 0 for the new word. Math.random(0) selects "test" again.
      expect(screen.getByText(/P1 Tries \(0\/5\):/)).toBeInTheDocument(); 
    });
    
    test('Player 1 tries reset after guessing correctly', async () => {
      render(<GuessTheWordGame />);
      await makeNIncorrectGuesses(2); // P1 has 2 tries
      expect(screen.getByText(/P1 Tries \(2\/5\):/)).toBeInTheDocument();
      // Now guess the rest of the word correctly
      const inputs = getLetterInputs();
      // Assuming first 2 letters were 'x', 'x'. Now type 's', 't' for "test"
      // This part of the helper is tricky because state of inputs is complex.
      // A simpler way: complete the word, it switches turn, then P1 plays again.
      // For this test, let's assume after P1 guesses, it's P2's turn, then P1's again.
      await typeCorrectWord("test"); // P1 guesses word (total tries for this word were 2 incorrect + 4 correct)
      
      // Now it's P2's turn. We need P2 to finish their turn.
      jest.spyOn(global.Math, 'random').mockReturnValue(0.5); // P2 gets "game"
      await typeCorrectWord("game"); // P2 guesses word
      
      // Back to P1's turn. P1's tries should be 0.
      expect(screen.getByText("Player 1's Turn")).toBeInTheDocument();
      expect(screen.getByText(/P1 Tries \(0\/5\):/)).toBeInTheDocument();
    });


    test('Player 2 tries reset when Player 2 starts a new word', async () => {
      render(<GuessTheWordGame />);
      await typeCorrectWord("test"); // P1 finishes

      expect(screen.getByText("Player 2's Turn")).toBeInTheDocument();
      // P2's tries should be 0 for their new word. Math.random(0.5) selects "game".
      expect(screen.getByText(/P2 Tries \(0\/5\):/)).toBeInTheDocument(); 
      await makeNIncorrectGuesses(1); // P2 makes 1 mistake
      expect(screen.getByText(/P2 Tries \(1\/5\):/)).toBeInTheDocument();

      // P2 now guesses the word "game"
      await typeCorrectWord("game"); // This will switch to P1.
      
      // Now P1 finishes their turn
      jest.spyOn(global.Math, 'random').mockReturnValue(0); // P1 gets "test"
      await typeCorrectWord("test");

      // Back to P2's turn. P2's tries should be 0.
      expect(screen.getByText("Player 2's Turn")).toBeInTheDocument();
      expect(screen.getByText(/P2 Tries \(0\/5\):/)).toBeInTheDocument();
    });


    test('Player 1 is switched after 5 incorrect tries', async () => {
      render(<GuessTheWordGame />);
      await makeNIncorrectGuesses(5);
      expect(global.alert).toHaveBeenCalledWith("Player 1, you've run out of tries!");
      expect(screen.getByText("Player 2's Turn")).toBeInTheDocument();
      expect(screen.getByText(/P2 Tries \(0\/5\):/)).toBeInTheDocument(); // P2's tries are fresh
    });
  });

  describe('Game Reset', () => {
    test('Reset button resets scores, tries, and current player', async () => {
      render(<GuessTheWordGame />);
      
      // Player 1 plays and scores
      await typeCorrectWord("test"); 
      expect(screen.getByText("Player 1 Score: 10")).toBeInTheDocument();
      expect(screen.getByText("Player 2's Turn")).toBeInTheDocument();

      // Player 2 makes some mistakes
      await makeNIncorrectGuesses(2);
      expect(screen.getByText(/P2 Tries \(2\/5\):/)).toBeInTheDocument();

      const resetButton = screen.getByRole('button', { name: /reset/i });
      await act(async () => {
        fireEvent.click(resetButton);
      });
      
      expect(screen.getByText("Player 1's Turn")).toBeInTheDocument();
      expect(screen.getByText("Player 1 Score: 0")).toBeInTheDocument();
      expect(screen.getByText("Player 2 Score: 0")).toBeInTheDocument();
      expect(screen.getByText(/P1 Tries \(0\/5\):/)).toBeInTheDocument();
      // Also check P2 tries are reset internally, though not visible immediately
      // This can be implicitly checked if P2 plays next and starts with 0 tries.
      // For now, the visual reset of P1 and scores is the primary check.
    });
  });
});

// Note: These tests assume a testing environment like Jest and React Testing Library is set up.
// If not, this setup would be a prerequisite.
// The mock for `useMemo` to control the words list is crucial.
// The mock for `Math.random` is used to control word selection for predictability.
// The `act` utility is used to ensure all state updates are processed before assertions.
