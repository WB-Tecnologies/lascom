"""
Contanct form handler.
Listen POST requests on URI `/contact` in `application/x-www-form-urlencoded`.
Accepted POST arguments:
- name
- company
- phone
- email
- message
- type - "request" or "samples"
"""
import json
import logging
from smtplib import SMTP
from email.MIMEBase import MIMEBase
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

from flask import Flask, request, make_response
from jinja2 import Template, Undefined


logging.basicConfig(level=logging.INFO)
app = Flask(__name__)


MAIL_TEMPLATE_TXT = Template(u"""
{% if name is defined %}
Name: {{name.0}}
{% endif %}
{% if company is defined %}
Company: {{company.0}}
{% endif %}
{% if phone is defined %}
Phone number: {{phone.0}}
{% endif %}
{% if email is defined %}
Email: {{email.0}}
{% endif %}
{% if message is defined %}
Message:

{{message.0}}
{% endif %}
""")
MAIL_TEMPLATE_HTML = Template(u"""
{% if name is defined %}
<p><b>Name</b>: {{name.0}}</p>
{% endif %}
{% if company is defined %}
<p><b>Company</b>: {{company.0}}</p>
{% endif %}
{% if phone is defined %}
<p><b>Phone number</b>: {{phone.0}}</p>
{% endif %}
{% if email is defined %}
<p><b>Email</b>: {{email.0}}</p>
{% endif %}
{% if message is defined %}
<p><b>Message</b>:</p>
<p>{{message.0|replace("\n", "<br>")}}</p>
{% endif %}
""")

# SMTP_FROM = 'no-reply@lascom.pro'
# SMTP_TO = 'admin@lascom.pro'
# SMTP_HOST = 'debugmail.io'
# SMTP_PORT = 25
# SMTP_LOGIN = 'dizballanze@gmail.com'
# SMTP_PASSWORD = 'c94655a0-139a-11e6-acb8-b387215ae1ba'

SMTP_FROM = 'ask@wbtech.pro'
SMTP_TO = 'dmitry.volodkin@lascom.pro'
SMTP_HOST = 'in-v3.mailjet.com'
SMTP_PORT = 25
SMTP_LOGIN = '5c68accfc347d434988c59a886cd6350'
SMTP_PASSWORD = '07dbb3fd8a51075f9b241d0d1c5c83c8'


def _send_message(data):
    if not 'type' in data:
        logging.warning("Request type was not provided %s", data)
        return False
    msg = MIMEMultipart('alternative')
    if data['type'] == 'request':
        msg['Subject'] = 'Lascom: order request'
    elif data['type'] == 'samples':
        msg['Subject'] = 'Lascom: sample request'
    else:
        logging.warning("Wrong type %s", data['type'])
        return False
    msg['From'] = SMTP_FROM
    msg['To'] = SMTP_TO
    if 'email' in data:
        msg['Reply-To'] = data['email']
    # text part
    text = MAIL_TEMPLATE_TXT.render(**data)
    text_part = MIMEText(text, 'plain', 'utf-8')
    msg.attach(text_part)
    # html part
    html = MAIL_TEMPLATE_HTML.render(**data)
    html_part = MIMEText(html, 'html', 'utf-8')
    msg.attach(html_part)
    # senging
    smtp = SMTP()
    smtp.connect(SMTP_HOST, SMTP_PORT)
    smtp.ehlo()
    smtp.starttls()
    smtp.ehlo()
    smtp.login(SMTP_LOGIN, SMTP_PASSWORD)
    try:
        smtp.sendmail(SMTP_FROM, SMTP_TO, msg.as_string())
    except e:
        logging.error("Email sending was failed: %s", e)
        smtp.close()
        return False
    finally:
        smtp.close()
    return True


@app.route('/contact', methods=['POST'])
def hello():
    logging.info(request.form)
    result = _send_message(request.form)
    resp = make_response(json.dumps(dict(result=result)), 200)
    resp.headers['Content-Type'] = 'application/json'
    return resp


if __name__ == '__main__':
    app.run()
