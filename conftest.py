from main import socketio as apl
import pytest

@pytest.fixture
def app():
    app = apl()
    return app