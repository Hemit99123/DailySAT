from manim import *

class SquareToCircle(Scene):
    def construct(self):
        square = Square()
        self.play(Create(square))
        self.play(Transform(square, Circle()))
        self.wait(1)


