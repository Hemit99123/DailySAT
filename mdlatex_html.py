import markdown
import subprocess
import os

def md_to_html(md_file, output_html=None):
    #Convert a Markdown file to HTML using the markdown library.
    #If output_html is None, creates an HTML file with the same basename.
    if not os.path.isfile(md_file):
        print(f"[ERROR] Markdown file does not exist: {md_file}")
        return

    with open(md_file, 'r', encoding='utf-8') as f:
        md_content = f.read()

    html_content = markdown.markdown(
        md_content,
        extensions=['fenced_code', 'tables', 'toc', 'codehilite']
    )

    if output_html is None:
        output_html = os.path.splitext(md_file)[0] + ".html"

    with open(output_html, 'w', encoding='utf-8') as f:
        f.write(html_content)

    print(f"[INFO] HTML written to: {output_html}")

def latex_to_html(latex_file, output_html=None):
    #Convert a LaTeX file to HTML using Pandoc.
    #If output_html is None, creates an HTML file with the same basename.
    if not os.path.isfile(latex_file):
        print(f"[ERROR] LaTeX file does not exist: {latex_file}")
        return

    if output_html is None:
        output_html = os.path.splitext(latex_file)[0] + ".html"

    command = ['pandoc', latex_file, '-o', output_html]

    try:
        subprocess.run(command, check=True)
        print(f"[INFO] HTML written to: {output_html}")
    except FileNotFoundError:
        print("[ERROR] Pandoc is not installed or not in PATH.")
    except subprocess.CalledProcessError as e:
        print(f"[ERROR] Pandoc conversion failed: {e}")

def manim_renderer(scene_file, scene_class, quality="l"):
    #Render a Manim scene to a video file.
    #Uses python -m manim ... to ensure it works even if manim.exe isn't in PATH.
    import sys
    if not os.path.isfile(scene_file):
        print(f"[ERROR] Manim scene file does not exist: {scene_file}")
        return

    cmd = [
        sys.executable,
        "-m", "manim",
        f"-q{quality}",
        scene_file,
        scene_class
    ]

    try:
        subprocess.run(cmd, check=True)
        print(f"[INFO] Video rendered for scene '{scene_class}' in '{scene_file}'")
    except FileNotFoundError:
        print("[ERROR] Python or Manim is not installed or not in PATH.")
    except subprocess.CalledProcessError as e:
        print(f"[ERROR] Manim rendering failed: {e}")


if __name__ == "__main__":
    os.makedirs("output_videos", exist_ok=True)
    md_to_html("test.md", output_html="test_md.html")
    latex_to_html("test.tex", output_html="test_tex.html")
    manim_renderer("testScene.py", "SquareToCircle")

