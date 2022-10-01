from rest_framework import serializers
from .models import Animation, Review


class AnimationSerializer(serializers.ModelSerializer):

    class Meta:
        # the model 4 Serializer
        model = Animation
        # a tuple of field names to be included in the serialization
        fields = "__all__"


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        medel = Review
        fields = "__all__"
