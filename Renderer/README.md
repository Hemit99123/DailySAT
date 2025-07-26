# Renderer

## Overview

This folder contains scripts to:
- Convert Markdown and LaTeX lesson files to HTML
- Render Manim scene scripts to video files

## Directory Structure

- `mdlatex_html.py`: Converts Markdown/LaTeX to HTML
- `renderer.py`: Renders Manim scenes to videos
- `Manim/Lessons/Markdown/`: Place Markdown lesson files here
- `Manim/Lessons/LaTeX/`: Place LaTeX lesson files here
- `Manim/Scenes/`: Place Manim scene files here
- `output_html/`: Generated HTML files (auto-created and gitignored)
- `output_videos/`: Generated video files (auto-created and gitignored)

## How to Use

1. **Install Python requirements**
    ```bash
    pip install -r requirements.txt
    ```

2. **Make sure you have [Pandoc](https://pandoc.org/) and [Manim](https://docs.manim.community/en/stable/installation.html) installed.**

3. **To convert a Markdown or LaTeX lesson to HTML:**
    ```bash
    python mdlatex_html.py
    ```

4. **To render a Manim scene to video:**
    ```bash
    python renderer.py
    ```

## Output

- HTML files are placed in `output_html/`
- Videos are placed in `output_videos/`
- Both folders are automatically created if they don't exist, and are ignored by git

## Requirements

- Python (see `requirements.txt`)
- [Pandoc](https://pandoc.org/)
- [Manim Community Edition](https://docs.manim.community/)

