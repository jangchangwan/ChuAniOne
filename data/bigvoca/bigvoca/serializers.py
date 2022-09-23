# from rest_framework import serializers
from rest_framework_mongoengine import serializers
from bigvoca.models import Words


class WordSerializer(serializers.DocumentSerializer):
    class Meta:
        model = Words
        fields = "__all__"
