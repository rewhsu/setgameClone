# setgameClone

--------
Goals
--------
Refactor using React + Redux
Maximize responsiveness
Focus on front-end cosmetics

--------
General Notes
--------
Goal: Redo project in React, refactor code

Notes:

4/14/17
- Should I use Redux?
- Dynamically draw cards or draw while loading and cache

--------
Gameplay Brainstorm
--------
- How does the game work?
  - Modes
    - Puzzle Mode
      - No Time Limit
      - Lose when errors > max
      - Complete set = + points
      - Wrong set = - points || error
    - Endless Mode
      - No errors
      - Infinite sets
      - Submit high
    - Time Attack Mode
      - Time limit
      - Infinite sets (No full deck/keeping track of remaining)
      - Make as many matches as possible
      - Guaranteed set?
  - Low Hanging Fruit
    - All of it
  - Extremely tall, labor intensive but awesome fruit
    - Multiplayer
      - Game rooms
      - Actual set game clone

--------
Questions
--------
- Do I actually need a real deck? What purpose does it serve... natural balance and if I want to do multiplayer, it's proven to be fun -- sounds like a yes
- How do I want to deal with # of community cards? Real game lets you add rows if no matches are found-- but why deal with it? Better solution is to never deal a no-match scenario.
  - Near the end of the game, there will eventually be a no-match scenario/uneven cards... who cares, just avoid matches until there are no possibilities left. Depends how fast algo is.

--------
MVP
--------
- Get existing logic working so I can try to time it and explicitly make improvements
- Refactor to efficient code
