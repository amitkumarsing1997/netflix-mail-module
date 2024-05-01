from fastapi_mail import FastMail, MessageSchema, ConnectionConfig, MessageType

conf = ConnectionConfig(
    MAIL_USERNAME="amitksinghmdv@gmail.com",
    MAIL_PASSWORD="bbrf mapm opvd cgfd",
    MAIL_FROM="amitksinghmdv@gmail.com",
    MAIL_PORT=465,
    MAIL_SERVER="smtp.gmail.com",
    MAIL_STARTTLS=False,
    MAIL_SSL_TLS=True,
    USE_CREDENTIALS=True,
    VALIDATE_CERTS=True,
    TEMPLATE_FOLDER='./src/app/user/util/templates/email'
)


async def send_with_template(token_detail: dict):
    message = MessageSchema(
        subject="NETFLIX-Mail module",
        recipients=[token_detail.get("email")],
        template_body=token_detail,
        subtype=MessageType.html,
    )
    fm = FastMail(conf)
    await fm.send_message(message, template_name="email.html")
