import os
import sys
import subprocess

def manim_renderer(
    scene_file: str,
    scene_class: str,
    quality: str = "l",
    output_dir: str = "output_videos"
) -> None:
    """
    Render a Manim scene to a video file in the specified output directory.
    """
    if not os.path.isfile(scene_file):
        print(f"[ERROR] Manim scene file does not exist: {scene_file}")
        return

    os.makedirs(output_dir, exist_ok=True)
    output_path = os.path.join(output_dir, scene_class + ".mp4")

    cmd = [
        sys.executable,
        "-m", "manim",
        f"-q{quality}",
        "--output_file", output_path,
        scene_file,
        scene_class
    ]

    try:
        subprocess.run(cmd, check=True)
        print(f"[INFO] Video rendered for scene '{scene_class}' in '{scene_file}'\n      Output: {output_path}")
    except FileNotFoundError:
        print("[ERROR] Python or Manim is not installed or not in PATH.")
    except subprocess.CalledProcessError as e:
        print(f"[ERROR] Manim rendering failed: {e}")

if __name__ == "__main__":
    # Example usage: adapt path as needed
    manim_renderer("Manim/Scenes/testScene.py", "SquareToCircle", output_dir="output_videos")
