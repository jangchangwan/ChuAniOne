from mongoengine import Document, fields


# Create your models here.
class Words(Document):
    voca_id = fields.IntField(required=False)
    japanese = fields.StringField(required=True)
    pronunciation = fields.StringField(required=True)
    korean = fields.StringField(required=True)
    frequency = fields.IntField(required=True)
