from rest_framework import serializers
from .models import Animation, Review, History, Feature


class AnimationSerializer(serializers.ModelSerializer):

    class Meta:
        # the model 4 Serializer
        model = Animation
        # a tuple of field names to be included in the serialization
        fields = ("id", "name", "series_id")


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = "__all__"


class HistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = History
        fields = "__all__"


class FeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feature
        fields = ("id", "feat_str")
