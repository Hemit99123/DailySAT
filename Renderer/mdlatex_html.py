import markdown
import subprocess
import os

def get_output_path(input_path: str, output_dir: str, ext: str) -> str:
    base = os.path.splitext(os.path.basename(input_path))[0]
    os.makedirs(output_dir, exist_ok=True)
    return os.path.join(output_dir, f"{base}.{ext}")

def md_to_html(md_file: str, output_html: str = None, output_dir: str = "output_html") -> None:
    """
    Convert a Markdown file to HTML using the markdown library.
    """
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
        output_html = get_output_path(md_file, output_dir, "html")
    else:
        os.makedirs(os.path.dirname(output_html) or ".", exist_ok=True)

    with open(output_html, 'w', encoding='utf-8') as f:
        f.write(html_content)

    print(f"[INFO] HTML written to: {output_html}")

def latex_to_html(latex_file: str, output_html: str = None, output_dir: str = "output_html") -> None:
    """
    Convert a LaTeX file to HTML using Pandoc.
    """
    if not os.path.isfile(latex_file):
        print(f"[ERROR] LaTeX file does not exist: {latex_file}")
        return

    if output_html is None:
        output_html = get_output_path(latex_file, output_dir, "html")
    else:
        os.makedirs(os.path.dirname(output_html) or ".", exist_ok=True)

    command = ['pandoc', latex_file, '-o', output_html]

    try:
        subprocess.run(command, check=True)
        print(f"[INFO] HTML written to: {output_html}")
    except FileNotFoundError:
        print("[ERROR] Pandoc is not installed or not in PATH.")
    except subprocess.CalledProcessError as e:
        print(f"[ERROR] Pandoc conversion failed: {e}")

if __name__ == "__main__":
    # Example usage: adapt paths as needed
    md_to_html("Manim/Lessons/Markdown/test.md", output_dir="output_html")
    latex_to_html("Manim/Lessons/LaTeX/test.tex", output_dir="output_html")
