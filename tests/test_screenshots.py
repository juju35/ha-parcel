"""The README shows each still screenshot as a light/dark pair: both must render the exact same card state."""

import ast
from pathlib import Path

SCRIPT = Path(__file__).resolve().parent.parent / "scripts" / "screenshots.py"


def _shots():
    # Read SHOTS statically: importing the script would require Playwright.
    for node in ast.parse(SCRIPT.read_text()).body:
        if isinstance(node, ast.Assign) and any(getattr(t, "id", None) == "SHOTS" for t in node.targets):
            return ast.literal_eval(node.value)
    raise AssertionError("SHOTS not found in scripts/screenshots.py")


def test_every_dark_still_is_the_light_twin():
    shots = {shot["file"]: shot for shot in _shots()}
    dark = [name for name in shots if name.endswith("-dark")]
    assert dark, "no dark screenshot"
    for name in dark:
        light = shots.get(name.removesuffix("-dark"))
        assert light is not None, f"{name} has no light twin"
        assert light["theme"] == "light"
        assert shots[name]["theme"] == "dark"
        strip = lambda shot: {k: v for k, v in shot.items() if k not in ("file", "theme")}  # noqa: E731
        assert strip(shots[name]) == strip(light), f"{name} does not show the same state as its light twin"


def test_every_light_still_has_a_dark_twin():
    shots = {shot["file"]: shot for shot in _shots()}
    for name, shot in shots.items():
        if shot["theme"] == "light":
            assert f"{name}-dark" in shots, f"{name} has no dark twin"
