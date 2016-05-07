prepare:
	virtualenv venv
	venv/bin/pip install -r requirements.txt

runserver:
	venv/bin/python app.py
