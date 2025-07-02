VIDEO URL -> https://www.youtube.com/watch?v=v8i1IaZ1E94&t=841s [01:56:00]

# ANIMATIONS

# Threading Model

The react native renderer distributes the work of the ui pipeline accross multiple threads, it's designed to be thread safe at a high level saftey is guranteed by using immutable data structures in the internals of the framework (enforced by c++ "const correctness" feature) this means that every update in react creates or clones new objects in the renderer instead of updating data structures this allows the framework to expose thread safe and synchronous API to react
In React native there are two threads

1. JavaScript Thread - This is where react render's phase as well as layout, are executed specifically Runs your React/JS code, handles business logic, state management, and animation calculations
2. UI/Main Thread (Native Thread) - Responsible for rendering UI elements and displaying animations on screen

mounting happens in the UI/MAIN thread

-> ANIMATION LIFECYCLE
--- User interation (e.g .... button press)
--- JS thread starts ANIMATION
--- JS calculates next frame (Animated API)
--- Sends data to native (bridge communication)
--- UI thread receives animation updates
--- UI thread renders frames smoothly according to the device capabilites (60fps)
--- Animation completes & cleans up memory 💥

# How does animation run in different threads

---- 1 EVENT
---- 2 Render
---- 3 Layout
---- 4 Commit
---- 5 Mount
---- Interruptions

## If animation runs on JS threads (run on JS) mainly used in simple animations

UI thread -> only do 5th step
JS thread -> 1 -> 2 -> 3 -> 4 steps

## If animation runs on MAIN/UI threads (Native driver) mainly used in complex animations

UI thread -> 1 -> 2 -> 3 -> 4 -> 5
JS thread -> N/A

# TOOLS IN REACT NATIVE FOR ANIMATION

--> Animated API (inbuilt in react native)
--> React native reanimated (have to install externally) preferred by everyone because it's based Animated API but has reanimated custom tweaks and magic to make this more peroformant than existing Animated API.

## RULES TO MAKE COMPLEX ANIMATION IN REACT NATIVE

V - C - F

V: Animated.Value (Create animated value e.g sharedValue)
C: Connect to Component (Attach th value to style properties like opacity, position or scale )
F: Animate with a Function (Use methods like Animated.timing() to update the value smoothly)

# CONCEPT OF INTERPOLATION

Interpolation is a way of estimating a function at intermediate points, learning form the ranges you provide in simple words we can perform multiple animations at same time within the same value ranges It lets you control many different things (size, color, position, etc.) with just one animated value.

for e.g :- Suppose you want to animate a box so that it fades in (opacity goes from 0 to 1) and moves to the right (position goes from 0 to 200 pixels) at the same time.
You start with an animated value that goes from 0 to 1: Now, you want to use this value to control both opacity and position. Here's where interpolation comes in:

# CONCEPT OF EXTRAPOLATION

Extrapolation is a concept to predicting something beyond the known data.

In simple words: Extrapolation means guessing what might happen outside the range of values you already know. If you know how something behaves between points A and B, extrapolation is about predicting what happens before A or after B.

## Example 1 (Simple):

Suppose you know that a car travels 10 km in 1 hour and 20 km in 2 hours. If you want to guess how far it will go in 3 hours (even though you don't have that data), you are using extrapolation.

## Example 2 (Animation):

If you have an animated value that goes from 0 to 1, and you set up an interpolation for opacity from 0 (invisible) to 1 (fully visible), what happens if the animated value goes to 1.5? Extrapolation decides what to do:

- Should the opacity stay at 1 (clamp)?
- Should it keep increasing past 1 (extend)?

In React Native animations, you can control how values behave outside the input range using extrapolation settings like 'clamp', 'extend', or 'identity'.

ExtrapolateLeft -> Defines behaviour for the inputs smaller than the range starts.
ExtrapolateRight -> Defines behaviour for the inputs larger than the range ends.

- Interpolation = estimating between known points
- Extrapolation = predicting beyond known points

# CONCEPT OF CLAMPING

Clamping means restricting a value within a specific range.

In simple words: If a value tries to go below the minimum or above the maximum, clamping forces it to stay at the nearest limit. It's like setting boundaries that the value cannot cross.

## Example 1 (Simple):

Suppose you have a score that should always be between 0 and 100. If someone tries to set the score to 120, clamping will keep it at 100. If they try to set it to -10, clamping will keep it at 0.

## Example 2 (Animation):

If you animate a value from 0 to 1, but the animation tries to go to 1.5, clamping will keep it at 1. If it tries to go below 0, clamping will keep it at 0.

- Clamping = Forcing a value to stay within a set range (never less than the minimum, never more than the maximum)

# CONCEPT OF EASING

Easing is way of how animation or movement start and ends instead of moving at a constant speed, easing makes the motion feel more natural,
For e.g - car doesn't start and stop instantly it gradually speeds up or slow down
